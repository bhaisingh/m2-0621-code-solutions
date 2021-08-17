const fs = require('fs');

const inputFileName = process.argv[2];

fs.readFile(inputFileName, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});