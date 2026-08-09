const fs = require("node:fs");

const path = "production-dist/assets/index-5AVzLxfS.js";
let source = fs.readFileSync(path, "utf8");

function replaceOnce(before, after, label) {
  const count = source.split(before).length - 1;
  if (count !== 1) throw new Error(`${label}: expected one match, found ${count}`);
  source = source.replace(before, after);
}

replaceOnce(
  'W=A.useMemo(()=>[{img:W2,role:s.pastor,name:"Negga Woldesemait",title:s.pastor,notes:s.pastorNotes},{img:$2,role:s.elder,name:"Tesfazghi Tesfou",title:s.elder,notes:s.elderNotes},{img:eA,role:s.elder,name:"Paulos Gebremariam",title:s.elder,notes:s.elderNotes},{img:tA,role:s.elder,name:"Mussie Mengisteab",title:s.elder,notes:s.elderNotes},{img:nA,role:s.elder,name:"Teklit Abraham",title:s.elder,notes:s.elderNotes},{img:aA,role:s.elder,name:"Efrem Buru",title:s.elder,notes:s.elderNotes}],[l])',
  'W=A.useMemo(()=>[{img:g.pastorImage||W2,role:g.pastorTitle||s.pastor,name:g.pastorName||"Negga Woldesemait",title:g.pastorTitle||s.pastor,notes:g.pastorDescription||s.pastorNotes},{img:g.elder1Image||$2,role:g.elder1Title||s.elder,name:g.elder1Name||"Tesfazghi Tesfou",title:g.elder1Title||s.elder,notes:g.elder1Description||s.elderNotes},{img:g.elder2Image||eA,role:g.elder2Title||s.elder,name:g.elder2Name||"Paulos Gebremariam",title:g.elder2Title||s.elder,notes:g.elder2Description||s.elderNotes},{img:g.elder3Image||tA,role:g.elder3Title||s.elder,name:g.elder3Name||"Mussie Mengisteab",title:g.elder3Title||s.elder,notes:g.elder3Description||s.elderNotes},{img:g.elder4Image||nA,role:g.elder4Title||s.elder,name:g.elder4Name||"Teklit Abraham",title:g.elder4Title||s.elder,notes:g.elder4Description||s.elderNotes},{img:g.elder5Image||aA,role:g.elder5Title||s.elder,name:g.elder5Name||"Efrem Buru",title:g.elder5Title||s.elder,notes:g.elder5Description||s.elderNotes}],[l,g])',
  "leadership display",
);

replaceOnce(
  '["pastorImage","Senior Pastor picture"],["eventImage","Featured event picture"]',
  '["pastorImage","Senior Pastor picture"],["elder1Image","Elder 1 — Tesfazghi Tesfou picture"],["elder2Image","Elder 2 — Paulos Gebremariam picture"],["elder3Image","Elder 3 — Mussie Mengisteab picture"],["elder4Image","Elder 4 — Teklit Abraham picture"],["elder5Image","Elder 5 — Efrem Buru picture"]',
  "elder picture fields",
);

replaceOnce(
  '],c=async(d,h)=>{if(h){s(d);try{const y=await lA(h);n.setContent({...n.content,[d]:y})}catch(y){alert(y.message)}finally{s("")}}};return f.jsx(er,{title:"Manage Pictures",onSave:n.save,status:n.status,saving:n.saving,children:f.jsx("div",{className:"admin-grid",children:r.map(([d,h])=>f.jsxs("div",{className:"admin-card",children:[f.jsx("h2",{children:h}),f.jsx("input",{type:"file",accept:"image/jpeg,image/png,image/webp",onChange:y=>c(d,y.target.files?.[0])}),l===d&&f.jsx("p",{children:"Uploading…"}),n.content?.[d]&&f.jsx("img",{src:n.content[d],alt:h,className:"admin-preview"})]},d))})})}',
  '],v=[["pastor","Pastor details","Negga Woldesemait","Pastor","Our pastor is devoted to preaching the Gospel of Jesus Christ, shepherding the church, and leading with prayer and humility."],["elder1","Elder 1 details","Tesfazghi Tesfou","Church Elder","Our elders support the church through prayer, discipleship, and serving the congregation with wisdom and love."],["elder2","Elder 2 details","Paulos Gebremariam","Church Elder","Our elders support the church through prayer, discipleship, and serving the congregation with wisdom and love."],["elder3","Elder 3 details","Mussie Mengisteab","Church Elder","Our elders support the church through prayer, discipleship, and serving the congregation with wisdom and love."],["elder4","Elder 4 details","Teklit Abraham","Church Elder","Our elders support the church through prayer, discipleship, and serving the congregation with wisdom and love."],["elder5","Elder 5 details","Efrem Buru","Church Elder","Our elders support the church through prayer, discipleship, and serving the congregation with wisdom and love."]],c=async(d,h)=>{if(h){s(d);try{const y=await lA(h);n.setContent({...n.content,[d]:y})}catch(y){alert(y.message)}finally{s("")}}};return f.jsx(er,{title:"Manage Pictures and Leadership",onSave:n.save,status:n.status,saving:n.saving,children:f.jsxs("div",{className:"admin-grid",children:[r.map(([d,h])=>f.jsxs("div",{className:"admin-card",children:[f.jsx("h2",{children:h}),f.jsx("input",{type:"file",accept:"image/jpeg,image/png,image/webp",onChange:y=>c(d,y.target.files?.[0])}),l===d&&f.jsx("p",{children:"Uploading…"}),n.content?.[d]&&f.jsx("img",{src:n.content[d],alt:h,className:"admin-preview"})]},d)),v.map(([d,h,y,p,m])=>f.jsxs("div",{className:"admin-card",children:[f.jsx("h2",{children:h}),f.jsx("label",{children:"Name"}),f.jsx("input",{type:"text",value:n.content?.[`${d}Name`]??y,onChange:e=>n.setContent({...n.content,[`${d}Name`]:e.target.value})}),f.jsx("label",{children:"Title"}),f.jsx("input",{type:"text",value:n.content?.[`${d}Title`]??p,onChange:e=>n.setContent({...n.content,[`${d}Title`]:e.target.value})}),f.jsx("label",{children:"Description"}),f.jsx("textarea",{rows:5,value:n.content?.[`${d}Description`]??m,onChange:e=>n.setContent({...n.content,[`${d}Description`]:e.target.value})})]},`${d}-details`))]})})}',
  "leadership editor",
);

fs.writeFileSync(path, source);
