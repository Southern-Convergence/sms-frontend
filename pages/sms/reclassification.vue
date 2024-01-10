<template>
  <div class="mx-auto">
    <v-sheet>
      <v-toolbar class="pt-2" color="indigo">
        <v-toolbar-title>List of Reclassification Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field prepend-inner-icon="mdi-magnify" hide-details variant="underlined" density="compact" dense />
        <v-btn icon>
          <v-icon>mdi-settings</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs color="indigo-accent-1" v-model="tab" fixed-tabs>
            <v-tab v-for=" status  in  tabItems " :key="status.value" :value="status.value">
              {{ status.label }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-window v-model="tab">
        <v-window-item v-for=" status  in  tabItems " :key="status.value" :value="status.value">
          <v-card-text class="overflow-y-auto">
            <v-row dense>
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
                              {{ pending.full_name }}
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
  load_request();
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
  { label: 'Approved', value: 'Approved' },
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

const load_request = async () => {

  const { data, error } = await $rest("new-applicant/get-requests", { method: "GET" });
  console.log(data);
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