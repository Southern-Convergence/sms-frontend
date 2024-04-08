<template>
  <v-sheet>
    <v-card class="pa-10" rounded="xl" flat color="transparent">
      <v-card-text> <v-row justify="center" no-gutters>
          <v-col cols="12">
            <h6 class="text-title">Staffing Modification System Dashboard</h6>
            <h6 class="text-subtitle-2 text-medium-emphasis  ">Manage applicationsification metrix and dashboard.
            </h6>
            <v-divider class="mb-2" />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="3" class="d-flex"> <v-select label="Filter by SDO" v-model="selected_sdo" :items="sdo"
              item-value="_id" persistent-hint clearable />
            <v-btn @click="get_dashboard" class="ml-2 mt-1" color="primary">
              <v-icon class="pr-1">mdi-filter</v-icon>Filter</v-btn>
          </v-col>
          <v-spacer />
          <v-col cols="auto"><v-btn variant="tonal" color="error" prepend-icon="mdi-printer"
              @click="dbm_disapproved(selected_sdo)">DBM
              Disapproved</v-btn></v-col>
          <v-col cols="auto"><v-btn @click="dbm_approved(selected_sdo)" variant="tonal" color="success"
              prepend-icon="mdi-printer">DBM
              Approved</v-btn></v-col>
        </v-row>
        <v-row class="mt-0 pt-0">
          <v-col cols="6">
            <v-card class="pa-3 d-flex align-center justify-center h-100" color="primary" variant="tonal" rounded="xl">
              <v-card-text class="d-flex align-center justify-center">
                <div>
                  <b class="text-h5  text-uppercase "> Total Reclass Applications</b>
                  <h6 class="text-h2 py-7 text-center font-weight-bold">
                    {{ applicants.length }}
                  </h6>
                  <h5 class="text-center"> {{ sdo.length }} Schools Division Office</h5>
                </div>
              </v-card-text>
            </v-card></v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="12" xl="6" lg="6">
                <v-card class="pa-3 " color="#29B6F6" rounded="xl">
                  <v-card-text>
                    <div class="justify-space-between">
                      <div>
                        <h3 class="text-white font-weight-regular"> Current For Evaluation</h3>
                        <h6 class="text-h3 pt-5 font-weight-bold text-white">
                          {{ for_evaluation_applicant }}
                        </h6>
                        <h3 class="text-white text-caption font-weight-thin"> {{ for_evaluation_applicant }} of of {{
            applicants.length }} applications </h3>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" xl="6" lg="6">
                <v-card class="pa-3 " color="#512DA8" rounded="xl">
                  <v-card-text>
                    <div class="justify-space-between">
                      <div>
                        <h3 class="text-white font-weight-regular"> Current for DBM</h3>
                        <h6 class="text-h3 pt-5 font-weight-bold text-white">
                          {{ for_dbm_applicant }}
                        </h6>
                        <h3 class="text-white text-caption font-weight-thin"> {{ for_dbm_applicant }} of {{
            applicants.length }} applications
                        </h3>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" xl="6" lg="6">
                <v-card class="pa-3 " color="#9575CD" rounded="xl">
                  <v-card-text>
                    <div class="justify-space-between">
                      <div>
                        <h3 class="text-white font-weight-regular"> Completed</h3>
                        <h6 class="text-h3 pt-5 font-weight-bold text-white">
                          {{ completed_applicant }}
                        </h6>
                        <h3 class="text-white text-caption font-weight-thin"> {{ completed_applicant }} of {{
            applicants.length }} applications
                        </h3>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" xl="6" lg="6">
                <v-card class="pa-3 " color="#E57373" rounded="xl">
                  <v-card-text>
                    <div class="justify-space-between">
                      <div>
                        <h3 class="text-white font-weight-regular"> Pending</h3>
                        <h6 class="text-h3 pt-5 font-weight-bold text-white">
                          {{ pending_applicant }}
                        </h6>
                        <h3 class="text-white text-caption font-weight-thin"> {{ pending_applicant }} of {{
                          applicants.length }} applications
                        </h3>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>



      </v-card-text>
    </v-card>
  </v-sheet>
</template>


<script lang="ts" setup>
const router = useRouter();
const { $rest } = useNuxtApp();
onBeforeMount(() => {

  get_sdo();
  get_dashboard()
});
definePageMeta({ layout: "std-systems" });


const sdo = ref([]);
const selected_sdo = ref("");
async function get_sdo() {
  const { data, error } = await $rest('new-applicant/get-all-sdo', {
    method: "GET"
  });
  sdo.value = data;

};

const applicants = ref([]);
async function get_dashboard() {
  const payload = {
    sdo: selected_sdo.value
  };
  const { data, error } = await $rest('new-applicant/get-dashboard', {
    method: "GET",
    query: payload,
  });
  applicants.value = data;
}

const completed_applicant = computed(() => {
  const completed = applicants.value.filter(applicant => applicant.status === "Completed");
  return completed.length
});
const for_dbm_applicant = computed(() => {
  const for_dbm = applicants.value.filter(applicant => applicant.status === "For DBM");
  return for_dbm.length
});

const pending_applicant = computed(() => {
  const pending = applicants.value.filter(applicant => applicant.status === "Pending");
  return pending.length
});
const for_evaluation_applicant = computed(() => {
  const for_evaluation = applicants.value.filter(applicant => applicant.status === "For Evaluation");
  return for_evaluation.length
});

const dbm_disapproved = (id: string) => {
  router.push({
    name: 'printable-dbm-disapproved',
    query: {
      id: id
    }
  });
}
const dbm_approved = (id: string) => {
  router.push({
    name: 'printable-dbm-approved',
    query: {
      id: id
    }
  });
}


</script>

<style scoped>
.font-roboto {
  font-family: 'Roboto', sans-serif;
  font-size: 20px
}

.text-title {
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: #2b0cc8;
  letter-spacing: 1px;
  margin-bottom: 10px;

}
</style>