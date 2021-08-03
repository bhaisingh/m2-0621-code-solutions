const fs = require('fs');

const inputFileName = process.argv[2];
const outputFileName = process.argv[3];
let content = null;

fs.readFile(inputFileName, 'utf8', (err, data) => {
    if (err) throw err;
        content = data;
});

setTimeout(() => {
    fs.writeFile(outputFileName, content, err => {
        if (err) {
            console.log(err);
            return;
        }
    });
    
}, 2000);


