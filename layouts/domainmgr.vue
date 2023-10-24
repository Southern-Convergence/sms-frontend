<template>
  <v-app>
    <!-- Strictly Used for Pages under [domain] but excluding pages from admin routes-->
    <layout-std-appbar class="constrained-boi" appbar_title="Admin" />

    <v-main>
      <v-container class="constrained-boi">
        <v-row v-if="ready && !domain_error" dense>
          <v-col class="hidden-md-and-up pb-1" cols="12">
            <v-sheet rounded="lg">
              <v-tabs color="primary" show-arrows grow>
                <v-tooltip v-for="n in nav.mgmt_navs" location="bottom" :key="n.name">
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
                <v-btn height="54" variant="plain" rounded="lg" @click="reset_active_domain" :to="{name : 'admin'}">
                  <v-list-item class="px-0 text-left" title="Domains">
                    <template v-slot:prepend>
                      <v-icon class="mr-2" icon="mdi-arrow-left" size="32" />
                    </template>
                  </v-list-item>
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-card rounded="lg" border>
                  <v-list-item class="text-capitalize pt-4">
                    <template v-slot:prepend>
                      <img :src="domain_logo" height="92" />
                    </template>

                    <template v-slot:append>
                      <v-switch :model-value="domain.active" inset />
                    </template>
                  </v-list-item>
                  <v-list-item class="pb-4" :title="domain.name"
                    :subtitle="`Status: ${domain.active ? '' : 'in'}active`">
                  </v-list-item>
                  <v-divider />

                  <v-list class="py-0" rounded="lg">
                    <v-list-subheader>Management Menu</v-list-subheader>
                    <NavItem :items="nav.mgmt_navs" />
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" xl="9" lg="9" md="8">
            <v-card rounded="lg" :loading="loader.loading">
              <slot />
            </v-card>
          </v-col>
        </v-row>

        <v-layout v-if="domain_error" d-flex>
          <v-spacer />

          <v-card class="pa-8">
            <v-card-title>{{ domain_name }} does not exist</v-card-title>
          </v-card>

          <v-spacer />
        </v-layout>
      </v-container>
    </v-main>

    <layout-std-footer class="constrained-boi" />
  </v-app>
</template>

<script lang="ts" setup>
import { useDomains, useLoader, usePolicies, useAPTs, useResources } from "~/store/index";
import useNav from "~/store/nav";

const { $rest } = useNuxtApp();

const domain_name  = useState("active_domain");
const domain_error = ref(false);

const nav       = useNav();
const loader    = useLoader();
const domains   = useDomains();
const policies  = usePolicies();
const apts      = useAPTs();
const resources = useResources();
const cfg = useRuntimeConfig();

const { CDN_ENDPOINT } = cfg.public;

const ready    = ref(false);
//// Used to conditionally mount layout content upon domain and policy hydration.
const domain = computed(()=> domains.active_domain);


onBeforeMount(async()=> {
  loader.set("Fetching data...");
  const domain_res = await $rest("admin/policy-authority/get-domains",  { method : "GET" });
  domains.hydrate(domain_res.data);
  
  /* @ts-ignore */
  if(!domain.value)domains.set_active_domain(domain_name.value);

  //A prelim check is made after resolution of active domain.
  domain_error.value = !domain.value;

  if(!domain_error.value){
    const query = {domain_id : domain.value._id};
    const reqs = [
      $rest("admin/policy-authority/get-policies",  { method : "GET" }),
      $rest("admin/policy-authority/get-apts",      { method : "GET", query }),
      $rest("admin/object-authority/get-resources", { method : "GET", query }),
      $rest("admin/object-authority/get-domain-public-key", { method : "GET", query }),
    ];

    const [p, a, r, keys] = await Promise.all(reqs).then((v)=> v.map((d)=> d.data));
    policies.hydrate(p);
    apts.hydrate(a, domain.value.access_policies);
    resources.hydrate(r);

    ready.value = true;
  }

  $fetch(`${CDN_ENDPOINT}/public/domain-logo/${domain.value.name}`, {method : "HEAD"})
  .then(()=> {
    domain_logo.value = `${CDN_ENDPOINT}/public/domain-logo/${domain.value.name}`;
  });
  loader.set(false);
});

const domain_logo = ref("");


function reset_active_domain(){
  domains.active_domain = null;
}

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