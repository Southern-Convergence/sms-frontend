<template>
  <div>

    <body class="printable-page">
      <div class="content">
        <commons-header />
        <v-sheet class="mx-5" v-if="erf">
          <v-row no-gutters class="ma-2">
            <v-col cols="6">Name : <b>{{ erf.full_name }} </b>
            </v-col>
            <v-col cols="6">Date of Birth : <b>
                {{ new Date(erf?.personal_information?.birthday).toLocaleDateString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric'
                }) }}
              </b>
            </v-col>
            <v-col cols="6">Employee Number : <b>{{ erf?.designation?.plantilla_no }} </b></v-col>
            <v-col cols="6">Authorized Position Title : <b>
                {{ erf?.designation?.current_position }}
              </b></v-col>
            <v-col cols="6">Item Number : <b>{{ erf?.designation?.item_no }} </b> </v-col>
            <v-col cols="6">Authorized Salary : <b> {{ erf?.current_sg }}</b></v-col>
          </v-row>

          <v-sheet class="mx-2 ml-5">
            <span class="font-weight-bold  text-uppercase" density="compact">
              I. Education Attainment and Civil Service Eligibility
            </span>
            <v-sheet border>
              <table>
                <thead>
                  <tr>
                    <th> Title, Degree Highest <br /> Grade Attained </th>
                    <th>Name of Institution</th>
                    <th>Year <br /> Received</th>
                    <th>Board <br /> Examination </th>
                    <th> Rating</th>
                    <th>Date</th>
                  </tr>

                </thead>
                <tbody>
                  <tr v-for="educ, index in erf?.educational_attainment" :key="index">
                    <td>{{ educ.degree }}</td>
                    <td>{{ educ.institution }}</td>
                    <td>{{ educ.year_received }}</td>
                    <td>{{ educ.board_exam }}</td>
                    <td>{{ educ.rating }}</td>
                    <td>{{ educ.date }}</td>
                  </tr>
                </tbody>
              </table>
            </v-sheet>
          </v-sheet>

          <v-sheet class="ma-2 ml-15">
            <span class="font-weight-bold  text-uppercase " density="compact">
              II. Service Record
            </span>
            <v-sheet class="mb-2" border width="70%">
              <table>
                <thead>
                  <tr>
                    <th>Position/Designation</th>
                    <th> From</th>
                    <th>To</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-if="erf?.service_record">
                    <td> {{ erf?.service_record[0]?.designation }}</td>
                    <td> {{ erf?.service_record[0]?.from }}</td>
                    <td>{{ erf?.service_record[erf?.service_record.length - 1]?.to }}</td>

                  </tr>
                </tbody>
              </table>

            </v-sheet>
            <span class="font-weight-bold text-uppercase ">
              III. EQUIVALENT UNITS
            </span>
          </v-sheet>

          <v-sheet class="ma-2 ml-15">
            <span class="font-weight-bold  " density="compact">
              A. Total Number of Years Teaching
            </span>
            <v-sheet width="50%">
              <table>
                <thead>
                  <tr>
                    <th> Public Schools</th>
                    <th>Private Schools</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {{ erf?.equivalent_unit?.public_years_teaching }}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>

            </v-sheet>
          </v-sheet>
          <v-sheet class="ma-2 ml-15">
            <span class="font-weight-bold  ">
              B. Degree to Degree Equivalent
            </span>
            <v-sheet width="70%">

            </v-sheet>
          </v-sheet>
          <v-sheet class="ma-2 ml-15">
            <span class="font-weight-bold  "> C. Areas of Equivalent</span> <br />
            <span class="ml-15 ">
              1. Professional Study :
            </span>
            <v-sheet class="ml-15" border width="70%">
              <table>
                <thead>
                  <tr>
                    <th> School Year</th>
                    <th>Number of Units</th>
                    <th>Description</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(prof, index) in erf?.professional_study" :key="index">
                    <td>{{ prof.sy ? prof.sy : '&nbsp;' }} </td>
                    <td>{{ prof.unit_no }} </td>
                    <td>{{ prof.description }} </td>
                  </tr>
                </tbody>

              </table>
            </v-sheet>
          </v-sheet>
          <v-sheet class="ma-2 ml-15 ">
            <span class="ml-15 ">
              2. Teaching Experience :
            </span>

            <v-sheet class="ml-15" border width="70%">
              <table>
                <thead>
                  <tr>
                    <th> Public Schools</th>
                    <th>Private Schools</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {{ erf?.yt_equivalent }}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </v-sheet>

          </v-sheet>
          <v-row no-gutters class="ml-15 mt-1">
            LATEST IPCRF RATING : <div style="border-bottom: 1.5px solid black" class="px-2"> {{
              erf?.designation?.ipcrf_rating }}
            </div>
          </v-row>

          <div class="d-flex mt-4">
            <div class="w-50 text-center px-5">

              <div class="w-100" style="display: grid; place-items: center;">
                <v-img :width="197" height="3vh" :src="erf?.principal?.signature" />
              </div>
              <div class="text-center text-uppercase font-weight-bold"> {{ erf?.principal?.name }} </div>
              <hr />
              <center> School Principal </center>

            </div>

            <div class="w-50 justify-center  px-5">
              <div class="w-100" style="display: grid; place-items: center;">
                <v-img :width="197" height="3vh" :src="erf?.personal_information?.signature" />
              </div>
              <div class="text-center text-uppercase font-weight-bold">{{ erf?.full_name }}</div>
              <hr />
              <center> Teacher </center>
            </div>
          </div>
          <div>
            <div>IV. DIVISION OFFICE ACTION</div>
            <table>
              <thead>
                <tr>
                  <th> Classification</th>
                  <th>Date Processed</th>
                  <th>Range Assignment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> {{ erf?.position }}</td>
                  <td> {{ erf?.assignees && erf.assignees.length ?
                    new Date(erf.assignees[2].timestamp).toLocaleDateString('en-US', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric'
                    }) : '' }}</td>
                  <td></td>
                </tr>
              </tbody>

              <thead>
                <tr>
                  <th>Salary Grade</th>
                  <th>Annual Salary</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>

                  <td>{{ erf?.current_sg }}</td>
                  <td v-if="annual_sg">{{ annual_sg.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' }) }}
                  </td>


                  <td></td>
                </tr>
              </tbody>
            </table>

          </div>
          <div class="d-flex my-2">

            <div class="w-50 justify-center  px-5">
              <div class="w-100" style="display: grid; place-items: center;">
                <v-img :width="197" height="3vh" />
              </div>
              <v-sheet class="text-center text-uppercase font-weight-bold" height="2vh"></v-sheet>
              <hr />
              <center> School Division Superintendent </center>
            </div>

            <div class="w-50 justify-center  px-5">
              <!-- {{ erf.assignees[2] }} -->

              <div class="w-100" style="display: grid; place-items: center;">
                <v-img :width="197" height="3vh" :src="erf?.sdo_evaluator_esig" />
              </div>
              <div class="text-center text-uppercase font-weight-bold"> {{ erf?.sdo_evaluator_name ?
                erf?.sdo_evaluator_name : '' }}</div>
              <hr />
              <center> Evaluator </center>
            </div>
          </div>
          <div>
            <div>V. REGIONAL OFFICE ACTION</div>
            <table>
              <thead>
                <tr>
                  <th> Classification</th>
                  <th>Date Approved</th>
                  <th>Salary Grade</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td> {{ erf?.position }}</td>
                  <td> {{ erf?.assignees && erf.assignees.length ?
                    new Date(erf.assignees[4].timestamp).toLocaleDateString('en-US', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric'
                    }) : '' }}</td>
                  <td> {{ erf?.qs_sg }}</td>
                </tr>
              </tbody>


            </table>

          </div>
          <div class="d-flex mt-2">

            <div class="w-50 justify-center  px-5">
              <div class="w-100" style="display: grid; place-items: center;">
                <v-img :width="197" height="3vh" />
              </div>
              <v-sheet class="text-center text-uppercase font-weight-bold" height="2vh"></v-sheet>
              <hr />
              <center> Regional Director </center>
            </div>

            <div class="w-50 justify-center  px-5">
              <div class="w-100" style="display: grid; place-items: center;">
                <v-img :width="197" height="3vh" :src="erf?.ro_evaluator_esig" />
              </div>
              <div class="text-center text-uppercase font-weight-bold"> {{ erf?.ro_evaluator_name ?
                erf?.ro_evaluator_name : '' }}</div>
              <hr />
              <center> Evaluator </center>
            </div>
          </div>

        </v-sheet>



      </div>
    </body>


    <body class="printable-page">
      <div class="content">
        <commons-sdo-header :sdo="erf.division" />


        <v-sheet class="mx-5" v-if="erf">
          <h4 style="font-size: 14px" class="text-center text-uppercase gont-weight-bold my-3"> Evaluation/List of
            Requirements for {{
              erf.position
            }}</h4>

          <v-row dense>

            <v-col cols="8">
              <v-row dense>
                <v-col cols="3">TO</v-col>
                <v-col cols="9" class="font-weight-bold">: {{ rd?.rd?.first_name }} {{
                  rd?.rd?.middle_name }} {{
                    rd?.rd?.last_name }}
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
                    <td class="pa-1">PAL</td>
                    <td class="text-center">Completed</td>
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
                    <v-col cols="1"> <v-checkbox hide-details color="success" /></v-col>
                    <v-col cols="11"> Submission of Lacking Documents</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row dense class="d-flex align-center">
                    <v-col cols="1"> <v-checkbox hide-details color="success" /></v-col>
                    <v-col cols="11"> Correcyion of Entries</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row dense class="d-flex align-center">
                    <v-col cols="1"> <v-checkbox hide-details color="success" /></v-col>
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
                  <v-row dense class="d-flex align-center">
                    <v-col cols="1"> <v-checkbox v-model="checkbox" hide-details color="success" /></v-col>
                    <v-col cols="11"> For Indorsement to Regional Office</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row dense class="d-flex align-center">
                    <v-col cols="1"> <v-checkbox hide-details color="success" /></v-col>
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
                <v-col cols="12" class="text-center font-weight-bold"> {{ erf?.assignees && erf.assignees.length ?
                  erf.assignees[1].name : '' }}
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
                <v-col cols="12" class="text-center font-weight-bold"> {{ sds.first_name }} {{ sds.middle_name
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