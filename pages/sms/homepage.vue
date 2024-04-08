<template>
  <v-sheet class="pa-10">
    <v-card class="pa-10 " rounded="lg" flat>
      <v-card-text> <v-row :class="`${$vuetify.display.mobile ? 'text-center' : ''}`" justify="center" dense>
          <v-col cols="12">
            <h6 class="text-h5 reclass-title">DepEd NCR Staffing Modification System</h6>

            <h6 class="text-subtitle-2 text-medium-emphasis  ">Manage reclassification applicantions.
            </h6>
            <v-divider class="mt-4 mb-2" />
          </v-col>

        </v-row>
        <v-row>
          <v-col cols="12" xl="6" lg="6">
            <v-card class="pa-3" color="primary" variant="tonal" rounded="lg">
              <div class="d-flex flex-no-wrap justify-space-between py-4 pl-4">
                <div>
                  <h6 class="text-h6 font-weight-bold">
                    INTRODUCTION
                  </h6>
                  <h6 class="text-subtitle-2">The Reclass System automates reclassification requests for school
                    personnel
                    (T2, T3, MT, HT, and Principal) from application to approval, providing real-time status updates. It
                    streamlines the process, eliminates paperwork, and supports remote work by allowing access to
                    voluminous
                    supporting documents.</h6>

                  <v-btn class="mt-4" size="small" variant="outlined" disabled dark>Review</v-btn>
                </div>

                <v-avatar class="px-4 pb-4" size="128" rounded="0">
                  <v-img class="ma-2" src="/NCR.png" />
                </v-avatar>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" xl="6" lg="6">
            <v-card class="pa-3" color="primary" variant="tonal" rounded="lg">
              <div class="d-flex flex-no-wrap justify-space-between py-4 pl-4">
                <div>
                  <h6 class="text-h6 font-weight-bold">
                    INTRODUCTION
                  </h6>

                  <h6 class="text-subtitle-2">The Reclass System automates reclassification requests for school
                    personnel
                    (T2, T3, MT, HT, and Principal) from application to approval, providing real-time status updates. It
                    streamlines the process, eliminates paperwork, and supports remote work by allowing access to
                    voluminous
                    supporting documents.</h6>

                  <v-btn class="mt-4" size="small" variant="outlined" disabled dark>Review</v-btn>
                </div>

                <v-avatar class="px-4 pb-4" size="128" rounded="0">
                  <v-img class="ma-2" src="/NCR.png" />
                </v-avatar>
              </div>
            </v-card>
          </v-col>

        </v-row></v-card-text>
    </v-card>
  </v-sheet>
</template>


<script lang="ts" setup>
import useAuth from "~/store/auth";

const { $rest } = useNuxtApp();
const auth = useAuth();
const user = useAuth().user;


definePageMeta({ layout: "std-systems" });

onBeforeMount(async () => {
  load_profile_completion();
  get_sdo();

});


const sdo = ref([]);
const selected_sdo = ref("");
async function get_sdo() {
  const { data, error } = await $rest('new-applicant/get-all-sdo', {
    method: "GET"
  });
  sdo.value = data;

};

const table_headers = ref([
  { title: "Applicant Name", key: "full_name", sortable: false },
  { title: "School", key: "school", sortable: false },
  { title: "Division", key: "division", sortable: false },
  { title: "Position", key: "position", sortable: false },
  { title: "Control Number", key: "control_number", sortable: false },
  { title: "Status", key: "status", sortable: false },
]);



async function load_profile_completion() {
  loading_profile_completion.value = true;
  const { data } = await $rest("auth/profile-completion");
  loading_profile_completion.value = false;
  profile_completion_data.value = data;
}



const greet_state = computed(() => {
  const time = new Date().getHours();

  if (time >= 18) return "Good Evening";
  if (time >= 12) return "Good Afternoon";
  return "Good Morning";
});

const loading_profile_completion = ref(true);
const profile_completion_data = ref(null as any);

const account_state = computed(() => {
  if (!loading_profile_completion) return {};

  const { score, details } = profile_completion_data.value;
  let icon = "shield-error";
  let color = "error";

  if (score > 60) {
    icon = "shield-warn";
    color = "warning";
  }
  if (score >= 100) {
    icon = "shield-ok";
    color = "success";
  }


  return {
    icon,
    is_complete: score >= 100,
    score: `${score}%`,
    color,
    details
  }
})
</script>

<style scoped>
.reclass-title {
  font-family: Times New Roman;
  font-weight: 20px;
  background: #0A17CF;
  background: -webkit-linear-gradient(to right, #0A17CF 8%, #C5CBCF 100%);
  background: -moz-linear-gradient(to right, #0A17CF 8%, #C5CBCF 100%);
  background: linear-gradient(to right, #0A17CF 8%, #C5CBCF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}
</style>