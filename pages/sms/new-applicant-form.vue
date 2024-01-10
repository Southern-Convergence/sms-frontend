<template>
  <v-sheet height="100vh" class="d-flex align-center justify-center ">
    <v-sheet class="h-100 w-100 d-flex align-center justify-center" color="#ECEFF1">
      <v-sheet width="70%">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-sheet height="50vh">
              <v-toolbar class="py-1" color="indigo" border>
                <v-list-item class="pl-2" density="compact">
                  <v-list-item-title class="text-h5"> Application Form </v-list-item-title>
                  <v-list-item-subtitle> Position Requirements and Criteria </v-list-item-subtitle>
                </v-list-item>
              </v-toolbar>
              <v-card-title class="text-h5 text-primary"> WELCOME to
                <strong>Reclassification System</strong>
              </v-card-title>
              <v-card-subtitle>Elevate Your Career: A Guide to the Reclassification System </v-card-subtitle>
              <v-row dense>
                <v-col cols="7">
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12"> <v-icon class="mr-2 pb-2" size="26" color="primary">mdi-seal</v-icon>
                        Individual Qualification </v-col>
                      <v-col cols="6" class="px-1">
                        <v-select :items="position_data" v-model="applicant.qualification.position" class="w-100 pt-2"
                          label="Select Position" hide-details item-value="_id" />
                      </v-col>
                      <v-col cols="6" class="px-1">
                        <v-select v-model="applicant.qualification.educ_level" :items="['Elementary', 'Secondary']"
                          class="w-100 pt-2" label="Education Level" hide-details />
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="6" class="px-1">
                        <v-select v-model="applicant.qualification.education" :items="education_data" rows="2"
                          class="w-100" label="Education" hide-details multiple item-value="_id" />
                      </v-col>
                      <v-col cols="6" class="px-1">
                        <v-select v-model="applicant.qualification.experience" :items="experience_data" class="w-100"
                          label="Experience" hide-details multiple item-value="_id" />
                      </v-col>
                      <v-col cols="6" class="px-1">

                        <v-text-field v-model="applicant.qualification.training" class="w-100"
                          label="Enter total training hours" hide-details type="number" item-value="_id" />
                      </v-col>

                      <v-col cols="6" class="px-1">
                        <v-select v-model="applicant.qualification.per_rating" :items="rating_data" class="w-100"
                          label="Performance Rating" hide-details item-value="_id" />
                      </v-col>
                    </v-row>
                  </v-card-text> </v-col>
                <v-col cols="5">
                  <!-- <v-card-text>
                  <v-sheet border>
                    <v-list-item class="pl-2" density="compact">
                      <v-list-item-title class="text-h6"> Qualifications Standard
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-grey"> Selected Position Qualificationswill be
                        display here.</v-list-item-subtitle>
                    </v-list-item>
                    <v-divider />
                    <v-list v-for="qs in selected_qs" :key="qs._id">
                      <v-list-subheader class="text-subtitle-1">
                        <span>{{ qs.title }} </span>
                      </v-list-subheader>
                      <v-list-item v-if="qs.education && qs.education.length" v-for="educ, index in qs.education"
                        :key="index" title="Education:">
                        <span class="text-grey">{{ educ.text }}</span>
                      </v-list-item>

                      <v-list-item v-if="qs.experience && qs.experience.length" title="Experience:"
                        v-for="exp, index in qs.experience" :key="index">
                        <span class="text-grey">{{ exp.text }}</span>
                      </v-list-item>

                      <v-list-item v-if="qs.training_hours" title="Training:">
                        <span class="text-grey">{{ qs.training_hours }}</span>
                      </v-list-item>

                      <v-list-item v-if="qs.rating && qs.rating.length" title="Performance Rating:"
                        v-for="rate, index in qs.rating" :key="index">
                        <span class="text-grey">{{ rate.title }}</span>
                      </v-list-item>
                    </v-list>
                  </v-sheet>

                </v-card-text> -->
                </v-col>
              </v-row>
            </v-sheet>
          </v-window-item>
          <v-window-item :value="2">
            <v-card-text>
              <v-row dense>
                <v-col cols="12"> <v-icon class="mr-2 pb-2 " size="26" color="primary">mdi-account</v-icon>
                  Personal
                  Information </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.personal_information.lastname" label="Surname" hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.personal_information.firstname" label="Given Name" hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.personal_information.middlename" label="Middle Name" hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.personal_information.email" :rules="email_rules" label="Email"
                    hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.personal_information.birthday" label="Birthday" type="date"
                    hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-select v-model="applicant.personal_information.gender" label="Gender" :items="['Female', 'Male']"
                    hide-details />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-row dense>
                <v-col cols="12"> <v-icon class="mr-2 pb-2" size="26" color="primary">mdi-briefcase-account</v-icon>
                  Designation and Employment Information</v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.designation.current_position" label="Current Position" hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.designation.employee_no" label="Employee No" hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.designation.plantilla_no" label="Plantilla No" hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.designation.item_no" label="Item No" hide-details />
                </v-col>

                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-select v-model="applicant.designation.division" label="Division" :items="sdo_data" hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-select v-model="applicant.designation.school" label="School" hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.designation.school_address" label="School Address" hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.designation.ipcrf_rating" label="IPCRF rating" hide-details />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-card-title class="text-subtitle-2 d-flex">
                I. Education Attainment and Civil Service Eligibility
                <v-btn @click="education_attainment_dialog = true" class="ml-2" density="compact" icon="mdi-plus"
                  color="success" />
              </v-card-title>
              <v-sheet border class="mx-4 mb-4">
                <v-data-table :headers="education_attainment_headers" :items="applicant.educational_attainment">
                  <template #bottom v-if="!show_footer" /> </v-data-table>
              </v-sheet>
              <v-row dense>
                <v-col cols="6">
                  <v-file-input label="Attach Authenticated copy of Transcript of Record" hide-details density="compact"
                    variant="underlined" clearable multiple accept="application/pdf"
                    v-model="applicant.attachments.educational_attainment" />
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="applicant.transcript.registrar_name" placeholder="Enter Register Complete Name"
                    density="compact" hide-details="auto" variant="underlined" />
                  <v-text-field v-model="applicant.transcript.registrar_email" :rules="email_rules"
                    placeholder="Email Address" density="compact" hide-details="auto" variant="underlined" />
                  <v-text-field v-model="applicant.transcript.registrar_no" placeholder="+63 0 000 000 000" prefix="+63"
                    mask="0 000 000 000" maxlength="10" density="compact" hide-details="auto" variant="underlined"
                    hint="Registrar Number is required" type="tel" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <v-card-text>
              <v-card-title class="text-subtitle-2">
                II. Service Record
                <v-btn @click="service_record_dialog = true" density="compact" icon="mdi-plus" color="success" />
              </v-card-title>
              <v-row dense>

                <v-col cols="8">
                  <v-sheet border>
                    <v-data-table :headers="service_record_headers" :items="applicant.service_record" density="compact">
                      <template v-slot:bottom v-if="!show_footer"></template>
                    </v-data-table>
                  </v-sheet>
                </v-col>
                <v-col cols="4">
                  <v-file-input label="Attach Service Record" hide-details density="compact" variant="underlined"
                    clearable multiple accept="application/pdf" v-model="applicant.attachments.service_record" />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-card-title class="text-subtitle-2">
                III. Equivalent Units
              </v-card-title>
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="6">
                    <v-row dense>
                      <v-col cols="12" class="text-caption text-grey-darken-1"> A. Total Number of Years
                        Teaching</v-col>

                      <v-col cols="5"> <v-text-field label="Public Only" hide-details density="compact" type="number"
                          readonly /></v-col>
                      <v-col cols="5"> <v-text-field label="Equivalent" hide-details density="compact" type="number"
                          readonly />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row dense>
                      <v-col cols="12" class="text-caption text-grey-darken-1">
                        B. Degree to Equivalent
                      </v-col>
                      <v-col cols="5"> <v-text-field label="Public Schools" hide-details density="compact"
                          type="number" /></v-col>
                      <v-col cols="5"> <v-text-field label="Private Schools" hide-details density="compact"
                          type="number" /></v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="text-caption text-grey-darken-1 mt-2">
                    C. Areas of Equivalent
                  </v-col>
                  <v-col cols="12" class="px-2">
                    <v-sheet>
                      <v-card-title class="text-caption">
                        1. Professional Study
                        <v-btn @click="professional_study_dialog = true" density="compact" icon="mdi-plus"
                          color="success" />
                      </v-card-title>
                      <v-sheet border class="mx-4">
                        <v-data-table :headers="professional_study_headers" :items="applicant.professional_study"
                          density="compact">
                          <template #bottom v-if="!show_footer"> </template> </v-data-table>
                      </v-sheet>
                    </v-sheet>
                  </v-col>
                  <v-col cols="12" class="text-caption text-grey-darken-1 pl-5 mt-2">
                    2. Teaching Experience

                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="12" class="px-2 ml-5">
                    <v-text-field label="Public Schools" hide-details type="number" readonly /></v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="12" class="px-2"> <v-text-field label="Private School"
                      type="number" /></v-col>
                  <v-col cols="12" class="text-caption text-grey-darken-1 pl-5 my-2">
                    Attach the following:
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="12" class="px-2 ml-5">
                    <v-file-input label="Attach Permit to Study" hide-details accept="application/pdf"
                      v-model="applicant.attachments.permit_to_study" /></v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="12" class="px-2">
                    <v-file-input label="Attach Omnibus" accept="application/pdf"
                      v-model="applicant.attachments.omnibus" /></v-col>
                </v-row>
              </v-card-text>
            </v-card-text>
          </v-window-item>
        </v-window>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn v-if="step > 1" variant="text" @click="step--"> Back </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step < 3" color="primary" variant="flat" @click="next_window">
            Next
          </v-btn>
          <v-btn @click="create_application" v-if="step === 3" color="success" variant="flat">
            SUBMIT
          </v-btn>
        </v-card-actions>

      </v-sheet>
      <commons-dialog max-width="35%" v-model="service_record_dialog" :icon="'mdi-face-agent'"
        :title="'Service Record Form'" :subtitle="'Employment History'" @submit="add_service_record" :submitText="'Add'">
        <v-card-text class="my-2">
          <v-row dense>
            <v-col cols="12"> <v-text-field v-model="service_record.designation" label="Position/Designation"
                hide-details /></v-col>
            <v-col cols="6"> <v-text-field v-model="service_record.from" label="From" hide-details type="date" /></v-col>
            <v-col cols="6"> <v-text-field v-model="service_record.to" label="To" hide-details type="date" /></v-col>
          </v-row>
        </v-card-text>
      </commons-dialog>

      <commons-dialog max-width="40%" v-model="education_attainment_dialog" icon="'mdi-school'"
        :title="'Education Attainment and Civil Service Eligibility'"
        :subtitle="'Your educational background and civil service information'" @submit="add_education_attainment"
        :submitText="'Add'">
        <v-card-text class="ma-3">
          <v-row dense>
            <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12"> <v-text-field v-model="education_attainment.date"
                label="Date" hide-details type="date" /></v-col>
            <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12"> <v-text-field v-model="education_attainment.degree"
                label="Title, Degree Highest Grade Attained" hide-details /></v-col>
            <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12"> <v-text-field
                v-model="education_attainment.institution" label="Name of Institution" hide-details /></v-col>
            <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12"> <v-text-field
                v-model="education_attainment.year_received" label="Year Received" hide-details type="number" /></v-col>
            <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12"> <v-text-field v-model="education_attainment.board_exam"
                label="Board Examination" hide-details /></v-col>
            <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12"> <v-text-field v-model="education_attainment.rating"
                label="Rating" hide-details type="number" /></v-col>
          </v-row>
        </v-card-text>
      </commons-dialog>

      <commons-dialog max-width="35%" v-model="professional_study_dialog" :icon="'mdi-face-agent'"
        :title="'Professional Study Form'" :subtitle="'Employment History'" @submit="add_professional_study"
        :submitText="'Add'">
        <v-card-text class="my-2">
          <v-row dense>
            <v-col cols="12"> <v-text-field v-model="professional_study.sy" label="School Year" type="number"
                hide-details /></v-col>
            <v-col cols="6"> <v-text-field v-model="professional_study.unit_no" label="Unit Number"
                hide-details /></v-col>
            <v-col cols="6"> <v-text-field v-model="professional_study.description" label="Description"
                hide-details /></v-col>
          </v-row>
        </v-card-text>
      </commons-dialog>
    </v-sheet>
  </v-sheet>
