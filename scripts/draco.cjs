const fs = require('fs');
const path = require('path');

const src = 'node_modules/three/examples/jsm/libs/draco/gltf';
const output = 'public/draco';

// Ensure the output directory exists
if (!fs.existsSync(output)) {
  fs.mkdirSync(output, { recursive: true });
}

// Copy draco decoder files from three.js into the public directory
fs.copyFile(path.join(src, 'draco_decoder.wasm'), path.join(output, 'draco_decoder.wasm'), err => {
  if (err) return console.error(err);
});

fs.copyFile(path.join(src, 'draco_wasm_wrapper.js'), path.join(output, 'draco_wasm_wrapper.js'), err => {
  if (err) return console.error(err);
});

fs.copyFile(path.join(src, 'draco_decoder.js'), path.join(output, 'draco_decoder.js'), err => {
  if (err) return console.error(err);
});
