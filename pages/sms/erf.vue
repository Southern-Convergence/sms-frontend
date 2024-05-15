<template>
  <div>
    <v-card-title class="font-weight-bold text-h6"> EVALUATION /
      LIST OF
      REQUIREMENTS FORM</v-card-title>
    <v-card-text>
      <!-- Application header -->
      <v-row no-gutters>
        <v-col cols="5" class="text-subtitle-2 font-weight-bold"> TO : REGIONAL DIRECTOR
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
        <v-spacer />

      </v-row>
      <!-- Application header -->
      <v-row no-gutters>

        <!-- Applicant Personal Information -->

        <v-col :cols="applicant_details.is_with_erf ? '8' : '12'">
          <v-card class="mx-auto mt-4" rounded="lg">
            <v-card-title class="d-flex  font-weight-bold">
              {{ applicant_details.is_with_erf === true ? '1. EQUIVALENT RECORD FORM ' : 'Applicant Details'
              }}<v-spacer /><span class="pr-2"> <v-btn v-if="applicant_details?.status != 'For Signature'"
                  @click="applicant_history(applicant_details._id)" class="font-weight-bold" prepend-icon="mdi-history"
                  color="primary" block density="compact">View
                  HISTORY</v-btn></span>
              <span>
                <v-btn v-if="applicant_details.is_with_erf" @click="applicant_erf(applicant_details._id)"
                  class="font-weight-bold" prepend-icon="mdi-printer" color="primary" block density="compact">
                  Print
                  ERF</v-btn></span>
            </v-card-title>
            <v-card-text>
              <v-row no-gutters class="ma-2">
                <v-col cols="6" class="text-capitalize">Name : <b> {{
                  applicant_details?.personal_information?.first_name
                    }} {{ applicant_details?.personal_information?.last_name }} </b>
                </v-col>
                <v-col cols="6">Date of Birth : <b> {{
                  applicant_details?.personal_information?.birthday }}
                  </b>
                </v-col>
                <v-col cols="6">Employee Number : <b> {{ applicant_details?.designation?.employee_no }}</b> </v-col>
                <v-col cols="6">Authorized Position Title : <b>{{ applicant_details?.designation?.current_position }}
                  </b></v-col>
                <v-col cols="6">Item Number : <b>{{ applicant_details?.designation?.item_no }}</b> </v-col>
                <v-col cols="6">Authorized Salary : <b>{{ applicant_details?.current_sg }}</b></v-col>
              </v-row>
              <!-- ERF -->
              <v-row no-gutters v-if="applicant_details.is_with_erf">
                <v-col cols="12">
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
                    LATEST IPCRF RATING : <div class="px-5 font-weight-bold" style="border-bottom: 1px solid black">
                      {{
                        applicant_details.designation?.ipcrf_rating }}</div>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>


        </v-col>


        <!-- Applicant Personal Information -->
        <!-- Applicant Attachment -->
        <v-col :cols="applicant_details.is_with_erf ? '4' : '12'" :class="applicant_details.is_with_erf ? 'pl-3' : ''"
          v-if="Object.keys(applicant_details).length">
          <v-row dense>
            <v-col :cols="applicant_details.is_with_erf ? '12' : '6'">
              <h5 class="pa-2 font-weight-bold text-subtitle-2 text-indigo"> Applicant Attachment</h5>
              <v-card class="mb-3" rounded="lg"
                v-for="[key, value], index in Object.entries(applicant_details.attachments) ">
                <v-card-text>
                  <h6> {{ index + 1 }}.
                    {{ value.description }}
                  </h6>
                  <v-btn size="small" color="primary" class="d-flex " variant="tonal"
                    @click="open_attachment_dialog(key)">
                    <v-icon class="mr-2">mdi-attachment</v-icon>
                    <span>View Attachment</span>
                  </v-btn>
                  <v-row dense v-if="sdo_attachment_evaluator_condition">
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
                      <v-textarea label="Specify reason" v-model="remarks" rows="2" hide-details="auto"
                        @update:model-value="remarks_attachment(key)"
                        :model-value="applicant_details.attachments[key].remarks" bg-color="#E8EAF6"
                        :rules="[v => !!v || 'Reason is required']" required />
                    </v-col>
                  </v-row>

                </v-card-text>
              </v-card>
            </v-col>
            <!-- SDO Attachment Form-->
            <!-- SDO Attachments -->

            <v-col :cols="applicant_details.is_with_erf ? '12' : '6'" v-if="!display_sdo_attachment_conditon">
              <h5 class="pa-2 font-weight-bold text-subtitle-2 text-indigo"> School Division Office</h5>
              <v-card class="mb-3" rounded="lg" v-if="Object.keys(applicant_details).length"
                v-for="  [key, value], index in Object.entries(applicant_details?.sdo_attachments)  ">
                <v-sheet class="pa-4">
                  <h6> {{ index + 1 }}.
                    {{ value?.description }}
                  </h6>
                  <v-btn size="small" color="primary" class="d-flex " variant="tonal"
                    @click="open_sdo_attachment_dialog(key)">
                    <v-icon class="mr-2">mdi-attachment</v-icon>
                    <span>View Attachment</span>
                  </v-btn>

                  <v-row dense v-if="sdo_attachment_evaluator_condition">
                    <v-col cols="auto" class="mt-3 font-weight-bold text-grey "> Evaluation :</v-col>
                    <v-col cols="auto">
                      <v-checkbox color="success" label="Valid" @click="evaluate_sdo_attachment(key, true)" hide-details
                        density="compact" :model-value="getsdoCheckboxValue(key, true)" />
                    </v-col>
                    <v-col cols="auto">
                      <v-checkbox color="error" label="Invalid" @click="evaluate_sdo_attachment(key, false)"
                        hide-details density="compact" :model-value="getsdoCheckboxValue(key, false)" />
                    </v-col>

                    <v-col cols="12" v-if="applicant_details?.sdo_attachments[key]?.valid == false">
                      <v-textarea label="Specify reason" v-model="remarks" rows="2" hide-details="auto"
                        @update:model-value="sdo_remarks_attachment(key)"
                        :model-value="applicant_details.sdo_attachments[key].remarks" bg-color="#E8EAF6"
                        :rules="[v => !!v || 'Reason is required']" required />
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-card>
            </v-col>
            <!-- SDO Attachments -->
            <v-col :cols="applicant_details.is_with_erf ? '12' : '6'"
              :class="applicant_details.is_with_erf ? '' : 'mt-7 pl-4'" v-if="is_render_sdo_attachment">

              <v-card class="my-2" rounded="lg">
                <v-card-text>
                  <v-alert density="compact" variant="tonal" type="info" closable>Attachments to be provided by the SDO
                    representative
                  </v-alert>
                  <div class="ma-3" v-for=" [name, value] in Object.entries(applicant_details.sdo_attachments) "
                    :key="name">
                    <h6 class="pl-10"> {{ name }}</h6>
                    <v-file-input class="mt-2" @update:model-value="sdo_evaluator_attach($event, name)" />
                  </div>
                </v-card-text>


              </v-card>
            </v-col>
            <!-- SDO Attachment Form-->
          </v-row>
        </v-col>
        <!-- Applicant Attachment -->

        <v-col cols="12" class="my-2"
          v-if="user && user.role === 'Evaluator' && applicant_details?.status === 'Approved for Printing'">
          <v-alert border="start" close-label="Close Alert" color="primary"
            title="Attach the Output Requirement for DBM." variant="outlined">
            <v-file-input class="mt-3" variant="solo" v-model="applicant_details.output_requirement"
              label="Output Requirement" />
          </v-alert>
        </v-col>

        <v-col cols="12" class="my-5" v-if="applicant_details.status === 'For DBM' && user.side == 'SDO'">

          <v-alert color="primary" border="start" variant="outlined" density="compact">
            <div>Is the reclassification approved by DBM?</div>
            <div class="d-flex w-50">
              <v-checkbox label="Yes" color="info" @click="is_approved(true)" hide-details
                :model-value="getapprvo(true)" />
              <v-checkbox label="No" color="error" @click="is_approved(false)" hide-details
                :model-value="getapprvo(false)" />
            </div>
          </v-alert>
        </v-col>
      </v-row>

    </v-card-text>
    <v-card-actions>
      <v-row justify="center">
        <v-col cols="6"
          v-if="user && user.role === 'Administrative Officer IV' && applicant_details.status === 'Pending'">
          <v-btn @click="evaluator_dialog = true" block variant="tonal" color="indigo"> Assign to Evaluator</v-btn>
        </v-col>
        <v-col cols="6"
          v-else-if="user && user.role === 'Administrative Officer V' && applicant_details.status === 'Pending'">
          <v-btn @click="ro_evaluator_dialog = true" block variant="tonal" color="indigo"> Assign to RO
            Evaluator</v-btn>
        </v-col>
        <v-col cols="6"
          v-else-if="user && user.role === ROLES.EVALUATOR && applicant_details?.status === 'Approved for Printing'">
          <v-btn variant="tonal" color="success" block @click="move_to_dbm">
            SUBMIT
          </v-btn>
        </v-col>
        <v-col cols="6" v-else-if="user && applicant_details?.status === 'For DBM' && user.side === 'SDO'"><v-btn
            color="primary" block @click="complete_reclass">Complete Reclassification</v-btn></v-col>
        <v-col cols="6" v-else-if="!user"> <v-btn @click="handle_principal" block variant="tonal" color="success">
            AUTHENTICATE
          </v-btn></v-col>
        <v-col cols="6" v-else-if="applicant_details?.status != 'Completed'">
          <v-btn @click="handle_application" block variant="tonal" color="success">
            SUBMIT
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>



    <v-dialog width="500" v-model="evaluator_dialog">
      <v-card title="Select an Evaluator">
        <v-card-text>
          <v-select :items="evaluators" item-value="_id" item-title="title" v-model="selected_evaluator" />
        </v-card-text>
        <v-card-actions class="">
          <v-row dense justify="center">
            <v-col cols="5">
              <v-btn @click="evaluator_dialog = false" variant="tonal" color="error" block>CANCEL</v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn :disabled="!selected_evaluator" variant="tonal" color="success" block
                @click="assign_evaluator_applicant">
                SUBMIT
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog width="500" v-model="ro_evaluator_dialog">
      <v-card title="Select an RO Evaluator">
        <v-card-text>
          <v-select :items="evaluators" item-value="_id" item-title="title" v-model="selected_ro_evaluator" />
        </v-card-text>
        <v-card-actions class="">
          <v-row dense justify="center">
            <v-col cols="5">
              <v-btn @click="isActive.value = false" variant="tonal" color="error" block>CANCEL</v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn variant="tonal" color="success" block @click="assign_ro_evaluator_applicant">
                RO SUBMIT
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <pamphlets-evaluate-attachement :dialog="attach.dialog" :src="attach.src" :title="attach.title"
      @close="attach.dialog = false" />

  </div>

