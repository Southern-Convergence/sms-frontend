
<template>
  <v-row dense justify="center">
    <v-col cols="10" xxl="8" xl="8" lg="10" class="font-weight-bold text-h6">
      EVALUATION / LIST OF REQUIREMENTS FOR {{ applicant_details.position }}
    </v-col>
    <v-col cols="10" xxl="8" xl="8" lg="10">
      <v-row no-gutters>
        <v-col cols="5" class="text-subtitle-2 font-weight-bold"> TO : REGINAL DIRECTOR
          <p class="pl-7 font-weight-regular">Regional Director/DepEd - NCR
          </p>
        </v-col>
        <v-col cols="auto"> DATE : <v-chip color="primary" density="compact"> Oct. 30, 2023</v-chip></v-col>

      </v-row>
      <v-row no-gutters> <v-col cols="5" class="text-subtitle-2 font-weight-bold"> DIVISION : {{
        applicant_details.division }}</v-col>
        <v-col cols="auto"> Control No. : <v-chip class="font-weight-bold" color="orange" density="compact">
            {{ applicant_details.control_no }}</v-chip></v-col>
      </v-row>
    </v-col>
    <v-col cols="10" xxl="5" xl="5" lg="6" md="6" sm="10">
      <v-card class="mx-auto" border>
        <v-card-title class="d-flex align-center font-weight-bold">
          1. EQUIVALENT RECORD FORM <v-spacer /><span class="pr-2"> <v-btn @click="erf_history.dialog = true"
              class="font-weight-bold" prepend-icon="mdi-history" color="primary" block density="compact">View
              HISTORY</v-btn></span>
          <span> <v-btn class="font-weight-bold" prepend-icon="mdi-printer" color="primary" block density="compact"> Print
              ERF</v-btn></span>
        </v-card-title>
        <v-card-text class="pa-1 ma-0">
          <v-card flat>
            <v-row no-gutters class="ma-2">
              <v-col cols="6" class="text-capitalize">Name : <b>{{ applicant_details.surname }}, {{
                applicant_details.givenname }} </b> </v-col>
              <v-col cols="6">Date of Birth : <b>{{ applicant_details.birthday }}</b> </v-col>
              <v-col cols="6">Employee Number : <b>{{ applicant_details.employee_no }}</b> </v-col>
              <v-col cols="6">Authorized Position Title : <b>{{ applicant_details.current_position }}</b></v-col>
              <v-col cols="6">Item Number : <b>{{ applicant_details.plantilla_no }}</b> </v-col>
              <v-col cols="6">Authorized Salary : <b>{{ applicant_details.authorized_salary }}</b></v-col>
            </v-row>

            <v-sheet class="mx-2 ml-5">
              <span class="font-weight-bold  text-uppercase text-caption" density="compact">
                I. Education Attainment and Civil Service Eligibility
              </span>

              <v-sheet border>
                <v-data-table :headers="attainment_headers" :items="applicant_details.education_attainment"
                  density="compact"> <template #bottom v-if="!show_footer" /> </v-data-table> </v-sheet>
            </v-sheet>

            <v-sheet class="ma-2 ml-5">
              <span class="font-weight-bold  text-uppercase text-caption" density="compact">
                II. Service Record
              </span>
              <v-sheet class="mb-2" border width="70%">
                <v-data-table :headers="service_record_headers" :items="applicant_details.service_record"
                  density="compact"> <template #bottom v-if="!show_footer" />
                </v-data-table>
              </v-sheet>
              <span class="font-weight-bold text-uppercase text-caption">
                III. EQUIVALENT UNITS
              </span>
            </v-sheet>

            <v-sheet class="ma-2 ml-15">

              <span class="font-weight-bold text-grey text-caption" density="compact">
                A. Total Number of Years Teaching
              </span>
              <v-sheet border width="70%">
                <v-row dense class="pa-2">
                  <v-col cols="6"> Public Schools : <b class="pl-2 text-grey">{{ applicant_details.yt_public_schools
                  }}</b>
                  </v-col>
                  <v-col cols="6"> Private Schools : <b class="pl-2 text-grey">{{ applicant_details.yt_private_schools }}
                    </b>
                  </v-col>
                </v-row>
                <!-- <v-data-table title="A. Total Number of Years Teaching " :headers="years_teaching_headers"
                  density="compact"> <template #bottom v-if="!show_footer" /></v-data-table> -->
              </v-sheet>
            </v-sheet>
            <v-sheet class="ma-2 ml-15">
              <span class="font-weight-bold text-grey text-caption">
                B. Degree to Degree Equivalent
              </span>
              <v-sheet border width="70%">
                WAPA
              </v-sheet>
            </v-sheet>
            <v-sheet class="ma-2 ml-15">

              <span class="font-weight-bold text-grey text-caption"> C. Areas of Equivalent</span> <br />
              <span class="ml-15 text-caption">
                1. Professional Study :
              </span>
              <v-sheet class="ml-15" border width="70%">
                <v-data-table :headers="professional_study_headers" :items="applicant_details.professional_study"
                  density="compact">
                  <template #bottom v-if="!show_footer" /></v-data-table>
              </v-sheet>
            </v-sheet>
            <v-sheet class="ma-2 ml-15 ">

              <span class="ml-15 text-caption">
                2. Teaching Experience :
              </span>
              <v-sheet class="ml-15" border width="70%">
                <v-row dense class="pa-2">
                  <v-col cols="6"> Public Schools : <b class="pl-2 text-grey">{{ applicant_details.te_private_schools
                  }}</b>
                  </v-col>
                  <v-col cols="6"> Private Schools : <b class="pl-2 text-grey">{{ applicant_details.te_private_schools }}
                    </b>
                  </v-col>
                </v-row>
                <!-- <v-data-table :headers="experience_teaching_headers" density="compact">
                  <template #bottom v-if="!show_footer" /></v-data-table> -->
              </v-sheet>
            </v-sheet>


            <v-row dense class="ml-15 mt-1">
              LATEST IPCRF RATING : <b> {{ applicant_details.ipcrf_rating }}</b>
            </v-row>
            <v-row dense justify="center">
              <v-col cols="5">
                <pamphlets-attach-signature name="Marianne Mae Paclian" position="Principal" />
              </v-col>
              <v-col cols="5">
                <pamphlets-attach-signature name="Marianne Mae Paclian" position="Teacher" />
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto" flat>
        <!-- <v-row dense justify="center">
          <v-col cols="12" class="text-subtitle-1 font-weight-bold px-3"> SCHOOL DIVISION OFFICE</v-col>

          <v-col cols="5">
            <pamphlets-attach-signature name="Marianne Mae Paclian" position="Evaluator" />
          </v-col>
          <v-col cols="5">
            <pamphlets-attach-signature name="Marianne Mae Paclian" position="Approver" />
          </v-col>
        </v-row>
        <v-row dense justify="center">
          <v-col cols="12" class="text-subtitle-1 font-weight-bold px-3"> REGIONAL OFFICE</v-col>
          <v-col cols="5">
            <pamphlets-attach-signature name="Marianne Mae Paclian" position="Evaluator" />
          </v-col>
          <v-col cols="5">
            <pamphlets-attach-signature name="Marianne Mae Paclian" position="Approver" />
          </v-col>
        </v-row> -->

        <v-card-actions>
          <v-row dense justify="center">
            <v-col cols="4">
              <v-btn variant="tonal" color="error" block>CLOSE</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn variant="tonal" color="success" @click="update_to_pending(applicant_details)" block>SUBMIT</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="10" xxl="3" xl="3" lg="4" md="6" sm="10">
      <v-card border width="500">
        <v-card-text class="pa-1 ma-0">

          <v-sheet border class="pa-4">
            <h6> 2. Authenticated copy of Transcript of Records in the masteral course signed by the School
              Registrar.</h6>
            <h6 class="font-weight-regular mt-2"> Registrar Complete Name : <b>Mariannae Mae Paclian</b></h6>
            <h6 class="font-weight-regular"> Registrar Contact Number : <i class="font-weight-bold">09512165312</i></h6>
            <h6 class="font-weight-regular"> Registrar Emmail : <i
                class="font-weight-bold">mariannemaepaclian1998@gmail.com</i></h6>
          </v-sheet>
        </v-card-text>
        <v-card-text class="pa-1 ma-0">
          <v-sheet border class="pa-4">
            <pamphlets-evaluate-attachement
              :title="'3 .Permit to Study or AccreditationPermit to Study or Accreditation of units in the masteral course.'"
              :tooltip="'View attached Permit to Study or Accreditation'" />
          </v-sheet>
        </v-card-text>
        <v-card-text class="pa-1 ma-0">
          <v-sheet border class="pa-4">
            <pamphlets-evaluate-attachement :title="'4 .Omnibus Certification of Authenticity of Documents '"
              :tooltip="`View Attached Omnibus Certification `" />
          </v-sheet>
        </v-card-text>
        <v-card-text class="pa-1 ma-0">
          <v-sheet border class="pa-4">
            <pamphlets-evaluate-attachement :title="' 5 .Copy of Curriculum(MA Course for T3 only).'"
              :tooltip="`View attached Curriculum`" />
          </v-sheet>
        </v-card-text>
      </v-card>
      <v-card border width="500">
        <v-card-title class="font-weight-bold text-h6 text-indigo">
          SCHOOL DIVISION OFFICE
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-1 ma-0">
          <v-sheet border class="pa-4">
            <pamphlets-evaluate-attachement :title="' 1 .Plantilla Allocation List. '"
              :tooltip="`View attached Plantilla Allocation List`" />
            <pamphlets-evaluate-attachement :title="'2. Service Record'" :tooltip="`View attached Service Record`" />
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>


  <commons-dialog width="auto" v-model="erf_history.dialog" icon="mdi-history" :title="erf_history.title"
    :subtitle="erf_history.subtitle" persistent>
    <v-card-text class="ma-5">
      <v-timeline side="end" align="start">

        <v-timeline-item dot-color="green-lighten-4">
          <template v-slot:icon>
            <v-icon color="success">mdi-check</v-icon>
          </template>
          <template v-slot:opposite>
            <v-chip color="success"> 07/15/1998 9:00:08 AM </v-chip>
          </template>
          <div>
            <div class="text-subtitle-1">MARIANNE MAE PACLIAN</div>
            <v-divider />
            <div>Position here</div>
            <div class="text-green font-weight-bold">APPROVED</div>
          </div>
        </v-timeline-item>
        <v-timeline-item dot-color="red-lighten-4">
          <template v-slot:icon>
            <v-icon color="error">mdi-alpha-x</v-icon>
          </template>
          <template v-slot:opposite>
            <v-chip color="error"> 07/15/1998 9:00:08 AM </v-chip>
          </template>
          <div>
            <div class="text-subtitle-1 ">MARIANNE MAE PACLIAN</div>
            <v-divider />
            <div>Position here</div>
            <div class="text-red font-weight-bold">RETURNED</div>
            <div>Remarks : <span class="text-red "> Wrong Attachment</span> </div>
          </div>

        </v-timeline-item>
      </v-timeline>
    </v-card-text>
    <v-divider />

  </commons-dialog>
