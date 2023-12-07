
<template>
  <v-sheet>
    <v-row dense justify="center">
      <v-col cols="10" xxl="8" xl="8" lg="10" class="font-weight-bold text-h6">
        EVALUATION / LIST OF REQUIREMENTS FORM
      </v-col>
      <v-col cols="10" xxl="8" xl="8" lg="10">
        <v-row no-gutters>
          <v-col cols="5" class="text-subtitle-2 font-weight-bold"> TO : REGINAL DIRECTOR
            <p class="pl-7 font-weight-regular">Regional Director/DepEd - NCR
            </p>
          </v-col>

          <v-col cols="auto"> Application Date : <v-chip color="primary" density="compact">
              {{ created_date_formatted }}

            </v-chip></v-col>

        </v-row>
        <v-row no-gutters> <v-col cols="5" class="text-subtitle-2 font-weight-bold"> DIVISION : {{
          applicant_details?.designation?.division }} </v-col>
          <v-col cols="auto"> Control No. : <v-chip class="font-weight-bold" color="orange" density="compact"> {{
            applicant_details?.control_number }}
            </v-chip></v-col>
        </v-row>
      </v-col>
      <v-col cols="10" xxl="5" xl="5" lg="6" md="6" sm="10">
        <v-card class="mx-auto" border>
          <v-card-title class="d-flex align-center font-weight-bold">
            1. EQUIVALENT RECORD FORM <v-spacer /><span class="pr-2"> <v-btn @click="erf_history.dialog = true"
                class="font-weight-bold" prepend-icon="mdi-history" color="primary" block density="compact">View
                HISTORY</v-btn></span>
            <span> <v-btn class="font-weight-bold" prepend-icon="mdi-printer" color="primary" block density="compact">
                Print
                ERF</v-btn></span>
          </v-card-title>
          <v-card-text class="pa-1 ma-0">
            <v-card flat>
              <v-row no-gutters class="ma-2">
                <v-col cols="6" class="text-capitalize">Name : <b> {{ applicant_details?.personal_information?.firstname
                }} {{ applicant_details?.personal_information?.lastname }} </b>
                </v-col>
                <v-col cols="6">Date of Birth : <b> {{ applicant_details?.personal_information?.birthday }}
                  </b>
                </v-col>
                <v-col cols="6">Employee Number : <b> {{ applicant_details?.designation?.employee_no }}</b> </v-col>
                <v-col cols="6">Authorized Position Title : <b>{{ applicant_details?.designation?.current_position }}
                  </b></v-col>
                <v-col cols="6">Item Number : <b>{{ applicant_details?.designation?.item_no }}</b> </v-col>
                <v-col cols="6">Authorized Salary : <b></b></v-col>
              </v-row>

              <v-sheet class="mx-2 ml-5">
                <span class="font-weight-bold  text-uppercase text-caption" density="compact">
                  I. Education Attainment and Civil Service Eligibility
                </span>

                <v-sheet border>
                  <v-data-table :headers="attainment_headers" :items="applicant_details.educational_attainment"
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
                <v-sheet width="70%">
                  <v-row dense class="pa-2">
                    <v-col cols="6"> Public Schools : <span class="pl-2"></span>
                    </v-col>
                    <v-col cols="6"> Private Schools : <span class="pl-2">
                      </span>
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
                <v-sheet width="70%">

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
                <v-sheet class="ml-15" width="70%">
                  <v-row dense class="pa-2">
                    <v-col cols="6"> Public Schools : <b class="pl-2"></b>
                    </v-col>
                    <v-col cols="6"> Private Schools : <b class="pl-2">
                      </b>
                    </v-col>
                  </v-row>
                  <!-- <v-data-table :headers="experience_teaching_headers" density="compact">
                  <template #bottom v-if="!show_footer" /></v-data-table> -->
                </v-sheet>
              </v-sheet>


              <v-row dense class="ml-15 mt-1">
                LATEST IPCRF RATING : <b> </b>
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
          <v-card-actions>
            <v-row dense justify="center">
              <v-col cols="4">
                <v-btn @click="disapproved_dialog = true" variant="plain" color="error" block>Dissapproved</v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn @click="pending_applicant(applicant_details)" variant="tonal" color="success" block>SUBMIT</v-btn>
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
              <v-btn size="small" color="primary" class="d-flex align-center" variant="tonal"
                @click="open_attachment_dialog(Attachment.TOR)">
                <v-icon class="mr-2">mdi-attachment</v-icon>
                <span>View Attachment</span>
              </v-btn>
              <v-row dense>
                <v-col cols="auto" class="mt-3 font-weight-bold text-grey "> Evaluation :</v-col>
                <v-col cols="auto"> <v-checkbox color="success" label="Valid" hide-details density="compact" /></v-col>
                <v-col cols="auto"> <v-checkbox color="error" label="Invalid" hide-details density="compact" /></v-col>
              </v-row>
              <h6 class="font-weight-regular mt-2"> Registrar Complete Name : <b> {{
                applicant_details?.transcript?.registrar_name }}</b>
              </h6>
              <h6 class="font-weight-regular"> Registrar Contact Number : <i class="font-weight-bold">{{
                applicant_details?.transcript?.registrar_email }}</i></h6>
              <h6 class="font-weight-regular"> Registrar Email : <i class="font-weight-bold text-blue">{{
                applicant_details?.transcript?.registrar_no }}</i></h6>
            </v-sheet>
          </v-card-text>
          <v-card-text class="pa-1 ma-0">
            <v-sheet border class="pa-4 align-center justify-space-between">
              <h5>3 .Permit to Study or Accreditation Permit to Study or Accreditation of units in the masteral
                course.</h5>
              <v-btn size="small" color="primary" class="d-flex align-center" variant="tonal"
                @click="open_attachment_dialog(Attachment.PERMIT_STUDY)">
                <v-icon class="mr-2">mdi-attachment</v-icon>
                <span>View Attachment</span>
              </v-btn>
              <v-row dense>
                <v-col cols="auto" class="mt-3 font-weight-bold text-grey "> Evaluation :</v-col>
                <v-col cols="auto"> <v-checkbox color="success" label="Valid" hide-details density="compact" /></v-col>
                <v-col cols="auto"> <v-checkbox color="error" label="Invalid" hide-details density="compact" /></v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
          <v-card-text class="pa-1 ma-0">
            <v-sheet border class="pa-4 align-center justify-space-between">
              <h5>4 .Omnibus Certification of Authenticity of Documents</h5>
              <v-btn size="small" color="primary" class="d-flex align-center" variant="tonal"
                @click="open_attachment_dialog(Attachment.OMNIBUS)">
                <v-icon class="mr-2">mdi-attachment</v-icon>
                <span>View Attachment</span>
              </v-btn>
              <v-row dense>
                <v-col cols="auto" class="mt-3 font-weight-bold text-grey "> Evaluation :</v-col>
                <v-col cols="auto"> <v-checkbox color="success" label="Valid" hide-details density="compact" /></v-col>
                <v-col cols="auto"> <v-checkbox color="error" label="Invalid" hide-details density="compact" /></v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
          <v-card-text class="pa-1 ma-0">
            <v-sheet border class="pa-4 align-center justify-space-between">
              <h5>5 .Copy of Curriculum(MA Course for T3 only).</h5>
              <v-btn size="small" color="primary" class="d-flex align-center" variant="tonal"
                @click="open_attachment_dialog(Attachment.SERVICE_RECORD)">
                <v-icon class="mr-2">mdi-attachment</v-icon>
                <span>View Attachment</span>
              </v-btn>
              <v-row dense>
                <v-col cols="auto" class="mt-3 font-weight-bold text-grey "> Evaluation :</v-col>
                <v-col cols="auto"> <v-checkbox color="success" label="Valid" hide-details density="compact" /></v-col>
                <v-col cols="auto"> <v-checkbox color="error" label="Invalid" hide-details density="compact" /></v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>

    <v-dialog v-model="disapproved_dialog" max-width="25%">
      <v-card>
        <v-card-text class="ma-4">
          <span>Reason : </span>
          <v-textarea v-model="reason" />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-row dense justify="center">
            <v-col cols="4">
              <v-btn @click="disapproved_dialog = false" variant="tonal" color="error" block>Cancel</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn @click="disapproved_applicant(applicant_details)" variant="tonal" color="success" block>
                Disapproved
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <commons-dialog width="auto" v-model="erf_history.dialog" icon="mdi-history" :title="erf_history.title" persistent>
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
    </commons-dialog>


    <pamphlets-evaluate-attachement :dialog="attach.dialog" :src="attach.src" :title="attach.title"
      @close="attach.dialog = false" />
  </v-sheet>
