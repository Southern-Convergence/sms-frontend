<template>
  <wizards-pamphlet definition="pds">
    <!--Start of Personal Information-->
    <template v-slot:basic-info>
      <v-row dense>
        <v-col cols="12" xxl="3" xl="4" lg="4">
          <v-text-field label="First Name" :rules="[$validator.required]" />
          <v-text-field label="Middle Name" />
          <v-text-field label="Last Name" :rules="[$validator.required]" />
          <v-text-field label="Appellation (Optional)" />
          <v-row class="pt-0" dense>
            <v-col cols="6">
              <v-text-field label="Height(m)" type="number" />
            </v-col>
            <v-col cols="6">
              <v-text-field label="Weight(kg)" type="number" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" xxl="3" xl="4" lg="4">
          <v-text-field class="date-picker" label="Date of Birth" :rules="[$validator.required]" type="date" />
          <v-text-field label="Place of Birth" :rules="[$validator.required]" />
          <v-select label="Birth Order Category" :items="$birth_order_category" />
          <v-select label="Sex" :items="$sex" variant="outlined" color="primary" :rules="[$validator.required]"
            density="compact">
            <template v-slot:item="{item, props}">
              <v-list-item v-bind="props" :title="item.value.text">
                <template v-slot:prepend>
                  <v-icon class="mr-2" :icon="item.value.icon" />
                </template>
              </v-list-item>
            </template>

            <template v-slot:selection="{item}">
              <v-icon class="mr-2" :icon="item.value.icon" :color="item.value.color" />
              {{item.value.text}}
            </template>
          </v-select>
          <v-select label="Blood Type" :items="$blood_types" />
        </v-col>
        <v-col cols="12" xxl="3" xl="4" lg="4">
          <v-combobox label="Disability (Specify)" :items="$disabilities" />
          <v-checkbox label="Recipient of Government Assistance" />
        </v-col>
      </v-row>
    </template>

    <template v-slot:gov-ids>
      <v-row dense>
        <v-col cols="12" xxl="3" xl="4" lg="4">
          <v-text-field label="GSIS ID No." />
          <v-text-field label="PAG-IBIG ID No." />
          <v-text-field label="PHILHEALTH ID No." />
        </v-col>
        <v-col cols="12" xxl="3" xl="4" lg="4">
          <v-text-field label="SSS ID No." />
          <v-text-field label="TIN ID No." />
          <v-text-field label="Agency Employee No." />
        </v-col>
      </v-row>
    </template>

    <template v-slot:natl-info>
      <v-row>
        <v-col cols="12" xxl="3" xl="4" lg="4">
          <span class="text-body-1 text-medium-emphasis px-2">Citizenship</span>
          <v-row dense>
            <v-radio-group hide-details inline>
              <v-radio v-for="citizenship in $citizenships" :key="citizenship" :label="citizenship"
                :value="citizenship" />
            </v-radio-group>
            <v-col cols="12">
              <v-fade-transition>
                <v-card-text class="py-0 px-2">
                  If holder of <strong>Dual Citizenship</strong> please indicate the details
                  <v-radio-group inline hide-details>
                    <v-radio v-for="dc_type in $dual_citizenship_types" :key="dc_type" :label="dc_type"
                      :value="dc_type" />
                  </v-radio-group>

                  <v-combobox class="mb-2" :items="$nationalities" label="Other Nationality" hide-details />

                  <v-combobox :items="$ethnicities" label="Ethnicity" hide-details />
                </v-card-text>
              </v-fade-transition>
            </v-col>

            <v-col cols="12">
              <v-select class="px-2" label="Home Ownership" :items="$home_ownership_types" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" xxl="3" xl="4" lg="4">
          <span class="text-body-1 text-medium-emphasis">Residential Address</span>
          <v-text-field class="mt-2" label="Province" hide-details />
          <v-text-field class="mt-2" label="City/Municipality" hide-details />
          <v-text-field class="mt-2" label="Barangay" hide-details />
          <v-text-field class="mt-2" label="Subdivision/Village" hide-details />
          <v-text-field class="mt-2" label="Street" hide-details />
          <v-row dense>
            <v-col cols="8">
              <v-text-field class="mt-2 mr-1" label="House/Block/Lot No." hide-details />
            </v-col>
            <v-col cols="4">
              <v-text-field class="mt-2 zipcode" label="Zipcode" type="number" hide-details />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" xxl="3" xl="4" lg="4">
          <span class="text-body-1 text-medium-emphasis">Permanent Address</span>
          <v-text-field class="mt-2" label="Province" hide-details />
          <v-text-field class="mt-2" label="City/Municipality" hide-details />
          <v-text-field class="mt-2" label="Barangay" hide-details />
          <v-text-field class="mt-2" label="Subdivision/Village" hide-details />
          <v-text-field class="mt-2" label="Street" hide-details />
          <v-row dense>
            <v-col cols="8">
              <v-text-field class="mt-2 mr-1" label="House/Block/Lot No." hide-details />
            </v-col>
            <v-col cols="4">
              <v-text-field class="mt-2 zipcode" label="Zipcode" type="number" hide-details />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>

    <template v-slot:contact-info>
      <v-row dense>
        <v-col cols="12" xxl="3" xl="4" lg="4">
          <v-text-field label="Telephone No." prepend-inner-icon="mdi-phone-classic" hide-details />
          <v-text-field class="mt-2" label="Mobile No." prepend-inner-icon="mdi-cellphone" hide-details />
          <v-text-field class="mt-2" label="E-Mail Address (Optional)" prepend-inner-icon="mdi-email" hide-details />
        </v-col>
      </v-row>
    </template>

    <template v-slot:additional-info>
      <v-card-text>
        <v-checkbox class="mb-2" hide-details>
          <template v-slot:label>
            <p class="mx-2 text-subtitle-2">Are you related by consanguinity or affinity to the appointing or Chief
              of Bureau or office or to the person who has immediate supervision over the Bureau or Department where
              you will be appointed?</p>
          </template>
        </v-checkbox>

        <v-divider />

        <v-radio-group class="mx-6">
          <v-radio v-for="pc_type in $post_consanguinity_type" :key="pc_type" :value="pc_type" small>
            <template v-slot:label>
              <p class="mx-2 text-subtitle-2">{{ pc_type }}</p>
            </template>
          </v-radio>
        </v-radio-group>

        <v-checkbox class="mb-2" hide-details>
          <template v-slot:label>
            <p class="mx-2 text-subtitle-2">Have you ever been found guilty of any administrative offense?</p>
          </template>
        </v-checkbox>

        <v-checkbox class="mb-2" hide-details>
          <template v-slot:label>
            <p class="mx-2 text-subtitle-2">Have you been criminally charged before any court?</p>
          </template>
        </v-checkbox>

        <v-checkbox class="mb-2" hide-details>
          <template v-slot:label>
            <p class="mx-2 text-subtitle-2">Have you ever been convicted of any crime or violation of any law,
              decree, ordinance or regulation by any court or tribunal?</p>
          </template>
        </v-checkbox>

        <v-checkbox class="mb-2" hide-details>
          <template v-slot:label>
            <p class="mx-2 text-subtitle-2">Have you ever been separated from the service in any of the following
              modes:Resignation, Retirement, Dropped from the rolls, Dismissal, Termination, End of Term, Finished
              Contract or Phased Out(abolition)</p>
          </template>
        </v-checkbox>

        <v-checkbox class="mb-2" hide-details>
          <template v-slot:label>
            <p class="mx-2 text-subtitle-2">Have you ever been a candidate in a national or local election held
              within the last year (except Barangay election)?</p>
          </template>
        </v-checkbox>

        <v-checkbox class="mb-2" hide-details>
          <template v-slot:label>
            <p class="mx-2 text-subtitle-2">Have you resigned from the government service during the three(3)-month
              period before the last election to promote/actively campaign for a</p>
          </template>
        </v-checkbox>

        <v-checkbox class="mb-2" hide-details>
          <template v-slot:label>
            <p class="mx-2 text-subtitle-2">Have you acquired the status of an immigrant or permanent resident of
              another country?</p>
          </template>
        </v-checkbox>
      </v-card-text>
    </template>
    <!--End of Personal Information-->


    <!--Start of Family Background-->
    <template v-slot:spouse>
      <v-row dense>
        <v-col cols="12" xxl="3" xl="4" lg="4">
          <v-text-field label="First Name (Optional)" :rules="[$validator.required]" />
          <v-text-field label="Middle Name (Optional)" :rules="[$validator.required]" />
          <v-text-field label="Last Name (Optional)" :rules="[$validator.required]" />
          <v-text-field label="Appelation (Optional)" />
        </v-col>

        <v-col cols="12" xxl="3" xl="4" lg="4">
          <v-text-field label="Occupation (Optional)" :rules="[$validator.required]" />
          <v-text-field label="Employer/Business Name (Optional)" :rules="[$validator.required]" />
          <v-text-field label="Business Address (Optional)" :rules="[$validator.required]" />
          <v-text-field label="Telephone No. (Optional)" prepend-inner-icon="mdi-phone-classic" hide-details />
        </v-col>
      </v-row>
    </template>
    <template v-slot:parents>
      <v-row>
        <v-col cols="12" xxl="3" xl="4" lg="4">
          <span class="text-body-1 text-medium-emphasis">Father</span>
          <v-text-field class="mt-2" label="First Name (Optional)" hide-details />
          <v-text-field class="mt-2" label="Middle Name (Optional)" hide-details />
          <v-text-field class="mt-2" label="Last Name (Optional)" hide-details />
          <v-text-field class="mt-2" label="Appelation (Optional)" hide-details />
        </v-col>
        <v-col cols="12" xxl="3" xl="4" lg="4">
          <span class="text-body-1 text-medium-emphasis">Mother</span>
          <v-text-field class="mt-2" label="First Name (Optional)" hide-details />
          <v-text-field class="mt-2" label="Middle Name (Optional)" hide-details />
          <v-text-field class="mt-2" label="Last Name (Optional)" hide-details />
          <v-text-field class="mt-2" label="Appelation (Optional)" hide-details />
        </v-col>
      </v-row>
    </template>
    <template v-slot:children>
      <v-row dense>
        <v-col cols="12" xxl="4" xl="6" lg="6">
          <v-list class="well-spaced-list" v-model="selected_child">
            <v-list-item v-for="(child, i) in children" :key="i" :value="i" :title="child.name"
              :subtitle="`Age: ${get_age(new Date(child.birthdate).getTime())}`" rounded="lg" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-account-child" size="28" />
              </template>
            </v-list-item>

            <v-list-item lines="one" title="Add Child" @click="(add_child_dialog = true)" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-plus" size="28" />
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </template>
    <!--End of Family Background-->


    <!--Start of Educational Background-->
    <template v-slot:education>
      <v-row dense>
        <v-col cols="12" xxl="4" xl="6" lg="6">
          <v-list class="well-spaced-list" v-model="selected_child">
            <v-list-item v-for="(education, i) in education_list" :key="i" :value="i" :title="education.name"
              :subtitle="education.type" rounded="lg" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-school" size="28" />
              </template>
            </v-list-item>

            <v-list-item lines="one" title="Add Educational Background" @click="(add_education_dialog = true)" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-plus" size="28" />
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </template>

    <!--End of Educational Background-->


    <!--Start of Civil Service Eligibility-->
    <template v-slot:cs-eligibility>
      <v-row dense>
        <v-col cols="12" xxl="4" xl="6" lg="6">
          <v-list class="well-spaced-list" v-model="selected_child">
            <v-list-item v-for="(cs, i) in cs_eligibilities_list" :key="i" :value="i" :title="cs.name"
              subtitle="cs.type" rounded="lg" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-record" size="28" />
              </template>
            </v-list-item>

            <v-list-item lines="one" title="Add Civil Service Eligibility" @click="(add_cs_eligibility_dialog = true)"
              border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-plus" size="28" />
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </template>
    <!--End of Civil Service Eligibility-->


    <!--Start of Work Experience-->
    <template v-slot:work-exp>
      <v-row dense>
        <v-col cols="12" xxl="4" xl="6" lg="6">
          <v-list class="well-spaced-list" v-model="selected_education">
            <v-list-item v-for="(work, i) in work_experiences" :key="i" :value="i" :title="work.employer"
              :subtitle="work.position" rounded="lg" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-briefcase" size="28" />
              </template>
            </v-list-item>

            <v-list-item lines="one" title="Add Work Experience" @click="(add_work_experience_dialog = true)" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-plus" size="28" />
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </template>
    <!--End of Work Experience-->


    <!--Start of Voluntary Work-->
    <template v-slot:voluntary-exp>
      <v-row dense>
        <v-col cols="12" xxl="4" xl="6" lg="6">
          <v-list class="well-spaced-list" v-model="selected_voluntary_work">
            <v-list-item v-for="(vw, i) in voluntary_works" :key="i" :value="i" :title="vw.org" :subtitle="vw.position"
              rounded="lg" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-record" size="28" />
              </template>
            </v-list-item>

            <v-list-item lines="one" title="Add Voluntary Work" @click="(add_voluntary_work_dialog = true)" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-plus" size="28" />
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </template>
    <!--End of Voluntary Work-->


    <!--Start of L&D Interventions-->
    <template v-slot:lnd>
      <v-row dense>
        <v-col cols="12" xxl="4" xl="6" lg="6">
          <v-list class="well-spaced-list" v-model="selected_lnd">
            <v-list-item v-for="(lnd, i) in lnds" :key="i" :value="i" :title="lnd.name"
              :subtitle="`Duration: ${lnd.hours} Hours`" rounded="lg" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-record" size="28" />
              </template>
            </v-list-item>

            <v-list-item lines="one" title="Add Learning and Development Intervention" @click="(add_lnd_dialog = true)"
              border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-plus" size="28" />
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </template>
    <!--End of L&D Interventions-->


    <!--Start of Other Information-->
    <template v-slot:other>
      <v-row dense>
        <v-col cols="12" xxl="4" xl="4" lg="6">
          <v-list class="well-spaced-list" v-model="selected_skill">
            <v-list-item v-for="(skill, i) in skills" lines="one" :key="i" :value="i" :title="skill.name" rounded="lg"
              border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-record" size="28" />
              </template>
            </v-list-item>

            <v-list-item lines="one" title="Add Skill or Hobby" @click="(add_skill_dialog = true)" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-plus" size="28" />
              </template>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" xxl="4" xl="4" lg="6">
          <v-list class="well-spaced-list" v-model="selected_non_academic_distinction">
            <v-list-item v-for="(distinction, i) in non_academic_distinctions" lines="one" :key="i" :value="i"
              :title="distinction.name" rounded="lg" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-record" size="28" />
              </template>
            </v-list-item>

            <v-list-item lines="one" title="Add Non-Academic Distinction/Recognition"
              @click="(add_non_academic_distinction_dialog = true)" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-plus" size="28" />
              </template>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" xxl="4" xl="4" lg="6">
          <v-list class="well-spaced-list" v-model="selected_org_membership">
            <v-list-item v-for="(org, i) in org_memberships" lines="one" :key="i" :value="i" :title="org.name"
              rounded="lg" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-record" size="28" />
              </template>
            </v-list-item>

            <v-list-item lines="one" title="Add Association/Organization Membership"
              @click="(add_org_membership_dialog = true)" border>
              <template v-slot:prepend>
                <v-icon class="mr-4" icon="mdi-plus" size="28" />
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </template>
    <!--End of Other Information-->

    <!--User Information Pamphlet Dialogs-->
    <template v-slot:dialogs>
      <v-dialog v-model="add_child_dialog" width="400">
        <v-card flat>
          <v-toolbar border>
            <v-toolbar-title>Add Child</v-toolbar-title>
            <v-toolbar-items>
              <v-spacer />
              <v-btn @click="add_child_dialog = false" icon="mdi-close"></v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text class="pb-0">
            <v-text-field label="Full Name" :rules="[$validator.required]" />
            <v-text-field class="date-picker" label="Date of Birth" :rules="[$validator.required]" type="date"
              hide-details />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn prepend-icon="mdi-plus">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="add_education_dialog" width="400">
        <v-card border flat>
          <v-toolbar>
            <v-toolbar-title>Add Educational Background</v-toolbar-title>
            <v-toolbar-items>
              <v-spacer />
              <v-btn icon="mdi-close" @click="(add_education_dialog = false)" />
            </v-toolbar-items>

          </v-toolbar>
          <v-card-text class="pb-0">
            <v-text-field label="School Name" :rules="[$validator.required]" hide-details />

            <v-select class="my-2" label="Level" :items="$education_levels" :rules="[$validator.required]"
              hide-details />

            <span class="text-body-1 text-medium-emphasis">Period of Attendance</span>
            <v-row class="mt-1" dense>
              <v-col cols="6">
                <v-text-field label="From" :rules="[$validator.required]" type="date" hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="To" :rules="[$validator.required]" type="date" hide-details />
              </v-col>
            </v-row>

            <v-textarea class="mt-2" label="Basic Education/Degree/Course (Write in full)" rows="3" variant="outlined"
              hide-details />

            <v-textarea class="mt-2" label="Highest Level/Units Earned (if not graduated)" rows="3" variant="outlined"
              hide-details />

            <v-textarea class="mt-2" label="Scholarship/Academic Honors Received" rows="3" variant="outlined"
              hide-details />

            <v-text-field class="mt-2" label="Graduation Year (XXXX)" type="number" min="1900" max="2100"
              hide-details />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn prepend-icon="mdi-plus">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="add_cs_eligibility_dialog" width="400">
        <v-card border flat>
          <v-toolbar>
            <v-toolbar-title>Add Civil Service Eligibility</v-toolbar-title>
            <v-toolbar-items>
              <v-spacer />
              <v-btn icon="mdi-close" @click="(add_cs_eligibility_dialog = false)" />
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text class="pb-0">
            <v-text-field label="Name"
              messages="CAREER SERVICE/ RA 1080 (BOARD/ BAR) UNDER SPECIAL LAWS/ CES/ CSEE BARANGAY ELIGIBILITY / DRIVER'S LICENSE"
              rows="3" />
            <br />
            <v-text-field label="Rating (if applicable)" />
            <v-text-field label="Date of Examination/Conferment" type="date" />
            <v-text-field label="Place of Examination/Conferment" />

            <v-row dense>
              <v-checkbox label="Is License" hide-details />

              <v-col cols="12">
                <v-fade-transition>
                  <v-card-text class="pt-0 pl-2">
                    <v-row dense>
                      <v-col cols="12" xl="6" lg="6" md="6">
                        <v-text-field label="License No." rows="3" hide-details />
                      </v-col>
                      <v-col cols="12" xl="6" lg="6" md="6">
                        <v-text-field label="Date of Validity" type="date" />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn prepend-icon="mdi-plus">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="add_work_experience_dialog" width="400">
        <v-card border flat>
          <v-toolbar>
            <v-toolbar-title>Add Work Experience</v-toolbar-title>
            <v-toolbar-items>
              <v-spacer />
              <v-btn icon="mdi-close" @click="(add_work_experience_dialog = false)" />
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text class="pb-0">
            <v-text-field label="Department / Agency / Office / Company" messages="Write in full, do not abbreviate" />
            <br />
            <v-text-field label="Position Title" messages="Write in full, do not abbreviate" />
            <br />

            <v-text-field label="Monthly Salary" />

          </v-card-text>


          <v-card-actions>
            <v-spacer />
            <v-btn prepend-icon="mdi-plus">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="add_voluntary_work_dialog" width="400">
        <v-card border flat>
          <v-toolbar>
            <v-toolbar-title>Add Voluntary Work</v-toolbar-title>
            <v-toolbar-items>
              <v-spacer />
              <v-btn icon="mdi-close" @click="(add_voluntary_work_dialog = false)" />
            </v-toolbar-items>
          </v-toolbar>

          <v-card-actions>
            <v-spacer />
            <v-btn prepend-icon="mdi-plus">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="add_lnd_dialog" width="400">
        <v-card border flat>
          <v-toolbar>
            <v-toolbar-title>Add Learning and Development Interventions/Seminars Attended</v-toolbar-title>
            <v-toolbar-items>
              <v-spacer />
              <v-btn icon="mdi-close" @click="(add_lnd_dialog = false)" />
            </v-toolbar-items>
          </v-toolbar>

          <v-card-actions>
            <v-spacer />
            <v-btn prepend-icon="mdi-plus">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="add_skill_dialog" width="400">
        <v-card border flat>
          <v-toolbar>
            <v-toolbar-title>Add Skill or Hobby</v-toolbar-title>
            <v-toolbar-items>
              <v-spacer />
              <v-btn icon="mdi-close" @click="(add_skill_dialog = false)" />
            </v-toolbar-items>
          </v-toolbar>

          <v-card-actions>
            <v-spacer />
            <v-btn prepend-icon="mdi-plus">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="add_non_academic_distinction_dialog" width="400">
        <v-card border flat>
          <v-toolbar>
            <v-toolbar-title>Add Non-Academic Distinction/Recognition</v-toolbar-title>
            <v-toolbar-items>
              <v-spacer />
              <v-btn icon="mdi-close" @click="(add_non_academic_distinction_dialog = false)" />
            </v-toolbar-items>
          </v-toolbar>

          <v-card-actions>
            <v-spacer />
            <v-btn prepend-icon="mdi-plus">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="add_org_membership_dialog" width="400">
        <v-card border flat>
          <v-toolbar>
            <v-toolbar-title>Add Association/Organization Membership</v-toolbar-title>
            <v-toolbar-items>
              <v-spacer />
              <v-btn icon="mdi-close" @click="(add_org_membership_dialog = false)" />
            </v-toolbar-items>
          </v-toolbar>

          <v-card-actions>
            <v-spacer />
            <v-btn prepend-icon="mdi-plus">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!--End of User Information Pamphlet Dialogs-->
  </wizards-pamphlet>
