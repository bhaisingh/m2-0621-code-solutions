function ExampleConstructor() {

}
console.log('Value of prototype property: ', ExampleConstructor.prototype);
console.log('Type of prototype property: ', typeof ExampleConstructor.prototype);

const aExampleConstructor = new ExampleConstructor();
console.log('value of new Object: ', aExampleConstructor);

let truthValue = aExampleConstructor instanceof ExampleConstructor
console.log('Is aExampleConstructor is instanceof: ', truthValue);