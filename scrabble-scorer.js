// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }

	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   return input.question("Scrabble time! Enter a word to process: ");
};

let simpleScore = function(word) {
  return word.length;
}

let vowelBonusScore = function(word) {
  arrWord = word.toUpperCase().split("");
  let score = 0;
  for (let i = 0; i < word.length ; i++) {
    if (arrWord[i] == 'A' || arrWord[i] == 'E' || arrWord[i] == 'I' || arrWord[i] == 'O' || arrWord[i] == 'U') {
      score += 3;
    }
    else {
      score += 1;
    }
  }
  return score;
}

let scrabbleScore = function(word) {
  arrWord = word.toLowerCase().split("");
  let score = 0;
  scrabblePoints = newPointStructure;
  for (letter in arrWord) {
    score += Number(scrabblePoints[arrWord[letter].toLowerCase()]);
  }
  return score;
}
const scoringAlgorithms = [
  basicScore = {
    name: 'Simple Score',
    description: 'Each letter is worth 1 point.',
    scoringFunction: simpleScore
  },
  bonusScore = {
    name: 'Bonus Vowels',
    description: 'Vowels are 3 pts, consonants are 1 pt.',
    scoringFunction: vowelBonusScore
  },
  scrabble = {
    name: 'Scrabble',
    description: 'The traditional scoring algorithm.',
    scoringFunction: scrabbleScore
  }
];

function scorerPrompt(scoreMethods) {
  console.log("\nGreat! We have our word, now we need a choice. Choose one of the following scoring methods:\n")
  console.log(`Option 0: ${scoreMethods[0].name}  -  ${scoreMethods[0].description}`)
  console.log(`Option 1: ${scoreMethods[1].name}  -  ${scoreMethods[1].description}`)
  console.log(`Option 2: ${scoreMethods[2].name}      -  ${scoreMethods[2].description}`)
  return scoringAlgorithms[input.question("\nEnter 0, 1 or 2: ")];
}

function transform(oldPointStructure) {
  
  let newPoints = {};

  for (item in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[item].length; i++) {
      newPoints[oldPointStructure[item][i].toLowerCase()] = Number(item);
    }
  }
  return newPoints;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  word = initialPrompt();
  scoringMethod = scorerPrompt(scoringAlgorithms);
  console.log(`\nScoring method chosen: ${scoringMethod.name}\nScore for "${word}" is ${scoringMethod.scoringFunction(word)}`)
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

