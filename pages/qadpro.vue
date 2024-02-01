
<template>
  <v-sheet class="pa-5">

    <v-row no-gutters justify="center">
      <v-col cols="12"> <v-row no-gutters justify="center">
          <v-col cols="9">
            <v-row no-gutters>
              <v-col cols="12" class="text-h4 font-weight-bold text-indigo">New Government Permit </v-col>
              <v-col cols="12" class="text-grey "> A brief overview of new government permit. </v-col> </v-row>
          </v-col>
          <v-spacer />
          <v-col cols="auto" class="mt-3"><v-switch v-model="sample" label="Enable Application Submission" color="indigo"
              :model-value="true" hide-details></v-switch></v-col>
        </v-row></v-col>
      <v-col cols="12">
        <v-sheet border>
          <v-tabs v-model="tab" bg-color="amber" color="white" centered stacked>
            <v-tab v-for=" i  in  8 " :key="i" :value="'tab-' + i">
              <v-badge :color="getTextColor(i)" class="pb-4" :content="getNumberForTab(i)">

              </v-badge>
              {{ getTabLabel(i) }}
            </v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item v-for=" i  in  8 " :key="i" :value="'tab-' + i">
              <v-sheet height="78vh" class="overflow-y-auto d-flex flex-wrap ga-3">

                <!-- <v-row no-gutters justify="end"> <v-col cols="3" class="mb-1"> <v-text-field
                        prepend-inner-icon="mdi-magnify" variant="solo" hide-details /></v-col>
                  </v-row> -->
                <v-row no-gutters>
                  <v-col cols="12">
                    <commons-qad title="Application Summary" subtitle="A brief overview of new permit application."
                      icon="mdi-account" prepend-icon="mdi-account" :items="users_data"
                      :display_types="['grid', 'list', 'table']">
                      <template v-slot:item="{ value, index, display }">
                        <v-card :key="index" border class="pa-4 ma-1 elevation-2 user-item" variant="outlined"
                          color="blue">
                          <div class="d-flex mb-1">
                            <div class=" font-weight-medium text-h6">{{ value.university }}</div>
                            <v-spacer />
                            <div> <v-chip density="compact" variant="outlined"
                                class="text-uppercase text-overline font-weight-bold" color="success">{{
                                  value.prNumber
                                }}</v-chip></div>
                          </div>
                          <div style="margin-top: -2mm" class="text-grey mb-2 "> {{ value.division }}</div>
                          <v-row no-gutters class="text-black">
                            <v-col cols="4"> Application Date</v-col>
                            <v-col cols="8" class="text-blue text-underlined ">: {{ value.applicationDate }}</v-col>
                          </v-row>
                          <v-row no-gutters class="text-black">
                            <v-col cols="4"> Course/Program</v-col>
                            <v-col cols="8">: {{ value.courseProgram }}</v-col>
                          </v-row>
                          <v-row no-gutters class="text-black">
                            <v-col cols="4"> School Year</v-col>
                            <v-col cols="8"> : {{ value.schoolYear }}</v-col>
                          </v-row>
                          <!-- <v-row no-gutters>
                <v-col cols="4"> Division</v-col>
                <v-col cols="8"> : {{ value.division }}</v-col>
              </v-row> -->


                          <v-row no-gutters class="mt-5"> <v-btn density="compact" @click="history = true" color="amber">
                              ACTION</v-btn></v-row>
                        </v-card>
                      </template>
                      <!-- <template v-slot:item="{ value, index, display }">
                    <v-data-table :items="users_data" :headers="headers" class="elevation-1">
                    </v-data-table>

                  </template> -->
                    </commons-qad>
                  </v-col>
                </v-row>



              </v-sheet>
            </v-window-item>
          </v-window>
        </v-sheet>

      </v-col>
    </v-row>


    <!-- Dialog -->
    <v-dialog v-model="user_invite_dialog" max-width="40%">
      <v-sheet>
        <v-toolbar color="indigo" border>
          <v-list-item class="pl-2" density="compact">
            <template v-slot:prepend>
              <v-avatar class="mr-1" variant="text">
                <v-icon icon="mdi-account" dark />
              </v-avatar>
            </template>
            <v-list-item-title> USER INVITE FORM</v-list-item-title>
            <v-list-item-subtitle> Enter User Information</v-list-item-subtitle>
          </v-list-item>
          <v-spacer />
          <v-btn @click="user_invite_dialog = false" class="mr-0" rounded="0" icon="mdi-close" />
        </v-toolbar>
        <v-card-text>
          <v-form ref="user_form">
            <v-row dense>
              <v-col cols="12"><v-text-field v-model="user.email" density="compact" label="Email address"
                  prepend-inner-icon="mdi-email-outline" required
                  :rules="[(v) => /.+@.+/.test(v) || 'Invalid Email address']" /></v-col>
              <v-col cols="4"><v-text-field v-model="user.first_name" density="compact" hide-details="auto"
                  label="Firstname" required :rules="[v => !!v || 'Firstname is required']" /></v-col>
              <v-col cols="4"><v-text-field v-model="user.middle_name" density="compact" hide-details="auto"
                  label="Middlename" /></v-col>
              <v-col cols="4"><v-text-field v-model="user.last_name" density="compact" hide-details="auto"
                  label="Lastname" required :rules="[v => !!v || 'Lastname is required']" /></v-col>
              <v-col cols="4"><v-text-field v-model="user.contact_number" density="compact" hide-details="auto"
                  label="Contact Number" type="tel" :rules="[v => !!v || 'Contact Number is required']" /></v-col>
              <v-col cols="12"> Roles and Designation </v-col>
              <v-col cols="6"><v-select v-model="user.side" label="Type"
                  :items="['School Division Office', 'Regional Office']" hide-details="auto" required
                  :rules="[v => !!v || 'Type is required']" /></v-col>
              <v-col cols="6" v-if="user.type !== 'Regional Office'">
                <v-select v-model="user.designation_information.division" :items="sdo_data" label="Division"
                  item-value="_id" hide-details="auto" /></v-col>
              <v-col cols="6">
                <v-select v-model="user.role" :items="roles" item-title="name" item-value="_id" label="Role"
                  hide-details="auto" :rules="[v => !!v || 'Role is required']" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-row dense justify="center">
            <v-col cols="4">
              <v-btn @click="create_user" variant="tonal" color="indigo" block>
                <v-icon class="pr-2" size="28"> mdi-message-text-fast</v-icon> Send Invite
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-sheet>
    </v-dialog>

    <commons-dialog v-model="create_sdo_dialog" max-width="35%" icon="mdi-school" title="Create School Division Office"
      @submit="create_sdo" submitText="Submit">
      <v-card-text>
        <v-form ref="create_sdo_form">
          <v-text-field v-model="sdo.title" label=" Division" hide-details="auto" required
            :rules="[v => !!v || 'Division is required']" />
          <v-textarea class="mt-2" v-model="sdo.address" rows="3" label="Division Address" hide-details="auto"
            prepend-inner-icon="mdi-map-marker" required :rules="[v => !!v || 'Address is required']" />
          <v-text-field class="mt-2" v-model="sdo.email" label="Email Address" hide-details="auto"
            prepend-inner-icon="mdi-email-outline" required
            :rules="[(v) => /.+@.+/.test(v) || 'Invalid Email address']" />
          <v-text-field class="mt-2" v-model="sdo.telephone" type="tel" label="Telephone Number" hide-details="auto"
            prepend-inner-icon="mdi-phone" />
        </v-form>
      </v-card-text>
    </commons-dialog>


    <v-dialog v-model="history" max-width="35%" submitText="Submit">
      <v-sheet border class="w-45">
        <v-toolbar color="amber" border>
          <v-list-item class="pl-2" density="compact">
            <template v-slot:prepend>
              <v-avatar size="34" class="mr-1" variant="text">
                <v-icon size="30" icon="mdi-history" dark />
              </v-avatar>
            </template>
            <v-list-item-title class="text-h6">Application History</v-list-item-title>
          </v-list-item>
        </v-toolbar>
        <v-card-text>
          <v-sheet class="overflow-y-auto" height="60vh">
            <v-sheet variant="tonal" class="elevation-2 px-3 pb-3 mx-auto">
              <v-card-title class="text-uppercase font-weight-bold text-h6"> Samar State University
              </v-card-title>
              <v-card-subtitle>
                PR Number : <b> PR-99887</b>
              </v-card-subtitle>
              <v-card-subtitle class="text-caption">Date Applied : <b>7/21/2023, 3:45:30 PM </b></v-card-subtitle>
            </v-sheet>
            <v-sheet width="auto" border>
              <v-timeline side="end">
                <v-timeline-item icon="mdi-check" dot-color="success">
                  <v-sheet border class="elevation-2 pa-3 mr-3" width="430">

                    <v-card-subtitle>
                      <b>SCHOOL</b>
                    </v-card-subtitle>
                    <v-card-subtitle>
                      Your application has been approved by <b> Ralyn Diaz Lagarto </b>.
                    </v-card-subtitle>
                    <v-card-subtitle class="text-caption">Date Approved <span class="text-blue"> : 7/21/2023, 3:45:30 PM
                      </span></v-card-subtitle>
                  </v-sheet>
                </v-timeline-item>

                <v-timeline-item icon="mdi-check" dot-color="success">
                  <v-sheet border class="elevation-2 pa-3 mr-3" width="430">

                    <v-card-subtitle>
                      <b>Schools Division Office</b>
                    </v-card-subtitle>
                    <v-card-subtitle>
                      Application has been saved by <b> Ralyn Diaz Lagarto </b>.
                    </v-card-subtitle>
                    <v-card-subtitle class="text-caption">Date Approved <span class="text-blue"> : 7/20/2023, 11:26:49 AM
                      </span></v-card-subtitle>
                  </v-sheet>
                </v-timeline-item>
                <v-timeline-item icon="mdi-clock-edit-outline" dot-color="orange">
                  <v-sheet border class="elevation-2 pa-3 mr-3" width="430">
                    <v-card-subtitle>
                      Your application is being processed by the <br /><b> Evaluator</b>.
                    </v-card-subtitle>

                  </v-sheet>
                </v-timeline-item>
                <v-timeline-item icon="mdi-alpha-x" dot-color="error">
                  <v-sheet border class="elevation-2 pa-3 mr-3" width="430">

                    <v-card-subtitle>
                      <b class="text-error">(Schools Division Office) Disapproved</b>
                    </v-card-subtitle>
                    <v-card-subtitle>
                      Application has been dissaproved by <b> Ralyn Diaz Lagarto </b>.
                    </v-card-subtitle>
                    <v-card-subtitle class="text-caption">Date Disapproved <span class="text-red"> : 7/20/2023, 11:26:49
                        AM
                      </span></v-card-subtitle>
                  </v-sheet>
                </v-timeline-item>


              </v-timeline>





            </v-sheet>
            <v-divider />

          </v-sheet>
        </v-card-text>
        <v-card-actions>
          <v-row dense justify="center">
            <v-col cols="5">
              <v-btn variant="tonal" color="error" block>CLOSE</v-btn>
            </v-col>

          </v-row>
        </v-card-actions>
      </v-sheet>


    </v-dialog>
  </v-sheet>