</template>
<script lang="ts" setup>
const { $rest } = useNuxtApp()
const route = useRoute();
const application = ref({});

onBeforeMount(() => {
  get_applicant_details()
})


const applicant_details = ref({})
async function get_applicant_details() {
  const { data, error } = await $rest('applicant/get-applicant', {
    method: 'GET',
    query: {
      id: route.query.id
    }
  })
  applicant_details.value = data
  console.log(data)
  console.log(error)
}

const erf_history = ref({ dialog: false, title: 'ERF Application History' })



const attainment_headers = [
  { title: 'Degree', key: 'degree' },
  { title: 'Institution', key: 'institution' },
  { title: 'Year Received', key: 'year_received' },
  { title: 'Board Examination', key: 'board_examination' },
  { title: 'Rating', key: 'rating' },
  { title: 'Date', key: 'date' },
];

const service_record_headers = [
  { title: 'Designation', key: 'designation' },
  { title: 'From', key: 'from' },
  { title: 'To', key: 'to' }
];

const years_teaching_headers =
  [
    { title: 'Publics Schools', key: 'yt_public_schools' },
    { title: 'Private Schools', key: 'yt_private_schools' },

  ];
const experience_teaching_headers =
  [
    { title: 'Publics Schools', key: 'te_public_schools' },
    { title: 'Private Schools', key: 'te_private_schools' },

  ];



const professional_study_headers =
  [
    { title: 'School Year', key: 'school_year' },
    { title: 'Number of Units', key: 'units_number' },
    { title: 'Description', key: 'description' }
  ];


// }
// async function update_to_pending() {
//   const { data, error } = await $rest('erf-form/update-to-pending', {
//     method: "PUT",
//     body: {
//       id: applicant_details.value._id,
//       status: 'Pending Division'
//     }
//   });
//   console.log(data);
//   console.log(error);
// }






</script>
<style scoped>
* {
  font-size: 12px
}
</style>
