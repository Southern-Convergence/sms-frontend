<template>
  <v-layout>
    <v-sheet width="100%">
      <v-row no-gutters>

        <v-col cols="12">
          <v-tabs fixed-tabs v-model="tab" color="primary">
            <v-tab :value="1">
              Upload E-sig</v-tab>
            <v-tab :value="2">
              Signature Pad</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item :value="1">
              <v-row no-gutters justify="center">
                <v-col cols="12">
                  <v-card class="w-100 my-2 d-flex align-center justify-center" variant="tonal" height="190">
                    <div class="image-preview" v-if="imageData.length > 0">
                      <img class="preview" width="200" height="150" :src="imageData">
                    </div>
                  </v-card>
                </v-col>
              </v-row>
              <v-divider />
              <v-card-actions>
                <v-row dense v-if="imageData === ''"> <v-btn color="primary" variant="tonal" prepend-icon="mdi-upload"
                    class="custom-file-upload" onclick="document.getElementById('getFile').click()">Select
                    File</v-btn>
                  <input type='file' id="getFile" @change="previewImage" style="display:none"></v-row>
                <v-row justify="center" v-else>
                  <v-col cols="2" v-if="imageData">
                    <v-btn block variant="tonal" color="error" size="small" @click="clear_upload">Clear</v-btn>
                  </v-col>
                  <v-col cols="2" v-if="imageData !== ''">
                    <v-btn block variant="tonal" color="primary" size="small" @click="attached_esig">Save</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-window-item>

            <v-window-item :value="2">
              <v-row no-gutters justify="center">
                <v-col cols="12">
                  <v-card class="my-2" variant="tonal" height="190">
                    <Vue3Signature ref="signature_pad" :sigOption="state.option" :w="'800px'" :h="'280px'"
                      :disabled="state.disabled" color="red" />
                  </v-card>
                </v-col>
              </v-row>
              <v-divider />
              <v-card-actions>
                <v-row justify="center">
                  <v-col cols="4"> <v-btn color="red" variant="tonal" density="compact" block
                      @click="clear">Clear</v-btn></v-col>
                  <v-col cols="4"> <v-btn class="custom-file-upload" block density="compact" color="primary"
                      variant="tonal" @click="free_hand_esig">Save</v-btn></v-col>
                </v-row>
              </v-card-actions>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-sheet>

  </v-layout>
</template>

<script lang="ts" setup>
import Vue3Signature from "vue3-signature"
import swal from 'sweetalert'
import useAuth from "~/store/auth";
const auth = useAuth();
const cfg = useRuntimeConfig();
const { $rest } = useNuxtApp();

interface Props {
  signatures: Array
}

const props = withDefaults(defineProps<Props>(), {
  signatures: []
})
const emit = defineEmits(["esig"]);

const tab = ref(null)
const imageData = ref("")

const input_sig = ref()
const signature_pad = ref(null as any)

function previewImage(event: any) {
  input_sig.value = event.target
  if (input_sig.value.files && input_sig.value.files[0]) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      imageData.value = e.target.result
    }
    reader.readAsDataURL(input_sig.value.files[0])
  }
}


const src_image = ref("")
function attached_esig() {
  const file = input_sig.value.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = (event: any) => {
      src_image.value = event?.target.result
      save_signature(src_image.value)
    }
    reader.readAsDataURL(file)
  }
}

function free_hand_esig() {
  const file = signature_pad.value.save("image/png");
  save_signature(file)
}

async function save_signature(file: any) {
  // const signature = new FormData()
  // signature.append("signatures", file)

  // signature.append("user_id", auth.user._id)
  const { data, error } = await $rest('new_applicant/add-signatures', {
    method: "POST",
    body: {
      user_id: auth.user._id,
      signatures: file
    }
  })
  auth.get_updated_sig();
  if (error) return swal({ title: "Error", timer: 2000, text: error, icon: "error", buttons: { ok: false, cancel: false } });
  return swal({ title: "Success", timer: 2000, text: data, icon: "success", buttons: { ok: false, cancel: false } })
}

const selected_esig = ref("")
async function select_esig(src: any) {
  selected_esig.value = src.link
  const { data, error } = await $rest("new-applicant/used-esig", {
    method: "PUT",
    body: {
      user_id: auth.user._id,
      used_esig: selected_esig.value
    }
  })
  auth.get_updated_sig();
  console.log(data)
  console.log(error)
}


const state = reactive({
  count: 0,
  option: {
    penColor: "rgb(0, 0, 0)",
    backgroundColor: "rgb(255,255,255)"
  },
  disabled: false
})

const clear = () => {
  signature_pad.value.clear()
}

const clear_upload = () => {
  imageData.value = "";
};


const endpoint = computed(() => {
  return cfg.public.NODE_ENV === 'development' ? cfg.public.CDN_DEV_ENDPOINT : cfg.public.CDN_ENDPOINT
})

const get_signatures = computed(() => {
  const uploaded = auth.user.signatures
  return uploaded
  // const uploaded = auth.user.signatures?.filter((v: any) => v.filename !== '').map((v: any) => ({
  //   link: ${endpoint.value}/${v.link}/${v.filename},
  // }))
  // const free_hand = auth.user.signatures?.filter((v: any) => v.filename === '').map((v: any) => ({link: v.link}))
  // return uploaded?.concat(free_hand);
})
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>