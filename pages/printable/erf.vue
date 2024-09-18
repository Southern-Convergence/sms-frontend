<template>
  <div>

    <body class="printable-page">
      <div class="content">
        <commons-sdo-header :sdo="erf.division" />

        <v-sheet class="mx-5" v-if="erf">
          <!-- Container for the rows -->

          <div class="d-flex" style="line-height: 11px">
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
          <div class="d-flex" style="line-height: 13px">
            <div class="w-33">
              Item No.: <span class="text-uppercase">{{ erf?.designation?.item_no }}</span>
            </div>
            <div class="w-33">
              Authorized Position Title: <span class="text-uppercase">{{ erf?.designation?.current_position }}</span>
            </div>
          </div>
          <div class="d-flex" style="line-height: 13px">
            <div class="w-33">
              Employee No.: <span class="text-uppercase">{{ erf?.designation?.employee_no }}</span>
            </div>
            <div class="w-67 d-flex">
              <div class="d-flex">
                <div class="w-40 d-flex"> N.U.C. No:
                  <div class="mt-4 px-10" style="border-bottom: 1px solid black; "> </div>
                </div>
                <div class="w-70 d-flex"> Authorized Monthly
                  Salary: <span>
                    <div class="px-5" style="border-bottom: 1px solid black; ">
                      {{ `SG - ${erf?.current_sg} ` }} </div>
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
                  <th style="line-height: 11px;"> TITLE DEGREE OR <br />HIGHEST GRADE <br />ATTAINED
                  </th>
                  <th>NAME OF INSTITUTION</th>
                  <th style="line-height: 11px;">YEAR <br />RECEIVED</th>
                  <th style="line-height: 11px;">CIVIL SERVICE <br />EXAMINATION</th>
                  <th>RATING</th>
                  <th>DATE</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="education, index in erf?.educational_attainment" :key="index">
                  <td> {{ education?.degree }}</td>
                  <td> {{ education?.institution }}</td>
                  <td> {{ education?.year_received }}</td>
                  <td> {{ education?.board_exam }}</td>
                  <td> {{ education?.rating }}</td>
                  <td> {{ education?.date
                    ? new Date(education?.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })
                    : '' }}</td>
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
              <div class="d-flex" style="line-height: 13px"> A. Total no. of years teacher(public only)
                <div style="border-bottom: 1px solid black; width: 15%;" class="px-2">{{
                  `${erf?.equivalent_unit?.public_years_teaching}
                  years` }}</div>
                Equivalent : <div style="border-bottom: 1px solid black; width: 10%;" class="px-2">{{
                  erf?.equivalent_unit?.yt_equivalent.toFixed(2) }}</div>

              </div>
              <div class="d-flex" style="line-height: 14px"> B. Degree to Degree Equivalent (present degree) <div
                  style="border-bottom: 1px solid black; width: 9%;" class="px-2"></div> Equivalent :
                <div style="border-bottom: 1px solid black; width: 10%;" class="px-2">{{ total_units_equivalent }}
                </div>
              </div>
              <div class="d-flex pb-1" style="line-height: 12px"> C. Area of Equivalent <div
                  style="border-bottom: 1px solid black; width: 25%;" class="px-2">
                </div>
              </div>
            </div>
          </div>


          <v-sheet class="w-100" border>
            <table>
              <thead>
                <tr>
                  <th width="190px"> </th>
                  <th width="280px"> SCHOOL YEAR</th>
                  <th width="120px">NO. OF UNITS</th>
                  <th>DESCRIPTION</th>
                </tr>

              </thead>
              <tbody>

                <tr v-for="prof_stud, index in erf?.professional_study" :key="prof_stud">
                  <td> Professional Study
                  </td>
                  <td> {{ prof_stud.sy }} </td>
                  <td class="text-center">{{ prof_stud.unit_no }}</td>
                  <td>{{ prof_stud.description }}</td>
                </tr>
                <tr>
                  <td>
                    Teaching Experience<br />
                    a. Public Schools<br />
                    b. Private Schools
                  </td>
                  <td>
                    <span v-for="(te_public, index) in public_teacher_experience" :key="'public-' + index">
                      {{ te_public.from
                        ? new Date(te_public.from).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })
                        : '' }} -
                      {{ te_public.to
                        ? new Date(te_public.to).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })
                        : '' }}
                      ({{ te_public?.school_acronym }})
                      <br v-if="index < public_teacher_experience.length - 1" />
                    </span> <br />
                    <span v-for="(te_private, index) in private_teacher_experience" :key="'private-' + index">
                      {{ te_private.from
                        ? new Date(te_private.from).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })
                        : '' }} -
                      {{ te_private.to
                        ? new Date(te_private.to).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })
                        : '' }}
                      ({{ te_private?.school_acronym }})
                      <br v-if="index < private_teacher_experience.length - 1" />
                    </span>
                  </td>
                  <td class="text-center">
                    <span v-for="(te_public, index) in public_teacher_experience" :key="'public-eq-' + index">
                      {{ te_public.equivalent.toFixed(2) }}
                      <br v-if="index < public_teacher_experience.length - 1" />
                    </span> <br />
                    <span v-for="(te_private, index) in private_teacher_experience" :key="'private-eq-' + index">
                      {{ te_private.equivalent.toFixed(2) }}
                      <br v-if="index < private_teacher_experience.length - 1" />
                    </span>
                  </td>
                  <td>
                    <span v-for="(te_public, index) in public_teacher_experience" :key="'public-count-' + index">
                      {{ te_public.count }} years., {{ te_public.type }}
                      <br v-if="index < public_teacher_experience.length - 1" />
                    </span> <br />
                    <span v-for="(te_private, index) in private_teacher_experience" :key="'private-count-' + index">
                      {{ te_private.count }} years., {{ te_private.type }}
                      <br v-if="index < private_teacher_experience.length - 1" />
                    </span>
                  </td>
                </tr>




                <tr>
                  <td>
                    Adm. Supervisory Experience<br />
                    a. Public Schools<br />
                    b. Private Schools
                  </td>

                  <td>
                    <span v-for="(pub_ht, index) in public_ht" :key="'public-' + index">
                      {{ pub_ht.from
                        ? new Date(pub_ht.from).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })
                        : '' }} -
                      {{ pub_ht.to
                        ? new Date(pub_ht.to).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })
                        : '' }}
                      ({{ pub_ht?.school_acronym }})
                      <br v-if="index < public_ht.length - 1" />
                    </span> <br />
                    <span v-for="(priv_ht, index) in private_ht" :key="'private-' + index">
                      {{ priv_ht.from
                        ? new Date(priv_ht.from).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })
                        : '' }} -
                      {{ priv_ht.to
                        ? new Date(priv_ht.to).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })
                        : '' }}
                      ({{ priv_ht?.school_acronym }})
                      <br v-if="index < private_ht.length - 1" />
                    </span>
                  </td>
                  <td class="text-center">
                    <span v-for="(pub_ht, index) in public_ht" :key="'public-eq-' + index">
                      {{ pub_ht.equivalent.toFixed(2) }}
                      <br v-if="index < public_ht.length - 1" />
                    </span> <br />
                    <span v-for="(priv_ht, index) in private_ht" :key="'private-eq-' + index">
                      {{ priv_ht.equivalent.toFixed(2) }}
                      <br v-if="index < private_ht.length - 1" />
                    </span>
                  </td>
                  <td>
                    <span v-for="(pub_ht, index) in public_ht" :key="'public-count-' + index">
                      {{ pub_ht.count }} years., {{ pub_ht.type }}
                      <br v-if="index < public_ht.length - 1" />
                    </span> <br />
                    <span v-for="(priv_ht, index) in private_ht" :key="'private-count-' + index">
                      {{ priv_ht.count }} years., {{ priv_ht.type }}
                      <br v-if="index < private_ht.length - 1" />
                    </span>
                  </td>
                </tr>

                <tr>
                  <td> Other (Seminars, Workshop, etc.)</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="font-weight-bold"> TOTAL</td>
                  <td></td>
                  <td class="text-center font-weight-bold"> {{ total }}</td>
                  <td></td>
                </tr>


              </tbody>
            </table>
          </v-sheet>
          <div class="font-weight-bold mt-1 pl-5"> TOTAL LATEST EFFICIENCY RATING : {{ erf?.designation?.ipcrf_rating
            }} , {{ erf?.designation?.ipcrf_equivalent
            }}
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
              <div class="text-center text-uppercase font-weight-bold"> {{ erf?.full_name ? erf?.full_name : "" }}
              </div>
              <hr />
              <center> (Signature) </center>
            </div>
          </div>
          <v-sheet class="w-100 mt-2" border>
            <table>
              <thead>
                <tr>
                  <th width="180px" style="line-height: 11px;"> DIVISION ACTION <br /> CLASSIFICATION</th>
                  <th style="line-height: 11px;"> DATE <br /> PROCESSED</th>
                  <th style="line-height: 11px;">RANGE <br /> ASSIGNMENT</th>
                  <th>SALARY RANGE</th>
                  <th>SCHEDULED SALARY</th>
                  <th>REMARKS</th>
                </tr>

              </thead>

              <tbody>
                <tr>
                  <td> {{ erf?.position }}</td>
                  <td><span v-if="erf?.assignees && erf?.assignees[2]?.approved"> {{ erf?.assignees &&
                    erf.assignees.length ?
                    new Date(erf.assignees[2].timestamp).toLocaleDateString('en-US', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric'
                    }) : '' }}</span></td>
                  <td> <span v-if="erf?.assignees && erf?.assignees[2]?.range_assignment"> {{ erf?.assignees &&
                    erf.assignees.length ?
                    erf.assignees[2].range_assignment.name : '' }}</span> </td>
                  <td> {{ erf?.current_sg ? `SG - ${erf.current_sg}` : '' }} </td>
                  <td v-if="annual_sg">{{ annual_sg.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' }) }}
                  </td>
                  <td> <span v-if="erf?.assignees && erf?.assignees[2]?.range_assignment"> {{ erf?.assignees &&
                    erf.assignees.length ?
                    erf.assignees[2].range_assignment.remarks : '' }}</span></td>

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
              <center> Administrative Officer IV </center>
            </div>
          </div>

          <div class="pl-5 mt-2 font-weight-bold">
            <div>IV. DEPED REGIONAL OFFICE ACTION:</div>
          </div>
          <v-row dense style="line-height: 12px">
            <v-col cols="6" class="d-flex"> Classification :
              <div style="border-bottom: 1px solid black; width: 75%;" class="px-2"> {{ erf?.position }}</div>
            </v-col>
            <v-col cols="3" class="d-flex"> Range : <div style="border-bottom: 1px solid black; width: 70%;"
                class="px-2"> <span v-if="erf?.assignees && erf?.assignees[4]?.range_assignment"> {{ erf?.assignees &&
                  erf.assignees.length ?
                  erf.assignees[4].range_assignment.name : '' }}</span>
              </div>
            </v-col>

            <v-col cols="3" class="d-flex"> Date: <div style="border-bottom: 1px solid black; width: 65%;" class="px-2">
                <span v-if="erf?.assignees && erf?.assignees[4]?.approved"> {{ erf?.assignees && erf.assignees.length
                  ?
                  new Date(erf.assignees[4].timestamp).toLocaleDateString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric'
                  }) : '' }}</span>
              </div></v-col>
            <v-col cols="7" class="d-flex"> Approved/Processed : <div
                style="border-bottom: 1px solid black; width: 70%;" class="px-2"></div> </v-col>
            <v-col cols="5" class="d-flex"> Post Audited Range : <div
                style="border-bottom: 1px solid black; width: 50%;" class="px-2"> {{ erf?.current_sg ? `SG -
                ${erf.current_sg}` : '' }}</div></v-col>
          </v-row>
          <div class="pl-5 mt-2 font-weight-bold"> V. <span class="pl-3 text-uppercase">DepEd PROPER ACTION</span>
          </div>
          <div class="d-flex mt-2">

            <div class="w-50 justify-center  px-5">
              <div class="w-100" style="display: grid; place-items: center;">
                <v-img :width="197" height="3vh" />
              </div>

              <div class="text-center text-uppercase font-weight-bold">
                {{ rd?.rd?.first_name }} {{ rd?.rd?.middle_name ? rd?.rd?.middle_name : '' }} {{
                  rd?.rd?.middle_name
                    ? rd?.rd?.middle_name.charAt(0).toUpperCase() + '.' : "" }}
                {{ rd?.rd?.last_name }} {{ rd?.rd?.position ? rd?.rd?.position : '' }}</div>
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
              <center> Administrative Officer V </center>
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
    get_rd(),
    get_sds()
  ]);



});

