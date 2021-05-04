const canvas = document.querySelector('[data-action="canvas"]');
const pikerX = document.querySelector('.piker-x');
const pikerY = document.querySelector('.piker-y');
const btnClear = document.querySelector('[data-clear]');
const btnColorPiker = document.querySelector('[data-color-piker]');
const colorContainer = document.querySelector('[data-color-container]');
const quantityOfColorBoxes = 60;

canvas.addEventListener('mousemove', paintOnCanvas);
colorContainer.addEventListener('click', changeColorDorWasPainted)

function changeColorDorWasPainted(e) {
    if (e.target.className !== 'color-item') {
        return;
    }
    console.log(e.target.style.backgroundColor)
    const allDots = canvas.children;
    [...allDots].map(dot => dot.style.backgroundColor = e.target.style.backgroundColor);
    console.log(allDots)
}

let isPainting = false;

function paintOnCanvas({ clientX, clientY }) {

    pikerX.textContent = `X: ${clientX}`;
    pikerY.textContent = `| Y: ${clientY}`;

    if (isPainting) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.top = `${clientY-60}px`;
        dot.style.left = `${clientX-19}px`
        canvas.appendChild(dot);
    }
}

canvas.addEventListener('mousedown', () => {
    isPainting = true;
});
canvas.addEventListener('mouseup', () => {
    isPainting = false;
});

canvas.addEventListener('keydown', () => {
    isPainting = true;
});
canvas.addEventListener('keyup', () => {
    isPainting = false;
});

canvas.addEventListener('mouseleave', resetPikerPosition);

function resetPikerPosition () {
    pikerX.textContent = `X: `;
    pikerY.textContent = `| Y: `;
    isPainting = false;
}

btnClear.addEventListener('click', clearCanvas)

function clearCanvas() {
    const allCanvasChildren = canvas.children
    Array.from(allCanvasChildren).forEach(dot => dot.remove());
}

btnColorPiker.addEventListener('click', () => {
    colorContainer.classList.add('is-open');
})

function createColorBoxes(number) {
    const randomRgbColor = () => Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    const arrayOfColorBoxes = [];

    for (let i = 1; i <= number; i += 1) {
        const newDiv = `<li class= "color-item" style="background-color: rgb(${randomRgbColor()}, ${randomRgbColor()}, ${randomRgbColor()});"></li>`;
    arrayOfColorBoxes.push(newDiv);
    }
    
    colorContainer.insertAdjacentHTML("afterbegin", arrayOfColorBoxes.join(''));
}

createColorBoxes(quantityOfColorBoxes)