</template>
<script lang="ts" setup>
import swal from 'sweetalert';
const { $rest } = useNuxtApp()
const route = useRoute();
const application = ref({});

onBeforeMount(() => {
  get_applicant_details()
})
/**
 * START: ATTACHMENT VIEWING
 */
const enum Attachment {
  TOR = 'tors',
  SERVICE_RECORD = 'service-record',
  OMNIBUS = 'omnibus',
  PERMIT_STUDY = 'permit-study'
}

const attach = ref({ dialog: false, title: "", src: "" })
const open_attachment_dialog = (attachment: string) => {
  const attachments = applicant_details.value.attachments;

  switch (attachment) {
    case Attachment.TOR:
      attach.value = { dialog: true, src: attachments?.educational_attainment, title: "TOR" };
      break;

    case Attachment.PERMIT_STUDY:
      attach.value = { dialog: true, src: attachments?.permit_to_study, title: "Permit to Study" };
      break;

    case Attachment.SERVICE_RECORD:
      attach.value = { dialog: true, src: attachments?.service_record, title: "Service Record Attachment" };
      break;

    case Attachment.OMNIBUS:
      attach.value = { dialog: true, src: attachments?.omnibus, title: "Omnibus" };
      break;

    default:
      break;
  }
}
/**
 * END: ATTACHMENT
 */

