<template>
    <v-row dense justify="center">
        <v-col cols="12" class="text-center font-weight-bold text-h5">
            EVALUATION / LIST OF REQUIREMENTS FOR TEACHER II AND III
        </v-col>
        <v-col cols="10" xxl="8" xl="8" lg="10">
            <v-row dense justify="center">
                <v-col cols="6"> To : <b> REGINAL DIRECTOR</b> </v-col>
                <v-col cols="6"> DATE : <v-chip color="primary" density="compact"> Oct. 30, 2023</v-chip></v-col>
                <v-col cols="8"> DIVISION : <b>Muntinlupa City</b></v-col>
                <v-col cols="2"> <v-btn class="font-weight-bold" prepend-icon="mdi-history" color="primary" block>View
                        Timeline</v-btn></v-col>
                <v-col cols="2"> <v-btn class="font-weight-bold" prepend-icon="mdi-printer" color="primary" block> Print
                        ERF</v-btn></v-col>
            </v-row>
        </v-col>
        <v-col cols="10" xxl="5" xl="5" lg="6" md="6" sm="10">
            <v-card class="mx-auto" border>
                <v-card-title class="d-flex align-center font-weight-bold">
                    1. EQUIVALENT RECORD FORM
                </v-card-title>
                <v-card-text class="pa-1 ma-0">
                    <v-sheet border>
                        <v-row no-gutters class="ma-2">
                            <v-col cols="6">Name : <b>Marianne Mae Paclian</b> </v-col>
                            <v-col cols="6">Date of Birth : <b>July 15, 1998</b> </v-col>
                            <v-col cols="6">Employee Number : <b>SHHO-JH7577-001</b> </v-col>
                            <v-col cols="6">Authorized Position Title : <b>Teahear II</b></v-col>
                            <v-col cols="6">Item Number : <b>5687-567467-67</b> </v-col>
                            <v-col cols="6">Authorized Salary : <b>12</b></v-col>
                        </v-row>
                        <v-row no-gutters>
                            <commons-table title="I. Education Attainment and Civil Service Eligibility"
                                :columns="attainment_columns" :data="attainment_mockdata" />
                        </v-row>
                        <v-row no-gutters class="ml-15">
                            <commons-table :tableWidth="'70%'" title="II. Service Record " :columns="service_record_columns"
                                :data="service_record_mockdata" />
                        </v-row>
                        <v-row no-gutters class="ml-15">
                            <h5 class="text-uppercase text-caption ml-4"> III. EQUIVALENT UNITS</h5>
                            <commons-table :tableWidth="'50%'" title="A. Total Number of Years Teaching "
                                :columns="years_teaching_columns" :data="years_teaching_mockdate" />
                        </v-row>
                        <v-row no-gutters class="ml-15">
                            <h5 class="text-uppercase text-caption ml-4"> B. Degree to Degree Equivalent</h5>
                        </v-row>
                        <v-row no-gutters class="ml-15">
                            <h5 class="text-uppercase text-caption ml-4"> C. Areas of Equivalent</h5>
                            <commons-table class="pl-10" :tableWidth="'50%'" title="1. Professional Study"
                                :columns="professional_study_columns" :data="professional_study_mockdate" />
                            <commons-table class="pl-10" :tableWidth="'50%'" title="2. Teachiing Experiences"
                                :columns="years_teaching_columns" :data="years_teaching_mockdate" />
                        </v-row>
                        <v-row dense class="ml-15">
                            LATEST IPCRF RATING :
                        </v-row>
                        <v-row dense justify="center">
                            <v-col cols="5">
                                <pamphlets-attach-signature name="Marianne Mae Paclian" position="Principal" />
                            </v-col>
                            <v-col cols="5">
                                <pamphlets-attach-signature name="Marianne Mae Paclian" position="Teacher" />
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-card-text>
            </v-card>
            <v-card class="mx-auto" border>
                <v-row dense justify="center">
                    <v-col cols="12" class="text-subtitle-1 font-weight-bold px-3"> SCHOOL DIVISION OFFICE</v-col>
                    <v-col cols="5">
                        <pamphlets-attach-signature name="Marianne Mae Paclian" position="Evaluator" />
                    </v-col>
                    <v-col cols="5">
                        <pamphlets-attach-signature name="Marianne Mae Paclian" position="Approver" />
                    </v-col>
                </v-row>
                <v-row dense justify="center">
                    <v-col cols="12" class="text-subtitle-1 font-weight-bold px-3"> REGIONAL OFFICE</v-col>
                    <v-col cols="5">
                        <pamphlets-attach-signature name="Marianne Mae Paclian" position="Evaluator" />
                    </v-col>
                    <v-col cols="5">
                        <pamphlets-attach-signature name="Marianne Mae Paclian" position="Approver" />
                    </v-col>
                </v-row>

                <v-card-actions>
                    <v-row dense justify="center">
                        <v-col cols="4">
                            <v-btn variant="tonal" color="error" block>CLOSE</v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn variant="tonal" color="success" block>SUBMIT</v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="10" xxl="3" xl="3" lg="4" md="6" sm="10">
            <v-card border width="500">
                <v-card-text class="pa-1 ma-0">

                    <v-sheet border class="pa-4">
                        <h6> 2. Authenticated copy of Transcript of Records in the masteral course signed by the School
                            Registrar.</h6>
                        <h6 class="font-weight-regular mt-2"> Registrar Complete Name : <b>Mariannae Mae Paclian</b></h6>
                        <h6 class="font-weight-regular"> Registrar Contact Number : <i
                                class="font-weight-bold">09512165312</i></h6>
                        <h6 class="font-weight-regular"> Registrar Emmail : <i
                                class="font-weight-bold">mariannemaepaclian1998@gmail.com</i></h6>
                    </v-sheet>
                </v-card-text>
                <v-card-text class="pa-1 ma-0">
                    <v-sheet border class="pa-4">
                        <pamphlets-evaluate-attachement
                            :title="'3 .Permit to Study or Accreditation of units in the masteral course.'"
                            :tooltip="View attached permit" />
                    </v-sheet>
                </v-card-text>
                <v-card-text class="pa-1 ma-0">
                    <v-sheet border class="pa-4">
                        <pamphlets-evaluate-attachement :title=" '4 .Omnibus Certification of Authenticity of Documents ' " />
                    </v-sheet>
                </v-card-text>
                <v-card-text class="pa-1 ma-0">
                    <v-sheet border class="pa-4">
                        <pamphlets-evaluate-attachement :title=" ' 5 .Copy of Curriculum(MA Course for T3 only).' " />
                    </v-sheet>
                </v-card-text>
            </v-card>
            <v-card border width="500">
                <v-card-title class="d-flex align-center ">
                    SCHOOL DIVISION OFFICE
                </v-card-title>
                <v-divider />
                <v-card-text class="pa-1 ma-0">
                    <v-sheet border class="pa-4">
                        <pamphlets-evaluate-attachement :title=" ' 1 .Plantilla Allocation List. ' " />
                        <pamphlets-evaluate-attachement :title=" '2. Service Record' " />
                    </v-sheet>
                </v-card-text>
            </v-card>

        </v-col>

    </v-row>
