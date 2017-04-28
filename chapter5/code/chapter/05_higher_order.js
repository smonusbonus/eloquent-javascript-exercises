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
