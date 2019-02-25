module.exports = {

  createMatrics: (text) => {
    var retObj = {};
    var arrayOfCharacter = text.split('');
    var arrayOfWords = text.split(/[^A-Za-z]/);

    //------------------------------------------------------------------------------
    //total letters
    var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lettersArr = letters.split('');
    var totalLetters = 0;

    for (var i = 0; i < arrayOfCharacter.length; i++) {
      if (lettersArr.indexOf(arrayOfCharacter[i]) > -1) {
        totalLetters += 1;
      }
    }

    //------------------------------------------------------------------------------
    //non letters
    var nonLetters = "0123456789/[@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?!]/g\ \\n\\t";
    var nonLettersArr = nonLetters.split('');
    var totalNonLetters = 0;

    for (var i = 0; i < arrayOfCharacter.length; i++) {
      if (nonLettersArr.indexOf(arrayOfCharacter[i]) > -1) {
        totalNonLetters += 1;
      }
    }

    // ------------------------------------------------------------------------------
    //total words
    var totalWords = 0;
    var words = [];

    for (var i = 0; i < arrayOfWords.length; i++) {
      if (lettersArr.indexOf(arrayOfWords[i][0]) > -1) {
        words.push(arrayOfWords[i]);
        totalWords += 1;
      }
    }

    // -----------------------------------------------------------------------------
    //total vowels & Consonants
    var vowels = "aeiou"
    var arrayOfCharacterVowels = vowels.split('');
    var totalVowels = 0;
    var totalConsonants = 0;

    for (var i = 0; i < arrayOfCharacter.length; i++) {
      if (arrayOfCharacterVowels.indexOf(arrayOfCharacter[i]) > -1) {
        totalVowels += 1;
      } else {
        totalConsonants = totalLetters - totalVowels;
      }
    }

    // -----------------------------------------------------------------------------
    //unique words
    var lowerCase = words.map(lowerStr => lowerStr.toLowerCase());
    var unique = [];
    unique.push(lowerCase[0]);

    for (var i = 0; i < lowerCase.length; i++) {
      var k1 = 0;
      for (var j = 0; j < unique.length; j++) {
        if (lowerCase[i] == unique[j]) {
          k1 = 0;
          break;
        } else {
          k1 = 1;
        }
      }
      if (k1 == 1) {
        unique.push(lowerCase[i]);
      }
      var uniqueWords = unique.length;
    }

    // -----------------------------------------------------------------------------
    //long words
    var longWord = arrayOfWords.filter(word => word.length > 5);
    var longWords = longWord.length;

    // -----------------------------------------------------------------------------
    //average word lengths
    var averageWordLength = (totalLetters / totalWords);

    // -----------------------------------------------------------------------------
    //word occurrence
    var wordOccur = {};

    lowerCase.sort();
    var curWord = lowerCase[0];
    var curCount = 0;
    for (var i = 0; i < lowerCase.length; i++) {
      if (curWord == lowerCase[i]) {
        curCount += 1;
      } else {
        curWord = lowerCase[i];
        curCount = 1;
      }
      wordOccur[curWord] = curCount;
    }

    retObj["totalLetters"] = totalLetters;
    retObj["totalNonLetters"] = totalNonLetters;
    retObj["totalWords"] = totalWords;
    retObj["totalVowels"] = totalVowels;
    retObj["totalConsonants"] = totalConsonants;
    retObj["longWords"] = longWords;
    retObj["uniqueWords"] = uniqueWords;
    retObj["averageWordLength"] = averageWordLength;
    retObj["wordOccurrences"] = wordOccur;
    return retObj;
  }
}
