const crypto = require("crypto");

exports.encryptString = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex")
}