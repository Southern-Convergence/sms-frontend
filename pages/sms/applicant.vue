<template>
  <v-container class="h-10">
    <v-card class=" mx-auto" max-width="90%">
      <v-toolbar color="primary">
        <v-list-item class="pl-2" density="compact">
          <template v-slot:prepend>
            <v-avatar class="mr-1" variant="text">
              <v-icon icon="mdi-pencil-plus" dark />
            </v-avatar>
          </template>
          <v-list-item-title> {{ current_title }} </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item>
      </v-toolbar>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-sheet>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12"> <v-icon class="mr-2 pb-2" size="26" color="primary">mdi-account</v-icon> Personal
                    Information</v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant_details.surname" label="Surname" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant_details.givenname" label="Given Name" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant_details.middlename" label="Middle Name" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant_details.birthday" label="Date of Birth" type="date" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-select v-model="applicant_details.sex" label="Sex" hide-details :items="$sex" />
                  </v-col>
                  <v-col cols="12" class="mt-2"> <v-icon class="mr-2 pb-2" size="26"
                      color="primary">mdi-briefcase-account</v-icon>
                    Employment
                    Information</v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant_details.employee_no" label="Employee No." hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant_details.position" label="Authorized Position Title" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant_details.salary_grade" label="Salary Grade" hide-details />
                  </v-col>
                  <v-col cols=" 12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant_details.item_no" label="Item No" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant_details.plantilla_no" label="Plantila No" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant_details.authorized_salary" label="Authorized Salary" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant_details.ipcrf_rating" label="Latest IPCRF Rating" hide-details />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-sheet>
            <v-sheet class="mb-2">
              <v-card-title class="text-subtitle-2">
                I. Education Attainment and Civil Service Eligibility
                <v-btn @click="attainment_dialog.dialog = true" density="compact" icon="mdi-plus" color="success" />
              </v-card-title>
              <v-sheet border class="mx-4">

                <v-data-table :headers="education_attainment_headers" :items="applicant_details.education_attainment"
                  density="compact">
                  <template #bottom v-if="!show_footer" /> </v-data-table>
              </v-sheet>

            </v-sheet>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="2">
          <v-card-text>
            <v-sheet class="mx-2">
              <v-card-title class="text-subtitle-2">
                II. Service Record
                <v-btn @click="service_record_dialog.dialog = true" density="compact" icon="mdi-plus" color="success" />
              </v-card-title>
              <v-sheet border class="mx-4">

                <v-data-table :headers="service_record_headers" :items="applicant_details.service_record"
                  density="compact">
                  <template #bottom v-if="!show_footer" /> </v-data-table>
              </v-sheet>

            </v-sheet>
            <v-sheet>
              <v-card-title class="text-subtitle-2">
                III. Equivalent Units
              </v-card-title>
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="6">
                    <v-row dense>
                      <v-col cols="12" class="text-caption text-grey-darken-1"> A. Total Number of Years Teaching</v-col>
                      <v-col cols="5"> <v-text-field v-model="applicant_details.yt_public_schools" label="Public Schools"
                          hide-details density="compact" type="number" /></v-col>
                      <v-col cols="5"> <v-text-field v-model="applicant_details.yt_private_schools"
                          label="Private Schools" hide-details density="compact" type="number" /></v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row dense>
                      <v-col cols="12" class="text-caption text-grey-darken-1">
                        B. Degree to Equivalent
                      </v-col>
                      <!-- <v-col cols="5"> <v-text-field v-model="applicant_details"
                          label="Public Schools" hide-details density="compact" type="number" /></v-col>
                      <v-col cols="5"> <v-text-field v-model="applicant_details"
                          label="Private Schools" hide-details density="compact" type="number" /></v-col> -->
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="text-caption text-grey-darken-1 mt-2">
                    C. Areas of Equivalent
                  </v-col>
                  <v-col cols="12" class="px-2">
                    <v-sheet>
                      <v-card-title class="text-caption">
                        1. Professional Study
                        <v-btn @click="professional_study_dialog.dialog = true" density="compact" icon="mdi-plus"
                          color="success" />
                      </v-card-title>
                      <v-sheet border class="mx-4">
                        <v-data-table :items="applicant_details.professional_study" :headers="professional_study_headers"
                          density="compact">
                          <template #bottom v-if="!show_footer"> </template> </v-data-table>
                      </v-sheet>
                    </v-sheet>
                  </v-col>
                  <v-col cols="12" class="text-caption text-grey-darken-1 pl-5 mt-2">
                    2. Teaching Experience

                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="12" class="px-2 ml-5">
                    <v-text-field label="Public Schools" v-model="applicant_details.te_public_schools" hide-details
                      type="number" /></v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="12" class="px-2"> <v-text-field label="Private School"
                      v-model="applicant_details.te_private_schools" hide-details type="number" /></v-col>
                </v-row>
              </v-card-text>
            </v-sheet>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="3">
          <v-card-text>
            <v-row dense>
              <v-col cols="6" class="pa-4">
                <v-file-input label="Attach service record" v-model="applicant_details.attached_service_record" />
              </v-col>
              <v-col cols="6" class="pa-4">
                <v-file-input label="Permit to Study or Accreditation"
                  v-model="applicant_details.attached_permit_to_study" />
              </v-col>
              <v-col cols="6" class="pa-4">
                <v-file-input label="Attach Authenticated copy of Transcipt of Record"
                  v-model="applicant_details.attached_transcript_record" />
                <v-row dense justify="center">
                  <v-col cols="10" class="mt-1"> Enter Registrar Details Below </v-col>
                  <v-col cols="10">
                    <v-text-field v-model="applicant_details.registrar_name" hide-details density="compact"
                      label="Registrar Complete Name" />
                  </v-col>
                  <v-col cols="10">
                    <v-text-field v-model="applicant_details.contact_number" hide-details density="compact"
                      label="Registrar Contact Number" />
                  </v-col>
                  <v-col cols="10">
                    <v-text-field v-model="applicant_details.registrar_email" hide-details density="compact"
                      label="Registrar Email" />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6" class="pa-4">
                <v-file-input label="Attach Omnibus Certification of Authenticity of Documents"
                  v-model="applicant_details.attached_omnibus" />
              </v-col>

            </v-row>
          </v-card-text>
        </v-window-item>
      </v-window>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn v-if="step > 1" variant="text" @click="step--"> Back </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="step < 3" color="primary" variant="flat" @click="step++">
          Next
        </v-btn>
        <v-btn v-if="step === 3" @click="create_erf" color="success" variant="flat">
          SUBMIT
        </v-btn>
      </v-card-actions>
    </v-card>
    <commons-dialog max-width="35%" v-model="service_record_dialog.dialog" :icon="service_record_dialog.icon"
      :title="service_record_dialog.title" :subtitle="service_record_dialog.subtitle" @submit="add_service_record"
      :submitText="'Add'">
      <v-card-text class="my-2">
        <v-row dense>
          <v-col cols="12"> <v-text-field v-model="service_record.designation" label="Position/Designation"
              hide-details /></v-col>
          <v-col cols="6"> <v-text-field v-model="service_record.from" label="From" hide-details type="date" /></v-col>
          <v-col cols="6"> <v-text-field v-model="service_record.to" label="To" hide-details type="date" /></v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>
    <commons-dialog max-width="40%" v-model="attainment_dialog.dialog" icon="mdi-school" :title="attainment_dialog.title"
      :subtitle="attainment_dialog.subtitle" @submit="add_educ" :submitText="'Add'">
      <v-card-text class="ma-3">
        <v-row dense>
          <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12"> <v-text-field v-model="educ_and_csc.date" label="Date"
              hide-details type="date" /></v-col>
          <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12"> <v-text-field v-model="educ_and_csc.degree"
              label="Title, Degree Highest Grade Attained" hide-details /></v-col>
          <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12"> <v-text-field v-model="educ_and_csc.institution"
              label="Name of Institution" hide-details /></v-col>
          <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12"> <v-text-field v-model="educ_and_csc.year_received"
              label="Year Received" hide-details type="number" /></v-col>
          <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12"> <v-text-field v-model="educ_and_csc.board_examination"
              label="Board Examination" hide-details /></v-col>
          <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12"> <v-text-field v-model="educ_and_csc.rating"
              label="Rating" hide-details type="number" /></v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>
    <commons-dialog max-width="35%" v-model="professional_study_dialog.dialog" :icon="professional_study_dialog.icon"
      :title="professional_study_dialog.title" :subtitle="professional_study_dialog.subtitle" @submit="add_prof_stud"
      :submitText="'Add'">
      <v-card-text class="my-2">
        <v-row dense>
          <v-col cols="6"> <v-text-field v-model="prof_stud.school_year" label="School Year" type="number"
              hide-details /></v-col>
          <v-col cols="6"> <v-text-field v-model="prof_stud.units_number" label="Number of Units" type="number"
              hide-details /></v-col>
          <v-col cols="12"> <v-textarea v-model="prof_stud.description" label="Description" hide-details /></v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" variant="tonal" color="success" :timeout="3000">
        <strong> {{ text }} </strong>

        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>


