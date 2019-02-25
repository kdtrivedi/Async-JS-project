const bluebird = require("bluebird");
const Promise = bluebird.Promise;

const prompt = bluebird.promisifyAll(require("prompt"));
const fs = bluebird.promisifyAll(require("fs"));

const fileData = require("./fileData.js");
const textMetrics = require("./textMetrics.js");

async function main() {
  const promptOp = {
    name: "inputFile",
    description: "Please enter the file name you want to open"
  };

  let promptOut = await prompt.getAsync([promptOp]);
  const inputFile = promptOut.inputFile;

  if (!inputFile) {
    throw "Please provide a file name";
  }

  var justName = inputFile.split('.');

  if (fs.existsSync(justName[0] + ".result.json")) {
    console.log("The result json file already exists for this file.");
    var jsonContent = fileData.getFileAsJSON(justName[0] + ".result.json");
    console.log(typeof(jsonContent));

  } else {
    //read text file in string
    var fileContent = await fileData.getFileAsString(inputFile);
    console.log(typeof(fileContent));

    //run textMetrics on file content.
    console.log("Running textMetrics on file content...");
    var convObj = textMetrics.createMatrics(fileContent);
    console.log("The obj after textMetrics: ");
    console.log(convObj);

    //save resulting text matrics to JSON file
    var temp001 = await fileData.saveJSONToFile(justName[0] + ".result.json", convObj);
    console.log(typeof(temp001));
  }
}
main().catch(err => {
  console.log(err);
});
