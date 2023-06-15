<template>
  <v-app id="vue-app">
    <v-app-bar color="teal">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <router-link to="/" style="color: inherit"> Epic Flip </router-link>
      </v-toolbar-title>
      <v-btn :icon="themeIcon" @click="switchTheme"></v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list color="teal">
        <v-list-item link to="/">
          <template #prepend>
            <v-icon>fas fa-home</v-icon>
          </template>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/instructions">
          <template #prepend>
            <v-icon>fas fa-book</v-icon>
          </template>
          <v-list-item-title>Instructions</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/play">
          <template #prepend>
            <v-icon>fas fa-chess-rook</v-icon>
          </template>
          <v-list-item-title> Play Game </v-list-item-title>
        </v-list-item>

        <v-list-item link to="/findracegame">
          <template #prepend>
            <v-icon>fas fa-flag-checkered</v-icon>
          </template>
          <v-list-item-title> Find Race Game </v-list-item-title>
        </v-list-item>

        <v-list-item link to="/login">
          <template #prepend>
            <v-icon>fas fa-user</v-icon>
          </template>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <!-- https://stackoverflow.com/questions/52847979/what-is-router-view-key-route-fullpath -->
      <router-view v-slot="{ Component, route }">
        <transition name="router-transition" mode="out-in" appear>
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify/lib/framework.mjs";

const theme = useTheme();

const drawer = ref<boolean | null>(null);

const themeIcon = computed(() => {
  if (theme.global.name.value === "light") {
    return "fas fa-sun";
  } else {
    return "fas fa-moon";
  }
});

function switchTheme() {
  if (theme.global.name.value === "light") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}

function setTheme(themeName: string) {
  theme.global.name.value = themeName;
  localStorage.setItem("theme", themeName);
}

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    theme.global.name.value = savedTheme;
  } else {
    setTheme("dark");
  }
});
</script>

<style lang="scss">
.router-transition-enter-active,
.router-transition-leave-active {
  transition: 0.1s ease-out;
}

.router-transition-move {
  transition: transform 0.4s;
}

.router-transition-enter-from,
.router-transition-leave-to {
  opacity: 0;
}

// The default vuetify elevation shadows are bad. This is better.
.shadow {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}
</style>
