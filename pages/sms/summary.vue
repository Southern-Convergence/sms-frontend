<template>
  <v-sheet class="pa-5">
    <v-card rounded="lg" flat>
      <v-card-text> <v-row :class="`${$vuetify.display.mobile ? 'text-center' : ''}`" justify="center" dense>
          <v-col cols="12">
            <h6 class="text-h5 text-primary">Summary of Reclassification Application/s</h6>

            <h6 class="text-subtitle-2 text-medium-emphasis  ">View reclassification applications.
            </h6>
            <v-divider class="mt-4 mb-2" />
          </v-col>

        </v-row>
        <v-row>

          <v-col cols="12">
            <v-sheet border>
              <v-data-table :headers="table_headers" :items="applicants">
                <template v-slot:item.control_number="{ item }">
                  <span class="text-primary">{{ item.selectable.control_number }}</span>
                </template>
                <template v-slot:item.status="{ item }">
                  <v-chip color="success" variant="text">{{ item.selectable.status }}</v-chip>
                </template>
                <!-- <template v-slot:item.approved="{ item }">
                  <v-chip color="success" variant="text">{{ item.selectable.approved ? 'Approved' : 'Disapproved'
                    }}</v-chip>
                </template> -->
                <template v-slot:item.actions="{ item }">
                  <v-btn color="primary" density="compact" @click="load_erf_form(item.selectable._id)"> View</v-btn>
                </template>
              </v-data-table>
            </v-sheet>
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
const router = useRouter();

definePageMeta({ layout: "std-systems" });
onBeforeMount(async () => {
  get_applicants()
});




const table_headers = ref([
  { title: "Applicant Name", key: "full_name", sortable: false },
  { title: "Division", key: "division", sortable: false },
  { title: "Position", key: "position", sortable: false },
  { title: "Control Number", key: "control_number", sortable: false },

  { title: "Status", key: "status", sortable: false },
    //  { title: "DBM Status", key: "approved", sortable: false },
  { title: "Actions", key: "actions", sortable: false },
]);

const applicants = ref([]);
async function get_applicants() {
  const payload = {
    sdo: user.division
  };
  const { data, error } = await $rest('new-applicant/get-dashboard', {
    method: "GET",
    query: payload,
  });
  applicants.value = data;
}
const load_erf_form = (id: any) => {
  router.push({
    name: 'sms-erf',
    query: {
      id: id
    }
  });
}


</script>
