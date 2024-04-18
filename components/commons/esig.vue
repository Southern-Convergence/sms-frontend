<template>
  <v-layout>
    <v-bottom-sheet temporary inset>
      <template v-slot:activator="{ props }">
        <v-row no-gutters justify="center">
          <v-btn size="x-small" v-bind="props" text="Upload E-sig"></v-btn>
        </v-row>
      </template>

      <v-card height="450">
        <v-row no-gutters>
          <v-col cols="3">
            <v-card-title>Signatures</v-card-title>
            <v-divider />
            <v-card-text class="text-center" style="height: 350px; overflow-y: scroll">
              <div v-for="sig, sig_index in props.signatures" :key="sig_index">
                <img width="100" class="preview cursor" :src="sig.link" @click="emit('esig', sig)" />
              </div>
            </v-card-text>
            <v-divider />
            <v-card-text>

            </v-card-text>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="9">
            <v-card-title class="d-flex">
              <v-avatar rounded="0" image="/signature.png" size="30" />
              <span class="mx-2">E-Signature</span>
            </v-card-title>
            <v-divider />

            <v-tabs fixed-tabs v-model="tab">
              <v-tab :value="1">Upload E-signature</v-tab>
              <v-tab :value="2">Signature Pad</v-tab>
            </v-tabs>

            <v-window v-model="tab">
              <v-window-item :value="1">
                <v-card height="300" flat>
                  <v-card-text>
                    <v-row no-gutters justify="center" class="mt-10">
                      <div class="image-preview" v-if="imageData.length > 0">
                        <img class="preview" width="200" height="150" :src="imageData">
                      </div>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-row no-gutters justify="center" class="mb-2">
                      <v-btn variant="tonal" color="blue" size="small" @click="attached_esig"
                        v-if="imageData !== ''">Save</v-btn>
                    </v-row>
                  </v-card-actions>
                </v-card>
                <v-divider />
                <v-card-actions>
                  <button class="custom-file-upload" onclick="document.getElementById('getFile').click()">Upload
                    E-Signature</button>
                  <input type='file' id="getFile" @change="previewImage" style="display:none">
                </v-card-actions>
              </v-window-item>

              <v-window-item :value="2">
                <v-card height="300" fla>
                  <v-card-text class="text-center">
                    <v-row no-gutters justify="center">
                      <v-sheet border>
                        <Vue3Signature ref="signature_pad" :sigOption="state.option" :w="'800px'" :h="'380px'"
                          :disabled="state.disabled" class="example" />
                      </v-sheet>
                    </v-row>
                  </v-card-text>
                </v-card>
                <v-divider />
                <v-card-actions>

                  <v-spacer />
                  <v-btn color="red" variant="text" @click="clear">Clear</v-btn>
                  <v-btn class="text-primary" variant="tonal" @click="free_hand_esig">SAVE</v-btn>
                </v-card-actions>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-card>
    </v-bottom-sheet>
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
function attached_esig() {
  const file = input_sig.value.files[0]
  console.log(file)
  save_signature(file)
}

function free_hand_esig() {
  const file = signature_pad.value.save("image/png");
  console.log(file)
  save_signature(file)
}

async function save_signature(file: any) {
  const signature = new FormData()
  signature.append("signatures", file)

  signature.append("user_id", auth.user._id)
  const { data, error } = await $rest('hris/add-signatures', {
    method: "POST",
    body: signature
    // body  : {
    //   user_id: auth.user._id,
    //   signatures: file
    // }
  })
  auth.get_updated_sig();
  if (error) return swal({ title: "Error", timer: 2000, text: error, icon: "error", buttons: { ok: false, cancel: false } });
  return swal({ title: "Success", timer: 2000, text: data, icon: "success", buttons: { ok: false, cancel: false } })
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

// const endpoint = computed(() => {
//  return cfg.public.NODE_ENV === 'development' ? cfg.public.CDN_DEV_ENDPOINT : cfg.public.CDN_ENDPOINT 
// })

// const get_signatures = computed(() => {
//   return auth.user.signatures?.map((v: any) => ({
//     link: ${endpoint.value}/${v.link}/${v.filename},

//   }))
// })

function use_esig(esig: any) {
  console.log(esig)
}
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>