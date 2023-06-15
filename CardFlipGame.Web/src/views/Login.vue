<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="text-center pa-2 shadow">
      <v-card-item>
        <v-card-title>Login</v-card-title>
      </v-card-item>
      <v-card-text class="my-4">
        <v-text-field label="Email" v-model="email" type="text" />
        <v-text-field label="Password" v-model="password" type="password" />
      </v-card-text>
      <v-btn color="teal" class="mb-4" @click="login()">
        <v-icon icon="fas fa-check" start /> Submit
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { LoginServiceViewModel } from "@/viewmodels.g";

const email = ref("");
const password = ref("");

const loginService = new LoginServiceViewModel();

async function login() {
  await loginService.login(email.value, password.value);
  console.log(await loginService.isLoggedIn());
}
</script>
