import fs from 'fs';

const list = fs.readdirSync('.').filter(value => value.endsWith('.html'));
const json = JSON.stringify(list, null, 2);
fs.writeFileSync('./index.json', json, 'utf8');
