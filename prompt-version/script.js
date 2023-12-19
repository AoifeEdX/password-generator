// Array of special characters to be included in password
const specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];

// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Array of uppercase characters to be included in password
const upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Function for getting a random element from an array
function getRandom(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to prompt user for password options
function getPasswordOptions() {
  // Prompt for password length
  let length = parseInt(prompt("Enter the length of your password (8-128 characters):"));

  // Validate password length
  if (isNaN(length) || length < 8 || length > 128) {
    alert("Please enter a valid number between 8 and 128.");
    return null;
  }

  // Confirm inclusion of special characters
  let hasSpecialCharacters = confirm("Include special characters?");

  // Confirm inclusion of numeric characters
  let hasNumericCharacters = confirm("Include numeric characters?");

  // Confirm inclusion of lowercase characters
  let hasLowerCasedCharacters = confirm("Include lowercase characters?");

  // Confirm inclusion of uppercase characters
  let hasUpperCasedCharacters = confirm("Include uppercase characters?");

  // Validate that at least one character type is selected
  if (!hasSpecialCharacters && !hasNumericCharacters && !hasLowerCasedCharacters && !hasUpperCasedCharacters) {
    alert("Please select at least one character type.");
    return null;
  }

  // Return an object with user choices
  return {
    length: length,
    hasSpecialCharacters: hasSpecialCharacters,
    hasNumericCharacters: hasNumericCharacters,
    hasLowerCasedCharacters: hasLowerCasedCharacters,
    hasUpperCasedCharacters: hasUpperCasedCharacters
  };
}

// Function to generate password with user input
function generatePassword() {
  const options = getPasswordOptions();

  if (!options) {
    return ""; // Return an empty string if options are not provided
  }

  // Initialize password variable
  let password = "";

  // Create an array to store all possible characters based on user choices
  let possibleCharacters = [];

  // Concatenate chosen character types to the possibleCharacters array
  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
  }
  if (options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
  }
  if (options.hasLowerCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
  }
  if (options.hasUpperCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
  }

  // Generate password by selecting random characters from possibleCharacters
  for (let i = 0; i < options.length; i++) {
    password += getRandom(possibleCharacters);
  }

  return password;
}

// Get references to the #generate element
const generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
