<template>
  <v-sheet class="d-flex">
    <v-card width="30%" class="my-10 ml-10 mr-5" variant="outlined" color="indigo" v-if="form">
      <div class="d-flex w-100">
        <div width="auto"> <v-avatar class="py-2" size="70">
            <v-img src="/NCR.png" />
          </v-avatar></div>
        <div width="50%" class="align-center mt-6">
          <div
            style="font-family: Tahoma, sans-serif; font-size: 10pt; font-weight: bold;line-height: 1.2mm; margin-bottom: 5px">
            NATIONAL CAPITAL
            REGION</div>
          <div style="font-family: Calibri , serif; font-size: 12pt;">
            Misamis St., Bago Bantay, Quezon City
          </div>
        </div>
      </div>

      <v-divider />
      <v-card-text>
        <v-card-title class=" text-h5 text-primary"> WELCOME to
          <strong>Reclassification System </strong>
        </v-card-title>
        <v-card-subtitle>Elevate Your Career: A Guide to the Reclassification System</v-card-subtitle>
        <v-card-text> <v-row dense>
            <v-col cols="12" v-if="applicant.position == ''">The Qualification Standard for the Selected Position will be
              display here. </v-col>

            <v-col cols="12" v-else v-for="n in get_position_items" :key="n">
              <v-card variant="tonal">
                <v-card-title cols="12" class="font-weight-bold text-subtitle-1 text-indigo">
                  Qualifications Standard</v-card-title>
                <v-divider />
                <v-list>
                  <v-list-subheader class="font-weight-bold text-subtitle-1 text-indigo"> <v-icon class="mr-2"
                      color="primary">
                      mdi-account-hard-hat
                    </v-icon>{{
                      n.position
                    }}</v-list-subheader>

                  <v-list-item color="primary" v-if="n.education">
                    <b>Education :</b> {{ n.education }}

                  </v-list-item>
                  <v-list-item color="primary" v-if="n.experience">
                    <b>Experience :</b>{{ n.experience }}
                  </v-list-item>
                  <v-list-item color="primary" v-if="n.training">
                    <b> Training :</b>{{ n.training }}
                  </v-list-item>
                  <v-list-item color="primary" v-if="n.eligibility">
                    <b> Eligibility :</b>{{ n.eligibility }}
                  </v-list-item>
                  <v-list-item color="primary" v-if="n.performance_rating">
                    <b> Performance Rating :</b>{{ n.performance_rating }}
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>

          </v-row>
        </v-card-text>
      </v-card-text>
    </v-card>

    <v-card width="70%" class=" my-10 mr-10" variant="outlined" color="indigo" v-if="form">
      <v-toolbar class="py-1" color="indigo" border>
        <v-list-item class="pl-2" density="compact">
          <v-list-item-title class="text-h5"> Application Form</v-list-item-title>
          <v-list-item-subtitle> Position Requirements and Criteria</v-list-item-subtitle>

        </v-list-item>
      </v-toolbar>
      <v-card-text>
        <v-row dense>
          <v-col cols="12"> <v-icon class="mr-2 pb-2 " size="26" color="primary">mdi-account</v-icon> Personal
            Information </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
            <v-text-field v-model="applicant.surname" bg-color="white" label="Surname" hide-details />
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
            <v-text-field v-model="applicant.givenname" bg-color="white" label="Given Name" hide-details />
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
            <v-text-field v-model="applicant.middlename" bg-color="white" label="Middle Name" hide-details />
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
            <v-text-field v-model="applicant.email" bg-color="white" :rules="emailRules" label="Email" hide-details />
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
            <v-text-field v-model="applicant.birthday" bg-color="white" label="Birthday" type="date" hide-details />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-row dense>
          <v-col cols="12"> <v-icon class="mr-2 pb-2" size="26" color="primary">mdi-briefcase-account</v-icon>
            Designation and Employment Information</v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
            <v-text-field v-model="applicant.current_position" bg-color="white" label="Current Position" hide-details />
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
            <v-text-field v-model="applicant.employee_no" bg-color="white" label="Employee No" hide-details />
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
            <v-text-field v-model="applicant.plantilla_no" bg-color="white" label="Plantilla No" hide-details />
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
            <v-select :items="$divisions" v-model="applicant.division" bg-color="white" label="Division" hide-details />
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
            <v-text-field v-model="applicant.school" bg-color="white" label="School" hide-details />
          </v-col>
        </v-row>
      </v-card-text>


      <v-card-text>
        <v-row dense>
          <v-col cols="12"> <v-icon class="mr-2 pb-2" size="26" color="primary">mdi-seal</v-icon>
            Individual Qualification</v-col>
          <v-col cols="4" class="px-1">
            <v-select :items="get_position" v-model="applicant.position" class="w-100 pt-2" label="Select Position"
              bg-color="white" hide-details />
          </v-col>
          <v-col cols="4" class="px-1">
            <v-select :items="$education_level" v-model="applicant.education_level" class="w-100 pt-2"
              label="Education Level" bg-color="white" hide-details />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6" class="px-1">
            <v-textarea v-model="applicant.education" rows="2" class="w-100" label="Education" bg-color="white"
              hide-details />

            <v-file-input v-if="applicant.education" label="Attach proof of education" class="mt-2" />
          </v-col>
          <v-col cols="6" class="px-1">
            <v-textarea v-model="applicant.experience" rows="2" class="w-100" label="Experience" bg-color="white"
              hide-details />
            <v-file-input v-if="applicant.experience" label="Attach proof of experience" class="mt-2" />
          </v-col>
          <v-col cols="6" class="px-1">
            <v-textarea v-model="applicant.training" rows="2" class="w-100" label="Training" bg-color="white"
              hide-details />
            <v-file-input v-if="applicant.training" label="Attach proof of training/s" class="mt-2" />
          </v-col>
          <v-col cols="6" class="px-1">
            <v-textarea v-model="applicant.eligibility" rows="2" class="w-100" label="Eligibility" bg-color="white"
              hide-details />
            <v-file-input v-if="applicant.eligibility" label="Attach proof of eligibility" class="mt-2" />
          </v-col>
          <v-col cols="6" class="px-1">
            <v-textarea v-model="applicant.performance_rating" rows="2" class="w-100" label="Performance Rating"
              bg-color="white" hide-details />
            <v-file-input v-if="applicant.performance_rating" label="Attach proof of performance rating" class="mt-2" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions class="my-1">
        <v-row dense justify="center">
          <v-col cols="3">
            <v-btn variant="tonal" color="error" block>
              CLEAR
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn @click="create_application" variant="tonal" color="success" block>
              SUBMIT
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>



    <v-card color="indigo" class="mt-15 pa-10 w-50 mx-auto" v-else>
      <center>
        <v-icon color="success" size="80">mdi-check-all</v-icon>
      </center>
      <center class="text-h5">
        Your application has been successfully submitted!
      </center>
      <center class="subtitle-1 text-grey">
        Please await feedback from the evaluators for the verification process. Notification will be sent to you via
        email.
      </center>
    </v-card>
  </v-sheet>
