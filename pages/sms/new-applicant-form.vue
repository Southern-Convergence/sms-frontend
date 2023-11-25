<template>
  <v-container class="h-10">
    <v-card class="mx-auto">
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-sheet width="100%">
            <v-toolbar class="py-1" color="indigo" border>
              <v-list-item class="pl-2" density="compact">
                <v-list-item-title class="text-h5"> Application Form</v-list-item-title>
                <v-list-item-subtitle> Position Requirements and Criteria</v-list-item-subtitle>
              </v-list-item>
            </v-toolbar>
            <v-card-text>

              <v-row dense>{{ position_data }} </v-row>

              <v-row dense>
                <v-col cols="12"> <v-icon class="mr-2 pb-2" size="26" color="primary">mdi-seal</v-icon>
                  Individual Qualification</v-col>
                <v-col cols="4" class="px-1">

                  <v-select :items="position_item" v-model="applicant.position" class="w-100 pt-2" label="Select Position"
                    bg-color="white" hide-details item-value="_id" />
                </v-col>
                <v-col cols="4" class="px-1">
                  <v-select v-model="applicant.educ_level" :items="['Elementary', 'Secondary']" class="w-100 pt-2"
                    label="Education Level" bg-color="white" hide-details />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6" class="px-1">
                  <v-select v-model="applicant.education" :items="education_data" rows="2" class="w-100" label="Education"
                    bg-color="white" hide-details multiple item-value="_id" />

                  {{ applicant.education }}
                </v-col>
                <v-col cols="6" class="px-1">
                  <v-select v-model="applicant.experience" :items="experienceItems" class="w-100" label="Experience"
                    bg-color="white" hide-details multiple item-value="_id" />

                </v-col>
                <v-col cols="6" class="px-1">

                  <v-text-field v-model="applicant.training" class="w-100" label="Enter total training hours"
                    bg-color="white" hide-details type="number" item-value="_id" />
                </v-col>
                <!-- <v-col cols="6" class="px-1">
                                    <v-select v-model="applicant.eligibility" class="w-100" label="Eligibility"
                                        bg-color="white" hide-details />

                                </v-col> -->
                <v-col cols="6" class="px-1">

                  <v-select v-model="applicant.per_rating" :items="ratingItems" class="w-100" label="Performance Rating"
                    bg-color="white" hide-details item-value="_id" />

                </v-col>
              </v-row>
            </v-card-text>
          </v-sheet>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-row dense>
              <v-col cols="12"> <v-icon class="mr-2 pb-2 " size="26" color="primary">mdi-account</v-icon>
                Personal
                Information </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                <v-text-field v-model="applicant.lastname" bg-color="white" label="Surname" hide-details />
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                <v-text-field v-model="applicant.firstname" bg-color="white" label="Given Name" hide-details />
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                <v-text-field v-model="applicant.middlename" bg-color="white" label="Middle Name" hide-details />
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                <v-text-field v-model="applicant.email" bg-color="white" label="Email" hide-details />
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                <v-text-field v-model="applicant.birthday" bg-color="white" label="Birthday" type="date" hide-details />
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                <v-text-field v-model="applicant.gender" bg-color="white" label="Gender" type="date" hide-details />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row dense>
              <v-col cols="12"> <v-icon class="mr-2 pb-2" size="26" color="primary">mdi-briefcase-account</v-icon>
                Designation and Employment Information</v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                <v-text-field bg-color="white" label="Current Position" hide-details />
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                <v-text-field bg-color="white" label="Employee No" hide-details />
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                <v-text-field bg-color="white" label="Plantilla No" hide-details />
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                <v-select bg-color="white" label="Division" hide-details />
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                <v-text-field bg-color="white" label="School" hide-details />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-card-title class="text-subtitle-2 d-flex">
              I. Education Attainment and Civil Service Eligibility
              <v-btn class="ml-2" density="compact" icon="mdi-plus" color="success" />
            </v-card-title>
            <v-sheet border class="mx-4 mb-4">
              <v-data-table density="compact">
                <template #bottom v-if="!show_footer" /> </v-data-table>

            </v-sheet>

            <v-row dense>
              <v-col cols="6">
                <v-file-input label=" Attach Authenticated copy of Transcript of Record" hide-details density="compact"
                  variant="underlined" clearable />
              </v-col>
              <v-col cols="4">

                <v-text-field placeholder="Enter Register Complete Name" density="compact" hide-details
                  variant="underlined" />
                <v-text-field placeholder="Contact Number" density="compact" hide-details variant="underlined" />
                <v-text-field placeholder="Registrar Email" density="compact" hide-details variant="underlined" />
              </v-col>
            </v-row>
          </v-card-text>

        </v-window-item>
        <v-window-item :value="3">
          <v-card-text>
            <v-card-title class="text-subtitle-2">
              II. Service Record
              <v-btn density="compact" icon="mdi-plus" color="success" />
            </v-card-title>
            <v-row dense>
              <v-col cols="8">
                <v-sheet border>
                  <v-data-table density="compact">
                    <template #bottom v-if="!show_footer" /> </v-data-table>
                </v-sheet>
              </v-col>
              <v-col cols="4">
                <v-file-input label="Attach Service Record" hide-details density="compact" variant="underlined"
                  clearable />
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
                    <v-col cols="5"> <v-text-field label="Public Schools" hide-details density="compact"
                        type="number" /></v-col>
                    <v-col cols="5"> <v-text-field label="Private Schools" hide-details density="compact"
                        type="number" /></v-col>
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
                      <v-btn density="compact" icon="mdi-plus" color="success" />
                    </v-card-title>
                    <v-sheet border class="mx-4">
                      <v-data-table density="compact">
                        <template #bottom v-if="!show_footer"> </template> </v-data-table>
                    </v-sheet>
                  </v-sheet>
                </v-col>
                <v-col cols="12" class="text-caption text-grey-darken-1 pl-5 mt-2">
                  2. Teaching Experience

                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="12" class="px-2 ml-5">
                  <v-text-field label="Public Schools" hide-details type="number" /></v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="12" class="px-2"> <v-text-field label="Private School"
                    type="number" /></v-col>
                <v-col cols="12" class="text-caption text-grey-darken-1 pl-5 my-2">
                  Attach the following:
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="12" class="px-2 ml-5">
                  <v-text-field label="Public Schools" hide-details type="number" /></v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="12" class="px-2"> <v-text-field label="Private School"
                    type="number" /></v-col>
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
        <v-btn v-if="step === 3" color="success" variant="flat">
          SUBMIT
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import swal from 'sweetalert';
const { $rest } = useNuxtApp();

