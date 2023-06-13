<template>
  <v-container class="fill-height pa-0" fluid>
    <GameBoard v-if="isPlaying.valueOf()" :difficulty="difficulty.valueOf()" />
    <GameMenu v-else @playing="(value: Difficulty) => startPlaying(value)" />
  </v-container>
</template>
<script setup lang="ts">
import GameBoard from "@/components/GameBoard.vue";
import { Difficulty } from "@/scripts/gameService";

const difficulty = ref(Difficulty.Noob);
const isPlaying = ref(false);

function startPlaying(value: Difficulty) {
  difficulty.value = value;
  isPlaying.value = true;
}
</script>
