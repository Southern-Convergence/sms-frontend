<template>
  <v-app>
    <!-- Strictly Used for Pages under admin but excluding [domain] routes-->
    <layout-std-appbar appbar_title="Admin Console" />

    <v-main>
      <v-container>
        <v-row dense>
          <v-col class="hidden-md-and-up pb-1" cols="12">
            <v-sheet rounded="lg">
              <v-tabs color="primary" grow>
                <v-tooltip v-for="n in nav.administrative_navs" location="bottom" :key="n.name">
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

          <v-col class="hidden-sm-and-down" cols="12" xl="3" lg="3" md="4">
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
                <v-card rounded="lg" border>
                  <v-list class="py-0" rounded="lg">
                    <v-list-subheader>Administrative Menu</v-list-subheader>
                    <NavItem :items="nav.administrative_navs" />
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col>
            <v-card rounded="lg" :loading="loader.loading" border>
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
import useNav from "~/store/nav";
import { useDomains, useLoader, usePolicies } from "~~/store";

const { $rest } = useNuxtApp();

const nav      = useNav();
const loader   = useLoader();
const domains  = useDomains();
const policies = usePolicies();

onBeforeMount(async()=> {
  loader.set("Fetching data...");
   
  const reqs = [
    $rest("admin/policy-authority/get-domains",  { method : "GET" }).then(({data})=>domains.hydrate(data)),
    $rest("admin/policy-authority/get-policies", { method : "GET" }).then(({data})=>policies.hydrate(data))
  ];

  await Promise.all(reqs);

  loader.set(false);
});
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
</style>