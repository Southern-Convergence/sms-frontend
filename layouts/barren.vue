<template>
  <v-app>
    <layout-std-appbar appbar_title="Systems"/> 

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <layout-std-footer />
  </v-app>
</template>

<style scoped>
@media (min-width: 2560px) {
  ::v-deep(.v-container) {
    max-width: 1000px !important;
  }
}

@media (min-width: 1920px) {
  ::v-deep(.v-container) {
    max-width: 1000px !important;
  }
}

@media (min-width: 1280px) {
  ::v-deep(.v-container) {
    max-width: 1200px !important;
  }
}
</style>