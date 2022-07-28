//class for card
class Card {
    constructor(type, number) {
        this.type = type;
        this.number = number;
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
        let newCard = new Card(i+1, "spade");
        deck.push(newCard);
    }

    //for loop for hearts
    for (i = 0; i < length; i++) {
        let newCard = new Card(i+1, "heart");
        deck.push(newCard);
    }

    //for loop for dismond
    for (i = 0; i < length; i++) {
        let newCard = new Card(i+1, "diamond");
        deck.push(newCard);
    }

    //for loop for trees
    for (i = 0; i < length; i++) {
        let newCard = new Card(i+1, "club");
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

//running code
let list = createFullDeck();
let shuffled = shuffleCards(list);

let p1 = new Player();
let p2 = new Player();



console.log("The entire cards");
console.log(list);



giveCards(shuffled, p1, p2);
giveCards(shuffled, p1, p2);
console.log("Cards for player 1");
console.log(p1.playingCards);

console.log("Cards for player 2");
console.log(p2.playingCards);

console.log("Shuffled cards");
console.log(shuffled);

giveCards(shuffled, p1, p2);