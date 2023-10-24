<template>
  <v-app>
    <layout-std-appbar appbar_title="Analytics" extension-height="96" extended>
      <template v-slot:extension>
        <v-container>
          <v-card class="mb-1" rounded="lg" border>
            <v-toolbar class="pr-2" rounded="lg" flat>
              <v-toolbar-title>
                <v-list-item class="pl-0" :title="anal_provider.subtype" :subtitle="anal_provider.dashboard">
                  <template v-slot:prepend>
                    <menus-subsystem-select @input="anal_provider.change_dashboard" />
                  </template>
                </v-list-item>
              </v-toolbar-title>
              <v-spacer />

              <v-tooltip location="top">
                <template v-slot:activator="{props}">
                  <v-btn v-bind="props" color="primary" icon>
                    <v-icon>mdi-filter</v-icon>
                  </v-btn>
                </template>
                <span>Filter Options</span>
              </v-tooltip>

              <v-tooltip location="top">
                <template v-slot:activator="{props}">
                  <v-btn v-bind="props" color="primary" icon>
                    <v-icon>mdi-export-variant</v-icon>
                  </v-btn>
                </template>
                <span>Export Data</span>
              </v-tooltip>


              <v-tooltip location="top">
                <template v-slot:activator="{props}">
                  <v-btn v-bind="props" color="primary" icon>
                    <v-icon>mdi-printer</v-icon>
                  </v-btn>
                </template>
                <span>Print</span>
              </v-tooltip>

            </v-toolbar>
          </v-card>
        </v-container>
      </template>
    </layout-std-appbar>


    <v-main>
      <v-container v-show="anal_provider.ready">
        <slot />

      </v-container>
      <v-container class="h-100" v-if="!anal_provider.ready">
        <v-row class="h-100" justify="center" align="center">
          <v-card class="pa-6" border>
            <v-card-title class="text-center">Loading</v-card-title>
            <v-card-subtitle>
              Fetching Data... I guess
            </v-card-subtitle>
          </v-card>
        </v-row>
      </v-container>
    </v-main>

    <layout-std-footer />
  </v-app>
</template>

<script lang="ts" setup>
import useAnalyticsProvider from "~~/store/anal_provider";

let anal_provider = useAnalyticsProvider();

</script>


<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s;
}

.page-enter,
.page-leave-active {
  opacity: 0;
}

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