</template>
<script setup lang="ts">
import swal from 'sweetalert';
const { $rest } = useNuxtApp();

//viewing attachment
const cfg = useRuntimeConfig();
const { CDN_ENDPOINT, DEV_CDN_ENDPOINT } = cfg.public;
const CDN = cfg.public.NODE_ENV === "development" ? DEV_CDN_ENDPOINT : CDN_ENDPOINT;

onBeforeMount(() => {
  Promise.all(
    [
      get_position(),
      get_education(),
      get_experience(),
      get_rating(),
      get_setup(),
      get_sdo(),
      // get_qs(),

    ]
  ).catch(() => swal({
    title: "Error",
    text: "Something went wrong while fetching data",
    icon: "error",
    buttons: { ok: false, cancel: false }
  }))
})


const step = ref(1)

const applicant = ref({
  qualification: {
    position: "",
    educ_level: "",
    education: [],
    experience: [],
    training: 0,
    eligibility: "",
    per_rating: "",
  },
  personal_information: {
    lastname: "",
    firstname: "",
    middlename: "",
    email: "",
    birthday: new Date,
    gender: "",
  },
  designation: {
    current_position: "",
    employee_no: "",
    plantilla_no: "",
    division: "",
    district: "",
    item_no: "",
    school: "",
    school_address: "",
    ipcrf_rating: "",
  },
  educational_attainment: [],
  equivalent_unit: {
    public_years_teaching: 0,
    yt_equivalent: 0,
    present_degree: 0,
    pd_equivalent: 0,
    private_years_teaching: 0,
  },
  transcript: {
    registrar_name: "",
    registrar_email: "",
    registrar_no: 0
  },
  service_record: [],
  professional_study: [],
  attachments: {
    service_record: [],
    omnibus: [],
    permit_to_study: [],
    educational_attainment: [],
  },
  signatory: {
    name: "Marianne Mae Paclian",
    position: "Principal",
    role: "principal",
    signature: "WARAY PA",
    date: new Date(new Date())
  },
  status: "For Signature"

})

