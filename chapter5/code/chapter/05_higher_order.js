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

const some = (array, func) => {
  let result = false;
  for(let i = 0; i < array.length; i++) {
    result = func(array[i]);
    if (result) { break; }
  }
  return result;
}

console.log(some(ancestry, (person) => person.died > 1700));
console.log(some(ancestry, (person) => !person.mother));

const nameAgeMapping = ancestry.map((person) => {
  return { name: person.name, age: person.died - person.born };
});

console.log(nameAgeMapping);

const sortByAge = (nameAgeMapping) => {
  let sorted = [];

  const cutInHalfAndInsert = (array, person) => {
    const centerPos = Math.round(array.length / 2) - 1; // -1 because of 0-based index
    const firstHalf = sorted.slice(0, centerPos + 1);
    const secondHalf = sorted.slice(centerPos + 1);

    if (array[centerPos].age > person.age && array[centerPos + 1].age < person.age) {
      firstHalf.push(person);
      return firstHalf.concat(secondHalf);
    }
    if (array[centerPos + 1].age < person.age) {
      return cutInHalfAndInsert(secondHalf, person);
    }
    return cutInHalfAndInsert(firstHalf, person);
  };

  nameAgeMapping.forEach((person) => {
    if (sorted.length === 0) {
      sorted.push(person);
      return;
    }
    if (sorted.length === 1) {
      if (person.age > sorted[0].age) {
        sorted.push(person);
      } else {
        sorted.unshift(person);
      }
      return;
    }
    if (sorted.length > 1) {
      sorted = cutInHalfAndInsert(sorted);
    }
  });
  return sorted;
};

// Selection Sort
// Quite inefficient on large lists, O(n2)
// For each element of the list it searches the whole list again to find the largest/smallest one
// https://en.wikipedia.org/wiki/Selection_sort
const sortByAge = (peopleList) => {
  let unsortedList = peopleList;
  const sortedList = [];

  // Helper Functions
  const getOldest = (list) => {
    return list.reduce((prev, current) => {
      return current.age > prev.age ? current : prev;
    });
  };
  const removeIndex = (array, index) => {
    return [].concat(array.slice(0, index), array.slice(index + 1));
  };

  // Start sorting
  while (unsortedList.length) {
    const oldest = getOldest(unsortedList);
    const idxOldest = unsortedList.indexOf(oldest);
    unsortedList = removeIndex(unsortedList, idxOldest);
    sortedList.push(oldest);
  }
  return sortedList;
};

// Try implementing an insertion sort or heap sort algorithm
const insertionSort = (inputList) => {
  const sorted = [];
  const insert = (element, list) => {
    // Suppose there exists a function called Insert designed to insert a value into a sorted
    // sequence at the beginning of an array. It operates by beginning at the end of the
    // sequence and shifting each element one place to the right until a suitable position is
    // found for the new element. The function has the side effect of overwriting the value
    // stored immediately after the sorted sequence in the array.
  }
  for (let i = 0; i < inputList.length; i++) {
    // To perform an insertion sort, begin at the left-most element of the array and invoke
    // Insert to insert each element encountered into its correct position. The ordered sequence
    // into which the element is inserted is stored at the beginning of the array in the set
    // of indices already examined. Each insertion overwrites a single value: the value being
    // inserted.
    insert(inputList[i], sorted);
    inputList.splice(i, 1);
  }
  return
};

console.log(selectionSort(nameAgeMapping));
