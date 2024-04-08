<template>
  <v-sheet class="pa-10">
    <v-card class="pa-10 " rounded="lg" flat>
      <v-card-text> <v-row :class="`${$vuetify.display.mobile ? 'text-center' : ''}`" justify="center" dense>
          <v-col cols="12">
            <h6 class="text-h5 reclass-title">Summary of Reclassification Application/s</h6>

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


definePageMeta({ layout: "std-systems" });

onBeforeMount(async () => {

  get_applicants()
});




const table_headers = ref([
  { title: "Applicant Name", key: "full_name", sortable: false },
  { title: "School", key: "school", sortable: false },
  { title: "Division", key: "division", sortable: false },
  { title: "Position", key: "position", sortable: false },
  { title: "Control Number", key: "control_number", sortable: false },
  { title: "Status", key: "status", sortable: false },
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