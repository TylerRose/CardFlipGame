<template>
  <v-card class="pa-0 timer">
    <v-card-text>
      {{ time }}
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    milliseconds?: number;
  }>(),
  {
    milliseconds: 0,
  }
);
const time = computed(() => {
  return convertMsToTime(props.milliseconds ?? 0);
});

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

// Convert time from Ms to 00:00:00
function convertMsToTime(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = minutes % 60;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
}
</script>

<style lang="scss">
.timer {
  position: absolute;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
