// Initialising the canvas
var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
letters = letters.split('');

// Setting up the columns
var fontSize = 10,
    columns = canvas.width / fontSize;

// Setting up the drops
var drops = [];
for (var i = 0; i < columns; i++) {
  drops[i] = 1;
}

// Setting up the draw function
function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#0f0';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
      drops[i] = 0;
    }
  }
}

// Loop the animation
setInterval(draw, 33);

// Array of special characters to be included in password
const specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];

// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Array of uppercase characters to be included in password
const upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Get references to the toggle elements
const lengthOption = document.getElementById('lengthOption');
const lowercaseOption = document.getElementById('lowercaseOption');
const uppercaseOption = document.getElementById('uppercaseOption');
const numericOption = document.getElementById('numericOption');
const specialOption = document.getElementById('specialOption');

// Get reference to the #generate element
const generateBtn = document.querySelector('#generate');

// Get reference to the #password input
const passwordHTML = document.getElementById('password');

// Function for getting a random element from an array
function getRandom(arr) {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}

// Function to generate password with user input
function generatePassword() {
	// Get user choice directly from the toggles
	let hasSpecialCharacters = specialOption.checked;
	let hasNumericCharacters = numericOption.checked;
	let hasLowerCasedCharacters = lowercaseOption.checked;
	let hasUpperCasedCharacters = uppercaseOption.checked;

	// Validate that at least one character type is selected
	if (!hasSpecialCharacters && !hasNumericCharacters && !hasLowerCasedCharacters && !hasUpperCasedCharacters) {
		alert("Please select at least one character type.");
		return "";
	}

	// Initialize password variable
	let password = "";
	let possibleCharacters = [];

	// Concatenate chosen character types to the possibleCharacters array
	if (hasSpecialCharacters) {
		possibleCharacters = possibleCharacters.concat(specialCharacters);
	}
	if (hasNumericCharacters) {
		possibleCharacters = possibleCharacters.concat(numericCharacters);
	}
	if (hasLowerCasedCharacters) {
		possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
	}
	if (hasUpperCasedCharacters) {
		possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
	}

	// Generate password by selecting random characters from possibleCharacters
	for (let i = 0; i < lengthOption.value; i++) {
		password += getRandom(possibleCharacters);
	}

	return password;
}

// Function to update the displayed length value
function updateRangeValue() {
  document.getElementById('rangeValue').textContent = lengthOption.value;
}

// Call the function to set the initial value when the page loads
updateRangeValue();

// Function to write password to the #password input
function writePassword() {
	updateRangeValue(); // Call the function to update the displayed value
	let password = generatePassword();
	passwordHTML.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

// Toggle the tooltip on copy button
const copyButton = document.getElementById('copyButton');
const passwordField = document.getElementById('password');

copyButton.addEventListener('click', () => {
	navigator.clipboard.writeText(passwordField.value);
	copyButton.classList.add('copied');
	setTimeout(() => copyButton.classList.remove('copied'), 500);
});

