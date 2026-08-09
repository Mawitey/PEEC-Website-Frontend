const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'production-dist', 'assets');
const bundleName = fs.readdirSync(assetsDir).find((name) => /^index-.*\.js$/.test(name));
if (!bundleName) throw new Error('Production JavaScript bundle was not found.');

const bundlePath = path.join(assetsDir, bundleName);
let source = fs.readFileSync(bundlePath, 'utf8');

const helperAnchor = 'function pa(){const n=A.useContext(gy);if(!n)throw new Error("useLanguage must be used inside LanguageProvider");return n}';
const helper = 'let peecAdminIsTigrigna=!1;function peecAdminText(n,l){return peecAdminIsTigrigna?l:n}';
const oldHookHelper = 'function peecAdminText(n,l){return pa().isTigrigna?l:n}';
if (source.includes(oldHookHelper)) source = source.replace(oldHookHelper, helper);
if (!source.includes(helper)) {
  if (!source.includes(helperAnchor)) throw new Error('Language helper anchor was not found.');
  source = source.replace(helperAnchor, helperAnchor + helper);
}

const providerBefore = 'function _1({children:n}){const[l,s]=A.useState(()=>localStorage.getItem("peec-language")==="ti"?"ti":"en");A.useEffect';
const providerAfter = 'function _1({children:n}){const[l,s]=A.useState(()=>localStorage.getItem("peec-language")==="ti"?"ti":"en");peecAdminIsTigrigna=l==="ti";A.useEffect';
if (!source.includes(providerAfter)) {
  if (!source.includes(providerBefore)) throw new Error('Language provider target was not found.');
  source = source.replace(providerBefore, providerAfter);
}

const start = source.indexOf('function yA(){');
const end = source.indexOf('function CA(){', start);
if (start < 0 || end < 0) throw new Error('Admin production block was not found.');

let admin = source.slice(start, end);
const alreadyLocalized = admin.includes('peecAdminText("PEEC Admin Login"');

// Subscribe every admin screen to the language context so it re-renders as
// soon as the shared English/Tigrigna toggle changes.
for (const name of ['yA', 'vA', 'er', 'tr']) {
  const before = `function ${name}(`;
  const position = admin.indexOf(before);
  if (position < 0) throw new Error(`Admin component ${name} was not found.`);
  const body = admin.indexOf('){', position + before.length) + 1;
  if (body === 0) throw new Error(`Admin component ${name} body was not found.`);
  if (admin.slice(body + 1, body + 6) !== 'pa();') {
    admin = admin.slice(0, body + 1) + 'pa();' + admin.slice(body + 1);
  }
}

