<template>
  <v-row class="fill-height" justify="center" align="center" dense>
    <v-col cols="12" style="text-align : -webkit-center">
      <v-sheet max-width="580">
        <v-list-item>
          <template v-slot:prepend>
            <v-avatar size="120">
              <v-img src="/NCR.png" />
            </v-avatar>
          </template>

          <h6 class="text-h4 text-medium-emphasis text-primary">Staffing Modification System</h6>

        </v-list-item>
      </v-sheet>
      <v-card class="pa-6 py-8" id="onboarding-card" v-if="!link_error" width="420" elevation="2" min-height="480">
        <v-card-title class="text-center text-h5">Account Finalization</v-card-title>
        <v-card-subtitle>Fill up the fields below to get started</v-card-subtitle>

        <v-card-text>
          <v-divider class="pb-4" />

          <!-- <span>{{ input_windows[input_window].name }}</span> -->

          <v-window v-model="input_window">
            <v-window-item :value="0">
              <v-form v-model="input_windows[0].valid">
                <v-row class="mt-2" dense>
                  <v-col cols="12">
                    <v-text-field v-model="form.first_name" label="First Name" :rules="[$validator.required]"
                      hide-details />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="form.middle_name" label="Middle Name" hide-details />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="form.last_name" label="Last Name" :rules="[$validator.required]"
                      hide-details />
                  </v-col>

                </v-row>


              </v-form>
            </v-window-item>

            <v-window-item :value="1">
              <v-form v-model="input_windows[1].valid">
                <v-row class="mt-2" dense>
                  <v-col cols="12">
                    <v-text-field v-model="form.email" label="Email" prepend-inner-icon="mdi-email-outline" disabled
                      hide-details />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="form.username" label="Username" :rules="[$validator.required]"
                      hide-details />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="form.password" label="Password" type="password"
                      :rules="[$validator.required]" hide-details />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="form.confirm_password" label="Confirm Password" type="password"
                      :rules="[$validator.required]" hide-details />
                  </v-col>
                </v-row>
              </v-form>
            </v-window-item>
            <v-window-item :value="2">
              <v-form v-model="input_windows[2].valid">
                <v-card>

                  <v-tabs fixed-tabs v-model="tab" color="primary">
                    <v-tab :value="1">Upload E-sig</v-tab>
                    <v-tab :value="2">Signature Pad</v-tab>
                  </v-tabs>

                  <v-window v-model="tab">
                    <v-window-item :value="1">
                      <v-card-text>

                        <v-card class="w-100  d-flex align-center justify-center" variant="tonal" height="200"
                          width="100%">
                          <div class="image-preview" v-if="image_data.length > 0">
                            <img class="preview" width="200" height="150" :src="image_data">
                          </div>
                        </v-card>

                      </v-card-text>
                      <v-divider />
                      <v-card-actions>
                        <v-row justify="center" v-if="image_data.length === 0">
                          <v-btn variant="tonal" color="primary" prepend-icon="mdi-upload" class="custom-file-upload"
                            onclick="document.getElementById('getFile').click()">
                            Select File</v-btn> <v-spacer />
                          <input type='file' id="getFile" @change="preview_image" style="display:none">
                        </v-row>
                        <v-row dense justify="center" class="mb-2" v-else>
                          <v-col cols="5"> <v-btn block variant="tonal" color="error" size="small"
                              @click="clear_upload">CLear</v-btn></v-col>
                          <v-col cols="5"> <v-btn block variant="tonal" color="primary" size="small"
                              @click="attached_esig" v-if="image_data !== ''">Save</v-btn></v-col>
                        </v-row>
                      </v-card-actions>
                    </v-window-item>

                    <v-window-item :value="2">
                      <v-card-text>

                        <v-card height="200" variant="tonal">
                          <Vue3Signature ref="signature_pad" :sigOption="state.option" :w="'800px'" :h="'380px'"
                            :disabled="state.disabled" />
                        </v-card>

                      </v-card-text>

                      <v-divider />
                      <v-card-actions>
                        <v-row dense justify="center" class="mb-2">
                          <v-col cols="3"> <v-btn block variant="tonal" color="error" size="small"
                              @click="clear">CLear</v-btn></v-col>
                          <v-col cols="3"> <v-btn class="custom-file-upload" block variant="tonal" color="primary"
                              size="small" @click="free_hand_esig">Save</v-btn></v-col>

                        </v-row>

                      </v-card-actions>
                    </v-window-item>
                  </v-window>
                </v-card>
              </v-form>
            </v-window-item>
          </v-window>
        </v-card-text>

        <v-card-actions>
          <v-btn v-show="input_window > 0" @click="input_window--"
            color="primary"><v-icon>mdi-arrow-left</v-icon>Prev</v-btn>
          <v-spacer />
          <v-btn @click="input_window++" color="primary" v-show="input_window < 2">Next
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn v-show="input_window === input_windows.length - 1" :disabled="disable_next" @click="finalize"
            color="primary">Submit</v-btn>
          <!-- <v-btn v-show="input_window !== input_windows.length - 1" @click="input_window++" :disabled="disable_next"
            color="primary">Next
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn v-show="input_window === input_windows.length - 1" :disabled="disable_next" @click="finalize"
            color="primary">Submit</v-btn> -->
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

          <v-btn class="mt-2" :to="{ name: 'index' }" variant="outlined">Take me back</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import Vue3Signature from "vue3-signature"
