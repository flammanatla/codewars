const chai = require("chai");
const assert = chai.assert;
chai.config.truncateThreshold = 0;

const persistence = require("./persistence.js").persistence;

describe("Persistent Bugger.", () => {
  it("Fixed tests", () => {
    assert.strictEqual(persistence(39), 3);
  });
  it("Fixed tests", () => {
    assert.strictEqual(persistence(4), 0);
  });
  it("Fixed tests", () => {
    assert.strictEqual(persistence(25), 2);
  });
  it("Fixed tests", () => {
    assert.strictEqual(persistence(999), 4);
  });
});
