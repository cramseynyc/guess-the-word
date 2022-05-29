const guessedLettersUl = document.querySelector(".guessed-letters")
const guessBtn = document.querySelector(".guess")
const inputEl = document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress")
const remainingGuesses = document.querySelector(".remaining")
const remainingGuessSpan = document.querySelector("span")
const message = document.querySelector(".message")
const playAgainBtn = document.querySelector(".play-again")

const word = "magnolia"
const guessedLetters = []

const placeholder = function(word){
    const placeholderLetters = []

    for (let letter of word){
        letter = "●"
        placeholderLetters.push(letter)
    } 
    wordInProgress.innerText = placeholderLetters.join("")
}

placeholder(word)


guessBtn.addEventListener("click", function(e){
    e.preventDefault()
    message.innerText = ""
    // capture user input
    let inputValue = inputEl.value
    // check that guess is a letter
    const goodGuess = validateInput(inputValue)

    if (goodGuess) {
        makeGuess(inputValue)
    }
    inputEl.value = ""
})

const validateInput = function(input){
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0) {
        message.innerText = "input cannot be empty"
    } else if (input.length >1) {
        message.innerText = "can only enter 1 letter"
    } else if (!input.match(acceptedLetter)){
        message.innerText = "must enter a letter"
    } else {
        return input
    }
}

const makeGuess = function(input){
   input = input.toUpperCase()

   if (guessedLetters.includes(input)){
       message.innerText = "letter already guessed"
   } else {
       guessedLetters.push(input)
       console.log(guessedLetters)
   }
}