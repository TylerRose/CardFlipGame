<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <vue-flip
      width="400px" height="450px" class="text-center shadow"
      v-model="createAccount"
    >
      <template v-slot:front>
        <v-card
          rounded="0"
          variant="flat"
          :border="true"
          height="100%"
          class="overflow-visible d-flex flex-column"
        >
          <v-card-item>
            <v-card-title> Login</v-card-title>
            <v-card-subtitle>{{ applicationUser.name ? `Welcome, ${applicationUser.name}` : "Please Sign In" }}
            </v-card-subtitle>
          </v-card-item>
          <v-divider/>
          <v-card-text>
            <v-text-field label="Email" v-model="email" type="text"/>
            <v-text-field label="Password" v-model="password" type="password"/>
          </v-card-text>
          <v-divider/>
          <v-card-text class="flex-grow-0">
            <v-btn color="teal" class="mb-4 mx-2" @click="login()">
              <v-icon icon="fas fa-check" start/>
              Submit
            </v-btn>
            <v-btn color="teal" class="mb-4 mx-2" @click="createAccount = !createAccount">
              <v-icon icon="fas fa-arrow-right-arrow-left" start/>
              Create Account
            </v-btn>
          </v-card-text>
        </v-card>
      </template>
      <template v-slot:back>
        <v-card
          rounded="0"
          variant="flat"
          :border="true"
          height="100%"
          class="overflow-visible d-flex flex-column"
        >
          <v-card-item>
            <v-card-title> Create Account</v-card-title>
          </v-card-item>
          <v-divider/>
          <v-card-text>
            <v-text-field v-if="createAccount" label="Name" v-model="name" type="text"/>
            <v-text-field label="Email" v-model="email" type="text"/>
            <v-text-field label="Password" v-model="password" type="password"/>
          </v-card-text>
          <v-divider/>
          <v-card-text class="flex-grow-0">
            <v-btn color="teal" class="mb-4 mx-2" @click="login()">
              <v-icon icon="fas fa-check" start/>
              Submit
            </v-btn>
            <v-btn color="teal" class="mb-4 mx-2" @click="createAccount = !createAccount">
              <v-icon icon="fas fa-arrow-right-arrow-left" start/>
              Login
            </v-btn>
          </v-card-text>
        </v-card>
      </template>
    </vue-flip>
  </v-container>
</template>

<script setup lang="ts">
import {ApplicationUserViewModel, LoginServiceViewModel} from "@/viewmodels.g";
import {VueFlip} from "vue-flip";

const createAccount = ref(false);

const name = ref("");
const email = ref("");
const password = ref("");

const loginService = new LoginServiceViewModel();

const applicationUser = ref(new ApplicationUserViewModel());
loginService.getUserInfo().then((result) => {
  applicationUser.value = new ApplicationUserViewModel(result.data.object!);
});

async function login() {
  if (createAccount.value) {
    await loginService.createAccount(name.value, email.value, password.value)
  }
  await loginService.login(email.value, password.value);
  createAccount.value = false;

  loginService.getUserInfo().then((result) => {
    applicationUser.value = new ApplicationUserViewModel(result.data.object!);
  })
  clearForm();
}

function clearForm() {
  name.value = "";
  email.value = "";
  password.value = "";
}
</script>
