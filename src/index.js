import Hangman from './hangman';
import getPuzzle from './requests';

const statusEl = document.querySelector('#status');
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
const messageEl = document.querySelector('#message');
const inputEl = document.querySelector('#input-text');

let game1;

inputEl.addEventListener('keypress', (e) => {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  render();
});

const render = () => {
  puzzleEl.innerHTML = '';

  game1.puzzle.split('').forEach((letter) => {
    const letterEl = document.createElement('span');
    letterEl.textContent = letter;
    puzzleEl.appendChild(letterEl);
  });

  statusEl.textContent = `Status: ${game1.calculateStatus()}`;
  guessesEl.textContent = `Guesses left: ${game1.remainingGuesses}`;
  messageEl.textContent = game1.statusMessage;
};

const startGame = async () => {
  document.querySelector('#input-text').value = '';
  const puzzle = await getPuzzle('2');
  console.log(puzzle);
  game1 = new Hangman(puzzle, 5);
  console.log(game1);

  render();
};

document.querySelector('#reset').addEventListener('click', startGame);

startGame();
