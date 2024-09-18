<template>
  <div>
    <v-card flat class="w-100">
      <v-card-title> <v-row dense>
          <v-col cols="8" class="font-weight-bold text-h6"> EVALUATION /
            LIST OF
            REQUIREMENTS FORM</v-col>

        </v-row></v-card-title>

      <v-card-text>

        <!-- Application header -->
        <v-row no-gutters>
          <v-col cols="5"> TO : <b class="text-uppercase text-subtitle-1 font-weight-bold">{{
            rd?.rd?.first_name }} {{
                rd?.rd?.middle_name
                  ? rd?.rd?.middle_name : '' }}
              {{ rd?.rd?.last_name }}</b>
            <h5 class="pl-7 font-weight-regular">{{ rd?.rd?.position ? rd?.rd?.position : '' }}/{{
              rd?.rd?.government_agency ? rd?.rd?.government_agency : '' }} - {{ rd?.rd?.region ?
                rd?.rd?.region : '' }}
            </h5>
          </v-col>

          <v-col cols="auto"> Application Date : <v-chip color="primary" density="compact">
              {{ new Date(applicant_details.created_date).toLocaleString() }}
            </v-chip></v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="5" class="text-subtitle-2 font-weight-bold"> DIVISION : {{
            applicant_details?.division }} </v-col>
          <v-col cols="auto"> Control No. : <v-chip class="font-weight-bold" color="orange" density="compact"> {{
            applicant_details?.control_number }}
            </v-chip></v-col>
          <v-spacer />

        </v-row>
        <!-- Application header -->
        <v-row dense>
          <v-col cols="8">

            <v-btn v-if="applicant_details.is_with_erf && applicant_details?.status != 'For Signature'"
              @click="applicant_erf(applicant_details._id)" class="font-weight-bold mx-2" prepend-icon="mdi-printer"
              color="primary" density="compact"> Print ERF
            </v-btn>
            <v-btn v-if="applicant_details.is_with_erf && applicant_details?.status != 'For Signature'"
              @click="applicant_transmital(applicant_details._id)" class="font-weight-bold mr-2"
              prepend-icon="mdi-printer" color="primary" density="compact"> Print Transmital
            </v-btn>

          </v-col>
          <v-col cols="auto"> <v-btn v-if="applicant_details?.status != 'For Signature'"
              @click="applicant_history(applicant_details._id)" class="font-weight-bold" prepend-icon="mdi-history"
              color="primary" density="compact" variant="text">View
              HISTORY</v-btn></v-col>
          <v-col cols="2"> <v-btn v-if="applicant_details?.status != 'For Signature'"
              @click="view_applicant_info_dialog = true" prepend-icon="mdi-book" color="primary" density="compact"
              variant="text">View
              Applicant QS</v-btn></v-col>

          <!-- Applicant Personal Information -->
          <v-col cols="12">
            <v-card class="mx-auto" rounded="lg" border>
              <v-card-title class="d-flex  font-weight-bold">
                {{ applicant_details.is_with_erf === true ? '1. EQUIVALENT RECORD FORM ' : 'Applicant Details'
                }}<v-spacer />

              </v-card-title>
              <v-card-text>
                <v-row no-gutters class="ma-2" justify="center">
                  <v-col cols="6" class="text-capitalize">Name : <b> {{
                    applicant_details?.personal_information?.first_name
                      }} {{ applicant_details?.personal_information?.last_name }} </b>
                  </v-col>
                  <v-col cols="6">Date of Birth : <b> {{
                    applicant_details?.personal_information?.birthday }}
                    </b>
                  </v-col>
                  <v-col cols="6">Employee Number : <b> {{ applicant_details?.designation?.employee_no }}</b> </v-col>
                  <v-col cols="6">Authorized Position Title : <b>{{ applicant_details?.designation?.current_position
                      }}
                    </b></v-col>
                  <v-col cols="6">Item Number : <b>{{ applicant_details?.designation?.item_no }}</b> </v-col>
                  <v-col cols="6">Authorized Salary : <b>{{ applicant_details?.current_sg }}</b></v-col>
                </v-row>
                <!-- ERF -->
                <v-row no-gutters v-if="applicant_details.is_with_erf">
                  <v-col cols="12">
                    <v-sheet class="mx-2 ml-5">
                      <span class="font-weight-bold  text-uppercase text-caption" density="compact">
                        I. Education Attainment and Civil Service Eligibility
                      </span>
                      <v-sheet border>
                        <v-data-table :headers="attainment_headers" :items="applicant_details.educational_attainment"
                          density="compact"> <template #bottom v-if="!show_footer" /> </v-data-table> </v-sheet>
                    </v-sheet>

                    <v-sheet class="ma-2 ml-5">
                      <span class="font-weight-bold  text-uppercase text-caption" density="compact">
                        II. Service Record
                      </span>

                      <v-sheet class="mb-2" border width="100%">
                        <v-data-table :headers="service_record_headers" :items="applicant_details.service_record"
                          density="compact"> <template v-slot:item.equivalent="{ item }">
                            {{ item?.selectable?.equivalent }}

                          </template>
                          <template #bottom v-if="!show_footer" />
                        </v-data-table>
                      </v-sheet>
                      <!-- <v-sheet class="px-3 pt-3" border width="50%">
                        <v-subtitle>
                          <v-icon color="primary">mdi-calendar-month</v-icon>
                          <span class="ml-2">Service Record Summary</span>
                        </v-subtitle>
                        <v-divider />
                        <v-card-text>
                          <v-row justify="center">
                            <v-col cols="12" md="6">
                              Total Year: <v-chip class="px-4" color="primary"> {{
                                applicant_details?.equivalent_unit?.public_years_teaching }}
                              </v-chip>
                            </v-col>
                            <v-col cols="12" md="6">
                              Equivalent: <v-chip class="px-4" color="secondary"> {{
                                applicant_details?.equivalent_unit?.yt_equivalent }}
                              </v-chip>
                            </v-col>
                          </v-row>
                        </v-card-text>

                      </v-sheet> -->

                      <p class="mt-3 font-weight-bold text-uppercase text-caption">
                        III. EQUIVALENT UNITS
                      </p>
                    </v-sheet>

                    <v-sheet class="ma-2 ml-15">

                      <span class="font-weight-bold text-grey text-caption" density="compact">
                        A. Total Number of Years Teaching
                      </span>
                      <v-sheet width="70%">
                        <v-row dense class="pa-2">
                          <v-col cols="6"> Public Schools : <span class="pl-2"> {{
                            applicant_details?.equivalent_unit?.public_years_teaching }}</span>
                          </v-col>

                          <v-col cols="6"> Private Schools : <span class="pl-2"> {{
                            applicant_details?.equivalent_unit?.private_years_teaching }}
                            </span>
                          </v-col>
                        </v-row>

                      </v-sheet>
                    </v-sheet>
                    <v-sheet class="ma-2 ml-15">
                      <span class="font-weight-bold text-grey text-caption">
                        B. Degree to Degree Equivalent
                      </span>
                      <v-sheet width="70%">

                      </v-sheet>
                    </v-sheet>
                    <v-sheet class="ma-2 ml-15">
                      <span class="font-weight-bold text-grey text-caption"> C. Areas of Equivalent</span> <br />
                      <span class="ml-15 text-caption">
                        1. Professional Study :
                      </span>
                      <v-sheet class="ml-15" border width="70%">
                        <v-data-table :headers="professional_study_headers"
                          :items="applicant_details.professional_study" density="compact">
                          <template #bottom v-if="!show_footer" /></v-data-table>
                      </v-sheet>
                    </v-sheet>
                    <v-sheet class="ma-2 ml-15 ">
                      <span class="ml-15 text-caption">
                        2. Teaching Experience :
                      </span>
                      <v-sheet class="ml-15" width="70%">
                        <v-row dense class="pa-2">
                          <v-col cols="6"> Public Schools : <b class="pl-2"> {{
                            applicant_details?.equivalent_unit?.public_years_teaching }}</b>
                          </v-col>
                          <v-col cols="6"> Private Schools : <b class="pl-2"> {{
                            applicant_details?.equivalent_unit?.private_years_teaching }}</b>
                          </v-col>
                        </v-row>

                      </v-sheet>
                    </v-sheet>
                    <v-row dense class="ml-15 mt-1">

                      LATEST IPCRF RATING : <div class="px-5 font-weight-bold" style="border-bottom: 1px solid black">
                        {{ applicant_details.designation?.ipcrf_rating }} , {{
                          applicant_details.designation?.ipcrf_equivalent
                        }}</div>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-icon class="mr-2 mb-2 text-indigo" size="24">mdi-file-document</v-icon>
            <span class="font-weight-bold text-h6 text-indigo">Applicant Attachments</span>
          </v-col>
          <v-col cols="6" v-if="Object.keys(applicant_details).length"
            v-for="[key, value], index in Object.entries(applicant_details?.attachments)">
            <v-card class="mb-3" rounded="lg" border>
              <v-card-text>
                <v-sheet height="8vh">
                  <b>
                    {{ (index + 1) }}. {{ value.description }}
                  </b>
                </v-sheet>
                <v-btn size="small" color="primary" class="d-flex " variant="tonal"
                  @click="open_attachment_dialog(key)">
                  <v-icon class="mr-2">mdi-attachment</v-icon>
                  <span>View Attachment</span>
                </v-btn>
                <v-form ref="erf_form">
                  <v-row dense v-if="sdo_attachment_evaluator_condition">
                    <v-col cols="auto" class="mt-3 font-weight-bold text-grey "> Evaluation :</v-col>
                    <v-col cols="auto">
                      <v-checkbox color="success" label="Valid" @click="evaluate_attachment(key, true)" hide-details
                        density="compact" :model-value="getCheckboxValue(key, true)" />
                    </v-col>
                    <v-col cols="auto">
                      <v-checkbox color="error" label="Invalid" @click="evaluate_attachment(key, false)" hide-details
                        density="compact" :model-value="getCheckboxValue(key, false)" />
                    </v-col>
                    <v-col cols="12" v-if="applicant_details.attachments[key].valid == false">
                      <v-textarea label="Specify reason" v-model="remarks" rows="2" hide-details="auto"
                        @update:model-value="remarks_attachment(key)"
                        :model-value="applicant_details.attachments[key].remarks" bg-color="#E8EAF6" :rules="v => !!v"
                        required />
                    </v-col>
                  </v-row>
                </v-form>

              </v-card-text>

            </v-card>

          </v-col>



          <v-col cols="12" class="my-5" v-if="applicant_details.status === 'For DBM' && user.side == 'SDO'">

            <v-alert color="primary" border="start" variant="outlined" density="compact">
              <div>Is the reclassification approved by DBM?</div>
              <div class="d-flex w-50">
                <v-checkbox label="Yes" color="info" @click="is_approved(true)" hide-details
                  :model-value="getapprvo(true)" />
                <v-checkbox label="No" color="error" @click="is_approved(false)" hide-details
                  :model-value="getapprvo(false)" />
              </div>
            </v-alert>
          </v-col>
        </v-row>
        <v-col cols="12" class="d-flex justify-center"
          v-if="applicant_details.status === 'For Evaluation' || applicant_details.status === 'For Checking'">
          <v-sheet height="17vh" class="text-center w-50  justify-center">
            <div>
              <v-sheet class="d-flex align-center justify-center" min-height="7vh">
                <div v-show="evaluator_signature_cond">
                  <v-img :width="247" aspect-ratio="16/9" cover :src="user?.e_signature" />
                </div>
              </v-sheet>
              <div class="text-center text-uppercase font-weight-bold mt-2">{{
                user.first_name }} {{ user.last_name }}
              </div>
            </div>
            <hr />
            <div class="text-center">{{ user?.role }}</div>

            <div class="d-flex justify-center">
              <div class="w-30"><v-btn variant="text" color="error" @click="evaluator_clear_signature">Clear</v-btn>
              </div>
              <div class="w-30"><v-btn variant="text" color="primary" @click="evaluator_signature">Sign</v-btn>
              </div>
            </div>
          </v-sheet>
        </v-col>



      </v-card-text>
      <v-card-actions>
        <v-row justify="center">
          <v-col cols="6"
            v-if="user && user.role === 'Administrative Officer IV' && applicant_details.status === 'Pending'">
            <v-btn @click="evaluator_dialog = true" block variant="tonal" color="indigo"> Assign to Evaluator</v-btn>
          </v-col>

          <v-col cols="6"
            v-else-if="user && user.role === ROLES.EVALUATOR && applicant_details?.status === 'Approved for Printing'">
            <v-btn variant="tonal" color="primary" block @click="attach_output_requirement">
              Received Hard Copies
            </v-btn>
          </v-col>
          <v-col cols="6" v-else-if="user && applicant_details?.status === 'For DBM' && user.side === 'SDO'"><v-btn
              color="success" variant="tonal" block @click="complete_reclass" prepend-icon="mdi-check">Complete
              Reclassification</v-btn></v-col>
          <v-col cols="12" v-else-if="!user">
            <v-row justify="center" v-if="applicant_details?.principal?.signature">
              <v-col cols="5">
                <div>
                  <div class="w-100 d-flex align-center justify-center "> <v-img :width="197" height="10vh"
                      :src="applicant_details?.principal?.signature" />
                  </div>

                  <div class="w-100 text-center font-weight-bold text-subtitle-1 text-uppercase"> {{
                    applicant_details?.principal?.name
                  }}</div>
                  <hr />
                  <div class="text-center">Principal</div>
                </div>
              </v-col>
            </v-row>

            <v-row dense justify="center">

              <v-col cols="5" v-if="applicant_details?.principal?.signature"> <v-btn @click="handle_principal" block
                  variant="tonal" color="success">
                  AUTHENTICATE
                </v-btn></v-col>
              <v-col cols="5" v-else>
                <v-btn @click="esig = true" variant="tonal" block prepend-icon="mdi-upload" color="black">
                  <b>Upload Signature</b>
                </v-btn>
              </v-col>

            </v-row>



          </v-col>

          <!--applicant_details?.status != 'Completed' && applicant_details?.status != 'Pending' &&
            applicant_details?.status != 'Received Printout/s' && (applicant_details?.status != 'Approved for Printing' &&
              user.side === 'SDO') || applicant_details?.status === 'For Evaluation' || applicant_details?.status === 'For
          Checking'" -->
          <v-col cols="6" v-else-if="applicant_details?.status === 'For Evaluation' && user.role === 'Evaluator'">
            <v-btn @click="sdo_evaluator_dialog = true" block variant="tonal"
              :color="applicant_details?.status === 'Disapproved' ? 'error' : 'success'">
              {{ applicant_details?.status === 'Disapproved' ? 'Return to Principal' : 'Submitff' }}
            </v-btn>
          </v-col>
          <v-col cols="6" v-else-if="submit_display">
            <v-btn @click="handle_application" block variant="tonal"
              :color="applicant_details?.status === 'Disapproved' ? 'error' : 'success'">
              {{ applicant_details?.status === 'Disapproved' ? 'Return to Principal' : 'Submit' }}
            </v-btn>
          </v-col>

        </v-row>
      </v-card-actions>

    </v-card>

    <v-dialog width="500" v-model="evaluator_dialog">
      <v-card title="Select an Evaluator">
        <v-card-text>
          <v-select :items="evaluators" item-value="_id" item-title="title" v-model="selected_evaluator" />
        </v-card-text>
        <v-card-actions class="">
          <v-row dense justify="center">
            <v-col cols="5">
              <v-btn @click="evaluator_dialog = false" variant="tonal" color="error" block>CANCEL</v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn :disabled="!selected_evaluator" variant="tonal" color="success" block
                @click="assign_evaluator_applicant">
                SUBMIT
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog width="500" v-model="ro_evaluator_dialog">
      <v-card title="Select an RO Evaluator">
        <v-card-text>
          <v-select :items="evaluators" item-value="_id" item-title="title" v-model="selected_ro_evaluator" />
        </v-card-text>
        <v-card-actions class="">
          <v-row dense justify="center">
            <v-col cols="5">
              <v-btn @click="isActive.value = false" variant="tonal" color="error" block>CANCEL</v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn variant="tonal" color="success" block @click="assign_ro_evaluator_applicant">
                RO SUBMIT
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <pamphlets-evaluate-attachement :dialog="attach.dialog" :src="attach.src" :title="attach.title"
      @close="attach.dialog = false" />

    <v-dialog v-model="esig" width="550" height="550" persistent>
      <v-toolbar color="indigo" v-if="$attrs['hide-toolbar'] !== ''" border>
        <v-list-item class="pl-2" density="compact">
          <v-list-item-title class="text-uppercase "> <v-icon class="pr-1" size="30"
              color="blue">mdi-draw-pen</v-icon>E-signature</v-list-item-title>
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
            <v-card-text>
              <v-row no-gutters justify="center">
                <v-col cols="11">
                  <v-card class="w-100 my-2 d-flex align-center justify-center" variant="tonal" height="250"
                    width="100%">
                    <div class="image-preview" v-if="image_data.length > 0">
                      <img class="preview" width="200" height="150" :src="image_data">
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="11">
                  <v-text-field v-model="applicant_details.principal.name" label="Principal's Full Name" />
                </v-col>
              </v-row>
            </v-card-text>
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
            <v-card-text>
              <v-row dense justify="center">
                <v-col cols="11">
                  <v-card height="250" variant="tonal">
                    <Vue3Signature ref="signature_pad" :sigOption="state.option" :w="'800px'" :h="'380px'"
                      :disabled="state.disabled" />
                  </v-card>
                </v-col>
                <v-col cols="11">
                  <v-text-field v-model="applicant_details.principal.name" label="Principal's Full Name" />
                </v-col>
              </v-row>
            </v-card-text>

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
    <v-dialog v-model="view_applicant_info_dialog" width="60%">
      <v-card flat class="mx-5">
        <v-toolbar color="indigo" v-if="$attrs['hide-toolbar'] !== ''" border>
          <v-list-item class="pl-2" density="compact">

            <v-list-item-title> <v-icon class="px-4 pb-2" size="24" icon="mdi-account" dark />APPLICANT
              INFORMATION</v-list-item-title>

          </v-list-item>

          <v-spacer />
          <v-btn class="mr-0" @click="view_applicant_info_dialog = false" rounded="0" icon="mdi-close" />
        </v-toolbar>
        <v-card-text>
          <table>
            <tbody>
              <tr>
                <td width="30%"> Position</td>
                <td class="text-uppercase text-primary font-weight-bold">

                  {{ applicant_qs_info?.position }}
                </td>
              </tr>
              <tr v-if="applicant_qs_info?.education_level">
                <td> Education Level</td>
                <td> {{ applicant_qs_info?.education_level }}</td>
              </tr>
              <tr>
                <td> Education</td>
                <td v-for="educ, index in applicant_qs_info?.education" :key="educ">{{ educ }}</td>
              </tr>
              <tr v-if="applicant_qs_info?.qualification?.graduate_units">
                <td> Graduate Units</td>
                <td> {{ applicant_qs_info?.qualification?.graduate_units }}</td>
              </tr>

              <tr>
                <td> M.A. Units</td>
                <td> {{ applicant_qs_info?.qualification?.ma_units }}
                </td>
              </tr>
              <tr v-if="applicant_qs_info?.qualification?.experience_sr_public > 0">
                <td> Public </td>
                <td> {{ applicant_qs_info?.qualification?.experience_sr_public }} years
                </td>
                <td> Equivalent</td>
                <td> {{ applicant_qs_info?.qualification?.experience_sr_public_equivalent }} M.A. Units
                </td>

              </tr>
              <tr v-if="applicant_qs_info?.qualification?.experience_sr_private > 0">
                <td> Private </td>
                <td> {{ applicant_qs_info?.qualification?.experience_sr_private }} years
                </td>
                <td> Equivalent </td>
                <td> {{ applicant_qs_info?.qualification?.experience_sr_private_equivalent }} M.A. Units
                </td>

              </tr>
              <tr v-if="applicant_qs_info?.qualification?.total_ma > 0">
                <td class="text-primary font-weight-bold"> Total M.A. Units</td>
                <td>{{ applicant_qs_info?.qualification?.total_ma }}</td>
              </tr>

              <tr v-if="applicant_qs_info?.experience.length > 0">
                <td> Experience</td>
                <td v-for="exp, index in applicant_qs_info?.experience" :key="exp">{{ exp }}</td>
              </tr>
              <tr v-if="applicant_qs_info?.rating">
                <td> Performance Rating</td>
                <td>{{ applicant_qs_info?.rating }}</td>
              </tr>
              <tr>
                <td> Training Hours</td>
                <td> {{ applicant_qs_info?.qualification?.training_hours }}</td>
              </tr>
              <tr v-if="applicant_qs_info?.leadership?.length > 0">
                <td> Leadership and Potention Points</td>
                <td v-for="lead, index in applicant_qs_info?.leadership" :key="lead">{{ lead }} </td>
              </tr>
              <tr>
                <td> Attachments</td>
                <td>
                  <b class="text-uppercase mb-2">APPLICANT </b>
                  <p v-for="attach, index in applicant_qs_info?.attachments" :key="attach">
                    <v-icon size="20" color="primary">mdi-circle-small</v-icon> {{
                      attach.description }} <br />
                  </p>

                </td>
              </tr>


            </tbody>
          </table>



        </v-card-text>
      </v-card>
    </v-dialog>

    <commons-dialog v-model="sdo_evaluator_dialog" max-width="25%" icon="mdi-school"
      title="For Evaluation: Complete the following" submitText="Submit" @submit="handle_application">
      <v-card-text v-if="applicant_details.assignees[2]">
        <p class="mb-4">Please fill out the range assessment and remarks, as these will be included in the applicant's
          generated ERF
        </p>
        <template v-if="applicant_details.is_with_erf">
          <v-text-field v-model="applicant_details.assignees[2].range_assignment.name" label="Enter Range Assessment"
            prepend-icon="mdi-chart-bar" outlined />
          <v-text-field v-model="applicant_details.assignees[2].range_assignment.remarks" label="Remarks"
            prepend-icon="mdi-note-text" outlined />

          <v-file-input v-model="applicant_details.assignees[2].pal.link" label="Upload Plantilla Allocation List"
            outlined />
        </template>
        <template v-else>
          <v-file-input v-model="applicant_details.assignees[2].pal.link" label="Upload Plantilla Allocation List"
            outlined />
        </template>
      </v-card-text>
    </commons-dialog>


  </div>

