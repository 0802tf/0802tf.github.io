import fs from 'fs';
import path from 'path';

const dir = '.';
const filter = value => /.*\.js$/.test(value);
const func = name => name;

function rename(dir, filter, func) {
    fs.readdirSync(dir).filter(filter).forEach(fileName => {
        const parse = path.parse(fileName);
        const name = parse.name;
        const ext = parse.ext;
        const newName = func(name);
        const newFileName = newName + ext;
        const filePath = path.join(dir, fileName);
        const newFilePath = path.join(dir, newFileName);
        if (filePath !== newFilePath) {
            fs.rename(filePath, newFilePath, error => {
                if (error) {
                    throw error;
                }
                console.log(`${filePath} --> ${newFilePath}`);
            });
        }
    });
}

rename(dir, filter, func);