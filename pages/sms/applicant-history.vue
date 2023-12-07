
<template>
  <v-container class="h-100 d-flex  align-center justify-center">
    <v-card class="w-50">
      <v-toolbar color="indigo" border>
        <v-list-item class="pl-2" density="compact">
          <template v-slot:prepend>
            <v-avatar class="mr-1" variant="text">
              <v-icon icon="mdi-account" dark />
            </v-avatar>
          </template>

          <v-list-item-title>List of Schools</v-list-item-title>
          <v-list-item-subtitle>A brief overview of school profile.</v-list-item-subtitle>
        </v-list-item>
        <v-spacer></v-spacer>

      </v-toolbar>

    </v-card>

  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({ layout: "std-systems" })

</script>
