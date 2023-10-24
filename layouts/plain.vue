<template>
  <v-app class="h-100">
    <v-container class="h-100">
      <slot />
    </v-container>
  </v-app>
</template>

<style scoped>
@media (min-width: 2560px){
  .v-container {
    max-width: 1000px !important; 
  }
}

@media (min-width: 1920px){
  .v-container {
    max-width: 1000px !important;
  }
}

@media (min-width: 1280px){
  .v-container {
    max-width: 1200px !important;
  }
}
</style>