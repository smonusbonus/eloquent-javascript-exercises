function range(start, end) {
  const result = [];
  while(result.length <= end) {
    result.push(start);
    start ++;
  }
  return result;
}

function sum(array) {
  return array.reduce((prev, current) => prev + current, 0);
}

console.log(range(0, 10));
console.log(sum(range(0, 10)));
console.log(sum(range(0, 2)));
console.log(sum(range(0, 5)));
