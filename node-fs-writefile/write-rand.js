const fs = require('fs');

const content = (Math.random()).toString() +'\n';

fs.writeFile('random.txt', content, err => {
    if (err) {
        console.log(err);
        return;
    }
});
