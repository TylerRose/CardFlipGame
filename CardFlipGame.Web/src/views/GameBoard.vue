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
        @click="game.flip(card)"
        :class="getItemClass(index)"
      >
        <div v-if="!card.matched">
          <v-icon v-show="card.active" size="x-large"> {{ card.icon }} </v-icon>
        </div>
      </v-sheet>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { FlipGame } from "@/scripts/flipGame";

const game = reactive(new FlipGame(8));

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
