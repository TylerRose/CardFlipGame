import { IconMachine } from "./iconMachine";

export enum Difficulty {
  Noob = 2,
  Easy = 8,
  Medium = 18,
  Hard = 32,
}

export interface Card {
  cardId: number;
  icon: string;
  active: boolean;
  activeBy?: number;
  matched: boolean;
}

export class FlipGame {
  cards: Card[] = [];
  iconMachine: IconMachine = new IconMachine();
  isGameOver: boolean = false;
  difficulty: Difficulty = Difficulty.Easy;
  timer: number = 0;
  timerId: any;
  numberOfMoves: number = 0;

  constructor(difficulty: Difficulty = Difficulty.Easy) {
    this.difficulty = difficulty;
    this.restartGame();
  }
  restartGame() {
    this.isGameOver = false;
    this.timer = 0;
    this.numberOfMoves = 0;
    this.generateCards();
  }

  generateCards(): void {
    this.cards.splice(0);
    const icons = this.iconMachine.getIcons(this.difficulty);
    let cardId = 0;
    icons.forEach((icon) => {
      this.cards.push({cardId: cardId, icon: icon, active: false, matched: false });
      this.cards.push({cardId: cardId+1, icon: icon, active: false, matched: false });
      cardId += 2;
    });
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }
  checkGameState() {
    if (this.cards.filter((x) => !x.matched).length === 0) {
      this.isGameOver = true;
      clearInterval(this.timerId);
    }
  }

  flip(card: Card) {
    if (this.timer === 0) {
      this.timer = 1;
      this.timerId = setInterval(() => {
        this.timer++;
      }, 1000);
    }

    if (card.active) return;
    const activeCards = this.cards.filter((x) => x.active);
    if (activeCards.length === 2) return;
    if (activeCards.length === 1) {
      const prev = this.cards.find((x) => x.active);
      card.active = !card.active;
      if (prev != undefined && card.icon === prev.icon)
        this.flipCardsBack(true);
      this.flipCardsBack();
      this.numberOfMoves++;
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
