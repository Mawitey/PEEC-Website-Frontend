const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'production-dist', 'assets');
const bundleName = fs.readdirSync(assetsDir).find((name) => /^index-.*\.js$/.test(name));
if (!bundleName) throw new Error('Production JavaScript bundle was not found.');

const bundlePath = path.join(assetsDir, bundleName);
let source = fs.readFileSync(bundlePath, 'utf8');

function replaceOnce(before, after, label) {
  if (source.includes(after)) return;
  const count = source.split(before).length - 1;
  if (count !== 1) throw new Error(`Expected one ${label} target, found ${count}.`);
  source = source.replace(before, after);
}

// Make the About page image use the same admin-managed picture setting.
replaceOnce(
  'function sA(){const[n,l]=A.useState(null),{isTigrigna:s}=pa(),',
  'function sA(){const[n,l]=A.useState(null),[adminAboutPictures,setAdminAboutPictures]=A.useState({});A.useEffect(()=>{Zl("pictures").then(value=>setAdminAboutPictures(value||{})).catch(()=>{})},[]);const{isTigrigna:s}=pa(),',
  'About picture content loading',
);

const aboutStart = source.indexOf('function sA(){');
const aboutEnd = source.indexOf('function rA(){', aboutStart);
if (aboutStart < 0 || aboutEnd < 0) throw new Error('About page block was not found.');
let aboutBlock = source.slice(aboutStart, aboutEnd);
aboutBlock = aboutBlock.replaceAll('src:Qp', 'src:adminAboutPictures.aboutImage||Qp');
source = source.slice(0, aboutStart) + aboutBlock + source.slice(aboutEnd);

const adminStart = source.indexOf('function bA(){');
const adminEnd = source.indexOf('function CA(){', adminStart);
if (adminStart < 0 || adminEnd < 0) throw new Error('Pictures admin block was not found.');
let admin = source.slice(adminStart, adminEnd);

const arrayBoundary = ']],v=[["pastor",';
const defaults = ']],u={homeHero:J2,aboutImage:Qp,pastorImage:W2,elder1Image:$2,elder2Image:eA,elder3Image:tA,elder4Image:nA,elder5Image:aA,growFaithImage:Kp,communityImage:Vp,impactImage:Fp,lifeChoirGroup:L2,lifeKidsSackRace:P2,lifeCulturalCelebration:B2,lifeKidsOutdoorGames:H2,lifeCommunityMeal:q2,lifeFamilyCelebration:V2,lifeYouthChoir:k2,lifeChurchPicnic:Q2,lifeChristmasChoir:G2,lifeCulturalDance:Z2,lifePicnicFellowship:K2,lifeAnniversary:F2,lifeWomenChildren:X2,lifeWorshipService:Y2,buildingFundMain:cA,buildingFundVision:dA,buildingFundNextGeneration:fA,buildingFundPrayer:hA,buildingFundFlyer:Xp},v=[["pastor",';
if (!admin.includes('u={homeHero:J2')) {
  const count = admin.split(arrayBoundary).length - 1;
  if (count !== 1) throw new Error(`Expected one preview defaults target, found ${count}.`);
  admin = admin.replace(arrayBoundary, defaults);
}

const oldPreview = 'n.content?.[d]&&f.jsx("img",{src:n.content[d],alt:h,className:"admin-preview"})';
const newPreview = '(n.content?.[d]||u[d])&&f.jsx("img",{src:n.content?.[d]||u[d],alt:h,className:"admin-preview"})';
if (!admin.includes(newPreview)) {
  const count = admin.split(oldPreview).length - 1;
  if (count !== 1) throw new Error(`Expected one current-photo preview target, found ${count}.`);
  admin = admin.replace(oldPreview, newPreview);
}

// Keep descriptions on the public leadership cards, but do not expose them as
// editable fields in Admin. Admin can still edit each leader's name and title.
admin = admin.replace('v.map(([d,h,y,p,m])=>', 'v.map(([d,h,y,p])=>');
const descriptionFields = ',f.jsx("label",{children:"Description"}),f.jsx("textarea",{rows:5,value:n.content?.[`${d}Description`]??m,onChange:e=>n.setContent({...n.content,[`${d}Description`]:e.target.value})})';
if (admin.includes(descriptionFields)) admin = admin.replace(descriptionFields, '');

source = source.slice(0, adminStart) + admin + source.slice(adminEnd);
fs.writeFileSync(bundlePath, source);
console.log(`Patched ${bundleName}: current photo previews restored and leadership description fields removed.`);
