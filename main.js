const generateButton = document.getElementById('generate-button');
const numbersContainer = document.getElementById('numbers-container');
const themeToggleButton = document.getElementById('theme-toggle-button');

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

generateButton.addEventListener('click', () => {
    numbersContainer.innerHTML = '';
    const whiteBalls = [];
    while (whiteBalls.length < 5) {
        const randomNumber = Math.floor(Math.random() * 69) + 1;
        if (!whiteBalls.includes(randomNumber)) {
            whiteBalls.push(randomNumber);
        }
    }

    const powerball = Math.floor(Math.random() * 26) + 1;

    for (let i = 0; i < 5; i++) {
        const numberElement = document.createElement('div');
        numberElement.classList.add('number');
        numberElement.textContent = whiteBalls[i];
        numbersContainer.appendChild(numberElement);
    }

    const powerballElement = document.createElement('div');
    powerballElement.classList.add('number', 'powerball');
    powerballElement.textContent = powerball;
    numbersContainer.appendChild(powerballElement);
});