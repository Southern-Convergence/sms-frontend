<template>
  <v-sheet height="100vh" class="d-flex align-center justify-center ">
    <v-sheet v-if="!model" class="h-100 w-100 d-flex align-center justify-center">
      <v-card color="indigo-lighten-5">
        <v-card-title class="mt-7 ml-10 text-title">
          <v-icon color="amber" class="pr-2">mdi-hand-wave</v-icon>
          WELCOME to DepEd NCR Staffing Modification System
        </v-card-title>
        <v-card-subtitle class="text-grey pl-13 ml-10">Elevate Your Career: A Guide to the Staffing Modification
          System
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
    <v-sheet v-else class="w-100 d-flex align-center justify-center">
      <v-sheet width="88%" :border="step != 1">
        <v-form ref="applicant_form">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card v-if="applicant.status === 'Disapproved'" border="md" class="pa-6 text-white mx-auto"
                color="primary" max-width="400">
                <h4 class="text-h5 font-weight-bold mb-4">Returned Application</h4>
                <v-btn @click="step++" class="text-none text-black mb-4" color="red-accent-2" size="x-large"
                  variant="flat" block>
                  NEXT
                </v-btn>
              </v-card>
              <v-card v-else color="indigo-lighten-5">
                <v-card-title class="pt-5  text-title">
                  <v-icon class="pr-2" color="amber" size="46">mdi-hand-wave</v-icon> WELCOME to DepEd NCR Staffing
                  Modification
                  System
                </v-card-title>
                <v-card-subtitle class="pl-13 ml-5 texth-h6">Elevate Your Career:<b> A Guide to the Staffing
                    Modification
                    System</b>
                </v-card-subtitle>
                <v-divider class="my-2" />
                <v-card-text class="pa-8" style="height:78vh; justify-content: center; align-items: center;">
                  <v-row dense v-if="!position_form" class="h-100 w-100 d-flex align-center justify-center">
                    <v-col cols="5">
                      <v-card-text class="text-indigo"
                        style="font-family: Century Gothic; font-size:25px ; line-height: 30px;text-align: justify">
                        The Staffing Modification System automates reclassification requests for school
                        personnel
                        (T2, T3, MT, HT, and Principal) from application to approval, providing real-time status
                        updates. It
                        streamlines the process, eliminates paperwork, and supports remote work by allowing access
                        to
                        voluminous
                        supporting documents.
                      </v-card-text>

                    </v-col>
                    <v-col cols="6" class="px-15">
                      <v-img src="/stronger.png" height="20vh" cover />
                      <h3> Click the list below and select the
                        position
                        you wish to apply for. Click <br /> <b class="text-blue text-uppercase pr-2">Apply Now</b> to
                        begin
                        the application
                        process.
                      </h3>
                      <v-select class="mt-3" v-model="applicant.qualification.position" label="Select Position"
                        variant="solo" hide-details item-value="_id" :items="position_items" dense />
                      <v-btn class="mt-2" :disabled="applicant.qualification.position == ''" color="success"
                        rounded="xl" @click="apply_dialog = true">APPLY NOW</v-btn>
                    </v-col>
                  </v-row>
                  <v-row v-if="position_form">
                    <v-col cols="6" v-if="selected_qs">
                      <v-card rounded="xl" class="pa-5" variant="outlined">
                        <v-list-item class="mx-0 px-0 mb-2" density="compact">
                          <template v-slot:prepend>
                            <v-avatar class="mr-1" variant="text">
                              <v-icon color="blue" size="32"> mdi-book-open-page-variant </v-icon>
                            </v-avatar>
                          </template>
                          <v-list-item-title
                            class="text-subtitle-1 text-primary font-weight-bold text-uppercase">QUALIFICATION
                            STANDARD</v-list-item-title>
                          <v-list-item-subtitle> Here are the defined Qualification Standard of
                            the<b> Department of
                              Education National Capital Region </b><i>( DepEd NCR)</i> for the
                            selected
                            position
                            which you must meet.</v-list-item-subtitle>
                        </v-list-item>

                        <v-card-text class="overflow-y-auto mt-0 pt-1" style="height: 55vh">


                          <v-list-item class="mb-2" color=" white" rounded="rounded">
                            <template v-slot:prepend>
                              <v-icon color="primary" icon="mdi-account-hard-hat"></v-icon>
                            </template>
                            <v-list-item-title> Position : <b>{{ qs.title }} <i class="font-weight-thin"
                                  v-if="qs?.education_level"> ({{
                                    qs?.education_level
                                  }})</i></b></v-list-item-title>

                          </v-list-item>
                          <v-list-item class="mb-2" color=" white" rounded="rounded"
                            v-if="qs.status_of_appointement === true">
                            <template v-slot:prepend>
                              <v-icon color="primary" icon="mdi-school"></v-icon>
                            </template>
                            <v-list-item-title>Appointment :</v-list-item-title>
                            <v-list-item-subtitle>Must be permanent teacher.</v-list-item-subtitle>
                          </v-list-item>
                          <v-list-item class="mb-2" color="white" rounded="rounded" v-if="qs.education.length">
                            <template v-slot:prepend>
                              <v-icon color="primary" icon="mdi-school"></v-icon>
                            </template>
                            <v-list-item-title>Education :</v-list-item-title>
                            <v-list-item-subtitle v-for="(education, index) in qs.education" :key="index">{{
                              education.title }}
                            </v-list-item-subtitle>

                            {{ qs.high_degree }}
                            <v-list-item-subtitle class="text-primary font-weight-bold" v-if="qs.high_degree === true">
                              High Degree
                              overrides
                              experience and Master's Degree</v-list-item-subtitle>
                          </v-list-item>

                          <v-list-item class="mb-2" color="white" rounded="rounded" title="Graduated Units:"
                            v-if="qs.supplemented_units > 0">
                            <template v-slot:prepend>
                              <v-icon color="primary" icon="mdi-account-school"></v-icon>
                            </template>
                            <v-list-item-subtitle><b>{{ qs.supplemented_units }}</b>
                            </v-list-item-subtitle>
                          </v-list-item>


                          <v-list-item class="mb-2" color="white" rounded="rounded" v-if="qs.experience.length">
                            <template v-slot:prepend>
                              <v-icon color="primary" icon="mdi-head-cog-outline"></v-icon>
                            </template>
                            <v-list-item-title>Experience :</v-list-item-title>
                            <v-list-item-subtitle v-for="(experience, index) in qs.experience" :key="index">{{
                              experience.title }} <span v-if="qs.title === 'Teacher II'"> or 20 M.A
                                Units</span></v-list-item-subtitle>


                          </v-list-item>

                          <v-list-item class="mb-2" color=" white" rounded="rounded" v-if="qs.is_experience === true">
                            <template v-slot:prepend>
                              <v-icon color="primary"></v-icon>
                            </template>

                            <v-list-item-subtitle class="text-primary">
                              Or if less
                              than 20
                              years in service :
                              M.A. units + years in service (3 years in public or 5 years in private is equivalent to 1
                              M.A.
                              unit) =
                              Total curriculum in M.A.</v-list-item-subtitle>

                          </v-list-item>

                          <v-list-item class=" mb-2" color=" white" rounded="rounded" v-if="qs.ma_units > 0">
                            <template v-slot:prepend>
                              <v-icon color="primary" icon="mdi-book"></v-icon>
                            </template>
                            <v-list-item-title>M.A. Units :</v-list-item-title>
                            <v-list-item-subtitle>{{
                              qs.ma_units }}</v-list-item-subtitle>
                          </v-list-item>

                          <v-list-item class="mb-2" color=" white" rounded="rounded" title=" Training Hours:"
                            v-if="qs.training_hours != 0">
                            <template v-slot:prepend>
                              <v-icon color="primary" icon="mdi-star"></v-icon>
                            </template>
                            <v-list-item-subtitle><b>{{ qs.training_hours }}</b> hours of relevant training initiated,
                              sactioned,
                              approved/recognized by DepEd no used in the immediate previous promotion
                            </v-list-item-subtitle>
                          </v-list-item>
                          <v-list-item class="mb-2" color=" white" rounded="rounded" v-if="qs.rating.length">
                            <template v-slot:prepend>
                              <v-icon color="primary" icon="mdi-human-male-board"></v-icon>
                            </template>
                            <v-list-item-title>Performance Rating :</v-list-item-title>
                            <v-list-item-subtitle v-for="(rating, index) in qs.rating" :key="index">{{
                              rating.title }}</v-list-item-subtitle>
                          </v-list-item>


                          <v-list-item v-if="qs.leadership && qs.leadership.length > 0" class=" ma-2" color=" white"
                            rounded="rounded" title="Leadership and Potential Points:">
                            <template v-slot:prepend>
                              <v-icon color="primary" icon="mdi-certificate"></v-icon>
                            </template>

                            <v-list-item-subtitle v-for="(lead, index) in qs.leadership" :key="index">{{
                              lead.title }}</v-list-item-subtitle>
                          </v-list-item>


                        </v-card-text>
                      </v-card>


                    </v-col>
                    <v-col cols="6">
                      <v-card class="pa-5" rounded="xl">
                        <v-list-item class="mx-0 px-0 mb-2" density="compact">
                          <template v-slot:prepend>
                            <v-avatar class="mr-1" variant="text">
                              <v-icon color="yellow" size="32"> mdi-trophy-variant </v-icon>
                            </v-avatar>
                          </template>
                          <v-list-item-title
                            class="text-subtitle-1 text-primary font-weight-bold text-uppercase">Individual
                            Qualification</v-list-item-title>
                          <v-list-item-subtitle> <b>Instruction :</b> Click each standard below and select or
                            enter
                            your appropriate
                            qualification. Click <b>"cancel"</b> to end the application
                            process.</v-list-item-subtitle>
                        </v-list-item>
                        <v-card-text class="overflow-y-auto" style="height: 50vh">
                          <v-row dense>
                            <v-col cols="12" v-if="selected_qs">
                              SELECTED POSITION: <b class="text-uppercase text-primary">{{
                                qs.title }}</b>
                              <i v-if="applicant.qualification.position && !selected_qs?.education_level == ''">
                                ({{ selected_qs.education_level }})</i>

                            </v-col>

                            <v-col cols="12" v-if="applicant.qualification.position">
                              <v-select v-model="applicant.qualification.education" :items="education_data"
                                label="Education" hide-details multiple item-value="_id"
                                prepend-inner-icon="mdi-school" />
                            </v-col>
                            <v-col cols="12" v-if="selected_qs?.supplemented_units > 0">
                              <v-text-field v-model="applicant.qualification.supplemented_units" label="Graduated Units"
                                hide-details prepend-inner-icon="mdi-account-school" />
                            </v-col>
                            <v-col cols="12" v-if="selected_qs?.experience.length">
                              <v-select v-model="applicant.qualification.experience" :items="experience_data"
                                label="Experience" hide-details multiple item-value="_id"
                                prepend-inner-icon="mdi-head-cog-outline" />
                              <v-checkbox v-if="qs.title === 'Teacher III' || qs.title === 'Teacher II'"
                                label="Check if you have less than 20 years of experience." v-model="if_20_years"
                                hide-details />
                              <v-row dense v-if="if_20_years && qs.title === 'Teacher III'">
                                <v-col cols="12"> <b>Indicate the number of years served in each sector</b></v-col>
                                <v-col cols="6">
                                  <v-select v-model="applicant.qualification.experience_sr_public" label="Public"
                                    :items="unit_items" hide-details clearable />
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field label="Equivalent M.A Units" model-value="0" prefix="="
                                    :value="public_equivalent_ma_units" readonly />

                                </v-col>
                                <v-col cols="6">
                                  <v-select v-model="applicant.qualification.experience_sr_private" label="Private"
                                    :items="unit_items" hide-details clearable />
                                </v-col>

                                <v-col cols="6">
                                  <v-text-field label="Equivalent M.A Units" model-value="0" prefix="="
                                    :value="private_equivalent_ma_units" readonly />
                                </v-col>

                                <v-col cols="12">
                                  <v-text-field v-model="applicant.qualification.ma_units"
                                    label="Enter Number of M.A Units" hide-details />
                                </v-col>
                                <v-col cols="6" class="text-end mt-4 text-primary font-weight-bold text-subtitle-1">
                                  TOTAL M.A. EQUIVALENT UNITS
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field :value="total_ma" bg-color="primary" readonly />
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col cols="12" v-if="!if_20_years && selected_qs.ma_units > 0
                            ">

                              <v-text-field v-model="applicant.qualification.ma_units" label="Enter Number of M.A Units"
                                hide-detailsprepend-inner-icon="mdi-certificate" />
                            </v-col>
                            <v-col cols="12" v-if="qs?.status_of_appointment === true"> <v-checkbox
                                label="Check if permanent teacher."
                                v-model="applicant.qualification.status_of_appointment" hide-details /></v-col>
                            <v-col cols="12" v-if="if_20_years && qs.title === 'Teacher II'">
                              <v-text-field v-model="applicant.qualification.ma_units" label="Enter M.A. Units"
                                hide-details type="number" prepend-inner-icon="mdi-book" />
                            </v-col>
                            <v-col cols="12"
                              v-if="applicant.qualification.position && selected_qs?.training_hours != 0">
                              <v-text-field v-model="applicant.qualification.training"
                                label="Enter total training hours" hide-details type="number" item-value="_id"
                                prepend-inner-icon="mdi-human-male-board" />
                            </v-col>
                            <v-col cols="12" v-if="selected_qs?.rating.length">
                              <v-select v-model="applicant.qualification.per_rating" :items="rating_data"
                                label="Performance Rating" hide-details item-value="_id"
                                prepend-inner-icon="mdi-star" />
                            </v-col>
                            <v-col cols="12" v-if="qs.leadership && qs.leadership.length > 0">
                              <v-select v-model="applicant.qualification.leadership_points" :items="leadership_data"
                                label="Leadership and Potential" hide-details item-value="_id"
                                prepend-inner-icon="mdi-star" />
                            </v-col>



                            <v-col cols="12" v-if="!qs">
                              <v-text-field v-model="applicant.qualification.sg" hide-details
                                :value="qs.sg.salary_grade" />
                              <v-text-field v-model="applicant.qualification.sg_equivalent" hide-details
                                :value="qs.sg.equivalent" />
                            </v-col>
                          </v-row>
                        </v-card-text>
                        <v-card-actions>
                          <v-row justify="center">
                            <v-col cols="5"> <v-btn block color="error" variant="tonal"
                                @click="cancel_dialog = true">CANCEL</v-btn></v-col>

                            <v-col cols="5" v-if="qs?.title === 'Teacher III'"> <v-btn block color="success"
                                variant="tonal" @click="next_teacher3">
                                SUBMIT</v-btn></v-col>
                            <v-col cols="5" v-else> <v-btn block color="success" variant="tonal" @click="next_window">
                                SUBMIT Ok</v-btn></v-col>
                          </v-row>

                        </v-card-actions>

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
                    <v-text-field v-model="applicant.personal_information.last_name" :rules="[$validator.required]"
                      label="Surname" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant.personal_information.first_name" :rules="[$validator.required]"
                      label="Given Name" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant.personal_information.middle_name" label="Middle Name"
                      hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant.personal_information.email"
                      :rules="[(v) => /.+@.+/.test(v) || 'Invalid Email address']" label="Email" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant.personal_information.birthday" :rules="[$validator.required]"
                      label="Birthday" type="date" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-select v-model="applicant.personal_information.gender" :rules="[$validator.required]"
                      label="Gender" :items="['Female', 'Male']" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant.personal_information.contact_number" label="Contact Number"
                      hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="12" class="px-1 mt-1 ">
                    <v-btn v-if="!applicant.personal_information.signature" prepend-icon="mdi-upload"
                      color="grey-darken-2" @click="esig = true">Upload
                      E-signature</v-btn>
                    <div v-else class="d-flex"> <b class="text-uppercase text-primary">Signature:</b>
                      <v-img :width="197" height="10vh" :src="applicant?.personal_information?.signature" />

                    </div>


                  </v-col>

                </v-row>
              </v-card-text>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12"> <v-icon class="mr-2 pb-2" size="26" color="primary">mdi-briefcase-account</v-icon>
                    Designation and Employment Information</v-col>

                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant.designation.employee_no" :rules="[$validator.required]"
                      label="Employee No" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant.designation.plantilla_no" :rules="[$validator.required]"
                      label="Plantilla No" hide-details />
                  </v-col>

                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant.designation.item_no" :rules="[$validator.required]" label="Item No"
                      hide-details />
                  </v-col>

                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-select v-model="applicant.designation.division" :rules="[$validator.required]" label="Division"
                      item-value="_id" :items="sdo_data" hide-details />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant.designation.district" :rules="[$validator.required]"
                      label="District" hide-details />
                  </v-col>

                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-text-field v-model="applicant.designation.current_position" :rules="[$validator.required]"
                      label="Current Position" hide-details item-value="_id" />
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1">
                    <v-select v-model="applicant.designation.current_sg" :rules="[$validator.required]" :items="sg_item"
                      label="Current Salary Grade" hide-details item-value="_id" />
                  </v-col>

                  <v-col cols="12" xl="4" lg="4" md="4" sm="6" class="px-1" v-if="qs?.with_erf">
                    <v-select v-model="applicant.designation.ipcrf_rating" :rules="[$validator.required]"
                      label="IPCRF rating" hide-details
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
                  <v-col cols="4"> <v-text-field v-model="applicant.transcript.registrar_email" label="Email Address"
                      density="compact" hide-details="auto" />
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
                      <v-data-table :headers="service_record_headers" :items="applicant.service_record"
                        density="compact">
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
                            v-model="applicant.equivalent_unit.yt_equivalent" hide-details density="compact"
                            type="number" readonly />
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="6">
                      <v-row dense>
                        <v-col cols="12" class="text-caption text-grey-darken-1">
                          B. Degree to Equivalent
                        </v-col>
                        <v-col cols="5"> <v-text-field label="Public Schools" hide-details density="compact"
                            type="number" readonly /></v-col>
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
              <v-card-text style="min-height: 50vh">
                <v-card-title class="text-subtitle-2">
                  III. Attachments
                </v-card-title>
                <v-alert class="mb-4" density="compact" type="warning" closable variant="tonal" border="start"
                  text="Ensure  that all uploaded documents adhere to the prescribed standards and are
                  valid for processing. Your attention to document accuracy is crucial for a smooth application process."></v-alert>
                <v-row no-gutters>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="12"
                    v-for="( attachment_title, index )  in selected_qs?.attachment">
                    <v-file-input variant="underlined" :label="attachment_title" :key="index"
                      @update:model-value="uploading_attachment($event, attachment_title)"
                      :disabled="returned_attachment[attachment_title]?.valid" :rules="attachment_rules" />

                    <span v-if="returned_attachment[attachment_title]?.remarks">{{
                      returned_attachment[attachment_title]?.remarks
                    }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-window-item>
          </v-window>
        </v-form>

        <v-card-actions>
          <v-btn v-if="step > 1" variant="text" @click="back"> Back </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step === 2 || step === 3" color="primary" variant="flat" @click="next">
            NEXT
          </v-btn>
          <v-btn @click="submit_application_dialog" v-if="step === 4 && !applicant._id" color="success" variant="flat">
            SUBMIT
          </v-btn>
          <v-btn v-if="step === 4 && applicant?._id" @click="update_applicant" color="primary" variant="flat">
            RE-APPLY</v-btn>
        </v-card-actions>

      </v-sheet>
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
        <h5> You are qualified for your applied position <b class="text-primary text-subtitle-1">{{ qs.title }}</b>.
        </h5>
        <h5 class="mt-5">Download the
          <a href="https://dev-hris.sgp1.cdn.digitaloceanspaces.com/sms-assets/Omnibus_Certification_of_Authenticity_and_Veracity_of_Documents.pdf"
            download>
            <i>Omnibus
              Certification of
              Authenticity and
              Veracity of
              Documents</i>.
          </a> A notarized copy must be submitted in the Attachments page.

        </h5>

        <h5 class="mt-5">Clicking <b>cancel</b> will terminate the entire process.</h5>
      </v-card-text>
    </commons-dialog>

    <commons-dialog max-width="35%" v-model="cancel_dialog" :icon="'mdi-information'" :title="'Confirmation!'"
      :submitText="'Ok'" @submit="cancel_application">
      <v-card-text v-if="selected_qs" class="ma-4 text-center">
        Are you sure you want to end applying for this position ?
      </v-card-text>
    </commons-dialog>


    <commons-dialog max-width="35%" v-model="principal_dialog" :icon="'mdi-information'"
      :title="'Principal Email Address is required!'" :submitText="'Submit'" @submit="create_application">
      <v-card-text class="ma-4 ">


        Please enter the email address of your school principal to validate the authenticity of the attached
        document/s.
        <v-form ref="principal_form">
          <v-text-field v-model="applicant.principal.email" :rules="[(v) => /.+@.+/.test(v) || 'Invalid Email address']"
            label="Enter Principal's Email Address" />
        </v-form>
      </v-card-text>
    </commons-dialog>
    <commons-dialog max-width="35%" v-model="update_dialog" :icon="'mdi-information'"
      :title="'Principal Email Address is required!'" :submitText="'Submit'" @submit="update_applicant">
      <v-card-text class="ma-4 ">
        Please enter the email address of your school principal to validate the authenticity of the attached
        document/s.

        <v-text-field v-model="applicant.principal.email" label="Enter Principal's Email Address" />
      </v-card-text>
    </commons-dialog>
    <v-dialog v-model="esig" width="550" height="450">

      <v-toolbar color="indigo" v-if="$attrs['hide-toolbar'] !== ''" border>
        <v-list-item class="pl-2" density="compact">




          <v-list-item-title class="text-uppercase"> <v-icon
              class="pr-1">mdi-draw-pen</v-icon>E-signatures</v-list-item-title>

        </v-list-item>

        <v-spacer />
        <v-btn class="mr-0" @click="esig = false" rounded="0" icon="mdi-close" />
      </v-toolbar>
      <v-card>
        <v-tabs fixed-tabs v-model="tab" color="primary">
          <v-tab :value="1">Upload E-sig</v-tab>
          <v-tab :value="2">Signature Pad</v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item :value="1">
            <v-card flat height="300">
              <v-card-text>
                <v-row no-gutters justify="center" class="mt-10">
                  <div class="image-preview" v-if="image_data.length > 0">
                    <img class="preview" width="200" height="150" :src="image_data">
                  </div>
                </v-row>
              </v-card-text>
              <v-card-actions>

              </v-card-actions>
            </v-card>
            <v-divider />
            <v-card-actions>
              <v-row justify="center" v-if="image_data.length === 0">
                <v-btn variant="tonal" color="primary" prepend-icon="mdi-upload" class="custom-file-upload"
                  onclick="document.getElementById('getFile').click()">
                  Select File</v-btn>
                <input type='file' id="getFile" @change="preview_image" style="display:none">
              </v-row>
              <v-row dense justify="center" class="mb-2" v-else>
                <v-col cols="3"> <v-btn block variant="tonal" color="error" size="small"
                    @click="clear_upload">CLear</v-btn></v-col>
                <v-col cols="3"> <v-btn block variant="tonal" color="primary" size="small" @click="attached_esig"
                    v-if="image_data !== ''">Save</v-btn></v-col>
              </v-row>
            </v-card-actions>
          </v-window-item>

          <v-window-item :value="2">
            <v-card height="300" flat>
              <v-card-text class="text-center">
                <v-row no-gutters justify="center">
                  <v-sheet>
                    <Vue3Signature ref="signature_pad" :sigOption="state.option" :w="'800px'" :h="'380px'"
                      :disabled="state.disabled" />
                  </v-sheet>
                </v-row>
              </v-card-text>
            </v-card>
            <v-divider />
            <v-card-actions>
              <v-row dense justify="center" class="mb-2">
                <v-col cols="3"> <v-btn block variant="tonal" color="error" size="small"
                    @click="clear">CLear</v-btn></v-col>
                <v-col cols="3"> <v-btn class="custom-file-upload" block variant="tonal" color="primary" size="small"
                    @click="free_hand_esig">Save</v-btn></v-col>

              </v-row>

            </v-card-actions>
          </v-window-item>
        </v-window>
      </v-card>
    </v-dialog>


  </v-sheet>
</template>

<script setup lang="ts">
import Vue3Signature from "vue3-signature"
import swal from 'sweetalert';
import { useLoader } from '~/store/index';
import { ref } from 'vue';
const loader = useLoader();

const cfg = useRuntimeConfig();
const { $rest } = useNuxtApp();

const route = useRoute();

const router = useRouter();

const { CDN_ENDPOINT, DEV_CDN_ENDPOINT } = cfg.public;
const CDN = cfg.public.NODE_ENV === "development" ? DEV_CDN_ENDPOINT : CDN_ENDPOINT;

const uploading_attachment = (data: any, title: string) => {
  applicant.value.attachments[title] = data
}

/**
 * START: BUNGOO BUNGGO
 */
onBeforeMount(() => {
  Promise.all(
    [
      get_position(),
      get_education(),
      get_experience(),
      get_rating(),
      get_sdo(),
      get_sg(),
      get_qs(),
      get_applicant_details(),
      get_current_status(),
      get_leadership(),

    ]
  ).catch(() => swal({
    title: "Error",
    text: "Something went wrong while fetching data",
    icon: "error",
    buttons: { ok: false, cancel: false }
  }))
})

const applicant_form = ref()
const position_form = ref(false)
const applicant = ref({
  qualification: {
    position: "",
    education_level: "",
    education: [],
    experience: [],
    experience_type: '',
    experience_sr_public: 0,
    experience_sr_private: 0,
    experience_sr_public_equivalent: 0,
    experience_sr_private_equivalent: 0,
    ma_units: 0,
    total_ma: 0,
    training: 0,
    per_rating: "",
    sg: 0,
    sg_equivalent: 0,
    supplemented_units: 0,
    leadership_points: [],
    status_of_appointment: false,
  },
  personal_information: {
    last_name: "",
    first_name: "",
    middle_name: "",
    email: "",
    birthday: new Date,
    gender: "",
    signature: "",
    contact_number: ""
  },
  principal: {
    email: "",
    signature: "",
  },
  designation: {
    current_position: "",
    current_sg: "",
    employee_no: "",
    plantilla_no: "",
    division: "",
    district: "",
    item_no: "",
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
  professional_study: [
  ],
  attachments: {
  },


  display: true,
  status: "For Signature",
  created_date: new Date(new Date()),
  request_log: [],
  output_requirement: [],
  approved: null,
})

const back = () => {
  if (step.value === 4 && !qs?.value?.with_erf) return step.value = 2;
  return step.value--;
}
const next = () => {
  if (!applicant_form.value.isValid) return swal({ text: "Complete required fields", icon: "info" })
  if (applicant.value.personal_information.signature === '') return swal({ text: "E-signature is required!", icon: "info" })
  if (step.value === 2 && !qs?.value?.with_erf) return step.value = 4;
  return step.value++;
}
const attachment_rules = ref([
  // (v: any) => !!v || 'File is required',
  (v: any) => (v && v.length > 0) || 'File is required',
]);


const position_items = computed(() => {
  return position_data.value.map((v: Position) => {
    const title = v.education_level ? `${v.title} - ${v.education_level}` : v.title;
    return {
      ...v,
      title: title
    };
  });
});



function position_form_cond() {
  position_form.value = true
  apply_dialog.value = false

}
const view_qs_dialog = ref(false)
const apply_dialog = ref(false)
const next_dialog = ref(false)
const confirmation_dialog = ref(false)
const cancel_dialog = ref(false)
const principal_dialog = ref(false)
const update_dialog = ref(false)
const if_20_years = ref(false)







const show_footer = ref(false)

const step = ref(1);


// Start: Esignature
const esig = ref(false)
const tab = ref(null)
const image_src = ref("")
const image_data = ref("")
const input_sig = ref()
const signature_pad = ref(null as any)

function preview_image(event: any) {
  input_sig.value = event.target
  if (input_sig.value.files && input_sig.value.files[0]) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      image_data.value = e.target.result
    }
    reader.readAsDataURL(input_sig.value.files[0])
  }
}

