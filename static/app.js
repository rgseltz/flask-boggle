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
	} else {
		alert('You got another word. Good job!');
	}
	appendNewWord(guess.value);
});

function appendNewWord(word, score) {
	const li = document.createElement('li');
	word = word.toLowerCase();
	score = word.length;
	calcScore(score);
	li.innerHTML = `${word} is worth ${score}`;
	return message.append(li);
}

function calcScore(score) {
	const totalScore = document.createElement('h2');
	total = total + score;
	totalScore.innerHTML = `Total Score: ${total}`;
	console.log(totalScore);
	return totalScore.append(scoreBoard);
}
//check server validity
