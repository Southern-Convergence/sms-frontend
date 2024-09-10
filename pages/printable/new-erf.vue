<template>
  <div>

    <body class="printable-page">
      <div class="content">
        <commons-sdo-header :sdo="erf.division" />

        <v-sheet class="mx-5" v-if="erf">
          <!-- Container for the rows -->
          <div class="d-flex">
            <div class="w-33">
              <div>
                Name: <span class="text-uppercase">{{ erf?.full_name }}</span>
              </div>
              <div style="font-size: 9px;">
                (Surname) (Given Name) (Middle name)
              </div>
            </div>
            <div class="w-33">
              Date of Birth: <span class="text-uppercase">{{ erf?.personal_information?.birthday
                ? new Date(erf?.personal_information?.birthday).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })
                : '' }}</span>
            </div>
            <div class="w-33">
              Sex: <span class="text-uppercase">{{ erf?.personal_information?.gender }}</span>
            </div>
          </div>
          <div class="d-flex">
            <div class="w-33">
              Item No.: <span class="text-uppercase">{{ erf?.designation?.item_no }}</span>
            </div>
            <div class="w-33">
              Authorized Position Title: <span class="text-uppercase">{{ erf?.designation?.current_position }}</span>
            </div>
          </div>
          <div class="d-flex">
            <div class="w-33">
              Employee No.: <span class="text-uppercase">{{ erf?.designation?.employee_no }}</span>
            </div>
            <div class="w-67">
              <div class="d-flex">
                <div class="w-40 d-flex"> N.U.C. No:
                  <span class="pr-15 text-uppercase text-decoration-underline">

                  </span>
                </div>
                <div class="w-70"> Authorized Monthly
                  Salary: <span class="text-uppercase text-decoration-underline">
                    {{ erf?.designation?.current_sg }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="pl-5 mt-2 font-weight-bold"> I. <span class="pl-3 text-uppercase">Education Attainment & Civil
              Service Eligibility</span>
          </div>

          <v-sheet class="w-100" border>
            <table>
              <thead>
                <tr>
                  <th class="w-30"> TITLE DEGREE OR <br />HIGHEST GRADE <br /> ATTAINED</th>
                  <th class="w-25"> NAME OF INSTITUTION</th>
                  <th class="w-15">YEAR <br />RECEIVER</th>
                  <th class="w-10">CIVIL SERVICE <br />EXAMINATION</th>
                  <th class="w-10">RATING</th>
                  <th class="w-10">DATE</th>

                </tr>

              </thead>
              <tbody>

                <tr v-for="education, index in erf?.educational_attainment" :key="index">
                  <td> {{ education?.degree }}</td>
                  <td> {{ education?.institution }}</td>
                  <td> {{ education?.year_received }}</td>
                  <td> {{ education?.board_exam }}</td>
                  <td> {{ education?.rating }}</td>
                  <td> {{ education?.date }}</td>
                </tr>



              </tbody>
            </table>
          </v-sheet>
          <div class="pl-5 mt-2 font-weight-bold">
            <div>II. <span class="pl-7 text-uppercase">Service Records</span></div>
            <div class="pl-10"> Attached duty certified service record</div>
          </div>

          <div class="pl-5">
            <div class="font-weight-bold"> III. <span class="pl-6 text-uppercase">Equivalent Units:</span></div>
            <div class="pl-6">
              <div> A. Total no. of years teacher(public only) <u> {{ erf?.equivalent_unit?.public_years_teaching }}</u>
                Equivalent : <span>{{
                  erf?.equivalent_unit?.public_years_teaching }}</span> </div>
              <div> B. Degree to Degree Equivalent (present degree) Equivalent : </div>
              <div> C. Area of Equivalent</div>
            </div>
          </div>

          <v-sheet class="w-100" border>
            <table>
              <thead>
                <tr>
                  <th width="180px"> </th>
                  <th> SCHOOL YEAR</th>
                  <th width="120px">NO. OF UNITS</th>
                  <th>DESCRIPTION</th>
                </tr>

              </thead>
              <tbody>

                <tr>
                  <td> Professional Study <br />
                    a. Public Schools <br />
                    b. Private Schools</td>
                  <td> </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td> Adm. Supervisory Experience<br />
                    a. Public Schools <br />
                    b. Private Schools</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td> Other (Seminars, Workshop, etc.)</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td> TOTAL</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>


              </tbody>
            </table>
          </v-sheet>
          <div class="font-weight-bold mt-1 pl-5"> TOTAL LATEST EFFICIENCY RATING : {{ erf?.designation?.ipcrf_rating }}
          </div>
          <div class="pl-5" style="font-size: 10px;"> (NOTE: Teachers Do not Write Below)</div>


          <div class="d-flex mt-2">
            <div class="w-50 justify-center  px-15 mt-10">
              <div class="w-100" style="display: grid; place-items: center;">
                <v-img :width="197" height="3vh" :src="erf?.principal?.signature" />
              </div>
              <div class="text-center text-uppercase font-weight-bold"> {{ erf?.principal?.name ? erf?.principal?.name
                : "" }}</div>
              <hr />
              <center> (District Supervisor/Principal Signature) </center>
            </div>

            <div class="w-50 justify-center  px-15">
              <div class="w-100" style="display: grid; place-items: center;">
                <v-img :width="197" height="3vh" :src="erf?.personal_information?.signature" />
              </div>
              <div class="text-center text-uppercase font-weight-bold"> {{ erf?.full_name ? erf?.full_name : "" }}</div>
              <hr />
              <center> (Signature) </center>
            </div>
          </div>
          <v-sheet class="w-100 mt-2" border>
            <table>
              <thead>
                <tr>
                  <th width="180px"> DIVISION ACTION <br /> CLASSIFICATION</th>
                  <th> DATE <br /> PROCESSED</th>
                  <th>RANGE <br /> ASSIGNMENT</th>
                  <th>SALARY RANGE</th>
                  <th>SCHEDULED SALARY</th>
                  <th>REMARKS</th>
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
                  <td> {{ erf?.current_sg ? `SG - ${erf.current_sg}` : '' }} </td>
                  <td v-if="annual_sg">{{ annual_sg.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' }) }}
                  </td>
                  <td></td>

                </tr>




              </tbody>
            </table>
          </v-sheet>
          <div class="d-flex my-2 mt-2">
            <div class="w-50 justify-center  px-5">
              <div> RECOMMENDING APPROVAL:</div>
              <div class="w-100" style="display: grid; place-items: center;">
                <v-img :width="197" height="3vh" />
              </div>
              <div class="text-center text-uppercase font-weight-bold"> {{ sds.first_name }} {{
                sds.middle_name
                  ? sds.middle_name.charAt(0).toUpperCase() + '.' : "" }} {{
                  sds.last_name }} {{ sds.suffix ? sds.suffix : "" }} {{ sds.ces_rank ? sds.ces_rank : "" }}</div>

              <hr />
              <center> School Division Superintendent </center>
            </div>

            <div class="w-50 justify-center  px-5">
              <div> CERTIFIED CORRECT:</div>

              <div class="w-100" style="display: grid; place-items: center;">
                <v-img :width="197" height="3vh" :src="erf?.sdo_admin4_esig" />
              </div>
              <div class="text-center text-uppercase font-weight-bold"> {{ erf?.sdo_admin4_name ?
                erf?.sdo_admin4_name : "" }}</div>
              <hr />
              <center> Evaluator </center>
            </div>
          </div>

          <div class="pl-5 mt-2 font-weight-bold">
            <div>IV. DEPED REGIONAL OFFICE ACTION:</div>
          </div>
          <v-row dense>
            <v-col cols="6" class="d-flex"> Classification :
              <div style="border-bottom: 1px solid black; width: 75%;" class="px-2"></div>
            </v-col>
            <v-col cols="3" class="d-flex"> Range : <div style="border-bottom: 1px solid black; width: 70%;"
                class="px-2"></div>
            </v-col>
            <v-col cols="3" class="d-flex"> Date: <div style="border-bottom: 1px solid black; width: 65%;" class="px-2">
              </div></v-col>
            <v-col cols="7" class="d-flex"> Approved/Processed : <div
                style="border-bottom: 1px solid black; width: 70%;" class="px-2"></div> </v-col>
            <v-col cols="5" class="d-flex"> Post Audited Range : <div
                style="border-bottom: 1px solid black; width: 50%;" class="px-2"></div></v-col>
          </v-row>
          <div class="pl-5 mt-2 font-weight-bold"> V. <span class="pl-3 text-uppercase">DepEd PROPER ACTION</span></div>
          <div class="d-flex mt-2">

            <div class="w-50 justify-center  px-5">
              <div class="w-100" style="display: grid; place-items: center;">
                <v-img :width="197" height="3vh" />
              </div>
              <div class="text-center text-uppercase font-weight-bold"> {{ erf?.ro_evaluator_name ?
                erf?.ro_evaluator_name : '' }}</div>
              <hr />
              <center> (Regional Director )</center>
            </div>

            <div class="w-50 justify-center  px-5">
              <div class="w-100" style="display: grid; place-items: center;">
                <v-img :width="197" height="3vh" :src="erf?.ro_evaluator_esig" />
              </div>
              <div class="text-center text-uppercase font-weight-bold"> {{ erf?.ro_evaluator_name ?
                erf?.ro_evaluator_name : '' }}</div>
              <hr />
              <center> (Evaluator) </center>
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
    get_erf(),
    get_sds()
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