//ul where guessed letters will appear
const guessedLettersUl = document.querySelector(".guessed-letters")

//guess button
const guessBtn = document.querySelector(".guess")

//text input where letters are guessed
const inputEl = document.querySelector(".letter")

//empty paragraph where word-in-progress is displayed
const wordInProgress = document.querySelector(".word-in-progress")

//paragraph where remaining guesses appear
const remainingGuesses = document.querySelector(".remaining")

//span inside paragraph for remaining guesses display
const remainingGuessSpan = document.querySelector("span")

//paragraph where messages appear
const message = document.querySelector(".message")

//hidden button prompting player to play again
const playAgainBtn = document.querySelector(".play-again")

const word = "magnolia"

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
    let inputValue = inputEl.value
    console.log(inputValue)
    inputEl.value = ""
})