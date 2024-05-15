<template>
  <v-sheet class="pa-10">
    <v-card class="pa-10 " rounded="lg" flat>
      <v-card-text> <v-row :class="`${$vuetify.display.mobile ? 'text-center' : ''}`" justify="center" dense>
          <v-col cols="12">
            <h6 class="text-h5 reclass-title">Summary of Endorsement Letter</h6>

            <h6 class="text-subtitle-2 text-medium-emphasis  "> View and verify endorsement letter.
            </h6>
            <v-divider class="mt-4 mb-2" />
          </v-col>

        </v-row>
        <v-row>
          <v-col cols="12">

            <v-sheet border>
              <v-data-table :headers="table_headers" :items="endorsement_data">

                <template v-slot:item.control_number="{ item }">
                  <span class="text-primary">{{ item.selectable.control_number }}</span>
                </template>
                <template v-slot:item.status="{ item }">
                  <v-chip color="success" variant="text">{{ item.selectable.status }}</v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn @click="load_endorsement_letter(item.selectable._id)" density="compact" color="primary">
                    {{
                    item.selectable.status === 'Verified' ? 'Print' : (item.selectable.status === 'Discrepancy' ? 'View'
                    : 'Verify')
                    }}

                  </v-btn>
                </template>
              </v-data-table>
            </v-sheet>
          </v-col>
        </v-row></v-card-text>
    </v-card>
  </v-sheet>
</template>


<script lang="ts" setup>


const { $rest } = useNuxtApp();

const router = useRouter();

definePageMeta({ layout: "std-systems" });

onBeforeMount(async () => {
  get_endorsement()
});




const table_headers = ref([
  { title: "Schools Division Office", key: "division", sortable: false },
  { title: "Applied Position", key: "position", sortable: false },
  { title: "Transaction Code", key: "batch_code", sortable: false },
  { title: "Status", key: "status", sortable: false },
  { title: "Action", key: "actions", sortable: false },
]);

const endorsement_data = ref([]);
async function get_endorsement() {
  const { data, error } = await $rest('sms-endorsement/get-endorsement', {
    method: "GET",
  })
  endorsement_data.value = data

}

const load_endorsement_letter = (id: any) => {
  router.push({
    name: 'printable-multiple-endorsement',
    query: {
      id: id
    }
  });
}



</script>

<style scoped>
.reclass-title {
  font-family: Times New Roman;
  font-weight: 20px;
  background: #0A17CF;
  background: -webkit-linear-gradient(to right, #0A17CF 8%, #C5CBCF 100%);
  background: -moz-linear-gradient(to right, #0A17CF 8%, #C5CBCF 100%);
  background: linear-gradient(to right, #0A17CF 8%, #C5CBCF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}
</style>