function attached_esig() {
  const file = input_sig.value.files[0]
  if (file) {
    const reader = new FileReader()

    reader.onload = (event: any) => {
      applicant.value.personal_information.signature = event?.target.result
    }
    reader.readAsDataURL(file)
  }
  esig.value = false;
  swal({ text: "Successfully Uploaded Signature", icon: "success", buttons: { ok: false, cancel: false } })

}

function free_hand_esig() {
  const file = signature_pad.value.save("image/png")
  applicant.value.personal_information.signature = file

  esig.value = false;
  swal({ text: "Successfully Uploaded Signature", icon: "success", buttons: { ok: false, cancel: false } })
}

function clear() {
  signature_pad.value.clear()
}

function clear_upload() {
  applicant.value.personal_information.signature === ""
}
const state = reactive({
  count: 0,
  option: {
    penColor: "rgb(0, 0, 0)",
    backgroundColor: "rgb(255,255,255)"
  },
  disabled: false
})



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
const service_record_form = ref()
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

function next_to_step2() {
  step.value++
  confirmation_dialog.value = false
  if (step.value === 1) {
    confirmation_dialog.value = true
  }
}



function cancel_application() {
  location.reload();
}


const unit_items = Array.from({ length: 19 }, (_, index) => index + 1);




// function education_matching(applicant_education: any, required_education: any) {
//   if (!required_education) {
//     return false;
//   }
//   console.log("applicant_education", applicant_education);
//   console.log("required_education", required_education);
//   const [result] = required_education.map((v: string) =>
//     applicant_education.includes(v)
//   );

