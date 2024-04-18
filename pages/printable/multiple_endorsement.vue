<template>
  <div>

    <body class="printable-page">
      <!-- <commons-header /> -->
      <div class="content">

        <div>
          <center>
            1st Indorsement
          </center>
          <center> April 16, 2024</center>
        </div>


        <div class="py-10" style="text-align: justify;    text-indent: 50px">
          Respectfully transmitted to the <b>Regional Director,
            Department of Budget and Management, National Capital Region</b>,<b> Misamis St., Bago Bantay, Quezon
            City</b>,
          enclosing herein with copies of the Plantilla Allocation List covering the implementing approved Equivalent
          Record Forms (ERF) of the folliwing Master Teacher IV, <b> Division of Manila</b>, this Region, for post-audit
          and
          approval,
          chargeable
          against the lump su, appropriation for reclassification of positions for CY 2024 to wit:




          <div class="d-flex justify-center mx-auto mt-4" style="width: 80%;">
            <table>
              <tr class="text-center font-weight-regular">
                <th width="50%">NAME</th>
                <th width="25%">FROM</th>
                <th width="25%">TO</th>

              </tr>
              <tr>
                <td width="50%"> 1. Ralph Renxo Bachicha Babali</td>
                <td width="25%">Master Teacher IV</td>
                <td width="25%">Master Teacher IV</td>

              </tr>
              <tr>
                <td width="50%"> 2. Dianne Geocaniga</td>
                <td width="25%">Master Teacher IV</td>
                <td width="25%">Master Teacher IV</td>

              </tr>
              <tr>
                <td width="50%"> 3. Marianne Mae Paclian</td>
                <td width="25%">Master Teacher IV</td>
                <td width="25%">Master Teacher IV</td>

              </tr>
              <tr>
                <td width="50%"> 4. Ralph Renxo Bachicha Babali</td>
                <td width="25%">Master Teacher IV</td>
                <td width="25%">Master Teacher IV</td>

              </tr>
              <tr>
                <td width="50%"> 5. Dianne Geocaniga</td>
                <td width="25%">Master Teacher IV</td>
                <td width="25%">Master Teacher IV</td>

              </tr>
              <tr>
                <td width="50%"> 6. Marianne Mae Paclian</td>
                <td width="25%">Master Teacher IV</td>
                <td width="25%">Master Teacher IV</td>

              </tr>
              <tr>
                <td width="50%"> 7. Ralph Renxo Bachicha Babali</td>
                <td width="25%">Master Teacher IV</td>
                <td width="25%">Master Teacher IV</td>

              </tr>
              <tr>
                <td width="50%"> 8. Dianne Geocaniga</td>
                <td width="25%">Master Teacher IV</td>
                <td width="25%">Master Teacher IV</td>

              </tr>
              <tr>
                <td width="50%"> 9. Marianne Mae Paclian</td>
                <td width="25%">Master Teacher IV</td>
                <td width="25%">Master Teacher IV</td>

              </tr>
              <tr>
                <td width="50%"> 10. Ralph Renxo Bachicha Babali</td>
                <td width="25%">Master Teacher IV</td>
                <td width="25%">Master Teacher IV</td>

              </tr>


            </table>
          </div>
          <div style="width: 45%; margin-left: auto; text-align: center; padding-top: 15mm">
            <div class="font-weight-bold"> JOCELYN DR. ANDAYA</div>
            <div> Director IV</div>
          </div>



          <div class="py-5 ">
            <div>Incls: 1. Plantilla Allocation List</div>
            <div class="pl-11">2. Approved ERF (photocopy)</div>


          </div>
          <div class="py-5">
            <div>Copy furnished: (1st Indorsement dated April 16, 2024 </div>
            <div style="padding-left: 30mm;">with original copy of ERF )</div>

          </div>

          <div class="py-5">

            <div>The Schools Division Superintendent
            </div>
            <div>Division of Manila </div>
          </div>
        </div>
      </div>

    </body>
    <div style="position: fixed; bottom: 20px; right: 20px;" class="d-print-none">
      <v-btn color="primary" icon="mdi-printer" size="large" class="mb-2" @click="print()">
      </v-btn> <br />
      <v-btn icon="mdi-keyboard-return" size="large" @click="$router.back()">
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
import useAuth from "~/store/auth";
const { $rest } = useNuxtApp();
onBeforeMount(() => {
  get_endorsement();
  get_rd()
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


const rd = ref({} as Rd)
async function get_rd() {
  const { data, error } = await $rest('sms-rd/get-rd', {
    method: "GET",
  })
  if (data) {
    Object.assign(rd.value, data)
  }
}
function print() {
  window.print();
}
</script>
<style scoped>
.printable-page {
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
  padding: 18mm;
  display: flex;
  justify-content: center;

  align-items: center;

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
  border: none;
  border-collapse: collapse;

}


.centered-table {
  text-align: center;
}
</style>