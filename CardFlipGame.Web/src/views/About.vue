<template>
  <v-container>
    <v-card>
      <v-card-item>
        <v-card-title>About</v-card-title>
      </v-card-item>
      <v-card-text>
        <div class="pb-2">
          This game is a result of a final project for the .Net Web Application
          #379 class at Eastern Washington University.
        </div>
        <div class="font-weight-bold mb-2">
          <v-icon size="small" color="blue" icon="fas fa-star" start />The Team
        </div>
        <ul>
          <li>Vera</li>
          <li>Andrew</li>
          <li>Kelsey</li>
          <li>Tyler</li>
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
useTitle("Home");
</script>
