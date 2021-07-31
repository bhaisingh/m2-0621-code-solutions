let currentCount = 3;
const intervalID = setInterval(() => {
    console.log(currentCount);
    currentCount -= 1;
    if (currentCount === 0) {
        console.log('Blast off!');
        clearInterval(intervalID);
    }
}, 1000);