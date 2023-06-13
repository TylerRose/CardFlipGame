<template>
  <v-sheet class="mx-auto align-center text-center">
    <h2>Choose a Difficulty</h2>
    <v-divider class="mb-2" />
    <v-btn @click="setDifficulty(Difficulty.Noob)">Noob</v-btn>
    <v-spacer class="my-2" />
    <v-btn @click="setDifficulty(Difficulty.Easy)">Easy</v-btn>
    <v-spacer class="my-2" />
    <v-btn @click="setDifficulty(Difficulty.Medium)">Medium</v-btn>
    <v-spacer class="my-2" />
    <v-btn @click="setDifficulty(Difficulty.Hard)">Hard</v-btn>
  </v-sheet>
</template>
<script setup lang="ts">
import { Difficulty } from "@/scripts/gameService";

const emit = defineEmits(["playing"]);

function setDifficulty(difficulty: Difficulty) {
  emit("playing", difficulty);
}
</script>

<style scoped lang="scss">
button {
  min-width: 100px;
}
</style>
```
