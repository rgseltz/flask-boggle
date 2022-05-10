// const { Axios } = require("axios");
const button = document.querySelector('#button');
const guess = document.querySelector('#guess-input');

button.addEventListener('click', async function(evt) {
	evt.preventDefault();
	console.log(guess.value);
	const res = await axios.post('/check-word', { guess: guess.value });
	console.log(res.data);
	res.catch((error) => console.log(error.response.request._response));
});

//check server validity