</template>

<script setup lang="ts">
const router = useRouter();
import { ref } from 'vue';
import swal from 'sweetalert';

import useAuth from "~/store/auth";

definePageMeta({ layout: "std-systems" })


onBeforeMount(() => {
  Promise.all([

    get_sdo(),
    get_apts()
  ])
})


const auth = useAuth().user;

const { $rest, $user_type, $ro_roles, $sdo_roles } = useNuxtApp();


const is_hovered = ref(false);
const sample = ref();
const history = ref(false);

const tab = ref(null);
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const textColor = ref([
  'success',
  'success',
  'success',
  'success',
  'success',
  'success',
  '#FF8A80',
  'success',
]);

const getTabLabel = (index: number) => {
  const labels = [
    'Evaluation',
    'Review',
    'Validation',
    'Approval',
    'Printing',
    'Completed',
    'Disapproved',
    'SDO Approval',
    'Deficiency',
  ];
  return labels[index - 1] ?? '';
};


const headers = [
  { text: 'University', value: 'university' },
  { text: 'PR Number', value: 'prNumber' },
  { text: 'Division', value: 'division' },
  { text: 'Application Date', value: 'applicationDate' },
  { text: 'Course/Program', value: 'courseProgram' },
  { text: 'School Year', value: 'schoolYear' },
];

