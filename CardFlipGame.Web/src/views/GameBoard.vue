<template>
  <div class="d-flex flex-wrap w-100 h-100 pa-1">
    <v-sheet
      v-for="(card, index) in game.cards"
      v-bind:key="index"
      class="d-flex align-center justify-center pa-2"
      :width="100 / Math.sqrt(game.cards.length) + '%'"
      :height="100 / Math.sqrt(game.cards.length) + '%'"
    >
      <v-sheet
        class="text-center d-flex align-center justify-center rounded-lg w-100 h-100"
        @click="!card.matched ? game.flip(card) : null"
        :class="getItemClass(index)"
      >
        <div v-if="!card.matched">
          <v-icon v-show="card.active" size="x-large"> {{ card.icon }} </v-icon>
        </div>
      </v-sheet>
    </v-sheet>
  </div>
  <!-- <v-dialog persistent v-model="game.isGameOver" width="auto">
    <v-card>
      <v-card-text> You won! Great job! </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="game.restartGame()"> Play Again </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> -->
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { FlipGame } from "@/scripts/flipGame";

const game = reactive(new FlipGame(2));

const deviceHeight = ref<number>(window.innerHeight);
window.addEventListener("resize", () => {
  deviceHeight.value = window.innerHeight;
});

function getItemClass(index: number) {
  if (game.cards[index].matched) return "matched";
  return game.cards[index].active ? "front" : "back";
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
</style>
