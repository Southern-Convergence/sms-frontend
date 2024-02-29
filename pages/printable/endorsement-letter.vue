<template>
  <div>

    <body class="printable-page">
      <div class="content px-15">
        <commons-header />
        <div class="pt-8">
          <center>
            1st Indorsement
          </center>
          <center> August 31, 2023</center>
        </div>

        <div class="py-10" style="text-align: justify;    text-indent: 50px">
          Respectfully transmitted to Ms. <b> {{ approver_ro_full_name ? approver_ro_full_name :
            approver_sdo_full_name }}</b>, Regional Director,
          Department of Budget and Management, National Capital Region,<b class="text-red"> REGIONAL OFFICE ADDRESS</b>,
          the herein request for
          reclassification of position of <span class="text-indigo">Ms. {{
            applicant_endorsement.full_name }}, from {{ applicant_endorsement.current_position }} to {{
    applicant_endorsement.applied_position }},
            {{ applicant_endorsement.school }} – {{ applicant_endorsement.division }}, </span> this Region,
          chargeable against the lumpsum appropriation for reclassification of
          positions for CY <span class="text-indigo"> 2023</span>.
        </div>
        <div class="text-end font-weight-bold">
          {{ approver_ro_full_name ? approver_ro_full_name :
            approver_sdo_full_name }}
        </div>
        <div class="text-end pr-7"> Regional Director</div>


        <div class="py-5 text-indigo">
          <div><b class="text-black">Incls:</b> 1. Recommendation from SDS</div>
          <div class="pl-11">2. PAL</div>
          <div class="pl-11">3. Evaluation Sheet</div>
          <div class="pl-11">4. List of Teachers</div>
          <div class="pl-11">5. Rank List</div>

        </div>
        <div class="py-5">
          <b>Copy furnished:</b>
          <div class="pl-11  font-weight-bold"> {{ applicant_endorsement.sds_fullname }}</div>
          <div class="pl-11 text-indigo">{{ applicant_endorsement.division }}</div>
        </div>
      </div>


    </body>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
import useAuth from "~/store/auth";
const { $rest } = useNuxtApp();
onBeforeMount(() => {
  get_endorsement();
});
const user = useAuth().user;
const route = useRoute();
const applicant_endorsement = ref({} as Applicant)
async function get_endorsement() {
  const { data, error } = await $rest('new-applicant/get-endorsement', {
    method: 'GET',
    query: {
      id: route.query.id
    }
  })
  applicant_endorsement.value = data
}
const approver_ro_full_name = computed(() => {
  const first_name = user.first_name;
  const middle_name = user.middle_name ? `${user.middle_name.charAt(0)}.` : '';
  const last_name = user.last_name;
  const role = user.side === 'Approver'
  const side = user.side === 'RO'
  return `${first_name} ${middle_name} ${last_name}`;
});
const approver_sdo_full_name = computed(() => {
  const first_name = user.first_name;
  const middle_name = user.middle_name ? `${user.middle_name.charAt(0)}.` : '';
  const last_name = user.last_name;
  const role = user.side === 'Approver'
  const side = user.side === 'SDO'
  return `${first_name} ${middle_name} ${last_name}`;
});
</script>
<style scoped>
.printable-page {
  width: 210mm;
  height: 294mm;
  margin: 0 auto;
  box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
  margin-top: 10px;

}

* {
  font-size: 15px;
  font-family: Bookman Old Style
}


table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border: 1px solid black;
}

td,
th {
  border: 1px solid black;
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
}

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;

}


.centered-table {
  text-align: center;
}
</style>