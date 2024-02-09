<template>
  <v-container>
    <v-footer color="indigo-lighten-5" class="d-flex" height="48" app border>
      <small class="text-caption">Developed by Southern Convergence</small>
      <v-spacer />
      <small class="text-caption text--secondary mr-1">EN (Phiippines)</small>
      <img src="/ph-flag.svg" height="20" />

      <commons-export-dialog name="Resources" v-if="export_dialog.data.length" :items="export_dialog.data"
        v-model="export_dialog.dialog" />
    </v-footer>
  </v-container>
</template>

<script lang="ts" setup>
/* Localization Options and other hyperlinks goes here */
import { useExport } from "~/store/index";
const export_dialog = useExport();


</script>