// [-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20,]
// "-6,-3-1,3-5,7-11,14,15,17-20"

// [ -3, -2, -1, 2, 10, 15, 16, 18, 19, 20]
// "-3--1,2,10,15,16,18-20"

function solution(list) {
  console.log(`//////`, list);
  let inRange;
  const solution = list
    .reduce((acc, curr, index, arr) => {
      const nextEl = index === arr.length - 1 ? "" : arr[index + 1];
      console.log("next el is", nextEl);
      console.log("curr - nextEl =", curr - nextEl);

      if (acc.length === 0) acc.push(curr);

      // if difference between curr and nextEl is 1, it means we've spotted the begining of the range
      if (Math.abs(curr - nextEl) === 1) {
        inRange = true;
        return acc;
      }

      const lastSolutionEl = acc.pop();
      if (!inRange) {
        acc.push(lastSolutionEl);
        if (curr !== lastSolutionEl) {
          // push curr ONLY if it is not the same as last solution El
          acc.push(curr);
        }
        acc.push(nextEl);
        return acc;
      }

      acc.push(createRange(lastSolutionEl, curr));
      acc.push(nextEl);
      inRange = false;

      return acc;
    }, [])
    .filter((el) => el !== "")
    .join(",");

  console.log("final solution is", solution);
  return solution;
}

const createRange = (lastSolutionEl, currEl) => {
  const solution = [];
  console.log("range ends");
  if (currEl - lastSolutionEl === 1) {
    // if difference between curr and nextEl is 1, it is not considered as a range
    solution.push(lastSolutionEl, currEl);
  } else {
    // if difference between curr and nextEl is > 1, it means we've spotted the end of the range (currEl is the end)
    solution.push(lastSolutionEl + "-" + currEl);
  }
  return solution;
};

module.exports = {
  solution,
};
