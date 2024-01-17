import { writeFile } from 'fs/promises';
import pkg from './package.json'   with { type: "json" };
import tconfig from './src-tauri/tauri.conf.json' with {type:'json'}

const vs=process.argv[2]
console.log(vs)
pkg.version = vs;

await writeFile('./package.json', JSON.stringify(pkg, null, 2))


tconfig.package.version = vs;
tconfig.tauri.updater.endpoints = [`https://github.com/wflixu/icamera/releases/download/v${vs}/latest.json`]

await writeFile('./src-tauri/tauri.conf.json', JSON.stringify(tconfig, null, 2))