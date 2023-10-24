<template>
  <v-container class="h-100">
  <div>
    <commons-item-container
      :title="title"
      :subtitle="subtitle"
      :icon="icon"
    
    
    />

  </div>
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({ layout: "std-systems" });

const title = "Summary Reclassification Application";
const subtitle = "A brief overview of a reclassification request.";
const icon = "mdi-folder";


const componentCols = {
  default: 12,
  xl: 6,
  lg: 6,
  md: 4,
  sm: 3,
};
/**
 * SUBMIT TO LORD JESUS
 */

//reactivity

//ref or reactive

</script>
