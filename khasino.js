//class for card
class Card {
    constructor(number, type, image) {
        this.type = type;
        this.number = number;
        this.image = image;
    }
}

//class for combo card
class ComboCard {
    constructor(numberToBuild) {
        this.numberToBuild = numberToBuild;
        this.cards = [];
    }
}

//class for player
class Player {
    constructor() {
        this.playingCards = [];
        this.takenCards = [];
        this.cardBuilding = new ComboCard(0);
    }

    addPlayingCard = (card) => {
        if (card !== undefined) {
            this.playingCards.push(card);
        }
        
    }
}

//function to create normal deck
const createFullDeck = () => {
    let length = 10;
    let i = 0;

    let deck = [];

    //for loop for spades
    for (i; i < length; i++) {
        let newCard = new Card(i+1, "spade", "./Images/Cards/" + (i+1).toString() + "s.png");
        deck.push(newCard);
    }

    //for loop for hearts
    for (i = 0; i < length; i++) {
        let newCard = new Card(i+1, "heart", "./Images/Cards/" + (i+1).toString() + "h.png");
        deck.push(newCard);
    }

    //for loop for dismond
    for (i = 0; i < length; i++) {
        let newCard = new Card(i+1, "diamond", "./Images/Cards/" + (i+1).toString() + "d.png");
        deck.push(newCard);
    }

    //for loop for clubs
    for (i = 0; i < length; i++) {
        let newCard = new Card(i+1, "club", "./Images/Cards/" + (i+1).toString() + "c.png");
        deck.push(newCard);
    }

    return deck;
}

//function to shuffle
const shuffleCards = (cards) => {
    let selectedList = [];
    let deck = [];

    let total = 0;

    while (total < 40) {
        let r = Math.floor(Math.random() * 40);
        let flag = false;

        for (let i = 0; i < selectedList.length; i++) {
            if(r === selectedList[i]) {
                flag = true;
                break;
            }
        }

        if (!flag) {
            deck.push(cards[r]);
            selectedList.push(r);
            total += 1;
        }
    }

    return deck;
}


//function to distribute cards to players
const giveCards = (shuffledCards, player1, player2) => {
    if (shuffledCards.length < 1) {
        console.log("game over")
    } else {
        let length = 10
        let i = 0;

        for (i; i < length; i++) {
            player2.addPlayingCard(shuffledCards[shuffledCards.length - 1]);
            shuffledCards.pop();
            player1.addPlayingCard(shuffledCards[shuffledCards.length - 1]);
            shuffledCards.pop();
        }
    }
}

//function to check if the card is already on the table
const inTable = (table, card) => {
    let length = table.length;
    let i = 0;
    let flag = false;
    let pos = -1;

    for (i; i < length; i++) {
        if (card.number === table[i].number) {
            flag = true;
            pos = i;
            break;
        }
    }

    return {position: pos, flag: flag};
}





//class to hold the game
class Match {
    constructor() {
        this.player1 = new Player();
        this.player2 = new Player();
        this.table = [];
        this.cards = shuffleCards(createFullDeck());
        this.hand = 0;
        this.currentPlayer = "";
        this.state = "pack";
    }

    startHand = () => {
        if (this.hand > 1) {
            console.log("The game is really over");
        } else {
            this.hand += 1;
            giveCards(this.cards, this.player1, this.player2);
            this.currentPlayer = "player2";
            this.render();
            if (this.cards.length < 1) {
                document.getElementById("fullDeck").src = "";
            }
        }
    }

    switchPlayer = () => {
        this.currentPlayer === "player1" ? this.currentPlayer = "player2" : this.currentPlayer = "player1"
    }

    dropCard = (cardIndex) => {
        if (this.currentPlayer === "player1") {
            let selectedCard = this.player1.playingCards[cardIndex];
        } else {
            let selectedCard = this.player2.playingCards[cardIndex];
            let cardInfo = inTable(this.table, selectedCard)
            console.log(cardInfo);

            if (cardInfo.flag) {
                this.player2.takenCards.push(this.table[cardInfo.position]);
                this.player2.takenCards.push(selectedCard);
                this.table.splice(cardInfo.position, 1);
                this.player2.playingCards.splice(cardIndex, 1);
                this.render();
            } else {
                this.table.push(selectedCard)
                this.player2.playingCards.splice(cardIndex, 1);
                this.render();
            }
            
            
            
        }
    }

    takeCard = (cardIndex) => {
        if (this.currentPlayer === "player1") {
            let selectedCard = this.player1.playingCards[cardIndex];
        } else {
        
            let selectedCard = this.player2.playingCards[cardIndex];
        }
    }

    topCard = (cardIndex) => {
        if (this.currentPlayer === "player1") {
            let selectedCard = this.player1.playingCards[cardIndex];
        } else {
            let selectedCard = this.player2.playingCards[cardIndex];
        }
    }

    switchState = (state) => {
        this.state = state;
    }
    
    renderPlayer1 = () => {
        let player1Deck = document.getElementById("player1Deck");
        player1Deck.innerHTML = "";

        let length = this.player1.playingCards.length;
        let i = 0;

        let text = "";
        for (i; i < length; i++) {
            text += `<img src='${this.player1.playingCards[i].image}' />`;
        }

        player1Deck.innerHTML = text;
    }

    renderPlayer2Taken = () => {

        if (this.player2.takenCards.length > 0) {
            let player2Taken = document.getElementById("player2Taken");

            let length = this.player2.takenCards.length;
            player2Taken.src = this.player2.takenCards[length - 1].image;
        }
    }

    renderPlayer2 = () => {
        let player1Deck = document.getElementById("player2Deck");
        player1Deck.innerHTML = "";

        let length = this.player2.playingCards.length;
        let i = 0;

        let text = "";
        for (i; i < length; i++) {
            text += `<img src='${this.player2.playingCards[i].image}'  onclick='match.dropCard(${i})' />`;
        }

        player1Deck.innerHTML = text;
    }

    renderTable = () => {
        let tableDeck = document.getElementById("tableDeck");
        tableDeck.innerHTML = "";

        let length = this.table.length;
        let i = 0;

        let text = "";
        for (i; i < length; i++) {
            text += `<img src='${this.table[i].image}' />`;
        }

        tableDeck.innerHTML = text;
    }

    render = () => {
        this.renderPlayer1();
        this.renderPlayer2();
        this.renderPlayer2Taken();
        this.renderTable();
    }
 }

//running code
let match = new Match();


console.log(match);

