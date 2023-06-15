<template>
  <v-container>
    <v-card>
      <v-card-title>
        Available Games
      </v-card-title>
      <v-btn @click="createGame">Create Game</v-btn>
      <v-dialog v-model="waitingForPlayer" persistent>
        <v-card width="600" title="Waiting for another player">
          <v-card-text>
            <v-progress-circular indeterminate></v-progress-circular>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="leaveGame" color="red">Leave Game</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-text-field v-model="createQueueBonus" label="Queue Bonus"/>
      <v-divider/>
      <v-card-text>
        <v-list>
          Available Lobbies: {{ (lobbies as RaceGame[]).length }}
          <v-list-item v-for="(lobby,i) in lobbies as RaceGame[]" :key="i">
            <v-list-item-title>{{ lobby.raceGameId }}</v-list-item-title>
            <v-list-item-action>
              <v-btn color="primary" @click="joinGame(lobby.raceGameId!)">Join</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">

import * as signalR from "@microsoft/signalr";
import {RaceGame} from "@/models.g";
import {LoginServiceViewModel, RaceGameViewModel} from "@/viewmodels.g";
import router from "@/router";
import {Difficulty} from "@/scripts/gameService";
import GameBoard from "@/components/GameBoard.vue";
import {SpeedFlipGame} from "@/scripts/SpeedFlipGame";

const lobbies = ref<RaceGame[]>([]);

const createdGame = ref<RaceGameViewModel>();

const connection = new signalR.HubConnectionBuilder().withUrl("/lobbyHub").build();
connection.start()

const createQueueBonus = ref(1);
const waitingForPlayer = ref(false);

watch(createdGame, () => {
  console.log(createdGame.value);
  if(createdGame.value?.playerOneId && createdGame.value?.playerTwoId){
    router.push(`/playrace/${createdGame.value.raceGameId}`)
  }
})

const loginService = new LoginServiceViewModel();
const userId = ref();
loginService.getUserInfo().then(() => {
  userId.value = loginService.getUserInfo.result?.id
}).catch(() => {
  router.push("/login");
})

connection.on("gameLobbies", (returned) => {
  lobbies.value = returned;
});

connection.on(`myGame-${userId.value}`, (result)=>{
  console.log("MyGame", result);
  createdGame.value = result;
  if(createdGame.value?.playerOneId && createdGame.value?.playerTwoId){
    router.push(`/playrace/${createdGame.value.raceGameId}`)
  }
})

connection.on("pong", (lobbies) => {
  console.log("Pong");
});

const pollLobbies = setInterval(() => {
  connection.send("GetAvailableGames")
  // console.log("1", createdGame.value?.playerOneId);
  // console.log("2", createdGame.value?.playerTwoId);
  // connection.send("Ping")
}, 1000);


onBeforeUnmount(() => {
  clearInterval(pollLobbies);
  connection.stop();
})

function joinGame(lobbyId: number) {
  connection.send("JoinGame", lobbyId, userId.value).then(async () => {
    waitingForPlayer.value = true;
    createdGame.value = new RaceGameViewModel();
    await createdGame.value.$load(lobbyId);
    router.push(`/playrace/${createdGame.value.raceGameId}`)
    router.go(-1);
  })
}

function leaveGame() {
  connection.send("LeaveGame", userId.value).then(() => {
    waitingForPlayer.value = false;
  })
}

async function createGame() {
  createdGame.value = new RaceGameViewModel();
  createdGame.value.playerOneId = userId.value;
  createdGame.value.queueBonus = createQueueBonus.value;
  await createdGame.value.$save();
  connection.send("CreateGame").then(() => {
    waitingForPlayer.value = true;
    connection.on(`gameLobbies-P2Joined-${createdGame.value?.raceGameId}`, (result)=>{
      console.log("Joined", result);
      createdGame.value = result;
      console.log("pushing")
      router.push("/playrace/" + createdGame.value?.raceGameId);
      router.go(-1);
    })
  });
}

function GoToRace(){

}
</script>
