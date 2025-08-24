import { cac } from 'cac';
import * as p from '@clack/prompts';
import { cyan, green, yellow } from 'kolorist';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { execa } from 'execa';
import ora from 'ora';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = path.join(__dirname, '..', 'templates', 'base'); // single base template

async function addTailwindV4(dest) {
  // 1) Merge Tailwind v4 devDeps
  const pkgPath = path.join(dest, 'package.json');
  const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));
  pkg.devDependencies = pkg.devDependencies || {};
  delete pkg.devDependencies.autoprefixer;
  pkg.devDependencies.tailwindcss = '^4.0.0';
  pkg.devDependencies['@tailwindcss/postcss'] = '^4.0.0';
  pkg.devDependencies.postcss = '^8.4.47';
  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));

  // 2) PostCSS config
  await fs.outputFile(
    path.join(dest, 'postcss.config.mjs'),
    `export default { plugins: { '@tailwindcss/postcss': {} } };`
  );

  // 3) Figure out app dir and globals path (supports src/app and app)
  const appDir = (await fs.pathExists(path.join(dest, 'src', 'app')))
    ? path.join(dest, 'src', 'app')
    : path.join(dest, 'app');
  const globalsPath = path.join(appDir, 'globals.css');
  const layoutPath = path.join(appDir, 'layout.tsx');

  // 4) Ensure globals.css exists and has Tailwind import at the TOP
  const existingCss = (await fs.pathExists(globalsPath)) ? await fs.readFile(globalsPath, 'utf8') : '';
  const hasTwImport = /^\s*@import\s+["']tailwindcss["'];?/m.test(existingCss);
  const newCss = hasTwImport ? existingCss : `@import "tailwindcss";\n${existingCss}`;
  await fs.outputFile(globalsPath, newCss);

  // 5) Ensure layout imports globals.css
  if (await fs.pathExists(layoutPath)) {
    let src = await fs.readFile(layoutPath, 'utf8');
    const hasImport =
      /import\s+['"]\.\/globals\.css['"];?/.test(src) ||
      /import\s+['"]@\/app\/globals\.css['"];?/.test(src) ||
      /import\s+['"]~\/app\/globals\.css['"];?/.test(src);
    if (!hasImport) {
      // insert after the last import line, or at the top if none
      const lines = src.split('\n');
      let lastImport = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) lastImport = i;
      }
      if (lastImport >= 0) {
        lines.splice(lastImport + 1, 0, `import './globals.css';`);
        src = lines.join('\n');
      } else {
        src = `import './globals.css';\n` + src;
      }
      await fs.writeFile(layoutPath, src, 'utf8');
    }
  }

  // 6) Remove any tailwind.config.* (v4 zero-config)
  for (const f of ['tailwind.config.ts', 'tailwind.config.js', 'tailwind.config.cjs', 'tailwind.config.mjs']) {
    const p = path.join(dest, f);
    if (await fs.pathExists(p)) await fs.remove(p);
  }
}

async function installDeps(pm, cwd) {
  const args = ['install']; // install from package.json
  await execa(pm, args, { cwd, stdio: 'inherit' });
}

async function main() {
  const cli = cac('quickstart-next');
  cli
    .option('--preset <name>', 'base | tailwind')
    .option('--pm <pm>', 'npm | pnpm | yarn | bun')
    .option('--no-git', 'Skip git init')
    .option('--no-install', 'Skip dependency install');
  const { options } = cli.parse();

  p.intro(green('Create Next.js project'));

  const name = await p.text({
    message: 'Project name?',
    placeholder: 'my-next-app',
    validate: v => (!v ? 'Required' : undefined)
  });

  const preset = options.preset || await p.select({
    message: 'Choose a preset',
    options: [
      { label: 'Base (MUI, RHF, React Query)', value: 'base' },
      { label: 'Tailwind v4 (Base + Tailwind)', value: 'tailwind' }
    ]
  });

  const pm = options.pm || await p.select({
    message: 'Package manager?',
    options: [
      { label: 'pnpm', value: 'pnpm' },
      { label: 'npm', value: 'npm' },
      { label: 'yarn', value: 'yarn' },
      { label: 'bun', value: 'bun' }
    ]
  });

  const dest = path.resolve(process.cwd(), name);
  if (await fs.pathExists(dest) && (await fs.readdir(dest)).length) {
    p.cancel('Target folder is not empty.');
    process.exit(1);
  }

  const sp = ora(`Scaffolding ${cyan(name)} with ${yellow(preset)}...`).start();
  await fs.copy(TEMPLATE_DIR, dest);

  // set package name
  const pkgPath = path.join(dest, 'package.json');
  const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));
  pkg.name = name;
  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
  sp.succeed('Files ready');

  // Tailwind v4 augmentation
  if (preset === 'tailwind') {
    const tw = ora('Adding Tailwind v4...').start();
    await addTailwindV4(dest);
    tw.succeed('Tailwind v4 wired');
  }

  if (options.git !== false) {
    await execa('git', ['init'], { cwd: dest });
    await execa('git', ['checkout', '-b', 'main'], { cwd: dest });
    await execa('git', ['add', '.'], { cwd: dest });
    await execa('git', ['commit', '-m', 'chore: initial commit'], { cwd: dest });
  }

  if (options.install !== false) {
    const inst = ora('Installing dependencies...').start();
    await installDeps(pm, dest);
    inst.succeed('Dependencies installed');
  }

  p.outro(`Done! Next steps:
  1) cd ${name}
  2) ${pm} run dev
  `);
}

main();
