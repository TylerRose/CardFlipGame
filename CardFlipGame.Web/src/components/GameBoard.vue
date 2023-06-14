<template>
  <v-container class="fill-height pa-0" fluid>
    <TimerDisplay :milliseconds="game.timer * 1000" class="timer"/>
    <div class="d-flex flex-wrap w-100 h-100 pa-1 no-select">
      <v-sheet
        v-for="(card, index) in game.cards"
        v-bind:key="index"
        class="d-flex align-center justify-center pa-1"
        :width="cardSize"
        :height="cardSize"
      >
        <v-sheet
          class="text-center d-flex align-center justify-center rounded-lg w-100 h-100"
          :key="game.cards[index].icon"
          @click="!card.matched ? game.flip(card) : null"
          :class="getCardColorClass(index)"
        >
          <v-icon v-show="!card.matched && card.active" size="x-large">
            {{ card.icon }}
          </v-icon>
        </v-sheet>
      </v-sheet>
    </div>
    <v-dialog persistent v-model="game.isGameOver" width="auto">
      <v-card>
        <v-card-text> You won! Great job! </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="game.restartGame()"> New Game </v-btn>
          <v-btn color="primary" @click="emit('stopPlaying')">
            Change Difficulty
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import {FlipGame, Difficulty} from "@/scripts/gameService";
import TimerDisplay from "@/components/TimerDisplay.vue";

const emit = defineEmits(["stopPlaying"]);

const props = defineProps({
  difficulty: {
    type: Number as () => Difficulty,
    default: Difficulty.Noob,
  },
});

const cardSize = 100 / Math.sqrt(props.difficulty * 2) + "%";

const game = reactive(new FlipGame(props.difficulty));

function getCardColorClass(index: number): string {
  const card = game.cards[index];
  if (card.matched) return "matched";
  return card.active ? "front" : "back";
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
.front {
  background-color: #cf3d3b;
}

.back {
  background-color: #0aa795;
}

.matched {
  background-color: #d2d2d2;
}

/* Prevents text selection on cards, which prevents chrome (specifically?) from 
rendering a disabled cursor when the user attempts to drag a selected card. */
.no-select {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.timer {
  position: absolute;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
