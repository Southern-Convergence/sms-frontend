<template>
  <v-row class="h-100" justify="center" align="center" dense>
    <v-col cols="12" style="text-align : -webkit-center">
      <!-- deped.svg-->
      <!-- <v-img src="/deped.svg" height="90" /> -->
      <v-sheet width="480">
        <v-list-item>
          <template v-slot:prepend>
            <v-avatar size="120">
              <v-img src="/logo.svg" />
            </v-avatar>
          </template>

          <h6 class="text-h3 text-medium-emphasis">STD-Frontend</h6>
        </v-list-item>
      </v-sheet>
      <v-card class="mt-4 pt-6 pb-4 px-6" id="login-card" :loading="verification_load" width="480">
        <v-card-title class="text-center" >Forgot Password</v-card-title>

        <v-fade-transition>
          <v-card-text v-show="verification_response.desc">
            <v-alert density="comfortable" :type="verification_response.success ? 'success' : 'error'" variant="outlined" border>
              {{ verification_response.desc }}
            </v-alert>
          </v-card-text>
        </v-fade-transition>

        <v-card-text class="pt-4" style="text-align : start">
          <v-form v-model="valid" @submit.prevent="recovery">
            <v-text-field v-model="form.email" label="E-mail Address" prepend-inner-icon="mdi-email" :rules="[$validator.email]"/>

            <v-btn color="primary" :disabled="!valid" type="submit" block>Recover</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <small>Identity Server provided by Southern Convergence</small>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
const { $rest } = useNuxtApp();



definePageMeta({
  layout : "plain",
  desc   : "A public page which allows a user to recover an account.",
  endpoints : [
    "auth/recovery",
  ],

  tags : ["account", "system", "sign-in"],
});

const valid = ref(false);
const verification_load = ref(false);
const verification_response = ref({
  success : false,
  desc : ""
});

const form = ref({
  email : "",
})

async function recovery(){
  verification_load.value = true;
  
  const { data, error } = await $rest("auth/recovery", {
    method : "POST",
    body : {
      email : form.value.email
    }
  });
  verification_load.value = false;
  verification_response.value.success = !error;
  verification_response.value.desc = !error ? data : error;
}
</script>

<style scoped>
#login-card {
  border: 1px solid #dddddd;
}
</style>