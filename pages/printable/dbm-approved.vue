<template>
  <div>
    <div class="notprintable">
      <v-row class="mt-5">

        <v-col cols="6" class="d-flex"> <v-select label="Filter by SDO" v-model="selected_sdo" :items="sdo"
            item-value="_id" persistent-hint clearable />
          <v-btn @click="get_dashboard" class="ml-2 mt-1" color="primary">
            <v-icon class="pr-1">mdi-filter</v-icon>Filter</v-btn>
        </v-col>
      </v-row>
    </div>
    <div class="notprintable" v-if="!applicants.length">
      <v-alert icon="mdi-alert-circle" title="No Data Found" text="There are no approved reclassifications by DBM."
        type="error" variant="tonal"></v-alert>
    </div>


    <body class="printable-page" v-else>
      <div class="content">
        <commons-header />
        <v-sheet class="ma-5">
          <h3 class="text-center">Summary of Reclassifications Approved by DBM</h3>

          <v-sheet class="mt-5" border>
            <table>
              <thead>
                <tr>
                  <th> CONTROL NUMBER</th>
                  <th> NAMES</th>
                  <th>SCHOOL DIVISION OFFICE</th>
                  <th>POSITION</th>
                  <th>DATE APPLIED</th>

                </tr>

              </thead>
              <tbody>

                <tr v-for="app, index in applicants" :key="app">
                  <td>{{ app.control_number }}</td>
                  <td> {{ app.full_name }}</td>
                  <td class="text-center"> {{ app.division }} </td>
                  <td class="text-center"> {{ app.position }}</td>
                  <td class="text-center"> {{ app.created_date }} </td>

                </tr>
              </tbody>
            </table>
          </v-sheet>
        </v-sheet>

      </div>
    </body>



    <div style="position: fixed; bottom: 20px; right: 20px;" class="d-print-none">
      <v-btn icon="mdi-printer" fixed fab color="primary" size="large" class="mb-2" @click="print()">
      </v-btn> <br />
      <v-btn icon="mdi-keyboard-return" fixed fab size="large" @click="$router.back()">
      </v-btn>
    </div>

  </div>
</template>

<script lang="ts" setup>
const router = useRouter();


const { $rest } = useNuxtApp()
onBeforeMount(() => {
  get_sdo();
  get_dashboard()
});

const applicants = ref([]);
async function get_dashboard() {
  const payload = {
    sdo: selected_sdo.value
  };
  const { data, error } = await $rest('new-applicant/get-dashboard', {
    method: "GET",
    query: payload,
  });
  const filtered_approved = data.filter((applicant: any) => applicant.approved && applicant.status === 'Completed');
  applicants.value = filtered_approved
}

const sdo = ref([]);
const selected_sdo = ref("");
async function get_sdo() {
  const { data, error } = await $rest('new-applicant/get-all-sdo', {
    method: "GET"
  });
  sdo.value = data;

}
function print() {
  window.print();
}

</script>
<style scoped>
.printable-page {
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);


}

.notprintable {
  margin: 0 auto;
  width: 210mm;
}


* {
  font-size: 13px
}


table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border: 1px solid black;
}

td,
th {
  border: 1px solid black;
  padding: 6px;
  font-size: 12px;
  line-height: normal;
  word-break: break-word;
  font-weight: normal;
}

tr,
th {
  font-weight: bold;
}

.row-value {
  display: block;
  font-size: 8px;
  margin-bottom: 5px;
  padding-right: 5px;
}

@media print {
  body {
    margin: 0;
    /* Reset margin for printing */
  }
}

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;

}


.centered-table {
  text-align: center;
}
</style>