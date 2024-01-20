import { writeFile } from 'fs/promises';
import pkg from './package.json'   with { type: "json" };
import tconfig from './src-tauri/tauri.conf.json' with {type: 'json'}

const vs = process.argv[2]
const nextType = process.argv[3] ?? 'patch'
console.log(vs)
pkg.version = vs;

await writeFile('./package.json', JSON.stringify(pkg, null, 2))


tconfig.package.version = vs;

const nv = nextVersion(vs, nextType);

tconfig.tauri.updater.endpoints = [`https://github.com/wflixu/icamera/releases/download/v${nv}/latest.json`]

await writeFile('./src-tauri/tauri.conf.json', JSON.stringify(tconfig, null, 2))

function nextVersion(vs, nt) {
    const arr = vs.split('.').map(item => parseInt(item))
    if (nt == 'major') {
        return `${arr[0] + 1}.0.0`
    } else if (nt == 'minor') {
        return `${arr[0]}.${arr[1] + 1}.0`
    } else {
        return `${arr[0]}.${arr[1]}.${arr[2] + 1}`
    }

}