<template>
  <v-container>
    <v-sheet>
      <v-card-actions class="float-right">
        <v-btn variant="text" color="primary" disabled icon>
          <v-icon size="32">mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
      <h6 class="text-h5">Policy Management</h6>
      <h6 class="text-subtitle-2 text-medium-emphasis">Manage and configure access and security policies.</h6>

      <v-sheet rounded="lg" border>
        <v-tabs v-model="policy_tab" color="primary">
          <v-tab value="access">Access Policies</v-tab>
          <v-tab value="security">Security Policies</v-tab>
        </v-tabs>

        <v-divider />

        <v-card-text style="height : 450px; overflow-y : auto">
          <v-window v-model="policy_tab">
            <v-window-item value="access">
              <v-row dense>
                <v-col cols="12" xxl="3" xl="4" lg="4" md="6" v-for="policy in aps" :key="policy.name">
                  <v-sheet class="h-100" rounded="lg" max-height="450" border>
                    <v-card-title>
                      <v-icon :icon="policy.icon" size="24" color="primary"></v-icon>
                      {{policy.name}}
                    </v-card-title>
                    <v-divider />
                    <v-card-text>
                      <small class="text-subtitle-2">{{policy.desc}}</small>
                    </v-card-text>

                    <v-footer height="24" rounded="lg">
                      <v-spacer />

                    </v-footer>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item value="security">
              <v-row dense>
                <v-col cols="6" v-for="policy in sps" :key="policy.name">
                  <v-sheet max-height="450" border>
                    <v-card-title>
                      <v-icon :icon="policy.icon" size="24" color="primary"></v-icon>
                      {{policy.name}}
                    </v-card-title>
                    <v-divider />
                    <v-card-text class="pb-2">
                      <small class="text-subtitle-2">{{policy.desc}}</small>

                      <v-divider />
                    </v-card-text>

                    <v-list class="py-0">
                      <v-list-subheader>Sub Policies</v-list-subheader>

                      <v-expansion-panels variant="accordion">
                        <v-expansion-panel selected-class="text-blue-darken-4" v-for="sub_policy in policy.sub_policies"
                          :key="sub_policy.name" :title="sub_policy.name" :text="sub_policy.desc" />
                      </v-expansion-panels>
                    </v-list>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import {usePolicies} from '~~/store';

const policies = usePolicies();

definePageMeta({
  layout : "admin"
});

//States
const create_ap_dialog = ref(false);
const create_sp_dialog = ref(false);

const policy_tab = ref("access");

const aps = computed(()=> policies.access_policies);
const sps = computed(()=> policies.security_policies);
</script>

<style scoped>
::v-deep(.v-expansion-panel .v-expansion-panel-title) {
  padding-inline: 16px;
}
</style>