import { useLoader } from "~~/store/index";
import swal from "sweetalert";
import useAuth from "~/store/auth";
const { $rest } = useNuxtApp();

const loader = useLoader();
const route = useRoute();
const router = useRouter();
const auth = useAuth();
const cfg = useRuntimeConfig();
definePageMeta({
  layout: "plain"
})






const invite_link = ref(true);
const link_error = ref(false);

const form = ref({
  first_name: "",
  middle_name: "",
  last_name: "",

  username: "",
  email: "",
  password: "",
  confirm_password: "",
  e_signature: "",
  role: "",
  side: "",
});
const active_user = ref("");

onBeforeMount(async () => {
  invite_link.value = Boolean(route.query && route.query.ref);
  if (invite_link.value) {
    loader.set("Verifying reference link...");
    const { data, error } = await $rest("auth/verify-invitation-code", {
      method: "GET",
      query: {
        code: route.query.ref
      }
    });

    if (error) link_error.value = error.error;

    const { first_name, middle_name, last_name, email, id, apts, side } = data.user;


    active_user.value = id;
    form.value.role = apts[0]._id;
    form.value.first_name = first_name;
    form.value.middle_name = middle_name;
    form.value.last_name = last_name;
    form.value.email = email;



    form.value.side = side;
    input_windows.value[0].valid = true;


  }

  loader.set(false);
});

const disable_next = computed(() => {
  const form_validity = !input_windows.value[input_window.value].valid;
  const signature = !input_windows.value[input_window.value].valid;
  const { password, confirm_password } = form.value;
  const temp = input_window.value;
  switch (temp) {
    case 0: return form_validity;
    case 1: return form_validity || password !== confirm_password;
    case 1: return signature;
  }
});

const input_window = ref(0);
const input_windows = ref([
  {
    name: "Personal Information",
    valid: false
  },
  {
    name: "Credentials",
    valid: false
  },
  {
    name: "Signature",
    valid: false
  }
]);

async function finalize() {
  loader.set("Finalizing your account")
  const { first_name, middle_name, last_name, username, password, e_signature, side, role } = form.value;
  const { data, error } = await $rest("auth/finalize", {
    method: "POST",
    body: {
      user_id: active_user.value,
      invite_id: route.query.ref,
      first_name,
      middle_name,
      last_name,
      username,
      password,
      e_signature,
      side,
      role
    }
  });

  let swal_body = {
    icon: error ? "error" : "success",
    title: data || error,
    buttons: { ok: true }
  };

  if (data) {
    setTimeout(() => {
      router.replace({ name: "index" });
    }, 2500);
    /* @ts-ignore */
    swal_body.text = "You will be redirected to the login page in a few seconds..."
  }
  swal(swal_body);
  loader.set(false);
}


// Start: Esignature
const esig = ref(false)
const tab = ref(null)
const image_src = ref("")
const image_data = ref("")
const input_sig = ref()
const signature_pad = ref(null as any)

function preview_image(event: any) {
  input_sig.value = event.target
  if (input_sig.value.files && input_sig.value.files[0]) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      image_data.value = e.target.result
    }
    reader.readAsDataURL(input_sig.value.files[0])
  }
}

function attached_esig() {
  const file = input_sig.value.files[0]
  if (file) {
    const reader = new FileReader()

    reader.onload = (event: any) => {
      form.value.e_signature = event?.target.result
    }
    reader.readAsDataURL(file)
  }

  esig.value = false;
  swal({ text: "Successfully Uploaded Signature", icon: "success", buttons: { ok: false, cancel: false } })
}

function free_hand_esig() {
  const file = signature_pad.value.save("image/png")

  form.value.e_signature = file;
  esig.value = false;
  swal({ text: "Successfully Uploaded Signature", icon: "success", buttons: { ok: false, cancel: false } })
}

function clear() {
  signature_pad.value.clear()
}

function clear_upload() {
  form.value.e_signature === ""
}
const state = reactive({
  count: 0,
  option: {
    penColor: "rgb(0, 0, 0)",
    backgroundColor: "rgb(255,255,255)"
  },
  disabled: false
})

</script>

<style scoped>
#onboarding-card {
  border: 1px solid #dddddd;
}
</style>