</template>
<script lang="ts" setup>

const router = useRouter();
import Vue3Signature from "vue3-signature"
import swal from 'sweetalert';
import useAuth from "~/store/auth";
import { ref } from 'vue';
const user = useAuth().user;
const { $rest } = useNuxtApp()
const route = useRoute();

definePageMeta({
  layout: "plain"
})

onBeforeMount(() => {
  Promise.all([
    get_applicant_details(),
    get_evaluators(),
    get_ro_evaluators(),
    get_applicant_qs(),
    get_rd(),
  ]);

  if (user) setPageLayout("barren");
});


const enum ROLES {
  PRINCIPAL = "Principal",
  ADMIN4 = "Administrative Officer IV",
  EVALUATOR = "Evaluator",
  VERIFIER = "Verifier",
  RECOMMENDING = "Recommending Approver",
  APPROVER = "Approver",
  ADMIN5 = "Administrative Officer V",
  RO_EVALUATOR = "RO Evaluator",
}


// EVALUATES APPLICANT ATTACHMENT
const evaluate_attachment = (key: string, value: boolean) => {
  applicant_details.value.attachments[key].valid = value;
}
const getCheckboxValue = (key: string, expected_value: boolean) => {
  const attachment = applicant_details.value.attachments[key];
  return attachment.valid === expected_value;
};
const remarks = ref("");
const remarks_attachment = (key: string) => {
  applicant_details.value.attachments[key].remarks = remarks.value
}


