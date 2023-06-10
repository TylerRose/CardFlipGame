<template>
  <v-container>
    <v-row class="flex-child text-subtitle-2">
      <v-col class="v-col-3" v-for="(icon, index) in list" v-bind:key="index">
        <!-- v-bind="flipped[index] ? { class: 'flip' } : {}" -->
        <v-sheet
          v-bind="flipped[index]"
          v-bind:style="{ height: deviceHeight * 0.15 + 'px' }"
          color="blue-lighten-5"
          elevation="2"
          width="50%"
          height="100%"
          class="pa-4 text-center mx-auto d-flex flex-column align-center justify-center flip"
          @click="flip(index)"
        >
          <v-icon v-if="flipped[index]"> {{ icon }} </v-icon>
          <v-icon v-else> fas fa-question </v-icon>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const flipped = ref<boolean[]>([
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
]);

enum IconMap {
  cloudy = "fas fa-cloud",
  lightningStorm = "fas fa-cloud-bolt",
  sunny = "fas fa-sun",
  raining = "fas fa-cloud-rain",
  partlySunny = "fas fa-cloud-sun",
  snowing = "fas fa-snowflake",
  windy = "fas fa-wind",
  foggy = "fas fa-smog",
}

const list = ref<string[]>([
  IconMap.cloudy,
  IconMap.cloudy,
  IconMap.lightningStorm,
  IconMap.lightningStorm,
  IconMap.sunny,
  IconMap.sunny,
  IconMap.raining,
  IconMap.raining,
  IconMap.partlySunny,
  IconMap.partlySunny,
  IconMap.snowing,
  IconMap.snowing,
  IconMap.windy,
  IconMap.windy,
  IconMap.foggy,
  IconMap.foggy,
]);

const shuffle = () => {
  list.value = list.value.sort(() => Math.random() - 0.5);
};

shuffle();

const deviceHeight = ref<number>(window.innerHeight);
window.addEventListener("resize", () => {
  deviceHeight.value = window.innerHeight;
});

const flip = (index: number) => {
  flipped.value[index] = !flipped.value[index];
  // if the array contains 2 flipped cards then flip all cards back over
  // there needs to be a delay here so that the user can see the second card
  // before they are flipped back over

  if (flipped.value.filter((x) => x).length === 2) {
    setTimeout(() => {
      flipped.value = flipped.value.map(() => false);
    }, 1000);
  }
  console.log(flipped.value[index]);
};
</script>
