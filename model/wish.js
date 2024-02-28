// Import the 'fs' (file system) module to work with the file system on your computer.
const fs = require('fs');

// Import the 'path' module to work with file and directory paths.
const path = require('path');

// Define the path to the 'wishes.json' file.
const filePath = path.join(path.dirname(require.main.filename), 'data', 'wishes.json');

// Export a class named 'Wish'.
module.exports = class Wish {

    // The constructor method is called when a new object is created.
    constructor(wish){
        // Set the 'description' property to the 'wish' argument passed into the constructor.
        this.description = wish;
    }

    // Define a method named 'saveWish'.
    saveWish() {
        // Read the file at 'filePath'.
        fs.readFile(filePath, (error, fileContent) => {
            // Initialize an empty array named 'wishes'.
            let wishes = [];

            // If there was no error reading the file...
            if(!error) {
                // Parse the file content as JSON and assign it to 'wishes'.
                wishes = JSON.parse(fileContent);
            } else {
                // If there was an error, log it to the console.
                console.log(error);
            }

            // Add the current object ('this') to the 'wishes' array.
            wishes.push(this);

            // Write the 'wishes' array to the file at 'filePath'.
            fs.writeFile(filePath, JSON.stringify(wishes), (error) => {
                // If there was no error writing the file...
                if(!error) {
                    // Log a success message to the console.
                    console.log('wish saved');
                } else {
                    // If there was an error, log it to the console.
                    console.log(error);
                }
            });

        });
    }

    // Define a static method named 'fetchAllWishes'.
    static fetchAllWishes(callBack) {
        // Read the file at 'filePath'.
        fs.readFile(filePath, (error, fileContent) => {
            // If there was an error reading the file...
            if(error) {
                // Call the 'callBack' function with an empty array.
                callBack([]);
            };

            // Call the 'callBack' function with the file content parsed as JSON.
            callBack(JSON.parse(fileContent));
        });
    }
}