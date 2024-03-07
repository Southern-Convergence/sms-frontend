
<template>
  <v-sheet height="100vh" class="d-flex align-center justify-center ">
    <v-sheet class="h-100 w-100 d-flex align-center justify-center" color="#ECEFF1">
      <v-card class="w-45">
        <v-toolbar color="indigo" border>
          <v-list-item class="pl-2" density="compact">
            <template v-slot:prepend>
              <v-avatar class="mr-1" variant="text">
                <v-icon icon="mdi-history" dark />
              </v-avatar>
            </template>
            <v-list-item-title>Reclassification Application History</v-list-item-title>
          </v-list-item>
          <v-spacer>
          </v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-sheet class="mx-auto">
            <v-sheet color="indigo-lighten-5" class="pa-3 mx-auto">
              <v-card-title class="text-uppercase font-weight-bold"> {{ applicant_history.full_name }}
              </v-card-title>
              <v-card-subtitle>
                Control Number : <b class="text-indigo">{{ applicant_history.control_number }}</b>
              </v-card-subtitle>
              <v-card-subtitle class="text-caption">Date Applied : <b> {{ new
                Date(applicant_history.created_date).toLocaleString() }}</b></v-card-subtitle>
            </v-sheet>
            <v-card width="auto" class="overflow-y-auto py-4 " height="70vh">
              <v-card-text>
                <v-alert class="pa-5 ma-3" color="#2A3B4D" density="compact" theme="dark" border
                  v-for="signatory, index in   applicant_history.request_log " :key="signatory"
                  :icon="icon_display(signatory)">
                  <v-card-subtitle>
                    Your application has been {{ !signatory.remarks.length > 0 ? 'Approved' : 'Dissapproved' }} by <b>{{
                      signatory.signatory }} <br /> {{
    signatory.side }} {{ signatory.role }}</b>.
                  </v-card-subtitle>
                  <v-card-subtitle class="text-caption">Date Approved <span class="text-blue"> : {{ new
                    Date(signatory?.timestamp).toLocaleString() }}</span></v-card-subtitle>

                  <v-card border color="error" variant="tonal" class="pa-2 mx-4" v-if="signatory.remarks.length"
                    v-for="  remarks, index   in   signatory.remarks  " :key="remarks">
                    <v-card-subtitle class="font-weight-bold ">
                      Reason/Remarks :
                    </v-card-subtitle>
                    <v-card-subtitle class="text-white"> Attachment : {{ remarks.description }} <br /> Reason : {{
                      remarks.remarks
                    }} <br /> Date Dissapproved : {{ new Date(remarks?.timestamp).toLocaleString()
}}</v-card-subtitle>

                  </v-card>
                </v-alert>
              </v-card-text>








            </v-card>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-sheet>
</template>

<script setup lang="ts">
const router = useRouter();

const { $rest } = useNuxtApp();
onBeforeMount(() => {
  get_signatory();
});
const route = useRoute();
const applicant_history = ref({} as Applicant)
async function get_signatory() {
  const { data, error } = await $rest('new-applicant/get-signatory', {
    method: 'GET',
    query: {
      id: route.query.id
    }
  })
  applicant_history.value = data
}
const icon_display = (signatory) => {
  if (signatory.remarks && signatory.remarks.length > 0) {
    return 'mdi-check-circle';
  } else {
    return 'mdi-alpha-x-circle';
  }
};




</script>
