<template>
  <div class="mx-auto">
    <v-sheet>
      <v-window v-model="tab">
        <v-window-item v-for=" status  in  tabItems " :key="status.value" :value="status.value">
          <v-card-text class="overflow-y-auto">
            <v-sheet class="pa-6" height="auto" color="indigo">
              <v-row no-gutters>
                <v-col cols="9" class="text-h5  text-white">List of Reclassification Application <br /> <span
                    class="text-subtitle-2 text-grey-lighten-2">A
                    brief overview of reclassification applications.</span>
                </v-col>
                <v-col cols="3" class="text-grey d-flex">
                  <v-text-field prepend-inner-icon="mdi-magnify" label="Search Control Nmmber" density="compact"
                    hide-details variant="solo" bg-color="grey-lighten-3" />
                  <v-btn icon="mdi-settings" class="ma-1" variant="plain">
                    <v-icon size="36" color="blue">mdi-settings</v-icon> </v-btn>
                </v-col>
              </v-row>
            </v-sheet>

            <commons-qad :title="`${status.value} Reclass Application`" icon="mdi-note-text-outline"
              :items="get_applicant_by_status(status.value)" :display_types="['grid', 'list', 'table']">
              <template v-slot:item="{ value, index, display }">
                <v-sheet elevation="2" @click="load_erf_form(value._id)" v-bind="props" class="mx-auto reclass-item"
                  :class="{ 'elevation-4': is_hovered }"
                  v-if="get_applicant_by_status(status.value).some(applicant => Object.keys(applicant).length > 0)">
                  <v-card-text>

                    <div class="d-flex mt-1">
                      <div class="pr-3"><v-img :width="80" aspect-ratio="4/3" cover src="/yanyan.jpg"></v-img></div>
                      <div>
                        <div class="text-body-1 font-weight-bold">
                          {{ value.first_name }} {{ value.last_name }}
                        </div>
                        <div class="mb-1 text-body-2 text-grey"> {{ value.position }}
                        </div>
                        <div class=" text-body-2"> School : {{ value.school }}</div>
                        <div class=" text-body-2"> Division : {{ value.division }}</div>
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="text-overline d-flex ">
                        Control Number : <b class="text-success">{{ value.control_number }}</b>
                      </div> <v-spacer /> <v-chip color="success">{{ value.status
                      }}</v-chip>
                    </div>
                  </v-card-text>
                </v-sheet>

              </template>
            </commons-qad>
            <!-- <v-row dense
              v-if="get_applicant_by_status(status.value).some(applicant => Object.keys(applicant).length > 0)">
              <v-col cols="12" xxl="4" xl="4" lg="4" v-for=" pending  in  get_applicant_by_status(status.value) "
                :key="pending">
                <v-tooltip text="Click card to view more details" location="top">
                  <template v-slot:activator="{ props }">
                    <v-sheet elevation="2" @click="load_erf_form(pending._id)" v-bind="props" class="mx-auto reclass-item"
                      :class="{ 'elevation-4': is_hovered }">
                      <v-card-text>

                        <div class="d-flex mt-1">
                          <div class="pr-3"><v-img :width="80" aspect-ratio="4/3" cover src="/yanyan.jpg"></v-img></div>
                          <div>
                            <div class="text-body-1 font-weight-bold">
                              {{ pending.first_name }} {{ pending.last_name }}
                            </div>
                            <div class="mb-1 text-body-2 text-grey"> {{ pending.position }}
                            </div>
                            <div class=" text-body-2"> School : {{ pending.school }}</div>
                            <div class=" text-body-2"> Division : {{ pending.division }}</div>
                          </div>
                        </div>
                        <div class="d-flex">
                          <div class="text-overline d-flex ">
                            Control Number : <b class="text-success">{{ pending.control_number }}</b>
                          </div> <v-spacer /> <v-chip color="success">{{ pending.status
                          }}</v-chip>
                        </div>
                      </v-card-text>
                    </v-sheet>
                  </template>
                </v-tooltip>
              </v-col>
            </v-row> -->
            <!-- <v-row dense justify="center" v-else>
              <v-sheet height="70vh" class="d-flex align-center justify-center ">
                <v-alert class="align-center justify-center">

                  <h4> No pending application requests at the moment.</h4>

                </v-alert>
              </v-sheet> 
            </v-row>-->
          </v-card-text>
        </v-window-item>
      </v-window>
    </v-sheet>
  </div>
</template>

<script setup>
const router = useRouter();
definePageMeta({ layout: "std-systems" });
const { $rest } = useNuxtApp();
onBeforeMount(() => {
  get_application();
});
const tab = ref(null);
const is_hovered = ref(false);
const tabItems = ref([
  { label: 'For Signature', value: 'For Signature' },
  { label: 'Pending', value: 'Pending' },
  { label: 'For Evaluation', value: 'For Evaluation' },
  { label: 'For Checking', value: 'For Checking' },
  { label: 'Verifying', value: 'For Verifying' },
  { label: 'Recommending for Approval', value: 'Recommending for Approval' },
  { label: 'For Approval', value: 'For Approval' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Disapproved', value: 'Dissapproved' },
]);

const application_data = ref([]);
async function get_application() {
  const { data, error } = await $rest('new-applicant/get-application', {
    method: "GET"
  });
  application_data.value = data;
}

const get_applicant_by_status = (status) => {
  return application_data.value && application_data.value.length > 0
    ? application_data.value
    : [];
};

const load_erf_form = (id) => {
  router.push({
    name: 'sms-erf-form',
    query: {
      id: id
    }
  });
}

</script>

<style scoped>
.reclass-item {
  transition: background-color 0.3s ease-in-out;
}

.reclass-item:hover {
  background-color: #E8EAF6;

}
</style>