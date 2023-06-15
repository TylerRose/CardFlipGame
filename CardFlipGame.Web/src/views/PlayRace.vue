<template>
  <v-container class="fill-height pa-1" fluid>
    <TimerDisplay :milliseconds="game.timer * 1000" class="timer" />
    <vue-flip
      v-model="card.active"
      :width="cardSize"
      :height="cardSize"
      v-for="(card, index) in game.cards"
      v-bind:key="index"
      class="pa-1 no-select"
    >
      <template v-slot:front>
        <v-sheet
          @click="!card.matched ? game.flip(card) : null"
          :color="card.matched ? 'grey-darken-2' : 'grey'"
          class="align-center justify-center rounded-lg w-100 h-100 d-flex"
        >
          <v-icon
            v-if="card.matched"
            class="icon-size"
            icon="fas fa-circle-check"
          />
        </v-sheet>
      </template>
      <template v-slot:back>
        <v-sheet
          @click="!card.matched ? game.flip(card) : null"
          :color="card.color"
          class="align-center justify-center rounded-lg w-100 h-100 d-flex"
        >
          <v-icon
            color="white"
            class="icon-size"
            :icon="game.cards[index].icon"
          />
        </v-sheet>
      </template>
    </vue-flip>
    <v-dialog persistent v-model="game.isGameOver" width="auto">
      <v-card class="text-center">
        <v-card-item>
          <v-card-title>You won! Great job!</v-card-title>
        </v-card-item>
        <v-card-text class="pa-2">
          <div class="mb-2">
            {{ gameTimeMessage }}
          </div>
          <v-btn color="teal" @click="emit('stopPlaying')" class="ma-2">
            Change Difficulty
          </v-btn>
          <v-btn color="teal" @click="game.restartGame()" class="ma-2">
            New Game
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { FlipGame, Difficulty } from "@/scripts/gameService";
import { VueFlip } from "vue-flip";
import {
  ApplicationUserViewModel,
  LoginServiceViewModel, RaceGameViewModel,
  UserGameViewModel,
} from "@/viewmodels.g";
import { ApplicationUser } from "@/models.g";
import TimerDisplay from "@/components/TimerDisplay.vue";
import {SpeedFlipGame} from "@/scripts/SpeedFlipGame";

const emit = defineEmits(["stopPlaying"]);

const props = defineProps({
  raceGameId: Number,
});

const raceGame = new RaceGameViewModel();
raceGame.$load(props.raceGameId);

const loginService = new LoginServiceViewModel();
const applicationUser = ref(new ApplicationUserViewModel());
loginService.getUserInfo().then((result) => {
  applicationUser.value = new ApplicationUserViewModel(result.data.object!);
})

const cardSize = 100 / Math.sqrt(Difficulty.Hard * 2) + "%";
const game = reactive(new SpeedFlipGame(raceGame.raceGameId!, Difficulty.Hard, applicationUser.value.id == raceGame.playerOneId ? 1: 2));

const gameTimeMessage = computed(() => {
  const minutes = Math.floor(game.timer / 60);
  const seconds = game.timer % 60;
  if (minutes > 0) {
    return `You beat the game in ${minutes} minutes and ${seconds} seconds.`;
  }
  return `You beat the game in ${seconds} seconds.`;
});

const isLoggedIn = ref(false);
loginService
  .isLoggedIn()
  .then(() => {
    isLoggedIn.value = true;
  })
  .catch(() => {
    isLoggedIn.value = false;
  });

async function storeGameResult() {
  try {
    await loginService.isLoggedIn();
    var user: ApplicationUser = (await loginService.getUserInfo()).data.object!;
    var applicationUser = new ApplicationUserViewModel(user);

    console.log("Game saved");
  } catch (e) {
    console.log(e);
    console.log("User not logged in");
  }
}

// Show the difficulty selection menu when the user navigates back.
onMounted(() => {
  window.history.pushState("playing", document.title, window.location.href);
  window.addEventListener("popstate", () => {
    emit("stopPlaying");
  });
});
</script>

<style scoped lang="scss">
/* Prevents text selection on cards, which prevents chrome (specifically?) from
rendering a disabled cursor when the user attempts to drag a selected card. */
.no-select {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.icon-size {
  font-size: 45px;
}
</style>