</template>
<script lang="ts" setup>


// Table headers
const attainment_columns = ref([
    "Title, Degree Highest Grade Attained",
    "Name of Institution",
    "Year Received",
    "Board Examination",
    "Rating",
    "Date",
],);
const attainment_mockdata = ref([
    {
        "Title, Degree Highest Grade Attained": 1,
        "Name of Institution": 2,
        "Year Received": 3,
        "Board Examination": 4,
        "Rating": 5,
        "Date": 6,
    },
])
const service_record_columns = ref([
    "Designation",
    "From",
    "To",

],);
const service_record_mockdata = ref([
    {
        "Designation": 'Teacher II',
        "From": '07/15/2002',
        "To": '07/15/2005',
    },
])
const years_teaching_columns = ref([
    "Publics Schools",
    "Private Schools",


],);
const years_teaching_mockdate = ref([
    {
        "Publics Schools": 12.1,
        "Private Schools": 3,
    },
])
const professional_study_columns = ref([
    "School Year",
    "Number of Units",
    "Desciption"


],);
const professional_study_mockdate = ref([
    {
        "School Year": 12.1,
        "Number of Units": 3,
        "Desciption": 'Sample'
    },
])
</script>
<style scoped>
* {
    font-size: 12px
}

th,
td {
    border: 1px solid #070707;
    padding: 0px;
    margin: 0;

}
</style>