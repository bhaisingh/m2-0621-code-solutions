const takeAChance = require('./take-a-chance');

const chanceObject = takeAChance('Rakesh');

chanceObject
.then(data => console.log(data))
.catch(err => console.log(err.message))