</template>
<script lang="ts" setup>

const router = useRouter();
import swal from 'sweetalert';
import useAuth from "~/store/auth";
const user = useAuth().user;
const { $rest } = useNuxtApp()
const route = useRoute();

definePageMeta({
  layout: "plain"
})

onBeforeMount(() => {
  Promise.all([
    get_applicant_details(),
    get_evaluators(),
    get_ro_evaluators()
  ]);

  if (user) setPageLayout("barren");
});


const enum ROLES {
  PRINCIPAL = "Principal",
  ADMIN4 = "Administrative Officer IV",
  EVALUATOR = "Evaluator",
  VERIFIER = "Verifier",
  RECOMMENDING = "Recommending Approver",
  APPROVER = "Approver",
  ADMIN5 = "Administrative Officer V",
  RO_EVALUATOR = "RO Evaluator",
}


// EVALUATES APPLICANT ATTACHMENT
const evaluate_attachment = (key: string, value: boolean) => {
  applicant_details.value.attachments[key].valid = value;
}
const getCheckboxValue = (key: string, expected_value: boolean) => {
  const attachment = applicant_details.value.attachments[key];
  return attachment.valid === expected_value;
};
const remarks = ref("");
const remarks_attachment = (key: string) => {
  applicant_details.value.attachments[key].remarks = remarks.value
}
// EVALUATES APPLICANT ATTACHMENT
const evaluate_sdo_attachment = (key: string, value: boolean) => {
  applicant_details.value.sdo_attachments[key].valid = value;
}
const getsdoCheckboxValue = (key: string, expected_value: boolean) => {
  const sdo_attachment = applicant_details.value.sdo_attachments[key];
  return sdo_attachment?.valid === expected_value;
};
const sdo_remarks_attachment = (key: string) => {
  applicant_details.value.sdo_attachments[key].remarks = remarks.value
}


