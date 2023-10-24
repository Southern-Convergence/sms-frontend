<template>
  <div style="opacity : 45%">
    <v-sheet class="text-center pa-4 rounded-t-lg" color="primary" rounded="sm">
      <img src="/lock-open.svg" height="96" />

      <h5 class="text-h5 text-center">Security Policies</h5>
      <h5 class="text-subtitle-2 text-center">Policies that define a domain's behavior regarding security.
      </h5>
    </v-sheet>
    <v-sheet class="rounded-b-lg" height="480" style="overflow-y : auto" border>
      <v-card-text>
        <v-container>
          <v-sheet class="pa-4" rounded="lg" border>
            <v-card-title>
              Actively Enforced Policies
            </v-card-title>

            <v-card-subtitle>Security Policies that are currently being enforced.</v-card-subtitle>

            <v-card-text>
              <v-row v-if="active_policies.length">
                <v-col cols="12" v-for=" policy in active_policies" :key="policy.name">
                  <v-sheet class="py-4" rounded="lg" border>
                    <v-list-item :value="policy.name" active-color="primary" rounded="sm">
                      <template v-slot:prepend>
                        <v-icon class="mr-2" :icon="policy.icon" size="32" />
                      </template>

                      <template v-slot:append>
                        <v-btn variant="text" icon @click="revoke_security_policy(policy._id)">
                          <v-icon icon="mdi-chevron-down" color="primary" size="32"></v-icon>
                        </v-btn>
                      </template>

                      <v-list-item-title v-text="policy.name"></v-list-item-title>
                      <v-list-item-subtitle style="word-break : break-word">{{policy.desc}}</v-list-item-subtitle>
                    </v-list-item>
                  </v-sheet>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col>
                  <v-sheet class="py-4" rounded="lg">
                    <v-list-item active-color="primary" rounded="sm">
                      <v-list-item-title>No Policies Enforced</v-list-item-title>
                      <v-list-item-subtitle></v-list-item-subtitle>
                    </v-list-item>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card-text>
          </v-sheet>

          <br />

          <v-sheet class="pa-4" rounded="lg" border>

            <v-card-title>
              Available Policies
            </v-card-title>

            <v-card-subtitle>Security Policies available for enforcement.</v-card-subtitle>

            <v-card-text>
              <v-row v-if="policies.length">
                <v-col cols="12" v-for="(policy, i) in policies" :key="policy.name">
                  <v-sheet class="py-4" rounded="lg" border>
                    <v-list-item :value="policy.name" active-color="primary" rounded="sm">
                      <template v-slot:prepend>
                        <v-icon class="mr-2" :icon="policy.icon" size="32" />
                      </template>

                      <template v-slot:append>
                        <v-btn variant="text" icon @click="enforce_security_policy(policy._id)">
                          <v-icon icon="mdi-plus" color="primary" size="32"></v-icon>
                        </v-btn>
                      </template>

                      <v-list-item-title v-text="policy.name"></v-list-item-title>
                      <v-list-item-subtitle>{{policy.desc}}</v-list-item-subtitle>
                    </v-list-item>
                  </v-sheet>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col>
                  <v-sheet class="py-4" rounded="lg">
                    <v-list-item active-color="primary" rounded="sm">

                      <v-list-item-title>No Policies Left</v-list-item-title>
                      <v-list-item-subtitle></v-list-item-subtitle>
                    </v-list-item>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card-text>
          </v-sheet>
        </v-container>
      </v-card-text>

      <!--Dialogs-->

    </v-sheet>
  </div>
</template>

<script lang="ts">
import { definePageMeta } from '~~/.nuxt/imports';
import {useDomains, usePolicies} from '~~/store';
definePageMeta({
  layout : "domainmgr",
  middleware : "domain-params"
});

export default {

  computed : {

    domains(){
      return useDomains().domains
    },
    domain(){
      return this.domains[String(this.$route.params.domain)];
    },

    active_policies(){
      return (this.domain || {}).security_policies || [];
    },

    policies(){
      const temp = this.active_policies.map((v)=> v.name);
      return usePolicies().security_policies.filter((v)=> !temp.includes(v.name));
    }
  },
  methods: {
    enforce_security_policy(security_id: string){

      const { $rest } = useNuxtApp();
      const payload = {
        domain_id: this.domain._id,
        security_id: security_id
      }

      $rest("admin/policy-authority/enforce-security-policy", {
        method: "POST",
        body: payload
      }).then(() => this.fetch_policies())

      
    },
    revoke_security_policy(security_id: string){
      const { $rest } = useNuxtApp();

      const payload = {
        domain_id: this.domain._id,
        security_id: security_id
      }

      $rest("admin/policy-authority/revoke-security-policy", {
        method: "POST",
        body: payload
      }).then(() => this.fetch_policies())
    },
    async fetch_policies(){
      const { $rest } = useNuxtApp();
      const { data, error } = await $rest("admin/policy-authority/get-domains", {
        method: "GET"
      });
      useDomains().hydrate(data);
    }
  }
}
</script>