//   console.log("result", result);

//   return result;
// }
function education_matching(applicant_education: string[], required_education: string[]): boolean {
  if (!required_education || !applicant_education) {
    return false;
  }

  const result = required_education.some((reqEdu: string) =>
    applicant_education.includes(reqEdu)
  );

  return result;
}


// function education_matching(applicant_education: string, required_education: string[]) {
//   if (!required_education || required_education.length === 0) {
//     return false;
//   }
//   console.log("required_education", required_education);
//   console.log("applicant_education", applicant_education);


//   const result = required_education.includes(applicant_education);
//   console.log("RESULLTT ", result);

//   return result;
// }
// function experience_matching(applicant_experience: any, required_experience: any) {
//   if (!required_experience) {
//     return false;
//   }
//   console.log("applicant_experience", applicant_experience);
//   console.log("required_experience", required_experience);

//   const [result] = required_experience.map((v: string) => applicant_experience.includes(v));
//   console.log("result", result);

//   return result;
// }


function experience_matching(applicant_experience: any[], required_experience: any[]) {
  if (!required_experience) {
    return false;
  }
  const result = required_experience.some((exp: string) => applicant_experience.includes(exp));
  return result;
}

// function rating_matching(applicant_rating: string, required_rating: string) {
//   if (!required_rating) return true;
//   return applicant_rating == required_rating;
// };
function rating_matching(applicant_rating: string, required_rating: string[]) {
  if (!required_rating || required_rating.length === 0) {
    return false;
  }

  const result = required_rating.includes(applicant_rating);

  return result;
}
// function rating_matching(applicant_rating: any, required_rating: any) {
//   if (!required_rating) {
//     return false;
//   }
//   console.log("required_rating", required_rating);

