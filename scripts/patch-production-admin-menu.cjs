const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'production-dist', 'assets');
const bundleName = fs.readdirSync(assetsDir).find((name) => /^index-.*\.js$/.test(name));

if (!bundleName) throw new Error('Production JavaScript bundle was not found.');

const bundlePath = path.join(assetsDir, bundleName);
let source = fs.readFileSync(bundlePath, 'utf8');

const oldNavbarStart = 'function R1(){const[n,l]=A.useState(!1),{language:s,setLanguage:r,isTigrigna:c}=pa(),d=c?{home:"ቀዳማይ ገጽ",about:"ብዛዕባና",events:"መደባት",media:"ሚድያ",fund:"ናይ ህንጻ ሓገዝ",contact:"ርኸቡና",menu:"ዝርዝር"}:{home:"Home",about:"About",events:"Events",media:"Media",fund:"Building Fund",contact:"Contact",menu:"Menu"},';
const newNavbarStart = 'function R1(){const[n,l]=A.useState(!1),[p,g]=A.useState(!1),{language:s,setLanguage:r,isTigrigna:c}=pa();A.useEffect(()=>{const E=()=>iv().then(S=>g(S.includes("SuperAdmin")||S.includes("ContentEditor"))).catch(()=>g(!1));return E(),window.addEventListener("peec-admin-auth-changed",E),()=>window.removeEventListener("peec-admin-auth-changed",E)},[]);const d=c?{home:"ቀዳማይ ገጽ",about:"ብዛዕባና",events:"መደባት",media:"ሚድያ",fund:"ናይ ህንጻ ሓገዝ",contact:"ርኸቡና",admin:"ምምሕዳር",menu:"ዝርዝር"}:{home:"Home",about:"About",events:"Events",media:"Media",fund:"Building Fund",contact:"Contact",admin:"Admin",menu:"Menu"},';

const oldDesktopEnd = 'f.jsx(ht,{to:"/contact",children:d.contact}),f.jsx(h,{})';
const newDesktopEnd = 'f.jsx(ht,{to:"/contact",children:d.contact}),p&&f.jsx(ht,{to:"/admin/dashboard",children:d.admin}),f.jsx(h,{})';

const oldMobileEnd = 'f.jsx(ht,{to:"/contact",onClick:()=>l(!1),children:d.contact}),f.jsx(h,{})';
const newMobileEnd = 'f.jsx(ht,{to:"/contact",onClick:()=>l(!1),children:d.contact}),p&&f.jsx(ht,{to:"/admin/dashboard",onClick:()=>l(!1),children:d.admin}),f.jsx(h,{})';

const oldLogin = 'G.isSignedIn?j("/admin/dashboard")';
const newLogin = 'G.isSignedIn?(window.dispatchEvent(new Event("peec-admin-auth-changed")),j("/admin/dashboard"))';

const oldNewPasswordLogin = '(await g2({challengeResponse:c})).isSignedIn?j("/admin/dashboard")';
const newNewPasswordLogin = '(await g2({challengeResponse:c})).isSignedIn?(window.dispatchEvent(new Event("peec-admin-auth-changed")),j("/admin/dashboard"))';

const oldLogout = 'const r=l.includes("SuperAdmin"),c=async()=>{await _2(),n("/admin")}';
const newLogout = 'const r=l.includes("SuperAdmin"),c=async()=>{await _2(),window.dispatchEvent(new Event("peec-admin-auth-changed")),n("/admin")}';

const replacements = [
  [oldNavbarStart, newNavbarStart, 'navbar state and translated label'],
  [oldDesktopEnd, newDesktopEnd, 'desktop Admin link'],
  [oldMobileEnd, newMobileEnd, 'mobile Admin link'],
  [oldLogin, newLogin, 'login auth notification'],
  [oldNewPasswordLogin, newNewPasswordLogin, 'new-password login auth notification'],
  [oldLogout, newLogout, 'logout auth notification'],
];

for (const [before, after, label] of replacements) {
  if (source.includes(after)) continue;
  const occurrences = source.split(before).length - 1;
  if (occurrences !== 1) throw new Error(`Expected one ${label} target, found ${occurrences}.`);
  source = source.replace(before, after);
}

fs.writeFileSync(bundlePath, source);
console.log(`Patched ${bundleName}: authenticated bilingual Admin menu.`);
