<template>
  <v-app id="vue-app" :key="user.id">
    <v-app-bar color="teal">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <router-link to="/" style="color: inherit"> Epic Flip </router-link>
      </v-toolbar-title>
      <v-btn :icon="themeIcon" @click="switchTheme"></v-btn>
      <v-menu
        v-if="isLoggedIn"
        v-model="menu"
        :close-on-content-click="false"
        location="bottom"
      >
        <template v-slot:activator="{ props }">
          <v-btn color="white" v-bind="props" class="mx-2" icon="fas fa-user" />
        </template>
        <v-card min-width="250">
          <v-card-item>
            <v-card-title> {{ user.name }} </v-card-title>
            <v-card-subtitle> {{ user.email }} </v-card-subtitle>
          </v-card-item>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              v-if="isLoggedIn"
              color="teal"
              variant="elevated"
              @click="logout"
            >
              Log Out
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
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
        <v-list-item v-if="isLoggedIn" link to="/stats">
          <template #prepend>
            <v-icon>fas fa-address-book</v-icon>
          </template>
          <v-list-item-title>View Stats</v-list-item-title>
        </v-list-item>
        <v-list-item v-else link to="/login">
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
import {
  LoginServiceViewModel,
  ApplicationUserViewModel,
} from "@/viewmodels.g";

const theme = useTheme();

const drawer = ref<boolean | null>(null);

const loginService = new LoginServiceViewModel();

const menu = ref(false);

const isLoggedIn = ref(false);

const user = ref(new ApplicationUserViewModel());

loginService
  .isLoggedIn()
  .then(() => {
    isLoggedIn.value = true;
    getUser();
  })
  .catch(() => {
    isLoggedIn.value = false;
  });

const themeIcon = computed(() => {
  if (theme.global.name.value === "light") {
    return "fas fa-sun";
  } else {
    return "fas fa-moon";
  }
});

function getUser() {
  loginService.getUserInfo().then((result) => {
    user.value = new ApplicationUserViewModel(result.data.object!);
  });
}

async function logout() {
  await loginService.logout();
  isLoggedIn.value = false;
  menu.value = false;
}

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
