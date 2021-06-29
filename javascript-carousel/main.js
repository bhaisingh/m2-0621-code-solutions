const timer = function () {
    currentImage += 1;
    if (currentImage >= $images.length) {
        currentImage = 0;
    }
    renderImage(currentImage);
}

let currentImage = 0;
let timerID = setInterval(timer, 3000);

const $images = document.querySelectorAll(".image");
const $dots = document.querySelectorAll(".dot");
const $next = document.querySelector(".next");
const $prev = document.querySelector(".prev");

const renderImage = function (imageNo) {
    $images.forEach(function(image) {
        image.style.display = "none";
    });

    $dots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    $images[imageNo].style.display = "block";
    $dots[imageNo].classList.add("active");
}

const next = function () {
    currentImage += 1;
    if (currentImage >= $images.length) {
        currentImage = 0;
    }
    clearInterval(timerID);
    timerID = setInterval(timer, 3000);
    renderImage(currentImage);
}

const prev = function () {
    currentImage -= 1;
    if (currentImage < 0) {
        currentImage = $images.length - 1;
    }
    clearInterval(timerID);
    timerID = setInterval(timer, 3000);
    renderImage(currentImage);
}

const dotImage = function (dot, index) {
    dot.addEventListener('click', function () {
        clearInterval(timerID);
        timerID = setInterval(timer, 3000);
        currentImage = index;
        renderImage(index);
    })
}

document.addEventListener('DOMContentLoaded', renderImage(currentImage));
$next.addEventListener('click', next);
$prev.addEventListener('click', prev);

$dots.forEach(dotImage) 


