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
            this.checkWinner();
        } else {
            this.hand += 1;
            giveCards(this.cards, this.player1, this.player2);
            this.currentPlayer = "player2";
            document.getElementById("player1Deck").style.display = "none";
            this.render();
            if (this.cards.length < 1) {
                document.getElementById("fullDeck").src = "";
            }
        }
    }

    switchPlayer = () => {
        let player1Deck = document.getElementById("player1Deck");
        let player2Deck = document.getElementById("player2Deck");
        if(this.currentPlayer === "player1") {
            this.currentPlayer = "player2";
            player1Deck.style.display = "none";
            player2Deck.style.display = "flex";
        } else {
            this.currentPlayer = "player1";
            player1Deck.style.display = "flex";
            player2Deck.style.display = "none";
        } 
    }

    dropCard = (cardIndex) => {
        if (this.currentPlayer === "player1") {
            let selectedCard = this.player1.playingCards[cardIndex];
            let cardInfo = inTable(this.table, selectedCard)
            console.log(cardInfo);

            if (cardInfo.flag) {
                this.player1.takenCards.push(this.table[cardInfo.position]);
                this.player1.takenCards.push(selectedCard);
                this.table.splice(cardInfo.position, 1);
                this.player1.playingCards.splice(cardIndex, 1);
                this.render();
            } else {
                this.table.push(selectedCard)
                this.player1.playingCards.splice(cardIndex, 1);
                this.render();
            }

            
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

        this.switchPlayer();
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
            text += `<img src='${this.player1.playingCards[i].image}' onclick='match.dropCard(${i})' />`;
        }

        player1Deck.innerHTML = text;
    }
    renderPlayer1Taken = () => {

        if (this.player1.takenCards.length > 0) {
            let player1Taken = document.getElementById("player1Taken");

            let length = this.player1.takenCards.length;
            player1Taken.src = this.player1.takenCards[length - 1].image;
        }
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
        this.renderPlayer1Taken();
        this.renderPlayer2();
        this.renderPlayer2Taken();
        this.renderTable();
    }

    checkWinner = () => {
        let player1Points = 0;
        let player2Points = 0;
        let player1Spade = 0;
        let player2Spade = 0;

        for (let i =0; i < this.player1.takenCards.length; i++) {
            let card = this.player1.takenCards[i];

            if (card.number === 1) {
                player1Points += 1;
            } else if (card.number === 2 && card.type === "spade") {
                player1Points += 1;
            } else if (card.number === 10 && card.type === "diamond") {
                player1Points += 2;
            } else {
                player1Points += 0;
            }

            if (card.type === "spade") {
                player1Spade += 1;
            }
        }

        for (let i =0; i < this.player2.takenCards.length; i++) {
            let card = this.player2.takenCards[i];

            if (card.number === 1) {
                player2Points += 1;
            } else if (card.number === 2 && card.type === "spade") {
                player2Points += 1;
            } else if (card.number === 10 && card.type === "diamond") {
                player2Points += 2;
            } else {
                player2Points += 0;
            }

            if (card.type === "spade") {
                player2Spade += 1;
            }
        }

        if (player1Spade > 5) {
            player1Points += 2;
        } else if (player2Spade > 5) {
            player2Points += 2;
        } else {
            player1Points += 1;
            player2Points += 1;
        }

        if (this.player1.takenCards.length > 20) {
            player1Points += 2;
        } else if (this.player2.takenCards.length > 20) {
            player2Points += 2;
        } else {
            player1Points += 1;
            player2Points += 1;
        }

        if (player1Points > player2Points) {
            alert("Player1 won the game by (" + player1Points + ":" + player2Points + ")")
        } else {
            alert("Player2 won the game by (" + player2Points + ":" + player1Points + ")")
        }
    }
 }

//running code
let match = new Match();


console.log(match);

