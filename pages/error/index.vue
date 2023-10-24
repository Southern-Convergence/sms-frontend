<template>
  <v-container class="h-100">
    <v-layout class="d-flex pa-2">
      <v-spacer />
      <v-card class="pa-8" elevation="2" rounded="lg" max-width="520" border>
        <v-list-item>
          <template v-slot:prepend>
            <v-avatar size="92">
              <v-img size="64" src="/sign-ban.svg" />
            </v-avatar>
          </template>

          <v-list-item-title class="text-h4 pt-2 pb-3">System Error</v-list-item-title>
          <v-list-item-subtitle class="text-body-1">Unknown error</v-list-item-subtitle>
        </v-list-item>

        <v-card-text class="text-center text-subtitle-1">
          Sorry, something broke.
        </v-card-text>

        <v-card-actions class="d-flex">
          <v-spacer />
          <v-btn variant="text" color="primary" to="/home">Back to Systems</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
      <v-spacer />
    </v-layout>
  </v-container>
</template>

<script lang="ts" setup>

definePageMeta({
  layout : "plain"
})

</script>