'use strict';

const player1Score = document.querySelector("#score--0")
const player2Score = document.getElementById("score--1")
const dice = document.querySelector(".dice")
const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")
const current0 = document.getElementById("current--0")
const current1 = document.getElementById("current--1")
const player0 = document.querySelector(".player--0")
const player1 = document.querySelector(".player--1")

player1Score.textContent = 0
player2Score.textContent = 0
let currentScore = 0
let activePlayer = 0
let scores = [0, 0]
let playing = true
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    //Toggle == If there is > remove --- If there is not > Add
    player0.classList.toggle("player--active")
    player1.classList.toggle("player--active")
}
const newGame = function () {
    player1Score.textContent = 0
    player2Score.textContent = 0
    currentScore = 0
    scores = [0, 0]
    playing = true
    current0.textContent = 0
    current1.textContent = 0
    player0.classList.remove("player--winner")
    player1.classList.remove("player--winner")
    player0.classList.add("player--active")
    player1.classList.remove("player--active")
}

dice.classList.add("hidden")
//Rolling the dice 
const rollFunct = function () {
    if (playing) {

        //1.-- Generate a random number between 1-6
        const randomDice = Math.trunc(Math.random() * 6) + 1
        //2-- Display dice --- dice.src to manipulate src in the html file
        dice.classList.remove("hidden")
        dice.src = `zar-${randomDice}.png`
        //3-- Check if the number is 1, if rollDice !== 1, switch the next player
        if (randomDice !== 1) {
            //Add dice to current score
            currentScore += randomDice
            // current0.textContent = currentScore
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            //Switching the active player
            switchPlayer()
        }
    }
}
btnRoll.addEventListener("click", rollFunct)
btnHold.addEventListener("click", function () {
    if (playing) {

        dice.classList.add("hidden")
        //1-- Add current score to active players score
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        //2-- Check if player's score >= 100
        if (scores[activePlayer] >= 20) {
            playing = false
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active")
        } else {
            //3-- Switch to next player
            switchPlayer()
        }
    }
})
btnNew.addEventListener("click", newGame)

