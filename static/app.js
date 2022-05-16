// const { Axios } = require("axios");
const button = document.querySelector('#button');
const guess = document.querySelector('#guess-input');
const message = document.querySelector('#message');
const scoreBoard = document.querySelector('#score-board');
let total = 0;

button.addEventListener('click', async function(evt) {
	evt.preventDefault();
	console.log(guess.value);
	const res = await axios.post('/check-word', { guess: guess.value });
	console.log(res.data.result);
	if (res.data.result === 'not-on-board') {
		alert('That word is not on the board. Please try again.');
	} else if (res.data.result === 'not-word') {
		alert('That is not a valid word. Please try again');
	} else if (res.data.result === 'already-handled') {
		alert('You have already entered this word');
	} else {
		alert('You got another word. Good job!');
		appendNewWord(guess.value);
	}
});

function appendNewWord(word, score) {
	const li = document.createElement('li');
	word = word.toLowerCase();
	score = word.length;
	updateScore(score);
	li.innerHTML = `${word} is worth ${score}`;
	return message.append(li);
}

function updateScore(score) {
	total = total + score;
	const totalScore = document.getElementById('total-score');
	totalScore.innerHTML = `Your total score is ${total}`;
}
//check server validity
