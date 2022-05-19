// const { Axios } = require("axios");
const button = document.querySelector('#button');
const guess = document.querySelector('#guess-input');
const message = document.querySelector('#message');
const scoreBoard = document.querySelector('#score-board');
const wordDiv = document.querySelector('#word-form');
let total = 0;
let timeleft = 6;

button.addEventListener('click', clickHandler);

async function clickHandler(evt) {
	evt.preventDefault();
	console.log(guess.value);
	const res = await axios.get('/check-word', { params: { guess: guess.value } });
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
}

const downloadTimer = setInterval(function() {
	if (timeleft <= 0) {
		clearInterval(downloadTimer);
		removeButton();
		postScore();
		document.getElementById('countdown').innerHTML = 'Times Up!';
	} else {
		document.getElementById('countdown').innerHTML = timeleft + ' seconds remaining';
	}
	timeleft -= 1;
}, 1000);

function removeButton() {
	wordDiv.removeChild(button);
}

async function postScore() {
	const res = await axios.post('/post-score', { score: total });
	console.log(res);
}

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
