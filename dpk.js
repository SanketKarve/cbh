const {encryptString} = require("./utils")
const {TRIVIAL_PARTITION_KEY,MAX_PARTITION_KEY_LENGTH } = require("./constants")

exports.deterministicPartitionKey = (event) => {
  let candidate = TRIVIAL_PARTITION_KEY;

  // If no event then return candidate
  if (!event) {
    return candidate;
  }

  if (event.partitionKey) {
    candidate = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    candidate = encryptString(data)
  }

  if (candidate && typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = encryptString(candidate)
  }
  return candidate;
};