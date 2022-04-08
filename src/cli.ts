#!/usr/bin/env node
import typegen from './typegen';

const [, program, ...args] = process.argv;

typegen(program.replace(/.*\//, ''), args).catch(err => {
  console.error(err.message);
  process.exit(1);
});