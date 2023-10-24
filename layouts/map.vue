<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>UAC: Location Based Access Paradigm</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="h-100" fluid>
        <slot />

        <v-bottom-navigation>
          <v-spacer />
          <v-chip class="mr-2" label>
            X:{{location.x}}
          </v-chip>
          <v-chip label>
            Y:{{location.y}}
          </v-chip>
        </v-bottom-navigation>
      </v-container>
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" top multi-line>
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn @click="snackbar.show = false" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import { useSnackbar, useLocation } from '~~/store';


  export default {

    data(){
      return {
        snackbar : useSnackbar(),
        location : useLocation()
      }
    },
  }
</script>