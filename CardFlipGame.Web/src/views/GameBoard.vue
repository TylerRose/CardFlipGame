<template>
  <v-container>
    <v-row class="flex-child text-subtitle-2">
      <v-col class="v-col-3" v-for="(card, index) in cards" v-bind:key="index">
        <v-sheet
          v-bind:style="{ height: deviceHeight * 0.15 + 'px' }"
          width="50%"
          height="100%"
          class="pa-4 text-center mx-auto d-flex flex-column align-center justify-center"
          elevation="2"
          @click="flip(card)"
          :class="getItemClass(index)"
        >
          <div v-if="!card.matched">
            <v-icon v-if="card.active"> {{ card.icon }} </v-icon>
            <v-icon v-else> fas fa-question </v-icon>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
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

interface Card {
  icon: string;
  active: boolean;
  matched: boolean;
}

const cards = ref<Card[]>([
  { icon: IconMap.cloudy, active: false, matched: false },
  { icon: IconMap.cloudy, active: false, matched: false },
  { icon: IconMap.lightningStorm, active: false, matched: false },
  { icon: IconMap.lightningStorm, active: false, matched: false },
  { icon: IconMap.sunny, active: false, matched: false },
  { icon: IconMap.sunny, active: false, matched: false },
  { icon: IconMap.raining, active: false, matched: false },
  { icon: IconMap.raining, active: false, matched: false },
  { icon: IconMap.partlySunny, active: false, matched: false },
  { icon: IconMap.partlySunny, active: false, matched: false },
  { icon: IconMap.snowing, active: false, matched: false },
  { icon: IconMap.snowing, active: false, matched: false },
  { icon: IconMap.windy, active: false, matched: false },
  { icon: IconMap.windy, active: false, matched: false },
  { icon: IconMap.foggy, active: false, matched: false },
  { icon: IconMap.foggy, active: false, matched: false },
]);

const shuffle = () => {
  cards.value.sort(() => Math.random() - 0.5);
};

// shuffle();

const deviceHeight = ref<number>(window.innerHeight);
window.addEventListener("resize", () => {
  deviceHeight.value = window.innerHeight;
});

const flip = (card: Card) => {
  // if the card is already flipped then return
  if (card.active) return;

  const activeCards = cards.value.filter((x) => x.active);
  if (activeCards.length === 2) return;
  if (activeCards.length === 1) {
    const prev = cards.value.find((x) => x.active);
    card.active = !card.active;
    if (prev != undefined && card.icon === prev.icon) flipCardsBack(true);
    flipCardsBack();
    return;
  }
  card.active = !card.active;
};

function checkGameState() {
  if (cards.value.filter((x) => x.matched === false).length === 0) {
    console.log("You win!");
  }
}

function flipCardsBack(matched: boolean = false) {
  setTimeout(() => {
    if (matched) {
      cards.value
        .filter((x) => x.active)
        .forEach((x) => {
          x.matched = true;
          x.active = false;
        });
      checkGameState();
    } else {
      cards.value.forEach((x) => (x.active = false));
    }
  }, 500);
}

function getItemClass(index: number) {
  if (cards.value[index].matched) return "matched";
  return cards.value[index].active ? "front" : "back";
}
</script>
<!-- // Maybe there should a be a gen function that generates a list of cards that //
have the icon and active state -->

<style lang="scss">
.front {
  background-color: #4caf50;
}

.back {
  background-color: #f44336;
}

.matched {
  background-color: #b7b7b7;
}
</style>