const view_applicant_info_dialog = ref(false)
/**
 * start: evaluator
 */

const evaluator_dialog = ref(false)
const ro_evaluator_dialog = ref(false)
const selected_evaluator = ref("");
const evaluators = ref([]);

const get_evaluators = async () => {
  const role = user && user.role;
  if (role !== ROLES.ADMIN4) return;
  const { data, error } = await $rest("new-applicant/get-evaluators", { method: "GET", query: { division_id: user.division } });
  if (error) return swal({ title: "Error", error: error, icon: "error", buttons: { ok: false, cancel: false } });
  evaluators.value = data;


}

1

async function assign_evaluator_applicant() {
  const payload = {
    app_id: route.query.id,
    evaluator: selected_evaluator.value
  }
  const { data, error } = await $rest('new-applicant/assign-evaluator-application', {
    method: "PUT",
    body: payload
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });
  router.push({ name: 'sms-reclassification' });
}

async function attach_output_requirement() {
  const payload = {
    app_id: route.query.id,
  };
  const { data, error } = await $rest('new-applicant/attach-output-requirement', {
    method: "POST",
    body: payload
  })

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });
  router.push({ name: 'sms-reclassification' });
}
const is_approved = (value: boolean) => {
  applicant_details.value.approved = value;
}
const getapprvo = (expected_value: boolean) => {
  return applicant_details.value.approved === expected_value;
};
async function complete_reclass() {
  let approval_status = applicant_details.value.approved;
  const payload = {
    app_id: route.query.id,
    approved: approval_status
  };
  const { data, error } = await $rest('new-applicant/complete-application', {
    method: "PUT",
    body: payload
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });

}