function truncate_lebel(text: string): string {
  const maxLength = 60;
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

/**
 * start: evaluator
 */
const evaluator_dialog = ref(false)
const ro_evaluator_dialog = ref(false)
const selected_evaluator = ref("");
const evaluators = ref([]);
const get_evaluators = async () => {
  const role = user && user.role;
  if (role !== ROLES.ADMIN4) return;
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
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });
  router.push({ name: 'sms-reclassification' });
}

async function move_to_dbm() {
  /* @ts-ignore */
  applicant_details.value.output_requirement[0] = {
    data: applicant_details.value.output_requirement[0],
    name: applicant_details.value.output_requirement[0].name,
    type: applicant_details.value.output_requirement[0].type,
  }
  const form = new FormData();
  form.append("sms", applicant_details.value.output_requirement[0].data)
  form.append("app_id", applicant_details.value._id);

  const { data, error } = await $rest('new-applicant/assign-to-dbm', {
    method: "POST",
    body: form
  })

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });
  router.push({ name: 'sms-reclassification' });
}
const is_approved = (value: boolean) => {
  applicant_details.value.approved = value;
}
const getapprvo = (expected_value: boolean) => {
  return applicant_details.value.approved === expected_value;
};
async function complete_reclass() {
  let approval_status = applicant_details.value.approved;
  const payload = {
    app_id: route.query.id,
    approved: approval_status
  };
  const { data, error } = await $rest('new-applicant/complete-application', {
    method: "PUT",
    body: payload
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });

}