// const checkbox = ref(true)
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


// const attachmentList = computed(() =>
//   erf.value.attachments ? Object.values(erf.value.attachments) : []
// );
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
// const display_indorsement = () => {
//   const acceptableStatuses = [
//     "Approved for Printing",
//     "Received Printout/s",
//     "For DBM",
//     "Completed"
//   ];
//   const status = erf?.value?.status;
//   return acceptableStatuses.includes(status);
// };

const public_teacher_experience = computed(() => {
  return erf.value?.service_record?.filter((i) => i.type === 'Public') || [];
});
const private_teacher_experience = computed(() => {
  return erf.value?.service_record?.filter((i) => i.type === 'Private') || [];
});


const public_ht = computed(() => {
  return erf.value?.adm_experience?.filter((i) => i.type === 'Public') || [];
});
const private_ht = computed(() => {
  return erf.value?.adm_experience?.filter((i) => i.type === 'Private') || [];
});


const total_units_equivalent = computed(() => {
  const units = erf.value?.professional_study?.filter(i => i.unit_no) || [];
  return units.reduce((i, item) => i + (Number(item.unit_no) || 0), 0);
})

const total = computed(() => {
  const units = erf.value?.professional_study?.filter(i => i.unit_no) || [];
  const teacher_experience = erf.value?.service_record?.filter(i => i.equivalent) || [];
  const ht_experience = erf.value?.adm_experience?.filter(i => i.equivalent) || [];


  const total_units = units.reduce((i, item) => i + (Number(item.unit_no) || 0), 0);
  const total_equivalent = teacher_experience.reduce((i, item) => i + (Number(item.equivalent) || 0), 0);
  const total_adm = ht_experience.reduce((i, item) => i + (Number(item.equivalent) || 0), 0);
  const result = total_units + total_equivalent + total_adm;
  return result.toFixed(2);
});



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