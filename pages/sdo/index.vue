<template>
  <div>


    <v-row no-gutters>
      <v-col cols="12" xl="8" lg="8" md="12" sm="12"><v-btn prepend-icon="mdi-pencil-plus"
          @click="user_invite_dialog = true" color="indigo" rounded="0">
          Invite
          User</v-btn>
        <commons-sms class="my-2 mr-3" title="SDO USER MANAGEMENT" subtitle="A brief overview of users." rounded="lg"
          :items="users_data" :display_types="['grid', 'table']">
          <template v-slot:item="{ value, index, display }">
            <v-sheet :key="index" border class="pa-2">
              <div class="d-flex mb-1">
                <div class="text-uppercase  text-indigo text-body-1"> {{ value.first_name
                  }}
                  {{
                    value.last_name }}
                </div>
                <v-spacer />
                <div> <v-chip density="compact" class="text-uppercase text-overline" color="success">{{
                  value.status }}</v-chip></div>
              </div>
              <div> {{ value.role }} <span v-if="value.division">
                  {{
                    value.division.title
                  }}</span>
              </div>
              <div class="text-caption text-capitalize mb-2">{{ value?.side }}</div>
              <div class="text-caption"> <v-icon color="red-lighten-3"> mdi-email</v-icon> <u class="text-blue">{{
                value.email }}</u>
              </div>
              <div class="text-caption"> <v-icon color="green-lighten-3"> mdi-phone</v-icon> {{
                value.contact_number }}</div>
            </v-sheet>
          </template>

          <template v-slot:table="{ items }">
            <v-sheet border> <v-data-table :items="items" :headers="user_headers">
                <template v-slot:item.full_name="{ item }">
                  <span color="primary" density="compact">{{ item.selectable.first_name }} {{ item.selectable.last_name
                    }}
                  </span>
                </template>
                <!-- <template v-slot:item.actions="{ item }">
                  <v-btn color="primary" density="compact" variant="tonal">Actions</v-btn>
                </template> -->

              </v-data-table></v-sheet>
          </template>
        </commons-sms>

      </v-col>
      <v-col cols="12" xl="4" lg="4" md="12" sm="12" class="mt-15">

        <v-toolbar color="transparent">
          <span class="ml-2 text-subtitle-1"> School/s</span>
          <v-spacer />
          <v-tooltip text="Click to add School" location="top">
            <template v-slot:activator="{ props }">
              <v-btn variant="tonal" prepend-icon="mdi-pencil-plus" @click="create_school_dialog = true" v-bind="props"
                color="indigo">Add SCHOOL</v-btn>
            </template>
          </v-tooltip>
        </v-toolbar>



        <v-card class="ma-3" v-for="(school, index) in school_data" :key="index">
          <v-alert class=" maintenance-item" color="white" @click="route_to_school(school._id)"
            :class="{ 'elevation-4': is_hovered }" border="start" border-color="indigo">
            <div class=" text-uppercase 
