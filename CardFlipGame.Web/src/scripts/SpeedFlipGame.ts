import {Card, Difficulty, FlipGame} from "@/scripts/gameService";

export class SpeedFlipGame extends FlipGame {
  constructor(difficulty: Difficulty = Difficulty.Easy, playerNumber: number = 1) {
    super(difficulty);
    this.playerId = playerNumber;
  }

  playerId:number;
  points:number = 0;
  flipQueue: Card[] = [];

  flipQueueBonus: number = 1;
  flip(card: Card) {
    console.log(this.flipQueue)
    if (card.active || this.flipQueue.length > 2 + this.flipQueueBonus) {
      return;
    }
    if(this.flipQueue.length <  2 + this.flipQueueBonus) {
      card.activeBy = this.playerId;
      card.active = true;
      this.flipQueue.push(card);
    }
    console.log(this.flipQueue.length)
    if(this.flipQueue.length >= 2){
      this.flipCardsBack(this.flipQueue[0].icon === this.flipQueue[1].icon);
    }
  }
  flipCardsBack(matched: boolean = false) {
    this.waitFlipBack(this.flipQueue[0], this.flipQueue[1], matched);
    this.flipQueue.splice(0,2);
  }
  waitFlipBack(card1:Card, card2:Card, matched:boolean){
    setTimeout(() => {
      this.points++;
      this.cards
        .filter((x) => x==card1 || x==card2)
        .forEach((x) => {
          x.matched = matched;
          x.activeBy = 0;
          x.active = false;
        });
      this.checkGameState();
    }, 500);
  }
}