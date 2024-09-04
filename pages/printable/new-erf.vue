<template>
  <div>

    <body class="printable-page">
      <div class="content">
        <commons-header />

        <v-sheet class="mx-5" v-if="erf">
          <h3 class="text-center text-uppercase gont-weight-bold my-2"> Evaluation/List of Requirements for {{
            erf.position
          }}</h3>

          <v-row dense>
            <v-col cols="8">
              <v-row dense>
                <v-col cols="3">TO</v-col>
                <v-col cols="9" class="font-weight-bold">: Director Andaya
                  <hr />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row dense>
                <v-col cols="4">DATE</v-col>
                <v-col cols="8" class="font-weight-bold">:
                  {{ erf?.assignees && erf.assignees.length ?
                    new Date(erf.assignees[2].timestamp).toLocaleDateString('en-US', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric'
                    }) : '' }}
                  <hr />
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="8">
              <v-row dense>
                <v-col cols="3">DIVISION</v-col>
                <v-col cols="9" class="font-weight-bold">: National Capital Region
                  <hr />
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="8">
              <v-row dense>
                <v-col cols="4">Reclassification of</v-col>
                <v-col cols="8" class="font-weight-bold">: {{ erf.full_name }}
                  <hr />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row dense>
                <v-col cols="4">TO</v-col>
                <v-col cols="8" class="font-weight-bold">: {{ erf.position }}
                  <hr />
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <table border="1">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th colspan="10">Details</th>
                    <th colspan="10">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" :key="index">
                    <td>{{ item }}</td>
                    <td colspan="10"></td>
                    <td colspan="10"></td>
                  </tr>
                </tbody>
              </table>


            </v-col>



          </v-row>

          <v-row dense>
            <v-col cols="6">
              <v-row dense>
                <v-col cols="12"> Action Required :</v-col>

                <v-col cols="12">
                  <v-row dense class="d-flex align-center">
                    <v-col cols="1"> <v-checkbox v-model="checkbox" hide-details color="success" /></v-col>
                    <v-col cols="11"> Submission of Lacking Documents</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row dense class="d-flex align-center">
                    <v-col cols="1"> <v-checkbox v-model="checkbox" hide-details color="success" /></v-col>
                    <v-col cols="11"> Correcyion of Entries</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row dense class="d-flex align-center">
                    <v-col cols="1"> <v-checkbox v-model="checkbox" hide-details color="success" /></v-col>
                    <v-col cols="11"> Compliance of Deficiency</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="ml-8">
                  Please Specify
                </v-col>
              </v-row>

            </v-col>
            <v-col cols="6">
              <v-row no-gutters justify="start">
                <v-col cols="12" class="text-left">Assessment:</v-col>
                <v-col cols="12">
                  <v-row dense class="d-flex align-center">
                    <v-col cols="1"> <v-checkbox v-model="checkbox" hide-details color="success" /></v-col>
                    <v-col cols="11"> For Indorsement to Regional Office</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row dense class="d-flex align-center">
                    <v-col cols="1"> <v-checkbox v-model="checkbox" hide-details color="success" /></v-col>
                    <v-col cols="11"> For Return to applicant/school</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>


          <v-row dense justify="end" class="mt-5">
            <v-col cols="5">
              <v-row dense>
                <v-col cols="12"> Evaluated by:</v-col>
                <v-col cols="12" class="text-center font-weight-bold"> {{ erf?.assignees && erf.assignees.length ?
                  erf.assignees[1].name : '' }}
                  <hr />
                </v-col>
                <v-col cols="12" class="text-center"> {{ erf?.assignees && erf.assignees.length ?
                  erf.assignees[1].name : '' }}

                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row dense justify="end" class="mt-5">
            <v-col cols="5">
              <v-row dense>
                <v-col cols="12"> Indorsed by:</v-col>
                <v-col cols="12" class="text-center font-weight-bold"> {{ erf?.assignees && erf.assignees.length ?
                  erf.assignees[1].name : '' }}
                  <hr />
                </v-col>
                <v-col cols="12" class="text-center"> Schools Division Superintendent
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>



      </div>
    </body>
    <div style=" position: fixed; bottom: 20px; right: 20px;" class="d-print-none">
      <v-btn color="primary" icon="mdi-printer" size="large" class="mb-2" @click="print()">
      </v-btn> <br />
      <v-btn icon="mdi-keyboard-return" size="large" @click="$router.back()">
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
import swal from 'sweetalert';
import useAuth from "~/store/auth";

const { $rest } = useNuxtApp()
const route = useRoute();
onBeforeMount(() => {
  Promise.all([
    get_erf()
  ]);


});
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
const checkbox = ref(true)
const attachmentCount = computed(() => erf.value.attachments);

// Table headers start
const erf = ref({})
async function get_erf() {
  const { data, error } = await $rest('new-applicant/get-applicant-erf', {
    method: 'GET',
    query: {
      id: route.query.id
    }
  })
  erf.value = data
}

// const erf = ref({});


// async function get_erf() {
//   const { data, error } = await $rest('sms-position/get-applicant-details', {
//     method: 'GET',
//     query: { id: route.query.id }
//   });

//   erf.value = data;
//    if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
// }

// }

const annual_sg = computed(() => {
  return erf?.value?.current_sg_equivalent ? erf.value.current_sg_equivalent * 12 : null;
});
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
  padding: 3px;
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