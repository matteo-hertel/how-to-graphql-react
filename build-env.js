#!/usr/bin/env node


const fs = require('fs');
const writeStream = fs.createWriteStream('./.env', { flags: 'w', encoding: 'utf-8' });

let envVars = Object.keys(process.env);
let reactEnvVars = envVars.filter((i) => {
    return i.startsWith("REACT_APP_");
})

reactEnvVars.map(writeEnvVarToStream(writeStream))

function writeEnvVarToStream(stream) {
    return function (item) {
        stream.write(`${item}=${process.env[item]}\n`);
    }
}

writeStream.end();