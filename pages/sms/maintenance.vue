<template>
  <v-sheet color="#E8EAF6" height="96vh">
    <v-card-text>
      <v-tabs v-model="tab" color="blue-darken-4" align-tabs="start" centered stacked>

        <v-tab :value="1">
          <v-icon>mdi-certificate</v-icon>
          Qualification Standards</v-tab>
        <v-tab :value="2">
          <v-icon>mdi-cog</v-icon>
          Set Up Form</v-tab>
        <v-tab :value="3">
          <v-icon>mdi-human</v-icon>
          Regional Director Info</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item :value="1">
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="auto" class="mt-3"> <v-btn @click="position_dialog = true" color="blue-darken-4"> Set
                  Up Position</v-btn></v-col>

              <v-spacer />
              <v-col cols="3"><v-text-field prepend-inner-icon="mdi-magnify" label="Enter Position Title"
                  density="compact" hide-details="auto" variant="solo" bg-color="grey-lighten-4" /></v-col>
            </v-row>
            <!-- <commons-item-container class="mt-2" title="Qualification Standards"
              subtitle="A brief overview of qualification standards." :items="position_data" :display_types="['grid']">
              <template v-slot:item="{ value, index, display }">
                <v-card class="mx-auto ma-1 elevation-0" append-icon="mdi-open-in-new" rounded="md" border
                  :title="value.title" @click="view_pos(value)"></v-card>
                <v-alert class="maintenance-item" append-icon="mdi-open-in-new" border-color="indigo" border
                  @click="view_pos(value)">
                  {{ value.title
                  }}

                </v-alert>
              </template>
