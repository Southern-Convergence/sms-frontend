<template>
  <div class="mx-auto">
    <v-sheet>
      <v-toolbar height="25vh">
        <v-card-title class="text-h5">
          List of Reclassification Application
          <v-card-subtitle>A brief overview of a reclassification request Schools Division Office.</v-card-subtitle>
        </v-card-title>

        <v-spacer></v-spacer>
        <v-text-field prepend-inner-icon="mdi-magnify" hide-details bg-color="indigo-lighten-5" density="compact" dense />
        <v-btn icon>
          <v-icon>mdi-settings</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs color="indigo-accent-1" v-model="tab" align-tabs="title">
            <v-tab v-for="status in tabItems" :key="status.value" :value="status.value">
              {{ status.label }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-window v-model="tab">
        <v-window-item v-for="status in tabItems" :key="status.value" :value="status.value">
          <v-card-text class="overflow-y-auto" style="height: 65vh">
            <v-row dense>

              <v-col cols="12" xxl="4" xl="4" lg="6" v-for="pending in get_applicant_by_status(status.value)"
                :key="pending">
                <v-card class="mx-auto" variant="outlined" color="indigo">
                  <v-card-item>
                    <div>
                      <div class="text-overline mb-1">
                        Control Number : <b>{{ pending.control_number }}</b>
                      </div>
                      <div class="text-body-1 mb-1">
                        Position : <b>{{ pending.position }}</b>
                      </div>
                      <div class="text-body-2"> Name : <b class="text-capitalize">{{ pending.full_name }}</b></div>
                      <div class="text-body-2"> School : {{ pending.school }}</div>
                      <div class="text-body-2"> Division : {{ pending.division }}</div>
                    </div>
                  </v-card-item>
                  <v-card-actions>
                    <v-tooltip location="top" text="Click to view full application">
                      <template v-slot:activator="{ props }">
                        <v-btn density="compact" variant="tonal" v-bind="props" @click="load_erf_form(pending._id)">
                          View Application
                        </v-btn>
                      </template>
                    </v-tooltip>
                    <v-spacer />
                    <span> Status : <v-chip class="font-weight-bold">{{ pending.status }} </v-chip></span>
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

<script setup>
const router = useRouter();
definePageMeta({ layout: "std-systems" });
const { $rest } = useNuxtApp();
onBeforeMount(() => {
  get_application();
});
const tab = ref(null);

const tabItems = ref([
  { label: 'For Signature', value: 'For Signature' },
  { label: 'Pending', value: 'Pending' },
  { label: 'For Evaluation', value: 'For Evaluation' },
  { label: 'For Checking', value: 'For Checking' },
  { label: 'Verifying', value: 'Verifying' },
  { label: 'Recommending for Approval', value: 'Recommending for Approval' },
  { label: 'Approval', value: 'Approval' },
  { label: 'Disapproved', value: 'Disapproved' },
]);

const application_data = ref([]);
async function get_application() {
  const { data, error } = await $rest('new-applicant/get-application', {
    method: "GET"
  });
  application_data.value = data;
}

const get_applicant_by_status = (status) => {
  return application_data.value.filter((i) => i.status === status);
}

const load_erf_form = (id) => {
  router.push({
    name: 'sms-erf-form',
    query: {
      id: id
    }
  });
}
</script>

