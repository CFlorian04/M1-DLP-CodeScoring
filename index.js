const fs = require("fs");
const scoring = require("./scoring/scoring");

let code = fs.readFileSync("test.py", "utf8");
let score = scoring.from(code);
console.log("--------", "Result", "--------");
console.log(score);