</commons-item-container> -->

            <v-card class="mt-3" title="Summary of Set Qualification Standards"
              subtitle="A brief overview of qualification standards." prepend-icon="mdi-certificate" rounded="lg">
              <v-divider />
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="4" class="pa-2" v-for="pos, index in position_data" :key="pos">
                    <v-alert border-color="indigo" class="maintenance-item" append-icon="mdi-open-in-new"
                      @click="view_pos(pos)">
                      {{ pos.title
                      }}
                    </v-alert>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

          </v-card-text>
        </v-window-item>
        <v-window-item :value="2" height="80vh">
          <div fluid border class="mt-2">
            <v-row no-gutters>
              <v-col cols="4">
                <v-card height="40vh" class="d-flex flex-column ma-2">
                  <v-toolbar color="blue-darken-4" class="pl-3 text-subtitle-1">
                    Education
                    <v-spacer />
                    <v-tooltip text="Click to add Education" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn @click="education_dialog = true" v-bind="props" color="indigo-lighten-4"
                          icon="mdi-plus"></v-btn>
                      </template>
                    </v-tooltip>
                  </v-toolbar>
                  <v-card-text>
                    <v-sheet height="31vh" class="overflow-y-auto pa-2">
                      <v-alert v-for="educ in education_data" :key="educ.title" @click="education_update_dialog(educ)"
                        class="my-2 maintenance-item" :class="{ 'elevation-4': is_hovered }" rounded="lg"
                        icon="mdi-school">
                        {{ educ.title }}
                      </v-alert>
                    </v-sheet>
                  </v-card-text>

                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card height="40vh" class="d-flex flex-column ma-2">
                  <v-toolbar color="blue-darken-4" class="pl-3 text-subtitle-1">
                    Experience
                    <v-spacer />
                    <v-tooltip text="Click to add Experience" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn @click="experience_dialog = true" v-bind="props" color="indigo-lighten-4"
                          icon="mdi-plus"></v-btn>
                      </template>
                    </v-tooltip>
                  </v-toolbar>
                  <v-card-text> <v-sheet height="31vh" class="overflow-y-auto pa-2">
                      <v-alert v-for=" experience, index  in  experience_data " :key="index"
                        @click="experience_update_dialog(experience)" class="my-2 maintenance-item"
                        :class="{ 'elevation-4': is_hovered }" rounded="lg" icon="mdi-head-cog-outline">
                        {{ experience.title }}
                      </v-alert>
                    </v-sheet>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card height="40vh" class="d-flex flex-column ma-2">
                  <v-toolbar color="blue-darken-4" class="pl-3 text-subtitle-1">
                    Performance Rating
                    <v-spacer />
                    <v-tooltip text="Click to add  Performance Rating" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn @click="rating_dialog = true" v-bind="props" color="indigo-lighten-4"
                          icon="mdi-plus"></v-btn>
                      </template>
                    </v-tooltip>
                  </v-toolbar>
                  <v-card-text>
                    <v-sheet height="31vh" class="overflow-y-auto pa-2">
                      <v-alert v-for=" rating, index  in  rating_data " :key="index"
                        @click="rating_update_dialog(rating)" class="my-2 maintenance-item"
                        :class="{ 'elevation-4': is_hovered }" rounded="lg" icon="mdi-star">
                        {{ rating.title }}
                      </v-alert>
                    </v-sheet>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card height="40vh" class="d-flex flex-column ma-2">
                  <v-toolbar color="blue-darken-4" class="pl-3 text-subtitle-1">
                    Salary Grade
                    <v-spacer />
                    <v-tooltip text="Click to add     Salary Grade" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn @click="sg_dialog = true" v-bind="props" color="indigo-lighten-4"
                          icon="mdi-plus"></v-btn>
                      </template>
                    </v-tooltip>
                  </v-toolbar>
                  <v-card-text> <v-sheet height="31vh" class="overflow-y-auto pa-2">
                      <v-alert v-for=" sg, index  in  sg_data " :key="index" @click="update_salary_grade(sg)"
                        class="my-2 maintenance-item" :class="{ 'elevation-4': is_hovered }" rounded="lg"
                        icon="mdi-cash">
                        <div> Salary Grade : <b> {{ sg.salary_grade }} </b></div>
                        <div> Equivalent : <b> {{ sg.equivalent }} </b></div>
                      </v-alert>
                    </v-sheet></v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card height="40vh" class="d-flex flex-column ma-2">
                  <v-toolbar color="blue-darken-4" class="pl-3 text-subtitle-1">
                    M.A Units
                    <v-spacer />
                    <v-tooltip text="Click to add     Eligibility" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" color="indigo-lighten-4" icon="mdi-plus"></v-btn>
                      </template>
                    </v-tooltip>
                  </v-toolbar>
                  <v-card-text> <v-sheet height="31vh" class="overflow-y-auto pa-2">
                      <v-alert class="my-1 maintenance-item" :class="{ 'elevation-4': is_hovered }" rounded="lg"
                        icon="mdi-alert" border-color="blue-darken-4">
                        Not yet avaliable
                      </v-alert>
                    </v-sheet></v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card height="40vh" class="d-flex flex-column ma-2">
                  <v-toolbar color="blue-darken-4" class="pl-3 text-subtitle-1">
                    Attachments
                    <v-spacer />
                    <v-tooltip text="Click to add             Attachments" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn @click="attachment_dialog = true" v-bind="props" color="indigo-lighten-4"
                          icon="mdi-plus"></v-btn>
                      </template>
                    </v-tooltip>
                  </v-toolbar>
                  <v-card-text>
                    <v-sheet height="31vh" class="overflow-y-auto pa-2">
                      <v-alert v-for=" attachment, index  in  attachment_data " :key="index"
                        @click="update_attachment(attachment)" class="my-2 maintenance-item"
                        :class="{ 'elevation-4': is_hovered }" rounded="lg" icon="mdi-paperclip">
                        {{ attachment.title }}
                      </v-alert>
                    </v-sheet>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-window-item>
        <v-window-item :value="3" height="80vh">
          <v-card class="mx-auto my-15" elevation="2" max-width="600">
            <v-card-item>
              <v-card-title>
                Set Up Regional Director Information
              </v-card-title>
              <v-card-subtitle>
                This is for the generation of Indorsement Letters.
              </v-card-subtitle>
            </v-card-item>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <v-text-field label="First Name" hide-details />
                </v-col>
                <v-col cols="4">
                  <v-text-field label="Middle Name" hide-details />

                </v-col>
                <v-col cols="4">
                  <v-text-field label="Last Name" hide-details />

                </v-col>
                <v-col cols="12"> <v-textarea label="Regional Office Address" /></v-col>

              </v-row>
            </v-card-text>
          </v-card>


        </v-window-item>

      </v-window>
    </v-card-text>


    <!-- </v-card> -->
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





    <commons-dialog max-width="40%" v-model="position_dialog" :title="'Position  Form'" @submit="create_position"
      :subtitle="'Create position and modify Qualification Standards'" :submitText="'Submit'">
      <v-card-text class="ma-2">
        <v-row no-gutters>
          <v-col cols="6" class="pr-2"> <v-text-field v-model="position.title" label="Position" hide-details
              prepend-inner-icon="mdi-account-hard-hat" /></v-col>
          <v-col cols="6"> <v-select v-model="position.education_level" :items="['Elementary', 'Secondary']"
              label="Education Level" hide-details prepend-inner-icon="mdi-book" /></v-col>
          <v-col cols="12"> <v-checkbox label="Check if with ERF" v-model="position.with_erf"></v-checkbox></v-col>
          <v-col cols="12"> <v-select v-model="position.education" :items="education_data" item-value="_id"
              label="Education" multiple prepend-inner-icon="mdi-school" /></v-col>
          <v-col cols="12"> <v-select v-model="position.experience" item-value="_id" :items="experience_data"
              label="Experience" multiple prepend-inner-icon="mdi-head-cog-outline" /></v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="6" class="pr-2"> <v-text-field v-model="position.training_hours"
              label="Training Number of Hours Required" prepend-inner-icon="mdi-human-male-board" /></v-col>
          <v-col cols="6"> <v-select v-model="position.rating" :items="rating_data" label="Performance Rating Required"
              multiple item-value="_id" prepend-inner-icon="mdi-star" /></v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="6" class="pr-2"> <v-select v-model="position.sg" :items="sg_item" label="Salary Grade"
              item-value="_id" prepend-inner-icon="mdi-cash" /></v-col>

        </v-row>


        <v-row no-gutters>
          <v-col cols="12">
            <v-list-subheader class="text-indigo"> <v-icon>mdi-paperclip</v-icon>Required attachments for
              applicants.</v-list-subheader>
            <v-select v-model="position.attachment" :items="attachment_data" label="Select Applicant Attachments"
              item-value="_id" multiple clearable chips /> </v-col>

          <v-col cols="12">
            <v-list-subheader class="text-indigo"> <v-icon>mdi-paperclip</v-icon> Required attachments for
              School Division Office.</v-list-subheader>
            <v-select v-model="position.sdo_attachment" :items="attachment_data" label="SDO Attachments"
              item-value="_id" multiple clearable chips /></v-col>
        </v-row>
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
        <v-select v-model="selected_position[0].rating" :items="rating_data" label="Performance Rating Required"
          multiple item-value="_id" />
        <v-select v-model="selected_position[0].sg" :items="sg_item" label="Salary Grade" item-value="_id" />
      </v-card-text>
    </commons-dialog>


    <commons-dialog max-width="35%" v-model="attachment_dialog" icon="mdi-school" title="Create Attachment"
      @submit="create_attachment" submitText="Submit">
      <v-card-text>
        <v-textarea v-model="attachment.title" rows="3" label="Enter attachment Title" />
      </v-card-text>
    </commons-dialog>

    <v-dialog max-width="60%" v-model="view_qs_dialog">
      <v-card color="#E8EAF6" class="pa-5">
        <v-card-title> Evaluation Criteria : <span class="text-primary">{{ selected_position.title }}</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" xl="6" lg="6" md="6" sm="12">
              <v-list class="pa-4" rounded="lg">
                <v-list-item-title class="text-primary">Education</v-list-item-title>
                <v-sheet class="overflow-y-auto pa-2" height="22vh">
                  <v-list-item-subtitle v-for=" educ, index  in  selected_position.education " :key="index">
                    <v-icon>mdi-circle-medium</v-icon> {{ educ.text }}</v-list-item-subtitle>
                </v-sheet>
              </v-list>
            </v-col>
            <v-col cols="12" xl="6" lg="6" md="6" sm="12">
              <v-list class="pa-4" rounded="lg">
                <v-list-item-title class="text-primary">Experience</v-list-item-title>
                <v-sheet class="overflow-y-auto pa-2" height="22vh">
                  <v-list-item-subtitle v-for=" exp, index  in  selected_position.experience " :key="index">
                    <v-icon>mdi-circle-medium</v-icon> {{ selected_position.experience.length ? exp.text : 'N/A'
                    }}</v-list-item-subtitle>
                </v-sheet>
              </v-list>
            </v-col>
            <v-col cols="12" xl="6" lg="6" md="6" sm="12">
              <v-list class="pa-4" rounded="lg">
                <v-list-item-title class="text-primary">Education Level</v-list-item-title>
                <v-list-item-subtitle> <v-icon>mdi-circle-medium</v-icon> {{ selected_position.education_level ?
        selected_position.education_level : 'N/A'
                  }}</v-list-item-subtitle>
              </v-list>
            </v-col>
            <v-col cols="12" xl="6" lg="6" md="6" sm="12">
              <v-list class="pa-4" rounded="lg">
                <v-list-item-title class="text-primary">Training Hours</v-list-item-title>
                <v-list-item-subtitle> <v-icon>mdi-circle-medium</v-icon> {{ selected_position.training_hours ?
        selected_position.training_hours : 'N/A'
                  }}</v-list-item-subtitle>
              </v-list>
            </v-col>
            <v-col cols="12" xl="6" lg="6" md="6" sm="12">
              <v-list class="pa-4" rounded="lg">
                <v-list-item-title class="text-primary">Salary Grade</v-list-item-title>
                <v-list-item-subtitle> <v-icon>mdi-circle-medium</v-icon> {{ selected_position.sg.salary_grade ?
        selected_position.sg.salary_grade : 'N/A'
                  }}</v-list-item-subtitle>
              </v-list>
            </v-col>

            <v-col cols="12" xl="6" lg="6" md="6" sm="12">
              <v-list class="pa-4" rounded="lg">
                <v-list-item-title class="text-primary">Salary Equivalent</v-list-item-title>
                <v-list-item-subtitle> <v-icon>mdi-circle-medium</v-icon> {{ selected_position.sg.equivalent ?
        selected_position.sg.equivalent : 'N/A'
                  }}</v-list-item-subtitle>
              </v-list>
            </v-col>
            <v-col cols="12" xl="6" lg="6" md="6" sm="12">
              <v-list class="pa-4" rounded="lg">
                <v-list-item-title class="text-primary"> Applicant Attachment Requirements</v-list-item-title>
                <v-sheet class="overflow-y-auto pa-2" height="12vh">
                  <v-list-item-subtitle v-for=" attach, index  in  selected_position.attachment " :key="index">
                    <v-icon>mdi-circle-medium</v-icon> {{ attach.title }}</v-list-item-subtitle>
                </v-sheet>
              </v-list>
            </v-col>
            <v-col cols="12" xl="6" lg="6" md="6" sm="12">
              <v-list class="pa-4" rounded="lg">
                <v-list-item-title class="text-primary"> Applicant Attachment Requirements</v-list-item-title>
                <v-sheet class="overflow-y-auto pa-2" height="12vh">
                  <v-list-item-subtitle v-for=" attach, index  in  selected_position.sdo_attachment " :key="index">
                    <v-icon>mdi-circle-medium</v-icon> {{ attach.title }}</v-list-item-subtitle>
                </v-sheet>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row justify="center">
            <v-col cols="4"> <v-btn @click="update_position_dialog = true" block color="primary"
                variant="tonal">Update</v-btn></v-col>
            <v-col cols="4"> <v-btn @click="view_qs_dialog = false" block color="primary"
                variant="tonal">Close</v-btn></v-col>
          </v-row>
        </v-card-actions>
      </v-card>

    </v-dialog>

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
      get_qs(),
      get_attachment()
    ]
  ).catch(() => swal({
    title: "Error",
    text: "Something went wrong while fetching data",
    icon: "error",
    buttons: { ok: false, cancel: false }
  }))
})