onBeforeMount(() => {
  Promise.all(
    [
      get_education(),
      get_position(),
      get_experience(),
      get_rating()
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
  date: new Date(),
  ...{} as Qualifications,
  status: 'Pending',
});


const position_data = ref([])
async function get_position() {
  const { data, error } = await $rest('sms-position/get-position', {
    method: "GET",
  })
  position_data.value = data

}
const position_item = computed(() => {
  return position_data.value.filter((i) => i.title);
})

const educ_level_items = computed(() => {

})

// Education data
const education_data = ref([])
async function get_education() {
  const { data, error } = await $rest('sms-education/get-education', {
    method: "GET",
  })
  education_data.value = data
}

const experience_data = ref([])

async function get_experience() {
  const { data, error } = await $rest('sms-experience/get-experience', {
    method: "GET",
  })
  experience_data.value = data
}
const experienceItems = computed(() => {
  return experience_data.value.map((v: any) => {
    return {
      ...v,
      title: `${v.number_of_years} years at ${v.position}`
    }
  })
});
const rating_data = ref([]);
async function get_rating() {
  const { data, error } = await $rest('sms-rating/get-rating', {
    method: "GET",
  })
  rating_data.value = data

}
const ratingItems = computed(() => {
  return rating_data.value.map((v: any) => {
    return {
      ...v,
      title: `At least ${v.number_of_years} years consecutive ${v.rating}`
    }
  })
});


// EMAIL VALIDATION

const isEmailValid = (email: string) => {
  const emailPattern = /\S+@\S+\.\S+/; //
  return emailPattern.test(email);
};

const emailRules = computed(() => [
  v => !!v || 'Email is required',
  v => isEmailValid(v) || 'Email must be valid'
]);
/**
 * MATCHING
 */
function next_window() {

  const selected_position = position_item.value.filter((v: string) => v._id == applicant.value.position)[0];
  const applicant_education = applicant.value.education;
  const { education: position_education } = selected_position;

  const is_yes: boolean[] = [];
  is_yes.push(education_matching(applicant_education, position_education));
  is_yes.push(experience_matching());

  if (is_yes.includes(false)) return swal({ title: "ALERT", text: "alert" })
  step.value++
}

function education_matching(applicant_education: any, required_education: any) {
  const [result] = required_education.map((v: string) => applicant_education.includes(v));
  return result;
}

function experience_matching() {
  return false;
}
</script>