</template>
<script setup lang="ts">
import swal from 'sweetalert';
const { $rest, $divisions, $education_level } = useNuxtApp();

onBeforeMount(() => {
  get_application(),
    get_qs()
})

const application_data = ref([])
async function get_application() {
  const { data, error } = await $rest('applicant/get-application', {
    method: "GET"
  });
  application_data.value = data;
}

interface Applicant {
  surname: string;
  givenname: string;
  middlename?: string;
  email: string;
  current_position: string;
  employee_no: string;
  plantilla_no: string;
  division: string;
  school: string;
  position: string;
  education: string;
  education_level?: string;
  experience?: string;
  training?: string;
  eligibility?: string;
  performance_rating?: string;
}

const applicant = ref({
  date: new Date(),
  ...{} as Applicant,
  status: 'Pending',
});

// create application
const form = ref(true)
async function create_application() {
  const { data, error } = await $rest('applicant/create-application', {
    method: "POST",
    body: { ...applicant.value }

  })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}

// Get QS
const qs_data = ref([])
async function get_qs() {
  const { data, error } = await $rest('erf-maintenance/get-qs', {
    method: "GET"
  })
  qs_data.value = data;
}
const get_position = computed(() => {
  return qs_data.value.map((i) => i.position);
})

const get_position_items = computed(() => {
  const selected_position = applicant.value.position;
  if (selected_position) {
    const item = qs_data.value.find((item) => item.position === selected_position);
    if (item) {
      return [item];
    }
  }
  return [];
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
</script>