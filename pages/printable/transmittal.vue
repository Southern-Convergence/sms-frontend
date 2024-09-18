<template>
  <div>




    <body class="printable-page">
      <div class="content">

        <commons-sdo-header :sdo="erf.division" />


        <v-sheet class="mx-5" v-if="erf">
          <h4 style="font-size: 14px" class="text-center text-uppercase gont-weight-bold my-3"> Evaluation/List of
            Requirements for {{
              erf.position
            }}</h4>
          <v-row no-gutters>

            <v-col cols="8">
              <v-row no-gutters>
                <v-col cols="3">TO</v-col>
                <v-col cols="9" class="font-weight-bold">: {{ rd?.rd?.first_name }} {{
                  rd?.rd?.middle_name }} {{
                    rd?.rd?.last_name }}
                  <hr />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row no-gutters>
                <v-col cols="3">DATE</v-col>
                <v-col cols="9" class="font-weight-bold">:
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
                <v-col cols="3">TO</v-col>
                <v-col cols="9" class="font-weight-bold">: {{ erf.position }}
                  <hr />
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row dense>

            <v-col cols="12">

              <table border="1">
                <thead>
                  <tr class="font-weight-bold">
                    <th width="200px">Who will prepare</th>
                    <th width="350px">Requirements</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>

                  <tr v-for="(attachment, index) in Object.values(erf?.attachments || {})" :key="index">
                    <td class="pa-1" v-if="index === 0" :rowspan="Object.values(erf?.attachments || {}).length">
                      Teacher Applicant/School
                    </td>
                    <td class="pa-1">{{ attachment?.description }}</td>

                    <td class="text-center">Completed</td>
                  </tr>

                  <!-- Additional static rows if needed -->
                  <tr>
                    <td class="pa-1">Schools Divisions Office</td>
                    <td class="pa-1"> <span v-if="erf?.assignees && erf?.assignees[2].pal"> Plantilla Allocation
                        List</span></td>
                    <td class="text-center"> <span v-if="erf?.assignees && erf?.assignees[2].pal">Completed </span></td>
                  </tr>
                </tbody>
              </table>

            </v-col>






          </v-row>

          <v-row dense justify="center" class="mx-5">
            <v-col cols="6">
              <v-row dense>
                <v-col cols="12" class="font-weight-bold"> Action Required :</v-col>

                <v-col cols="12">
                  <v-row dense class="d-flex align-center">
                    <v-col cols="1" class="ma-0 pa-0"> <v-checkbox hide-details color="success" /></v-col>
                    <v-col cols="11"> Submission of Lacking Documents</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row dense class="d-flex align-center">
                    <v-col cols="1" class="ma-0 pa-0"> <v-checkbox hide-details color="success" /></v-col>
                    <v-col cols="11"> Correcyion of Entries</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row dense class="d-flex align-center">
                    <v-col cols="1" class="ma-0 pa-0"> <v-checkbox hide-details color="success" /></v-col>
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
                <v-col cols="12" class="text-left font-weight-bold">Assessment:</v-col>
                <v-col cols="12">
                  <v-row no-gutters class="d-flex align-center ">
                    <v-col cols="1" class="ma-0 pa-0"> <v-checkbox v-model="checkbox" hide-details
                        color="success" /></v-col>
                    <v-col cols="11"> For Indorsement to Regional Office</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row no-gutters class="d-flex align-center">
                    <v-col cols="1" class="ma-0 pa-0"> <v-checkbox hide-details color="success" /></v-col>
                    <v-col cols="11"> For Return to applicant/school</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>


          <v-row dense justify="end" class="mt-2">
            <v-col cols="5">
              <v-row dense>
                <v-col cols="12"> Evaluated by:</v-col>

                <v-col cols="12">
                  <v-img :width="197" height="3vh" :src="erf?.sdo_admin4_esig" />

                </v-col>
                <v-col cols="12" class="text-center font-weight-bold text-uppercase"> {{ erf?.sdo_admin4_name ?
                  erf?.sdo_admin4_name : "" }}
                  <hr />
                </v-col>
                <v-col cols="12" class="text-center"> Administrative Officer IV
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row dense justify="end" class="mt-5">
            <v-col cols="5">
              <v-row dense>
                <v-col cols="12"> Indorsed by:</v-col>
                <v-col cols="12" class="text-center font-weight-bold text-uppercase"> {{ sds.first_name }} {{
                  sds.middle_name
                    ? sds.middle_name.charAt(0).toUpperCase() + '.' : "" }} {{
                    sds.last_name }} {{ sds.suffix ? sds.suffix : "" }} {{ sds.ces_rank ? sds.ces_rank : "" }}
                  <hr />
                </v-col>
                <v-col cols="12" class="text-center"> {{ sds.position }}
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
    get_erf(),
    get_rd(),
    get_sds()
  ]);



});

const checkbox = ref(true)
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


const attachmentList = computed(() =>
  erf.value.attachments ? Object.values(erf.value.attachments) : []
);
const annual_sg = computed(() => {
  return erf?.value?.current_sg_equivalent ? erf.value.current_sg_equivalent * 12 : null;
});

const rd = ref({} as Rd)
async function get_rd() {
  const { data, error } = await $rest('sms-rd/get-rd', {
    method: "GET",
  })
  rd.value = data
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
}
const sds = ref({} as Sds)
async function get_sds() {
  const { data, error } = await $rest('sms-sds/get-sds', {
    method: "GET",
  })
  sds.value = data
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
}

function print() {
  window.print();
}
const display_indorsement = () => {
  const acceptableStatuses = [
    "Approved for Printing",
    "Received Printout/s",
    "For DBM",
    "Completed"
  ];
  const status = erf?.value?.status;
  return acceptableStatuses.includes(status);
};





</script>
<style scoped>
.printable-page {
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
}

* {
  font-size: 11px
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