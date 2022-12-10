const fs = require('fs');

const getInput = (fileUrl) => {
  const data = fs.readFileSync(fileUrl, { encoding: "utf8" }).split('\n');
  return data;
}

export {
  getInput
};