<template>
  <v-app id="inspire">
    <layout-std-appbar appbar_title="Developer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             Hub" />
    <v-main>
      <v-container v-if="service.get_service">
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
                <v-btn height="54" variant="plain" rounded="lg"
                  :to="{name : 'admin-domain', params : { domain : $route.params.domain }}">
                  <v-list-item class="px-0 text-left" title="Home" subtitle="Back to Domain">
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
                    <NavItem :items="nav.dev_navs" />
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col>
            <v-card class="rounded-t-lg" border>
              <v-layout class="d-flex px-6 pt-6">
                <img :src="domain_logo" height="112" />

                <v-card-item class="pt-0">
                  <v-breadcrumbs class="px-0 pt-0 pb-0 text-caption" :items="[String(route.params.domain), String(route.params.service)]" />
                  <v-card-title class="pl-1">{{ $route.params.service }}</v-card-title>
                  <v-card-subtitle>
                    <v-icon icon="mdi-record" size="18" color="success" class="me-1 pb-1" />
                    Online
                  </v-card-subtitle>

                  <v-list-item class="px-0" density="compact">
                    <v-list-item-subtitle>
                      <v-icon>mdi-network-outline</v-icon>
                      Port: {{ service.port }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-card-item>

                <v-spacer />

                <div class="d-block text-align-left">
                  <v-btn class="text-caption mb-2" color="primary" size="small" block>
                    <template v-slot:prepend>
                      <v-icon>mdi-eye</v-icon>
                    </template>
                    Watch Service
                  </v-btn>
                  <v-btn class="text-caption font-weight-medium mb-2" size="small" block>
                    <template v-slot:prepend>
                      <img src="/openapi.svg" height="18" dark />
                    </template>
                    OAS Document
                  </v-btn>
                  <v-btn class="text-caption font-weight-medium" size="small" block>
                    <template v-slot:prepend>
                      <img src="/postman.svg" height="18" dark />
                    </template>
                    View in Postman
                  </v-btn>
                </div>
              </v-layout>
              <v-divider />
              <v-tabs v-if="tabs.length" slider-color="primary" show-arrows>
                <v-tab class="text-subtitle-1" v-for="tab in tabs" :key="tab.name" :to="{name : tab.path}">{{ tab.name }}</v-tab>
              </v-tabs>
            </v-card>

            <v-card class="rounded-b-lg">
              <v-card-text>
                <slot />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <layout-std-footer />
  </v-app>
</template>

<script lang="ts" setup>
import { useDomains, useService } from "~/store/index";
import useAuth from "~/store/auth";
import useNav from "~/store/nav";


const { $rest } = useNuxtApp();

const nav     = useNav();
const auth    = useAuth();
const route   = useRoute();
const domains = useDomains();
const cfg     = useRuntimeConfig();
const service = useService();

const { CDN_ENDPOINT } = cfg.public;

const domain  = computed(()=> domains.active_domain);

const domain_logo = ref("");
const loaded = ref(false);
//Dynamic Tabs
const tabs = computed(()=> {
  const items = route.name?.toString().split("-")!;
  
  if(items.length === 4 && items[3] === "resources")return nav.resource_navs;
  if(items.length === 4 && items[3] === "schemas")return nav.schema_navs;

  return nav.overview_navs;
});

onBeforeMount(async()=> {
  loaded.value = false;
  const domain_res = await $rest("admin/policy-authority/get-domains",  { method : "GET" });
  domains.hydrate(domain_res.data);
  
  domains.set_active_domain(route.params.domain as string);

  const service_res = await $rest("registry/get-service-by-name", { method : "GET", query : {service_name : route.params.service, domain_id : domain.value._id}});
  console.log(service_res)
  service.hydrate(service_res.data);

  loaded.value = true;
  
  //A prelim check is made after resolution of active domain.

  $fetch(`${CDN_ENDPOINT}/public/domain-logo/${domain.value.name}`, {method : "HEAD"})
  .then(()=> {
    domain_logo.value = `${CDN_ENDPOINT}/public/domain-logo/${domain.value.name}`;
  });
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

@media (min-width: 900px) {
  ::v-deep(.v-container) {
    max-width: 1200px !important;
  }
}
</style>