<script lang="ts" setup>
import swal from 'sweetalert';
const { $rest, $sex, $salary_items } = useNuxtApp();
const route = useRoute()
onBeforeMount(async () => {
  await get_applicant()
})

// Get Applicant
const applicant_details = ref({})
async function get_applicant() {
  const { data, error } = await $rest('applicant/get-applicant', {
    method: 'GET',
    query: {
      id: route.query.id
    }
  })
  applicant_details.value = data

}


// Start ERF initial form
const bastala = ref(false)
const step = ref(1)
const current_title = computed(() => {
  switch (step.value) {
    case 1: return 'Equivalents Record Form'
    case 2: return 'Service Record & Equivalent Unit'
    default: return 'Attachment the following requirement'
  }
})
// End ERF initial form
// Table headers
const education_attainment_headers = ref([
  { title: "Degree", key: "degree" },
  { title: "Institution", key: "institution" },
  { title: "Year Received", key: "year_received" },
  { title: "Board Examination", key: "board_examination" },
  { title: "Rating", key: "rating" },
  { title: "Date", key: "date" }
]);

const service_record_headers = ref([
  { title: "Designation", key: "designation" },
  { title: "From", key: "from" },
  { title: "To", key: "to" }

]);

const professional_study_headers = ref([
  { title: "School Years", key: "school_year" },
  { title: "Number of Units", key: "units_number" },
  { title: "Description", key: "description" }

]);
// Table headers

