<template>
  <div class="mx-auto pa-2">
    <v-sheet>
      <v-toolbar color="primary" height="25vh">
        <v-card-title class="text-h5">
          List of Reclassification Application
          <v-card-subtitle> A brief overview of a reclassification request.</v-card-subtitle>
        </v-card-title>

        <v-spacer></v-spacer>
        <v-text-field prepend-inner-icon="mdi-magnify" hide-details bg-color="indigo-lighten-5" density="compact" dense />
        <v-btn icon>
          <v-icon>mdi-settings</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs color="indigo-accent-1" v-model="tab" align-tabs="title">
            <v-tab v-for="item in items" :key="item" :value="item">
              {{ item }} <v-badge color="success" :content="1" inline />
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-window v-model="tab">
        <v-window-item :value="tab">
          <v-card-text class="overflow-y-auto" style="height: 65vh">
            <v-row dense>
              <!-- <v-col cols="12">
                <v-card class="mx-auto pa-10" :width="500" color="error" variant="tonal">
                  <center>
                    <v-icon size="64">mdi-alert-circle-outline</v-icon>
                  </center>
                  <center> No Reclass Applciantion for Signature!</center>

                </v-card>
              </v-col> -->
              <v-col cols="12" xxl="4" xl="4" lg="6" v-for="d, index in   get_for_signature  " :key="index">
                <v-card class="mx-auto" variant="tonal" color="indigo">
                  <v-card-item>
                    <div>
                      <div class="text-overline mb-1">
                        Control Number : <b> {{ d.control_no }}</b>
                      </div>

                      <div class="text-body-1 mb-1 ">
                        Position : <b>{{ d.position }}</b>
                      </div>
                      <div class="text-body-2"> Name : <b class="text-capitalize">{{ d.surname }}, {{ d.givenname }} </b>
                      </div>
                      <div class="text-body-2"> School : {{ d.school }}</div>
                      <div class="text-body-2"> Division : {{ d.division }}</div>
                    </div>
                  </v-card-item>

                  <v-card-actions>
                    <v-tooltip location="top" text="Click to view full application">
                      <template v-slot:activator="{ props }">
                        <v-btn density="compact" variant="tonal" v-bind="props" @click="load_erf_form(d._id)">
                          View Application
                        </v-btn>
                      </template>
                    </v-tooltip>
                    <v-spacer />
                    <span> Status :
                      <v-chip class="font-weight-bold"> {{ d.status }}</v-chip></span>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-window-item>
        <v-window-item value="pending">
          <v-card-text class="overflow-y-auto" style="height: 65vh">
            <v-row dense>
              <v-col cols="12" xxl="4" xl="4" lg="6" v-for="d, index in   get_for_signature  " :key="index">
                <v-card class="mx-auto" variant="tonal" color="indigo">
                  <v-card-item>
                    <div>
                      <div class="text-overline mb-1">
                        Control Number : <b> {{ d.control_no }}</b>
                      </div>

                      <div class="text-body-1 mb-1 ">
                        Position : <b>{{ d.position }}</b>
                      </div>
                      <div class="text-body-2"> Name : <b class="text-capitalize">{{ d.surname }}, {{ d.givenname }} </b>
                      </div>
                      <div class="text-body-2"> School : {{ d.school }}</div>
                      <div class="text-body-2"> Division : {{ d.division }}</div>
                    </div>
                  </v-card-item>

                  <v-card-actions>
                    <v-tooltip location="top" text="Click to view full application">
                      <template v-slot:activator="{ props }">
                        <v-btn density="compact" variant="tonal" v-bind="props" @click="load_erf_form(d._id)">
                          View Application
                        </v-btn>
                      </template>
                    </v-tooltip>
                    <v-spacer />
                    <span> Status :
                      <v-chip class="font-weight-bold"> {{ d.status }}</v-chip></span>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-window-item>
      </v-window>

    </v-sheet>
  </div>
</template>



<script lang="ts" setup>
definePageMeta({ layout: "std-systems" })
const router = useRouter();
const { $rest } = useNuxtApp();
onBeforeMount(() => {
  get_application()
})
const tab = ref(null)
const items = [
  'For Signature', 'Pending', 'For Evaluation', 'Evaluated', 'Verified', 'Recommended Approved', 'Approved',
]

function load_erf_form(id) {
  router.push({
    name: 'sms-erf-form',
    query: {
      id: id
    }
  })
}

const application_data = ref([])
async function get_application() {
  const { data, error } = await $rest('applicant/get-application', {
    method: "GET"
  });
  application_data.value = data;
}

const get_for_signature = computed(() => {
  return application_data.value.filter((i) => i.status == 'For Signature');
})

</script>

