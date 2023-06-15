<template>
  <v-container>
    <v-card :key="new Date()">
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
          Available Lobbies: {{ lobbies.length }}
          <v-list-item v-for="(lobby,i) in lobbies" :key="i">
            <v-list-item-title>{{ lobby.raceGameId }}</v-list-item-title>
            <v-list-item-action>
              <v-btn color="primary" @click="joinGame(lobby.id)">Join</v-btn>
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
import {LoginServiceViewModel} from "@/viewmodels.g";
import router from "@/router";

const lobbies = ref<RaceGame[]>([]);

const connection = new signalR.HubConnectionBuilder().withUrl("/lobbyHub").build();
connection.start()

const createQueueBonus = ref(1);
const waitingForPlayer = ref(false);

const loginService = new LoginServiceViewModel();
const userId = ref();
loginService.getUserInfo().then(() => {
  userId.value = loginService.getUserInfo.result?.id
}).catch(() => {
  router.push("/login");
})

connection.on("gameLobbies", (lobbies) => {
  console.log(lobbies.length, lobbies);
  lobbies.value = lobbies;
});

connection.on("pong", (lobbies) => {
  console.log("Pong");
});

watch(lobbies, (newLobbies) => {
  console.log("Lobbies changed", newLobbies);
})


const pollLobbies = setInterval(() => {
  connection.send("GetAvailableGames")
  // connection.send("Ping")
}, 1000);


onBeforeUnmount(() => {
  clearInterval(pollLobbies);
  connection.stop();
})
function joinGame(lobbyId: string) {
  connection.send("JoinGame", lobbyId, userId.value);
}

function leaveGame() {
  connection.send("LeaveGame", userId.value).then(() => {
    waitingForPlayer.value = false;
  })
}

function createGame() {
  connection.send("CreateGame", userId.value, createQueueBonus.value).then(() => {
    waitingForPlayer.value = true;
  });
}
</script>