const selected_ro_evaluator = ref("");
const get_ro_evaluators = async () => {
  const role = user && user.role;
  if (role !== ROLES.ADMIN5) return;
  const { data, error } = await $rest("new-applicant/get-ro-evaluators", { method: "GET", query: {} });
  if (error) return swal({ title: "Error", error: error, icon: "error", buttons: { ok: false, cancel: false } });
  evaluators.value = data;


}
async function assign_ro_evaluator_applicant() {
  const payload = {
    app_id: route.query.id,
    evaluator: selected_ro_evaluator.value
  }
  const { data, error } = await $rest('new-applicant/assign-ro-evaluator-application', {
    method: "PUT",
    body: payload
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })

  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
/**
 * end : evaluator
 */

const sdo_evaluator_dialog = ref(false)

const handle_application = async () => {


  const role = user && user.role;
  const side = user && user.side;
  const status = applicant_details.value.status;
  const attachment = applicant_details.value.attachments;
  const range_assignment = applicant_details.value.assignees[2].range_assignment;
  const pal = applicant_details.value.assignees[2].pal

  const is_attachment_valid = Object.values(applicant_details.value.attachments).every(attachment => typeof attachment.valid === 'boolean');

  if (!is_attachment_valid && !(["Pending", "Approved for Printing", "For DBM"].includes(status) || (status === 'For Verifying' && user.side === 'RO'))) {
    return swal({
      title: "Evaluate Attachments",
      icon: "warning",
      buttons: { ok: false, cancel: false }
    });
  }

  let payload;

  if (side === 'SDO' && status === 'For Evaluation') {
    payload = {
      attachment,
      status,
      app_id: route.query.id,
      range_assignment,
      pal
    };
  } else {
    payload = {
      attachment,
      status,
      app_id: route.query.id,
    };
  }
  console.log("ROleeee", role);

  switch (role) {
    case "Administrative Officer IV":
      handle_admin4(payload);
      break;
    case "Evaluator":
      handle_evaluator(payload);
      break;
    case "Verifier":
      handle_verifier(payload);
      break;
    case "Administrative Officer V":
      handle_admin5(payload);
      break;
    default:
      break;
  }
};


const evaluator_signature_cond = ref(false);

function evaluator_signature() {
  // const is_attachment_valid = Object.values(applicant_details.value.attachments).every(attachment => attachment === false);

  // if (!is_attachment_valid) {
  //   swal({
  //     title: "Only valid request can be signed. Click return.",
  //     text: "",
  //     icon: "warning",
  //     buttons: { ok: false, cancel: false }
  //   });
  //   return;
  // }
  if (user.e_signature !== '') {
    evaluator_signature_cond.value = true;
    return true;
  }

  // If user's electronic signature is empty, do nothing
}

function evaluator_clear_signature() {
  if (user.e_signature !== '')
    return evaluator_signature_cond.value = false;
}
const sdo_attachment_evaluator_condition = computed(() => {
  if (!user) return true;
  const valid = ['For Checking', 'For Evaluation', 'Disapproved'].includes(applicant_details.value.status);
  return valid
})


/**
 * APPROVAL PROCCESS
 */

const erf_form = ref();

const handle_principal = async () => {
  const principal_name = applicant_details.value.principal.name
  const principal_esig = applicant_details.value.principal.signature
  const attachment = applicant_details.value.attachments;

  const is_attachment_valid = Object.values(applicant_details.value.attachments).every(attachment => typeof attachment.valid === 'boolean');
  if (!is_attachment_valid) {
    return swal({
      title: "Evaluate Attachments",
      icon: "warning",
      buttons: { ok: false, cancel: false }
    });
  };
  const payload = {
    app_id: route.query.id,
    attachment,
    principal_name,
    principal_esig

  };

  const { data, error } = await $rest('new-applicant/handle-principal', { method: "PUT", body: payload })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })

  router.push({ name: 'sms-reclassification' });
}
const handle_admin4 = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-admin4', { method: "PUT", body: payload })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })

  router.push({ name: 'sms-reclassification' });

}
const handle_evaluator = async (payload: any) => {
  console.log('Payloaddd', payload);

  const form = new FormData()
  /* @ts-ignore */

  form.append("range_assignment", payload.range_assignment)
  form.append("pal", payload.pal.link[0])

  form.append("form", JSON.stringify(payload));

  console.log(form)

  const { data, error } = await $rest('new-applicant/handle-evaluator', { method: "PUT", body: form })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
// const handle_evaluator = async (payload: any) => {
//   // const temp = new FormData();

//   // const attachment = applicant_details.value.sdo_attachments;

//   // Object.entries(attachment).forEach(([title, file]) => {
//   //   if (file?.length)
//   //     file.forEach((v: any) => {
//   //       const key = `${title}-${v.name}`;
//   //       temp.append(key, v)
//   //     })
//   // });
//   // temp.append("form", JSON.stringify(payload));
//   const { data, error } = await $rest('new-applicant/handle-evaluator', { method: "PUT", body: payload })
//   if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
//   swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })
//   clear_attachment();

//   router.push({ name: 'sms-reclassification' });

// }
const handle_verifier = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-verifier', { method: "PUT", body: payload })
  if (error) return swal({ title: "Erro", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } })

  router.push({ name: 'sms-reclassification' });
}


