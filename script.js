// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}    //console.log(returnRandBase());
  
// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}    //console.log(mockUpStrand())
  
const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,
    mutate(){ 
      console.log(`this is the DNA: ${this.dna}`);
      let randomDnaBaseIndex = Math.floor(Math.random() * 14)   
      console.log(`random base index: ${randomDnaBaseIndex}`);
      let currentDnaBaseLetter = this.dna[randomDnaBaseIndex];//tie number to variable
      console.log(`current dna base letter: ${currentDnaBaseLetter}`)
      let randomBaseLetter = returnRandBase();
      console.log(`random base letter: ${randomBaseLetter} to replace current`)
      if(currentDnaBaseLetter !== randomBaseLetter){
        this.dna[randomDnaBaseIndex] = randomBaseLetter;
        console.log(`current letter (${currentDnaBaseLetter}) isn't the same as the random letter (${randomBaseLetter}) so (${randomBaseLetter}) takes (${currentDnaBaseLetter}'s) place`)
        console.log(`current letter is now ${this.dna[randomDnaBaseIndex]}`)
      } else {
        console.log(`current letter (${currentDnaBaseLetter}) is the same as (${randomBaseLetter}) so we will go through the loop...`)
        let i = 0;
        console.log(`this is i`);
        while(i < 100){
          console.log(`i = ${i}`) 
          randomBaseLetter = returnRandBase();
          console.log(`random base letter is now: ${randomBaseLetter}`);
          if(currentDnaBaseLetter !== randomBaseLetter){
            this.dna[randomDnaBaseIndex] = randomBaseLetter;
            console.log(`random letter is now (${randomBaseLetter}), if it's NOT equal to (${currentDnaBaseLetter}), we break the loop.`);
            break;
          } else {
            console.log(`else, if the random letter (${randomBaseLetter}) is still the same, we will go back to the top of the loop and get a new random number`)
            ;
          }
          i++  
        }
        console.log(`if the random letter (${randomBaseLetter}) is now different to the (${currentDnaBaseLetter}) then we can change the current letter in this.dna to ${this.dna[randomDnaBaseIndex]}`) 
      }
    console.log(`this is what we'll be returning: ${this.dna}`)
    return this.dna;
    },
    compareDNA(pAequor){
      let sameLetterCount = 0;
      let percent; 
      console.log(this.dna.join(" "));
      console.log(pAequor.dna.join(" "));
      for(let i = 0; i < this.dna.length; i++){
      //console.log(`is (${this.dna[i]}) equal to (${pAequor.dna[i]})?`)
        if(this.dna[i] === pAequor.dna[i]){
          //console.log(`YEP, push it into sameDna array`)
          sameLetterCount ++;
          //console.log(`same letter count: ${sameLetterCount}`);
          //console.log(`sameDna array: ${sameDna.join(" ")}`)
        } //else {
          //console.log(`NOPE, next pair of letters please...`);
        //}
      }
        percent = sameLetterCount / 15 * 100
        //console.log(`same DNA array: [${sameDna.join(", ")}]`);
        //console.log(`same letter count: ${sameLetterCount}`);
        //console.log(`percent = ${percent}%`);
        return `Specimen ${this.specimenNum} and Specimen ${pAequor.specimenNum} have ${percent.toFixed(2)}% DNA in common.`
    },
    willLikelySurvive(){
      //console.log(this.dna.join(" "))
      const CG = this.dna.filter(item => {
        return item === "C" || item === "G";
      });
      //console.log(`The filtered C's and G's: [${CG.join(" ")}]`);
      //console.log(`C & G tally: ${CG.length}`)   // 9 or more for true
      let percent = (CG.length / this.dna.length * 100).toFixed(2)
      //console.log(`${percent}%`)
      if(percent >= 60){
        return true;
      } else {
        return false; 
      }
    },
    complementStrand(){  //switches the A's to T's and vice versa, and the G's to C's and vice versa. 
      console.log(`OLD DNA = ${this.dna.join(" ")}`);
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === "A"){
          //console.log(`index: ${i}.  this DNA letter is: ${thisDna[i]}.  A becomes T`)
          this.dna[i] = "T";
          //console.log(`NEW DNA = ${thisDna.join(" ")}`);        
        } else if(this.dna[i] === "T"){
          this.dna[i] = "A";
        } else if(this.dna[i] === "C"){
          this.dna[i] = "G";
        } else if(this.dna[i] === "G"){
          this.dna[i] = "C"; 
        }
      }
      console.log(`NEW DNA = ${this.dna.join(" ")}`);
      return this.dna;
    }
  } 
}    

const survivingPAequor = (num, amount) => {
  const arr = [];
  let i = 0;
  while(i === 0){
    let pAequor = pAequorFactory(num, mockUpStrand());
    if(pAequor.willLikelySurvive()){
      arr.push(pAequor);
      num++
    }
    if(arr.length === amount){
      break;
    }
  };     
  return arr;
};

// Use the .compareDNA() to find the two most related instances of pAequor.
const mostRelated = (batch) => {

}

const pAequor1 = pAequorFactory(1, mockUpStrand());
const pAequor2 = pAequorFactory(2, mockUpStrand());
//console.log(pAequor1.complementStrand());

const batch = survivingPAequor(1, 30);
console.log(batch[14].compareDNA(batch[18]));

//console.log(survivingPAequor(1, 30)[0].dna)
//console.log(survivingPAequor(158, 50));
//console.log(pAequor1.willLikelySurvive()); 
////console.log(pAequor1);
//console.log(pAequor2);
//console.log(pAequor1.dna);
//console.log(pAequor1.mutate()); 
//console.log(pAequor1.compareDNA(pAequor2));