const getNumberForTab = (index: number) => {
  // Adjust this logic as needed
  return 1 + index;
};

const getTextColor = (index: number) => {
  return textColor.value[index - 1] ?? 'black';
};

const user = ref<SmsUser>({
  username: "",
  password: "",
  admin: false,
  email: "",
  last_name: "",
  middle_name: "",
  first_name: "",
  contact_number: "",
  side: "",
  role: "",
  designation_information: {
    division: "",
    school: "",
  },
  status: "pending",
});


/**
 * 
 */

const users_data = ref([
  {
    id: 1,
    university: 'Samar State University',
    prNumber: 'PR-435',
    applicationDate: '7/19/2023, 1:13:52 PM',
    courseProgram: 'Kindergarten',
    schoolYear: '2020-2021',
    division: 'Marikina City',
  },
  {
    id: 2,
    university: 'Example University',
    prNumber: 'PR-123',
    applicationDate: '7/20/2023, 2:30:45 PM',
    courseProgram: 'Elementary Education',
    schoolYear: '2021-2022',
    division: 'Example Division',
  },
  {
    id: 3,
    university: 'Another University',
    prNumber: 'PR-789',
    applicationDate: '7/21/2023, 3:45:30 PM',
    courseProgram: 'High School Science',
    schoolYear: '2022-2023',
    division: 'Another Division',
  },
  {
    id: 4,
    university: 'City College',
    prNumber: 'PR-567',
    applicationDate: '7/22/2023, 4:20:15 PM',
    courseProgram: 'College of Arts',
    schoolYear: '2023-2024',
    division: 'City Division',
  },
  // {
  //   id: 5,
  //   university: 'Tech Institute',
  //   prNumber: 'PR-246',
  //   applicationDate: '7/23/2023, 5:10:00 PM',
  //   courseProgram: 'Computer Science',
  //   schoolYear: '2024-2025',
  //   division: 'Tech Division',
  // },
  // {
  //   id: 6,
  //   university: 'Arts Academy',
  //   prNumber: 'PR-789',
  //   applicationDate: '7/24/2023, 6:30:45 PM',
  //   courseProgram: 'Fine Arts',
  //   schoolYear: '2025-2026',
  //   division: 'Arts Division',
  // },
  // {
  //   id: 7,
  //   university: 'Medical College',
  //   prNumber: 'PR-890',
  //   applicationDate: '7/25/2023, 7:15:30 PM',
  //   courseProgram: 'Medicine',
  //   schoolYear: '2026-2027',
  //   division: 'Medical Division',
  // },
  // {
  //   id: 8,
  //   university: 'Sports Academy',
  //   prNumber: 'PR-456',
  //   applicationDate: '7/26/2023, 8:00:15 PM',
  //   courseProgram: 'Athletics',
  //   schoolYear: '2027-2028',
  //   division: 'Sports Division',
  // },
  // {
  //   id: 9,
  //   university: 'Music School',
  //   prNumber: 'PR-123',
  //   applicationDate: '7/27/2023, 9:45:00 PM',
  //   courseProgram: 'Music Theory',
  //   schoolYear: '2028-2029',
  //   division: 'Music Division',
  // },

]);

