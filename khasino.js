//class for card
class Card {
    constructor(type, number) {
        this.type = type;
        this.number = number;
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
        let newCard = new Card(i+1, "hearts");
        deck.push(newCard);
    }

    //for loop for dismond
    for (i = 0; i < length; i++) {
        let newCard = new Card(i+1, "diamond");
        deck.push(newCard);
    }

    //for loop for trees
    for (i = 0; i < length; i++) {
        let newCard = new Card(i+1, "tree");
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
                let flag = true;
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

//running code
let list = createFullDeck();
let shuffled = shuffleCards(list);


console.log(list);
console.log(shuffled);