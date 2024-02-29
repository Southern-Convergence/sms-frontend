<template>
  <v-sheet height="100vh" class="d-flex align-center justify-center">
    <v-sheet class="h-100 w-100 d-flex align-center justify-center">
      <v-sheet width="75%" :border="step != 1">
        <v-window v-model="step">
          <v-window-item :value="1">

            <div class="h-100 w-100 d-flex align-center justify-center">
              <v-card class="w-45" color="indigo-lighten-5">
                <v-card-title class="mt-3 text-title">
                  WELCOME to DepEd NCR Reclassification System
                </v-card-title>
                <v-card-subtitle class="text-grey">Elevate Your Career: A Guide to the Reclassification System
                </v-card-subtitle>
                <v-divider class="mt-3"></v-divider>

                <v-card-text class="px-4 overflow-y-auto" style="height: 50vh">
                  <v-list-item class="pl-2" density="compact">
                    <template v-slot:prepend>
                      <v-avatar class="mr-1" variant="text">
                        <v-icon color="amber"> mdi-seal </v-icon>
                      </v-avatar>
                    </template>
                    <v-list-item-title>Individual Qualification</v-list-item-title>
                  </v-list-item>
                  <v-row no-gutters>
                    <v-col cols="12" class="pa-2">
                      <v-select :items="position_data" v-model="applicant.qualification.position" label="Select Position"
                        variant="solo" hide-details item-value="_id" prepend-inner-icon="mdi-account-hard-hat" />
                    </v-col>
                    <v-col cols="12" class="pa-2" v-if="selected_qs?.education_level != ''">
                      <v-select v-model="applicant.qualification.educ_level" :items="['Elementary', 'Secondary']"
                        label="Education Level" variant="solo" hide-details prepend-inner-icon="mdi-book" />
                    </v-col>
                    <v-col cols="12" class="pa-2">
                      <v-select v-model="applicant.qualification.education" :items="education_data" label="Education"
                        variant="solo" hide-details multiple item-value="_id" prepend-inner-icon="mdi-school" />
                    </v-col>
                    <v-col cols="12" class="pa-2" v-if="selected_qs?.experience.length">
                      <v-select v-model="applicant.qualification.experience" :items="experience_data" label="Experience"
                        variant="solo" hide-details multiple item-value="_id" prepend-inner-icon="mdi-head-cog-outline" />
                    </v-col>
                    <v-col cols="12" class="pa-2" v-if="selected_qs?.training_hours != 0">
                      <v-text-field v-model="applicant.qualification.training" label="Enter total training hours"
                        variant="solo" hide-details type="number" item-value="_id"
                        prepend-inner-icon="mdi-human-male-board" />
                    </v-col>
                    <v-col cols="12" class="pa-2" v-if="selected_qs?.rating.length">
                      <v-select v-model="applicant.qualification.per_rating" :items="rating_data"
                        label="Performance Rating" variant="solo" hide-details item-value="_id"
                        prepend-inner-icon="mdi-star" />
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-row no-gutters justify="center">
                    <v-col cols="5"><v-btn block color="error" variant="text" rounded="xl">CLEAR</v-btn></v-col>
                    <v-col cols="5"><v-btn @click="next_window" block class="gradient-background text-white" rounded="xl"
                        variant="outlined">SUBMIT</v-btn></v-col>
                  </v-row>
                </v-card-actions>
              </v-card>

            </div>

            <!-- <v-card class="w-50 pa-10 gradient-background" height="70vh">
                <v-card-title class="text-h5 mt-5 text-white"> WELCOME to
                  DepEd NCR Reclassification System
                </v-card-title>
                <v-card-subtitle class="text-grey">Elevate Your Career: A Guide to the Reclassification System
                </v-card-subtitle>

                <v-card-text>
                  
                  <v-list-item class="pl-2" density="compact">
                    <template v-slot:prepend>
                      <v-avatar class="mr-1" variant="text">
                        <v-icon color="amber"> mdi-seal </v-icon>
                      </v-avatar>
                    </template>
                    <v-list-item-title class="text-white">Individual Qualification</v-list-item-title>
                  </v-list-item>
                  <v-row no-gutters>
                    <v-col cols="12" class="pa-2 ">
                      <v-select :items="position_data" v-model="applicant.qualification.position" label="Select Position"
                        variant="solo" hide-details item-value="_id" prepend-inner-icon="mdi-account-hard-hat" />
                    </v-col>
                    <v-col cols="12" class="pa-2" v-if="selected_qs?.education_level != ''">
                      <v-select v-model="applicant.qualification.educ_level" :items="['Elementary', 'Secondary']"
                        label="Education Level" variant="solo" hide-details prepend-inner-icon="mdi-book" />
                    </v-col>
                    <v-col cols="12" class="pa-2">
                      <v-select v-model="applicant.qualification.education" :items="education_data" label="Education"
                        variant="solo" hide-details multiple item-value="_id" prepend-inner-icon="mdi-school" />
                    </v-col>
                    <v-col cols="12" class="pa-2" v-if="selected_qs?.experience.length">
                      <v-select v-model="applicant.qualification.experience" :items="experience_data" label="Experience"
                        variant="solo" hide-details multiple item-value="_id" prepend-inner-icon="mdi-head-cog-outline" />
                    </v-col>
                    <v-col cols="12" class="pa-2" v-if="selected_qs?.training_hours != 0">
                      <v-text-field v-model="applicant.qualification.training" label="Enter total training hours"
                        variant="solo" hide-details type="number" item-value="_id"
                        prepend-inner-icon="mdi-human-male-board" />
                    </v-col>
                    <v-col cols="12" class="pa-2" v-if="selected_qs?.rating.length">
                      <v-select v-model="applicant.qualification.per_rating" :items="rating_data"
                        label="Performance Rating" variant="solo" hide-details item-value="_id"
                        prepend-inner-icon="mdi-star" />
                    </v-col>
                  </v-row>
                  <v-row class="mt-15" no-gutters justify="center">
                    <v-col cols="5" ><v-btn block color="white" variant="outlined"
                        rounded="xl">CLEAR</v-btn></v-col>
                    <v-col cols="5" class="pa-3"><v-btn @click="next_window" block color="blue-darken-4"
                        rounded="xl">SUBMIT</v-btn></v-col>
                  </v-row> 
                </v-card-text>


              </v-card> -->
            <!-- <v-sheet class="w-50  d-flex align-center " height="70vh" color="#E3F2FD">
                <div class="mx-auto w-100 px-10 ">
                  <v-sheet v-if="selected_qs">

                    <v-list lines="one" bg-color="#E3F2FD">
                      <v-list-item class="pl-2" density="compact" color="blue-darken-4">
                        <template v-slot:prepend>
                          <v-avatar class="mr-1" variant="text">
                            <v-icon color="amber"> mdi-certificate </v-icon>
                          </v-avatar>
                        </template>
                        <v-list-item-title>Qualification Standards</v-list-item-title>

                      </v-list-item>
                      <v-sheet class="overflow-y-auto" color="#E3F2FD">
                        <v-list-item class="ma-2" color="white" variant="tonal" rounded="rounded">
                          <template v-slot:prepend>
                            <v-icon color="primary" icon="mdi-account-hard-hat"></v-icon>
                          </template>
                          <b>{{ basta.title }} <span class="font-weight-thin"> ({{ basta?.education_level
                          }})</span></b>
                        </v-list-item>

                        <v-list-item class="ma-2" color="white" variant="tonal" rounded="rounded"
                          v-if="basta.education.length">
                          <template v-slot:prepend>
                            <v-icon color="primary" icon="mdi-school"></v-icon>
                          </template>
                          <v-list-item-title>Education :</v-list-item-title>
                          <v-list-item-subtitle v-for="(education, index) in basta.education" :key="index">{{
                            education.title }}</v-list-item-subtitle>
                        </v-list-item>

                        <v-list-item class="ma-2" color="white" variant="tonal" rounded="rounded"
                          v-if="basta.experience.length">
                          <template v-slot:prepend>
                            <v-icon color="primary" icon="mdi-head-cog-outline"></v-icon>
                          </template>
                          <v-list-item-title>Experience :</v-list-item-title>
                          <v-list-item-subtitle v-for="(experience, index) in basta.experience" :key="index">{{
                            experience.title }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item class="ma-2" color="white" variant="tonal" rounded="rounded"
                          v-if="basta.rating.length">
                          <template v-slot:prepend>
                            <v-icon color="primary" icon="mdi-human-male-board"></v-icon>
                          </template>
                          <v-list-item-title>Performance Rating :</v-list-item-title>
                          <v-list-item-subtitle v-for="(rating, index) in basta.rating" :key="index">{{
                            rating.title }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item class="ma-2" color="white" variant="tonal" rounded="rounded" title=" Training Hours:"
                          v-if="basta.training_hours != 0">
                          <template v-slot:prepend>
                            <v-icon color="primary" icon="mdi-star"></v-icon>
                          </template>
                          <v-list-item-subtitle>{{ basta.training_hours }} </v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item class="ma-2" color="white" variant="tonal" rounded="rounded" v-if="basta.sg"
                          title="Salary Grade:">
                          <template v-slot:prepend>
                            <v-icon color="primary" icon="mdi-cash"></v-icon>
                          </template>
                          <v-list-item-subtitle>{{ basta.sg.salary_grade }} </v-list-item-subtitle>
                        </v-list-item>
                      </v-sheet>
                    </v-list>
                  </v-sheet>

                  <v-sheet v-else height="43vh" class="d-flex align-center justify-center" color="#E3F2FD">
                    <v-row no-gutters justify="center">

                      <v-col cols=" 12" class="text-center">
                        <v-icon size="64" style="color: red;">mdi-alert-circle-outline</v-icon>
                      </v-col>
                      <v-col cols="12" class="text-center font-weight-bold">NO
                        SELECTED POSITION</v-col>
                    </v-row>
                  </v-sheet>


                </div>
              </v-sheet> -->


            <!-- <v-sheet height="70vh">
              <v-toolbar class="py-1" color="primary" border>
                <v-list-item class="pl-2" density="compact">
                  <template v-slot:prepend>
                    <v-avatar class="mr-1" variant="text">
                      <v-icon dark>mdi-file-document</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title class="text-h5"> Application Form </v-list-item-title>
                  <v-list-item-subtitle class="text-caption"> Position Requirements and Criteria
                  </v-list-item-subtitle>
                </v-list-item>
              </v-toolbar>
              <v-card-text>
                <v-card-title class="text-h5 text-primary mt-5"> WELCOME to
                  <strong>DepEd NCR Reclassification System</strong>
                </v-card-title>
                <v-card-subtitle>Elevate Your Career: A Guide to the Reclassification System </v-card-subtitle>
                <v-row dense>
                  <v-col cols="12" xl="6" lg="6" md="12" sm="12" class="pa-4">
                    <v-card>
                      <v-toolbar color="grey-ligthen-4" border>
                        <v-list-item class="pl-2" density="compact">
                          <template v-slot:prepend>
                            <v-avatar class="mr-1" variant="text">
                              <v-icon color="primary"> mdi-seal </v-icon>
                            </v-avatar>
                          </template>
                  
            </v-list-item>
            </v-toolbar>
            <v-sheet height="43vh" class="overflow-y-auto pa-4">
              <v-row no-gutters>
                <v-col cols="12" class="pa-2 ">
                  <v-select :items="position_data" v-model="applicant.qualification.position" label="Select Position"
                    hide-details item-value="_id" prepend-inner-icon="mdi-account-hard-hat" />
                </v-col>
                <v-col cols="12" class="pa-2">
                  <v-select v-model="applicant.qualification.educ_level" :items="['Elementary', 'Secondary']"
                    label="Education Level" hide-details />
                </v-col>
                <v-col cols="12" class="pa-2">
                  <v-select v-model="applicant.qualification.education" :items="education_data" label="Education"
                    hide-details multiple item-value="_id" prepend-inner-icon="mdi-school" />
                </v-col>
                <v-col cols="12" class="pa-2">
                  <v-select v-model="applicant.qualification.experience" :items="experience_data" label="Experience"
                    hide-details multiple item-value="_id" prepend-inner-icon="mdi-head-cog-outline" />
                </v-col>
                <v-col cols="12" class="pa-2">

                  <v-text-field v-model="applicant.qualification.training" label="Enter total training hours" hide-details
                    type="number" item-value="_id" prepend-inner-icon="mdi-human-male-board" />
                </v-col>
                <v-col cols="12" class="pa-2">
                  <v-select v-model="applicant.qualification.per_rating" :items="rating_data" label="Performance Rating"
                    hide-details item-value="_id" prepend-inner-icon="mdi-school" />
                </v-col>

              </v-row>
            </v-sheet>
            </v-card>


            </v-col>
            <v-col cols="12" xl="6" lg="6" md="12" sm="12" class="pa-4">
              <v-card>
                <v-toolbar color="grey-ligthen-4" border>
                  <v-list-item class="pl-2" density="compact">
                    <template v-slot:prepend>
                      <v-avatar class="mr-1" variant="text">
                        <v-icon color="primary"> mdi-certificate </v-icon>
                      </v-avatar>
                    </template>
                    <v-list-item-title>Qualification Standards</v-list-item-title>

                  </v-list-item>
                </v-toolbar>
                <v-sheet height="43vh" class="overflow-y-auto" v-if="selected_qs">
                  <v-list lines="one" density="compact">
                    <v-list-item>
                      Position : <b>{{ selected_qs.title }} </b>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Education :</v-list-item-title>
                      <v-list-item-subtitle v-for="(education, index) in selected_qs.education" :key="index">{{
                        education.title }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Experience :</v-list-item-title>
                      <v-list-item-subtitle v-for="(experience, index) in selected_qs.experience" :key="index">{{
                        experience.title }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Performance Rating :</v-list-item-title>
                      <v-list-item-subtitle v-for="(rating, index) in selected_qs.rating" :key="index">{{
                        rating.title }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item title="Training Hours:">
                      <v-list-item-subtitle>{{ selected_qs.training_hours }} </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item v-if="selected_qs.sg" title="Salary Grade:">
                      <v-list-item-subtitle>{{ selected_qs.sg.salary_grade }} </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-sheet>
                <v-sheet v-else height="43vh" class="d-flex align-center justify-center">
                  <v-row no-gutters>
                    <v-col cols="12" class="text-center">
                      <v-icon size="64" style="color: red;">mdi-alert-circle-outline</v-icon>
                    </v-col>
                    <v-col cols="12" class="text-center font-weight-bold">NO
                      SELECTED POSITION</v-col>
                  </v-row>
                </v-sheet>


              </v-card>

            </v-col>
            </v-row>
            </v-card-text>
      </v-sheet> -->
          </v-window-item>
          <v-window-item :value="2">
            <v-card-text>
              <v-row dense>

                <v-col cols="12"> <v-icon class="mr-2 pb-2 " size="26" color="primary">mdi-account</v-icon>
                  Personal
                  Information </v-col>

                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.personal_information.last_name" label="Surname" hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.personal_information.first_name" label="Given Name" hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.personal_information.middle_name" label="Middle Name" hide-details />
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
                  <v-text-field v-model="applicant.designation.employee_no" label="Employee No" hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.designation.plantilla_no" label="Plantilla No" hide-details />
                </v-col>

                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.designation.item_no" label="Item No" hide-details />
                </v-col>

                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-select v-model="applicant.designation.division" label="Division" item-value="_id" :items="sdo_data"
                    hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-select v-model="applicant.designation.school" :items="get_sdo_school(applicant.designation.division)"
                    label="School" hide-details item-value="_id" />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.designation.current_position" label="Current Position" hide-details
                    item-value="_id" />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-select v-model="applicant.designation.current_sg" :items="sg_item" label="Current Salary Grade"
                    hide-details item-value="_id" />
                </v-col>

                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-select v-model="applicant.designation.ipcrf_rating" label="IPCRF rating" hide-details
                    :items="['Satisfactory', 'Very Satisfactory', 'Outstanding', 'Unsatifactory', 'Poor']" />
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
              <v-row dense class="mx-4">
                <v-col cols="12"> Rergistrar details for Transcript of Records : </v-col>
                <v-col cols="4">
                  <v-text-field v-model="applicant.transcript.registrar_name" label="Enter Register Complete Name"
                    density="compact" hide-details="auto" />

                </v-col>
                <v-col cols="4"> <v-text-field v-model="applicant.transcript.registrar_email" :rules="email_rules"
                    label="Email Address" density="compact" hide-details="auto" />
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="applicant.transcript.registrar_no" label="Contact Number" prefix="+63"
                    mask="0 000 000 000" maxlength="10" density="compact" hide-details="auto"
                    hint="Registrar Number is required" type="tel" /></v-col>
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

                      <v-col cols="5"> <v-text-field v-model="applicant.equivalent_unit.public_years_teaching"
                          label="Public Only" hide-details density="compact" type="number" readonly /></v-col>
                      <v-col cols="5"> <v-text-field label="Equivalent" v-model="applicant.equivalent_unit.yt_equivalent"
                          hide-details density="compact" type="number" readonly />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row dense>
                      <v-col cols="12" class="text-caption text-grey-darken-1">
                        B. Degree to Equivalent
                      </v-col>
                      <v-col cols="5"> <v-text-field label="Public Schools" hide-details density="compact" type="number"
                          readonly /></v-col>
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
                    <v-text-field label="Public Schools" v-model="applicant.equivalent_unit.public_years_teaching"
                      hide-details type="number" readonly /></v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="12" class="px-2"> <v-text-field label="Private School"
                      type="number" /></v-col>



                </v-row>


              </v-card-text>


            </v-card-text>
          </v-window-item>
          <v-window-item :value="4">
            <v-sheet min-height="50vh">
              <v-card-text>
                <v-card-title class="text-subtitle-2">
                  III. Attachements

                </v-card-title>
                <v-alert class="mx-5" density="compact" type="warning" closable variant="tonal" border="start"
                  text="Ensure  that all uploaded documents adhere to the prescribed standards and are
                  valid for processing. Your attention to document accuracy is crucial for a smooth application process."></v-alert>
                <v-card-text>
                  <v-row no-gutters>


                    <v-col cols="12" xl="6" lg="6" md="6" sm="12"
                      v-for="( attachment_title, index )  in  selected_qs?.attachment "> <v-file-input
                        variant="underlined" :label="attachment_title" :key="index"
                        @update:model-value="shet_so_hard($event, attachment_title)" />
                    </v-col>
                  </v-row>
                </v-card-text>

              </v-card-text>
            </v-sheet>

          </v-window-item>
        </v-window>
        <v-divider v-if="!step === 1"></v-divider>
        <v-card-actions>
          <v-btn v-if="step > 1" variant="text" @click="step--"> Back </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step === 2 || step === 3" color="primary" variant="flat" @click="next_window">
            Next
          </v-btn>
          <v-btn @click="create_application" v-if="step === 4" color="success" variant="flat">
            SUBMIT
          </v-btn>
        </v-card-actions>

      </v-sheet>

      <commons-dialog max-width="35%" v-model="service_record_dialog" :icon="'mdi-face-agent'"
        :title="'Service Record Form'" :subtitle="'Employment History'" @submit="add_service_record" :submitText="'Add'">
        <v-card-text class="my-2">
          <v-form ref="service_record_form">
            <v-row dense>
              <v-col cols="12"> <v-text-field v-model="service_record.designation" label="Position/Designation"
                  hide-details /></v-col>
              <v-col cols="6"> <v-text-field v-model="service_record.from" label="From" hide-details
                  type="date" /></v-col>
              <v-col cols="6"> <v-text-field v-model="service_record.to" label="To" hide-details type="date" /></v-col>

            </v-row>
          </v-form>
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
import useAuth from "~/store/auth";
const user = useAuth().user;
const cfg = useRuntimeConfig();
const { $rest } = useNuxtApp();
const step = ref(1)

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

    ]
  ).catch(() => swal({
    title: "Error",
    text: "Something went wrong while fetching data",
    icon: "error",
    buttons: { ok: false, cancel: false }
  }))
})

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
  request_log: []
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
  const selected_position: { _id: string; education: string[] } | undefined = position_data.value.filter((v: any) => v._id == applicant.value.qualification.position)[0];
  if (!selected_position) return swal({ title: "Oops!", text: "Select position", icon: "info" });
  const applicant_education = applicant.value.qualification.education;
  if (!applicant_education) return swal({ title: "Oops!", text: "Experience is required", icon: "info" });
  const applicant_experience = applicant.value.qualification.experience;
  if (!applicant_experience) return swal({ title: "Oops!", text: "Experience is required", icon: "info" });
  const applicant_rating = applicant.value.qualification.per_rating;
  if (position_data.value.rating?.length && !applicant_rating) return swal({ title: "Oops!", text: "Rating is required", icon: "info" });
  const applicant_training = applicant.value.qualification.training;



  const is_yes: boolean[] = [];

  is_yes.push(education_matching(applicant_education, selected_position.education));
  is_yes.push(experience_matching(applicant_experience, selected_position.experience));
  is_yes.push(rating_matching(applicant_rating, selected_position.rating));
  is_yes.push(training_matching(applicant_training, selected_position.training_hours));
  if (is_yes.includes(false)) return swal({ title: "ALERT!", text: "Sorry, you are not qualified for this position.", icon: "info" })
  console.log(is_yes);

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

function rating_matching(applicant_rating: string, required_rating: string) {
  if (!required_rating) return true;
  return applicant_rating == required_rating;
};


function training_matching(applicant_training: number, required_training: number) {
  applicant_training = parseFloat(applicant_training.toString());
  required_training = parseFloat(required_training.toString());
  return applicant_training >= required_training;
}


// CREATE 
const form = ref(true)
async function create_application() {
  const { attachments } = applicant.value;
  const temp = new FormData();

  Object.entries(attachments).forEach(([title, file]) => {
    file.forEach((v: any) => {
      const key = `${title}-${v.name}`
      temp.append(key, v)
    });
  })

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

const basta = computed(() => {
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
  font-size: 1.5rem;
  color: #2b0cc8;
  letter-spacing: 1px;
  margin-bottom: 10px;

}
</style>
