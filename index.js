import fs from 'fs';

const list = fs.readdirSync('.').filter(value => value.endsWith('.html'));
const json = JSON.stringify(list);
fs.writeFileSync('./index.json', json, 'utf8');
