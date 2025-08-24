#!/usr/bin/env node
import('../src/run.mjs').catch(e => {
  console.error(e);
  process.exit(1);
});
