import assert from 'assert';
import fs from 'fs';

function watchTaskIncludesRunSharp() {
  const content = fs.readFileSync('gulpfile.mjs', 'utf8');
  const match = content.match(/export function watchTask\([^)]*\)\s*{([\s\S]*?)\n}\n/);
  assert(match, 'watchTask function not found');
  assert(/runSharp/.test(match[1]), 'watchTask should invoke runSharp');
}

function sharpScriptHasDestinationFolder() {
  const content = fs.readFileSync('sharp.mjs', 'utf8');
  assert(content.includes("const destinationFolder = 'dist/images/resized/';"), 'destination folder path missing');
  assert(/resizeImages\(\)\.catch\(console\.error\)/.test(content), 'resizeImages call missing');
}

function main() {
  watchTaskIncludesRunSharp();
  sharpScriptHasDestinationFolder();
  console.log('All tests passed.');
}

main();
