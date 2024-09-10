<template>
  <v-sheet height="100vh" class="d-flex align-center justify-center">
    <!-- <v-card rounded="lg" width="40%">
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
    <v-card-text v-if="applicant_history?.request_log && applicant_history.request_log.length > 0">
      <v-alert class="pa-5 ma-5 elevation-3" rounded="lg" v-for="(att, index) in reverse_logs" :key="index">
        <v-card-subtitle v-if="applicant_history.request_log?.slice(-1)[0]?.status === 'Approved for Printing'">
          Waiting for the Hard Copies from Schools Division Office
        </v-card-subtitle>
        <v-card-subtitle>
          Status :<span class="text-uppercase" v-if="!user && att.status === 'RO Pending'">
            Sent to Regional Office
          </span>
          <span class="text-uppercase" v-else>
            {{ att.status }}
          </span>
        </v-card-subtitle>
        <v-card-subtitle v-if="att.side != 'RO'">
          Signatory : <b> {{ att.signatory }}</b>
        </v-card-subtitle>
        <v-card-subtitle>
          Office :
          <b>
            {{ att.side === 'SDO' ? 'Schools Division Office'
            : (att.side === 'School' ? 'School' : 'Regional Office') }}
          </b>

        </v-card-subtitle>
        <v-card-subtitle class="text-caption" v-if="user || user?.side === 'SDO'">Date <span class="text-blue">
            :
            {{ new Date(att?.timestamp).toLocaleString() }}</span>
        </v-card-subtitle>
        <v-card-subtitle v-if="att?.remarks?.length">
          <v-chip class="mt-2" density="compact" color="error">
            Reason/Remarks :
          </v-chip>

          <v-sheet border variant="tonal" class="ma-2 pa-2" v-for="(remarks, index) in att.remarks" :key="index">


            <v-card-subtitle> Attachment : <b class="text-error">{{ remarks.description }} </b><br /> Reason :
              {{
              remarks.remarks }} <br /> Date Disapproved : <span class="text-blue text-caption"> {{ new
                Date(remarks?.timestamp).toLocaleString() }}</span>
            </v-card-subtitle>
          </v-sheet>
          <v-btn class="ml-2" v-if="att.role === 'Principal'" rounded="md"
            @click="update_applicant(applicant_history._id)" color="primary" density="compact">
            Update
            Application
          </v-btn>
        </v-card-subtitle>

      </v-alert>




    </v-card-text>
    <v-card-text v-else-if="applicant_history?.request_log && applicant_history.request_log.length === 0">
      <v-alert class="pa-5 ma-5" border rounded="md" type="info" variant="tonal">
        Your application is being processed by the <b>Principal</b>.
      </v-alert>
    </v-card-text>
  </v-card>
</v-sheet>

