<template>
  <v-sheet width="85%" class="mx-auto ma-5">
    <v-card height="90vh">
      <v-sheet class="pa-6" height="auto" color="grey-lighten-4">
        <v-row no-gutters>
          <v-col cols="12" class="text-h6 font-weight-bold text-indigo">MODIFIED QUALIFICATION STANDARDS </v-col>
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


              <v-col cols="12" xxl="4" xl="3" lg="3" md="6" sm="12" v-for="educ in education_data" :key="educ">
                <v-card class="mx-auto" color="indigo" variant="tonal">
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

              <v-col cols="12" xxl="4" xl="3" lg="3" md="6" sm="12" v-for="ex in experience_data" :key="ex">
                <v-card class="mx-auto" color="indigo" variant="tonal" flat>
                  <v-card-item>
                    <span>A minimum of <b> {{ ex.number_of_years }}
                      </b> years of experience is required as a <b>"{{ ex.position }} "</b>
                    </span>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="3">
            <v-btn class="my-2" @click="rating_dialog = true" color="indigo"> Create
              Rating </v-btn>
            <v-row dense>
              <v-col cols="12" xxl="4" xl="3" lg="3" md="6" sm="12" v-for="rate in rating_data" :key="rate">
                <v-card class="mx-auto" color="indigo" variant="tonal" flat>
                  <v-card-item>
                    <div> Number of Year Experience Required : <b> {{ rate.number_of_years }} </b> years
                    </div>
                    <div> Rating :
                    </div>
                    <div>
                      <v-list-item class="font-weight-bold" density="compact">
                        {{ rate.rating }}
                      </v-list-item>
                    </div>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="4">
            <v-btn class="my-2" @click="salary_grade_dialog = true" color="indigo"> Create Salary Grade </v-btn>
            <v-row dense>
              <v-col cols="12" xxl="4" xl="3" lg="3" md="6" sm="12" v-for="sg in sg_data" :key="sg">
                <v-card class="mx-auto" color="indigo" variant="tonal" flat>
                  <v-card-item>
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
              <v-col cols="12" xxl="4" xl="3" lg="4" md="6" sm="12" v-for="p in position_data" :key="p">
                <v-card :title="p.title" class="mx-auto" color="indigo" variant="tonal">
                  <v-card-text>
                    <div class="text-caption">Education :</div>
                    <div v-for="educ in p.education" :key="educ" class="text-caption text-grey">
                      {{ educ }} <br />

                    </div>
                    <div class="text-caption" v-if="p.education_level">
                      Education Level :
                      <span class="text-caption text-grey"> {{ p.education_level }} </span>
                    </div>
                    <div class="text-caption" v-if="p.experience">Experience :</div>
                    <div v-for="exp in p.experience" :key="exp" class="text-caption text-grey">
                      {{ exp }} <br />

                    </div>
                    <div class="text-caption" v-if="p.training_hours">
                      Training Hours :
                      <span class="text-caption text-grey"> {{ p.training_hours }} </span>
                    </div>
                    <div class="text-caption" v-if="p.rating">Performance Rating :
                      <div class="text-caption text-grey" v-for="r in p.rating" :key="r">
                        {{ r }}
                        <br />
                      </div>
                    </div>
                    <div class="text-caption" v-if="p.sg">
                      Salary Grade :
                      <span class="text-caption text-grey"> {{ p.sg }} </span>
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
    <commons-dialog max-width="35%" v-model="education_dialog" icon="mdi-school" :title="'Create Education Qualification'"
      @submit="create_education" :subtitle="'Create education for position Qualification Standards'"
      :submitText="'Submit'">
      <v-card-text>
        <v-text-field v-model="education.title" label="Enter Education Title" />
      </v-card-text>
    </commons-dialog>
    <commons-dialog max-width="35%" v-model="experience_dialog" icon="mdi-school" :title="'Create Experience'"
      @submit="create_experience" :subtitle="'For position Qualification Standards'" :submitText="'Submit'">
      <v-card-text>
        <v-text-field v-model="experience.number_of_years" label="Year/s Required" />
        <v-text-field v-model="experience.position" label="Position Title" />
        <v-checkbox v-model="experience.is_ma_equivalent" label="Check if with M.A. Equivalent" />
        <v-text-field v-if="experience.is_ma_equivalent" v-model="experience.master_arts" label="Specify M.A. Degree" />
      </v-card-text>
    </commons-dialog>
    <commons-dialog max-width="35%" v-model="rating_dialog" icon="mdi-school" :title="'Performance Rating Form'"
      @submit="create_rating" :subtitle="'Create performance rating for position Qualification Standards'"
      :submitText="'Submit'">
      <v-card-text>
        <v-text-field v-model="performance_rating.number_of_years" label="Year Required" />
        <v-select v-model="performance_rating.rating" label="Rating Required"
          :items="['Satisfactory', 'Very Satisfactory']" />
      </v-card-text>
    </commons-dialog>
    <commons-dialog max-width="30%" v-model="salary_grade_dialog" icon="mdi-school" :title="'Salary Grade Form'"
      @submit="create_sg" :subtitle="'Create salary grade for position Qualification Standards'" :submitText="'Submit'">
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
        <v-select v-model="position.experience" item-value="_id" :items="experienceItems" label="Experience" multiple />
        <v-text-field v-model="position.training_hours" label="Training Number of Hours Required" />
        <v-select v-model="position.rating" :items="ratingItems" label="Performance Rating Required" multiple
          item-value="_id" />
        <v-select v-model="position.sg" :items="sgItems" label="Salary Grade" item-value="_id" type="number" />
        {{ sgItems }}

        {{ position.education }}
        {{ position.experience }}
        {{ position.rating }}
        {{ position.sg }}
      </v-card-text>
    </commons-dialog>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { $rest } = useNuxtApp();
