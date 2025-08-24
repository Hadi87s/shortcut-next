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
  // 1) Merge Tailwind v4 devDeps (remove any old ones if present)
  const pkgPath = path.join(dest, 'package.json');
  const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));

  // Ensure devDependencies object exists
  pkg.devDependencies = pkg.devDependencies || {};
  // Remove v3-era keys if they exist
  delete pkg.devDependencies.autoprefixer;
  // Add v4 deps
  pkg.devDependencies.tailwindcss = '^4.0.0';
  pkg.devDependencies['@tailwindcss/postcss'] = '^4.0.0';
  pkg.devDependencies.postcss = '^8.4.47';

  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));

  // 2) Write PostCSS config for v4
  await fs.outputFile(
    path.join(dest, 'postcss.config.mjs'),
    `export default { plugins: { '@tailwindcss/postcss': {} } };`
  );

  // 3) Inject the v4 CSS entry at the TOP of globals.css
  const globalsPath = path.join(dest, 'src', 'app', 'globals.css');
  const css = (await fs.pathExists(globalsPath)) ? await fs.readFile(globalsPath, 'utf8') : '';
  const hasImport = /@import\s+["']tailwindcss["'];?/.test(css);
  const withImport = hasImport ? css : `@import "tailwindcss";\n${css}`;
  await fs.outputFile(globalsPath, withImport);

  // 4) Make sure there is NO tailwind.config.* (v4 is zero-config)
  const tcfgTs = path.join(dest, 'tailwind.config.ts');
  const tcfgJs = path.join(dest, 'tailwind.config.js');
  if (await fs.pathExists(tcfgTs)) await fs.remove(tcfgTs);
  if (await fs.pathExists(tcfgJs)) await fs.remove(tcfgJs);
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
