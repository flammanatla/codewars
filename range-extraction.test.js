const chai = require("chai");
const assert = chai.assert;
chai.config.truncateThreshold = 0;

const solution = require("./range-extraction.js").solution;

describe("Sample Tests", () => {
  it("Should pass sample tests", () => {
    assert.deepEqual(
      solution([
        -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20,
      ]),
      "-6,-3-1,3-5,7-11,14,15,17-20"
    );
    assert.deepEqual(
      solution([-3, -2, -1, 2, 10, 15, 16, 18, 19, 20]),
      "-3--1,2,10,15,16,18-20"
    );
    assert.deepEqual(
      solution([
        -70, -69, -68, -66, -63, -61, -60, -57, -54, -51, -50, -48, -45, -43,
        -40, -38, -35, -33, -30, -29,
      ]),
      "-70--68,-66,-63,-61,-60,-57,-54,-51,-50,-48,-45,-43,-40,-38,-35,-33,-30,-29"
    );
  });
});