import swal from 'sweetalert';
definePageMeta({ layout: "std-applicant" })


function get_text(experience: any) {
  console.log(experience)
}
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
const education_dialog = ref(false);
const experience_dialog = ref(false);
const rating_dialog = ref(false);
const salary_grade_dialog = ref(false);
const position_dialog = ref(false);


const position_data = ref([]);

// EDUCATION
const education = ref({
  title: '',
  date_created: new Date(),
});

async function create_education() {
  const { data, error } = await $rest('sms-education/create-education', {
    method: "POST",
    body: { ...education.value }

  })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
// containers
const education_data = ref([]);
const oid = ref("");
const eds = ref([]);
async function get_education() {
  const { data, error } = await $rest('sms-education/get-education', {
    method: "GET",
  })
  education_data.value = data
}


// EXPERIENCE
interface Experience {
  number_of_years: number;
  position: string;
  is_ma_equivalent?: boolean;
  master_arts?: string
}

const experience = ref({} as Experience);
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
const experience_data = ref([]);
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


// PERFORMANCE RATING
interface Performance {
  number_of_years: number,
  rating: string
}
const performance_rating = ref({} as Performance);
async function create_rating() {
  const { data, error } = await $rest('sms-rating/create-rating', {
    method: "POST",
    body: { ...performance_rating.value }

  })

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}

const ratingItems = computed(() => {
  return rating_data.value.map((v: any) => {
    return {
      ...v,
      title: `At least ${v.number_of_years} years consecutive ${v.rating}`
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


// SALARY GRADE
const sg = ref({
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
const sg_data = ref([]);
async function get_sg() {
  const { data, error } = await $rest('sms-salary-grade/get-sg', {
    method: "GET",
  })

  sg_data.value = data
}

const sgItems = computed(() => {
  return sg_data.value.map((v: number) => {
    return {
      ...v,
      title: Number(v.salary_grade)
    }
  })
});



// QS/POSITION
interface Position {
  title: string;
  education: string[];
  education_level?: string;
  experience: string[];
  training_hours?: number;
  rating?: array;
  sg?: string

};
const position = ref({} as Position);
async function create_position() {
  const { data, error } = await $rest('sms-position/create-position', {
    method: "POST",
    body: { ...position.value }

  })
  console.log(data);
  console.log(error)
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
