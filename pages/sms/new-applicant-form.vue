<template>
  <v-sheet height="100vh" class="d-flex align-center justify-center">
    <v-sheet v-if="!model" class="h-100 w-100 d-flex align-center justify-center">
      <v-card class=" mx-auto" color="indigo-lighten-5" width="800px">
        <v-card-title class="mt-7 ml-10 text-title">
          <v-icon class="pr-2">mdi-hand-wave</v-icon> WELCOME to DepEd NCR Staffing Modification System
        </v-card-title>
        <v-card-subtitle class="text-grey pl-13 ml-10">Elevate Your Career: A Guide to the Staffing Modification System
        </v-card-subtitle>
        <v-divider class="mt-3"></v-divider>
        <v-card-item class="text-center my-10">
          <v-card-title>
            <v-avatar size="54" color="error">
              <v-icon large icon="mdi-lock-alert"></v-icon>
            </v-avatar>
          </v-card-title>
          <v-card-subtitle class="text-h6 mt-2">
            The reclassification application period is already closed.
          </v-card-subtitle>
        </v-card-item>
      </v-card>


    </v-sheet>
    <v-sheet v-else class="h-100 w-100 d-flex align-center justify-center">

      <v-sheet width="75%" :border="step != 1">
        <v-window v-model="step">

          <v-window-item :value="1">

            <v-card class="w-90 mx-auto" color="indigo-lighten-5">
              <v-card-title class="mt-7 ml-10 text-title">
                <v-icon class="pr-2">mdi-hand-wave</v-icon> WELCOME to DepEd NCR Staffing Modification System
              </v-card-title>
              <v-card-subtitle class="text-grey pl-13 ml-10">Elevate Your Career: A Guide to the Staffing Modification
                System
              </v-card-subtitle>
              <v-divider class="my-2" />

              <v-card-text class="pa-5" style="height:70vh; justify-content: center; align-items: center;">

                <v-row dense v-if="!position_form" class="h-100 w-100 d-flex align-center justify-center">
                  <v-col cols="6" class="px-15">


                    <v-img src="/stronger.png" height="17vh" cover />
                    <h4 class="text-grey font-weight-regular mt-4 mb-2"> Click the list below and select the position
                      you wish to apply for. Click Apply Now to begin the application process.</h4>
                    <v-select v-model="applicant.qualification.position" label="Select Position" variant="solo"
                      hide-details item-value="_id" :items="position_data" dense />

                    <v-btn class="mt-2" :disabled="applicant.qualification.position == ''" color="success" rounded="xl"
                      @click="apply_dialog = true">APPLY NOW</v-btn>

                  </v-col>
                  <v-col cols="5">

                    <v-card class="pa-5" color="primary" variant="tonal" rounded="lg">
                      <v-card-text>
                        The Staffing Modification System automates reclassification requests for school
                        personnel
                        (T2, T3, MT, HT, and Principal) from application to approval, providing real-time status
                        updates. It
                        streamlines the process, eliminates paperwork, and supports remote work by allowing access
                        to
                        voluminous
                        supporting documents.
                      </v-card-text>



                    </v-card>
                    <v-card class="pa-5 mt-5" color="primary" variant="tonal" rounded="lg">
                      <v-card-text>
                        The Staffing Modification System automates reclassification requests for school
                        personnel
                        (T2, T3, MT, HT, and Principal) from application to approval, providing real-time status
                        updates. It
                        streamlines the process, eliminates paperwork, and supports remote work by allowing access
                        to
                        voluminous
                        supporting documents.
                      </v-card-text>
                    </v-card>
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
                        <v-list-item-subtitle> <b>Instruction :</b> Click each of the standard below and select or enter
                          your appropriate
                          qualification. Click <b>"cancel"</b> to end the application
                          process.</v-list-item-subtitle>
                      </v-list-item>

                      <v-row dense>
                        <v-col cols="12" v-if="selected_qs">
                          {{ qs }}
                          <v-text-field :value="qs.title" variant="underlined" hide-details readonly />
                        </v-col>
                        <v-col cols="12" v-if="applicant.qualification.position && !selected_qs?.education_level == ''">
                          <v-select v-model="applicant.qualification.educ_level" :items="['Elementary', 'Secondary']"
                            label="Education Level" variant="solo" hide-details prepend-inner-icon="mdi-book" />
                        </v-col>
                        <v-col cols="12" v-if="applicant.qualification.position">
                          <v-select v-model="applicant.qualification.education" :items="education_data"
                            label="Education" variant="solo" hide-details multiple item-value="_id"
                            prepend-inner-icon="mdi-school" />
                        </v-col>
                        <v-col cols="12" v-if="selected_qs?.experience.length">
                          <v-select v-model="applicant.qualification.experience" :items="experience_data"
                            label="Experience" variant="solo" hide-details multiple item-value="_id"
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

                        <v-col cols="12" v-if="qs">
                          <v-text-field v-model="applicant.qualification.sg" variant="solo" hide-details
                            :value="qs.sg.salary_grade" />
                          <v-text-field v-model="applicant.qualification.sg_equivalent" variant="solo" hide-details
                            :value="qs.sg.equivalent" />
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="mx-2">
                      <v-row dense>
                        <v-col cols="6"> <v-btn block color="error" variant="tonal"
                            @click="cancel_dialog = true">CANCEL</v-btn></v-col>
                        <v-col cols="6"> <v-btn block color="success" variant="tonal"
                            @click="next_window">SUBMIT</v-btn></v-col>
                      </v-row>

                    </v-card-actions>
                  </v-col>
                  <v-col cols="6" v-if="selected_qs">
                    <v-card rounded="xl" class="ma-5">
                      <v-card-text class="px-10 overflow-y-auto" style="height: 60vh">
                        <v-list-item class="pl-2" density="compact" color="blue-darken-4">

                          <v-list-item-title class="text-primary text-center font-weight-bold">QUALIFICATION
                            STANDARD</v-list-item-title>
                          <v-divider class="my-2" />
                          <v-list-item-subtitle> Here is the defined Qualification Standard of the<b> Department of
                              Education National Capital Region </b><i>( DepEd NCR)</i> for the
                            selected
                            position
                            which you must meet. </v-list-item-subtitle>
                        </v-list-item>

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
                  <v-text-field v-model="applicant.designation.district" label="District" hide-details />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-select v-model="applicant.designation.school"
                    :items="get_sdo_school(applicant.designation.division)" label="School" hide-details
                    item-value="_id" />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-text-field v-model="applicant.designation.current_position" label="Current Position" hide-details
                    item-value="_id" />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                  <v-select v-model="applicant.designation.current_sg" :items="sg_item" label="Current Salary Grade"
                    hide-details item-value="_id" />
                </v-col>

                <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1" v-if="qs.with_erf">
                  <v-select v-model="applicant.designation.ipcrf_rating" label="IPCRF rating" hide-details
                    :items="['Satisfactory', 'Very Satisfactory', 'Outstanding', 'Unsatifactory', 'Poor']" />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="qs?.with_erf">
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
          <v-window-item :value="3" v-if="qs?.with_erf">
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
                      <v-col cols="5"> <v-text-field label="Equivalent"
                          v-model="applicant.equivalent_unit.yt_equivalent" hide-details density="compact" type="number"
                          readonly />
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
                      v-for="( attachment_title, index )  in selected_qs?.attachment">
                      <v-file-input variant="underlined" :label="attachment_title" :key="index"
                        @update:model-value="shet_so_hard($event, attachment_title)" />
                    </v-col>
                  </v-row>
                </v-card-text>

              </v-card-text>
            </v-sheet>

          </v-window-item>
        </v-window>
        <v-divider />
        <v-card-actions>
          <v-btn v-if="step > 1" variant="text" @click="back"> Back </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step === 2 || step === 3" color="primary" variant="flat" @click="next_window">
            NEXT
          </v-btn>
          <v-btn @click="principal_dialog = true" v-if="step === 4 && !applicant._id" color="success" variant="flat">
            SUBMIT
          </v-btn>
          <v-btn v-if="step === 4 && applicant?._id" @click="update_dialog = true" color="primary" variant="flat">
            UPDATE</v-btn>
        </v-card-actions>

      </v-sheet>

      <commons-dialog max-width="35%" v-model="service_record_dialog" :icon="'mdi-face-agent'"
        :title="'Service Record Form'" :subtitle="'Employment History'" @submit="add_service_record"
        :submitText="'Add'">
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
            <v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12"> <v-text-field
                v-model="education_attainment.board_exam" label="Board Examination" hide-details /></v-col>
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


      <commons-dialog max-width="35%" v-model="apply_dialog" :icon="'mdi-information'" :title="'Confirmation!'"
        @submit="position_form_cond" :submitText="'Confirm'">
        <v-card-text v-if="selected_qs" class="ma-4">
          You are applying for the reclassification of the <b class="text-primary">{{ qs.title
            }}</b>.
          Click <b class="text-primary">cancel</b> to
          select a different position.
        </v-card-text>
      </commons-dialog>

      <commons-dialog max-width="35%" v-model="next_dialog" :icon="'mdi-information'" :title="'Confirmation!'"
        @submit="position_form_cond" :submitText="'SUBMIT'">
        <v-card-text class="my
      -2">
          <v-row dense>
            <v-col cols="12"> Are you sure you want to proceed?</v-col>
            <v-col cols="12"> <v-text-field variant="underlined" value="Selected position" hide-details /></v-col>
          </v-row>
        </v-card-text>
      </commons-dialog>

      <commons-dialog max-width="35%" v-model="confirmation_dialog" :icon="'mdi-information'" :title="'Confirmation!'"
        @submit="next_to_step2" :submitText="'Ok'">
        <v-card-text v-if="selected_qs" class="ma-4">
          You are qualified for your applied position <b class="text-primary">{{ qs.title }}</b>. Clicking <b
            class="text-primary">cancel</b>
          will terminate the
          entire
          process.
        </v-card-text>
      </commons-dialog>

      <commons-dialog max-width="35%" v-model="cancel_dialog" :icon="'mdi-information'" :title="'Confirmation!'"
        :submitText="'Ok'">
        <v-card-text v-if="selected_qs" class="ma-4 text-center">
          Are you sure you want to end applying for this position ?
        </v-card-text>
      </commons-dialog>


      <commons-dialog max-width="35%" v-model="principal_dialog" :icon="'mdi-information'"
        :title="'Principal Email Address is required!'" :submitText="'Submit'" @submit="create_application">
        <v-card-text class="ma-4 ">


          Please enter the email address of your school principal to validate the authenticity of the attached
          document/s.

          <v-text-field v-model="applicant.principal_email" label="Enter Principal's Email Address" />
        </v-card-text>
      </commons-dialog>
      <commons-dialog max-width="35%" v-model="update_dialog" :icon="'mdi-information'"
        :title="'Principal Email Address is required!'" :submitText="'Submit'" @submit="update_applicant">
        <v-card-text class="ma-4 ">


          Please enter the email address of your school principal to validate the authenticity of the attached
          document/s.

          <v-text-field v-model="applicant.principal_email" label="Enter Principal's Email Address" />
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
const confirmation_dialog = ref(false)
const cancel_dialog = ref(false)
const principal_dialog = ref(false)
const update_dialog = ref(false)


const position_form = ref(false)
const applicant = ref({
  qualification: {
    position: "",
    educ_level: "",
    education: [],
    experience: [],
    training: 0,
    per_rating: "",
    sg: 0,
    sg_equivalent: 0,
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
    // school: "",
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
  principal_email: "",
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

    confirmation_dialog.value = true

  }
}

function next_to_step2() {
  step.value++
  confirmation_dialog.value = false
  if (step.value === 1) {
    confirmation_dialog.value = false
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

const hide_windows = ref(false)
async function update_applicant() {
  get_applicant_details()
  hide_windows.value = false
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
