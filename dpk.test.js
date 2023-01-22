const { deterministicPartitionKey } = require("./dpk");
const { encryptString } = require("./utils")
const { MAX_PARTITION_KEY_LENGTH } = require("./constants")

let partitionKey = "abcdef"

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal partitionKey when given partitionKey is given", () => {
    const trivialKey = deterministicPartitionKey({partitionKey});
    expect(trivialKey).toBe(partitionKey);
  });

  it("If the partitionKey is not string should return string", () => {
    partitionKey = 123
    const trivialKey = deterministicPartitionKey({partitionKey});
    expect(typeof trivialKey).toBe("string");
  });

  it("If event is empty", () => {
    const trivialKey = deterministicPartitionKey({});
    const data = encryptString("{}")
    expect(trivialKey).toBe(data);
  });

  it("If event is has short string", () => {
    const sampleString = "Lorem ipsum dolor sit amet"
    const trivialKey = deterministicPartitionKey(sampleString);
    expect(trivialKey.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
  });
  
  it("If event is has long string", () => {
    const sampleString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus elit nibh, in eleifend leo efficitur sed. Vestibulum hendrerit luctus sollicitudin. Curabitur a urna eu neque sollicitudin rhoncus. Mauris a enim in erat porttitor finibus consequat sit amet risus. Nulla facilisi. In congue imperdiet euismod. Donec commodo aliquam lobortis. Mauris quis ipsum diam."
    const trivialKey = deterministicPartitionKey(sampleString);
    expect(trivialKey.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
  });
});
