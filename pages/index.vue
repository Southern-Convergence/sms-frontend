<template>
  <v-row class="h-100" justify="center" align="center" dense>
    <v-col cols="12" style="text-align : -webkit-center">
      <!-- deped.svg-->
      <!-- <v-img src="/deped.svg" height="90" /> -->
      <v-sheet max-width="480">
        <v-list-item>
          <template v-slot:prepend>
            <v-avatar size="92" image="/NCR.png" />
          </template>

          <h6 class="text-h5 text-medium-emphasis"> Staffing Modification System</h6>
        </v-list-item>
      </v-sheet>
      <v-card class="mt-4 pt-6 pb-4 px-6" id="login-card" :loading="login_load" max-width="480" min-height="560"
        rounded="lg">
        <v-card-title class="text-center">Sign In Using</v-card-title>

        <v-card-text class="pb-0 pt-4">
          <v-btn class="mr-2">
            <img class="mr-2" src="/facebook.svg" height="24" />
            Facebook
          </v-btn>
          <v-btn>
            <img class="mr-2" src="/google.svg" height="24" />
            Google
          </v-btn>
        </v-card-text>

        <v-card-text class="d-flex align-center pb-0">
          <v-divider />
          <small class="text-subtitle-2 mx-2 font-weight-bold">Or</small>
          <v-divider />
        </v-card-text>

        <v-fade-transition>
          <v-card-text v-show="login_success">
            <v-alert density="comfortable" type="success" variant="outlined" border>
              Welcome back <strong>{{ form.username }}</strong>
            </v-alert>
          </v-card-text>
        </v-fade-transition>

        <v-fade-transition>
          <v-card-text v-show="login_fail">
            <v-alert density="comfortable" type="error" variant="outlined" border>
              {{ login_error }}
            </v-alert>
          </v-card-text>
        </v-fade-transition>

        <v-card-text style="text-align : start">
          <v-form v-model="valid" @submit.prevent="login">
            <v-text-field class="pb-1" v-model="form.username" @input="() => clear_error()"
              prepend-inner-icon="mdi-account" placeholder="Username" :rules="[$validator.required]"
              :error-messages.sync="username_error" required />

            <v-text-field v-model="form.password" prepend-inner-icon="mdi-lock"
              :append-inner-icon="show_password ? 'mdi-eye-off' : 'mdi-eye'" @input="() => clear_error()"
              @click:append-inner="show_password = !show_password" placeholder="Password" autocomplete="on"
              :error-messages.sync="password_error" :rules="[$validator.required]"
              :type="show_password ? 'text' : 'password'" required />

            <div class="d-flex flex-row">
              <v-checkbox v-model="session_mode" @input="toggle_mode" label="Remember Me" hide-details />
              <h6 class="text-subtitle-2 text-blue-darken-4" style="align-self : center">
                <nuxt-link to="/forgot-password">
                  Forgot Password?
                </nuxt-link>
              </h6>
            </div>

            <small class="text--secondary">We use cookies to improve your experience, for more information, You may
              refer to our <nuxt-link to="/cookie-policy">Cookie Policy</nuxt-link></small>

            <br />
            <br />
            <small class="text--secondary">By Logging-In, you agree to our <nuxt-link to="/privacy-policy">Privacy
                Policy</nuxt-link></small>
            <br />
            <br />

            <v-btn color="primary" :disabled="!valid" type="submit" :loading="login_load" block>Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <small>Identity Server provided by Southern Convergence</small>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import useAuth from "~/store/auth";

definePageMeta({
  layout: "plain",

  is_public: true
});

const auth = useAuth();
const router = useRouter();

/* States */
const show_password = ref(false);
const valid = ref(false);
let login_load = ref(false);
let login_success = ref(false);
let login_fail = ref(false);
let login_error = ref("");

let username_error = ref("");
let password_error = ref("");

let session_mode = ref(true);

const form = ref({
  username: "",
  password: ""
});

/* Methods */
function login() {
  const { username, password } = form.value;
  login_load.value = true;

  auth.login(username, password)
    .then(() => {
      login_fail.value = false;
      login_error.value = "";
      login_success.value = true;
      valid.value = false;
      setTimeout(() => {
        login_load.value = false;
        router.replace({ name: "account-profile" });
      }, 1500);
    })
    .catch((error: any) => {
      login_load.value = false;
      login_success.value = false;
      if (error === "Invalid Username") username_error.value = error;
      if (error === "Invalid Password") password_error.value = error;
      if (error === "Already signed-in") {
        login_fail.value = true;
        login_error.value = error;

        setTimeout(() => {
          router.replace({ name: "account-profile" });
        }, 1500);
      }
      if (error === "Failed to connect to the server.") {
        login_fail.value = true;
        login_error.value = error;
      }
    });
}

function clear_error() {
  username_error.value = "";
  password_error.value = "";
}

function toggle_mode() {
  auth.switch_mode(session_mode.value);
}
</script>

<style scoped>
#login-card {
  border: 1px solid #dddddd;
}
</style>