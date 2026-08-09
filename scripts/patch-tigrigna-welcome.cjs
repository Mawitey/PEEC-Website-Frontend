const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'production-dist', 'assets');
const bundleName = fs.readdirSync(assetsDir).find((name) => /^index-.*\.js$/.test(name));
if (!bundleName) throw new Error('Production JavaScript bundle was not found.');

const bundlePath = path.join(assetsDir, bundleName);
let source = fs.readFileSync(bundlePath, 'utf8');

const oldText = 'welcome:"ናብ ቤተ ክርስቲያንና ብደሓን መጻእኩም"';
const newText = 'welcome:"እንቋዕ ናብ ቤተ ክርስቲያንና ብደሓን መጻእኩም"';

if (!source.includes(newText)) {
  const count = source.split(oldText).length - 1;
  if (count !== 1) throw new Error(`Expected one homepage welcome target, found ${count}.`);
  source = source.replace(oldText, newText);
  fs.writeFileSync(bundlePath, source);
}

console.log(`Patched ${bundleName}: complete Tigrigna welcome sentence.`);
