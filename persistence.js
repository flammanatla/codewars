function persistence(num, counter = 0) {
  //let counter = 0;
  if (num < 10) {
    console.log("counter is", counter);
    return counter;
  }
  const persistentNum = String(num)
    .split("")
    .reduce((res, curr) => {
      return Number(curr) * res;
    }, 1);
  counter++;
  console.log("persistent num is", persistentNum);
  console.log("counter is", counter);
  return persistence(persistentNum, counter);
}

module.exports = {
  persistence,
};
