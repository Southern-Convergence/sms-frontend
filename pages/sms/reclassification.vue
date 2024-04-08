<template>
  <div class="pa-3">
    <v-window v-model="tab">
      <v-window-item v-for="status in tabItems" :key="status.value" :value="status.value">
        <v-card-text class="overflow-y-auto mt-4">
          <v-row no-gutters>
            <v-col cols="6">

              <div class="w-100 text-title mb-0">List of Reclassification Application</div>
              <div class="w-100 text-subtitle-2 text-grey mt-0 mb-2">A brief overview of reclassification applications.
              </div>
            </v-col>
            <v-col cols="6" class="text-grey d-flex mt-4" v-if="user.role === 'Administrative Officer V'">
              <v-select class="pr-2" label="Filter by Position" v-model="selected_position" :items="positions"
                item-value="_id" persistent-hint clearable />
              <v-select label="Filter by SDO" v-model="selected_sdo" :items="sdo" item-value="_id" persistent-hint
                clearable />

              <v-btn @click="get_application" class="ml-2 mt-1" color="primary">
                <v-icon class="pr-1">mdi-filter</v-icon>Filter</v-btn>

              <v-btn @click="evaluators_dialog = true" class="ml-2 mt-1" color="primary"
                v-if="user.role === 'Administrative Officer V'">Assign to
                Evaluator</v-btn>
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
                      <div class="w-40 text-body-1 font-weight-bold d-flex">{{ value.full_name }}</div>
                      <div class="mb-1 text-body-2 text-grey">{{ value.position }}</div>
                      <div class="text-body-2">School: {{ value.school }}</div>
                      <div class="text-body-2">Division: {{ value.division }}</div>
                      <div class="text-body-2" v-if="typeof value.approved === 'boolean'">
                        This reclassification was <span :class="value.approved ? 'text-success' : 'text-error'">
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
      <v-card title="Select an Evaluator">
        <v-card-text>
          <v-select :items="evaluators" item-value="_id" item-title="title" v-model="selected_ro_evaluator" />
        </v-card-text>
        <v-card-actions class="">
          <v-row dense justify="center">
            <v-col cols="5">
              <v-btn @click="isActive.value = false" variant="tonal" color="error" block>CANCEL</v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn variant="tonal" color="success" block @click="assign_evaluator">
                SUBMIT
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

const application_data = ref([]);
async function get_application() {

  const payload = {
    position: selected_position.value,
    sdo: selected_sdo.value,
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





</script>

<style scoped>
.reclass-item {
  transition: background-color 0.3s ease-in-out;
}

.reclass-item:hover {
  background-color: #E8EAF6;

}

.text-title {
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: #2c1375;
  letter-spacing: 1px;
  margin-bottom: 10px;

}
</style>