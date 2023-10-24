<template>
  <v-container>
    <v-sheet>
      <v-card-actions class="float-right">
        <v-btn @click="add_domain = true" variant="text" color="primary" icon>
          <v-icon size="32">mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
      <h6 class="text-h5">Domain Management</h6>
      <h6 class="text-subtitle-2 text-medium-emphasis">Manage and configure domain spaces and their respective
        policies.</h6>

      <v-sheet rounded="lg" border>
        <v-tabs v-model="domain_tab" color="primary">
          <v-tab value="active">Active</v-tab>
          <v-tab value="inactive">Inactive</v-tab>
        </v-tabs>
        <v-divider />
        <v-card-text style="height : 450px; overflow-y : auto">
          <v-window class="pa-2" v-model="domain_tab">
            <v-window-item value="active">
              <v-row dense>
                <v-col v-for="domain in domain_list['active']" :key="domain.name" cols="12" xl="6" lg="6">
                  <uac-domain-card :value="domain" />
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item value="inactive">
              <v-row dense>
                <v-col v-for="domain in domain_list['inactive']" :key="domain.name" cols="12" xl="6" lg="6">
                  <uac-domain-card :value="domain" />
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-sheet>
    </v-sheet>

    <commons-dialog v-model="add_domain" @update:modelValue="clear_domain_form" width="420" hide-toolbar>
      <v-card class="px-2 py-4" elevation="2" rounded="lg" v-if="add_domain_result">
        <v-card-title class="text-center pb-0">Domain Created</v-card-title>
        <v-card-subtitle class="text-center text-subtitle-2 px-12" style="white-space : normal">A Public-Private Keypair
          has been generated for your domain.</v-card-subtitle>

        <v-card-text class="text-center mt-6 mb-0">
          <v-btn class="text-caption mr-2" variant="outlined" color="primary" @click="download_pem">Download
            .PEM</v-btn>
          <v-btn class="text-caption" variant="outlined" color="primary" @click="download_pem">Download .DER</v-btn>
        </v-card-text>

        <v-card-text class="text-center text-subtitle-2 px-12 pt-0" style="white-space : normal">
          You can always download a domain's public key in the domain management page.
          <v-divider />
        </v-card-text>

        <v-card-subtitle class="text-center font-weight-bold">Integration Guide</v-card-subtitle>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel rounded="lg">
              <v-expansion-panel-title expand-icon="mdi-eye" collapse-icon="mdi-eye-off">
                <v-list-item class="px-0" lines="two" title="UAC API Integration">
                  <v-list-item-subtitle>
                    Nelson Ylanan Catajoy<br />
                    <small class="font-weight-bold">API Integrations Specialist</small>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                A quick walkthrough on integrating API services with the UAC Authorization Service
                <br />
                <br />

                <v-btn class="float-right" size="small" variant="outlined" color="primary">View as PDF</v-btn>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>

      <v-card class="px-2 py-4" elevation="2" rounded="lg" v-else>
        <v-card-title class="text-center pb-0">Create Domain</v-card-title>
        <v-card-subtitle class="text-center text-subtitle-2 px-12" style="white-space : normal">Domains are logical
          groupings of services where authorization policies are enforced</v-card-subtitle>
        <v-form v-model="valid_domain_form" @submit.prevent="create_domain">
          <v-card-text>
            <v-text-field v-model="domain_form.name" label="Name" />

            <v-file-input v-model="domain_form.logo" label="Logo (Optional)" prepend-icon=""
              prepend-inner-icon="mdi-image" show-size />

            <v-btn color="primary" :disabled="!valid_domain_form" type="submit" block>Submit</v-btn>
          </v-card-text>
        </v-form>
      </v-card>
    </commons-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import {useDomains} from '~~/store';

const { $rest } = useNuxtApp();

definePageMeta({
  layout : "admin"
});

const domains = useDomains();
const add_domain = ref(false);
const domain_form = ref({
  name : "Erwin's Lending Company",
  logo : []
});
const add_domain_result = ref(false);
const domain_public_key = ref("");
const valid_domain_form = ref(false);
async function create_domain(){
  let form = new FormData();

  form.append("domain-logo", domain_form.value.logo[0]);
  form.append("domain-name", domain_form.value.name);

  const { data } = await $rest("/admin/object-authority/create-domain", {
    method : "POST",
    body : form
  });

  const domain_res = await $rest("admin/policy-authority/get-domains",  { method : "GET" });
  domains.hydrate(domain_res.data);

  domain_public_key.value = data;
  add_domain_result.value = true;
}
function clear_domain_form(v : boolean){
  if(!v){
    domain_form.value = {
      name : "",
      logo : []
    };
    add_domain_result.value = false;
    domain_public_key.value = "";
    valid_domain_form.value = false;
  }
}
function download_pem(){
  const link = document.createElement("a");
  link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(domain_public_key.value));
  link.download = `${domain_form.value.name}-public-key.pem`;
  link.target = "_blank";
  link.click();
}

const loading = ref(true);
onBeforeMount(()=> {
  loading.value = true;
});

const domain_list = computed(():{[key : string] : Domain[]}=> {
  let temp = { active : [] as Domain[], inactive : [] as Domain[] };
  Object.values(domains.domains).forEach((v)=> (v.active ? temp.active : temp.inactive).push(v));
  return temp;
});

const domain_tab = ref("active");
</script>