<template>
  <div>

    <template v-for="(group, groupIndex) in chunkArray(endorsement_data.applicants, 10)">

      <body class="printable-page">
        <commons-header />
        <div class="content px-10">

          <div v-if="groupIndex > 0" class="page-break"></div>
          <div class="mt-15">
            <center>
              1st Indorsement
            </center>
            <center>{{ new Date(endorsement_data?.generated_date).toLocaleDateString('en-US', {
              month: 'long', day:
                'numeric', year: 'numeric'
            }) }}</center>
          </div>

          <div class="py-10" style="text-align: justify;    text-indent: 50px">
            Respectfully transmitted to the <b>Regional Director, Department of Budget and Management, National Capital
              Region, 2nd Floor, Arcache Building, Gen. Solano corner Nepomuceno St., San Miguel, Manila </b>
            enclosing herewith copies of the Plantilla Allocation List covering the implementing approved Equivalent
            Record Forms (ERF) of the following {{ endorsement_data.position }}, <b> Schools Division of {{
              endorsement_data.division }}</b>, this
            Region,
            for post-audit
            and
            approval,
            chargeable
            against the lumpsum, appropriation for reclassification of positions for CY {{ endorsement_data.current_year
            }}
            to wit:



            <div class="mx-auto mt-4" style="width: 80%; min-height: 290px;">
              <table>
                <tr class="text-center">
                  <th width="30%">NAME</th>
                  <th width="35%">FROM</th>
                  <th width="35%">TO</th>

                </tr>

                <tr v-for="(endorsement, index) in group" :key="index">
                  <td width="30%"> {{ (groupIndex * 10) + index + 1 }}. {{ endorsement.full_name }}</td>
                  <td width="35%" class="text-center"> {{ endorsement.current_position }}</td>
                  <td width="35%" class="text-center">{{ endorsement_data.position }}</td>
                </tr>



              </table>


            </div>

            <div style="width: 45%; margin-left: auto; text-align: center; padding-top: 20mm">
              <div class="font-weight-bold"> JOCELYN DR ANDAYA</div>
              <div> Director IV</div>
            </div>
          </div>


          <div class="py-5 ">
            <div>Incls: 1. Plantilla Allocation List</div>
            <div class="pl-11">2. Approved ERF (photocopy)</div>


          </div>
          <div class="py-5">
            <div>Copy furnished: (1st Indorsement dated {{ new
              Date(endorsement_data?.generated_date).toLocaleDateString('en-US', {
                month: 'long', day:
                  'numeric', year: 'numeric'
              }) }} </div>
            <div style="padding-left: 30mm;">with original copy of ERF )</div>

          </div>

          <div class="py-5">

            <div>The Schools Division Superintendent
            </div>
            <div>Division of {{ endorsement_data.division }} </div>
          </div>

        </div>
      </body>
    </template>

    <div style="position: fixed; bottom: 20px; right: 20px;" class="d-print-none">
      <v-btn v-if="endorsement_data.status === 'Verified' && user.role === 'Administrative Officer V'" color="primary"
        icon="mdi-printer" size="large" class="mb-2" @click="print()">
      </v-btn>
      <v-btn v-if="endorsement_data.status === 'For Verification' && user.role === 'Verifier'" color="primary"
        size="large" rounded="xl" class="mb-2" prepend-icon="mdi-check-all" @click="verify_dialog = true">
        Verify
      </v-btn>
      <v-btn v-if="endorsement_data.status === 'Discrepancy' && user.role === 'Administrative Officer V'" color="amber"
        size="large" rounded="xl" class="mb-2" prepend-icon="mdi-check-all" @click="verify_dialog = true">
        Resubmit
      </v-btn> <br />
      <v-btn icon="mdi-keyboard-return" size="large" @click="$router.back()">
      </v-btn>
    </div>



    <commons-dialog max-width="35%" v-model="verify_dialog" :icon="'mdi-information'"
      :title="'Verification Confirmation!'" @submit="update_endorsement_letter"
      :submitText="remarks === '' ? 'Submit' : 'Return to AOV'">
      <v-card-text class="ma-4" v-if="user.role === 'Verifier'">
        Are you sure that you've verified the content of the endorsement letter before submitting it to the DBM? <br />
        If <b class="text-red">NOT</b> add remarks to return to Administrative Officer V.
        <v-textarea class="pt-2" rows="3" label="Remarks" v-model="remarks" />
      </v-card-text>
      <v-card-text class="ma-4" v-else>
        Are you sure you want to re-submit the endorsement letter?
      </v-card-text>
    </commons-dialog>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
import swal from 'sweetalert';

const route = useRoute();
import useAuth from "~/store/auth";
const user = useAuth().user;

const { $rest } = useNuxtApp();

onBeforeMount(() => {
  Promise.all([
    get_endorsement()
  ])
});

const verify_dialog = ref(false)
const endorsement_data = ref([]);
async function get_endorsement() {
  const { data, error } = await $rest('sms-endorsement/get-batch-endorsement', {
    method: "GET",
    query: {
      id: route.query.id
    }
  })
  endorsement_data.value = data

}


// const rd = ref({} as Rd)
// async function get_rd() {
//   const { data, error } = await $rest('sms-rd/get-rd', {
//     method: "GET",
//   })
//   if (data) {
//     Object.assign(rd.value, data)
//   }
// }
function print() {
  window.print();
}
const remarks = ref('')

async function update_endorsement_letter() {
  let status;

  if (user.role === 'Administrative Officer V') {
    status = "For Verification";
  } else {
    status = remarks.value === '' ? "Verified" : "Discrepancy";
  }


  const payload = {
    app_id: route.query.id,
    applicants: endorsement_data.value.applicants,
    remarks: remarks.value !== '' ? remarks.value : null,
    status: status,
    position: endorsement_data.value.position
  };
  const { data, error } = await $rest('sms-endorsement/update-generated-endorsement', {
    method: "PUT",
    body: payload
  });
  if (error) {
    return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } });
  }
  return swal({ title: "Success", text: data, icon: "success", buttons: { ok: false, cancel: false } });
}
const chunkArray = (array: any[] | undefined, size: number) => {
  if (!array || array.length === 0) {
    return []; // Return an empty array if input array is undefined or empty
  }

  const chunkedArray: any[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
};

</script>
<style scoped>
.printable-page {
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
  margin-top: 2mm;

}

* {
  font-size: 14px;
  font-family: Bookman Old Style
}


table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border: none;
}

td,
th {
  border: none;
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






@media print {
  body {
    margin: 0;



  }

  .printable-page {
    box-shadow: none;
    margin-top: 0;
  }
}
</style>