const show_footer = ref(false)

/**
 * START: SERVICE RECORD
 */

function format_date(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  if (date instanceof Date && !isNaN(date.getTime())) {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  }

  return 'Invalid Date';
}
const service_record_headers = ref([
  { title: "Designation", key: "designation" },
  { title: "From", key: "from" },
  { title: "To", key: "to" }

]);

const service_record_dialog = ref(false)
const service_record = ref<ServiceRecord>({
  designation: "",
  from: new Date(),
  to: new Date(),
})

function add_service_record() {
  const new_service_record: ServiceRecord = {
    designation: service_record.value.designation,
    from: format_date(service_record.value.from),
    to: format_date(service_record.value.to),
  }
  applicant.value.service_record.push(new_service_record);
  service_record.value = { designation: "", from: new Date(), to: new Date() };

}

/**
 * END: SERVICE RECORD
 */
/**
 * START: EDUCATIONAL ATTAINMENT
 */
const education_attainment_headers = ref([
  { title: "Titles, Dergree Highest Grade Attained", key: "degree" },
  { title: "Institution", key: "institution" },
  { title: "Year Received", key: "year_received" },
  { title: "Board Examination", key: "board_exam" },
  { title: "Rating", key: "rating" },
  { title: "new Date", key: "date" },
])