const handle_admin5 = async (payload: any) => {
  const { data, error } = await $rest('new-applicant/handle-admin5', { method: "PUT", body: payload });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  swal({ text: data, icon: "success", buttons: { ok: false, cancel: false } })
  router.push({ name: 'sms-reclassification' })


};



const attach = ref({ dialog: false, title: "", src: "" })
const open_attachment_dialog = (attachment: string) => {
  const attachments = applicant_details.value.attachments;
  attach.value = { dialog: true, src: attachments[attachment], title: attachment };
}



const show_footer = ref(false);
const applicant_details = ref({} as Applicant)
async function get_applicant_details() {
  const { data, error } = await $rest('new-applicant/get-applicant', {
    method: 'GET',
    query: {
      id: route.query.id
    }
  })
  applicant_details.value = data
}

// Table headers start
const attainment_headers = [
  { title: 'Degree', key: 'degree', sortable: false },
  { title: 'Institution', key: 'institution', sortable: false },
  { title: 'Year Received', key: 'year_received', sortable: false },
  { title: 'Board Examination', key: 'board_exam', sortable: false },
  { title: 'Rating', key: 'rating', sortable: false },
  { title: 'Date', key: 'date', sortable: false },
];
const service_record_headers = [
  { title: 'Type', key: 'type', sortable: false },
  { title: 'Designation', key: 'designation', sortable: false },
  { title: 'From', key: 'from', sortable: false },
  { title: 'To', key: 'to', sortable: false },
  { title: 'School', key: 'school_acronym', sortable: false },
  { title: "Year Count", key: "count", sortable: false },
  { title: "Equivalent", key: "equivalent", sortable: false }

];
const professional_study_headers =
  [
    { title: 'School Year', key: 'sy', sortable: false },
    { title: 'Number of Units', key: 'unit_no', sortable: false },
    { title: 'Description', key: 'description', sortable: false }
  ];