</template>

<script lang="ts" setup>

//Start of Group Controls
//Type: Ref<Child[]>
  const children = ref([
  { name : "Rowena Rosales Abellana", birthdate : "1998-10-4" },
  { name : "Emmanuel Rosales Abellana", birthdate : "2000-08-07"}
]);
const selected_child = ref(null);
const add_child_dialog = ref(false);

//Type: Ref<Education[]>
const education_list = ref([
  { name : "Mactan Elementary School", type : "Elementary" },
  { name : "Mactan National High School", type : "Secondary" },
  { name : "International State College of the Philippines", type : "College" },
]);
const selected_education = ref(null);
const add_education_dialog = ref(false);

const account_progress = ref(35);

//Type: Ref<CSEligibility[]>
const cs_eligibilities_list = ref([
  { name : "Driver's License", rating : "", examination_date : "08/07/2009", examination_place : "LTO Cebu Regional Office", license_no : "1038159482", validity : "08/09/2016"},
]);
const selected_cs_eligibility = ref(null);
const add_cs_eligibility_dialog = ref(false);

//Type: Ref<WorkExperience[]>
const work_experiences = ref([
  { employer : "Southern Convergence", position : "Software Developer", from : "6/21/2021", to : "Present", monthly_salary : "45,000", salary_grade : 0, appointment_status : "Regular", is_gov : false }
]);
const selected_work_experience = ref(null);
const add_work_experience_dialog = ref(false);

