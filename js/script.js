let guessedLettersUl = document.querySelector(".guessed-letters")
const guessBtn = document.querySelector(".guess")
const inputEl = document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress")
const remainingGuessesEl = document.querySelector(".remaining")
const remainingGuessSpan = document.querySelector("span")
const message = document.querySelector(".message")
const playAgainBtn = document.querySelector(".play-again")
let word = "magnolia"
let remaininGuesses = 2
let guessedLetters = []

const getWord = async function(){
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt")
    const words = await res.text()
    const wordArray = words.split("\n")
    const randomIndex = Math.floor(Math.random() * wordArray.length)
    word = wordArray[randomIndex].trim()
    placeholder(word)
    console.log(word)
}

getWord()

const placeholder = function(word){
    const placeholderLetters = []

    for (let letter of word){
        letter = "●"
        placeholderLetters.push(letter)
    } 
    wordInProgress.innerText = placeholderLetters.join("")
}

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
        remaininGuesses -= 1
     } else {
        message.innerText = `Good guess! ${guess} is in the word!`
     } 

     if (remaininGuesses === 0){
        message.innerText = `Game over. The correct word is ${upperWord}`
        remainingGuessSpan.innerText = `${remaininGuesses} guesses`
        startOver()

     } else if (remaininGuesses === 1){
         remainingGuessSpan.innerText = 
            `${remaininGuesses} guess`
     } else {
        remainingGuessSpan.innerText = 
        `${remaininGuesses} guesses`
     }
}

const revealWord = function(){
    if (wordInProgress.innerText === word.toUpperCase()){
        message.classList.add("win")
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
        startOver()
    }
}

const startOver = function(){
    guessBtn.classList.add("hide")
    remainingGuessesEl.classList.add("hide")
    guessedLettersUl.classList.add("hide")
    playAgainBtn.classList.remove("hide")
}

playAgainBtn.addEventListener("click", function(){
    message.classList.remove("win")
    guessedLetters = []
    remaininGuesses = 8
    remainingGuessSpan.innerText = `${remaininGuesses} guesses`
    guessedLettersUl.innerHTML = ""
    message.innerText = ""
    
    getWord()

    guessBtn.classList.remove("hide")
    remainingGuessesEl.classList.remove("hide")
    playAgainBtn.classList.add("hide")
    guessedLettersUl.classList.remove("hide")
})