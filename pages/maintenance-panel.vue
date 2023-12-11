<template>
  <v-sheet width="85%" class="mx-auto ma-5">
    <v-card height="90vh">
      <v-sheet class="pa-6" height="auto" color="grey-lighten-4">
        <v-row no-gutters>
          <v-col cols="12" class="text-h6 font-weight-bold text-indigo">QUALIFICATION STANDARDS </v-col>
          <v-col cols="12" class="text-grey">Provides customized eligibility criteria, promoting fairness and
            inclusivity. </v-col>
        </v-row>
      </v-sheet>

      <v-tabs v-model="tab" color="primary">
        <v-tab :value="1">Education </v-tab>
        <v-tab :value="2">Experience</v-tab>
        <v-tab :value="3">Performance Rating</v-tab>
        <v-tab :value="4">Salary Grade</v-tab>
        <v-tab :value="5">Position</v-tab>
      </v-tabs>
      <v-divider />
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item :value="1">
            <v-btn class="my-2" @click="education_dialog = true" color="indigo" elevation="2"> Create
              Education
            </v-btn>
            <v-row dense>
              <v-col cols="12" xl="6" lg="6" md="6" sm="12" v-for="educ, index in education_data" :key="index">
                <v-card class="mx-auto" color="indigo" variant="tonal" @click="show_update_dialog(educ)">
                  <v-card-item>
                    <span> {{ educ.title }}</span>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="2">
            <v-btn class="my-2" @click="experience_dialog = true" color="indigo"> Create Experience </v-btn>
            <v-row dense>

              <v-col cols="12" xxl="4" xl="3" lg="6" md="6" sm="12" v-for="ex, index in experience_data" :key="index">
                <v-card class="mx-auto" color="indigo" variant="tonal" flat @click="experience_update_dialog(ex)">
                  <v-card-item>
                    <span> {{ ex.title }}</span>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="3">
            <v-btn class="my-2" @click="rating_dialog = true" color="indigo"> Create
              Rating </v-btn>
            <v-row dense>
              <v-col cols="12" xxl="4" xl="3" lg="3" md="6" sm="12" v-for="rate, index in rating_data" :key="index">
                <v-card class="mx-auto" color="indigo" variant="tonal" flat @click="rating_update_dialog(rate)">
                  <v-card-item>
                    <span> {{ rate.title }}
                    </span>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="4">
            <v-btn class="my-2" @click="sg_dialog = true" color="indigo"> Create Salary Grade </v-btn>
            <v-row dense>
              <v-col cols="12" xxl="4" xl="3" lg="3" md="6" sm="12" v-for="sg, index in sg_data" :key="index">
                <v-card class="mx-auto" color="indigo" variant="tonal" flat>
                  <v-card-item>
                    {{ sg }}
                    <div> Salary Grade : <b> {{ sg.salary_grade }} </b></div>
                    <div> Equivalent : <b> {{ sg.equivalent }} </b></div>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="5">
            <v-btn class="my-2" @click="position_dialog = true" color="indigo"> Create
              Position </v-btn>
            <v-row dense>
              <v-col cols="12" xxl="4" xl="3" lg="4" md="6" sm="12" v-for="p, index in position_data" :key="index">
                <v-card :title="p.title" class="mx-auto" color="indigo" variant="tonal">
                  <v-card-text>
                    <div class="text-caption">Education :</div>
                    <div v-for="educ, index in p.education" :key="index" class="text-caption text-grey">
                      {{ educ.text }} <br />

                    </div>
                    <div class="text-caption" v-if="p.education_level">
                      Education Level :
                      <span class="text-caption text-grey"> {{ p.education_level }} </span>
                    </div>
                    <div class="text-caption" v-if="p.experience">Experience :</div>
                    <div v-for="exp, index in p.experience" :key="index" class="text-caption text-grey">
                      {{ exp.text }} <br />

                    </div>
                    <div class="text-caption" v-if="p.training_hours">
                      Training Hours :
                      <span class="text-caption text-grey"> {{ p.training_hours }} </span>
                    </div>
                    <div class="text-caption" v-if="p.rating">Performance Rating :
                      <div class="text-caption text-grey" v-for="rate, index in p.rating" :key="index">
                        {{ rate.title }}
                        <br />
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="text-caption w-50" v-if="p.sg">
                        Salary Grade :
                        <span class="text-caption text-grey"> {{ p.sg.salary_grade }} </span>
                      </div>
                      <div class="text-caption" v-if="p.sg">
                        Equivalent :
                        <span class="text-caption text-grey"> {{ p.sg.equivalent }} </span>
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn class="text-caption" variant="tonal" density="compact">
                      UPDATE
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
    <commons-dialog max-width="35%" v-model="education_dialog" icon="mdi-school"
      :title="status === 'create' ? 'Create Education Qualification' : 'Update Education Qualification'"
      @submit="submit_education" :subtitle="'Enter or modify details for the education qualification.'"
      :submitText="status === 'create' ? 'Submit' : 'Update'">
      <v-card-text>
        <v-textarea v-model="education.title" rows="3" label="Enter Education Title" />
        <!-- <v-text-field label="Master Arts Degree Units" v-model="education.units" /> -->
      </v-card-text>
    </commons-dialog>
    <commons-dialog max-width="35%" v-model="experience_dialog" icon="mdi-school"
      :title="status === 'create' ? 'Create experience Qualification' : 'Update experience Qualification'"
      @submit="submit_experience" :subtitle="'Enter or modify details for the experience qualification.'"
      :submitText="status === 'create' ? 'Submit' : 'Update'">
      <v-card-text>
        <v-textarea v-model="experience.title" rows="3" label="Enter experience Title" />
      </v-card-text>
    </commons-dialog>

    <commons-dialog max-width="35%" v-model="rating_dialog" icon="mdi-school"
      :title="status === 'create' ? 'Create Performance  Rating' : 'Update Performance  Rating'" @submit="submit_rating"
      :subtitle="'Enter or modify details for the rating qualification.'"
      :submitText="status === 'create' ? 'Submit' : 'Update'">
      <v-card-text>
        <v-textarea v-model="performance_rating.title" rows="3" label="Enter rating Title" />
      </v-card-text>
    </commons-dialog>

    <commons-dialog max-width="35%" v-model="sg_dialog" icon="mdi-school" :title="'Create Salary Grade'"
      @submit="create_sg" :subtitle="'Enter or modify details for the rating qualification.'" :submitText="'SUBMIT'">
      <v-card-text>
        <v-text-field v-model="sg.salary_grade" label="Salary Grade" />
        <v-text-field v-model="sg.equivalent" label="Equivalent" />
      </v-card-text>
    </commons-dialog>



    <commons-dialog max-width="30%" v-model="position_dialog" icon="mdi-school" :title="'Position  Form'"
      @submit="create_position" :subtitle="'Create position and modify Qualification Standards'" :submitText="'Submit'">
      <v-card-text>
        <v-text-field v-model="position.title" label="Position" />
        <v-select v-model="position.education" :items="education_data" item-value="_id" label="Education" multiple />
        <v-select v-model="position.education_level" :items="['Elementary', 'Secondary']" label="Education Level" />
        <v-select v-model="position.experience" item-value="_id" :items="experience_data" label="Experience" multiple />
        <v-text-field v-model="position.training_hours" label="Training Number of Hours Required" />
        <v-select v-model="position.rating" :items="rating_data" label="Performance Rating Required" multiple
          item-value="_id" />
        <v-select v-model="position.sg" :items="sg_item" label="Salary Grade" item-value="_id" />
      </v-card-text>
    </commons-dialog>


  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { $rest } = useNuxtApp();
