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
          Regional Director Info</v-tab> <v-spacer /> <v-btn @click="position_dialog = true" color="blue-darken-4"
          class="mt-7" v-if="tab === 1"> Set
          Up Position</v-btn>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item :value="1">
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
                      <v-alert v-for=" experience, index in experience_data " :key="index"
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
                      <v-alert v-for=" rating, index in rating_data " :key="index" @click="rating_update_dialog(rating)"
                        class="my-2 maintenance-item" :class="{ 'elevation-4': is_hovered }" rounded="lg"
                        icon="mdi-star">
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
                      <v-alert v-for=" sg, index in sg_data " :key="index" @click="update_salary_grade(sg)"
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
                    Leadership and Potential
                    <v-spacer />
                    <v-tooltip text="Click to add  Leadership and Potential" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn @click="leaderhip_dialog = true" v-bind="props" color="indigo-lighten-4"
                          icon="mdi-plus"></v-btn>
                      </template>
                    </v-tooltip>
                  </v-toolbar>
                  <v-card-text>
                    <v-sheet height="31vh" class="overflow-y-auto pa-2">
                      <v-alert class="my-1 maintenance-item" :class="{ 'elevation-4': is_hovered }" rounded="lg"
                        icon="mdi-book" border-color="blue-darken-4" v-for="lead, index in leadership_data"
                        :key="index">
                        {{ lead.title }}

                      </v-alert>
                    </v-sheet>
                  </v-card-text>
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
                      <v-alert v-for=" attachment, index in attachment_data " :key="index"
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
          <v-card class="mx-auto mt-10" elevation="2" max-width="80%">
            <v-card-item>
              <v-card-title class="text-primary">
                Set Up RD and DBM Information
              </v-card-title>
              <v-card-subtitle>
                This is for the generation of Indorsement Letters.
              </v-card-subtitle>
            </v-card-item>
            <v-divider />
            <v-card-text>
              <v-row justify="center">

                <v-col cols="6"> <v-row justify="center" dense>
                    <v-col cols="12" class="text-primary">
                      Regional Director
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="rd.rd.first_name" label="First Name" hide-details />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="rd.rd.middle_name" label="Middle Name" hide-details />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="rd.rd.last_name" label="Last Name" hide-details />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="rd.rd.position" label="CES Rank" hide-details />
                    </v-col>

                    <v-col cols="12">
                      <v-textarea rows="3" v-model="rd.rd.ro_address" label="Regional Office Address" />
                    </v-col>
                  </v-row></v-col>
                <v-col cols="6"> <v-row justify="center" dense> <v-col cols="12" class="text-primary">
                      DBM
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="rd.dbm.first_name" label="First Name" hide-details />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="rd.dbm.middle_name" label="Middle Name" hide-details />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="rd.dbm.last_name" label="Last Name" hide-details />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="rd.dbm.government_agency" label="Government Agency" hide-details />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="rd.dbm.position" label="CES Rank" hide-details />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="rd.dbm.region" label="Region" hide-details />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea rows="3" v-model="rd.dbm.dbm_address" label="Office Address" />
                    </v-col></v-row></v-col>



                <v-col cols="4" v-if="!rd._id">
                  <v-btn block @click="create_rd">SUBMIT</v-btn>
                </v-col>
                <v-col cols="4" v-else>
                  <v-btn block @click="update_rd">UPDATE</v-btn>
                </v-col>
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
        <v-textarea v-model="education.title" rows="3" label="Enter Education Title" hide-details />
        <v-checkbox v-model="education.high_degree"
          label="Check this if obtain a higher degree. This will override experience and Master's degree units." />

        <!-- <v-text-field label=" Master Arts Degree Units" v-model="education.units" /> -->
      </v-card-text>
    </commons-dialog>
    <commons-dialog max-width="35%" v-model="experience_dialog" icon="mdi-school"
      :title="status === 'create' ? 'Create experience Qualification' : 'Update experience Qualification'"
      @submit="submit_experience" :subtitle="'Enter or modify details for the experience qualification.'"
      :submitText="status === 'create' ? 'Submit' : 'Update'">
      <v-card-text>
        <v-textarea v-model="experience.title" rows="3" label="Enter experience Title" /> <br />
        <v-text-field label="Equivalent" v-model="experience.equivalent" />
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

    <commons-dialog max-width="35%" v-model="leaderhip_dialog" icon="mdi-school"
      :title="status === 'create' ? 'Create  Leadership and Potential to Experience Ratio' : 'Update  Leadership and Potential'"
      @submit="create_leadership_and_potential" :subtitle="'Enter or modify details Leadership and Potential.'"
      :submitText="status === 'create' ? 'Submit' : 'Update'">
      <v-card-text class="ma-2">



        <v-text-field v-model="leadership.title" label="Leadership and Potential" />

      </v-card-text>
    </commons-dialog>


    <commons-dialog width="60%" v-model="position_dialog" :title="'Position  Form'" @submit="create_position"
      :subtitle="'Create position and modify Qualification Standards'" :submitText="'Submit'">
      <v-card-text>
        <v-row dense>
          <v-col cols="7" class="pa-4"> <v-row no-gutters>
              <v-col cols="7"> <v-text-field v-model="position.title" label="Position" hide-details
                  prepend-inner-icon="mdi-account-hard-hat" /></v-col>

              <v-col cols="5" class="pl-2"> <v-select v-model="position.education_level"
                  :items="['Elementary', 'Secondary']" label="Education Level" hide-details
                  prepend-inner-icon="mdi-book" clearable /></v-col>
              <v-col cols="12"> <v-checkbox label="Check if with ERF" v-model="position.with_erf"></v-checkbox></v-col>
              <v-col cols="7"> <v-select v-model="position.education" :items="education_data" item-value="_id"
                  label="Education" multiple prepend-inner-icon="mdi-school" hide-details clearable /></v-col>
              <v-col cols="5" class="pl-2"> <v-text-field v-model="position.supplemented_units" label="Graduate Units"
                  hide-details /></v-col>
              <v-col cols="12"> <v-checkbox v-model="position.status_of_appointment"
                  label="Check if appointment must be Permanent Teacher" /></v-col>

              <v-col cols="12"> <v-select v-model="position.experience" item-value="_id" :items="experience_data"
                  label="Experience" multiple prepend-inner-icon="mdi-head-cog-outline" hide-details
                  clearable /></v-col>
              <v-col cols="12"> <v-checkbox v-model="position.is_experience"
                  label="Check if the experience accepts  less than the specified minimum." hide-details /></v-col>
              <v-col cols="12"> <v-checkbox v-model="position.or_20_ma_units"
                  label="Check if the number of experience can be substituted by 20 M.A. Units" /></v-col>
              <v-col cols="12"> <v-text-field v-model="position.ma_units" label="M.A Units" /></v-col>
            </v-row>
          </v-col>
          <v-col cols="5" class="pa-4">
            <v-row no-gutters>

              <v-col cols="12"> <v-select v-model="position.rating" :items="rating_data" label="Performance Rating"
                  multiple item-value="_id" prepend-inner-icon="mdi-star" clearable /></v-col>

              <v-col cols="6"> <v-text-field v-model="position.training_hours" label="Training Number of Hours Required"
                  prepend-inner-icon="mdi-human-male-board" /></v-col>
              <v-col cols="6" class="pr-2"> <v-select v-model="position.leadership_points"
                  label="Leadership ands Potential Points" :items="leadership_data" multiple item-value="_id"
                  clearable /></v-col>
              <v-col cols="6" class="pr-2"> <v-select v-model="position.sg" :items="sg_item" label="Salary Grade"
                  item-value="_id" prepend-inner-icon="mdi-cash" clearable /></v-col>
              <v-col cols="6"><v-text-field v-model="position.code" label="Position Code" hide-details="auto"
                  prepend-inner-icon="mdi-codepen" hint="This is for transaction codes for endorsements." /></v-col>


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
            </v-row></v-col>
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



    <v-dialog v-model="view_qs_dialog" width="70%">
      <v-card flat class="mx-5">
        <v-toolbar color="indigo" border>
          <v-list-item class="pl-7">
            Evaluation Criteria for <u> {{ selected_position.title }}</u>
          </v-list-item>

          <v-spacer />
          <v-btn class="mr-0" @click="view_qs_dialog = false" rounded="0" icon="mdi-close" />
        </v-toolbar>
        <v-card-text>

          <table>
            <tbody>
              <tr>
                <td width="30%"> Position </td>

                <td class="text-uppercase text-primary font-weight-bold">
                  {{ selected_position?.title}}
                  <i class="font-weigth-thin text-body-2 text-grey"> {{
                    selected_position.with_erf
                    ? '(with Equivalent Record Form)'
                    : ''}}
                  </i>
                </td>
              </tr>
              <tr>
                <td> Salary Grade</td>
                <td>{{selected_position.sg.salary_grade}} </td>
              </tr>
              <tr>
                <td> Salary Equivalent</td>
                <td>{{selected_position.sg.equivalent.toLocaleString('en-US', {minimumFractionDigits: 2,
                  maximumFractionDigits: 2}) }} </td>
              </tr>
              <tr v-if="selected_position?.education_level">
                <td> Education Level</td>
                <td> {{ selected_position?.education_level }}</td>
              </tr>
              <tr>
                <td> Education</td>
                <td>
                  <p class="text-primary" v-for="educ, index in selected_position?.education" :key="educ"> {{ educ.text
                    }}
                  </p>
                  <i v-if="selected_position?.is_experience">High Degree overrides experience and Master's Degree</i>
                </td>
              </tr>
              <tr v-if="selected_position?.supplemented_units > 0">
                <td> Graduate Units</td>
                <td> {{ selected_position?.supplemented_units }} graduate units in Special Education</td>
              </tr>
              <tr v-if="selected_position?.ma_units > 0">
                <td> M.A. Units</td>
                <td> {{ selected_position?.ma_units }} </td>
              </tr>
              <tr v-if="selected_position?.experience.length">
                <td> Experience</td>
                <td>
                  <p class="text-primary" v-for="exp, index in selected_position?.experience" :key="exp">
                    {{ exp.text }} <span v-if="selected_position.or_20_ma_units">or 20 M.A. Units</span>
                  </p>
                  <i v-if="selected_position?.is_experience"> or if less than 20 years in service :
                    M.A. units + years in service (3 years in public or 5 years in private is equivalent to 1 M.A.
                    unit) =
                    Total curriculum in M.A.
                  </i>
                </td>
              </tr>
              <tr v-if="selected_position?.training_hours > 0">
                <td> Performance Rating</td>
                <td>
                  <p class="text-primary" v-for="rate, index in selected_position?.rating" :key="rate"> {{ rate.title }}
                  </p>
                </td>
              </tr>
              <tr v-if="selected_position?.training_hours > 0">
                <td> Training Hours</td>
                <td class="text-primary"> {{ selected_position?.training_hours }} hours of relevant training initiated,
                  sactioned,
                  approved/recognized by DepEd no used in the immediate previous promotion</td>
              </tr>
              <tr v-if="selected_position?.leadership_points && selected_position?.leadership_points.length > 0">
                <td> Leadership and Potention Points</td>

                <td>
                  <p v-for=" lead, index in selected_position?.leadership_points" :key="lead">{{ lead.title }}</p>
                </td>
              </tr>
              <tr v-if="selected_position.status_of_appointment">
                <td> Appointment Status</td>
                <td>

                  Permarnent teacher
                </td>
              </tr>


              <tr>
                <td width="30%"> Attachments</td>
                <td>
                  <b class="text-uppercase mb-2">APPLICANT </b>
                  <p v-for="attach, index in selected_position.attachment " :key="index"> <v-icon size="20"
                      color="primary">mdi-circle-small</v-icon> {{ attach.title}} <br /></p>

                </td>
              </tr>
              <tr>
                <td> </td>

                <td>
                  <b class="text-uppercase mb-2">Schools
                    Division Office :</b>
                  <p v-for=" attach, index in selected_position.sdo_attachment " :key="index"> <v-icon size="20"
                      color="primary">mdi-circle-small</v-icon> {{ attach.title}} <br /></p>

                </td>

              </tr>
            </tbody>
          </table>
        </v-card-text>
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
      get_attachment(),
      get_leadership(),
      get_rd(),
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
const leaderhip_dialog = ref(false)