const translations = new Map([
  ['Create Permanent Password', 'ቀዋሚ መሕለፊ ቃል ፍጠሩ'],
  ['PEEC Admin Login', 'ናይ PEEC ምምሕዳር መእተዊ'],
  ['Administrator email', 'ኢመይል ኣመሓዳሪ'],
  ['New permanent password', 'ሓድሽ ቀዋሚ መሕለፊ ቃል'],
  ['Password', 'መሕለፊ ቃል'],
  ['Confirm permanent password', 'መሕለፊ ቃል ኣረጋግጹ'],
  ['Please wait…', 'በጃኹም ተጸበዩ…'],
  ['Save Password', 'መሕለፊ ቃል ዓቅቡ'],
  ['Login', 'እተዉ'],
  ['PEEC Admin Dashboard', 'ናይ PEEC ምምሕዳር ሰሌዳ'],
  ['Logout', 'ውጹ'],
  ['Announcements', 'ምልክታታት'],
  ['Add or update church announcements.', 'ናይ ቤተ ክርስቲያን ምልክታታት ወስኹ ወይ ኣሐድሱ።'],
  ['Manage Announcements', 'ምልክታታት ኣመሓድሩ'],
  ['Events', 'መደባት'],
  ['Add upcoming church events and programs.', 'ዝመጹ መደባትን ፕሮግራማትን ቤተ ክርስቲያን ወስኹ።'],
  ['Manage Events', 'መደባት ኣመሓድሩ'],
  ['Pictures', 'ስእልታት'],
  ['Update homepage, about page, pastor, elders, and event pictures.', 'ናይ ቀዳማይ ገጽ፣ ብዛዕባና፣ ፓስተር፣ ሽማግለታትን መደባትን ስእልታት ኣሐድሱ።'],
  ['Manage Pictures', 'ስእልታት ኣመሓድሩ'],
  ['Giving', 'ምሃብ'],
  ['Update giving information.', 'ሓበሬታ ምሃብ ኣሐድሱ።'],
  ['Manage Giving', 'ምሃብ ኣመሓድሩ'],
  ['Back to Dashboard', 'ናብ ሰሌዳ ተመለሱ'],
  ['Saving…', 'ይዕቀብ ኣሎ…'],
  ['Save Changes', 'ለውጥታት ዓቅቡ'],
  ['Using the current website values.', 'ናይ ሕጂ ዋጋታት ወብሳይት ይጥቀም ኣሎ።'],
  ['Saved successfully.', 'ብዓወት ተዓቂቡ።'],
  ['Manage Announcements', 'ምልክታታት ኣመሓድሩ'],
  ['English title', 'ናይ እንግሊዝኛ ኣርእስቲ'],
  ['Tigrigna title', 'ናይ ትግርኛ ኣርእስቲ'],
  ['English message', 'ናይ እንግሊዝኛ መልእኽቲ'],
  ['Tigrigna message', 'ናይ ትግርኛ መልእኽቲ'],
  [' Show this announcement', ' እዚ ምልክታ ኣርእዩ'],
  ['Manage Events', 'መደባት ኣመሓድሩ'],
  ['Add Event', 'መደብ ወስኹ'],
  ['Date', 'ዕለት'],
  ['Time', 'ሰዓት'],
  ['English details', 'ናይ እንግሊዝኛ ዝርዝር'],
  ['Tigrigna details', 'ናይ ትግርኛ ዝርዝር'],
  ['Remove Event', 'መደብ ኣውግዱ'],
  ['Manage Giving', 'ምሃብ ኣመሓድሩ'],
  ['General giving Zelle', 'ናይ ሓፈሻዊ ምሃብ Zelle'],
  ['Building fund Zelle', 'ናይ ህንጻ ሓገዝ Zelle'],
  ['Card-giving link', 'ናይ ካርድ ምሃብ መላግቦ'],
  ['Fundraising goal', 'ዕላማ ምእካብ ገንዘብ'],
  ['Raised so far', 'ክሳዕ ሕጂ ዝተኣከበ'],
  ['Manage Pictures and Leadership', 'ስእልታትን መራሕትን ኣመሓድሩ'],
  ['Homepage main picture', 'ናይ ቀዳማይ ገጽ ዋና ስእሊ'],
  ['About Us page picture', 'ናይ ብዛዕባና ገጽ ስእሊ'],
  ['Senior Pastor picture', 'ናይ ዋና ፓስተር ስእሊ'],
  ['Grow in Faith section picture', 'ናይ ብእምነት ዕበዩ ክፍሊ ስእሊ'],
  ['Community section picture', 'ናይ ማሕበረሰብ ክፍሊ ስእሊ'],
  ['Make an Impact section picture', 'ናይ ለውጢ ፍጠሩ ክፍሊ ስእሊ'],
  ['Life at PEEC — Choir group', 'ህይወት ኣብ PEEC — ጉጅለ መዘምራን'],
  ['Life at PEEC — Children’s sack race', 'ህይወት ኣብ PEEC — ናይ ቆልዑ ውድድር ከረጺት'],
  ['Life at PEEC — Cultural celebration', 'ህይወት ኣብ PEEC — ባህላዊ በዓል'],
  ['Life at PEEC — Children’s outdoor games', 'ህይወት ኣብ PEEC — ናይ ቆልዑ ናይ ደገ ጸወታታት'],
  ['Life at PEEC — Community meal volunteers', 'ህይወት ኣብ PEEC — ወለንተኛታት ናይ ሓባር መኣዲ'],
  ['Life at PEEC — Family cultural celebration', 'ህይወት ኣብ PEEC — ናይ ስድራቤት ባህላዊ በዓል'],
  ['Life at PEEC — Youth choir', 'ህይወት ኣብ PEEC — መዘምራን መንእሰያት'],
  ['Life at PEEC — Church picnic', 'ህይወት ኣብ PEEC — ናይ ቤተ ክርስቲያን ሽርሽር'],
  ['Life at PEEC — Christmas choir', 'ህይወት ኣብ PEEC — መዘምራን ልደት'],
  ['Life at PEEC — Cultural dance group', 'ህይወት ኣብ PEEC — ጉጅለ ባህላዊ ሳዕስዒት'],
  ['Life at PEEC — Picnic fellowship', 'ህይወት ኣብ PEEC — ሕብረት ሽርሽር'],
  ['Life at PEEC — Anniversary celebration', 'ህይወት ኣብ PEEC — በዓል ዓመት'],
  ['Life at PEEC — Women and children fellowship', 'ህይወት ኣብ PEEC — ሕብረት ደቂ ኣንስትዮን ቆልዑን'],
  ['Life at PEEC — Worship service', 'ህይወት ኣብ PEEC — ናይ ኣምልኾ ኣገልግሎት'],
  ['Building Fund — Main children’s program picture', 'ሓገዝ ህንጻ — ዋና ስእሊ መደብ ቆልዑ'],
  ['Building Fund — Worship gathering picture', 'ሓገዝ ህንጻ — ስእሊ ናይ ኣምልኾ ኣኼባ'],
  ['Building Fund — Women and youth ministry picture', 'ሓገዝ ህንጻ — ስእሊ ኣገልግሎት ደቂ ኣንስትዮን መንእሰያትን'],
  ['Building Fund — Youth cultural fellowship picture', 'ሓገዝ ህንጻ — ስእሊ ባህላዊ ሕብረት መንእሰያት'],
  ['Building Fund — Fundraising flyer', 'ሓገዝ ህንጻ — ወረቐት ምእካብ ገንዘብ'],
  ['Uploading…', 'ይስቀል ኣሎ…'],
  ['Name', 'ስም'],
  ['Title', 'ሓላፍነት'],
  ['Pastor details', 'ዝርዝር ፓስተር'],
  ['Elder 1 details', 'ዝርዝር 1ይ ሽማግለ'],
  ['Elder 2 details', 'ዝርዝር 2ይ ሽማግለ'],
  ['Elder 3 details', 'ዝርዝር 3ይ ሽማግለ'],
  ['Elder 4 details', 'ዝርዝር 4ይ ሽማግለ'],
  ['Elder 5 details', 'ዝርዝር 5ይ ሽማግለ'],
]);

