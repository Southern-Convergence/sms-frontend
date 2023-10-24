<template>
  <v-card class="pa-2" elevation="2" rounded="lg" border>
    <v-card-title>
      <v-list-item class="px-0 mx-0" :title="value.name" :subtitle="value.type">
        <template v-slot:append>
          <img :src="domain_logo" height="72" />
        </template>
      </v-list-item>
    </v-card-title>

    <v-divider />
    <v-card-text>

      <!--Manage Users-->
      <label class="text-medium-emphasis">Users</label>
      <v-sheet class="px-2" rounded="lg">
        <v-chip-group>
          <v-tooltip location="bottom" v-for="[user_group, user_count] in Object.entries(value.user_groups)"
            :key="user_group">
            <template v-slot:activator="{props}">
              <v-chip size="small" variant="outlined" v-bind="props">
                <v-icon class="pr-1 pa-1" color="primary" :icon="user_group_icons[user_group]" />
                {{ user_count }}
              </v-chip>
            </template>
            {{ user_group }}s
          </v-tooltip>

          <v-spacer />

          <v-btn :to="{name : 'admin-domain-user-management', params : { domain : value.name } }" size="small"
            variant="outlined" color="primary" style="place-self : center">
            Manage
          </v-btn>
        </v-chip-group>
      </v-sheet>
      <!--Manage Resources-->
      <label class="text-medium-emphasis">Resources</label>
      <v-sheet class="px-2" rounded="lg">
        <v-chip-group>
          <v-chip size="small" variant="outlined">
            <v-icon class="pr-1" color="primary" icon="mdi-application" />
            {{ value.resources.filter((v)=> v.type === "subdomain").length }}
          </v-chip>
          <v-chip size="small" variant="outlined">
            <v-icon class="pr-1" color="primary" icon="mdi-cube" />
            {{ value.resources.filter((v)=> v.type === "endpoint").length }}
          </v-chip>
          <v-chip size="small" variant="outlined">
            <v-icon class="pr-1" color="primary" icon="mdi-file" />
            {{ value.resources.filter((v)=> v.type === "file").length }}
          </v-chip>

          <v-spacer />

          <v-btn :to="{name : 'admin-domain-resource-management', params : { domain : value.name } }" size="small"
            variant="outlined" color="primary" style="place-self : center">
            Manage
          </v-btn>
        </v-chip-group>
      </v-sheet>
    </v-card-text>

    <v-footer>
      <v-spacer />
      <nuxt-link :to="{ name : 'admin-domain', params : { domain : value.name }, state : { domain : value.name } }">
        <label class="text-blue-darken-4 text-body-2" style="cursor : pointer">Manage Domain</label>
      </nuxt-link>
    </v-footer>
  </v-card>
</template>

<script lang="ts" setup>
const cfg = useRuntimeConfig();

const { CDN_ENDPOINT } = cfg.public;

const { value } = defineProps<{value : Domain}>();

const domain_logo = ref("");
$fetch(`${CDN_ENDPOINT}/public/domain-logo/${value.name}`, {method : "HEAD"})
.then(()=> {
  domain_logo.value = `${CDN_ENDPOINT}/public/domain-logo/${value.name}`;
});

const user_group_icons = {
  "Hypervisor"   : "mdi-account-tie-hat",
  "Supervisor"   : "mdi-account-tie",
  "Regular User" : "mdi-account"
} as any;
</script>