// Table headers end




const applicant_history = (id) => {
  router.push({
    name: 'sms-applicant-history',
    query: {
      id: id
    }
  });
}

const applicant_erf = (id: any) => {
  router.push({
    name: 'printable-erf',
    query: {
      id: id
    }
  });
}

const applicant_transmital = (id: any) => {
  router.push({
    name: 'printable-transmittal',
    query: {
      id: id
    }
  });
}


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

const submit_display = computed(() => {
  const status = applicant_details.value?.status;
  const isSDO = user.value?.side === 'SDO';

  return (
    status !== 'Completed' &&
    status !== 'Pending' &&
    status !== 'Received Printout/s' &&
    (status !== 'Approved for Printing' && isSDO) ||
    status === 'For Evaluation' ||
    status === 'For Checking'
  );
});

function attached_esig() {
  const file = input_sig.value.files[0]
  if (file) {
    const reader = new FileReader()

    reader.onload = (event: any) => {
      applicant_details.value.principal.signature = event?.target.result
    }
    reader.readAsDataURL(file)
  }
  if (!applicant_details.value.principal.name) {
    return swal({ text: "Principal's Full Name is required", icon: "error", buttons: { ok: false, cancel: false } })
  }
  esig.value = false;
  swal({ text: "Successfully Uploaded Signature", icon: "success", buttons: { ok: false, cancel: false } })
}