</v-card> -->
    <v-sheet class="h-100 w-100 d-flex align-center justify-center" color="#ECEFF1">
      <v-card rounded="lg" width="40%" class="mx-auto my-0">
        <v-toolbar :color="'indigo'" border>
          <v-list-item class="pl-2" density="compact">
            <template v-slot:prepend>
              <v-avatar class="mr-1" variant="text">
                <v-icon icon="mdi-history" dark />
              </v-avatar>
            </template>
            <v-list-item-title class="text-white font-weight-bold">Staffing Modification Application
              History</v-list-item-title>
          </v-list-item>
          <v-spacer />
        </v-toolbar>

        <v-sheet class="mx-auto" elevation="1" rounded="lg">
          <v-sheet color="grey-lighten-4" class="pa-3 mx-auto">
            <v-card-title class="text-uppercase font-weight-bold pl-5 text-indigo">{{ applicant_history.full_name
              }}</v-card-title>
            <v-card-subtitle class="pl-5">
              <v-icon icon="mdi-account-card-details" class="mr-1" color="indigo" /> Control Number : <b
                class="text-indigo">{{
                  applicant_history.control_number }}</b>
            </v-card-subtitle>
            <v-card-subtitle class="text-caption pl-5">
              <v-icon icon="mdi-calendar" class="mr-1" color="indigo" /> Application Date : <b>{{ new
                Date(applicant_history.created_date).toLocaleString() }}</b>
            </v-card-subtitle>
          </v-sheet>

          <v-card class="overflow-y-auto py-4" height="70vh" width="100%">

            <v-card-text v-if="applicant_history?.request_log && applicant_history.request_log.length > 0">

              <v-alert class="pa-4 ma-4 elevation-3" rounded="lg" v-for="(att, index) in reverse_logs" :key="index"
                border="start" color="grey-lighten-5">
                <p class="pl-6" v-if="applicant_history?.request_log?.slice(-1)[0]?.type === 'RO'">
                  Please be patient as the <b>Regional Office </b>is processing a high volume of
                  reclassification
                  request.
                </p>

                <v-card-subtitle>
                  <v-icon icon="mdi-file-document" class="mr-1" color="indigo" /> Status :
                  <span class="text-uppercase font-weight-bold" v-if="!user && att.status === 'RO Pending'">Sent to
                    Regional
                    Office</span>
                  <span class="text-uppercase  font-weight-bold" v-else>{{ att.status }}</span>
                </v-card-subtitle>
                <v-card-subtitle v-if="att.side != 'RO'">
                  <v-icon icon=" mdi-account" class="mr-1" color="indigo" /> Signatory : <b>{{ att.signatory }}</b>
                </v-card-subtitle>
                <v-card-subtitle>
                  <v-icon icon="mdi-office-building" class="mr-1" color="indigo" /> Office :
                  <b>
                    {{ att.side === 'SDO' ? 'Schools Division Office'
                      : (att.side === 'School' ? 'School' : 'Regional Office')
                    }}
                  </b>
                </v-card-subtitle>
                <v-card-subtitle class="text-caption" v-if="user || user?.side === 'SDO'">
                  <v-icon icon="mdi-calendar" class="mr-1" color="blue" /> Date : {{ new
                    Date(att?.timestamp).toLocaleString()
                  }}
                </v-card-subtitle>
                <v-card-subtitle class="mt-3"
                  v-if="applicant_history?.request_log?.slice(-1)[0]?.status === 'Approved for Printing'">
                  <v-icon icon="mdi-book" class="mr-1" color="indigo" /> NOTE : Pending the receipt of hard copies from
                  the
                  Schools Division Office
                </v-card-subtitle>

                <v-card-subtitle v-if="att?.remarks?.length">
                  <v-chip class="mt-2" density="compact" color="error">Reason/Remarks :</v-chip>
                  <v-sheet border variant="tonal" class="ma-2 pa-2" v-for="(remarks, index) in att.remarks"
                    :key="index">
                    <v-card-subtitle>
                      <v-icon icon="mdi-attachment" class="mr-1" color="red" /> Attachment : <b class="text-error">{{
                        remarks.description }}</b><br />
                      Reason : {{ remarks.remarks }}<br />
                      Date Disapproved : <span class="text-blue text-caption">{{ new
                        Date(remarks?.timestamp).toLocaleString()
                        }}</span>
                    </v-card-subtitle>
                  </v-sheet>
                  <v-btn class="ml-2" v-if="att.role === 'Principal'" rounded="md"
                    @click="update_applicant(applicant_history._id)" color="primary" density="compact">
                    <v-icon icon="mdi-update" class="mr-1" /> Update Application
                  </v-btn>
                </v-card-subtitle>
              </v-alert>
            </v-card-text>

            <v-card-text v-else-if="applicant_history?.request_log && applicant_history.request_log.length === 0">
              <v-alert class="pa-5 ma-5" border rounded="md" type="info" variant="tonal">
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

const update_applicant = (id: any) => {
  router.push({
    name: 'sms-new-applicant-form',
    query: {
      id: id
    }
  });
}

// const reverse_logs = computed(() => {
//   return applicant_history.value.request_log?.slice().reverse() || [];
// });
const reverse_logs = computed(() => {
  const logs = applicant_history.value.request_log?.slice().reverse() || [];
  if (!user) {
    return logs.filter(log => {
      if (log.side === 'RO' && !["For DBM", "Completed", "Approved for Printing", "Received Printout/s"].includes(log.status)) {
        return false;
      }
      return true;
    });
  }

  return logs;
});



</script>
