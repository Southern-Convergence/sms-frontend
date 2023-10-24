<template>
  <v-app id="inspire">
    <layout-std-appbar appbar_title="STD Systems"/>
    <v-main>
      <v-container>
        <v-row>
          <v-col class="hidden-md-and-up pb-1" cols="12">
            <v-sheet rounded="lg">
              <v-tabs color="primary" grow>
                <v-tooltip v-for="n in nav.account_navs" location="bottom" :key="n.name">
                  <template v-slot:activator="{props}">
                    <v-tab v-bind="props" @click="$router.push({name : n.path})">
                      <v-icon size="large">{{ n.icon }}</v-icon>
                    </v-tab>
                  </template>

                  <span>{{ n.name }}</span>
                </v-tooltip>
              </v-tabs>
            </v-sheet>
          </v-col>

          <v-col class="hidden-sm-and-down" cols="12" xxl="3" xl="3" lg="3" md="4">
            <v-row dense>
              <v-col cols="12">
                <v-btn height="54" variant="plain" rounded="lg" :to="{name : 'home'}">
                  <v-list-item class="px-0 text-left" title="Home" subtitle="Back to systems">
                    <template v-slot:prepend>
                      <v-icon class="mr-2" icon="mdi-arrow-left" size="32" />
                    </template>
                  </v-list-item>
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-card class="pa-4 rounded-t-lg" border>
                  <v-list-item class="px-0" :title="auth.name" :subtitle="auth.access">
                    <template v-slot:prepend>
                      <layout-avatar />
                    </template>
                  </v-list-item>
                </v-card>
                <v-card class="rounded-b-lg" border>
                  <v-list class="pb-0">
                    <v-list-subheader>Main Menu</v-list-subheader>
                    <NavItem :items="nav.account_navs" />
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col>
            <v-card class="pa-6" rounded="lg" border>
              <slot />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <layout-std-footer />
  </v-app>
</template>

<script lang="ts" setup>
import useAuth from "~/store/auth";
import useNav from "~/store/nav";
let nav = useNav();
let auth = useAuth();
</script>

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

@media (min-width: 900px) {
  ::v-deep(.v-container) {
    max-width: 1200px !important;
  }
}
</style>