//   const [result] = required_rating.map((v: string) => applicant_rating.includes(v));
//   console.log("applicant_rating", applicant_rating);

//   console.log("resssullllt", result);

//   return result;
// }

function training_matching(applicant_training: number, required_training: number) {
  applicant_training = parseFloat(applicant_training.toString());
  required_training = parseFloat(required_training.toString());
  return applicant_training >= required_training;
}

function leadership_points_matching(applicant_lead: any[], required_lead: any[]) {
  if (!required_lead) {
    return false;
  }
  console.log("applicant_lead", applicant_lead);
  console.log("required_lead", required_lead);

  const result = required_lead.some((exp: string) => applicant_lead.includes(exp));
  console.log("result", result);
  return result;



}

const principal_form = ref()


// CREATE 

async function create_application() {
  if (!principal_form.value.isValid) return swal({ text: "Principal Email is requried!", icon: "info" })
  loader.set("Sending application form...");

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

  loader.set(false);
  const success = Boolean(data);
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success" })
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
  if (!error) return swal({ title: "Oops!", text: "Failed to re-apply!", icon: "info" });
  return swal({ title: "Sucess", text: 'Successfully re-apply', icon: "success", buttons: { ok: false, cancel: false } })

}
const leadership_data = ref<Leadership[]>([]);


