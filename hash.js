const bcrypt = require("bcrypt");

async function hashInput(input) {
  const result = await bcrypt.hash(input, 10);
  return result;
}

async function hashCompare(input, compare) {
  const result = await bcrypt.compare(input, compare);
  return result;
}

module.exports = { hashInput, hashCompare };

