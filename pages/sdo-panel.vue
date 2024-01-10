
<template>
  <v-sheet width="85%" class="mx-auto ma-5">
    <v-card height="90vh">
      <v-sheet class="pa-6" height="auto" color="grey-lighten-4">
        <v-row no-gutters>
          <v-col cols="12" class="text-h6 font-weight-bold text-indigo">SCHOOL MANAGEMENT </v-col>
          <v-col cols="12" class="text-grey"> A brief overview of school. </v-col>
        </v-row>
      </v-sheet>
      <v-card-text class="overflow-y-auto h-100">
        <v-row no-gutters>
          <v-col cols="auto"> <v-btn prepend-icon="mdi-pencil-plus" @click="user_invite_dialog = true" color="indigo">
              Invite
              School Admin</v-btn>
          </v-col>
          <!-- <v-spacer />
          <v-col cols="2" class="pr-2"> <v-text-field bg-color="grey-lighten-4" variant="solo" hide-details
              append-inner-icon="mdi-magnify" /></v-col>
          <v-col cols="2"> <v-select bg-color="grey-lighten-4" variant="solo" hide-details /></v-col> -->

        </v-row>
        <v-row dense>

          <v-col cols="4" v-for="sdo, index in users_data" :key="index">
            <v-sheet class="mr-2 mt-2 " :class="{ 'elevation-4': is_hovered }" variant="tonal" color="indigo">
              <v-alert class="my-1 user-item" border="start" border-color="indigo" @click="load_school(sdo._id)">
                <div>
                  <div class="text-uppercase text-body-1 text-indigo">
                    QC Elementary School Sample Sample Sample
                  </div>

                  <div class="text-subtitle-2"> School Admin : {{ sdo.contact_number }}</div>

                  <div class="text-caption"> Email : <u class="text-blue">{{ sdo.email }}</u>
                  </div>
                  <div class="text-caption"> Address : {{ sdo.contact_number }}</div>


                </div>
              </v-alert>

            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>


    </v-card>

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
          <v-sheet class="mx-auto">
            <div class="text-subtitle-1 text-medium-emphasis pl-2">School Credentials</div>
            <v-text-field class="mx-2" density="compact" hide-details label="Email address"
              prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>
            <v-text-field class="ma-2" density="compact" hide-details label="School Name" prepend-inner-icon="mdi-home"
              variant="outlined"></v-text-field>
            <v-textarea class="ma-2" density="compact" rows="3" hide-details label="School Address"
              prepend-inner-icon="mdi-map-marker" variant="outlined"></v-textarea>
          </v-sheet>
          <v-row class="mx-2" dense>
            <v-col cols="12" class="text-subtitle-1 text-medium-emphasis"> School Admin Credentials </v-col>
            <v-col cols="4"><v-text-field v-model="user.type" label="Firstname" hide-details /></v-col>
            <v-col cols="4">
              <v-text-field v-model="user.division" :items="sdo_data" label="Middlename" hide-details /></v-col>
            <v-col cols="4">
              <v-text-field v-model="user.division" :items="sdo_data" label="Lastname" hide-details /></v-col>

            <v-col cols="4">
              <v-select v-model="user.role" :items="roles" item-title="name" label="Role" hide-details />
            </v-col>
          </v-row>
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
  </v-sheet>
</template>

<script setup lang="ts">
const router = useRouter();
import { ref } from 'vue';
import swal from 'sweetalert';

import useAuth from "~/store/auth";

definePageMeta({ layout: "std-applicant" })


onBeforeMount(() => {
  get_users(),
    get_sdo(),
    get_apts()
})

const auth = useAuth().user;

const { $rest } = useNuxtApp();



const is_hovered = ref(false);



const load_school = (id) => {
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
const items = ref([
  'School Division Office Users', 'Regional Office Users',
]);

const user_invite_dialog = ref(false);

async function create_user() {
  const { data, error } = await $rest('user/create-user', {
    method: "POST",
    body: { ...user.value }

  })
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
const users_data = ref<SmsUser[]>([])
async function get_users() {
  const { data, error } = await $rest('user/get-users', {
    method: "GET",
  })
  users_data.value = data
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
.user-item {
  transition: background-color 0.3s ease-in-out;
}

.user-item:hover {
  background-color: #E8EAF6;
}
</style>