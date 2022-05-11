// const { Axios } = require("axios");
const button = document.querySelector('#button');
const guess = document.querySelector('#guess-input');
const message = document.querySelector('#message');

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

function appendNewWord(word) {
	const li = document.createElement('li');
	li.innerHTML = word;
	return message.append(li);
}
//check server validity
