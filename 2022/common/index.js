// const fs = require('fs');
import fs from 'fs';

const getInput = (fileUrl) => {
  const data = fs.readFileSync(fileUrl, { encoding: "utf8" }).split('\n');
  return data.map(e => e.replace('\r', ''));
}

export default getInput;