const selected_ro_evaluator = ref("");
const get_ro_evaluators = async () => {
  const role = user && user.role;
  if (role !== ROLES.ADMIN5) return;
  const { data, error } = await $rest("new-applicant/get-ro-evaluators", { method: "GET", query: {} });
  if (error) return swal({ title: "Error", error: error, icon: "error", buttons: { ok: false, cancel: false } });
  evaluators.value = data;
}
async function assign_ro_evaluator_applicant() {
  const payload = {
    app_id: route.query.id,
    evaluator: selected_ro_evaluator.value
  }
  const { data, error } = await $rest('new-applicant/assign-ro-evaluator-application', {
    method: "PUT",
    body: payload
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })

  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
/**
 * end : evaluator
 */



const handle_application = async () => {
  const role = user && user.role;
  const side = user && user.side;
  const status = applicant_details.value.status;
  const attachment = applicant_details.value.attachments;

  const is_attachment_valid = Object.values(applicant_details.value.attachments).every(attachment => typeof attachment.valid === 'boolean');
  const sdo_attachment = applicant_details.value.sdo_attachments;
  const is_sdo_attachment_valid = Object.values(applicant_details.value.sdo_attachments).every(sdo_attachment => typeof sdo_attachment?.valid === 'boolean');

  if (!is_attachment_valid && !(["Pending", "Approved for Printing", "For DBM"].includes(status) || (status === 'For Verifying' && user.side === 'RO'))) {
    return swal({
      title: "Evaluate Attachments",
      icon: "warning",
      buttons: { ok: false, cancel: false }
    });
  };
  if (!is_sdo_attachment_valid && ([,
    "Pending", "For Verifying", "Approved for Printing", "For DBM"].includes(status) &&
    !(["For Evaluation", "For Verifying"].includes(status) && side === "SDO"))
  ) {
    return swal({
      title: "Evaluate SDO Attachments",
      icon: "warning",
      buttons: { ok: false, cancel: false }
    });
  }
  const missing_attachment = Object.values(sdo_attachment).some(file => file === null || file === undefined);

  if (missing_attachment && side === "SDO") {
    return swal({
      title: "Missing Attachments",
      text: "Please ensure all required attachments are provided.",
      icon: "info"
    });

  }
  const payload = {
    attachment,
    sdo_attachment,
    status,
    app_id: route.query.id,

  };
  switch (role) {
    case "Administrative Officer IV":
      handle_admin4(payload);
      break;
    case "Evaluator":
      handle_evaluator(payload);
      break;
    case "Verifier":
      handle_verifier(payload);
      break;

    case "Administrative Officer V":
      handle_admin5(payload);
      break;
    default:
      break;
  }
}



const is_render_sdo_attachment = computed(() => {
  if (!user) return false;
  const status = applicant_details.value.status
  const side = user.side === 'SDO'
  return user.role === 'Evaluator' && status === 'For Evaluation' && side;
});




const display_sdo_attachment_conditon = computed(() => {
  if (!user) return true;
  const admin4 = user.role === 'Administrative Officer IV' && applicant_details.value.status === 'Pending';
  const evaluator = user.role === 'Evaluator' && applicant_details.value.status === 'For Evaluation' && user.side === 'SDO';
  return admin4 || evaluator;
});


const sdo_attachment_evaluator_condition = computed(() => {
  if (!user) return true;
  const valid = ['For Checking', 'For Evaluation'].includes(applicant_details.value.status);
  return valid
})

const sdo_evaluator_attach = (data: any, title: string) => {
  applicant_details.value.sdo_attachments[title] = data
}





/**
 * APPROVAL PROCCESS
 */

const clear_attachment = () => {
  const attachments = applicant_details.value.attachments;
  Object.values(attachments).forEach(attachment => {
    attachment.valid = null;
    attachment.remarks = null;
    attachment.timestamp = null;
  });
};

const clear_sdo_attachment = () => {
  const sdo_attachments = applicant_details.value.sdo_attachments;
  Object.values(sdo_attachments).forEach(attachment => {
    attachment.valid = null;
    attachment.remarks = null;
    attachment.timestamp = null;
  });

};

const handle_principal = async () => {
  const attachment = applicant_details.value.attachments;
  const sdo_attachment = applicant_details.value.sdo_attachments;
  const is_attachment_valid = Object.values(applicant_details.value.attachments).every(attachment => typeof attachment.valid === 'boolean');
  if (!is_attachment_valid) {
    return swal({
      title: "Evaluate Attachments",
      icon: "warning",
      buttons: { ok: false, cancel: false }
    });
  };
  const payload = {
    app_id: route.query.id,
    attachment,
    sdo_attachment,

  };

  const { data, error } = await $rest('new-applicant/handle-principal', { method: "PUT", body: payload })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
  clear_attachment()
  router.push({ name: 'sms-reclassification' });
}
const handle_admin4 = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-admin4', { method: "PUT", body: payload })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
  clear_attachment();
  clear_sdo_attachment();
  router.push({ name: 'sms-reclassification' });

}
const handle_evaluator = async (payload: any) => {
  const temp = new FormData();

  const attachment = applicant_details.value.sdo_attachments;

  Object.entries(attachment).forEach(([title, file]) => {
    if (file?.length)
      file.forEach((v: any) => {
        const key = `${title}-${v.name}`;
        temp.append(key, v)
      })
  });
  temp.append("form", JSON.stringify(payload));
  const { data, error } = await $rest('new-applicant/handle-evaluator', { method: "PUT", body: temp })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
  clear_attachment();
  clear_sdo_attachment();
  router.push({ name: 'sms-reclassification' });

}
const handle_verifier = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-verifier', { method: "PUT", body: payload })
  if (error) return swal({ title: "Erro", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })

  router.push({ name: 'sms-reclassification' });
}


