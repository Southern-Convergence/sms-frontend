<template>
  <v-sheet>
    <!-- cols="10" xxl="8" xl="8" lg="10" -->
    <v-row dense justify="center">
      <v-col cols="12" class="font-weight-bold text-h6">
        EVALUATION / LIST OF REQUIREMENTS FORM
      </v-col>
      <v-col cols="12">
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
          <v-spacer />
          <v-col cols="auto" v-if="user.role === 'Approver'"> <span> <v-btn
                @click="applicant_endorsement(applicant_details._id)" color="amber" block density="compact"> View
                Generated Endorsement Letter
              </v-btn></span></v-col>

        </v-row>
      </v-col>
      <!-- xxl="5" xl="5" lg="6" md="6" sm="10" -->
      <v-col cols="8" xl="8" lg="8" md="12" sm="12" xs="12">
        <v-card class="mx-auto" border>

          <v-card-title class="d-flex  font-weight-bold">
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
                <v-col cols="6" class="text-capitalize">Name : <b> {{ applicant_details?.personal_information?.first_name
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
                LATEST IPCRF RATING : <div class="px-5 font-weight-bold" style="border-bottom: 1px solid black"> {{
                  applicant_details.designation?.ipcrf_rating }}</div>
              </v-row>

              <v-row justify="center">
                <v-divider />

                <v-col cols=" 6" v-if="ROLES.ADMIN4 && applicant_details.status === 'Pending'">
                  <v-dialog width="500" v-model="evaluator_dialog">
                    <template v-slot:activator="{ props }">
                      <v-btn block variant="tonal" v-bind="props" text="Assign to Evaluator"
                        @click="evaluator_dialog = true">
                      </v-btn>
                    </template>
                    <template v-slot:default="{ isActive }">
                      <v-card title="Select an Evaluator">
                        <v-card-text>
                          <v-select :items="evaluators" item-value="_id" item-title="title"
                            v-model="selected_evaluator" />
                        </v-card-text>
                        <v-card-actions class="">
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
                <v-col cols="6" v-else-if="user.role === ROLES.ADMIN5 && applicant_details?.status === 'Completed'">
                  <v-dialog width=" 500" v-model="evaluator_dialog">
                    <template v-slot:activator="{ props }">
                      <v-btn block variant="tonal" v-bind="props" text="Assign to RO Evaluator"
                        @click="evaluator_dialog = true">
                      </v-btn>
                    </template>
                    <template v-slot:default="{ isActive }">
                      <v-card title="Select an Evaluator">
                        <v-card-text>
                          <v-select :items="evaluators" item-value="_id" item-title="title"
                            v-model="selected_ro_evaluator" />
                        </v-card-text>
                        <v-card-actions class="">
                          <v-row dense justify="center">
                            <v-col cols="5">
                              <v-btn @click="isActive.value = false" variant="tonal" color="error" block>CANCEL</v-btn>
                            </v-col>
                            <v-col cols="5">
                              <v-btn variant="tonal" color="success" block @click="assign_ro_evaluator_applicant">
                                SUBMIT
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-col>
                <v-col cols="6" v-else>
                  <v-btn @click="handle_application" block variant="tonal" color="success">
                    SUBMIT
                  </v-btn>
                </v-col>
              </v-row>
              <!-- <v-row dense justify="center">

                <v-col cols="5">
                  <pamphlets-attach-signature name="Marianne Mae Paclian" position="Teacher" />
                </v-col>
              </v-row> -->
            </v-card>
          </v-card-text>


        </v-card>

      </v-col>

      <!-- xxl="3" xl="3" lg="4" md="6" sm="10" -->
      <v-col cols="4" xl="4" lg="4" md="12" sm="12" xs="12">

        <v-sheet border class="pa-1" v-if="Object.keys(applicant_details).length">
          <v-sheet border v-for="  [key, value], index   in   Object.entries(applicant_details.attachments)  ">
            <v-sheet border class="pa-4">
              <h6> {{ index + 1 }}.
                {{ value.description }}
              </h6>
              <v-btn size="small" color="primary" class="d-flex " variant="tonal" @click="open_attachment_dialog(key)">
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
                  <v-textarea label="Specify reason" v-model="remarks" rows="2" hide-details="auto"
                    @update:model-value="remarks_attachment(key)"
                    :model-value="applicant_details.attachments[key].remarks" bg-color="#E8EAF6"
                    :rules="[v => !!v || 'Reason is required']" required />
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
        <!-- <v-sheet border class="pa-1">
          <v-sheet border class="pa-4"><v-list lines="auto" color="error">
              <h5 class=" font-weight-bold text-uppercase text-subtitle-2 text-red"> ACTION REQUIRED: </h5>
              <v-list-item v-for="(attachment, key) in invalid_attachments" :key="key">
                <v-list-title> ATTACHMENT : <b>{{ attachment.description }}</b></v-list-title>
                <v-list-item-subtitle>
                  <span class="text-red">REASON</span> : {{ attachment.remarks }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-sheet> -->
        <v-sheet border class="pa-1" color="#ECEFF1" v-if="is_render_sdo_attachment">
          <v-sheet border>
            <h5 class="pa-2 font-weight-bold text-subtitle-1"> School Division Office</h5>
            <v-divider />
            <v-card-text>
              <v-alert density="compact" variant="tonal" type="info" closable>The SDO representative needs to provide
                attachments.
              </v-alert>
              <v-file-input class="mt-2" v-for=" [name, value]  in  Object.entries(applicant_details.sdo_attachments) "
                :key="name" :label="name" @update:model-value="sdo_evaluator_attach($event, name)" />
            </v-card-text>
          </v-sheet>

        </v-sheet>

        <v-sheet border class=" pa-1" v-if="!is_render">
          <h5 class=" pa-2 font-weight-bold text-subtitle-1"> School Division Office</h5>
          <v-sheet v-if="Object.keys(applicant_details).length" border
            v-for="  [key, value], index   in   Object.entries(applicant_details?.sdo_attachments)  ">
            <v-sheet border class="pa-4">
              <h6> {{ index + 1 }}.
                {{ value?.description }}
              </h6>
              <v-btn size="small" color="primary" class="d-flex " variant="tonal"
                @click="open_sdo_attachment_dialog(key)">
                <v-icon class="mr-2">mdi-attachment</v-icon>
                <span>View Attachment</span>
              </v-btn>

              <v-row dense>
                <v-col cols="auto" class="mt-3 font-weight-bold text-grey "> Evaluation :</v-col>
                <v-col cols="auto">
                  <v-checkbox color="success" label="Valid" @click="evaluate_sdo_attachment(key, true)" hide-details
                    density="compact" :model-value="getsdoCheckboxValue(key, true)" />
                </v-col>
                <v-col cols="auto">
                  <v-checkbox color="error" label="Invalid" @click="evaluate_sdo_attachment(key, false)" hide-details
                    density="compact" :model-value="getsdoCheckboxValue(key, false)" />
                </v-col>

                <v-col cols="12" v-if="applicant_details?.sdo_attachments[key]?.valid == false">
                  <v-textarea label="Specify reason" v-model="remarks" rows="2" hide-details="auto"
                    @update:model-value="sdo_remarks_attachment(key)"
                    :model-value="applicant_details.sdo_attachments[key].remarks" bg-color="#E8EAF6"
                    :rules="[v => !!v || 'Reason is required']" required />
                </v-col>
              </v-row>

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
    <pamphlets-evaluate-attachement :dialog="attach.dialog" :src="attach.src" :title="attach.title"
      @close="attach.dialog = false" />
  </v-sheet>
</template>
<script lang="ts" setup>
definePageMeta({ layout: "barren" })
const router = useRouter();
import swal from 'sweetalert';
import useAuth from "~/store/auth";
const user = useAuth().user;
const { $rest } = useNuxtApp()
const route = useRoute();



onBeforeMount(() => {
  Promise.all([
    get_applicant_details(),
    get_evaluators(),
    get_ro_evaluators()
  ])
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

const sdo_attach_render = computed(() => {
  const status = applicant_details.value.status;
  const side = user.side;
  const has_attach = applicant_details.value.sdo_attachments && Object.keys(applicant_details.value.sdo_attachments).length > 0;
  const is_hide = status === 'For Evaluation' && side === 'SDO' || status === 'Pending' || status === 'For Signature';
  return has_attach && !is_hide;
});

const show_remarks = ref({});
const toggleInvalid = (key: string) => {
  show_remarks[key] = !show_remarks[key];
};

const clear_attachments = () => {
  for (const key in applicant_details.value.attachments) {
    applicant_details.value.attachments[key].valid = null;
    applicant_details.value.attachments[key].remarks = null;
  }
};
const clear_sdo_attachments = () => {
  for (const key in applicant_details.value.sdo_attachments) {
    applicant_details.value.sdo_attachments[key].valid = null;
    applicant_details.value.sdo_attachments[key].remarks = null;
  }
};
/**
 * start: evaluator
 */
const evaluator_dialog = ref(false)

const selected_evaluator = ref("");
const evaluators = ref([]);
const get_evaluators = async () => {
  const role = user.role;
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
  clear_attachments();
  clear_sdo_attachments();
  router.push({ name: 'sms-reclassification' });
}

const selected_ro_evaluator = ref("");
const get_ro_evaluators = async () => {
  const role = user.role;
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
  clear_attachments();
  clear_sdo_attachments();
  router.push({ name: 'sms-reclassification' });
}
/**
 * end : evaluator
 */


const handle_application = async () => {
  const role = user.role;
  const attachment = applicant_details.value.attachments;
  const is_attachment_valid = Object.values(applicant_details.value.attachments).every(attachment => typeof attachment.valid === 'boolean');

  const sdo_attachment = applicant_details.value.sdo_attachments
  const is_sdo_attachment_valid = Object.values(applicant_details.value.sdo_attachments).every(sdo_attachment => typeof sdo_attachment?.valid === 'boolean');

  if (!is_attachment_valid) {
    return swal({
      title: "Evaluate Attachments",
      icon: "warning",
      buttons: { ok: false, cancel: false }
    });
  };
  if (!is_sdo_attachment_valid && !["Principal", "Administrative Officer IV", "Evaluator"].includes(role)) {
    return swal({
      title: "Evaluate SDO Attachments",
      icon: "warning",
      buttons: { ok: false, cancel: false }
    });
  };

  const payload = {
    attachment,
    sdo_attachment,
    app_id: route.query.id,
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

    case "Administrative Officer V":
      handle_admin5(payload);
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

const invalid_attachments = computed(() =>
  applicant_details.value?.attachments
    ? Object.fromEntries(
      Object.entries(applicant_details.value.attachments)
        .filter(([key, attachment]) => !attachment.valid)
    )
    : {}
);



const is_render_sdo_attachment = computed(() => {
  const sdo_attch = applicant_details.value.sdo_attachments
  const side = user.side === 'SDO'
  return user.role === ROLES.EVALUATOR && sdo_attch && side;
});

const is_render = computed(() => {
  const evaluator = user.role === ROLES.EVALUATOR && user.side === 'SDO'
  const principal = user.role === ROLES.PRINCIPAL
  const admin4 = user.role === ROLES.ADMIN4 && applicant_details?.value.status === 'Pending'
  return evaluator || principal || admin4;
});

const sdo_evaluator_attach = (data: any, title: string) => {
  applicant_details.value.sdo_attachments[title] = data
}
/**
 * APPROVAL PROCCESS
 */


// };
const handle_principal = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-principal', { method: "PUT", body: payload })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
  clear_attachments();
  router.push({ name: 'sms-reclassification' });

}
const handle_admin4 = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-admin4', { method: "PUT", body: payload })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
  clear_attachments();
  clear_sdo_attachments();
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
  clear_attachments();
  clear_sdo_attachments();
  router.push({ name: 'sms-reclassification' });
}
const handle_verifier = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-verifier', { method: "PUT", body: payload })
  if (error) return swal({ title: "Erro", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
  clear_attachments();
  clear_sdo_attachments();
  router.push({ name: 'sms-reclassification' });
}

const handle_recommending_approver = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-recommending-approver', { method: "PUT", body: payload })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
  clear_attachments();
  clear_sdo_attachments();
  router.push({ name: 'sms-reclassification' });
}

const handle_approver = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-approver', { method: "PUT", body: payload })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ text: data, icon: "success", buttons: { ok: false, cancel: false } })
  clear_attachments();
  clear_sdo_attachments();
  router.push({ name: 'sms-reclassification' });
}

const handle_admin5 = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-admin5', { method: "PUT", body: payload })
  if (error) return swal({ title: "Erro", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
  clear_attachments();
  clear_sdo_attachments();
  router.push({ name: 'sms-reclassification' });
}
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
const applicant_endorsement = (id) => {
  router.push({
    name: 'printable-endorsement-letter',
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
</style>
