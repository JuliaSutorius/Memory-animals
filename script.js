const animals = ['🐶', '🐱', '🐰', '🦊', '🐼', '🐸', '🐨', '🦁'];
const cards = [...animals, ...animals]; // Duplicate animal emojis
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;

const gameContainer = document.getElementById('game-container');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards() {
    const shuffledCards = shuffle(cards);
    shuffledCards.forEach((animal) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.animal = animal;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.animal;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.animal === secondCard.dataset.animal) {
        matchedCards += 2;
        resetBoard();
        if (matchedCards === cards.length) {
            setTimeout(() => alert('You won!'), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.getElementById('restart-button').addEventListener('click', () => {
    matchedCards = 0;
    gameContainer.innerHTML = '';
    createCards();
});

createCards();
