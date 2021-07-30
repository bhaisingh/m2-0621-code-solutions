const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

switch(process.argv[3]) {
    case 'plus':
        console.log('result: ', add(process.argv[2], process.argv[4]));
        break;
    case 'minus':
        console.log('result: ', subtract(process.argv[2], process.argv[4]));
        break;
    case 'times':
        console.log('result: ', multiply(process.argv[2], process.argv[4]));
            break;
    case 'over':
        console.log('result: ', divide(process.argv[2], process.argv[4]));
                break;
    default:
        console.log('Invalid calculation request');
}
