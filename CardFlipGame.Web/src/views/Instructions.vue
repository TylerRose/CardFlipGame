<template>
  <v-container>
    <h1>Instructions</h1>
    <p>Display message</p>
    <!-- <v-btn @click="LoadUser()">DisplayStats</v-btn> -->
  </v-container>
</template>
<script setup lang="ts">
import { UserGameViewModel } from "@/viewmodels.g";
import { GameServiceViewModel } from "@/viewmodels.g";

const userGame = new UserGameViewModel();
const GameService = new GameServiceViewModel();

// userGame.userName = "Vera";
// userGame.difficulty = 2;
// userGame.durationInSeconds = 58;
// userGame.numberOfMoves = 10;
// userGame.$save();

userGame.$load(1).then(() => {
  console.log("UserGameViewModel loaded");
  GameService.getUserStats("Vera").then((result) => {
    console.log(result.data);
  });
});
</script>
