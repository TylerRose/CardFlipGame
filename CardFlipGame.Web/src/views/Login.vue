<template>
<v-container>
  <v-row>
    Username: <v-text-field v-model="username" />
  </v-row>
  <v-row>
    Password: <v-text-field v-model="password" />
  </v-row>
  <v-row>
    <v-btn @click="login">Submit</v-btn>
  </v-row>
</v-container>
</template>

<script setup lang="ts">
import {LoginServiceViewModel} from "@/viewmodels.g";

  const username = ref("");
  const password = ref("");

  const loginService = new LoginServiceViewModel();

  async function login(){
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
