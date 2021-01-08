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
    mutate() { //mutate a random DNA strand with random (but different to existing) base letter
      let randomDnaBaseIndex = Math.floor(Math.random() * 14)
      let currentDnaBaseLetter = this.dna[randomDnaBaseIndex];
      let randomBaseLetter = returnRandBase();
      if (currentDnaBaseLetter !== randomBaseLetter) {
        this.dna[randomDnaBaseIndex] = randomBaseLetter;
      } else {
        let i = 0;
        while (i < 100) {
          randomBaseLetter = returnRandBase();
          if (currentDnaBaseLetter !== randomBaseLetter) {
            this.dna[randomDnaBaseIndex] = randomBaseLetter;
            break;
          } else {
            ;
          }
          i++
        }
      }
      return this.dna;
    },
    compareDNA(pAequor) {  //gives % of the same letters in same index position
      let sameLetterCount = 0;
      let percent;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          sameLetterCount++;
        }
      }
      percent = sameLetterCount / 15 * 100;
      return `Specimen ${this.specimenNum} and Specimen ${pAequor.specimenNum} have ${percent.toFixed(2)}% DNA in common.`;
    },
    willLikelySurvive() {  //if 60%+ of DNA strand are bases 'C' & 'G', organism will likely survive (true), else false.
      const CG = this.dna.filter(item => {
        return item === "C" || item === "G";
      });
      let percent = (CG.length / this.dna.length * 100).toFixed(2)
      if (percent >= 60) {
        return true;
      } else {
        return false;
      }
    },
    complementStrand() { //switches the A's to T's and vice versa, and the G's to C's and vice versa
      for (let i = 0; i < this.dna.length; i++) { 
        if (this.dna[i] === "A") { 
          this.dna[i] = "T";            
        } else if (this.dna[i] === "T") {    
          this.dna[i] = "A";                    
        } else if (this.dna[i] === "C") {       
          this.dna[i] = "G";                     
        } else if (this.dna[i] === "G") {         
          this.dna[i] = "C";                   
        }
      }
      return this.dna;   
    }
  }
};

//Create 30 instances of pAequor that return true to willLikelySurvive() & store them in an array. 
const survivingPAequor = (num, amount) => {
  const arr = [];
  let i = 0;
  while (i === 0) {
    let pAequor = pAequorFactory(num, mockUpStrand());
    if (pAequor.willLikelySurvive()) {
      arr.push(pAequor);
      num++
    }
    if (arr.length === amount) {
      break;
    }
  };
  return arr;
};

const batch = survivingPAequor(1, 30);
console.log(batch);