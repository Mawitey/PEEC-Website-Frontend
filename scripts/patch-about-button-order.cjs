const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'production-dist', 'assets');
const cssName = fs.readdirSync(assetsDir).find((name) => /^index-.*\.css$/.test(name));
if (!cssName) throw new Error('Production CSS bundle was not found.');

const cssPath = path.join(assetsDir, cssName);
let css = fs.readFileSync(cssPath, 'utf8');

const rules = '.about-section,.about-section>.page-container{display:flex!important;flex-direction:column!important}.about-section .about-header{display:contents!important}.about-section .about-header h2{order:1;width:100%}.about-section .about-preview{order:2}.about-section .about-header .about-read-btn{order:3;align-self:flex-end;margin-top:16px}.about-section .read-more-content{order:4}.about-section .about-header .about-read-btn[aria-expanded=true]{order:5;margin-top:22px}@media(max-width:768px){.about-section .about-header .about-read-btn{align-self:center;width:auto;max-width:100%}}';

if (!css.includes('.about-section .about-header{display:contents!important}')) {
  css += rules;
  fs.writeFileSync(cssPath, css);
}

console.log(`Patched ${cssName}: About action buttons now follow their text.`);
