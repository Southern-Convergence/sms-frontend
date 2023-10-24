<template>
  <v-dialog :model-value="loader.loading" width="auto" content-class="loader-dialog" location="bottom" persistent>
    <v-card class="pa-2" color="primary"  rounded="lg">
      <v-card-text class="text-center">
        {{ loader.text }}
        <h1 class="text-subtitle-2 mt-2">Please wait</h1>
        <v-progress-linear class="mt-4" color="white" rounded="lg" indeterminate />

        <h6 class="text-caption font-medium-emphasis" v-if="loader.taking_awhile">Please wait a little longer.</h6>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useLoader } from "~~/store";
const loader = useLoader();
</script>