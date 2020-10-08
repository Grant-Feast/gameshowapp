const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const reset = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const ul = document.querySelector('#phrase ul');
let missed = 0;

const phrases = ['United Kingdom', 
                 'United States', 
								 'Iceland', 
								 'Japan', 
                 'Malaysia'
];

// Listens for the start button to be clicked and then hides the start screen overlay.
overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Function selects a random phrase from the phrases array and returns the length and creates an array of charachters.
function getRandomPhraseAsArray(arr) {
    let arrayLength = Math.floor(Math.random() * arr.length);
    let randomPhrase = arr[arrayLength].split('');
    return randomPhrase;
}

getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
		for(let i = 0; i < arr.length; i++) {
				// create a new li element for each charachter.
				const li = document.createElement('li');
				li.textContent = arr[i];
				ul.appendChild(li);
				if (arr[i] !== ' ') {
						li.classList.add("letter");
				} else {
					li.classList.add('space');
				}
		}
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Function loops through the letters and checks to see if the letters match the ones on the keyboard the user has pressed.
function checkLetter(button) {
		let li = ul.children;
		let match = null;
		for(let i = 0; i < li.length; i++) {
				const letterGuess = li[i].textContent.toLowerCase();
				if (button.textContent === letterGuess) {
						li[i].classList.add('show');
						match = true;
				}
		}
		return match;
}

checkLetter(qwerty);

qwerty.addEventListener('click', e => {
		if (e.target.tagName === 'BUTTON') {
				e.target.classList.add('chosen');
				e.target.setAttribute('disabled', true);
				const match = checkLetter(e.target);
				if (!match) {
						const lives = document.querySelectorAll('.tries');
						lives[missed].style.display = 'none';
						missed++;
				} 
				if (e.target) {
						return checkWin(e.target);
				}
		}
});

function checkWin(e) {
		let letter = ul.getElementsByClassName('letter');
		let show = ul.getElementsByClassName('show');

		if (letter.length === show.length) {
				overlay.classList.add('win');
				overlay.querySelector('h2').textContent = "Congratulations!! You've Won";
				overlay.querySelector('a').textContent = "Play Again";
				overlay.style.display = 'flex';
				resetGame();
		} else if (missed > 4) {
				overlay.classList.add('lose');
				overlay.querySelector('h2').textContent = "Try Again! You have run out of lives.";
				overlay.querySelector('a').textContent = "Retry";
				overlay.style.display = 'flex';
				resetGame();
		}
}

// Function resets the keyboard, phrase and lives for the player.
function resetGame() {
		let reset = document.querySelectorAll('.keyrow button');
		for(let i = 0; i < reset.length; i++) {
				reset[i].className = ' ';
				reset[i].disabled = false;
		}
		ul.innerHTML = '';
		addPhraseToDisplay(getRandomPhraseAsArray(phrases));
		let hearts = document.getElementsByTagName('img');
		for(let i = 0; i < hearts.length; i++) {
				let tries = document.querySelectorAll('.tries');
				tries[i].style.display = 'inline';
		}
		missed = 0;
}



















