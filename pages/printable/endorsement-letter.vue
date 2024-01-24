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

        <div class="py-10" style="text-align: justify">
          Respectfully transmitted to Ms. RUBY P. MURO, Regional Director,
          Department of Budget and Management, National Capital Region, 2nd Floor
          Arcache Building General Solano, Corner Nepomuceno St, San Miguel,
          Manila, the herein request for reclassification of position of <span class="text-indigo">Ms. PERPETUA
            I. REBUA, from Teacher III to Master Teacher I, Concepcion Integrated
            School – Secondary Level, Division of Marikina City, </span> this Region,
          chargeable against the lumpsum appropriation for reclassification of
          positions for CY <span class="text-indigo"> 2023</span>.
        </div>


        <div class="text-end font-weight-bold">WILFREDO E. CABRAL, CESO III
        </div>
        <div class="text-end pr-15"> Regional Director</div>


        <div class="py-5 text-indigo">
          <div><b class="text-black">Incls:</b> 1. Recommendation from SDS</div>
          <div class="pl-8">2. PAL</div>
          <div class="pl-8">3. Evaluation Sheet</div>
          <div class="pl-8">4. List of Teachers</div>
          <div class="pl-8">5. Rank List</div>

        </div>
        <div class="py-5">
          <b>Copy furnished:</b>
          <div class="pl-8 text-indigo"> Schools Division Superintendent</div>
          <div class="pl-8 text-indigo">Division of Marikina City</div>
        </div>
      </div>


    </body>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
import swal from 'sweetalert';
import useAuth from "~/store/auth";

const { $rest } = useNuxtApp()
const route = useRoute();

</script>
<style scoped>
.printable-page {
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
  margin-top: 10px;

}

* {
  font-size: 14px;
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
    /* Reset margin for printing */
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