const education_attainment_dialog = ref(false)
const education_attainment = ref<EducationalAttainment>({
  degree: '',
  institution: '',
  year_received: 0,
  board_exam: '',
  rating: 0,
  date: new Date()
});
function add_education_attainment() {
  const new_educ: EducationalAttainment = {
    degree: education_attainment.value.degree,
    institution: education_attainment.value.institution,
    year_received: education_attainment.value.year_received,
    board_exam: education_attainment.value.board_exam,
    rating: education_attainment.value.rating,
    date: education_attainment.value.date
  };
  applicant.value.educational_attainment.push(new_educ);
  education_attainment.value = {
    degree: "",
    institution: "",
    year_received: 0,
    board_exam: "",
    rating: 0,
    date: new Date(),
  };
}
/**)
 * END: EDUCATIONAL ATTAINMENT
 */

/**
 * start: PROFESSIONAL STUDY
 */

const professional_study_headers = ref([
  { title: "Designation", key: "sy" },
  { title: "Unit Number", key: "unit_no" },
  { title: "Description", key: "description" }
])
const professional_study_dialog = ref(false)



const professional_study = ref<ProfessionalStudy>(
  {
    sy: parseInt(new Date().getFullYear().toString()),
    unit_no: "",
    description: "",
  }
)
function add_professional_study() {
  const new_professional_study: ProfessionalStudy = {
    sy: professional_study.value.sy,
    unit_no: professional_study.value.unit_no,
    description: professional_study.value.description,
  }
  applicant.value.professional_study.push(new_professional_study);
  professional_study.value = {
    sy: 0, unit_no: "", description: ""
  };
}
/**
 * END: PROFESSIONAL STUDY
 */
