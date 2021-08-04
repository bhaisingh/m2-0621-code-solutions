const fs = require('fs');

const content = process.argv[2] + '\n';

fs.writeFile('note.txt', content, err => {
    if (err) {
        console.log(err);
        return;
    }
});
