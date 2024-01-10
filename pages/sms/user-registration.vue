
<template>
  <v-container class="h-100 ">
    <v-sheet color="indigo-lighten-5">
      <h2 class="text-uppercase text-indigo px-4 pt-5"> Registration Form</h2>
      <v-card-title class=" font-weight-thin text-grey text-body-1">
        Greetings to the Reclassification System. Kindly establish your account!
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row dense>
          <v-col cols="7" class="pa-2">
            <v-row dense>
              <v-col cols="12" class="font-weight-bold text-indigo"> Personal Information </v-col>
              <v-col cols="4"> <v-text-field label="Lastname" hide-details density="compact" />
              </v-col>
              <v-col cols="4"> <v-text-field label="Firstname" hide-details density="compact" /> </v-col>
              <v-col cols="4"> <v-text-field label="Middlename" hide-details density="compact" /> </v-col>
              <v-col cols="4"> <v-text-field label="Birthday" hide-details density="compact" type="date" />
              </v-col>
              <v-col cols="4"> <v-select label="Division" hide-details density="compact" />
              </v-col>
              <v-col cols="4"> <v-text-field label="Role" hide-details density="compact" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4" class="pa-2">
            <v-row dense>
              <v-col cols="12" class="font-weight-bold text-indigo"> Credentials</v-col>
              <v-col cols="12"> <v-text-field bg-color="indigo-lighten-4" label="mariannemaepaclian@gmail.com"
                  hide-details />
              </v-col>
              <v-col cols="12"> <v-text-field bg-color="indigo-lighten-4" label="Password" hide-details />
              </v-col>
              <v-col cols="12"> <v-text-field bg-color="indigo-lighten-4" label="Confirm Password" hide-details />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="7">
            <v-row class="pa-2" justify="center" dense>
              <v-col cols="12" class="font-weight-bold text-indigo">Signature </v-col>
              <v-col cols="6">
                <center> <v-img class="ma-2" :width="80" aspect-ratio="4/3" cover src="/yanyan.jpg" />
                  <v-btn color="indigo" variant="outlined" density="compact"> Upload Profile</v-btn>
                </center>
              </v-col>
              <v-col cols="6">
                <center> <v-img class="ma-2" :width="80" aspect-ratio="4/3" cover src="/yanyan.jpg" />
                  <v-btn color="indigo" variant="outlined" density="compact"> Attach Signature</v-btn>
                </center>

              </v-col>
            </v-row>
          </v-col>
          <!-- <v-col cols="5">
            <v-row dense>
              <v-col cols="12" class="font-weight-bold text-indigo"> School Information (FOR SCHOOL ADMIN ONLY)</v-col>
              <v-col cols="6"><v-text-field label="Name of School" hide-details /></v-col>

              <v-col cols="6"><v-text-field label="School Address" hide-details /></v-col>
              <v-col cols="6"><v-text-field label="Telephone Number" hide-details /></v-col>

              <v-col cols="6"><v-select label="School Type" hide-details :items="$school_type" /></v-col>
              <v-col cols="6"><v-text-field label="School Email" hide-details /></v-col>
              <v-col cols="6"><v-text-field label="School ID" hide-details /></v-col>
            </v-row>
          </v-col> -->
        </v-row>
      </v-card-text>
      <v-divider />
      <v-row justify="center" dense>
        <v-col cols="3" class="my-3"> <v-btn color="indigo" block> SUBMIT</v-btn></v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { $divisions, $school_type } = useNuxtApp();


const count = ref(10);

const items = ref([
  'School Division Office Users', 'Regional Office Users',
]);

const school_profile_dialog = ref({
  dialog: false,
  title: 'School Profile',
  subtitle: 'Your educational background and civil service information',
});

const invite_school_dialog = ref({
  dialog: false,
  title: 'School Profile',
  subtitle: 'Your educational background and civil service information',
});
</script>