// dialog

const position_dialog = ref(false);
const model = ref(true)
const update_position_dialog = ref(false);
// CREATE EDUCATION
const education = ref<Education>({
  title: "",
  high_degree: false,
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
      title: selectedEducation.title,
      high_degree: selectedEducation.high_degree
    }
  });

  if (error) {
    return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  }

  return swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });
}



const experience = ref<Experience>({

  title: "",
  equivalent: 0
})
async function create_experience() {
  const { data, error } = await $rest('sms-experience/create-experience', {
    method: "POST",
    body: { ...experience.value }
  })

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  experience_dialog.value = false
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
  const exp = experience.value;
  const { data, error } = await $rest('sms-experience/update-experience', {
    method: "PUT",
    body: {
      _id: exp._id,
      title: exp.title,
      equivalent: exp.equivalent

    }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  get_experience()
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
  get_rating()
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
  sg_dialog.value = false
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
   if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
}

const update_sg_dialog = ref(false);
const selected_sg = ref<SalaryGrade[]>([]);

function update_salary_grade(sg: SalaryGrade) {
  selected_sg.value = { ...sg };
  update_sg_dialog.value = true;
}
async function update_sg() {
  const sg = selected_sg.value;
  const { data, error } = await $rest('sms-salary-grade/update-sg', {
    method: "PUT",
    body: {
      _id: sg._id,
      salary_grade: sg.salary_grade,
      equivalent: sg.equivalent
    }
  });

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  get_sg()
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
  supplemented_units: 0,
  education_level: "",
  status_of_appointment: false,
  ma_units: 0,
  leadership_points: [],
  experience: [],
  is_experience: false,
  or_20_ma_units: false,
  training_hours: 0,
  rating: [],
  sg: "",
  attachment: [],
  sdo_attachment: [],
  code: ""
});

async function create_position() {
  const { data, error } = await $rest('sms-position/create-position', {
    method: "POST",
    body: { ...position.value }

  })

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  position_dialog.value = false
  get_qs()
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}

async function get_qs() {
  const { data, error } = await $rest('sms-position/get-qs', {
    method: "GET",
  })
  position_data.value = data
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
}

const selected_position = ref<Position[]>([]);

function view_pos(position: Position) {
  selected_position.value = { ...position };
  view_qs_dialog.value = true;
}

async function update_position() {
  const update_position = selected_position.value[0];
  const { data, error } = await $rest('sms-position/update-position', {
    method: "PUT",
    body: {
      _id: update_position._id,
      position: update_position
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
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
}




//  RD INFO
const rd = ref<Rd>({
  rd: {
    first_name: "",
    middle_name: "",
    last_name: "",
    ro_address: "",
    position: "",
  },
  dbm: {
    first_name: "",
    middle_name: "",
    last_name: "",
    government_agency: "",
    region: "",
    dbm_address: "",
    position: "",
  }
})



async function create_rd() {
  const { data, error } = await $rest('sms-rd/create-rd', {
    method: "POST",
    body: { rd: rd.value.rd, dbm: rd.value.dbm }
  });
  if (error) {
    return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  }
  return swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });
}

/**
 * HANDLES FETCHING RD
 */
async function get_rd() {
  const { data, error } = await $rest('sms-rd/get-rd', {
    method: "GET",
  })
  if (data) {
    Object.assign(rd.value, data)
  }
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
}

async function update_rd() {
  const { data, error } = await $rest('sms-rd/update-rd', {
    method: "PUT",
    body: {
      _id: rd.value._id,
      rd: rd.value.rd,
      dbm: rd.value.dbm
    }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

}
const leadership = ref({
  title: "",
});

async function create_leadership_and_potential() {
  const { data, error } = await $rest('sms-leadership/create-leadership-and-potential', {
    method: "POST",
    body: { ...leadership.value }
  });
  if (error) {
    swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  }
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });

}

const leadership_data = ref<Leadership[]>([]);


async function get_leadership() {
  const { data, error } = await $rest('sms-leadership/get-leadership-and-potential', {
    method: "GET",
  });
  if (!error && data) {
    leadership_data.value = data;
  }
  if (error) return swal({ title: data, icon: "No leadership and potential found" })
}

const selected_leadership = ref<Position[]>([]);

function view_leadership(leadership: Leadership) {
  selected_leadership.value = { ...leadership };
  leaderhip_dialog.value = true;
}

async function update_leadership() {
  const update_position = selected_position.value[0];
  const { data, error } = await $rest('sms-position/update-position', {
    method: "PUT",
    body: {
      _id: update_position._id,
      position: update_position
    }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

}











</script>
<style scoped>
.maintenance-item {
  transition: background-color 0.3s ease-in-out;
}

.maintenance-item:hover {
  background-color: #E8EAF6;
}





table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;

}

td,
th {
  border: none;
  padding: 6px;
  font-size: 12px;
  line-height: normal;
  word-break: break-word;
  font-weight: normal;
}

tr,
th {
  font-weight: bold;
}
</style>