import swal from 'sweetalert';
definePageMeta({ layout: "std-applicant" })

onBeforeMount(() => {
  Promise.all(
    [
      get_education(),
      get_experience(),
      get_rating(),
      get_sg(),
      get_position()
    ]
  ).catch(() => swal({
    title: "Error",
    text: "Something went wrong while fetching data",
    icon: "error",
    buttons: { ok: false, cancel: false }
  }))
})


const tab = ref(null);

// dialog

const position_dialog = ref(false);


// CREATE EDUCATION
const education = ref<Education>({
  title: "",
})
async function create_education() {
  const { data, error } = await $rest('sms-education/create-education', {
    method: "POST",
    body: { ...education.value }

  })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
// GET EDUCATION
const education_data = ref<Education[]>([]);
async function get_education() {
  const { data, error } = await $rest('sms-education/get-education', {
    method: "GET",
  })
  education_data.value = data
}
// UPDATE EDUCATION
const status = ref('create');
const education_dialog = ref(false);
async function submit_education() {
  if (status.value === 'create') {
    return create_education();
  } else if (status.value === 'update') {
    return update_education();
  }
}
function experience_update_dialog(educ: Education) {
  education.value = { ...educ };
  status.value = 'update';
  education_dialog.value = true;
}
async function update_education() {
  const { data, error } = await $rest('sms-education/update-education', {
    method: "PUT",
    body: {
      _id: education.value._id,
      title: education.value.title
    }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

}


const experience = ref<Experience>({
  title: "",
  // is_ma_equivalent: false,
  // master_arts: ""
})
async function create_experience() {
  const { data, error } = await $rest('sms-experience/create-experience', {
    method: "POST",
    body: { ...experience.value }
  })

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
/**
 * EXPERIENCE
 */
const experience_data = ref<Experience[]>([]);
async function get_experience() {
  const { data, error } = await $rest('sms-experience/get-experience', {
    method: "GET",
  })
  experience_data.value = data
}
const experience_dialog = ref(false);
async function submit_experience() {
  if (status.value === 'create') {
    return create_experience();
  } else if (status.value === 'update') {
    return update_experience();
  }
}
function show_update_dialog(ex: Experience) {
  experience.value = { ...ex };
  status.value = 'update';
  experience_dialog.value = true;
}
async function update_experience() {
  const { data, error } = await $rest('sms-experience/update-experience', {
    method: "PUT",
    body: {
      _id: experience.value._id,
      title: experience.value.title
    }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

}


const performance_rating = ref<PerformanceRating>({
  title: '',
});
async function create_rating() {
  const { data, error } = await $rest('sms-rating/create-rating', {
    method: "POST",
    body: { ...performance_rating.value }

  })

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

}

const rating_data = ref<PerformanceRating[]>([]);

async function get_rating() {
  const { data, error } = await $rest('sms-rating/get-rating', {
    method: "GET",
  })
  rating_data.value = data
}
// UPDATE PERFORMANCE RATING
const rating_dialog = ref(false);
async function submit_rating() {
  if (status.value === 'create') {
    return create_rating();
  } else if (status.value === 'update') {
    return update_rating();
  }
}
function rating_update_dialog(rate: PerformanceRating) {
  performance_rating.value = { ...rate };
  status.value = 'update';
  rating_dialog.value = true;
}
async function update_rating() {
  const { data, error } = await $rest('sms-rating/update-rating', {
    method: "PUT",
    body: {
      _id: performance_rating.value._id,
      title: performance_rating.value.title
    }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

}


// SALARY GRADE
const sg = ref<SalaryGrade>({
  salary_grade: 0,
  equivalent: 0
});
async function create_sg() {
  const { data, error } = await $rest('sms-salary-grade/create-sg', {
    method: "POST",
    body: { ...sg.value }

  })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
/**
 * HANDLES FETCHING SALARY GRADE
 */
const sg_dialog = ref(false);

const sg_data = ref<SalaryGrade[]>([]);
async function get_sg() {
  const { data, error } = await $rest('sms-salary-grade/get-sg', {
    method: "GET",
  })

  sg_data.value = data
}



// Define your commons-dialog and v-window-item components here

// Make sure to include the proper import for swal or use an alternative way to display alerts


const sg_item = computed(() => {
  return sg_data.value.map((v: SalaryGrade) => {
    return {
      ...v,
      title: Number(v.salary_grade)
    };
  });
});


const position_data = ref<Position[]>([]);
const position = ref<Position>({
  title: "",
  education: [],
  education_level: " ",
  experience: [],
  training_hours: 0,
  rating: [],
  sg: ""
});

async function create_position() {
  const { data, error } = await $rest('sms-position/create-position', {
    method: "POST",
    body: { ...position.value }

  })

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}

async function get_position() {
  const { data, error } = await $rest('sms-position/get-position', {
    method: "GET",
  })
  position_data.value = data
}





</script>
