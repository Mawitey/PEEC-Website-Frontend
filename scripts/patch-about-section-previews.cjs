const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'production-dist', 'assets');
const bundleName = fs.readdirSync(assetsDir).find((name) => /^index-.*\.js$/.test(name));
const cssName = fs.readdirSync(assetsDir).find((name) => /^index-.*\.css$/.test(name));
if (!bundleName || !cssName) throw new Error('Production assets were not found.');

const bundlePath = path.join(assetsDir, bundleName);
const cssPath = path.join(assetsDir, cssName);
let source = fs.readFileSync(bundlePath, 'utf8');

const aboutStart = source.indexOf('function sA(){');
const aboutEnd = source.indexOf('function rA(){', aboutStart);
if (aboutStart < 0 || aboutEnd < 0) throw new Error('About page block was not found.');
let about = source.slice(aboutStart, aboutEnd);

const tiTarget = ']}),n===d&&f.jsx("div",{className:"read-more-content"';
const tiPreview = ']}),n!==d&&f.jsx("p",{className:"about-preview",children:{vision:"ራእይና፡ መስቀል ክርስቶስ ተሰኪምና ብስራት ጐይታና ኢየሱስ ክሳዕ ወሰን ምድሪ ምብጻሕ እዩ።",mission:"ተልእኾና፡ ወንጌል ብምእዋጅ፣ ደቀ መዛሙርቲ ብምግባርን ብፍቕሪ ክርስቶስ ብምግልጋልን ዓቢ ተልእኾ ምፍጻም እዩ።",history:"PEEC ኣብ ኮሎምቦስ ብውሑዳት ቋንቋ ትግርኛ ዝዛረቡ ኣመንቲ ጀሚራ፣ ብተኣማንነት ኣምላኽ እናዓበየት መጺኣ።",faith:"PEEC ኣብ መሰረታዊ ሓቅታት እምነት ክርስትና ዝተመስረተት፣ ምስ ሓደ ስያመ ሃይማኖት ዘይተኣሳሰረት ቤተ ክርስቲያን እያ።"}[d]}),n===d&&f.jsx("div",{className:"read-more-content"';
if (!about.includes('children:{vision:"ራእይና፡')) {
  const count = about.split(tiTarget).length - 1;
  if (count !== 1) throw new Error(`Expected one Tigrigna section target, found ${count}.`);
  about = about.replace(tiTarget, tiPreview);
}

const englishPreviews = {
  vision: 'Our vision is to carry the cross of Christ and proclaim the Gospel of Jesus Christ to the ends of the earth.',
  mission: 'Our mission is to fulfill the Great Commission by proclaiming the Gospel, making disciples, and serving with Christ’s compassion.',
  history: 'PEEC began as a small fellowship of Tigrigna-speaking believers in Columbus and grew through God’s faithfulness.',
  faith: 'PEEC is a non-denominational church committed to the foundational truths of the Christian faith.',
};

for (const [id, preview] of Object.entries(englishPreviews)) {
  const target = `]}),n==="${id}"&&f.jsx("div",{className:"read-more-content`;
  const replacement = `]}),n!=="${id}"&&f.jsx("p",{className:"about-preview",children:${JSON.stringify(preview)}}),n==="${id}"&&f.jsx("div",{className:"read-more-content`;
  if (!about.includes(`children:${JSON.stringify(preview)}`)) {
    const count = about.split(target).length - 1;
    if (count !== 1) throw new Error(`Expected one English ${id} section target, found ${count}.`);
    about = about.replace(target, replacement);
  }
}

source = source.slice(0, aboutStart) + about + source.slice(aboutEnd);
fs.writeFileSync(bundlePath, source);

let css = fs.readFileSync(cssPath, 'utf8');
const previewCss = '.about-preview{width:100%;max-width:850px;box-sizing:border-box;margin:20px auto 0!important;text-align:left!important;line-height:1.7!important;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.dark-section.about-section .about-preview{color:#f9fafb!important}.light-section.about-section .about-preview{color:#334155!important}.about-section .about-header h2{white-space:normal!important;overflow-wrap:anywhere;text-align:left!important}@media(max-width:768px){.about-preview{margin-top:14px!important;-webkit-line-clamp:4}.about-section .about-header h2{line-height:1.25!important}}';
const oldPreviewCss = '.about-preview{width:100%;max-width:850px;box-sizing:border-box;margin:20px auto 0!important;text-align:left!important;line-height:1.7!important;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.dark-section.about-section .about-preview{color:#f9fafb!important}.light-section.about-section .about-preview{color:#334155!important}@media(max-width:768px){.about-preview{margin-top:14px!important;-webkit-line-clamp:4}}';
if (css.includes(oldPreviewCss)) {
  css = css.replace(oldPreviewCss, previewCss);
  fs.writeFileSync(cssPath, css);
} else if (!css.includes('.about-preview{')) {
  css += previewCss;
  fs.writeFileSync(cssPath, css);
}

console.log(`Patched ${bundleName} and ${cssName}: bilingual About previews.`);
