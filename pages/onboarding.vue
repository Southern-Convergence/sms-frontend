<template>
  <v-row class="fill-height" justify="center" align="center" dense>
    <v-col cols="12" style="text-align : -webkit-center">
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
      <v-card class="pa-6 py-8" id="onboarding-card" v-if="!link_error" width="420" elevation="2" min-height="480">
        <v-card-title class="text-center text-h5">Account Finalization</v-card-title>
        <v-card-subtitle>Fill up the fields below to get started</v-card-subtitle>

        <v-card-text>
          <v-divider class="pb-4" />

          <span>{{ input_windows[input_window].name }}</span>

          <v-window v-model="input_window">
            <v-window-item :value="0">
              <v-form v-model="input_windows[0].valid">
                <v-row class="mt-2" dense>
                  <v-col cols="12">
                    <v-text-field v-model="form.first_name" label="First Name" :rules="[$validator.required]" hide-details />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="form.middle_name" label="Middle Name" hide-details />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="form.last_name" label="Last Name" :rules="[$validator.required]" hide-details />
                  </v-col>
                </v-row>
              </v-form>
            </v-window-item>

            <v-window-item :value="1">
              <v-form v-model="input_windows[1].valid">
                <v-row class="mt-2" dense>
                  <v-col cols="12">
                    <v-text-field v-model="form.email" label="Email" prepend-inner-icon="mdi-email-outline" disabled hide-details/>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="form.username" label="Username" :rules="[$validator.required]" hide-details />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="form.password" label="Password" type="password" :rules="[$validator.required]" hide-details />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="form.confirm_password" label="Confirm Password" type="password" :rules="[$validator.required]" hide-details />
                  </v-col>
                </v-row>
              </v-form>
            </v-window-item>
          </v-window>
        </v-card-text>

        <v-card-actions>
          <v-btn v-show="input_window > 0" @click="input_window--" color="primary"><v-icon>mdi-arrow-left</v-icon>Prev</v-btn>
          <v-spacer />
          <v-btn v-show="input_window !== input_windows.length-1" @click="input_window++" :disabled="disable_next" color="primary">Next
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn v-show="input_window === input_windows.length-1" :disabled="disable_next" @click="finalize" color="primary">Submit</v-btn>
        </v-card-actions>
      </v-card>

      <v-card class="pa-6 py-8" id="onboarding-card" v-else width="420" elevation="2" min-height="480">
        <v-card-title class="text-center text-h5">Account Finalization</v-card-title>
        <v-card-text class="pt-8">
          <v-list-item class="pa-8" rounded="lg" border>
            <v-avatar size="64" rounded="0">
            <v-icon size="64">mdi-link-variant-off</v-icon>
          </v-avatar>
          <h6 class="text-subtitle-1 py-4">Sorry, It appears that your link may be expired or invalid</h6>

          <h6 class="text-caption">You may ask an administrator for assistance if you think this is a mistake</h6>

            
          </v-list-item>

          <v-btn class="mt-2" :to="{name : 'index'}" variant="outlined">Take me back</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useLoader } from "~~/store/index";
import swal from "sweetalert";

const { $rest } = useNuxtApp();

const loader = useLoader();
const route  = useRoute();
const router = useRouter();

definePageMeta({
  layout : "plain"
})

const invite_link = ref(true);
const link_error  = ref(false);

const form = ref({
  first_name : "",
  middle_name : "",
  last_name : "",

  username : "",
  email    : "",

  password : "",
  confirm_password : ""
});
const active_user = ref("");

onBeforeMount(async()=> {
  invite_link.value = Boolean(route.query && route.query.ref);
  if(invite_link.value){
    loader.set("Verifying reference link...");
    const { data, error } = await $rest("auth/verify-invitation-code", {
      method : "GET",
      query  : {
        code : route.query.ref
      }
    });

    if(error)link_error.value = error.error;

    const { first_name, middle_name, last_name, email, id } = data.user;

    active_user.value = id,

    form.value.first_name  = first_name;
    form.value.middle_name = middle_name;
    form.value.last_name   = last_name;
    form.value.email       = email;

    input_windows.value[0].valid = true;
  }

  loader.set(false);
});

const disable_next = computed(()=> {
  const form_validity = !input_windows.value[input_window.value].valid;
  const { password, confirm_password } = form.value;
  const temp = input_window.value;
  switch(temp){
    case 0 : return form_validity;
    case 1 : return form_validity || password !== confirm_password;
  }
});

const input_window  = ref(0);
const input_windows = ref([
  {
    name  : "Personal Information",
    valid : false
  },
  {
    name  : "Credentials",
    valid : false
  }
]);

async function finalize(){
  loader.set("Finalizing your account")
  const { first_name, middle_name, last_name, username, password } = form.value;

  
  const { data, error } = await $rest("auth/finalize", {
    method : "POST",
    body   : {
      user_id : active_user.value,
      invite_id : route.query.ref,
      first_name,
      middle_name,
      last_name,
      username,
      password
    }
  });

  let swal_body = {
    icon    : error ? "error" : "success",
    title   : data || error,
    buttons : {ok :true}
  };

  if(data){
    setTimeout(() => {
      router.replace({name : "index"});
    }, 2500);
    /* @ts-ignore */
    swal_body.text = "You will be redirected to the login page in a few seconds..."
  }
  swal(swal_body);
  


  loader.set(false);
}
</script>

<style scoped>
#onboarding-card {
  border: 1px solid #dddddd;
}
</style>