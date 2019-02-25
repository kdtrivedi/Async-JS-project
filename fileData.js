const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require("fs"));

module.exports = {
    // read text File to String
    getFileAsString: async function(path) {
        if (!path) throw "You must provide a path";
        try {
          const promiseText = fs.readFileAsync(path, "utf8");
          return promiseText;
        } catch (e) {
          console.error(e);
        }
      },

      // save JSON to file
      saveJSONToFile: async function(path, obj) {
          if (!path) throw "You must provide a path";
          try {
            var resultJSON = JSON.stringify(obj);
            var exp1 = await fs.writeFileAsync(path, resultJSON);
            return exp1;
          } catch (e) {
            console.error(e);
          }
        },

        // Read JSON file to string
        getFileAsJSON: async function(path) {
            if (!path) throw "You must provide a path";
            try {
              const promiseJson = fs.readFileAsync(path, "utf8");
              var inJson = await promiseJson;
              var finalObj = JSON.parse(inJson);

              console.log(finalObj);
              return promiseJson;
            } catch (e) {
              console.error(e);
            }
          },

          // save text to file
          saveStringToFile: async function(path, text) {
            if (!path) throw "You must provide a path";
            try {
              await fs.writeFileAsync(path, text);
            } catch (e) {
              console.error(e);
            }

          }
}