function free_hand_esig() {
  const file = signature_pad.value.save("image/png")
  if (!applicant_details.value.principal.name) {
    return swal({ text: "Principal's Full Name is required", icon: "error", buttons: { ok: false, cancel: false } })
  }
  applicant_details.value.principal.signature = file;
  esig.value = false;
  swal({ text: "Successfully Uploaded Signature", icon: "success", buttons: { ok: false, cancel: false } })
}

function clear() {
  signature_pad.value.clear()
}

function clear_upload() {
  applicant_details.value.principal.signature === ""
}
const state = reactive({
  count: 0,
  option: {
    penColor: "rgb(0, 0, 0)",
    backgroundColor: "rgb(255,255,255)"
  },
  disabled: false
})


const applicant_qs_info = ref([] as Applicant[]);


async function get_applicant_qs() {
  const { data, error } = await $rest('new-applicant/get-applicant-erf', {
    method: 'GET',
    query: { id: route.query.id }
  });

  applicant_qs_info.value = data;
}
const rd = ref({} as Rd)
async function get_rd() {
  const { data, error } = await $rest('sms-rd/get-rd', {
    method: "GET",
  })
  rd.value = data
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
}

</script>
<style scoped>
* {
  font-size: 13px
}

.v-file-input__label {
  max-width: 100%;
  word-break: break-all;
}

b {
  cursor: pointer;


}
</style>
