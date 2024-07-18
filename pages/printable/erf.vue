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
                  <tr v-for="sr, index in erf?.service_record" :key="index">
                    <td>{{ sr.designation }}</td>
                    <td>{{ sr.from }}</td>
                    <td>{{ sr.to }}</td>

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