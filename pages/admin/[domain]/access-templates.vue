<template>
  <commons-item-container title="AP Templates"
    subtitle="Manage Access Descriptors that are available based from the currently enforced policies" :items="templates"
    img="/notepad.svg" extended>
    <template v-slot:extension>
      <v-layout d-flex>
        <v-tabs v-model="selected_policy" color="primary">
          <v-tab class="text-subtitle-1" v-for="ap in active_policies" :key="ap._id" variant="flat">{{ ap.name }}</v-tab>
        </v-tabs>

        <v-spacer />

        <v-btn icon="mdi-plus" @click="create_apt_dialog = true" />
      </v-layout>
    </template>

    <template v-slot:item="{value}">
      <v-card class="pt-2" rounded="lg" border>
        <v-list-item :title="value.name">
          <!-- <v-list-item-subtitle style="white-space : normal;">{{ value.desc }}</v-list-item-subtitle> -->
          <v-list-item-subtitle class="pt-2">Resources:{{ value.resources.length }}</v-list-item-subtitle>
        </v-list-item>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="select_apt(value)">Manage</v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <!--Role AP Only -->
    <commons-dialog v-model="manage_apt" @update:modelValue="reset_apt" width="480" title="Manage AP Template">
      <v-card class="px-4" v-if="active_apt" :loading="loading_apt">
        <v-card-text class="pt-2">
          <v-list-item class="pb-0 px-0 pt-0" :title="active_apt.name">
            <v-list-item-subtitle>Resources:{{ active_apt.resources.length }}</v-list-item-subtitle>

            <template v-slot:append>
              <v-tabs v-model="apt_window" color="primary" slider-size="4" stacked>
                <v-tab class="text-caption px-2" height="64" variant="text" value="resource-grants">
                  <v-icon icon="mdi-cube-outline" />
                  Resource Grants
                </v-tab>
                <v-tab class="text-caption px-2" height="64" variant="text" v-if="active_apt.name !== 'Ultravisor'"
                  value="manage">
                  <v-icon icon="mdi-account-wrench-outline" />
                  Manage
                </v-tab>
              </v-tabs>
            </template>
          </v-list-item>
          <v-divider />
        </v-card-text>

        <v-card-text class="pt-0">
          <v-window v-model="apt_window">
            <v-window-item value="resource-grants">
              <v-alert type="info" border="start" variant="tonal" color="grey-darken-2">
                <v-alert-title class="text-subtitle-1">About Resource Grants</v-alert-title>
                <span>
                  <u>Resource Grants</u> defines the accessible objects granted to an AP template.
                </span>

                <template v-slot:append>
                  <v-btn class="text-caption px-2" @click="resource_dialog = true" variant="text" color="primary"
                    prepend-icon="mdi-plus" stacked>Add Resource</v-btn>
                </template>
              </v-alert>


              <v-list style="max-height: 260px; overflow-y : auto" v-if="apt_details">
                <v-list-item v-for="resource in apt_details.resources" :title="resource.name" rounded="lg" lines="two">
                  <v-list-item-subtitle v-if="resource.type === 'endpoint'">{{ resource.ref }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="resource.type === 'page'">{{ resource.path }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="resource.type === 'subdomain'">{{ resource.desc }}</v-list-item-subtitle>
                  <template v-slot:prepend>
                    <v-icon class="mr-2" :icon="icon_types[resource.type]"></v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </v-window-item>

            <v-window-item value="manage">
              <v-list class="pt-0" style="max-height: 260px; overflow-y : auto">
                <v-list-subheader>Actions</v-list-subheader>
                <v-list-item title="Deactivate Role" subtitle="Temporarily disable access to users of this role"
                  @click="deactivate_apt" value="deactivate" />
                <v-list-item title="Delete Role" subtitle="Completely delete role, unlinks all associated users"
                  @click="delete_apt" value="delete" />
              </v-list>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </commons-dialog>

    <commons-dialog v-model="create_apt_dialog" width="400"
      :title="`Create ${(selected_policy_details || {}).name} Template`">
      <commons-simple-form :hide-toolbar="true" req="admin/policy-authority/create-apt" @success="fetch_data"
        :misc_data="{domain_id : domain._id}">
        <v-select v-model="create_apt_form.basis" :items="[selected_policy_details]" label="Basis" name="basis"
          item-value="_id" readonly>
          <template v-slot:selection="{item}">
            <v-list-item class="px-0" :title="item.raw.name" :subtitle="item.raw.desc">
              <template v-slot:prepend>
                <v-avatar class="mr-0" variant="text" size="42">
                  <v-icon class="mr-2" size="32" :icon="item.raw.icon" color="primary" />
                </v-avatar>
              </template>
            </v-list-item>
          </template>
        </v-select>

        <v-row dense>
          <v-col cols="12">
            <v-text-field label="Name" name="name" :rules="[$validator.required]" hide-details />
          </v-col>
          <v-col cols="12">
            <v-textarea label="Description (Optional)" rows="2" name="desc" hide-details />
          </v-col>
        </v-row>
      </commons-simple-form>
    </commons-dialog>
    
    <commons-dialog v-model="resource_dialog" width="520" hide-toolbar>
      <uac-resource-select v-model="selected_resources" @set="set_resources" :disable_actions="disable_resource_setting"/>
    </commons-dialog>
  </commons-item-container>
</template>

<script lang="ts" setup>
import swal from 'sweetalert';
import { definePageMeta } from '~~/.nuxt/imports';
import {useDomains, useLoader, usePolicies, useResources} from "~~/store";
import { diff  } from "deep-object-diff";

const { $rest, $toPOJO } = useNuxtApp();

const route     = useRoute();
const loader    = useLoader();
const resource  = useResources();

definePageMeta({
  layout : "domainmgr",
  middleware : "domain-params"
});

onBeforeMount(fetch_data);

const domain = computed(()=> useDomains().domains[String(route.params.domain)]);

/* Template Management */
const raw_templates = ref([] as any[]);

const active_policies = computed(()=> {
  if(!domain.value)return [];
  return domain.value.access_policies;
});
const selected_policy = ref(0);
const selected_policy_details = computed(()=> active_policies.value[selected_policy.value]);

const partitioned_templates = computed(()=> {
  const partitions = Object.fromEntries(active_policies.value.map((v)=> [v._id, {...v, ap_templates : [] as any[]}]));
  
  raw_templates.value.forEach((v)=>{
    if(partitions[v.basis._id])partitions[v.basis._id].ap_templates.push(v);
  });

  return partitions;
});
const templates = computed(()=> {
  if(!selected_policy_details.value)return [];
  return partitioned_templates.value[selected_policy_details.value._id].ap_templates;
});

/* APT Management */
const create_apt_dialog = ref(false);
const create_apt_form   = ref({
  basis     : selected_policy_details.value,
  name      : "",
  resources : []
});
const manage_apt        = ref(false);
const active_apt        = ref(null as any);
const apt_details       = ref(null as any);
const apt_window        = ref("resource-grants");
const loading_apt       = ref(false);

function select_apt(apt : any){
  manage_apt.value = true;
  active_apt.value = apt;
  selected_resources.value = apt.resources;
  fetch_apt_details(apt);
}
function create_apt(){

}
function reset_apt(){
  active_apt.value  = null;
  apt_details.value = null;
  apt_window.value  = "resource-grants";
}
function deactivate_apt(){

}
function delete_apt(){
  swal({
    title      : "Delete APT?",
    text       : "Are you sure you want to delete this APT?",
    dangerMode : true,
    /* @ts-ignore abnormal man ni si swal oi. */
    buttons    : true
  })
  .then(async(v)=> {

    if(v){
      const { data, error } = await $rest("admin/policy-authority/delete-apt", {
        method : "DELETE",
        body : {
          apt_id : active_apt.value._id
        }
      });
      fetch_data();
      swal({
        icon : error ? "error" : "success",
        title : data || error,
        buttons : {
          ok :true
        }
      });
    }
  });
}

/* Resource Dialog */
const resource_dialog    = ref(false);
const selected_resources = ref([]);
const disable_resource_setting = computed(()=> {
  if(!resource_dialog.value)return true;
  //Diffs the current active apt's resources against the selected resources;
  const prev_resources = $toPOJO(active_apt.value.resources);
  const d = diff(prev_resources, $toPOJO(selected_resources.value));  
  return !Object.keys(d).length;
})

async function set_resources(){
  const { data, error } = await $rest("admin/policy-authority/set-resources", {
    method : "POST",
    body : {
      apt_id    : active_apt.value._id,
      resources : selected_resources.value
    }
  });

  swal({ icon : error ? "error" : "success", title : data || error, buttons : {ok :true}})
  fetch_data();
}

/* Request fns */
async function fetch_data(){
  const domain_id = domain.value._id;
  loader.set("Fetching APTs...")
  const reqs = [
    $rest("admin/policy-authority/get-apts", {method : "GET", query : {domain_id}})
  ];
  
  const [templates] = await Promise.all(reqs).then((v)=> v.map((d)=> d.data));
  raw_templates.value = templates;
  
  loader.set(false);
}

async function fetch_apt_details(apt : any){
  const { _id } = apt;
  loader.set("Fetching APT information...");
  loading_apt.value = true;
  const {data} = await $rest("admin/policy-authority/get-apt", {method : "GET", query : {id : _id}});
  loading_apt.value = false;

  apt_details.value = data;

  loader.set(false);
}
const icon_types = ref({
  subdomain : "mdi-group",
  page      : "mdi-note-outline",
  endpoint  : "mdi-api"
}) as any;
</script>