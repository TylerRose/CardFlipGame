import { IconMachine } from "./iconMachine";

export interface Card {
  icon: string;
  active: boolean;
  matched: boolean;
}

export class FlipGame {
  cards: Card[] = [];
  iconMachine: IconMachine = new IconMachine();

  constructor(size: number = 8) {
    this.generateCards(size);
  }

  generateCards(size: number = 8): void {
    const icons = this.iconMachine.getIcons(size);
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
      console.log("You win!");
      this.resetCards();
    }
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
