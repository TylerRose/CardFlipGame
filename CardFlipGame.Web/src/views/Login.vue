<template>
  <v-container class="d-flex align-center flex-column">
    <v-card width="400" class="text-center pa-2">
      <v-card-item>
        <v-card-title>Login</v-card-title>
      </v-card-item>
      <v-card-text class="my-4">
        <v-text-field label="Username" v-model="username"/>
        <v-text-field label="Password" v-model="password"/>
      </v-card-text>
      <v-btn color="teal" class="mb-4">
        <v-icon icon="fas fa-check" start @click="login"/>
        Submit
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {LoginServiceViewModel} from "@/viewmodels.g";

const username = ref("");
const password = ref("");

const loginService = new LoginServiceViewModel();

async function login() {
  await loginService.login(username.value, password.value);
  console.log(await loginService.isLoggedIn())

  // var user : ApplicationUser = (await loginService.getUserInfo()).data.object!;
  // var userViewModel = new ApplicationUserViewModel(user)

  //  --- Modify/save user example now that it's a view model---

  // console.log(userViewModel.id);
  // userViewModel.name = "Test123";
  // await userViewModel.$save();
  // user = (await loginService.getUserInfo()).data.object!;
  // console.log(user.name);
}
</script>