const handle_admin5 = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-admin5', { method: "PUT", body: payload });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ text: data, icon: "success", buttons: { ok: false, cancel: false } })
  clear_attachment();
  clear_sdo_attachment();
  router.push({ name: 'sms-reclassification' })
};



const attach = ref({ dialog: false, title: "", src: "" })
const open_attachment_dialog = (attachment: string) => {
  const attachments = applicant_details.value.attachments;
  attach.value = { dialog: true, src: attachments[attachment], title: attachment };
}
const open_sdo_attachment_dialog = (attachment: string) => {
  const sdo_attachments = applicant_details.value.sdo_attachments;
  attach.value = { dialog: true, src: sdo_attachments[attachment], title: attachment };
}


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

// Table headers start
const attainment_headers = [
  { title: 'Degree', key: 'degree', sortable: false },
  { title: 'Institution', key: 'institution', sortable: false },
  { title: 'Year Received', key: 'year_received', sortable: false },
  { title: 'Board Examination', key: 'board_exam', sortable: false },
  { title: 'Rating', key: 'rating', sortable: false },
  { title: 'Date', key: 'date', sortable: false },
];
const service_record_headers = [
  { title: 'Designation', key: 'designation', sortable: false },
  { title: 'From', key: 'from', sortable: false },
  { title: 'To', key: 'to', sortable: false }
];
const professional_study_headers =
  [
    { title: 'School Year', key: 'sy', sortable: false },
    { title: 'Number of Units', key: 'unit_no', sortable: false },
    { title: 'Description', key: 'description', sortable: false }
  ];
// Table headers end




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
    name: 'printable-erf',
    query: {
      id: id
    }
  });
}




</script>
<style scoped>
* {
  font-size: 13px
}

.v-file-input__label {
  max-width: 100%;
  word-break: break-all;
}
</style>
