<template>
  <div class="pa-3">
    <v-window v-model="tab">

      <v-window-item v-for="status in tabItems" :key="status.value" :value="status.value">
        <v-card-text class="overflow-y-auto mt-4">

          <v-row no-gutters>
            <v-col cols="12">

              <div class="w-100 text-primary text-h5 mb-0">List of Reclassification Application</div>
              <div class="w-100 text-subtitle-2 text-grey mt-0 mb-2">A brief overview of reclassification applications.

              </div>

            </v-col>

          </v-row>

          <v-row dense v-if="user.role === 'Administrative Officer V' || user.role === 'Administrative Officer IV'">
            <v-col cols="6" class="mb-2" v-if="user.role === 'Administrative Officer IV'">
              <v-alert closable icon="mdi-information" variant="tonal" color="primary"> Reclass application with status
                <b>Approval
                  for
                  Printing</b> or marked with a <b>with ERF</b>, please proceed to print the Applicant Equivalent Record
                Form.
                Obtain
                the signature of your Schools Division Superintendent and send the completed form along with the
                applicant's original documents.</v-alert>

            </v-col>

            <v-spacer />
            <v-col cols="2"> <v-select class="pr-2" label="Filter by Position" v-model="selected_position"
                :items="positions" item-value="_id" persistent-hint clearable /></v-col>
            <v-col cols="2" v-if="user.role === 'Administrative Officer V'"> <v-select class="pr-2"
                label="Filter by SDO" v-model="selected_sdo" :items="sdo" item-value="_id" persistent-hint
                clearable /></v-col>
            <v-col cols="2" v-if="user.role === 'Administrative Officer V'"> <v-select label="Filter by Status"
                v-model="selected_status" :items="['Pending', 'Received Printout/s']" persistent-hint clearable />
            </v-col>
            <v-col cols="auto" class="text-grey d-flex">
              <v-btn @click="get_application" class="mt-1" color="primary">
                <v-icon class="pr-1">mdi-filter</v-icon>Filter</v-btn>
            </v-col>
            <v-col cols="auto" v-if="selected_status === 'Pending'">
              <v-btn @click="evaluators_dialog = true" class="mt-1" color="primary">Assign to
                Evaluator</v-btn>
            </v-col>
            <v-col cols="auto" v-if="selected_status === 'Received Printout/s'">
              <v-btn @click="endorsement_dialog = true" class="mt-1" color="amber">Generate
                Endorsment
              </v-btn>
            </v-col>

          </v-row>

          <commons-item-container title="Reclass Application/s" icon="mdi-note-text-outline"
            :items="get_applicant_by_status(status.value)" :display_types="['grid', 'table']">

            <template v-slot:item="{ value, index, display }">

              <v-card @click="load_erf_form(value._id)" class="mx-auto reclass-item" rounded="lg" border
                :class="{ 'elevation-4': is_hovered }"
                v-if="get_applicant_by_status(status.value).some(applicant => Object.keys(applicant).length > 0)">

                <v-card-text>
                  <div class="d-flex mt-1">
                    <div class="pr-3">
                      <v-img :width="80" aspect-ratio="4/3" cover>
                        <v-avatar v-bind="$attrs" class="ml-2" color="primary" style="cursor: pointer" size="62">
                          <span class="text-h6">{{ value.first_name.charAt(0) }}{{ value.last_name.charAt(0) }}</span>
                        </v-avatar>
                      </v-img>
                    </div>
                    <div>
                      <div class="w-40 text-body-1 font-weight-bold d-flex">
                        {{ value.full_name }}

                      </div>

                      <div class="mb-1 text-body-2 text-grey">{{ value.position }}
                        <i class="font-weight-regular text-primary" v-if="value.is_with_erf" color="primary">(with
                          ERF)</i>
                      </div>

                      <div class="text-body-2">Division: {{ value.division }}</div>
                      <div class="text-body-2" v-if="typeof value.approved === 'boolean'"> This
                        reclassification was
                        <span :class="value.approved ? 'text-success' : 'text-error'">
                          <i>{{ value.approved === true ? 'approved' : 'disapproved' }}</i>
                        </span> by DBM.
                      </div>

                    </div>
                  </div>
                  <div class="d-flex">
                    <div class="text-overline d-flex">
                      Control Number: <b class="text-indigo">{{ value.control_number }}</b>
                    </div>
                    <v-spacer />
                    <v-chip color="success">{{ value.status }}</v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </template>

            <template v-slot:table="{ items }">
              <v-sheet border>
                <v-data-table :items="items" :headers="table_headers">
                  <template v-slot:item.control_number="{ item }">
                    <span class="text-primary">{{ item.selectable.control_number }}</span>
                  </template>
                  <template v-slot:item.status="{ item }">
                    <v-chip color="success" variant="text">{{ item.selectable.status }}</v-chip>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn density="compact" color="primary"
                      @click="load_erf_form(item.selectable._id)">Evaluate</v-btn>
                  </template>
                </v-data-table>
              </v-sheet>
            </template>
          </commons-item-container>
        </v-card-text>
      </v-window-item>
    </v-window>
    <v-dialog width="500" v-model="evaluators_dialog">
      <v-card title="Select an RO Evaluator">
        <v-card-text>
          {{ selected_ro_evaluator }}
          <v-select :items="evaluators" item-value="_id" item-title="title" v-model="selected_ro_evaluator" />
        </v-card-text>
        <v-card-actions class="">
          <v-row dense justify="center">
            <v-col cols="5">
              <v-btn @click="isActive.value = false" variant="tonal" color="error" block>CANCEL</v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn :disabled="!selected_ro_evaluator" variant="tonal" color="success" block @click="assign_evaluator">
                ASSIGN
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>


    </v-dialog>

    <v-dialog width="900px" v-model="endorsement_dialog">
      <v-card title="Generate Endorsement Letter">
        <v-card-text class="pa-5">

          <h5 class="text-center">
            1st Indorsement <br />
            {{ new Date().toLocaleDateString('en-US', {
              month: 'long', day:
                'numeric', year: 'numeric'
            }) }}
          </h5>


          <p class="ma-5">
            Respectfully transmitted to the <b>Regional Director,
              Department of Budget and Management, National Capital Region</b>,<b> Misamis St., Bago Bantay, Quezon
              City</b>,
            enclosing herein with copies of the Plantilla Allocation List covering the implementing approved Equivalent
            Record Forms (ERF) of the folliwing Master Teacher IV, <b> Division of Manila</b>, this Region, for
            post-audit
            and
            approval,
            chargeable
            against the lump su, appropriation for reclassification of positions for CY 2024 to with:


            <v-card class="mt-5" flat>
              <!-- <v-data-table :headers="endorsement_headers" :items="application_data" /> -->

              <table style="width: 100%;" class="pa-2">
                <thead>
                  <tr style="border-bottom: 1px solid black">
                    <th style="width: 50%; text-align: start;">NAME</th>
                    <th style="width: 25%;">FROM</th>
                    <th style="width: 25%;">TO</th>

                  </tr>
                </thead>

                <tbody class="mt-1">

                  <tr v-for="(app, index) in application_data" :key="index">
                    <td style="width: 50%; text-align: start;">{{ app.full_name }}</td>
                    <td style="width: 25%; text-align: center;">{{ app.current_position }}</td>
                    <td style="width: 25%; text-align: center;">{{ app.position }}</td>
                  </tr>
                </tbody>
              </table>
            </v-card>



          </p>
        </v-card-text>
        <v-card-actions>
          <v-row dense justify="center">
            <v-col cols="5">
              <v-btn variant="tonal" color="error" block @click="endorsement_dialog = true">CANCEL</v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn @click="generate_endorsement" variant="tonal" color="success" block>
                GENERATE
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
definePageMeta({ layout: "std-systems" });
const { $rest } = useNuxtApp();
import swal from 'sweetalert';
import useAuth from "~/store/auth";
const user = useAuth().user;
const route = useRoute();

