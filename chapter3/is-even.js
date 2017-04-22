function isEven(number) {
  if (number === 0 || number === 2) {
    return true;
  }
  if (number === 1) {
    return false;
  }
  return isEven(number - 2);
}

console.log(isEven(1));
console.log(isEven(2));
console.log(isEven(3));
console.log(isEven(4));
console.log(isEven(5));
console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(122));
