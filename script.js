import Deck from './deck.js'

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
}

const gameArea = document.querySelector('.game-container')
const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckHTML = document.querySelector('.computer-deck')
const playerDeckHTML = document.querySelector('.player-deck')
const resetButton = document.querySelector('.reset')
const text = document.querySelector('.text')

let playerDeck, computerDeck, inRound, stop 

gameArea.addEventListener('click', () => {
    if(stop) {
        startGame()
        return
    }

    if(inRound){
        cleanBeforeRound()
    } else {
        flipCards()
    }

})

resetButton.addEventListener('click', () => {
    startGame();
})

startGame()
function startGame() {
    const deck = new Deck()
    deck.shuffle()
    
    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
    computerDeck = new Deck(deck.cards.slice(deckMidpoint))
    inRound = false
    stop = false 

    cleanBeforeRound()
}


function cleanBeforeRound() {
    inRound = false 
    text.innerText = '';
    computerCardSlot.innerHTML = '';
    playerCardSlot.innerHTML = '';

    updateDeckCount();
}

function flipCards() {
    inRound = true 

    const playerCard = playerDeck.playCard();
    const computerCard = computerDeck.playCard();

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    updateDeckCount()

    if(isRoundWinner(playerCard, computerCard) === "p1") {
        text.innerText = "Player 1 Wins!"
        if(playerDeck.tieCards[0]){
            playerDeck.tieCards.forEach(card => {
                playerDeck.discard(card)
            })
            computerDeck.tieCards.forEach(card => {
                playerDeck.discard(card)
            })
            playerDeck.tieCards = []
            computerDeck.tieCards = []
        }
        
        playerDeck.discard(playerCard)
        playerDeck.discard(computerCard)
    } else if (isRoundWinner(playerCard, computerCard) === "p2" ){
        text.innerText = "Player 2 Wins!"
        if(playerDeck.tieCards[0]){
            playerDeck.tieCards.forEach(card => {
                computerDeck.discard(card)
            })
            computerDeck.tieCards.forEach(card => {
                computerDeck.discard(card)
            })
            playerDeck.tieCards = []
            computerDeck.tieCards = []
        }
        
        computerDeck.discard(playerCard)
        computerDeck.discard(computerCard)
    } else {
        text.innerText = "Draw"
        playerDeck.tieCards.push(playerCard)
        computerDeck.tieCards.push(computerCard)
    }

    if (isGameOver(playerDeck)){
        text.innerText = "Player 2 Wins the Game!!!"
        stop = true 
    } else if( isGameOver(computerDeck)){
        text.innerText = "Player 1 Wins the Game!!!"
        stop = true 
    }
}

function updateDeckCount() {
    computerDeckHTML.innerText = computerDeck.numberOfCards
    playerDeckHTML.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
    if(CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]){
        return "p1"
    } else if (CARD_VALUE_MAP[cardOne.value] < CARD_VALUE_MAP[cardTwo.value]) {
        return "p2"
    } else {
        return "d"
    } 
}

function isGameOver(deck){
    return deck.numberOfCards === 0
}