# Async-js-project
Asynchronous Code, Files, and Promises files: particularly, reading them, creating metrics on them, and storing them using promises.

two modules and one test file.

    const bluebird = require("bluebird"); const Promise = bluebird.Promise;

    const fs = bluebird.promisifyAll(require("fs"));

    async function getFileSizeInKilobytes(path){
    if (!path) throw "You must provide a path";
    const stats = await fs.statAsync(path);       
    return stats.size / 1024;
    }

    async function main() {
    const kilos = await getFileSizeInKilobytes("./hello.txt");
    console.log(That file is ${kilos}kb large!); 
    }

    main();
file module, fileData.js This module will export four methods:
async getFileAsString(path)
      
This method is an async function, and will implicitly return a promise. This will await any promises inside this method to get the result of said promise (such as the result of a file operation) in order to use it in later on in the method. If the method enters a state that should return a rejected promise,This should achieve by throwing, as thrown exceptions inside async methods cause the returned promise to be in a rejected state.

This method will, when given a path, return a promise (implicitly, due to being defined as an async function) that resolves to a string with the contents of the files.

If no path is provided, it will return a rejected promise.

If there are any errors reading the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.

    async getFileAsJSON(path)
This method is an async function, and will implicitly return a promise.It will await any promises inside this method to get the result of said promise (such as the result of a file operation) in order to use it in later on in the method. If the method enters a state that should return a rejected promise, It should achieve this by throwing, as thrown exceptions inside async methods cause the returned promise to be in a rejected state.

This method will, when given a path, return a promise that resolves to a JavaScript object. You can use the JSON.parse function to convert a string to a JavaScript object (if it's valid!).

If no path is provided, it will return a rejected promise.

If there are any errors reading the file or parsing the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.

    async saveStringToFile(path, text)
This method is an async function, and will implicitly return a promise. It will await any promises inside this method to get the result of said promise (such as the result of a file operation) in order to use it in later on in the method. If the method enters a state that should return a rejected promise, It should achieve this by throwing, as thrown exceptions inside async methods cause the returned promise to be in a rejected state.

This method will take the text supplied, and store it in the file specified by path. The function should return a promise that will resolve to true when saving is completed.

If no path or text is provided, it will return a rejected promise.

If there are any errors writing the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.

    async saveJSONToFile(path, obj)
This method is an async function, and will implicitly return a promise. It will await any promises inside this method to get the result of said promise (such as the result of a file operation) in order to use it in later on in the method. If the method enters a state that should return a rejected promise, It should achieve this by throwing, as thrown exceptions inside async methods cause the returned promise to be in a rejected state.

This method will take the obj supplied and convert it into a JSON string so that it may stored as in a file. The function should return a promise that will resolve to true when saving is completed.

If no path or obj is provided, it will return a rejected promise.

If there are any errors writing the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.

metric module, textMetrics.js
This module will export a single method, createMetrics(text) which will scan through the text and return an object with the following information based on the lowercased version of the text:

    { totalLetters: total number of letter characters in the text,
    totalNonLetters: total number of non-letters in the text,
    totalVowels: total number of vowels in the text (not counting y),
    totalConsonants: total number of consonants in the text (counting y),
    totalWords: total number of words in the text;
    uniqueWords: total number of unique words that appear in the lowercased text, 
    longWords: number of words in the text that are 6 or more letters long; 
    averageWordLength: the average number of letters in a word in the text; 
    wordOccurrences: a dictionary of each word and how many times each word occurs in the text. }

    createMetrics("Helllo, my -! This is a great day to say helllo.\n\n\tHelllo! 2 3 4 23")

Will return:

    { totalLetters: 40 // (helllomythisisagreatdaytosayhelllohelllo),
    totalNonLetters: 27 // (, -! .\n\n\t! 2 3 4 23)
    totalWords: 11 //(["helllo","my","this","is","a","great","day","to","say","helllo","helllo"] is 11 words), 
    totalVowels: 14,
    totalConsonants: 26, 
    uniqueWords: 9 //(helllo, my, this, is, a, great, day, to, say), 
    longWords: 3,
    averageWordLength: 3.6363636363636362 // (this will round differently on each machine", 
    wordOccurrences: { a: 1 day: 1 great: 1 helllo: 3 is: 1 my: 1 say: 1 this: 1 to: 1 } // this may or may not sort in your system; order DOES NOT MATTER }

app.js which will perform the following operation on each of these files

chapter1.txt chapter2.txt chapter3.txt async function call, that will do the following for each file:
