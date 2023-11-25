<template>
  <v-sheet width="85%" class=" mx-auto ma-5">
    <v-card height="90vh">
      <v-sheet class="pa-6" height="auto" color="grey-lighten-4">
        <v-row no-gutters>
          <v-col cols="12" class="text-h6 font-weight-bold text-indigo">MODIFIED QUALIFICATION STANDARDS </v-col>
          <v-col cols="12" class="text-grey">Provides customized eligibility criteria, promoting fairness and
            inclusivity. </v-col>
          <v-col cols="3"> <v-text-field prepend-inner-icon="mdi-magnify" label="Search" hide-details
              density="compact" /></v-col>
          <v-spacer />
          <v-col cols="auto"> <v-btn color="indigo" variant="text" icon="mdi-table" />
            <v-btn color="indigo" variant="text" icon="mdi-view-grid" /></v-col>
        </v-row>
      </v-sheet>
      <v-toolbar color="indigo" border>
        <v-list-item class="pl-2" :dense="true">
          <template v-slot:prepend>
            <v-avatar class="mr-1" variant="text">
              <v-icon dark>mdi-wrench-clock</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title>Maintenance Panel</v-list-item-title>
          <v-list-item-subtitle>A brief overview of the maintenance panel for our reclassification
            system.</v-list-item-subtitle>
        </v-list-item>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="qs_dialog.dialog = true">
          <v-icon>mdi-plus</v-icon> Create QS</v-btn>
      </v-toolbar>

      <v-sheet class="overflow-y-auto" height="65vh">
        <v-card-text>
          <v-sheet border>
            <v-data-table :items="qs_data" :headers="maintenance_headers">
              <template v-slot:item.actions="{ item }">
                <v-btn @click="show_update_dialog(item)" density="compact" variant="tonal" color="primary">
                  Update </v-btn>
              </template>
              <template v-slot:item.position="{ item }">
                <v-chip color="indigo">{{ item.selectable.position }}</v-chip>
              </template>
            </v-data-table>
          </v-sheet>
        </v-card-text>
      </v-sheet>
      <!-- 
      <v-sheet class="overflow-y-auto" height="65vh">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12" v-for="qs in qs_data" :key="index">
              <v-card class="mx-auto" variant="tonal" color="indigo">
                <v-card-item>
                  <v-list lines="auto" density="compact">
                    <v-list-item>
                      <v-list-item-title>Position : <span class="font-weight-bold mb-2  text-indigo"> {{
                        qs.position
                      }}</span></v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="qs.education_level">
                      <v-list-item-title>Education Level : <span class="text-grey"> {{
                        qs.education_level }}</span></v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Salary Grade : <span class="text-grey"> {{ qs.salary_grade
                      }}</span> </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Experience : </v-list-item-title>
                      <v-list-item-subtitle class="text-justify">
                        {{ qs.experience }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Training : </v-list-item-title>
                      <v-list-item-subtitle class="text-justify">
                        {{ qs.training }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item v-if="qs.performance_rating">
                      <v-list-item-title>Performance Rating : </v-list-item-title>
                      <v-list-item-subtitle class="text-justify">
                        {{ qs.performance_rating }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-item>
                <v-card-actions>
                  <v-btn @click="show_update_dialog(qs)" class="mx-5" variant="outlined" density="compact">UPDATE </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-sheet> -->
    </v-card>
    <commons-dialog max-width=" 45%" v-model="qs_dialog.dialog" icon="mdi-school" :title="qs_dialog.title"
      :subtitle="qs_dialog.subtitle" @submit="create_qs" :submitText="'Submit'">
      <v-card-text>
        <v-row dense>
          <v-col cols="4"> <v-combobox v-model="qs.position" label="Position" hide-details :items="$position" /></v-col>
          <v-col cols="4"> <v-select v-model="qs.education_level" label="Level of Education" hide-details
              :items="$education_level" /></v-col>

          <v-col cols="4"> <v-combobox v-model.number="qs.salary_grade" label="Salary Grade" :items="$salary_items"
              hide-details type="number" /></v-col>

          <v-col cols="6"> <v-textarea rows="3" v-model="qs.education" label="Education" hide-details /></v-col>
          <v-col cols="6"> <v-textarea rows="3" v-model="qs.experience" label="Experience" hide-details /></v-col>
          <v-col cols="6"> <v-textarea rows="3" v-model="qs.training" label="Training" hide-details /></v-col>
          <v-col cols="6"> <v-textarea rows="3" v-model="qs.eligibility" label="Eligibility" hide-details /></v-col>
          <v-col cols="6"> <v-textarea rows="3" v-model="qs.performance_rating" label="Performance Rating"
              hide-details /></v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>
    <commons-dialog max-width=" 45%" v-model="update_dialog.dialog" icon="mdi-school" :title="update_dialog.title"
      :subtitle="update_dialog.subtitle" @submit="update_qs" :submitText="'Update'">
      <v-card-text>
        <v-row dense>
          <v-col cols="4"> <v-combobox v-model="selected_qs.position" label="Position" hide-details
              :items="$position" /></v-col>
          <v-col cols="4"> <v-select v-model="selected_qs.education_level" label="Level of Education" hide-details
              :items="$education_level" /></v-col>

          <v-col cols="4"> <v-combobox v-model.number="selected_qs.salary_grade" label="Salary Grade"
              :items="$salary_items" hide-details type="number" /></v-col>

          <v-col cols="6"> <v-textarea rows="3" v-model="selected_qs.education" label="Education" hide-details /></v-col>
          <v-col cols="6"> <v-textarea rows="3" v-model="selected_qs.experience" label="Experience"
              hide-details /></v-col>
          <v-col cols="6"> <v-textarea rows="3" v-model="selected_qs.training" label="Training" hide-details /></v-col>
          <v-col cols="6"> <v-textarea rows="3" v-model="selected_qs.eligibility" label="Eligibility"
              hide-details /></v-col>
          <v-col cols="6"> <v-textarea rows="3" v-model="selected_qs.performance_rating" label="Performance Rating"
              hide-details /></v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" variant="tonal" color="success" :timeout="2000">
        <strong> {{ text }} </strong>
        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
const { $rest, $position, $salary_items, $education_level } = useNuxtApp();

import swal from 'sweetalert';
definePageMeta({ layout: "std-applicant" })

onBeforeMount(() => {
  get_qs()
})


// Table headers
const maintenance_headers = ref([
  { title: "Position Title", key: "position" },
  { title: "Education Level", key: "education_level" },
  { title: "Salary Grade", key: "salary_grade" },
  { title: "Education", key: "education" },
  { title: "Experience", key: "experience" },
  { title: "Training", key: "training" },
  { title: "Performance Rating", key: "performance_rating" },
  { title: "Actions", key: "actions" }
]);

interface Qs {
  position: string,
  education_level?: string,
  salary_grade?: number,
  education: string,
  experience?: string,
  training?: string,
  eligibility?: string,
  performance_rating?: string,

}

const qs = ref({} as Qs)

const qs_dialog = ref({ dialog: false, title: 'Create Qualification Standard', subtitle: '', })
const update_dialog = ref({ dialog: false, title: 'Update Qualification Standard', subtitle: '', })
const snackbar = ref(false);
const text = ref('');
async function create_qs() {
  const { data, error } = await $rest('erf-maintenance/create-qs', {
    method: "POST",
    body: qs.value
  })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}

// update
const selected_qs = ref({})
function show_update_dialog(item: any) {
  selected_qs.value = item.raw
  update_dialog.value.dialog = true;

}

// QS
const qs_data = ref([])
async function get_qs() {
  const { data, error } = await $rest('erf-maintenance/get-qs', {
    method: "GET"
  })
  qs_data.value = data
}

async function update_qs() {
  const { data, error } = await $rest('erf-maintenance/update-qs', {
    method: "PUT",
    body: {
      _id: selected_qs.value._id,
      qs: selected_qs.value
    }
  })
  if (!error) return swal({ title: data, icon: "success" })
  return swal({ title: data, icon: "error" })

}



</script>
