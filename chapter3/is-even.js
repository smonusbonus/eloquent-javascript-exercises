function isEven(number) {
  const num = Math.abs(number);
  if (num === 0 || num === 2) {
    return true;
  }
  if (num === 1) {
    return false;
  }
  return isEven(num - 2);
}

console.log(isEven(1));
console.log(isEven(2));
console.log(isEven(3));
console.log(isEven(4));
console.log(isEven(5));
console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(122));
console.log(isEven(-1));
console.log(isEven(-4));
