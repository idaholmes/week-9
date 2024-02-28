const numberOfTurns = 26;

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    // define common suits and ranks
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
      "Ace",
    ];
    // loop over suits and ranks and create new instances of a Card.
    for (let suit of suits) {
      for (let rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  shuffleCards() {
    // loop over cards backwards starting from the last card
    for (let index = this.cards.length - 1; index > 0; index--) {
      const random = Math.floor(Math.random() * (index + 1));

      // swap current index with new random const
      [this.cards[index], this.cards[random]] = [
        this.cards[random],
        this.cards[index],
      ];
    }
  }

  dealCards() {
    // deal first card by removing it from the array using .splice()
    return this.cards.splice(0, 1)[0];
  }
}

class Player {
  constructor(name) {
    this.name = name;
    // hand array represents the players cards
    this.hand = [];
    this.score = 0;
  }

  playCard() {
    // .shift() Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.
    return this.hand.shift();
  }
}

class Game {
  constructor() {
    // create new players
    this.players = [new Player("Mario"), new Player("Luigi")];
    this.deck = new Deck();
  }

  startGame() {
    this.deck.shuffleCards();

    // loop over cards 26 times to replicate 26 'turns'.
    for (let i = 0; i < numberOfTurns; i++) {
      for (let player of this.players) {
        // push a card into a players hand
        player.hand.push(this.deck.dealCards());
      }
    }
  }

  // play one round
  playRound() {
    // access first player in array and play their card
    const card1 = this.players[0].playCard();
    // access second player in array and play their card
    const card2 = this.players[1].playCard();

    console.log(`${this.players[0].name} plays ${card1.rank} of ${card1.suit}`);
    console.log(`${this.players[1].name} plays ${card2.rank} of ${card2.suit}`);
    if (card1.rank === card2.rank) {
      console.log("It's a tie!");
    } else if (card1.rank > card2.rank) {
      console.log(`${this.players[0].name} wins the round!`);
      this.players[0].score++;
    } else {
      console.log(`${this.players[1].name} wins the round!`);
      this.players[1].score++;
    }
  }

  playGame() {
    this.startGame();
    // call playRound() 26 times to simulate 26 turns / rounds by looping
    for (let i = 0; i < numberOfTurns; i++) {
      console.log(`Round ${i + 1}:`);
      this.playRound();
    }

    // log final scores
    console.log(`Final Score:`);
    console.log(`${this.players[0].name}: ${this.players[0].score}`);
    console.log(`${this.players[1].name}: ${this.players[1].score}`);

    // check if game is a tie
    if (this.players[0].score === this.players[1].score) {
      console.log("It's a tie!");
    } else {
      // if not a tie, declare a winner
      const winner =
        this.players[0].score > this.players[1].score
          ? this.players[0].name
          : this.players[1].name;

      // log winner
      console.log(`${winner} wins the game!`);
    }
  }
}

const game = new Game();
game.playGame();
