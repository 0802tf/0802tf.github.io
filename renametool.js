import fs from 'fs';
import path from 'path';

const dir = '.';
const filter = value => /.*\.js$/.test(value);
const func = name => name;

rename(dir, filter, func);

function rename(dir, filter, func) {
    fs.readdirSync(dir).filter(filter).forEach(fileName => {
        const parsedPath = path.parse(fileName);
        const newFileName = func(parsedPath.name) + parsedPath.ext;
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
