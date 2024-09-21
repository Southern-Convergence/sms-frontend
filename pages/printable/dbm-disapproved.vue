<template>
  <v-container>
    <div class="d-print-none">
      <v-row justify="center">
        <v-col cols="6" class="d-flex ">
          <v-select v-if="user.side === 'RO'" label="Filter by SDO" v-model="selected_sdo" :items="sdo" item-value="_id"
            persistent-hint clearable />
          <v-select label="Filter by Position" :items="positions" v-model="selected_position" item-value="_id"
            persistent-hint clearable class="px-2" />
          <v-select label="Filter by year" persistent-hint clearable v-model="selected_year" :items="years"
            :menu-props="{ closeOnContentClick: false }" @change="custom_year" :allow-overflow="true">
            <template v-slot:append-item>
              <v-text-field class="mx-2" variant="underlined" v-model="added_year" label="Specify Year"
                @input="add_year_items" hide-details />
            </template>
          </v-select>
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
                  <th> NAME</th>
                  <th>SDO</th>
                  <th>FROM</th>
                  <th>TO</th>
                  <th>DATE APPLIED</th>

                </tr>

              </thead>
              <tbody>

                <tr v-for="app, index in applicants" :key="app">
                  <td> {{ index + 1 }}. {{ app.full_name }}</td>
                  <td>{{ app.control_number }}</td>
                  <td class="text-center"> {{ app.division }} </td>
                  <td class="text-center"> {{ app.current_position }}</td>
                  <td class="text-center"> {{ app.position }}</td>
                  <td class="text-center">{{ new Date(app.created_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: '2-digit', year: 'numeric'
                  }) }}</td>


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

  </v-container>
</template>

<script lang="ts" setup>
import useAuth from "~/store/auth";
const { $rest } = useNuxtApp();
const auth = useAuth();
const user = useAuth().user;
const router = useRouter();
onBeforeMount(() => {
  get_sdo();
  get_dashboard();
  get_position()
});

const selected_year = ref(null);
const added_year = ref('');
const years = ref([2024, 2025, 2026]);

const custom_year = (year: any) => {
  if (!years.value.includes(year)) {
    added_year.value = year;
  }
};
const add_year_items = () => {
  if (added_year.value) {
    selected_year.value = added_year.value;
  }
};
const applicants = ref([]);
async function get_dashboard() {
  if (user.side === 'SDO') {
    user.division = selected_sdo.value
  }
  const payload = {
    sdo: selected_sdo.value,
    position: selected_position.value,
    // sy: Number(selected_year.value)
  };
  const { data, error } = await $rest('new-applicant/get-dashboard', {
    method: "GET",
    query: payload,
  });
  const filtered_approved = data.filter((applicant: any) => !applicant.approved && applicant.status === 'Completed');
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

const positions = ref([]);
const selected_position = ref("");
async function get_position() {
  const { data, error } = await $rest('new-applicant/get-all-position', {
    method: "GET"
  });

  positions.value = data;

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

  }

  .printable-page {

    margin: 0 auto;
    box-shadow: none;


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