async function get_leadership() {
  const { data, error } = await $rest('sms-leadership/get-leadership-and-potential', {
    method: "GET",
  });
  if (!error && data) {

    leadership_data.value = data;
  }
}

async function get_applicant_details() {
  if (!route.query.id) {
    return;
  }

  const { data, error } = await $rest('new-applicant/get-applicant', {
    method: 'GET',
    query: {
      id: route.query.id
    }
  });

  if (data) {
    Object.assign(applicant.value, data);
  }
  if (!error) return swal({ title: "Oops!", text: "Failed to fetch data!", icon: "info" });

}


/**
 * MATCHING
 */
function next_window() {



  if (step.value === 2 && !qs.value.with_erf) {
    step.value = 4;
    confirmation_dialog.value = false
  } if (qs?.value.title === 'Teacher II') {

    const selected_position: { _id: string; education: string[] } | undefined = position_data.value.filter((v: any) => v._id == applicant.value.qualification.position)[0];
    if (!selected_position) return swal({ title: "Oops!", text: "Select position", icon: "info" });
    const applicant_education = applicant.value.qualification.education;
    const applicant_experience = applicant.value.qualification.experience;

    const is_yes: boolean[] = [];

    is_yes.push(education_matching(applicant_education, selected_position.education));
    is_yes.push(applicant.value.qualification.ma_units >= 20 || experience_matching(applicant_experience, selected_position.experience))
    if (experience_matching(applicant_experience, selected_position.experience) === false && applicant.value.qualification.ma_units < 20) {
      return swal({ title: "Oops!", text: "The equivalent M.A. units do not meet the requirement.", icon: "info" });
    }

    if (is_yes.includes(false)) return swal({ title: "ALERT!", text: "Sorry, you are not qualified for this position.", icon: "info" })
    confirmation_dialog.value = true

    console.log("ISSSS YESSSSSSS", is_yes);

  } else {

    const selected_position: { _id: string; education: string[] } | undefined = position_data.value.filter((v: any) => v._id == applicant.value.qualification.position)[0];


    if (!selected_position) return swal({ title: "Oops!", text: "Select position", icon: "info" });

    const applicant_education = applicant.value.qualification.education;
    if (!applicant_education) return swal({ title: "Oops!", text: "Education is required", icon: "info" });

    const applicant_experience = applicant.value.qualification.experience;
    if (!applicant_experience) return swal({ title: "Oops!", text: "Experience is required", icon: "info" });

    const applicant_rating = applicant.value.qualification.per_rating;
    if (position_data.value.rating?.length && !applicant_rating) return swal({ title: "Oops!", text: "Rating is required", icon: "info" });


    const applicant_training = applicant.value.qualification.training;
    if (position_data.value.training_hours?.length > 0 && !applicant_training) return swal({ title: "Oops!", text: "Training Hours is required", icon: "info" });

    const applicant_leadership_points = applicant.value.qualification.leadership_points;
    const applicant_supplement_units = applicant.value.qualification.supplemented_units;





    const is_yes: boolean[] = [];
    console.log("ISSSSSS", is_yes);


    is_yes.push(education_matching(applicant_education, selected_position.education));
    // if(selected_position.education_level != ''){
    //      is_yes.push(applicant_education_level === selected_position.education_level);
    // }
    is_yes.push(experience_matching(applicant_experience, selected_position.experience));

    if (selected_position.rating && selected_position.rating.length) {
      is_yes.push(rating_matching(applicant_rating, selected_position.rating));
    }

    is_yes.push(training_matching(applicant_training, selected_position.training_hours));

    if (selected_position.supplemented_units > 1) {
      is_yes.push(selected_position.supplemented_units <= applicant_supplement_units);
    }
    if (selected_position.leadership_points && selected_position.leadership_points.length) {
      is_yes.push(leadership_points_matching(applicant_leadership_points, selected_position.leadership_points));
    }




    console.log("ISSSSS111S", is_yes);
    if (is_yes.includes(false)) return swal({ title: "ALERT!", text: "Sorry, you are not qualified for this position.", icon: "info" })

    confirmation_dialog.value = true



  }
}

