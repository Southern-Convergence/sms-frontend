<template>
  <v-sheet bg-color="#E8EAF6" width="85%" class="mx-auto ma-5">
    <v-card height="90vh">
      <v-sheet class="pa-6" height="auto" color="grey-lighten-4">
        <v-row no-gutters>
          <v-col cols="12" class="text-h6 font-weight-bold text-indigo">QUALIFICATION STANDARDS </v-col>
          <v-col cols="12" class="text-grey">Provides customized eligibility criteria, promoting fairness and
            inclusivity. </v-col>
        </v-row>
      </v-sheet>
      <!-- <v-card-text>
        <v-row no-gutters>
          <v-col cols="2">
            <v-btn> Set Up Position</v-btn>
            <v-sheet class="mr-2" variant="tonal" color="success" v-for=" position, index  in  position_data "
              :key="index">
              <v-alert class="my-1" border="start" border-color="success">

                <div v-for=" educ, index  in  position.education " :key="index" class="text-caption">
                  {{ educ.text }} <br />
                </div>
                <div class="text-caption" v-if="position.education_level">
                  {{ position.education_level }}
                </div>
                <div v-for=" exp, index  in  position.experience " :key="index" class="text-caption">
                  {{ exp.text }} <br />

                </div>
                <div class="text-caption" v-if="position.training_hours">
                  Training Hours :
                  <span class="text-caption"> {{ position.training_hours }} </span>
                </div>

                <div class="text-caption" v-for=" rate, index  in  position.rating " :key="index">
                  {{ rate.title }}
                  <br />
                </div>

                <div class="text-caption w-50" v-if="position.sg">
                  Salary Grade :
                  <span class="text-caption"> {{ position.sg.salary_grade }} </span>
                </div>
                <div class="text-caption" v-if="position.sg">
                  Equivalent :
                  <span class="text-caption"> {{ position.sg.equivalent }} </span>
                </div>

              </v-alert>
            </v-sheet>

          </v-col>
          <v-col cols="2">
            <v-sheet class="pl-2" border height="76vh">
              <v-toolbar color="white">
                Education
                <v-spacer />
                <v-tooltip text="Click to add Education" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn @click="education_dialog = true" v-bind="props" color="indigo" class="mr-0" rounded="0"
                      icon="mdi-plus" />
                  </template>
                </v-tooltip>
              </v-toolbar>
              <v-sheet class="mr-2" variant="tonal" color="indigo" v-for=" educ, index  in  education_data " :key="index">
                <v-alert @click="education_update_dialog(educ)" class="my-1" border="start" border-color="indigo">
                  {{ educ.title }}
                </v-alert>
              </v-sheet>
            </v-sheet>
          </v-col>
          <v-col cols="2">
            <v-sheet class="pl-2" border height="76vh">
              <v-toolbar color="white">
                Experience
                <v-spacer />
                <v-tooltip text="Click to add Experience" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn @click="experience_dialog = true" v-bind="props" color="indigo" class="mr-0" rounded="0"
                      icon="mdi-plus" />
                  </template>
                </v-tooltip>
              </v-toolbar>
              <v-sheet class="mr-2" variant="tonal" color="indigo" v-for=" experience, index  in  experience_data "
                :key="index">
                <v-alert @click="experience_update_dialog(experience)" class="my-1" border="start" border-color="indigo">
                  {{ experience.title }}
                </v-alert>
              </v-sheet>
            </v-sheet>
          </v-col>
          <v-col cols="2">
            <v-sheet class="pl-2" border height="76vh">
              <v-toolbar color="white">
                Performance Rating
                <v-spacer />
                <v-tooltip text="Click to add Performance Rating" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn @click="rating_dialog = true" v-bind="props" color="indigo" class="mr-0" rounded="0"
                      icon="mdi-plus" />
                  </template>
                </v-tooltip>
              </v-toolbar>
              <v-sheet class="mr-2" variant="tonal" color="indigo" v-for=" rating, index  in  rating_data " :key="index">
                <v-alert @click="rating_update_dialog(rating)" class="my-1" border="start" border-color="indigo">
                  {{ rating.title }}
                </v-alert>
              </v-sheet>
            </v-sheet>
          </v-col>
          <v-col cols="2">
            <v-sheet class="pl-2" border height="76vh">
              <v-toolbar color="white">
                Salary Grade
                <v-spacer />
                <v-tooltip text="Click to add Salary Grade" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn @click="sg_dialog = true" v-bind="props" color="indigo" class="mr-0" rounded="0"
                      icon="mdi-plus" />
                  </template>
                </v-tooltip>
              </v-toolbar>
              <v-sheet class="mr-2" variant="tonal" color="indigo" v-for=" sg, index  in  sg_data " :key="index">
                <v-alert @click="update_salary_grade(sg)" class="my-1" border="start" border-color="indigo">
                  <div> Salary Grade : <b> {{ sg.salary_grade }} </b></div>
                  <div> Equivalent : <b> {{ sg.equivalent }} </b></div>
                </v-alert>
              </v-sheet>
            </v-sheet>
          </v-col>
          <v-col cols="2">
            <v-sheet class="pl-2" border height="76vh">
              <v-toolbar color="white">
                Eligibility
                <v-spacer />
                <v-tooltip text="Click to add Eligibility" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="indigo" class="mr-0" rounded="0" icon="mdi-plus" />
                  </template>
                </v-tooltip>
              </v-toolbar>
              <v-sheet class="mr-2" variant="tonal" color="indigo">
                <v-alert class="my-1" border="start" border-color="indigo">
                  Eligibility
                </v-alert>
              </v-sheet>
            </v-sheet>
          </v-col>
          <v-col cols="2">
            <v-sheet class="pl-2" border>
              <v-toolbar color="white">
                Position
                <v-spacer />
                <v-tooltip text="Click to add Position" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn @click="position_dialog = true" v-bind="props" color="success" class="mr-0" rounded="0"
                      icon="mdi-plus" />
                  </template>
                </v-tooltip>
              </v-toolbar>
              <v-sheet class="mr-2" variant="tonal" color="success" v-for=" position, index  in  position_data "
                :key="index">
                <v-alert @click="update_selected(position)" class="my-1" border="start" border-color="success">
                  <div class="text-caption">Education :</div>
                  <div v-for=" educ, index  in  position.education " :key="index" class="text-caption text-grey">
                    {{ educ.text }} <br />

                  </div>
                  <div class="text-caption" v-if="position.education_level">
                    Education Level :
                    <span class="text-caption text-grey"> {{ position.education_level }} </span>
                  </div>
                  <div class="text-caption" v-if="position.experience">Experience :</div>
                  <div v-for=" exp, index  in  position.experience " :key="index" class="text-caption text-grey">
                    {{ exp.text }} <br />

                  </div>
                  <div class="text-caption" v-if="position.training_hours">
                    Training Hours :
                    <span class="text-caption text-grey"> {{ position.training_hours }} </span>
                  </div>
                  <div class="text-caption" v-if="position.rating">Performance Rating :
                    <div class="text-caption text-grey" v-for=" rate, index  in  position.rating " :key="index">
                      {{ rate.title }}
                      <br />
                    </div>
                  </div>
                  <div class="d-flex">
                    <div class="text-caption w-50" v-if="position.sg">
                      Salary Grade :
                      <span class="text-caption text-grey"> {{ position.sg.salary_grade }} </span>
                    </div>
                    <div class="text-caption" v-if="position.sg">
                      Equivalent :
                      <span class="text-caption text-grey"> {{ position.sg.equivalent }} </span>
                    </div>
                  </div>
                </v-alert>
              </v-sheet>
            </v-sheet>
          </v-col> 
        </v-row>
      </v-card-text> -->


      <v-tabs v-model="tab" color="primary" align-tabs="start" centered stacked>
        <v-tab :value="1">
          <v-icon>mdi-school</v-icon>
          Education </v-tab>
        <v-tab :value="2"> <v-icon>mdi-head-cog-outline</v-icon> Experience</v-tab>
        <v-tab :value="3"> <v-icon>mdi-star</v-icon> Performance Rating</v-tab>
        <v-tab :value="4"> <v-icon>mdi-cash</v-icon> Salary Grade</v-tab>
        <v-tab :value="5"> <v-icon>mdi-certificate</v-icon>Position</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item :value="1">
            <v-btn class="my-2" @click="education_dialog = true" color="indigo" elevation="2"> Create
              Education
            </v-btn>
            <v-row dense>
              <v-col cols="12" xl="6" lg="6" md="6" sm="12" v-for=" educ, index  in  education_data " :key="index">
                <v-card class="mx-auto" color="indigo" variant="tonal" @click="education_update_dialog(educ)">
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

              <v-col cols="12" xxl="4" xl="3" lg="6" md="6" sm="12" v-for=" experience, index  in  experience_data "
                :key="index">
                <v-card class="mx-auto" color="indigo" variant="tonal" flat @click="experience_update_dialog(experience)">
                  <v-card-item>
                    <span> {{ experience.title }}</span>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="3">
            <v-btn class="my-2" @click="rating_dialog = true" color="indigo"> Create
              Rating </v-btn>
            <v-row dense>
              <v-col cols="12" l="6" lg="6" md="6" sm="12" v-for=" rate, index  in  rating_data " :key="index">
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
              <v-col cols="12" xxl="4" xl="3" lg="3" md="6" sm="12" v-for=" sg, index  in  sg_data " :key="index">
                <v-card class="mx-auto" color="indigo" variant="tonal" @click="update_salary_grade(sg)" flat>
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
              <v-col cols="12" xxl="4" xl="3" lg="4" md="6" sm="12" v-for=" position, index  in  position_data "
                :key="index">
                <v-card :title="position.title" class="mx-auto" color="indigo" variant="tonal"
                  @click="update_selected_position(position)">
                  <v-card-text>
                    <div class="text-caption">Education :</div>
                    <div v-for=" educ, index  in  position.education " :key="index" class="text-caption text-grey">
                      {{ educ.text }} <br />

                    </div>
                    <div class="text-caption" v-if="position.education_level">
                      Education Level :
                      <span class="text-caption text-grey"> {{ position.education_level }} </span>
                    </div>
                    <div class="text-caption" v-if="position.experience">Experience :</div>
                    <div v-for=" exp, index  in  position.experience " :key="index" class="text-caption text-grey">
                      {{ exp.text }} <br />

                    </div>
                    <div class="text-caption" v-if="position.training_hours">
                      Training Hours :
                      <span class="text-caption text-grey"> {{ position.training_hours }} </span>
                    </div>
                    <div class="text-caption" v-if="position.rating">Performance Rating :
                      <div class="text-caption text-grey" v-for=" rate, index  in  position.rating " :key="index">
                        {{ rate.title }}
                        <br />
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="text-caption w-50" v-if="position.sg">
                        Salary Grade :
                        <span class="text-caption text-grey"> {{ position.sg.salary_grade }} </span>
                      </div>
                      <div class="text-caption" v-if="position.sg">
                        Equivalent :
                        <span class="text-caption text-grey"> {{ position.sg.equivalent }} </span>
                      </div>
                    </div>
                  </v-card-text>

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
    <commons-dialog max-width="35%" v-model="update_sg_dialog" icon="mdi-school" @submit="update_sg"
      :subtitle="'Modify details for the salary grade.'" :submitText="'UPDATE'">
      <v-card-text>
        <v-text-field v-model="selected_sg.salary_grade" label="Salary Grade" />
        <v-text-field v-model="selected_sg.equivalent" label="Equivalent" />
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
    <commons-dialog max-width="30%" v-model="update_position_dialog" icon="mdi-school" :title="'Update Position'"
      @submit="update_position" :subtitle="'Modify Qualification Standards'" :submitText="'Update'">
      <v-card-text>
        <v-text-field v-model="selected_position[0].title" label="Position" />
        <v-select v-model="selected_position[0].education" :items="education_data" item-value="_id" label="Education"
          multiple />
        <v-select v-model="selected_position[0].education_level" :items="['Elementary', 'Secondary']"
          label="Education Level" />
        <v-select v-model="selected_position[0].experience" item-value="_id" :items="experience_data" label="Experience"
          rows="4" multiple />
        <v-text-field v-model="selected_position[0].training_hours" label="Training Number of Hours Required" />
        <v-select v-model="selected_position[0].rating" :items="rating_data" label="Performance Rating Required" multiple
          item-value="_id" />
        <v-select v-model="selected_position[0].sg" :items="sg_item" label="Salary Grade" item-value="_id" />
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
      get_qs()
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
  education_dialog.value = ref(false)
  get_education()
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
function education_update_dialog(educ: Education) {
  education.value = { ...educ };
  status.value = 'update';
  education_dialog.value = true;
}