// POSITION
const position_data = ref([])
async function get_position() {
  const { data, error } = await $rest('new-applicant/get-application-qs', {
    method: "GET",
  })
  position_data.value = data
}

// Education data
const education_data = ref([])
async function get_education() {
  const { data, error } = await $rest('sms-education/get-education', {
    method: "GET",
  })
  education_data.value = data
}
// EXPERIENCE
const experience_data = ref([])
async function get_experience() {
  const { data, error } = await $rest('sms-experience/get-experience', {
    method: "GET",
  })
  experience_data.value = data
}

// PERFORMANCE RATING
const rating_data = ref([]);
async function get_rating() {
  const { data, error } = await $rest('sms-rating/get-rating', {
    method: "GET",
  })
  rating_data.value = data
}
/**
 * MATCHING
 */
function next_window() {
  const selected_position: { _id: string; education: string[] } | undefined = position_data.value.filter((v: string) => v._id == applicant.value.qualification.position)[0];
  if (!selected_position) return swal({ title: "Oops!", text: "Select position", icon: "info" });
  const applicant_education = applicant.value.qualification.education;
  if (!applicant_education) return swal({ title: "Oops!", text: "Experience is required", icon: "info" });
  const applicant_experience = applicant.value.qualification.experience;
  if (!applicant_experience) return swal({ title: "Oops!", text: "Experience is required", icon: "info" });
  const applicant_rating = applicant.value.qualification.per_rating;
  if (!applicant_rating) return swal({ title: "Oops!", text: "Rating is required", icon: "info" });
  const applicant_training = applicant.value.qualification.training;

  const is_yes: boolean[] = [];
  is_yes.push(education_matching(applicant_education, selected_position.education));
  is_yes.push(experience_matching(applicant_experience, selected_position.experience));
  is_yes.push(rating_matching(applicant_rating, selected_position.rating));
  is_yes.push(training_matching(applicant_training, selected_position.training_hours));
  if (is_yes.includes(false)) return swal({ title: "ALERT", text: "alert" })
  step.value++

}
function education_matching(applicant_education: any, required_education: any) {
  if (!required_education) {
    return false;
  }
  const [result] = required_education.map((v: string) => applicant_education.includes(v));
  return result;
}
function experience_matching(applicant_experience: any, required_experience: any) {
  if (!required_experience) {
    return false;
  }
  const [result] = required_experience.map((v: string) => applicant_experience.includes(v));
  return result;
}
function rating_matching(applicant_rating: any, required_rating: any) {
  if (!required_rating) {
    return false;
  }
  return applicant_rating == required_rating;
}
function training_matching(applicant_training: number, required_training: number) {
  applicant_training = parseFloat(applicant_training);
  required_training = parseFloat(required_training);
  return applicant_training >= required_training;
}
// CREATE 
const form = ref(true)
async function create_application() {
  const { attachments } = applicant.value;
  const temp = new FormData();
  if (attachments.educational_attainment.length) {
    attachments.educational_attainment.forEach((v: any) => {
      temp.append(`tor-${v.name}`, v)
    })
  }
  if (attachments.service_record.length) {
    attachments.service_record.forEach((v: any) => {
      temp.append(`service_record-${v.name}`, v)
    })
  }
  if (attachments.permit_to_study.length) {
    attachments.permit_to_study.forEach((v: any) => {
      temp.append(`permit_study-${v.name}`, v)
    })
  }
  if (attachments.omnibus.length) {
    attachments.omnibus.forEach((v: any) => {
      temp.append(`omnibus-${v.name}`, v)
    })
  }
  const temp2 = Object.assign({}, applicant.value);
  delete temp2.attachments;

  temp.append("form", JSON.stringify(temp2));

  const { data, error } = await $rest('new-applicant/create-application', {
    method: "POST",
    body: temp
  })

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
const is_email_valid = (email: string) => {
  const email_pattern = /\S+@\S+\.\S+/; //
  return email_pattern.test(email);
};
const email_rules = computed((v: any) => [
  v => !!v || 'Email is required',
  v => is_email_valid(v) || 'Email must be valid'
]);

// const qs_data = ref([])
// async function get_qs() {
//   const { data, error } = await $rest('sms-position/get-qs', {
//     method: "GET",
//   })
//   qs_data.value = data
// }

// QS
const selected_qs = computed(() => {
  const position_id = applicant.value.qualification.position;
  const selected_qs_data = position_data.value.find((p) => p._id === position_id);
  if (selected_qs_data) {
    const position_name = selected_qs_data.name;
    return qs_data.value.filter((qs) => qs.name === position_name);
  } else {
    return [];
  }
});

// const public_yt = computed(() => {
//   return applicant.value.service_record.map(item => {
//     const start_date = new Date(item.from);
//     const end_date = new Date(item.to);
//     const time_differ = end_date - start_date;
//     const years = Math.floor(time_differ / (365.25 * 24 * 60 * 60 * 1000));
//     const remaining_time = time_differ % (365.25 * 24 * 60 * 60 * 1000);
//     const months = Math.floor(remaining_time / (30.44 * 24 * 60 * 60 * 1000));
//     const remaining_days = Math.floor((remaining_time % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
//     const total_days = years * 365.25 + months * 30.44 + remaining_days;
//     const adjusted_months = months % 12;
//     const adjusted_years = Math.floor(months / 12);
//     return {
//       ...item,
//       total_years: years + adjusted_years,
//       total_months: adjusted_months,
//       total_days: total_days
//     };
//   }).map(item => {

//     const start_date = new Date(item.from);
//     const end_date = new Date(item.to);
//     const time_differ = end_date - start_date;
//     const years = Math.floor(time_differ / (365.25 * 24 * 60 * 60 * 1000));
//     const remaining_time = time_differ % (365.25 * 24 * 60 * 60 * 1000);
//     const months = Math.floor(remaining_time / (30.44 * 24 * 60 * 60 * 1000));
//     const remaining_days = Math.floor((remaining_time % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
//     const total_days = years * 365.25 + months * 30.44 + remaining_days;

//     return {
//       ...item,
//       total_years: years + adjusted_years,
//       total_months: adjusted_months,
//       total_days: total_days
//     };
//   });
// });

// const years_teaching = computed(() => {
//   const total = public_yt.value.reduce((acc, item) => {
//     acc.total_years += item.total_years;
//     acc.total_months += item.total_months;
//     acc.total_days += item.total_days;
//     return acc;
//   }, { total_years: 0, total_months: 0, total_days: 0 });

//   const yt_equivalent = total.total_years / 5;
//   applicant.value.equivalent_unit.public_years_teaching = total.total_years;
//   applicant.value.equivalent_unit.yt_equivalent = yt_equivalent;

//   return {
//     total_years: total.total_years,
//     total_years_divided_by_5: yt_equivalent
//   };
// });

// const public_yt = computed(() => {
//   return applicant.value.service_record.map(item => {
//     console.log(service_record);
//     const start_date = new Date(item.from);
//     const end_date = new Date(item.to);
//     const time_differ = end_date - start_date;
//     const total_days = time_differ / (24 * 60 * 60 * 1000);

//     const years = Math.floor(total_days / 365.25);
//     const remaining_days = total_days % 365.25;
//     const months = Math.floor(remaining_days / 30.44);

//     const adjusted_months = months % 12;
//     const adjusted_years = Math.floor(months / 12);

//     return {
//       ...item,
//       total_years: years + adjusted_years,
//       total_months: adjusted_months,
//       total_days: total_days
//     };
//   });
// });

// const years_teaching = computed(() => {
//   const total = public_yt.value.reduce((acc, item) => {
//     acc.total_years += item.total_years;
//     acc.total_months += item.total_months;
//     acc.total_days += item.total_days;
//     return acc;
//   }, { total_years: 0, total_months: 0, total_days: 0 });

//   const yt_equivalent = total.total_years / 5;
//   applicant.value.equivalent_unit.public_years_teaching = total.total_years;
//   applicant.value.equivalent_unit.yt_equivalent = yt_equivalent;

//   return {
//     total_years: total.total_years,
//     total_years_divided_by_5: yt_equivalent
//   };
// });

// Display the output


const setup_division_data = ref<Setup[]>([]);
async function get_setup() {
  const { data, error } = await $rest('setup-division/get-setup', {
    method: "GET",
  })
  setup_division_data.value = data
}
function get_division() {
  const divisions = Array.isArray(setup_division_data.value)
    ? setup_division_data.value.map((i) => i.division)
    : [];

  return divisions;
}

const sdo_data = ref<Sdo[]>([]);
async function get_sdo() {
  const { data, error } = await $rest('sms-sdo/get-sdo', {
    method: "GET",
  })
  sdo_data.value = data
}

</script>

