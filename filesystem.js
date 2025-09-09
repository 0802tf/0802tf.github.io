import fs from 'fs';

try {
    const dir = fs.statSync('.');
    const file = fs.statSync('./index.json');
    console.log(dir.isDirectory());
    console.log(file.isDirectory());
    console.log(fs.readdirSync('.'));
    console.log(fs.readFileSync('./index.json', 'utf8'));
    fs.writeFileSync('./test.txt', 'Hello world!', 'utf8');
    fs.appendFileSync('./test.txt', '\nHello overwrite!', 'utf8');
    fs.copyFileSync('./test.txt', './test2.txt');
    fs.unlinkSync('./test.txt');
} catch (err) {
    console.log(err);
}