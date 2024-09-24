<template>
  <v-sheet>
    <v-card class="pa-10 " rounded="lg" flat>
      <v-card-text>
        <v-row :class="`${$vuetify.display.mobile ? 'text-center' : ''}`" dense>
          <v-col cols="12">
            <h6 class="text-h5 text-primary">Summary of Reclassification Application/s</h6>

            <h6 class="text-subtitle-2 text-medium-emphasis  ">View reclassification applications.
            </h6>
            <v-divider class="mt-4 mb-2" />
          </v-col>
          <v-col cols="2" v-if="user.side === 'RO'" class="d-flex">
            <v-select label="Filter by SDO" v-model="selected_sdo" :items="sdo" item-value="_id" persistent-hint
              clearable />

          </v-col>
          <v-col cols="2"> <v-select label="Filter by status" v-model="selected_status" :items="statuses"
              persistent-hint clearable /></v-col>
          <v-col cols="2"> <v-btn @click="get_applicants" class="ml-2 mt-1" color="primary">
              <v-icon class="pr-1">mdi-filter</v-icon>Filter</v-btn></v-col>
        </v-row>

        <v-row dense>

          <v-col cols="12">

            <v-sheet border>
              <v-data-table :headers="table_headers" :items="applicants">
                <template v-slot:item.created_date="{ item }">
                  <span class="text-primary">{{ new Date(item.selectable.created_date).toLocaleDateString('en-US', {
                    year: 'numeric', month:
                      '2-digit', day: '2-digit'
                  }) }}</span>
                </template>
                <template v-slot:item.control_number="{ item }">
                  <span class="text-primary">{{ item.selectable.control_number }}</span>
                </template>
                <template v-slot:item.status="{ item }">
                  <v-chip color="success" variant="outlined">{{ item.selectable.status }}</v-chip>
                </template>
                <template v-slot:item.approved="{ item }">
                  <v-chip
                    :color="item.selectable.approved === true ? 'success' : (item.selectable.approved === false ? 'red' : 'amber')"
                    variant="outlined">
                    {{ item.selectable.approved === true ? 'Approved' : (item.selectable.approved === false ?
                      'Disapproved' : 'Pending') }}
                  </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn class="mr-1" color="teal" density="compact" @click="load_history_form(item.selectable._id)"
                    prepend-icon="mdi-history"> History
                  </v-btn>
                  <v-btn color="primary" density="compact" @click="load_erf_form(item.selectable._id)"
                    prepend-icon="mdi-eye"> See more
                  </v-btn>
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
  get_applicants();
  get_sdo();
});

const statuses = ref(["For Signature", "Pending", "For Evaluation", "For Checking", "RO Pending", "Approved for Printing", "Received Printout/s", "For DBM", "Completed"])
const table_headers = ref([
  { title: "Date Applied", key: "created_date", sortable: false },
  { title: "Applicant Name", key: "full_name", sortable: false },
  { title: "Division", key: "division", sortable: false },
  { title: "Position", key: "position", sortable: false },
  { title: "Control Number", key: "control_number", sortable: false },

  { title: "Status", key: "status", sortable: false },
  { title: "DBM Status", key: "approved", sortable: false },
  { title: "Actions", key: "actions", sortable: false },
]);

const applicants = ref([]);

const sdo = ref([]);
const selected_sdo = ref("");
const selected_status = ref("")
async function get_sdo() {
  const { data, error } = await $rest('new-applicant/get-all-sdo', {
    method: "GET"
  });
  sdo.value = data;

};

async function get_applicants() {
  let division = user.division;
  const side = user.side;

  if (side === 'SDO') {
    division = user.division;
  } else {
    division = selected_sdo.value;
  }

  const payload = {
    sdo: division,
    status: selected_status.value,
  };

  const { data, error } = await $rest('new-applicant/get-dashboard', {
    method: "GET",
    query: payload,
  });
  applicants.value = data.slice().reverse()

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
}


const load_erf_form = (id: any) => {
  router.push({
    name: 'sms-erf',
    query: {
      id: id,
      display: 'true'
    }
  });
}
const load_history_form = (id: any) => {
  router.push({
    name: 'sms-applicant-history',
    query: {
      id: id
    }
  });
}

</script>
