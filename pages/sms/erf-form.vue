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
              {{ new Date(applicant_details.created_date).toLocaleString() }}
            </v-chip></v-col>
        </v-row>
        <v-row no-gutters> <v-col cols="5" class="text-subtitle-2 font-weight-bold"> DIVISION : {{
          applicant_details?.division }} </v-col>
          <v-col cols="auto"> Control No. : <v-chip class="font-weight-bold" color="orange" density="compact"> {{
            applicant_details?.control_number }}
            </v-chip></v-col>
        </v-row>
      </v-col>
      <v-col cols="10" xxl="5" xl="5" lg="6" md="6" sm="10">
        <v-card class="mx-auto" border>

          <v-card-title class="d-flex align-center font-weight-bold">
            1. EQUIVALENT RECORD FORM <v-spacer /><span class="pr-2"> <v-btn
                @click="applicant_history(applicant_details._id)" class="font-weight-bold" prepend-icon="mdi-history"
                color="primary" block density="compact">View
                HISTORY</v-btn></span>
            <span> <v-btn @click="applicant_erf(applicant_details._id)" class="font-weight-bold"
                prepend-icon="mdi-printer" color="primary" block density="compact">
                Print
                ERF</v-btn></span>
          </v-card-title>
          <v-card-text class="pa-1 ma-0">
            <v-card flat>
              <v-row no-gutters class="ma-2">
                <v-col cols="6" class="text-capitalize">Name : <b> {{ applicant_details?.personal_information?.firstname
                }} {{ applicant_details?.personal_information?.lastname }} </b>
                </v-col>
                <v-col cols="6">Date of Birth : <b> {{
                  applicant_details?.personal_information?.birthday }}

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
                    <v-col cols="6"> Public Schools : <span class="pl-2"> {{
                      applicant_details?.equivalent_unit?.public_years_teaching }}</span>
                    </v-col>
                    <v-col cols="6"> Private Schools : <span class="pl-2"> {{
                      applicant_details?.equivalent_unit?.yt_equivalent }}
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
                    <v-col cols="6"> Public Schools : <b class="pl-2"> {{
                      applicant_details?.equivalent_unit?.public_years_teaching }}</b>
                    </v-col>
                    <v-col cols="6"> Private Schools : <b class="pl-2"></b>
                    </v-col>
                  </v-row>

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

          <v-card-text>
            <v-divider />
            <v-list lines="two">

              <v-list-item>
                <v-list-item-title class="font-weight-bold text-uppercase"> ACTION REQUIRED : </v-list-item-title>
                <v-list-item-title>1. Authenticated copy of Transcript of Records in the masteral course signed by the
                  School
                  Registra</v-list-item-title>
                <v-list-item-subtitle> <span class="text-red">REASON</span> : Tampered Attachment</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        <v-card class="mx-auto" flat>
          <v-card-actions>
            <v-row dense justify="center">
              <v-col cols="4">
                <v-btn @click="disapproved_dialog = true" variant="plain" color="error" block>Dissapproved</v-btn>
              </v-col>

              <v-col cols="4" v-if="user.role === 'Administrative Officer IV' && applicant_details.status === 'Pending'">
                <v-dialog width="500" v-model="evaluator_dialog">
                  <template v-slot:activator="{ props }">
                    <v-btn block variant="tonal" v-bind="props" text="Assign to Evaluator"
                      @click="evaluator_dialog = true">
                    </v-btn>
                  </template>
                  <template v-slot:default="{ isActive }">
                    <v-card title="Select an Evaluator">
                      <v-card-text>
                        <v-select :items="evaluators" item-value="_id" item-title="title" v-model="selected_evaluator" />
                      </v-card-text>
                      <v-card-actions class="align-center">
                        <v-row dense justify="center">
                          <v-col cols="5">
                            <v-btn @click="isActive.value = false" variant="tonal" color="error" block>CANCEL</v-btn>
                          </v-col>
                          <v-col cols="5">
                            <v-btn variant="tonal" color="success" block @click="assign_evaluator_applicant">
                              SUBMIT
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
              <v-col cols="4" v-else>
                <v-btn v-if="button_display(applicant_details.status)" @click="handle_application(true)" block
                  variant="tonal" color="success">
                  SUBMIT
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="10" xxl="3" xl="3" lg="4" md="6" sm="10">
        <v-sheet border class="pa-1" v-if="Object.keys(applicant_details).length">
          <v-sheet border v-for=" [key, value], index  in  Object.entries(applicant_details.attachments) ">
            <v-sheet border class="pa-4">
              <h6> {{ index + 1 }}.
                {{ value.description }}
              </h6>
              <v-btn size="small" color="primary" class="d-flex align-center" variant="tonal"
                @click="open_attachment_dialog(key)">
                <v-icon class="mr-2">mdi-attachment</v-icon>
                <span>View Attachment</span>
              </v-btn>
              <v-row dense>
                <v-col cols="auto" class="mt-3 font-weight-bold text-grey "> Evaluation :</v-col>
                <v-col cols="auto">
                  <v-checkbox color="success" label="Valid" @click="evaluate_attachment(key, true)" hide-details
                    density="compact" :model-value="getCheckboxValue(key, true)" />
                </v-col>
                <v-col cols="auto">
                  <v-checkbox color="error" label="Invalid" @click="evaluate_attachment(key, false)" hide-details
                    density="compact" :model-value="getCheckboxValue(key, false)" />
                </v-col>
                <v-col cols="12" v-if="applicant_details.attachments[key].valid == false">
                  <v-textarea label="Specify reason" v-model="remarks" rows="2" hide-details
                    @update:model-value="remarks_attachment(key)"
                    :model-value="applicant_details.attachments[key].remarks" bg-color="#E8EAF6" />
                </v-col>
              </v-row>
              <v-sheet v-if="value.registrar">
                <h6 class="font-weight-regular mt-2"> Registrar Complete Name : <b> {{
                  applicant_details?.transcript?.registrar_name }}</b>
                </h6>
                <h6 class="font-weight-regular"> Registrar Contact Number : <i class="font-weight-bold">{{
                  applicant_details?.transcript?.registrar_email }}</i></h6>
                <h6 class="font-weight-regular"> Registrar Email : <i class="font-weight-bold text-blue">{{
                  applicant_details?.transcript?.registrar_no }}</i></h6>
              </v-sheet>
            </v-sheet>
          </v-sheet>
        </v-sheet>
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
const router = useRouter();
import swal from 'sweetalert';
import useAuth from "~/store/auth";

