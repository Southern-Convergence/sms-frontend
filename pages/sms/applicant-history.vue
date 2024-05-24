<template>
  <v-sheet height="100vh" class="d-flex align-center justify-center ">
    <v-sheet class="h-100 w-100 d-flex align-center justify-center" color="#ECEFF1">
      <v-card rounded="lg" width="40%">
        <v-toolbar color="indigo" border>
          <v-list-item class="pl-2" density="compact">
            <template v-slot:prepend>
              <v-avatar class="mr-1" variant="text">
                <v-icon icon="mdi-history" dark />
              </v-avatar>
            </template>
            <v-list-item-title>Staffing Modification Application History</v-list-item-title>
          </v-list-item>
          <v-spacer>
          </v-spacer>
        </v-toolbar>

        <v-sheet class="mx-auto">

          <v-sheet color="grey-lighten-4" class="pa-3 mx-auto">
            <v-card-title class="text-uppercase font-weight-bold pl-5 text-indigo"> {{ applicant_history.full_name }}
            </v-card-title>
            <v-card-subtitle class="pl-5">
              Control Number : <b class="text-indigo">{{ applicant_history.control_number }}</b>
            </v-card-subtitle>
            <v-card-subtitle class="text-caption pl-5">Application Date : <b> {{ new
                Date(applicant_history.created_date).toLocaleString() }}</b></v-card-subtitle>
          </v-sheet>

          <v-card class="overflow-y-auto py-4" height="70vh" width="100%">

            <v-card-text>

              <v-btn v-if=" applicant_history.request_log && applicant_history.request_log.length &&
            applicant_history.request_log[0].remarks.length" class="ml-5" rounded="md"
                @click="update_applicant(applicant_history._id)" color="primary" density="compact">
                Update
                Application
              </v-btn>
              <v-alert v-if="applicant_history?.request_log && applicant_history.request_log.length > 0"
                class="pa-5 ma-5" border rounded="lg" v-for="(att, index) in applicant_history?.request_log.reverse()"
                :key="index">
                <v-card-subtitle>
                  Status : <span class="text-uppercase"> {{ att.status }} </span>
                </v-card-subtitle>
                <v-card-subtitle>
                  Signatory : <b> {{ att.signatory }}</b>
                </v-card-subtitle>
                <v-card-subtitle>
                  Office :
                  <b>
                    {{ att.side === 'SDO' ? 'Schools Division Office'
                    : (att.side === 'School' ? 'School' : 'Regional Office') }}
                  </b>

                </v-card-subtitle>
                <v-card-subtitle class="text-caption" v-if="user">Date <span class="text-blue"> :
                    {{ new
                    Date(att?.timestamp).toLocaleString() }}</span>
                </v-card-subtitle>
                <v-card-subtitle v-if="att?.remarks?.length">
                  <v-chip class="mt-2" density="compact" color="error">
                    Reason/Remarks :
                  </v-chip>
                  <v-card border class="ma-2 pa-2" v-for="(remarks, index) in att.remarks" :key="index">
                    <v-card-subtitle> Attachment : {{ remarks.description }} <br /> Reason : {{
                      remarks.remarks }} <br /> Date Disapproved : <span class="text-red text-caption"> {{ new
                        Date(remarks?.timestamp).toLocaleString() }}</span>
                    </v-card-subtitle>
                  </v-card>
                </v-card-subtitle>
              </v-alert>

              <v-alert v-else-if="applicant_history?.request_log && applicant_history.request_log.length === 0"
                class="pa-5 ma-5" border rounded="md" type="info" variant="tonal">
                Your application is being processed by the <b>Principal</b>.
              </v-alert>
            </v-card-text>
          </v-card>
        </v-sheet>

      </v-card>
    </v-sheet>
    <div style="position: fixed; bottom: 20px; right: 20px;" class="d-print-none">

      <v-btn icon="mdi-keyboard-return" size="large" color="primary" @click="$router.back()">
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
const router = useRouter();
import useAuth from "~/store/auth";
const user = useAuth().user;

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

const update_applicant = (id) => {
  router.push({
    name: 'sms-new-applicant-form',
    query: {
      id: id
    }
  });
}




</script>
