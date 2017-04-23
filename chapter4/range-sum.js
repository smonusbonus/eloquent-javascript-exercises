function range(start, end, step = 1) {
  const result = [];
  while(start <= end) {
    result.push(start);
    start = start + step;
  }
  return result;
}

function sum(array) {
  return array.reduce((prev, current) => prev + current, 0);
}

console.log(range(0, 10));
console.log(range(1, 10, 2));
console.log(sum(range(0, 10)));
console.log(sum(range(0, 2)));
console.log(sum(range(0, 5)));
