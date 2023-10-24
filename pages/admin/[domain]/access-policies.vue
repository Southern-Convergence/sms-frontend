<template>
  <commons-item-container title="Access Policies" :items="policies"
    subtitle="Policies that define a domain's access policy to resource requests" img="/access-keys.svg">
    <template v-slot:item="{ value }">
      <v-card class="h-100" flat border>
        <div class="d-flex flex-no-wrap justify-space-between" style="height : 110px">
          <div>
            <v-list-item :title="value.name">
            </v-list-item>


            <v-card-subtitle class="text-caption" style="white-space : normal">{{ value.desc }}</v-card-subtitle>


          </div>

          <v-avatar class="ma-3" size="72" rounded="0">
            <v-icon size="72" :icon="value.icon" :color="value.active ? 'primary' : ''" />
          </v-avatar>
        </div>

        <v-card-actions>
          <v-spacer />
          <v-btn class="ms-2" variant="outlined" size="small" @click="toggle_policy(value)" :color="value.active ? 'error' : ''">
            {{ value.active ? "Revoke" : "Enforce" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </commons-item-container>
</template>

<script lang="ts" setup>
import { definePageMeta } from '~~/.nuxt/imports';
import {useDomains, usePolicies, useLoader} from '~~/store';

const { $rest } = useNuxtApp();
const route     = useRoute();
const loader    = useLoader();

definePageMeta({
  layout : "domainmgr",
  middleware : "domain-params"
});

const domain = computed(()=> useDomains().domains[String(route.params.domain)]);

const active_policies = computed(()=> {
  if(!domain.value)return [];
  return domain.value.access_policies;
});

const policies = computed(()=> {
  const active = active_policies.value.map((v)=> v._id);
  return usePolicies().access_policies.map((v)=> ({...v, active: active.includes(v._id)}));
});

function toggle_policy({_id, active}){
  active ? remove_access_policy(_id) : add_access_policy(_id);
}

async function add_access_policy(policy_id: string){
  const payload = {
    domain_id: domain.value._id,
    policy_id: policy_id
  }
  
  loader.set("Enforcing Access Policy...");

  await $rest("admin/policy-authority/enforce-access-policy", {
    method: "POST",
    body: payload
  });
  fetch_policies();
  loader.set(false);
}

async function remove_access_policy(policy_id: string){
  const payload = {
    domain_id: domain.value._id,
    policy_id: policy_id
  }

  loader.set("Disabling Access Policy...");

  await $rest("admin/policy-authority/revoke-access-policy", {
    method: "POST",
    body: payload
  });
  fetch_policies();
  loader.set(false);
}

async function fetch_policies(){
  const { $rest } = useNuxtApp();
  const { data, error } = await $rest("admin/policy-authority/get-domains", {
    method: "GET"
  });
  useDomains().hydrate(data);
}
</script>