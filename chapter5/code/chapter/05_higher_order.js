const ANCESTRY_FILE = require('../ancestry.js');
const ancestry = JSON.parse(ANCESTRY_FILE);

function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if (person == null)
      return defaultValue;
    else
      return f(person, valueFor(byName[person.mother]),
                       valueFor(byName[person.father]));
  }
  return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather) {
  if (person.name == "Pauwels van Haverbeke")
    return 1;
  else
    return (fromMother + fromFather) / 2;
}

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

// Your code here.
const mothersAgesAtBirthdays = ancestry.map((person) => {
  const mother = byName[person.mother];
  if (mother) {
    const ageAtBirth = person.born - mother.born;
    return ageAtBirth;
  }
  return undefined;
}).filter(age => age !== undefined);

console.log(average(mothersAgesAtBirthdays));

const ageByCentury = {};
ancestry.forEach((person) => {
  const age = person.died - person.born;
  const century = Math.ceil(person.died / 100);

  if (!ageByCentury[century]) {
    ageByCentury[century] = [];
  }
  ageByCentury[century].push(age);
});

Object.keys(ageByCentury).forEach(century => {
  console.log(century, average(ageByCentury[century]));
});

const every = (array, func) => {
  let result = false;
  for(let i = 0; i < array.length; i++) {
    result = func(array[i]);
    if (!result) { break; }
  }
  return result;
}

console.log(every(ancestry, (person) => person.name !== undefined));
console.log(every(ancestry, (person) => person.died > 1700));
