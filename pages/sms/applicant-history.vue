
<template>
  <v-sheet height="100vh" class="d-flex align-center justify-center ">
    <v-sheet class="h-100 w-100 d-flex align-center justify-center" color="#ECEFF1">
      <v-sheet border class="w-45">
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
          <v-sheet class="overflow-y-auto" height="80vh">
            <v-sheet border variant="tonal" color="grey-lighten-4" class="elevation-2 pa-3 mx-auto">
              <v-card-title class="text-uppercase font-weight-bold"> {{ applicant_history.full_name }}
              </v-card-title>
              <v-card-subtitle>
                Control Number : <b>{{ applicant_history.control_number }}</b>
              </v-card-subtitle>
              <v-card-subtitle class="text-caption">Date Applied : <b> {{ new
                Date(applicant_history.created_date).toLocaleString() }}</b></v-card-subtitle>

            </v-sheet>
            <v-sheet width="auto" border>
              <v-timeline side="end">
                <v-timeline-item v-for="signatory, index in filter_assignees" :key="signatory" icon="mdi-check"
                  dot-color="success">
                  <v-sheet border class="elevation-2 pa-3 mr-3" width="430">
                    <!-- <v-card-title class="text-orange"> {{ applicant_history.status }} </v-card-title> -->
                    <v-card-subtitle>
                      Your application has been approved by <b>{{ signatory.name }}</b>.
                    </v-card-subtitle>
                    <v-card-subtitle class="text-caption">Date Approved <span class="text-blue"> : {{ new
                      Date(signatory?.timestamp).toLocaleString() }}</span></v-card-subtitle>

                    <v-sheet border class="elevation-2 pa-2" v-if="status == 'Dissapproved'">
                      <v-card-subtitle class="font-weight-bold">
                        Reason/Remarks :
                      </v-card-subtitle>
                      <v-card-subtitle> Bat ganyan ayuko nyan!</v-card-subtitle>

                    </v-sheet>
                  </v-sheet>
                </v-timeline-item>
                <v-timeline-item icon="mdi-clock-edit-outline" dot-color="orange">
                  <v-sheet border class="elevation-2 pa-3 mr-3" width="430">
                    <v-card-subtitle>
                      Your application is being processed by the <br /><b>{{ pending_assignees.name }}</b>.
                    </v-card-subtitle>



                  </v-sheet>
                </v-timeline-item>

              </v-timeline>





            </v-sheet>
          </v-sheet>
        </v-card-text>
      </v-sheet>
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

const filter_assignees = computed(() => {
  const assignees = applicant_history.value.assignees;

  if (!Array.isArray(assignees)) {
    console.error('Assignees is not an array:', assignees);
    return [];
  }
  return assignees.filter(applicant => applicant.approved === true);
});
const pending_assignees = computed(() => {
  const assignees = applicant_history.value.assignees;

  if (!Array.isArray(assignees)) {
    console.error('Assignees is not an array:', assignees);
    return [];
  }
  return assignees.find(applicant => applicant.approved === false);
});

</script>
