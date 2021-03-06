const updatenote = (inputKey, inputString) => {

    const fs = require('fs');

    const FileName = 'data.json'

    fs.readFile(FileName, 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading File:",  err);
        } try {
            const content = JSON.parse(data);
            if (Object.keys(content.notes).includes(inputKey)) {
                content.notes[inputKey] = inputString;
                const jsonString = JSON.stringify(content, null, 2);
                fs.writeFile(FileName, jsonString, err => {
                    if (err) {
                        console.log('Error writing JSON File: ', err);
                    }    
                })
            } else {
                console.log(`Invalid key: ${inputKey}, Please enter a valid key to update`);
            }
        } catch (err) {
            console.log("Error parsing JSON string: ", err);
        } 
    });
}

module.exports = updatenote;