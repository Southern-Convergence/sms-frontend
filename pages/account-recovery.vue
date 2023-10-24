<template>
  <v-row class="h-100" justify="center" align="center" dense>
    <v-col cols="12" style="text-align : -webkit-center">
      <!-- deped.svg-->
      <!-- <v-img src="/deped.svg" height="90" /> -->
      <v-sheet max-width="480">
        <v-list-item>
          <template v-slot:prepend>
            <v-avatar size="120">
              <v-img src="/logo.svg" />
            </v-avatar>
          </template>

          <h6 class="text-h3 text-medium-emphasis">STD-Frontend</h6>
        </v-list-item>
      </v-sheet>
      <v-card class="mt-4 pt-6 pb-4 px-6" id="login-card" :loading="loading" width="480">
        <v-fade-transition>
          <v-card-text v-show="response.desc">
            <v-alert density="compact" :type="response.success ? 'success' : 'error'" variant="outlined"
              border>
              {{ response.desc }}
            </v-alert>
          </v-card-text>
        </v-fade-transition>

        <v-window v-model="recovery_window">
          <v-window-item :value="0">


            <v-card-title class="text-center">Account Recovery</v-card-title>

            <h6 class="text-body-2">Please Enter your One-Time Pasword (OTP)</h6>

            <v-card-text class="pt-4" style="text-align : start">
              <v-form v-model="valid" @submit.prevent="verify">
                <v-text-field class="text-h3" id="otp-input" v-model="otp" maxlength="6" />
                <v-btn color="primary" :disabled="!valid" :loading="loading" type="submit" block>Verify</v-btn>
              </v-form>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="1">
            <v-card-title class="text-center">Account Recovery</v-card-title>

            <h6 class="text-body-2">Please enter your new password</h6>

            <v-form style="text-align: start;" class="py-2" v-model="valid_passwords" @submit.prevent="recover">
              <v-text-field v-model="password" prepend-inner-icon="mdi-lock"
                :append-inner-icon="show_password ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="show_password = !show_password" placeholder="Password" autocomplete="on"
                :error-messages.sync="password_error" :rules="[$validator.required]" @input="compare_passwords"
                :type="show_password ? 'text' : 'password'" required />
              <v-text-field v-model="confirm_password" prepend-inner-icon="mdi-lock"
                :append-inner-icon="show_confirm_password ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="show_confirm_password = !show_confirm_password" placeholder="Confirm Password"
                autocomplete="on" :error-messages.sync="confirm_password_error" :rules="[$validator.required]"
                @input="compare_passwords" :type="show_confirm_password ? 'text' :   'password'" required />
              <v-btn color="primary" :disabled="!valid_passwords" :loading="loading" type="submit"
                block>Submit</v-btn>
            </v-form>
          </v-window-item>
        </v-window>
      </v-card>
      <small>Identity Server provided by Southern Convergence</small>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
const { $rest } = useNuxtApp();

definePageMeta({
  layout : "plain"
});

const router = useRouter();

const valid = ref(false);
const loading = ref(false);
const response = ref({
  success : false,
  desc    : ""
});

const recovery_window = ref(0);

const otp     = ref("");

const valid_passwords  = ref(false);

const password       = ref("");
const show_password  = ref(false);
const password_error = ref("");

const confirm_password       = ref("");
const show_confirm_password  = ref(false);
const confirm_password_error = ref("");

async function verify(){
  loading.value = true;
  const { data, error } = await $rest("otp/verify", {
    method : "POST",
    body : {
      otp : otp.value
    }
  })
  
  loading.value = false;

  response.value.success = !error;
  response.value.desc = error ? error : "Successfully verified OTP."

  if(!error){
    setTimeout(()=> {
      recovery_window.value = 1;
    }, 2500);
  }

  setTimeout(()=> {
    response.value.desc = "";
    router.replace({name : "login"});
  }, 2500)
}

async function recover(){
  loading.value = true;
  const { data, error } = await $rest("auth/update-password", {
    method : "POST",
    body : {
      otp              : otp.value,
      password         : password.value,
      confirm_password : confirm_password.value
    }
  });

  loading.value = false;

  response.value.success = !error;
  response.value.desc = error ? error : "Successfully Updated Credentials."
  
  if(!error){
    setTimeout(()=> {
      recovery_window.value = 1;
      router.replace({name : "index"});
    }, 2500);
  }

  setTimeout(()=> {
    response.value.desc = "";
  }, 2500)
}

function compare_passwords(){
  if(password.value === ""){
    password_error.value = "";
    confirm_password_error.value = "";
  }

  const mismatch = password.value !== confirm_password.value;

  password_error.value         = mismatch ? "Passwords must match" : "";
  confirm_password_error.value = mismatch ? "Passwords must match" : "";
}
</script>

<style scoped>
#login-card {
  border: 1px solid #dddddd;
}

::v-deep(#otp-input) {
  text-align: center;
  font-weight: bold;
  font-size: larger;
}
</style>