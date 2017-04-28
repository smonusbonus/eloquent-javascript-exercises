const data = [['foo', 'bar'], ['quick', 'brown', 'fox']];
const flatten = (input) => {
  return input.reduce((prevVal, curVal) => {
    return prevVal.concat(curVal);
  }, []);
};

console.log(flatten(data));