async function update_education() {
  const selectedEducation = education.value;

  const { data, error } = await $rest('sms-education/update-education', {
    method: "PUT",
    body: {
      _id: selectedEducation._id,
      title: selectedEducation.title
    }
  });

  if (error) {
    return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  }

  return swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });
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
function experience_update_dialog(ex: Experience) {
  experience.value = { ...ex };
  status.value = 'update';
  experience_dialog.value = true;
}

async function update_experience() {
  const selectedExperience = experience.value;

  const { data, error } = await $rest('sms-experience/update-experience', {
    method: "PUT",
    body: {
      _id: selectedExperience._id,
      title: selectedExperience.title
    }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

}


const performance_rating = ref<PerformanceRating>({
  title: "",
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
  const selectedRating = performance_rating.value;
  const { data, error } = await $rest('sms-rating/update-rating', {
    method: "PUT",
    body: {
      _id: selectedRating._id,
      title: selectedRating.title
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

const update_sg_dialog = ref(false);
const selected_sg = ref<SalaryGrade[]>([]);

function update_salary_grade(sg: SalaryGrade) {
  selected_sg.value = [{ ...sg }];
  update_sg_dialog.value = true;
}
async function update_sg() {
  const selectedSG = selected_sg.value[0];

  const { data, error } = await $rest('sms-salary-grade/update-sg', {
    method: "PUT",
    body: {
      _id: selectedSG._id,
      salary_grade: selectedSG.salary_grade,
      equivalent: selectedSG.equivalent
    }
  });

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

}





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

async function get_qs() {
  const { data, error } = await $rest('sms-position/get-qs', {
    method: "GET",
  })
  position_data.value = data
}

const selected_position = ref<Position[]>([]);
const update_position_dialog = ref(false)
function update_selected_position(position: Position) {
  selected_position.value = [{ ...position }];
  update_position_dialog.value = true;
}

async function update_position() {
  const selectedPosition = selected_position.value[0];
  const { data, error } = await $rest('sms-position/update-position', {
    method: "PUT",
    body: {
      _id: selectedPosition._id,
      title: selectedPosition.title,
      education: selectedPosition.education,
      education_level: selectedPosition.education_level,
      experience: selectedPosition.experience,
      training_hours: selectedPosition.training_hours,
      rating: selectedPosition.rating,
      sg: selectedPosition.sg
    }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

}




</script>
