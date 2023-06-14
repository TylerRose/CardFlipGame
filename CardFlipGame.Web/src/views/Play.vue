<template>
  <v-container class="fill-height pa-0" fluid>
    <transition name="router-transition" mode="out-in" appear>
      <GameBoard
        v-if="isPlaying"
        :difficulty="difficulty"
        @stopPlaying="stopPlaying"
      />
      <GameMenu
        v-else
        @startPlaying="(value: Difficulty) => startPlaying(value)"
      />
    </transition>
  </v-container>
</template>

<script setup lang="ts">
import GameBoard from "@/components/GameBoard.vue";
import { Difficulty } from "@/scripts/gameService";

const difficulty = ref(Difficulty.Noob);
const isPlaying = ref(false);

function stopPlaying() {
  isPlaying.value = false;
}

function startPlaying(value: Difficulty) {
  difficulty.value = value;
  isPlaying.value = true;
}
</script>
