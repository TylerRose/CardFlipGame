<template>
  <v-container>
    <h1>Instructions</h1>
    <p>Display message</p>
    <!-- <v-btn @click="LoadUser()">DisplayStats</v-btn> -->
  </v-container>
</template>
<script setup lang="ts">
import { UserGameViewModel } from "@/viewmodels.g";

const userGame = new UserGameViewModel();

userGame.userName = "Vera";
userGame.difficulty = 2;
userGame.durationInSeconds = 58;
userGame.numberOfMoves = 10;
userGame.$save();

const user2 = new UserGameViewModel();
user2.userName = "Andrew";
user2.difficulty = 1;
user2.durationInSeconds = 23;
user2.numberOfMoves = 14;
user2.$save();

GameService.getGameStats("Vera", 1).then((result) => {
  console.log(result.data);
});

userGame.$load(1).then(() => {
  console.log("UserGameViewModel loaded");
  userGame.playerStats("Vera", 1).then((result) => {
    console.log(result.data);
  });
});
// console.log(Vera.request.playerStats("Vera", 1));

// function LoadUser() {
//   console.log(Vera.playerStats("Vera", 1));
// }
</script>