const view_qs_dialog = ref(false)
const tab = ref(null);
const is_hovered = ref(false)
// dialog

const position_dialog = ref(false);
const model = ref(true)


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
  experience_dialog.value = ref(false)
  get_experience()
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
  rating_dialog.value = ref(false)
  get_rating()
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
  sg_dialog.value = ref(false)
  get_sg()
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
  with_erf: false,
  education: [],
  education_level: "",
  experience: [],
  training_hours: 0,
  rating: [],
  sg: "",
  attachment: [],
  sdo_attachment: []
});

async function create_position() {
  const { data, error } = await $rest('sms-position/create-position', {
    method: "POST",
    body: { ...position.value }

  })

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  position_dialog.value = ref(false)
  get_qs()
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

const view_position = ref<Position[]>([]);

function view_pos(position: Position) {
  selected_position.value = { ...position };
  view_qs_dialog.value = true;
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



// Attachment
const attachment_dialog = ref(false);

interface Attachment {
  title: String
}

const attachment = ref<Attachment>({
  title: "",

})
async function create_attachment() {
  const { data, error } = await $rest('sms-attachment/create-attachment', {
    method: "POST",
    body: { ...attachment.value }
  })

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  attachment_dialog.value = false
  get_attachment()
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
/**
 * attachment
 */
const attachment_data = ref<Attachment[]>([]);
async function get_attachment() {
  const { data, error } = await $rest('sms-attachment/get-attachment', {
    method: "GET",
  })
  attachment_data.value = data
}
const formatted_equivalent = computed(() => {
  const equivalent = position.value.sg?.equivalent;

  if (typeof equivalent === 'number' && !isNaN(equivalent)) {
    return equivalent.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    console.error("Invalid Number:", equivalent);
    return "Invalid Number";
  }
});


</script>
<style scoped>
.maintenance-item {
  transition: background-color 0.3s ease-in-out;
}

.maintenance-item:hover {
  background-color: #E8EAF6;
}
</style>
