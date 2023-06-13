<template>
  <div class="d-flex flex-wrap w-100 h-100 pa-1 no-select">
    <v-sheet
      v-for="(card, index) in game.cards"
      v-bind:key="index"
      class="d-flex align-center justify-center pa-1"
      :width="cardSize"
      :height="cardSize"
    >
      <v-sheet
        class="text-center d-flex align-center justify-center rounded-lg w-100 h-100"
        @click="!card.matched ? game.flip(card) : null"
        :class="getCardColorClass(index)"
      >
        <v-icon v-show="!card.matched && card.active" size="x-large">
          {{ card.icon }}
        </v-icon>
      </v-sheet>
    </v-sheet>
  </div>
  <v-dialog persistent v-model="game.isGameOver" width="auto">
    <v-card>
      <v-card-text> You won! Great job! </v-card-text>
      <v-card-actions>
        <v-btn class="mx-auto" color="primary" @click="game.restartGame()">
          Play Again
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { FlipGame, Difficulty } from "@/scripts/gameService";

const props = defineProps({
  difficulty: {
    type: Number as () => Difficulty,
    default: Difficulty.Noob,
  },
});

const cardSize = 100 / Math.sqrt(props.difficulty * 2) + "%";

const game = reactive(new FlipGame(props.difficulty));

function getCardColorClass(index: number): string {
  const card = game.cards[index];
  if (card.matched) return "matched";
  return card.active ? "front" : "back";
}
</script>

<style scoped lang="scss">
.front {
  background-color: #cf3d3b;
}

.back {
  background-color: #0aa795;
}

.matched {
  background-color: #d2d2d2;
}

// Prevents text selection on cards.
.no-select {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
