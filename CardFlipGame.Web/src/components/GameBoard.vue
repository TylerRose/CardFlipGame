<template>
  <v-container class="fill-height pa-0" fluid>
    <vue-flip
      v-model="card.active"
      :width="cardSize"
      :height="cardSize"
      v-for="(card, index) in game.cards"
      v-bind:key="index"
      class="pa-1"
    >
      <template v-slot:front>
        <v-sheet
          @click="!card.matched ? game.flip(card) : null"
          :color="card.matched ? 'green' : 'teal'"
          class="align-center justify-center rounded-lg w-100 h-100 d-flex"
        >
          <v-icon
            v-if="card.matched"
            style="font-size: 50px"
            icon="fas fa-circle-check"
          />
        </v-sheet>
      </template>
      <template v-slot:back>
        <v-sheet
          @click="!card.matched ? game.flip(card) : null"
          color="red"
          class="align-center justify-center rounded-lg w-100 h-100 d-flex"
        >
          <v-icon style="font-size: 50px">
            {{ card.icon }}
          </v-icon>
        </v-sheet>
      </template>
    </vue-flip>
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
import { FlipGame, Difficulty } from "@/scripts/gameService";
import { VueFlip } from "vue-flip";

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
</style>
