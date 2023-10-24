<template>
  <v-container class="h-100">
    <v-row class="h-100" justify="center" align="center">
      <v-col cols="6">
        <v-sheet class="pa-4 text-center">
          <v-icon icon="mdi-home" color="primary" size="92"></v-icon>
          <v-card-title class="text-center">
            Welcome back.
          </v-card-title>
          <v-card-subtitle class="text-center">
            There is no place like home
          </v-card-subtitle>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({ layout : "std-systems" });
</script>