">{{ school.title }}
            </div>
            <div>
              <v-icon color="blue-lighten-2"> mdi-map-marker</v-icon> {{
                school.address }}
            </div>
            <div class="text-blue font-italic text-decoration-underline">
              <v-icon color="red"> mdi-email</v-icon> {{ school.email }}
            </div>
            <div>
              <v-icon color="success"> mdi-phone</v-icon> {{ school.telephone }}
            </div>
          </v-alert>
        </v-card>

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
          <v-form ref="sdo_user_form">
            <v-row dense>
              <v-col cols="12"><v-text-field v-model="sdo_user.email" density="compact" label="Email address"
                  prepend-inner-icon="mdi-email-outline" required
                  :rules="[(v) => /.+@.+/.test(v) || 'Invalid Email address']" /></v-col>
              <v-col cols="4"><v-text-field v-model="sdo_user.first_name" density="compact" hide-details="auto"
                  label="Firstname" required :rules="[v => !!v || 'Firstname is required']" /></v-col>
              <v-col cols="4"><v-text-field v-model="sdo_user.middle_name" density="compact" hide-details
                  label="Middlename" /></v-col>
              <v-col cols="4"><v-text-field v-model="sdo_user.last_name" density="compact" hide-details
                  label="Lastname" /></v-col>
              <v-col cols="4"><v-text-field v-model="sdo_user.contact_number" density="compact" hide-details
                  label="Contact Number" /></v-col>
              <v-col cols="12"> Roles and Designation </v-col>
              <v-col cols="6"><v-select v-model="sdo_user.side" label="Type"
                  :items="['School Division Office', 'School']" hide-details /></v-col>


              <v-col cols="6">
                <v-select v-model="sdo_user.role" :items="roles" item-title="name" item-value="_id" label="Role"
                  hide-details />
              </v-col>
              <v-col cols="6" v-if="sdo_user.side == 'School'">
                <v-select v-model="sdo_user.designation_information.school" label="School" :items="school_data"
                  item-value="_id" hide-details /></v-col>

            </v-row> </v-form>


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

    <commons-dialog v-model="create_school_dialog" max-width="35%" icon="mdi-school" title="Create School"
      @submit="create_school" submitText="Submit">
      <v-card-text>
        <v-text-field v-model="school.title" label=" School" hide-details />
        <v-textarea class="mt-2" v-model="school.address" rows="3" label="School Address" hide-details
          prepend-inner-icon="mdi-map-marker" />
        <v-text-field class="mt-2" v-model="school.email" label="Email Address" hide-details
          prepend-inner-icon="mdi-email-outline" />
        <v-text-field class="mt-2" v-model="school.telephone" label="Telephone Number" hide-details
          prepend-inner-icon="mdi-phone" />
      </v-card-text>
    </commons-dialog>
  </div>
</template>

<script setup lang="ts">

const router = useRouter();
const route = useRoute();

import { ref } from 'vue';
import swal from 'sweetalert';
import useAuth from "~/store/auth";

definePageMeta({ layout: "barren" })

onBeforeMount(() => {
  Promise.all([
    get_users(),
    get_apts(),
    get_school(),
  ])
})

const auth = useAuth().user;
const { $rest } = useNuxtApp();

const is_hovered = ref(false);


const user_headers = ref([
  { title: "Full Name", key: "full_name" },
  { title: "Role", key: "role" },
  { title: "Side", key: "side" },
  { title: "Email Address", key: "email" },
  { title: "Conatact Number", key: "contact_number" },
  // { title: "Actions", key: "actions" },
])

const sdo_user = ref<SmsUser>({
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
    division: route.query.id,
    school: "",
  },
  status: "pending",
});

const route_to_school = (id: string) => {
  router.push({
    name: 'school',
    query: {
      id: id
    }
  });
}
/**
 * 
 */

const roles = ref([]);
const get_apts = async () => {

  const domain = auth.access[0].domain_id;
  if (!domain) return swal({ title: "Fuck" })
  const { data, error } = await $rest("admin/policy-authority/get-apts", { method: "GET", query: { domain_id: domain } });

  const apts = data.filter((v: any) => v.internal === false);
  roles.value = apts;
}




const user_invite_dialog = ref(false);
const sdo_user_form = ref()
async function create_user() {
  const { data, error } = await $rest('sms-sdo/create-sdo-user', {
    method: "POST",
    body: { ...sdo_user.value }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  user_invite_dialog.value = ref(false)
  get_users()
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
const users_data = ref<SmsUser[]>([])
async function get_users() {
  const { data, error } = await $rest('sms-sdo/get-sdo-users', {
    method: "GET",
    query: { id: route.query.id }
  });
  users_data.value = data;

}

const school = ref<School>({
  title: "",
  address: "",
  email: "",
  telephone: "",
  division: route.query.id
})

const create_school_dialog = ref(false)
async function create_school() {
  const { data, error } = await $rest('sms-school/create-school', {
    method: "POST",
    body: { ...school.value }

  })

  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  get_school();
  create_school_dialog.value = false;
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
const school_data = ref<School[]>([]);
async function get_school() {
  const division_id = route.query.id;
  const { data, error } = await $rest('sms-school/get-school', {
    method: "GET",
  })
  if (error) return swal({
    title: "Error",
    text: error,
    icon: "error",
    buttons: { ok: false, cancel: false }
  })

  school_data.value = data.filter(school => school.division === division_id);

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
  background-color: #E8EAF6;
}
</style>