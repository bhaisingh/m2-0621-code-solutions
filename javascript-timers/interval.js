const updateH1 = function () {
    let countValue = document.querySelector('h1').textContent
    countValue -= 1;
    if (countValue === 0) {
        document.querySelector('h1').textContent = '~Earth Beeeelooowww Us~' 
        clearInterval(intervalID);
    } else {
        document.querySelector('h1').textContent = countValue 
    }
}

const intervalID = setInterval(updateH1, 2000);