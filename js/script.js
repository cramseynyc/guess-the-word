let guessedLettersUl = document.querySelector(".guessed-letters")
const guessBtn = document.querySelector(".guess")
const inputEl = document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress")
const remainingGuessesEl = document.querySelector(".remaining")
const remainingGuessSpan = document.querySelector("span")
const message = document.querySelector(".message")
const playAgainBtn = document.querySelector(".play-again")
let remaininGuesses = 2

const word = "hi"
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
    //    console.log(guessedLetters)
       guessedLettersLi()
       guessesRemaining(input)
       updateWordInProgress(guessedLetters)
       
   } 
}

const guessedLettersLi = function(){
    guessedLettersUl.innerHTML = ""

    for (let letter of guessedLetters){
        let li = document.createElement("li")
        li.innerText = letter
        guessedLettersUl.append(li)
    }
}

const updateWordInProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase()
    const wordArray = wordUpper.split("")
    const updatedLetters = []

    for (let letter of wordUpper){
        if (guessedLetters.includes(letter)){
            updatedLetters.push(letter)
        } else {
            updatedLetters.push("●")
        }
    } 
    wordInProgress.innerText = updatedLetters.join("")
    revealWord()
}

const guessesRemaining = function(guess){
    const upperWord = word.toUpperCase()
    if (!upperWord.includes(guess)){
        message.innerText = `${guess} is not in the word.  Try again.`
        remainingGuessesEl.innerText = `You have ${remaininGuesses -= 1} guesses remaining`
     } else {
        message.innerText = `Good guess! ${guess} is in the word!`
     } 

     if (remaininGuesses === 0){
         message.innerText = `You have no more guesses. Game over.`
     } 
}

const revealWord = function(){
    if (wordInProgress.innerText === word.toUpperCase()){
        message.classList.add("win")
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
    }
}