onBeforeMount(() => {
  Promise.all([
    get_application(),
    get_sdo(),
    get_position(),
    get_ro_evaluators(),

  ]);

});
const endorsement_dialog = ref(false)
const tab = ref(null);
const is_hovered = ref(false);
const evaluators_dialog = ref(false)
const tabItems = ref([
  { label: 'For Signature', value: 'For Signature' },
  { label: 'Pending', value: 'Pending' },
  { label: 'For Evaluation', value: 'For Evaluation' },
  { label: 'For Checking', value: 'For Checking' },
  { label: 'Verifying', value: 'For Verifying' },
  { label: 'Recommending for Approval', value: 'Recommending for Approval' },
  { label: 'For Approval', value: 'For Approval' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Disapproved', value: 'Dissapproved' },
]);

const table_headers = ref([
  { title: "Applicant Name", key: "full_name", sortable: false },
  { title: "School", key: "school", sortable: false },
  { title: "Division", key: "division", sortable: false },
  { title: "Position", key: "position", sortable: false },
  { title: "Control Number", key: "control_number", sortable: false },
  { title: "Status", key: "status", sortable: false },
  { title: "Actions", key: "actions", sortable: false, align: "center" },
])
const endorsement_headers = ref([
  { title: "Applicant Name", key: "full_name", sortable: false },
  { title: "From", key: "current_position", sortable: false },
  { title: "To", key: "position", sortable: false },

])


const selected_status = ref("");



const application_data = ref([]);
async function get_application() {
  const payload = {
    position: selected_position.value,
    sdo: selected_sdo.value,
    status: selected_status.value,

  };

  const { data, error } = await $rest('new-applicant/get-application', {
    method: "GET",
    query: payload,
  });
  application_data.value = data;


}


const sdo = ref([]);
const selected_sdo = ref("");
async function get_sdo() {
  const { data, error } = await $rest('new-applicant/get-all-sdo', {
    method: "GET"
  });

  sdo.value = data;

};



const positions = ref([]);
const selected_position = ref("");
async function get_position() {
  const { data, error } = await $rest('new-applicant/get-all-position', {
    method: "GET"
  });

  positions.value = data;

}

const get_applicant_by_status = (status) => {
  return application_data.value && application_data.value.length > 0
    ? application_data.value
    : []; ``
};

const load_erf_form = (id: any) => {
  router.push({
    name: 'sms-erf',
    query: {
      id: id
    }
  });
}

const evaluators = ref([]);
const selected_ro_evaluator = ref("");
const get_ro_evaluators = async () => {
  const { data, error } = await $rest("new-applicant/get-ro-evaluators", { method: "GET", query: {} });
  if (error) return swal({ title: "Error", error: error, icon: "error", buttons: { ok: false, cancel: false } });
  evaluators.value = data;
}
async function assign_evaluator() {
  await get_application();
  const all_id = application_data.value.map((item: any) => item._id);
  const payload = {
    applicants: all_id,
    evaluator: selected_ro_evaluator.value
  };
  const { data, error } = await $rest('new-applicant/assign-multiple-evaluator-application', {
    method: "PUT",
    body: payload
  });

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  return swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });
}

async function generate_endorsement() {



  const all_id = application_data.value.map((item: any) => item._id);
  const payload = {
    applicants: all_id,
    division: selected_sdo.value,
    position: selected_position.value,
    generated_by: user?._id,
    genarated_date: new Date()

  };

  const { data, error } = await $rest('sms-endorsement/generate-endorsement', {
    method: "POST",
    body: payload,
  });

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  return swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });
}





</script>

<style scoped>
.reclass-item {
  transition: background-color 0.3s ease-in-out;
}

.reclass-item:hover {
  background-color: #E8EAF6;

}
</style>