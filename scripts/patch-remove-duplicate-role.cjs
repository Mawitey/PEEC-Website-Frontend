const fs = require("node:fs");

const path = "production-dist/assets/index-5AVzLxfS.js";
let source = fs.readFileSync(path, "utf8");
const before = 'f.jsx("span",{children:z.role}),f.jsx("h3",{children:z.name}),f.jsx("p",{children:z.title})';
const after = 'f.jsx("span",{children:z.role}),f.jsx("h3",{children:z.name})';
const count = source.split(before).length - 1;
if (count !== 1) throw new Error(`Expected one leadership-card match, found ${count}`);
source = source.replace(before, after);
fs.writeFileSync(path, source);
