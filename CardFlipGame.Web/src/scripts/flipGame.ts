import { IconMachine } from "./iconMachine";

export enum Difficulty {
  Noob = 2,
  Easy = 8,
  Medium = 18,
  Hard = 32,
}

export interface Card {
  icon: string;
  active: boolean;
  matched: boolean;
}

export class FlipGame {
  cards: Card[] = [];
  iconMachine: IconMachine = new IconMachine();
  isGameOver: boolean = false;
  difficulty: Difficulty = Difficulty.Easy;

  constructor(difficulty: Difficulty = Difficulty.Easy) {
    this.difficulty = difficulty;
    this.generateCards();
  }

  generateCards(): void {
    const icons = this.iconMachine.getIcons(this.difficulty.valueOf());
    icons.forEach((icon) => {
      this.cards.push({ icon, active: false, matched: false });
      this.cards.push({ icon, active: false, matched: false });
    });
    this.shuffleCards();
  }

  shuffleCards() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  resetCards() {
    this.cards.forEach((card) => {
      card.active = false;
      card.matched = false;
    });
    this.shuffleCards();
  }

  checkGameState() {
    if (this.cards.filter((x) => x.matched === false).length === 0) {
      this.isGameOver = true;
      setTimeout(() => {
        this.revealAllCards();
        // TODO: bug - the game can be restarted before the cards are revealed
      }, 600);
    }
  }

  revealAllCards() {
    this.cards.forEach((x) => {
      x.matched = false;
      x.active = true;
    });
  }

  restartGame() {
    this.isGameOver = false;
    this.cards.splice(0);
    this.generateCards();
  }

  flip(card: Card) {
    if (card.active) return;

    const activeCards = this.cards.filter((x) => x.active);
    if (activeCards.length === 2) return;
    if (activeCards.length === 1) {
      const prev = this.cards.find((x) => x.active);
      card.active = !card.active;
      if (prev != undefined && card.icon === prev.icon)
        this.flipCardsBack(true);
      this.flipCardsBack();
      return;
    }
    card.active = !card.active;
  }

  flipCardsBack(matched: boolean = false) {
    setTimeout(() => {
      if (matched) {
        this.cards
          .filter((x) => x.active)
          .forEach((x) => {
            x.matched = true;
            x.active = false;
          });
        this.checkGameState();
      } else {
        this.cards.forEach((x) => (x.active = false));
      }
    }, 500);
  }
}
