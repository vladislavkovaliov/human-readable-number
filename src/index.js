module.exports = function toReadable(number) {
    const stateOfNumber = {
        "0": ["zero",  "ten"],
        "1": ["one",   "eleven",    "one hundred"],
        "2": ["two",   "twelve",    "two hundred"],
        "3": ["three", "thirteen",  "three hundred"],
        "4": ["four",  "fourteen",  "four hundred"],
        "5": ["five",  "fifteen",   "five hundred"],
        "6": ["six",   "sixteen",   "six hundred"],
        "7": ["seven", "seventeen", "seven hundred"],
        "8": ["eight", "eighteen",  "eight hundred"],
        "9": ["nine",  "nineteen",  "nine hundred"],
    };

    const stateOfDozens = [null, null, "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    const arrNumber = number.toString().split('');

    function makeNumber(stateOfNumber, array) {
        return stateOfNumber[array[0]][0];
    }

    function makeDozen(stateOfNumber, stateOfDozens, array) {
        const ext = array[0] == 0 ? "" : (" " + makeNumber(stateOfNumber, array));

        return stateOfDozens[array[1]] + ext;
    }

    if (arrNumber.length == 1) {
        return makeNumber(stateOfNumber, arrNumber);     
    }
    
    if (arrNumber.length == 2) {
        const arrNumberReverse = [...arrNumber].reverse();
        
        if (arrNumberReverse[1] == 1 || arrNumberReverse[1] == 0) {
            return stateOfNumber[arrNumberReverse[0]][arrNumber.length - 1];      
        }
        
        for(let i = 2; i < 10; i++) {
            return makeDozen(stateOfNumber, stateOfDozens, arrNumberReverse);
        }
    }

    if (arrNumber.length == 3) {
        const arrNumberReverse = [...arrNumber].reverse();
        
        if (arrNumberReverse[1] == 0 && arrNumberReverse[0] == 0) {
            return stateOfNumber[arrNumberReverse[2]][arrNumber.length - 1];      
        }

        if (arrNumberReverse[1] == 0) {
            return stateOfNumber[arrNumberReverse[2]][0] + " hundred " + makeNumber(stateOfNumber, arrNumberReverse);
        }
        
        if (arrNumberReverse[1] == 1) {
            return stateOfNumber[arrNumberReverse[2]][0] + " hundred " + stateOfNumber[arrNumberReverse[0]][1];
        }
        
        for(let i = 2; i < 10; i++) {
            return stateOfNumber[arrNumberReverse[2]][0] + " hundred " + makeDozen(stateOfNumber, stateOfDozens, arrNumberReverse);
        }      
    }
}
