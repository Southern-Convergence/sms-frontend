<template>
  <v-container class="d-flex">
    <v-spacer />
    <v-card class="text-center pa-4" rounded="lg" width="320" border>
      <v-progress-circular size="64" color="primary" indeterminate />

      <h6 class="text-subtitle-2 mt-4">Please wait while we are loading a few things...</h6>

      <p class="text-caption text-medium-emphasis mt-2">This should not take too long.</p>
    </v-card>
    <v-spacer />
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  layout : "plain"
})
</script>