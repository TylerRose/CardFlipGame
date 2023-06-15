<template>
  <v-container class="d-flex align-center flex-column">
    <v-card width="400" class="text-center pa-2 shadow">
      <v-card-item>
        <v-card-title>Choose a Difficulty</v-card-title>
      </v-card-item>
      <v-divider class="mb-2" />
      <v-card-text>
        <v-btn color="blue" @click="setDifficulty(Difficulty.Noob)">Noob</v-btn>
        <v-spacer class="my-2" />
        <v-btn color="teal" @click="setDifficulty(Difficulty.Easy)">Easy</v-btn>
        <v-spacer class="my-2" />
        <v-btn color="orange" @click="setDifficulty(Difficulty.Medium)"
          >Medium</v-btn
        >
        <v-spacer class="my-2" />
        <v-btn color="red" @click="setDifficulty(Difficulty.Hard)">Hard</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { Difficulty } from "@/scripts/gameService";

const emit = defineEmits(["startPlaying"]);

function setDifficulty(difficulty: Difficulty) {
  emit("startPlaying", difficulty);
}
</script>

<style scoped lang="scss">
button {
  min-width: 100px;
}
</style>
