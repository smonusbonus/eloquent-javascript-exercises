for (let i = 1; i < 8; i++) {
  let str = '';
  const symbol = '#';
  while (str.length < i) {
    str = str.concat(symbol);
  }
  console.log(str);
}
