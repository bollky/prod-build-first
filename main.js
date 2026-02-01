const generateButton = document.getElementById('generate-button');
const numbersContainer = document.getElementById('numbers-container');
const themeToggleButton = document.getElementById('theme-toggle-button');
const lottoSetsSelect = document.getElementById('lotto-sets');

const setButtonText = () => {
    if (document.body.classList.contains('dark-mode')) {
        themeToggleButton.textContent = 'White Mode';
    } else {
        themeToggleButton.textContent = 'Dark Mode';
    }
}

if(themeToggleButton) {
    setButtonText();

    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        setButtonText();
    });
}


function generateLottoSet() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

if (generateButton) {
    generateButton.addEventListener('click', () => {
        numbersContainer.innerHTML = '';
        const numberOfSets = parseInt(lottoSetsSelect.value);

        for (let i = 0; i < numberOfSets; i++) {
            const lottoSet = generateLottoSet();
            const setContainer = document.createElement('div');
            setContainer.classList.add('lotto-set');
            
            lottoSet.forEach(num => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('number');
                numberElement.textContent = num;
                setContainer.appendChild(numberElement);
            });
            numbersContainer.appendChild(setContainer);
        }
    });
}
