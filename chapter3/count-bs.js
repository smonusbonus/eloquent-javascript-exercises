function countBs(str) {
  let count = 0;
  Array.from(str).forEach((char) => {
    if (char === 'B') {
      count++;
    }
  });
  return count;
}

console.log(countBs('Beer'));
console.log(countBs('BaBa'));
console.log(countBs('Budweiser is Brilliant'));
