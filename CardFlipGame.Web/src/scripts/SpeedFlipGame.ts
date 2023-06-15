import {Card, Difficulty, FlipGame} from "@/scripts/gameService";
import * as signalR from "@microsoft/signalr";

export class SpeedFlipGame extends FlipGame {
  constructor(gameId: number, difficulty: Difficulty = Difficulty.Easy, playerNumber: number = 1) {
    super(difficulty);
    this.playerId = playerNumber;
    this.gameId = gameId;
    this.connection.on(`raceGame-Init-${this.gameId}`, (ids: number[], icons: string[]) => {
      this.cards.splice(0);
      const colors = this.colorMachine.getColors(this.difficulty.valueOf());
      let cardId = 0;
      for (let i = 0; i < icons.length; i++) {
        const icon = icons.at(i)!;
        const color = colors.at(i)!;
        this.cards.push({cardId: ids.at(i)!, icon: icons.at(i)!, color, active: false, matched: false});
        this.cards.push({cardId: cardId + 1, icon: icons.at(i)!, color, active: false, matched: false});
        cardId += 2;
      }
    });
  }

  connection = new signalR.HubConnectionBuilder().withUrl("/raceGameHub").build();

  restartGame() {
    this.isGameOver = false;
    this.timer = 0;
    this.numberOfMoves = 0;
    if (this.playerId == 1) {
      this.generateCards();
      this.connection.send(`SetGameBoard`, this.gameId, this.cards.map(c => c.cardId), this.cards.map(c => c.icon));
    }
  }

  // generateCards(): void {
  //   this.cards.splice(0);
  //   const icons = this.iconMachine.getIcons(this.difficulty.valueOf());
  //   const colors = this.colorMachine.getColors(this.difficulty.valueOf());
  //   let cardId = 0;
  //   for (let i = 0; i < icons.length; i++) {
  //     const icon = icons.at(i)!;
  //     const color = colors.at(i)!;
  //     this.cards.push({cardId: cardId, icon, color, active: false, matched: false});
  //     this.cards.push({cardId: cardId + 1, icon, color, active: false, matched: false});
  //     cardId += 2;
  //   }
  //   this.cards = this.cards.sort(() => Math.random() - 0.5);
  // }

  playerId: number;
  gameId: number;
  points: number = 0;
  flipQueue: Card[] = [];

  flipQueueBonus: number = 1;

  flip(card: Card) {
    console.log(this.flipQueue)
    if (card.active || this.flipQueue.length > 2 + this.flipQueueBonus) {
      return;
    }
    if (this.flipQueue.length < 2 + this.flipQueueBonus) {
      card.activeBy = this.playerId;
      card.active = true;
      this.flipQueue.push(card);
    }
    console.log(this.flipQueue.length)
    if (this.flipQueue.length >= 2) {
      this.flipCardsBack(this.flipQueue[0].icon === this.flipQueue[1].icon);
    }
    this.connection.send('UpdateGameStat', this.gameId, this.points, this.flipQueue, this.cards.filter(c => c.matched).length);
  }

  flipCardsBack(matched: boolean = false) {
    this.waitFlipBack(this.flipQueue[0], this.flipQueue[1], matched);
    this.flipQueue.splice(0, 2);
  }

  waitFlipBack(card1: Card, card2: Card, matched: boolean) {
    setTimeout(() => {
      this.points++;
      this.cards
        .filter((x) => x == card1 || x == card2)
        .forEach((x) => {
          x.matched = matched;
          x.activeBy = 0;
          x.active = false;
        });
      this.checkGameState();
    }, 500);
  }
}