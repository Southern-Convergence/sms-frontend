<template>
  <div>


    <v-btn @click="view_applicant_info = true">Hi</v-btn>





    <v-dialog v-model="view_applicant_info" width="60%">
      <v-card flat class="mx-5">
        <v-toolbar color="indigo" v-if="$attrs['hide-toolbar'] !== ''" border>
          <v-list-item class="pl-2" density="compact">

            <v-list-item-title> <v-icon class="px-4 pb-2" size="24" icon="mdi-account" dark />APPLICANT
              INFORMATION</v-list-item-title>

          </v-list-item>

          <v-spacer />
          <v-btn class="mr-0" @click="view_applicant_info = false" rounded="0" icon="mdi-close" />
        </v-toolbar>
        <v-card-text class="mx-2 ml-5">

          <table>


            <tbody>
              <tr>

                <td> Position</td>
                <td>
                  <b class="text-uppercase mb-2"></b>
                  {{ applicant_qs.position }}
                </td>
              </tr>
              <tr v-if="applicant_qs.education_level">
                <td> Education Level</td>
                <td> {{ applicant_qs.education_level }}</td>
              </tr>
              <tr>
                <td> Education</td>
                <td v-for="educ, index in applicant_qs.education" :key="educ">{{ educ }}</td>
              </tr>
              <tr v-if="applicant_qs.graduate_units > 0">
                <td> Graduate Units</td>
                <td> {{ applicant_qs.graduate_units }}</td>
              </tr>
              <tr v-if="applicant_qs.ma_units > 0 || applicant_qs.total_ma > 0">
                <td> M.A. Units</td>
                <td> {{ applicant_qs.ma_units }} {{ applicant_qs.total_ma }}</td>
              </tr>
              <tr>
                <td> Experience</td>
                <td v-for="exp, index in applicant_qs.experience" :key="exp">{{ exp }}</td>
              </tr>
              <tr>
                <td> Performance Rating</td>
                <td>{{ applicant_qs.rating }}</td>
              </tr>
              <tr>
                <td> Training Hours</td>
                <td> {{ applicant_qs.training_hours }}</td>
              </tr>
              <tr v-if="applicant_qs?.leadership.length">
                <td> Leadership and Potention Points</td>
                <td v-for="lead, index in applicant_qs.leadership" :key="leas">{{ lead }} </td>
              </tr>
              <tr>
                <td> </td>
                <td>
                  <b class="text-uppercase mb-2">Attachments :</b>
                  <p v-for="attach, index in applicant_qs.attachments" :key="attach">
                    <v-icon size="20" color="primary">mdi-circle-small</v-icon> {{
                      attach }} <br />
                  </p>

                </td>
              </tr>
              <tr>
                <td> Schools
                  Division Office</td>
                <td>
                  <b class="text-uppercase mb-2">Attachments :</b>
                  <p v-for="attach, index in applicant_qs.sdo_attachments" :key="attach"> <v-icon size="20"
                      color="primary">mdi-circle-small</v-icon> {{ attach }} <br /></p>

                </td>
              </tr>
            </tbody>
          </table>



        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
import swal from 'sweetalert';
import useAuth from "~/store/auth";

const { $rest } = useNuxtApp()
const route = useRoute();
onBeforeMount(() => {
  get_applicant_details();
});
const view_applicant_info = ref(false)
// Table headers start
const applicant_qs = ref([] as Applicant[]);


async function get_applicant_details() {
  const { data, error } = await $rest('new-applicant/get-erf', {
    method: 'GET',
    query: { id: route.query.id }
  });

  applicant_qs.value = data;
}

</script>
<style scoped>
.printable-page {
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);


}

* {
  font-size: 13px
}


table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;

}

td,
th {

  padding: 6px;
  font-size: 12px;
  line-height: normal;
  word-break: break-word;
  font-weight: normal;
}

tr,
th {
  font-weight: bold;
}

.row-value {
  display: block;
  font-size: 8px;
  margin-bottom: 5px;
  padding-right: 5px;
}

@media print {
  body {
    margin: 0;

  }

  .printable-page {

    margin: 0 auto;
    box-shadow: none;


  }
}

table,
th,
td {

  border-collapse: collapse;

}



.centered-table {
  text-align: center;
}
</style>


<!-- 
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, computed } from 'vue';

const { $rest } = useNuxtApp();
const route = useRoute();

get_applicant_details();

const TeacherI = ref([
  'Permanent Teacher.',
  "Bachelor's degree for teachers or equivalent as provided in Magna Carta for Teachers.",
  'Very satisfactory performance rating for the last two years (at least 33 pts.)',
  'At least three years of experience.',
  'At least 25 points in leadership and potential (see attached table) or has been a demonstration teacher on the district level plus 15 points in leadership and potential.',
])
const TeacherII = ref([
  'Master Teacher I (or ESP I) for at least one year.',
  'Very satisfactory rating (at least 33 pts.) as Master Teacher I (or ESP I).',
  "Bachelor's degree for teachers or equivalent as provided in Magna Carta for Teachers, plus completion of academic requirement for M.A.",
  'At least 30 points in leadership, potential, and achievement or demonstration teacher on the division level plus 20 points in leadership and potential provided the activities or accomplishments listed for this purpose had not been credited or used for earlier promotions.',
])

const applicant_qs = ref([] as Applicant[]);
const qs_data = ref([]);

async function get_applicant_details() {
  const { data, error } = await $rest('new-applicant/get-applicant', {
    method: 'GET',
    query: { id: route.query.id }
  });

  applicant_qs.value = data;
}






</script> -->
