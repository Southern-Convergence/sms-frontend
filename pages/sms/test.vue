<template>
  <v-sheet height="100vh" class="d-flex align-center justify-center">



    <v-sheet class="h-100 w-100 d-flex align-center justify-center">
      <v-sheet width="70%">
        <v-card class=" mx-auto" color="indigo-lighten-5">
          <v-card-title class="mt-7 text-title">
            <v-icon class="pr-2">mdi-hand-wave</v-icon> WELCOME to DepEd NCR Staffing Modification System
          </v-card-title>
          <v-card-subtitle class="text-grey pl-3 ml-10">Elevate Your Career: A Guide to the Staffing Modification
            System</v-card-subtitle>
          <v-divider class="mt-3"></v-divider>
          <v-card-text style="height:70vh; padding-left: 15mm;justify-content: center; align-items: center;">

            <v-row dense v-if="!position_form">
              <v-col cols="12" class="text-grey font-weight-regular mb-1">Please specify the positions for which you are
                applying.
                You
                can
                select them here.</v-col>
              <v-col cols="6">

                <v-select v-model="applicant.qualification.position" label="Select Position" variant="solo" hide-details
                  item-value="_id" :items="position_data" dense />
              </v-col>
              <v-col cols="12" v-if="applicant.qualification.position">
                <v-btn color="success" rounded="xl" @click="apply_dialog = true">APPLY NOW</v-btn>
              </v-col>
            </v-row>
            <v-row v-if="position_form">
              <v-col cols="6">
                <v-card-text class="overflow-y-auto" style="height: 60vh">
                  <v-list-item class="mx-0 px-0 mb-2" density="compact">
                    <template v-slot:prepend>
                      <v-avatar class="mr-1" variant="text">
                        <v-icon color="amber"> mdi-seal </v-icon>
                      </v-avatar>
                    </template>
                    <v-list-item-title>Individual Qualification</v-list-item-title>
                    <v-list-item-subtitle>Here is the form. Please complete all required fields to
                      proceed.</v-list-item-subtitle>
                  </v-list-item>

                  <v-row dense>
                    <v-col cols="12" v-if="selected_qs">
                      <v-text-field :value="qs.title" variant="underlined" hide-details readonly />
                    </v-col>
                    <v-col cols="12" v-if="applicant.qualification.position && !selected_qs?.education_level == ''">
                      <v-select v-model="applicant.qualification.educ_level" :items="['Elementary', 'Secondary']"
                        label="Education Level" variant="solo" hide-details prepend-inner-icon="mdi-book" />
                    </v-col>
                    <v-col cols="12" v-if="applicant.qualification.position">
                      <v-select v-model="applicant.qualification.education" :items="education_data" label="Education"
                        variant="solo" hide-details multiple item-value="_id" prepend-inner-icon="mdi-school" />
                    </v-col>
                    <v-col cols="12" v-if="selected_qs?.experience.length">
                      <v-select v-model="applicant.qualification.experience" :items="experience_data" label="Experience"
                        variant="solo" hide-details multiple item-value="_id"
                        prepend-inner-icon="mdi-head-cog-outline" />
                    </v-col>
                    <v-col cols="12" v-if="applicant.qualification.position && selected_qs?.training_hours != 0">
                      <v-text-field v-model="applicant.qualification.training" label="Enter total training hours"
                        variant="solo" hide-details type="number" item-value="_id"
                        prepend-inner-icon="mdi-human-male-board" />
                    </v-col>
                    <v-col cols="12" v-if="selected_qs?.rating.length">
                      <v-select v-model="applicant.qualification.per_rating" :items="rating_data"
                        label="Performance Rating" variant="solo" hide-details item-value="_id"
                        prepend-inner-icon="mdi-star" />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions class="mx-2">
                  <v-row dense>
                    <v-col cols="6"> <v-btn block color="error" variant="tonal">CANCEL</v-btn></v-col>
                    <v-col cols="6"> <v-btn block color="success" variant="tonal">SUBMIT</v-btn></v-col>
                  </v-row>

                </v-card-actions>
              </v-col>
              <v-col cols="6" v-if="selected_qs">
                <v-card>
                  <v-card-text class="px-10 overflow-y-auto" style="height: 60vh">
                    <v-list-item class="pl-2" density="compact" color="blue-darken-4">
                      <template v-slot:prepend>
                        <v-avatar class="mr-1" variant="text">
                          <v-icon color="amber"> mdi-certificate </v-icon>
                        </v-avatar>
                      </template>
                      <v-list-item-title class="text-primary">Qualification Standards</v-list-item-title>
                    </v-list-item>
                    <v-list-item>Here is the defined Qualification Standard for the selected position.</v-list-item>
                    <v-list-item class="ma-2" variant="tonal" rounded="rounded">
                      <template v-slot:prepend>
                        <v-icon color="primary" icon="mdi-account-hard-hat"></v-icon>
                      </template>
                      <v-list-item-title> Position :</v-list-item-title>
                      <b>{{ qs.title }} <i class="font-weight-thin" v-if="qs?.education_level"> ({{
                          qs?.education_level
                          }})</i></b>
                    </v-list-item>
                    <v-list-item class="ma-2" variant="tonal" rounded="rounded" v-if="qs.education.length">
                      <template v-slot:prepend>
                        <v-icon color="primary" icon="mdi-school"></v-icon>
                      </template>
                      <v-list-item-title>Education :</v-list-item-title>
                      <v-list-item-subtitle v-for="(education, index) in qs.education" :key="index">{{
                        education.title }}</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item class="ma-2" variant="tonal" rounded="rounded" v-if="qs.experience.length">
                      <template v-slot:prepend>
                        <v-icon color="primary" icon="mdi-head-cog-outline"></v-icon>
                      </template>
                      <v-list-item-title>Experience :</v-list-item-title>
                      <v-list-item-subtitle v-for="(experience, index) in qs.experience" :key="index">{{
                        experience.title }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item class="ma-2" variant="tonal" rounded="rounded" v-if="qs.rating.length">
                      <template v-slot:prepend>
                        <v-icon color="primary" icon="mdi-human-male-board"></v-icon>
                      </template>
                      <v-list-item-title>Performance Rating :</v-list-item-title>
                      <v-list-item-subtitle v-for="(rating, index) in qs.rating" :key="index">{{
                        rating.title }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item class="ma-2" variant="tonal" rounded="rounded" title=" Training Hours:"
                      v-if="qs.training_hours != 0">
                      <template v-slot:prepend>
                        <v-icon color="primary" icon="mdi-star"></v-icon>
                      </template>
                      <v-list-item-subtitle>{{ qs.training_hours }} </v-list-item-subtitle>
                    </v-list-item>


                  </v-card-text>
                </v-card>


              </v-col>

            </v-row>
          </v-card-text>


        </v-card>
      </v-sheet>
    </v-sheet>


    <commons-dialog max-width="35%" v-model="apply_dialog" :icon="'mdi-information'" :title="'Confirmation!'"
      @submit="position_form_cond" :submitText="'Confirm'">
      <v-card-text class="my
      -2">
        <v-row dense v-if="selected_qs">
          <v-col cols="12"> You are applying for the reclassification of the <b class="text-primary">{{ qs.title }}</b>.
            Click <b class="text-orange">cancel</b> to
            select a different position.</v-col>
          <v-col cols="12"> <v-text-field variant="underlined" :value="qs.title" hide-details /></v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>

    <commons-dialog max-width="35%" v-model="next_dialog" :icon="'mdi-information'" :title="'Confirmation!'"
      @submit="next_window" :submitText="'SUBMIT'">
      <v-card-text class="my
      -2">
        <v-row dense>
          <v-col cols="12"> Are you sure you want to proceed?</v-col>
          <v-col cols="12"> <v-text-field variant="underlined" value="Selected position" hide-details /></v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>




  </v-sheet>
</template>
<script setup lang="ts">
import swal from 'sweetalert';
import useAuth from "~/store/auth";
const user = useAuth().user;
const cfg = useRuntimeConfig();
const { $rest } = useNuxtApp();
const step = ref(1)
const route = useRoute();



const { CDN_ENDPOINT, DEV_CDN_ENDPOINT } = cfg.public;
const CDN = cfg.public.NODE_ENV === "development" ? DEV_CDN_ENDPOINT : CDN_ENDPOINT;


const shet_so_hard = (data: any, title: string) => {
  applicant.value.attachments[title] = data
  console.log(applicant.value.attachments)
}
onBeforeMount(() => {
  Promise.all(
    [
      get_position(),
      get_education(),
      get_experience(),
      get_rating(),
      get_sdo(),
      get_school(),
      get_sg(),
      get_qs(),
      get_applicant_details(),
      get_current_status()

    ]
  ).catch(() => swal({
    title: "Error",
    text: "Something went wrong while fetching data",
    icon: "error",
    buttons: { ok: false, cancel: false }
  }))
})




const back = () => {
  if (step.value === 4 && !qs?.value?.with_erf) return step.value = 2;
  return step.value--;
}


function position_form_cond() {
  position_form.value = true
  apply_dialog.value = false

}
const apply_dialog = ref(false)
const next_dialog = ref(false)


const position_form = ref(false)

const applicant = ref({
  qualification: {
    position: "",
    educ_level: "",
    education: [],
    experience: [],
    training: 0,
    per_rating: "",
  },
  personal_information: {
    last_name: "",
    first_name: "",
    middle_name: "",
    email: "",
    birthday: new Date,
    gender: "",

  },
  designation: {
    current_position: "",
    current_sg: "",
    employee_no: "",
    plantilla_no: "",
    division: "",
    district: "",
    item_no: "",
    school: "",
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
  },
  sdo_attachments: {},
  signatory: {
    name: "Marianne Mae Paclian",
    position: "Principal",
    role: "principal",
    signature: "WARAY PA",
    date: new Date(new Date())
  },
  status: "For Signature",
  created_date: new Date(new Date()),
  request_log: [],
  output_requirement: [],
  approved: null,
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

const service_record = ref<ServiceRecord>({
  designation: "",
  from: new Date(),
  to: new Date(),
})

const service_record_dialog = ref(false)
const service_records = ref<ServiceRecord[]>([]);
const service_record_form = ref();
const total_service_years = ref(0);
function add_service_record() {
  const new_service_record: ServiceRecord = {
    designation: service_record.value.designation,
    from: format_date(service_record.value.from),
    to: format_date(service_record.value.to),
  }
  applicant.value.service_record.push(new_service_record);

  service_records.value.push(service_record.value);
  service_record_form.value.reset();

  service_record_dialog.value = false;
  const result = applicant.value.service_record.map((v: ServiceRecord) => {
    const d1 = new Date(v.from);
    const d2 = new Date(v.to);

    const MONTHS = 12;
    const FACTOR = 1000 * 60 * 60 * 24 * 30;
    const diff = Date.parse(d2) - Date.parse(d1);
    return parseInt(diff / FACTOR / MONTHS);

  });

  const total_years = result.length ? result.reduce((a, b) => a + b) : 0;
  applicant.value.equivalent_unit.public_years_teaching = total_years;

  const total_year_equivalent = total_years / 5;
  applicant.value.equivalent_unit.yt_equivalent = total_year_equivalent;

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
  });

  const temp = data[0].sdo_attachment
  if (temp) applicant.value.sdo_attachments = temp
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


const sg_data = ref<SalaryGrade[]>([]);
async function get_sg() {
  const { data, error } = await $rest('sms-salary-grade/get-sg', {
    method: "GET",
  })

  sg_data.value = data
}
const sg_item = computed(() => {
  return sg_data.value.map((v: SalaryGrade) => {
    return {
      ...v,
      title: Number(v.salary_grade)
    };
  });
});


/**
 * MATCHING
 */
function next_window() {
  if (step.value === 2 && !qs.value.with_erf) {
    step.value = 4;
  } else {
    const selected_position: { _id: string; education: string[] } | undefined = position_data.value.filter((v: any) => v._id == applicant.value.qualification.position)[0];
    if (!selected_position) return swal({ title: "Oops!", text: "Select position", icon: "info" });
    const applicant_education = applicant.value.qualification.education;
    if (!applicant_education) return swal({ title: "Oops!", text: "Experience is required", icon: "info" });
    const applicant_experience = applicant.value.qualification.experience;
    if (!applicant_experience) return swal({ title: "Oops!", text: "Experience is required", icon: "info" });

    const applicant_rating = applicant.value.qualification.per_rating;
    if (position_data.value.rating?.length && !applicant_rating) return swal({ title: "Oops!", text: "Rating is required", icon: "info" });
    // if (position_data.value.rating?.length && !applicant_rating) return swal({ title: "Oops!", text: "Rating is required", icon: "info" });

    const applicant_training = applicant.value.qualification.training;
    if (position_data.value.training_hours?.length > 0 && !applicant_training) return swal({ title: "Oops!", text: "Training Hours is required", icon: "info" });



    const is_yes: boolean[] = [];

    is_yes.push(education_matching(applicant_education, selected_position.education));
    is_yes.push(experience_matching(applicant_experience, selected_position.experience));
    is_yes.push(rating_matching(applicant_rating, selected_position.rating));
    is_yes.push(training_matching(applicant_training, selected_position.training_hours));
    if (is_yes.includes(false)) return swal({ title: "ALERT!", text: "Sorry, you are not qualified for this position.", icon: "info" })

    console.log(is_yes);
    step.value++
  }
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

// function rating_matching(applicant_rating: string, required_rating: string) {
//   if (!required_rating) return true;
//   return applicant_rating == required_rating;
// };

function rating_matching(applicant_rating: any, required_rating: any) {
  if (!required_rating) {
    return false;
  }
  const [result] = required_rating.map((v: string) => applicant_rating.includes(v));
  return result;
}


function training_matching(applicant_training: number, required_training: number) {
  applicant_training = parseFloat(applicant_training.toString());
  required_training = parseFloat(required_training.toString());
  return applicant_training >= required_training;
}


// CREATE 
const form = ref(true)
async function create_application() {
  applicant.value.sdo_attachments = selected_qs.value.sdo_attachment;
  const { attachments, sdo_attachments } = applicant.value;
  const temp = new FormData();

  Object.entries(attachments).forEach(([title, file]) => {
    file.forEach((v: any) => {
      const key = `${title}-${v.name}`
      temp.append(key, v)
    });
  });

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

async function update_applicant() {
  get_applicant_details()
  const payload = {
    applicant,
  }
  const { data, error } = await $rest('new-applicant/update-applicant', {
    method: "PUT",
    body: payload
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });

}


async function get_applicant_details() {
  const { data, error } = await $rest('new-applicant/get-applicant', {
    method: 'GET',
    query: {
      id: route.query.id
    }
  })
  if (data) {
    Object.assign(applicant.value, data)
  }

}


const is_email_valid = (email: string) => {
  const email_pattern = /\S+@\S+\.\S+/; //
  return email_pattern.test(email);
};
const email_rules = computed((v: any) => [
  (v: string) => !!v || 'Email is required',
  (v: string) => is_email_valid(v) || 'Email must be valid'
]);



// QS
const qs_data = ref([])
async function get_qs() {
  const { data, error } = await $rest('new-applicant/get-selected-qs', {
    method: "GET",
  });

  qs_data.value = data
}

const selected_qs = computed(() => {
  const selectedPosition = position_data.value.find((pos) => pos._id === applicant.value.qualification.position);
  return selectedPosition || null;
});

const qs = computed(() => {
  const selected_position = position_data.value.find(pos => pos._id === applicant.value.qualification.position);
  const qs_details = selected_position && qs_data.value.find(qs => qs._id === selected_position._id);
  return qs_details || null;
});




const sdo_data = ref<Sdo[]>([]);

async function get_sdo() {
  const { data, error } = await $rest('sms-sdo/get-sdo', {
    method: "GET",
  });

  sdo_data.value = data;

}

const school_data = ref<School[]>([]);

async function get_school() {

  const { data, error } = await $rest('sms-school/get-school', {
    method: "GET",
  });


  school_data.value = data
}

function get_sdo_school(division) {
  if (!division || !school_data.value || school_data.value.length === 0) {
    return [];
  }
  return school_data.value.filter(school => school.division === division);
}


// Current status of
const model = ref();
async function get_current_status() {
  const { data, error } = await $rest('sms-position/get-submission-status', {
    method: 'GET',
  })
  model.value = data.enable_application
}





</script>
<style scoped>
.gradient-background {
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(13, 13, 110, 1) 27%, rgba(22, 22, 166, 1) 56%, rgba(0, 212, 255, 1) 100%);
}

.bg-image {
  background-image: url('/prime-logo.png');
  background-size: cover;
  background-position: center;
}

.text-title {
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  color: #200a8d;
  letter-spacing: 1px;
  margin-bottom: 0px;

}
</style>