const { $rest } = useNuxtApp()
const route = useRoute();

const user = useAuth().user;

onBeforeMount(() => {
  get_applicant_details()
  get_evaluators()
})

// EVALUATES ATTACHMENT

const evaluate_attachment = (key: string, value: boolean) => {
  applicant_details.value.attachments[key].valid = value;
}
const getCheckboxValue = (key: string, expectedValue: boolean) => {
  const attachment = applicant_details.value.attachments[key];
  return attachment.valid === expectedValue;
};
const remarks = ref("");
const remarks_attachment = (key: string) => {
  applicant_details.value.attachments[key].remarks = remarks.value
}
const showRemarks = ref({});
const toggleInvalid = (key: string) => {
  showRemarks[key] = !showRemarks[key];
};
/**
 * start: evaluator
 */
const evaluator_dialog = ref(false)
const selected_evaluator = ref("");
const evaluators = ref([]);
const get_evaluators = async () => {
  const role = user.role;
  if (role !== "Administrative Officer IV") return;

  const { data, error } = await $rest("new-applicant/get-evaluators", { method: "GET", query: { division_id: user.division } });
  if (error) return swal({ title: "Error", error: error, icon: "error", buttons: { ok: false, cancel: false } });
  evaluators.value = data;
}
async function assign_evaluator_applicant() {
  const payload = {
    app_id: route.query.id,
    evaluator: selected_evaluator.value
  }
  const { data, error } = await $rest('new-applicant/assign-evaluator-application', {
    method: "PUT",
    body: payload
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
/**
 * end : evaluator
 */


const handle_application = async (status: boolean) => {
  const role = user.role;

  const payload = {
    status,
    app_id: route.query.id
  };
  switch (role) {
    case "Principal":
      handle_principal(payload);
      break;
    case "Administrative Officer IV":
      handle_admin4(payload);
      break;
    case "Evaluator":
      handle_evaluator(payload);
      break;

    case "Verifier":
      handle_verifier(payload);
      break;

    case "Recommending Approver":
      handle_recommending_approver(payload);
      break;

    case "Approver":
      handle_approver(payload);
      break;

    default:
      break;
  }
}
/**
 * APPROVAL PROCCESS
 */
const handle_principal = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-principal', { method: "PUT", body: payload })
  if (error) return swal({ title: "Erro", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}

const handle_admin4 = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-admin4', { method: "PUT", body: payload })
  if (error) return swal({ title: "Erro", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}

const handle_evaluator = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-evaluator', { method: "PUT", body: payload })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}


const handle_verifier = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-verifier', { method: "PUT", body: payload })
  if (error) return swal({ title: "Erro", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}

const handle_recommending_approver = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-recommending-approver', { method: "PUT", body: payload })
  if (error) return swal({ title: "Erro", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}

const handle_approver = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-approver', { method: "PUT", body: payload })
  if (error) return swal({ title: "Erro", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}

const attach = ref({ dialog: false, title: "", src: "" })
const open_attachment_dialog = (attachment: string) => {
  const attachments = applicant_details.value.attachments;
  attach.value = { dialog: true, src: attachments[attachment], title: attachment };
}

const button_display = (status: string) => {
  return [
    'For Signature',
    'Pending',
    'For Evaluation',
    'For Checking',
    'For Verifying',
    'Recommending for Approval',
    'For Approval'
  ].includes(status);
};


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

// Table headers start
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
// Table headers end


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
// async function pending_applicant(item: any,) {
//   const { data, error } = await $rest('new-applicant/pending-application', {
//     method: "POST",
//     body: {
//       applicants_data: { ...item },
//     },
//   })
//   if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
//   return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

// }

// async function checking_applicant(item: any,) {
//   const { data, error } = await $rest('new-applicant/checking-application', {
//     method: "POST",
//     body: {
//       applicants_data: { ...item },
//     },
//   })
//   if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
//   return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

// }
// async function verifying_applicant(item: any,) {
//   const { data, error } = await $rest('new-applicant/verifying-application', {
//     method: "POST",
//     body: {
//       applicants_data: { ...item },
//     },
//   })
//   console.log(error);

//   if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
//   return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

// }
// async function recommending_approval_applicant(item: any,) {
//   const { data, error } = await $rest('new-applicant/handle-recommending-approver', {
//     method: "POST",
//     body: {
//       applicants_data: { ...item },
//     },
//   })
//   if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
//   return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

// }
// async function approval_applicant(item: any,) {
//   const { data, error } = await $rest('new-applicant/approval-application', {
//     method: "POST",
//     body: {
//       applicants_data: { ...item },
//     },
//   })
//   if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
//   return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

// }

const applicant_history = (id) => {
  router.push({
    name: 'sms-applicant-history',
    query: {
      id: id
    }
  });
}
const applicant_erf = (id) => {
  router.push({
    name: 'printable-new-erf',
    query: {
      id: id
    }
  });
}


</script>
<style scoped>
* {
  font-size: 12px
}
</style>