//Type: Ref<VoluntaryWork[]>
const voluntary_works = ref([
  { org : "U.N Peacekeeper", position : "Peacekeeper Corp", from : "2/14/2016", to : "2/29/2017", hours : "1600" }
]);
const selected_voluntary_work = ref(null);
const add_voluntary_work_dialog = ref(false);

//Type: Ref<LND[]>
const lnds = ref([
  { name : "The Art of cooking Adobo", from : "3/5/2019", to : "3/10/2019", hours : 60, type : "Technical", sponsor : "HRDD of NCR" }
]);
const selected_lnd = ref(null);
const add_lnd_dialog = ref(false);

//Other Information
//Type: Ref<OtherInformation[]>
const skills = ref([
  { name : "Electronics" },
  { name : "Gardening" },
  { name : "Twerking" }
]);
const selected_skill = ref(null);
const add_skill_dialog = ref(false);

const non_academic_distinctions = ref([
  { name : "White-Belt in Taekwondo" },
  { name : "Eight-Division Boxing World Champion" },
]);
const selected_non_academic_distinction = ref(null);
const add_non_academic_distinction_dialog = ref(false);

const org_memberships = ref([
  { name : "PDP-Laban" },
  { name : "Freemasons" },
  { name : "KKK" }
]);
const selected_org_membership = ref(null);
const add_org_membership_dialog = ref(false);
//End of Group controls


function get_age(timestamp : number){
  return Math.floor(((new Date()).getTime() - timestamp) / (1000 * 60 * 60 * 24 * 365));
}
</script>

<style scoped>
::v-deep(.well-spaced-list > :not(:first-child)) {
  margin-block: 8px;
}
</style>