const show_footer = ref(false);
const applicant_details = ref({} as Applicant)
async function get_applicant_details() {
  const { data, error } = await $rest('new-applicant/get-applicant', {
    method: 'GET',
    query: {
      id: route.query.id
    }
  })
  applicant_details.value = data
}

const erf_history = ref({ dialog: false, title: 'ERF Application History' })



const attainment_headers = [
  { title: 'Degree', key: 'degree' },
  { title: 'Institution', key: 'institution' },
  { title: 'Year Received', key: 'year_received' },
  { title: 'Board Examination', key: 'board_exam' },
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
    { title: 'School Year', key: 'sy' },
    { title: 'Number of Units', key: 'unit_no' },
    { title: 'Description', key: 'description' }
  ];

const created_date_formatted = computed(() => {
  const date = new Date(applicant_details.value.created_date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
});



const disapproved_dialog = ref(false);
const reason = ref('')
// Dissapproved Application
async function disapproved_applicant(item: any) {
  const { data, error } = await $rest('new-applicant/dissapproved-application', {
    method: "POST",
    body: {
      id: item._id,
      applicants_data: { ...item },
      reason: reason.value,
    }
  })
  if (!error) return swal({ title: "Successfully Dissapproved!", icon: "success" })
  return swal({ title: data, icon: "error" })
}
async function pending_applicant(item: any) {
  const { data, error } = await $rest('new-applicant/pending-application', {
    method: "POST",
    body: {
      id: item._id,
      applicants_data: { ...item },

    },
  })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

}


</script>
<style scoped>
* {
  font-size: 12px
}
</style>
