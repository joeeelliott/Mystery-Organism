// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)]
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,
    mutate() {  //mutate a random DNA strand with random (but different to existing) base letter
      let randomDnaBaseIndex = Math.floor(Math.random() * 14)
      let currentDnaBaseLetter = this.dna[randomDnaBaseIndex]; //stores value of current letter (random index)
      let randomBaseLetter = returnRandBase(); //stores random new base letter
      if (currentDnaBaseLetter !== randomBaseLetter) {  //if letters NOT equal 
        this.dna[randomDnaBaseIndex] = randomBaseLetter; //replace old letter with new one
      } else {     //else run loop for new random letter
        let i = 0;
        while (i < 100) {   // loop ensures we can get a new letter if they're still the same 
          randomBaseLetter = returnRandBase();  // get new random base
          if (currentDnaBaseLetter !== randomBaseLetter) {  // if NOT equal
            this.dna[randomDnaBaseIndex] = randomBaseLetter;  // replace old letter with new one
            break;   //break loop as we have what was required
          } else {
            ;     // if letters are still equal, run loop again for a new random letter. repeat until letter differ
          }
          i++
        }
      }
      return this.dna;
    },
    compareDNA(pAequor) {  //gives % of the same letters in same index position 
      let sameLetterCount = 0; //increases if the same letter is in the same index position in both 
      let percent;
      for (let i = 0; i < this.dna.length; i++) { //loop thru current dna
        if (this.dna[i] === pAequor.dna[i]) {  //if the letter is the same in the same index positions as they iterate through...
          sameLetterCount++;    //add 1 to the letter count
        }
      }
      percent = sameLetterCount / 15 * 100; //calculates percentage
      return `Specimen ${this.specimenNum} and Specimen ${pAequor.specimenNum} have ${percent.toFixed(2)}% DNA in common.`;
    },
    willLikelySurvive() {  //if 60%+ of DNA strand are bases 'C' & 'G', organism will likely survive (true), else false.
      const CG = this.dna.filter(item => {    //return only C's & G's
        return item === "C" || item === "G";
      });
      let percent = (CG.length / this.dna.length * 100).toFixed(2)
      if (percent >= 60) {   //calculates percentage and if over 60%...
        return true;       //return true
      } else {
        return false;
      }
    },
    complementStrand() {  //switches the A's to T's and vice versa, and the G's to C's and vice versa
      for (let i = 0; i < this.dna.length; i++) {  //iterates through dna
        if (this.dna[i] === "A") {                 //if the letter is "A"
          this.dna[i] = "T";                       //it now equals "T"
        } else if (this.dna[i] === "T") {          //if the letter is "T"
          this.dna[i] = "A";                       //it now equals "A"
        } else if (this.dna[i] === "C") {          //if the letter is "C"
          this.dna[i] = "G";                       //it now equals "G"
        } else if (this.dna[i] === "G") {          //if the letter is "G"
          this.dna[i] = "C";                       //it now equals "C"
        }
      }
      return this.dna;          //return dna with switched values
    }
  }
};

//Create 30 instances of pAequor that return true to willLikelySurvive() & store them in an array. 
const survivingPAequor = (num, amount) => {  //num = specimen num to start at, so that for each batch you create, they don't have the same specimen numbers as the previous. amount = amount of truthy values we want in the returned array ....
  const arr = [];
  let i = 0;
  while (i === 0) { //'i' will always be 0. we aren't setting a loop end here
    let pAequor = pAequorFactory(num, mockUpStrand()); //create a pAequor
    if (pAequor.willLikelySurvive()) {  //if result === truthy...
      arr.push(pAequor);            //push into new array
      num++               //increment specimen number for next pAequor
    }
    if (arr.length === amount) { //if the array reaches the amount of values we require...
      break;                 //break the loop
    }
  };
  return arr;  //returns array of only truthy values, with the correct amount of values we require
};