// Erf dialog step 2 and 3
const attainment_dialog = ref({ dialog: false, title: 'Education Attainment and Civil Service Eligibility', subtitle: 'Your educational background and civil service information', })
const service_record_dialog = ref({ dialog: false, title: 'Service Record', subtitle: 'Document employmemt history', icon: 'mdi-face-agent', })
const professional_study_dialog = ref({ dialog: false, title: 'Professional Study', subtitle: 'Your study history and qualifications', icon: 'mdi-school', })



const qs_data = ref([])

const get_position = computed(() => {
  return qs_data.value.map((i) => i.position);
})

interface Educ_and_csc {
  degree: string,
  institution: string,
  year_received: number,
  board_examination: string,
  rating: number,
  date: string
}


const educ_and_csc = ref({} as Educ_and_csc)
function add_educ() {
  if (!Array.isArray(applicant_details.value.education_attainment)) {
    applicant_details.value.education_attainment = [];
  }
  const new_educ = {
    degree: educ_and_csc.value.degree,
    institution: educ_and_csc.value.institution,
    year_received: educ_and_csc.value.year_received,
    board_examination: educ_and_csc.value.board_examination,
    rating: educ_and_csc.value.rating,
    date: educ_and_csc.value.date
  };
  applicant_details.value.education_attainment.push(new_educ);
  if (attainment_dialog && typeof attainment_dialog === 'object') {
    attainment_dialog.dialog = false;
  }
  snackbar.value = true;
  text.value = 'Education added successfully';
  educ_and_csc.value = {
    degree: '',
    institution: '',
    year_received: 0,
    board_examination: '',
    rating: 0,
    date: ''
  }
}




// Service Record
interface Service_record {
  designation: string,
  from: string,
  to: string
}

const service_record = ref({} as Service_record)

function add_service_record() {
  if (!Array.isArray(applicant_details.value.service_record)) {
    applicant_details.value.service_record = []
  }
  const new_service_record = {
    designation: service_record.value.designation,
    from: service_record.value.from,
    to: service_record.value.to,
  }
  applicant_details.value.service_record.push(new_service_record);
  if (service_record_dialog && typeof service_record_dialog === 'object') {
    service_record_dialog.dialog = false;
  }
  snackbar.value = true;
  text.value = 'Servcie record added successfully';
  service_record.value = { designation: '', from: '', to: '' };
}


// Professional Study


interface Prof_stud {
  school_year: number,
  units_number: number,
  description: string
}

const prof_stud = ref({} as Prof_stud)
function add_prof_stud() {
  if (!Array.isArray(applicant_details.value.professional_study)) {
    applicant_details.value.professional_study = []
  }
  const new_prof_stud = {
    school_year: prof_stud.value.school_year,
    units_number: prof_stud.value.units_number,
    description: prof_stud.value.description,
  }

  applicant_details.value.professional_study.push(new_prof_stud);
  if (professional_study_dialog && typeof professional_study_dialog === 'object') {
    professional_study_dialog.dialog = false;
  }
  snackbar.value = true;
  text.value = 'Professional added successfully';
  prof_stud.value = { school_year: 0, units_number: 0, description: '' }
}

// Create erf form
const snackbar = ref(false);
const text = ref('');
async function create_erf() {
  const { data, error } = await $rest('erf-form/update-erf', {
    method: "PUT",
    body: {
      applicant_details: { ...applicant_details.value }
    }
  })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

}


</script>

  
