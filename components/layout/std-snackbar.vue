<template>
  <v-snackbar v-model="snackbar.value" location="bottom right" :timeout="snackbar.timeout" variant="text" rounded="lg" elevation="24">
    <v-alert :type="snackbar.type">
      {{ snackbar.text }}
    </v-alert>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { useSnackbar } from "~~/store";

const snackbar = useSnackbar();

</script>