const roles = ref([]);
const get_apts = async () => {

  const domain = auth.access[0].domain_id;
  if (!domain) return swal({ title: "Fuck" })
  const { data, error } = await $rest("admin/policy-authority/get-apts", { method: "GET", query: { domain_id: domain } });

  const apts = data.filter((v: any) => v.internal === false);
  roles.value = apts;
}



const user_invite_dialog = ref(false);
const user_form = ref();

async function create_user() {
  if (!user_form.value.isValid) {
    return swal({ title: "Invalid Email" })
  }
  swal({ title: "User sucessfully invited!" })
  const { data, error } = await $rest('user/create-user', {
    method: "POST",
    body: { ...user.value }

  })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  get_users()
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}


const sdo = ref<Sdo>({
  title: "",
  address: "",
  email: "",
  telephone: "",
})

/**
 * SDO 
 */
const create_sdo_dialog = ref(false)
const create_sdo_form = ref();

async function create_sdo() {
  if (!create_sdo_form.value.isValid) {
    return swal({ title: "Completed required field!" })
  }
  const { data, error } = await $rest('sms-sdo/create-sdo', {
    method: "POST",
    body: { ...sdo.value }
  });

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  get_sdo();
  create_sdo_dialog.value = false;
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
const route_to_sdo = (id: string) => {
  router.push({
    name: 'sdo',
    query: {
      id: id
    }
  });
}
const sdo_data = ref<Sdo[]>([]);
async function get_sdo() {
  const { data, error } = await $rest('sms-sdo/get-sdo', {
    method: "GET",
  })
  sdo_data.value = data
}

</script>
<style scoped>
* {
  font-size: 12px
}

.user-item {
  transition: background-color 0.3s ease-in-out;
}

.user-item:hover {
  background-color: #dde4ff;
}
</style>