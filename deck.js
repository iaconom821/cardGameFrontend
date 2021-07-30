const SUITS = ["♥", "♦", "♠", "♣"]

const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

export default class Deck{
    constructor(cards = freshDeck()) {
        this.cards = cards
        this.tieCards = []
    }

    get numberOfCards() {
        return this.cards.length
    }

    playCard() {
        return this.cards.shift();
    }

    discard(card) {
        return this.cards.push(card);
    }

    tie(cardOne, cardTwo){
        this.tieCards.push(cardOne);
        this.tieCards.push(cardTwo)
    }

    shuffle() {
        for(let i = 0; i < this.numberOfCards; i++){
            const rand = Math.floor(Math.random() * (52 - i)) + i;
    
            const temp = this.cards[rand];
            this.cards[rand] = this.cards[i];
            this.cards[i] = temp;            
        }

        return this.cards 
    }
}

class Card {
    constructor(suit, value){
        this.suit = suit 
        this.value = value 
    }

    get color() {
        return this.suit === "♣" || this.suit === "♠" ? 'black' : 'red'
    }

    getHTML() {
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card")
        cardDiv.classList.add(`${this.color}`)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}

function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}