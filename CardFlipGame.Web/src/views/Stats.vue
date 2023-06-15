<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-2 shadow" width="400">
      <v-card-title>Stats</v-card-title>
      <v-divider />
      <v-alert
        v-if="isGetUserStatsFailed"
        type="error"
        title="Failed to retrieve user stats!"
        text="Please try again later."
        class="ma-4 mt-5"
      />
      <v-card-text v-else>
        <v-table v-if="stats !== null" hover style="background: transparent">
          <tbody>
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
              <td>{{ stats.averageDurationEasy + "s" }}</td>
            </tr>
            <tr>
              <td>Average Medium Duration</td>
              <td>{{ stats.averageDurationMedium + "s" }}</td>
            </tr>
            <tr>
              <td>Average Hard Duration</td>
              <td>{{ stats.averageDurationHard + "s" }}</td>
            </tr>
          </tbody>
        </v-table>
        <v-progress-circular v-else indeterminate />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { GameServiceViewModel, LoginServiceViewModel } from "@/viewmodels.g";
import { ApplicationUser, UserStats } from "@/models.g";

const gameService = new GameServiceViewModel();
const loginService = new LoginServiceViewModel();

const stats = ref(null as UserStats | null);
const isGetUserStatsFailed = ref(false);

getUserStats();

async function getUserStats() {
  try {
    await loginService.isLoggedIn();
    var user: ApplicationUser = (await loginService.getUserInfo()).data.object!;
    var userGames = await gameService.getUserStats(user.id);

    stats.value = userGames.data.object!;
    console.log("Successfully retrieved user stats");
  } catch (e) {
    console.log(e);
    isGetUserStatsFailed.value = true;
    console.log("Failed to retrieve user stats");
  }
}
</script>
