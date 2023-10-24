<template>
  <v-container>
    <v-row :class="`${$vuetify.display.mobile ? 'text-center' : ''}`" justify="center" dense>
      <v-col cols="12">
        <h6 class="text-h5" v-if="!$vuetify.display.mobile">{{greet_state}}, {{auth.name}}</h6>
        <h6 class="text-h5" v-if="$vuetify.display.mobile">{{greet_state}}</h6>
        <h6 class="text-h5" v-if="$vuetify.display.mobile">{{auth.name}}</h6>
        <h6 class="text-subtitle-2 text-medium-emphasis">Manage and evaluate your personal and security information.
        </h6>
        <v-divider class="mt-4 mb-2"/>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" v-if="!loading_profile_completion">
        <v-layout :class="$vuetify.display.mobile ? 'd-block text-center' : 'd-flex'">
          <v-avatar class="d-flex-grow-0" :size="$vuetify.display.mobile ? 140 : 180">
            <v-img class="h-100" :src="`/${account_state.icon}.svg`" />
          </v-avatar>

          <div :class="`${$vuetify.display.mobile ? 'd-block text-center' : 'mt-5 '}`">
            <h6 class="text-h6" v-if="account_state.is_complete">Profile Complete</h6>
            <h6 class="text-h6" v-else>Complete your Profile</h6>
            <h6 class="text-caption">Account Secured</h6>
            <v-sheet class="mx-auto pa-1" max-width="220">
              <v-progress-linear :color="account_state.color" :model-value="account_state.score" height="6" rounded="lg"/>
            </v-sheet>
            <small :class="`text-${account_state.color}`">Your profile completion is at {{account_state.score}}</small>
            <br />

            <small class="text-medium-emphasis" v-if="!account_state.is_complete">
              <v-icon icon="mdi-alert-circle-outline" color="warning" size="16" />
              2 out 4 Recommended Fields have been completed
            </small>

            <small>
              <v-icon icon="mdi-check" color="success" size="16" />
              Secure Credentials
            </small>
            <br />
            <small>
              <v-icon icon="mdi-check" color="success" size="16" />
              Active 2FA Policy
            </small>
          </div>
        </v-layout>
      </v-col>

      <v-col cols="12" v-else>
        <v-sheet class="py-4 px-4 fill-height" rounded="lg">
          <v-layout :class="$vuetify.display.mobile ? 'd-block text-center' : 'd-flex'">
            <v-progress-circular class="d-flex-grow-0" :size="$vuetify.display.mobile ? 90 : 120" width="10"
              indeterminate />

            <div :class="$vuetify.display.mobile ? '' : 'mt-5 ml-6'">
              <h5 class="text-h5">Fetching Account Information</h5>
              <h6 class="text-subtitle-1">Calculating Profile Completion</h6>
            </div>
          </v-layout>
        </v-sheet>
      </v-col>
      <v-col cols="12" xl="6" lg="6">
        <v-card class="pa-3" color="primary" rounded="lg">
          <div class="d-flex flex-no-wrap justify-space-between py-4 pl-4">
            <div>
              <h6 class="text-h6">
                Account Security
              </h6>

              <h6 class="text-subtitle-2">Settings and recommendations to keep your account secured.</h6>

              <v-btn class="mt-4" size="small" variant="outlined" disabled dark>Review</v-btn>
            </div>

            <v-avatar class="px-4 pb-4" size="128" rounded="0">
              <v-img class="ma-2" src="/lock-open.svg" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" xl="6" lg="6">
        <v-card class="pa-3" color="primary" rounded="lg">
          <div class="d-flex flex-no-wrap justify-space-between py-4 pl-4">
            <div>
              <h6 class="text-h6">
                Access Privileges
              </h6>

              <h6 class="text-subtitle-2">Review and control your access privileges.</h6>

              <v-btn class="mt-4" size="small" variant="outlined" disabled dark>Review</v-btn>
            </div>

            <v-avatar class="px-4 pb-4" size="128" rounded="0">
              <v-img class="ma-2" src="/access-keys.svg" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import useAuth from "~/store/auth";

const { $rest } = useNuxtApp();
const auth = useAuth();

definePageMeta({layout : "constrained"});

onBeforeMount(async() => {
  load_profile_completion();
});

async function load_profile_completion(){
  loading_profile_completion.value = true;
  const { data } = await $rest("auth/profile-completion");
  loading_profile_completion.value = false;
  profile_completion_data.value = data;
}

const greet_state = computed(()=>{
  const time = new Date().getHours();

  if(time >= 18)return "Good Evening";
  if(time >= 12)return "Good Afternoon";
  return "Good Morning";
});

const loading_profile_completion = ref(true);
const profile_completion_data = ref(null as any);

const account_state = computed(()=>{
  if(!loading_profile_completion)return {};

  const { score, details } = profile_completion_data.value;
  let icon  = "shield-error";
  let color = "error";

  if(score > 60){
    icon  = "shield-warn";
    color = "warning";
  }
  if(score >= 100){
    icon  = "shield-ok";
    color = "success";
  }
  

  return {
    icon,
    is_complete : score >= 100,
    score : `${score}%`,
    color,
    details
  }
})
</script>