function next_teacher3() {
  const selected_position = position_data.value.find(v => v._id === applicant.value.qualification.position);
  if (!selected_position) {
    return swal({ title: "Oops!", text: "Please select a position", icon: "info" });
  }

  const applicant_education_id = applicant.value.qualification.education;
  const find_qs_education = qs?.value.education;

  if (!applicant_education_id || !find_qs_education) {
    return swal({ title: "Oops!", text: "Education is required", icon: "info" });
  }

  const educations = applicant_education_id.map(educ_id => find_qs_education.find(edu => edu._id === educ_id));
  educations.forEach(education => {
    if (!education.high_degree) {
      const applicant_experience = applicant.value.qualification.experience;
      if (!applicant_experience && !if_20_years.value) {
        return swal({ title: "Oops!", text: "Experience is required", icon: "info" });
      }
      const applicant_rating = applicant.value.qualification.per_rating;
      if (position_data.value.rating?.length && !applicant_rating) {
        return swal({ title: "Oops!", text: "Rating is required", icon: "info" });
      }
      const applicant_training = applicant.value.qualification.training;
      if (position_data.value.training_hours?.length > 0 && !applicant_training) {
        return swal({ title: "Oops!", text: "Training Hours is required", icon: "info" });
      }
      //       if (if_20_years.value === true){
      // if(applicant.value.qualification.total_ma < 40) {
      //     return swal({ title: "Oops!", text: "The equivalent M.A. units do not meet the requirement.", icon: "info" });
      // } else if (applicant.value.qualification.ma_units < 20){
      // return swal({ title: "Oops!", text: "The equivalent M.A. units do not meet the requirement.", icon: "info" });
      // }
      // }
      if (if_20_years.value && applicant.value.qualification.total_ma < 40) {
        return swal({ title: "Oops!", text: "The equivalent M.A. units do not meet the requirement.", icon: "info" });
      }

      const is_yes: boolean[] = [];

      is_yes.push(applicant.value.qualification.total_ma >= 40 || experience_matching(applicant_experience, selected_position.experience));
      is_yes.push(rating_matching(applicant_rating, selected_position.rating));
      if (if_20_years.value === false) {
        is_yes.push(applicant.value.qualification.ma_units >= 20);
      };
      is_yes.push(training_matching(applicant_training, selected_position.training_hours));

      if (is_yes.includes(false)) {
        return swal({ title: "ALERT!", text: "Sorry, you are not qualified for this position.", icon: "info" });
      }
      console.log("iS YESSS", is_yes);

      confirmation_dialog.value = true;
    }

    else {
      confirmation_dialog.value = true;
    }
  });
}





