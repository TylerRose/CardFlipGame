<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-2 shadow">
      <v-card-title>Stats</v-card-title>
      <v-divider v-divider />
      <v-alert
        v-if="isGetUserStatsFailed"
        type="error"
        title="Failed to retrieve user stats!"
        text="Please try again later."
        class="ma-4 mt-5"
      />
      <v-card-text v-else>
        <v-table hover style="background: transparent">
          <thead>
            <tr>
              <th class="text-left">Attribute</th>
              <th class="text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>User</td>
              <td>{{ stats.user }}</td>
            </tr>
            <tr>
              <td>Average Easy Moves</td>
              <td>{{ stats.averageMovesEasy }}</td>
            </tr>
            <tr>
              <td>Average Medium Moves</td>
              <td>{{ stats.averageMovesMedium }}</td>
            </tr>
            <tr>
              <td>Average Hard Moves</td>
              <td>{{ stats.averageMovesHard }}</td>
            </tr>
            <tr>
              <td>Average Easy Duration</td>
              <td>{{ stats.averageDurationEasy }}</td>
            </tr>
            <tr>
              <td>Average Medium Duration</td>
              <td>{{ stats.averageDurationMedium }}</td>
            </tr>
            <tr>
              <td>Average Hard Duration</td>
              <td>{{ stats.averageDurationHard }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { GameServiceViewModel, LoginServiceViewModel } from "@/viewmodels.g";
import { ApplicationUser, UserStats } from "@/models.g";

const gameService = new GameServiceViewModel();
const loginService = new LoginServiceViewModel();

var stats = reactive(new UserStats());
const isGetUserStatsFailed = ref(false);

getUserStats();

async function getUserStats() {
  try {
    await loginService.isLoggedIn();
    var user: ApplicationUser = (await loginService.getUserInfo()).data.object!;
    var userGames = await gameService.getUserStats(user.id);

    stats = userGames.data.object!;
    console.log("Successfully retrieved user stats");
  } catch (e) {
    console.log(e);
    isGetUserStatsFailed.value = true;
    console.log("Failed to retrieve user stats");
  }
}
</script>
