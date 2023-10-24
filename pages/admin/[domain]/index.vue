<template>
  <v-card class="pa-4" rounded="lg" border>
    <v-list-item v-if="$vuetify.display.mobile" class="text-capitalize" :title="domain.name"
      :subtitle="`Status: ${domain.active ? '' : 'in'}active`">
      <template v-slot:prepend>
        <img class="mr-4" :src="domain_logo" height="64" />
      </template>

      <template v-slot:append>
        <v-switch :model-value="domain.active" inset />
      </template>
    </v-list-item>

    <v-expansion-panels class="my-4" v-model="acm_accordions" variant="popout" mandatory>
      <v-expansion-panel title="ACM Core Metrics">
        <v-expansion-panel-text class="py-4">

        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel title="Frontend Registry">
        <v-expansion-panel-text>
          <div class="d-block text-center" v-if="loading_frontend_services">
            <v-progress-circular indeterminate />
            <h6 class="text-caption mt-4">Fetching Active Services...</h6>
          </div>

          <v-row v-if="frontend_services.length" dense>
            <v-col v-for="service, i in frontend_services" :key="service.name" cols="12">
              <v-card rounded="lg" border>
                <div style="position : absolute; top : 0px; right : 16px;">
                  <v-avatar size="96">
                    <v-img :src="`/${service.framework.toLowerCase()}-logo.svg`" alt="framework-logo" height="82" />
                  </v-avatar>
                </div>

                <v-card-item>
                  <v-card-title>{{ service.name }}</v-card-title>

                  <v-card-subtitle>
                    <v-icon class="me-1 pb-1" icon="mdi-record" size="18" color="success" />
                    Online
                  </v-card-subtitle>
                </v-card-item>

                <div class="d-flex py-3 pr-4 justify-space-between">
                  <v-list-item density="compact">
                    <v-list-item-subtitle>
                      <v-icon>mdi-network-outline</v-icon>
                      Port: {{ service.port }}
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-item-group class="float-right">
                    <v-btn class="text-body-1" variant="text" color="primary">View in idkDocs</v-btn>
                    <v-btn :icon="selected_frontend_service === i ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                      @click="selected_frontend_service = selected_frontend_service === i ? -1 : i" variant="text" />
                  </v-item-group>
                </div>

                <v-expand-transition>
                  <div v-if="selected_frontend_service === i">
                    <v-divider />

                    <v-card>
                      <v-toolbar>
                        <v-toolbar-title>
                          <v-list-item class="px-0" title="Available Pages" :subtitle="selected_frontend_category.name" />
                        </v-toolbar-title>

                        <v-spacer />

                        <v-menu>
                          <template v-slot:activator="{props}">
                            <v-btn v-bind="props" icon>
                              <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                          </template>

                          <v-list v-model="selected_frontend_category">
                            <v-list-item v-for="category in page_categories" :key="category.name" :title="category.name"
                              @click="selected_frontend_category = category" />
                          </v-list>
                        </v-menu>
                      </v-toolbar>
                      <v-divider />

                      <v-card-text>
                        <v-row dense>
                          <v-col v-for="page, i in active_service_pages" :key="i" cols="12" xxl="4" xl="6" lg="6">
                            <v-lazy class="h-100">
                              <v-card class="h-100 px-4" rounded="lg" border>
                                <v-card-text>
                                  <v-list-item class="px-0 pb-0 mb-0">
                                    <v-list-item-subtitle class="text-caption">Path: {{ page.path
                                      }}</v-list-item-subtitle>
                                    <v-list-item-title class="text-capitalize">{{ page.page_name }}</v-list-item-title>
                                  </v-list-item>
                                </v-card-text>

                                <v-card-text class="pt-0 d-flex">
                                  <div class="d-flex-grow-1">
                                    <h6 class="text-caption">Page CFG:</h6>
                                    <h6>Is Public: {{ Boolean(page.meta.public) }}</h6>
                                    <h6>Resources: {{ page.resources.length }}</h6>
                                  </div>
                                  <v-spacer />
                                  <div style="align-self : self-end">
                                    <v-btn color="primary" variant="text">View</v-btn>
                                  </div>
                                </v-card-text>
                              </v-card>
                            </v-lazy>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel title="Backend Registry">
        <v-expansion-panel-text>
          <div class="d-block text-center" v-if="loading_services">
            <v-progress-circular indeterminate />
            <h6 class="text-caption mt-4">Fetching Active Services...</h6>
          </div>

          <v-row v-if="backend_services.length" dense>
            <v-col v-for="service, i in backend_services" :key="service.name" cols="12">
              <v-card rounded="lg" border>
                <div style="position : absolute; top : 0px; right : 16px;">
                  <v-avatar class="mr-0" size="96">
                    <v-img src="/openapi.svg" height="92" />
                  </v-avatar>
                  v{{ service.openapi }}
                </div>
                <v-card-item>
                  <v-card-title>{{ service.name }}</v-card-title>

                  <v-card-subtitle>
                    <v-icon icon="mdi-record" size="18" color="success" class="me-1 pb-1"></v-icon>
                    Online
                  </v-card-subtitle>
                </v-card-item>

                <div class="d-flex py-3 pr-4 justify-space-between">
                  <v-list-item density="compact">
                    <v-list-item-subtitle>
                      <v-icon>mdi-network-outline</v-icon>
                      Port: {{ service.port }}
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-item-group class="float-right">
                    <NuxtLink class="text-body-1" :to="{name : 'admin-domain-service', params : {domain : domain.name, service : service.name}}" target="_blank">
                      <v-btn color="primary">View</v-btn>
                    </NuxtLink>
                  </v-item-group>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <div class="d-block" v-else>
            <v-card-title class="d-block text-center text-h6">No Registered Service</v-card-title>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script lang="ts" setup>