for (let i = 1; i <= 5; i += 1) {
  translations.set(`Elder ${i} — ${['Tesfazghi Tesfou','Paulos Gebremariam','Mussie Mengisteab','Teklit Abraham','Efrem Buru'][i - 1]} picture`, `ናይ ${i}ይ ሽማግለ ስእሊ`);
}

if (!alreadyLocalized) {
  for (const [english, tigrigna] of translations) {
    const before = JSON.stringify(english);
    const after = `peecAdminText(${before},${JSON.stringify(tigrigna)})`;
    admin = admin.split(before).join(after);
  }

  admin = admin
  .replace('S("The new passwords do not match.")', 'S(peecAdminText("The new passwords do not match.","እቶም ሓደስቲ መሕለፊ ቃላት ኣይመሳሰሉን።"))')
  .replace('S("Create a permanent password to complete your first login.")', 'S(peecAdminText("Create a permanent password to complete your first login.","ቀዳማይ መእተዊኹም ንምዝዛም ቀዋሚ መሕለፊ ቃል ፍጠሩ።"))')
  .replace('S(G?.message||"Unable to sign in. Please try again.")', 'S(G?.message||peecAdminText("Unable to sign in. Please try again.","ምእታው ኣይተኻእለን። እንደገና ፈትኑ።"))')
  .replace('S("The password was accepted, but another verification step is required.")', 'S(peecAdminText("The password was accepted, but another verification step is required.","መሕለፊ ቃል ተቐቢሉ፣ ግን ተወሳኺ ምርግጋጽ የድሊ።"))')
    .replace('S(G?.message||"Unable to set the permanent password.")', 'S(G?.message||peecAdminText("Unable to set the permanent password.","ቀዋሚ መሕለፊ ቃል ምውሳን ኣይተኻእለን።"))');
}

source = source.slice(0, start) + admin + source.slice(end);
fs.writeFileSync(bundlePath, source);
console.log(`Patched ${bundleName}: complete bilingual admin interface.`);
