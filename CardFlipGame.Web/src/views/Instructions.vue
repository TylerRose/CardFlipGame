<template>
  <v-container class="d-flex align-center flex-column">
    <v-card width="400" class="text-center pa-2">
      <v-card-item>
        <v-card-title>How To Play Epic Flip</v-card-title>
      </v-card-item>
      <v-card-text class="my-4">
        <div class="mb-4">
          <v-avatar color="red" size="x-small"> 1 </v-avatar>
          Flip two cards to find a match
        </div>
        <div class="d-flex justify-center mb-4">
          <vue-flip
            v-for="n in 2"
            :active-click="true"
            width="150px"
            height="200px"
            class="pa-1"
          >
            <template v-slot:front>
              <v-sheet
                color="grey"
                class="align-center justify-center rounded-lg w-100 h-100 d-flex"
              />
            </template>
            <template v-slot:back>
              <v-sheet
                color="teal"
                class="align-center justify-center rounded-lg w-100 h-100 d-flex"
              >
                <v-icon class="icon-size" icon="fas fa-hippo" />
              </v-sheet>
            </template>
          </vue-flip>
        </div>
        <div>
          <v-avatar color="red" size="x-small"> 2 </v-avatar>
          Match all the cards to win the game!
        </div>
      </v-card-text>
      <v-btn color="teal" class="mb-4" to="/play">
        <v-icon icon="fas fa-chess-rook" start />Play Game
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { VueFlip } from "vue-flip";
</script>

<style scoped>
.icon-size {
  font-size: 50px;
}
</style>