const public_equivalent_ma_units = computed(() => {
  const public_experience = Number(applicant.value.qualification.experience_sr_public);
  const equivalent = Math.floor(public_experience / 3);
  applicant.value.qualification.experience_sr_public_equivalent = equivalent;
  return equivalent;
});

const private_equivalent_ma_units = computed(() => {
  const private_experience = Number(applicant.value.qualification.experience_sr_private);
  const equivalent = Math.floor(private_experience / 5);
  applicant.value.qualification.experience_sr_private_equivalent = equivalent;
  return equivalent;
});


const total_ma = computed(() => {
  const public_equivalent = Number(applicant.value.qualification.experience_sr_public_equivalent);
  const private_equivalent = Number(applicant.value.qualification.experience_sr_private_equivalent);
  const ma = Number(applicant.value.qualification.ma_units);
  const total_equivalent = public_equivalent + private_equivalent + ma;
  applicant.value.qualification.total_ma = total_equivalent;
  return total_equivalent;
});

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


function submit_application_dialog() {
  if (selected_qs.value.attachment.length !== Object.keys(applicant.value.attachments).length) {
    return swal({ text: "Complete all attachments!", icon: "info" })
  }
  principal_dialog.value = true;
}

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

// Current status of
const model = ref();
async function get_current_status() {
  const { data, error } = await $rest('sms-position/get-submission-status', {
    method: 'GET',
  })
  model.value = data.enable_application
}

const returned_attachment = computed(() => {
  const x: { [key: string]: { valid: string, remarks: string } } = {}
  Object.entries(applicant.value.attachments).forEach(([key, value]) => {
    if (x[key]) return;
    const { valid, remarks } = value;
    x[key] = { valid, remarks }
  });

  return x
})

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
  font-size: 24px;
  color: #200a8d;
  letter-spacing: 1px;
  margin-bottom: 0px;

}
</style>