import { useDomains } from "~~/store";

const cfg = useRuntimeConfig();

const { CDN_ENDPOINT } = cfg.public;

const route = useRoute();

definePageMeta({
  layout: "domainmgr",
  middleware: "domain-params"
});

const { $rest } = useNuxtApp();

onBeforeMount(async () => {
  loading_services.value = true;
  loading_frontend_services.value = true;

  backend_services.value = [];
  frontend_services.value = [];

  const { data } = await $rest(`registry/get-services`, {
    method: "GET",
    query : {
      domain : domain.value.name
    }
  });
  loading_services.value = false;
  loading_frontend_services.value = false;
  Object.values(data || {}).forEach((v : any) => {
    (v.type === "frontend" ? frontend_services : backend_services).value.push({
      loaded: false,
      expand: false,
      ...v,
    });
  });
  
  $fetch(`${CDN_ENDPOINT}/public/domain-logo/${domain.value.name}`, {method : "HEAD"})
  .then(()=> {
    domain_logo.value = `${CDN_ENDPOINT}/public/domain-logo/${domain.value.name}`;
  });
});

const domain_logo = ref("");
const domains = useDomains();
const domain = computed(() => domains.domains[String(route.params.domain)]);

const acm_accordions = ref(1);


/* Backend Services */
const loading_services = ref(true);
const backend_services = ref([] as any);
const selected_backend_service = ref(-1);




/* Frontend Services */
const loading_frontend_services = ref(false);
const frontend_services = ref([] as any);
const selected_frontend_service = ref(-1);

const page_categories = ref([
  {name : "By Route", ref : "route"}
]);
const selected_frontend_category = ref({name : "By Route", ref : "route"});
const selected_frontend_subcategory = ref("" as any);

const active_service_pages = computed(()=> {
  let results:any = { route : {}, stags : {} };

  if(selected_frontend_service.value === -1)return results;
  const active_service = frontend_services.value[selected_frontend_service.value];

  active_service.pages.forEach((page : any)=>{
    page.page_name = page.name.replaceAll("-", " ");
    results.route[`${page.name}`] = page;
    if(page.meta.stag)results.stags[`${page.meta.stag}`] = page;
  });

  return results[selected_frontend_category.value.ref];
});


/* Create module for each router of the ff. frameworks. */
// Only vue is supported for now.
const allowed_frameworks = ref(["vue", "angular", "react", "ember"]);

const method_colors = ref({
  "GET"    : "success",
  "POST"   : "warning",
  "DELETE" : "error"
} as any)
</script>
