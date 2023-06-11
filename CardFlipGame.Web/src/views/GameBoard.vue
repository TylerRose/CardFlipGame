<template>
  <v-container>
    <v-row class="flex-child text-subtitle-2">
      <v-col
        class="v-col-3"
        v-for="(card, index) in game.cards"
        v-bind:key="index"
      >
        <v-sheet
          v-bind:style="{ height: deviceHeight * 0.15 + 'px' }"
          width="50%"
          height="100%"
          class="pa-4 text-center mx-auto d-flex flex-column align-center justify-center"
          elevation="2"
          @click="game.flip(card)"
          :class="getItemClass(index)"
        >
          <div v-if="!card.matched">
            <v-icon v-if="card.active"> {{ card.icon }} </v-icon>
            <v-icon v-else> fas fa-question </v-icon>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
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

<style lang="scss">
.front {
  background-color: #4caf50;
}

.back {
  background-color: #f44336;
}

.matched {
  background-color: #b7b7b7;
}
</style>
