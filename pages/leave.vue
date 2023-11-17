<template>
    <v-row no-gutters v-if="Object.keys(request).length" class="d-flex justify-center">
        <v-col cols="12" sm="12" lg="8" xl="8">
            <v-sheet class="pa-4" :rounded="0">
                <v-sheet class="text-center">
                    <h1>Logo</h1>
                </v-sheet>
                <v-sheet border>
                    <v-sheet style="border: 1px solid black">
                        <v-row no-gutters dense class="py-1">
                            <v-col cols="4">
                                <v-row no-gutters dense>
                                    <v-col cols="12" class="d-flex flex-column align-center justify-center">
                                        <span>1. OFFICE/DEPARTMENT</span>
                                        <span>{{ request.requester.office }}</span>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters dense>
                                    <v-col cols="12">
                                        <span class="pl-5"></span>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="8">
                                <v-row no-gutters dense>
                                    <v-col cols="3" class="d-flex flex-column align-center justify-center">
                                        <span> NAME:</span>
                                        <span class="font-weight-bold">
                                            {{ request.requester.name }}
                                        </span>
                                    </v-col>
                                    <v-col cols="3" class="d-flex flex-column align-center justify-center">
                                        <span>(Last)</span><span></span>
                                    </v-col>
                                    <v-col cols="3" class="d-flex flex-column align-center justify-center">
                                        <span>(Last)</span>
                                        <span></span>
                                    </v-col>
                                    <v-col cols="3" class="d-flex flex-column align-center justify-center">
                                        <span>(Last)</span><span></span>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-sheet>
                    <v-sheet style="border: 1px solid black">
                        <v-row no-gutters dense class="py-1">
                            <v-col cols="4" class="d-flex flex-column">
                                <span>3. DATE OF FILING</span>
                                <span class="ml-5 font-weight-bold">
                                    {{ new Date(request.created).toLocaleDateString() }}
                                </span>
                            </v-col>
                            <v-col cols="4" class="d-flex flex-column">
                                <span>4. POSITION:</span>
                                <span>{{ request.requester.position }}</span>
                            </v-col>
                            <v-col cols="4">5. SALARY</v-col>
                        </v-row>
                    </v-sheet>
                    <v-sheet class="text-center py-1" style="border: 1px solid black">
                        <span class="text-subtitle-2 font-weight-bold">
                            6. DETAILS OF APPLICATION
                        </span>
                    </v-sheet>
                    <v-row no-gutters dense>
                        <v-col cols="6" style="border: 1px solid black" class="py-1">
                            <span>6.A TYPE OF LEAVE TO BE AVAILED OF</span>
                            <div class="d-flex flex-column pl-2">
                                <v-checkbox v-for="(leave, i) in leave_types" :key="i" hide-details :label="leave.value"
                                    :readonly="true" :model-value="leave.key === request.data.leave_type" />
                                <div>
                                    <span>Others :</span>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="6" style="border: 1px solid black" class="py-1">
                            <span>6.B DETAILS OF LEAVE</span>
                            <div class="d-flex flex-column pl-2">
                                <span class="font-italic">
                                    In case of Vacation/Special Privilege Leave:
                                </span>
                                <v-checkbox hide-details label="Within the Phillpines" readonly
                                    :model-value="request.data.within_the_philippines" />
                                <v-checkbox hide-details label="Abroad (Specify)" readonly
                                    :model-value="request.data.is_abroad" />
                                <span class="my-2 font-weight-bold">
                                    {{ request.data.country }}
                                </span>
                            </div>
                            <div class="d-flex flex-column pl-2">
                                <span class="font-italic">In case of Sick Leave:</span>
                                <v-checkbox hide-details readonly label="In Hospital (Specify Illness)"
                                    :model-value="request.data.in_hospital" />
                                <v-checkbox hide-details readonly label="Out Patient (Specify Illness)"
                                    :model-value="request.data.out_patient" />
                                <span class="font-weight-bold my-2">
                                </span>
                            </div>
                            <div class="d-flex flex-column pl-2">
                                <span class="font-italic">
                                    In case of Special Leave Benefits for Woman (Specify Illness):
                                </span>
                            </div>
                            <div class="d-flex flex-column pl-2">
                                <span class="font-italic">In case of Study Leave:</span>
                                <v-checkbox hide-details label="Completion of Master's Degree " :readonly="true" />
                                <v-checkbox hide-details label="BAR/Board Examination Review" :readonly="true" />
                            </div>
                            <div class="d-flex flex-column pl-2">
                                <span class="font-italic">Other Purpose:</span>
                                <v-checkbox hide-details label="Monetization of Leave Credits" :readonly="true" />
                                <v-checkbox hide-details label="Terminal Leave" :readonly="true" />
                            </div>
                        </v-col>
                    </v-row>
                    <v-row no-gutters dense class="fill-height">
                        <v-col cols="6" style="border: 1px solid black" class="py-1">
                            <span>6.C NUMBER OF WORKING DAYS APPLIED FOR</span>
                            <div class="d-flex align-center justify-center mt-12">
                                <div style="
                border-top: 1px solid black;
                border-bottom: 1px solid black;
              " class="w-75 py-2 d-flex flex-column">
                                    <span>INCLUSIVE DATES: </span>
                                    <span class="font-weight-bold">
                                        {{ request.data.start_date }} to {{ request.data.end_date }}
                                    </span>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="6" style="border: 1px solid black" class="py-1">
                            <span>6.D COMMUTATION</span>
                            <div class="d-flex flex-column pl-2">
                                <v-checkbox hide-details label="Not Requested" readonly />
                                <v-checkbox hide-details label="Requested" readonly />
                            </div>
                            <v-sheet class="d-flex justify-center align-center">
                                <div class="d-flex flex-column justify-center align-center">
                                    <span>_____________________________</span>
                                    <span>(Signature of Applicant)</span>
                                </div>
                            </v-sheet>
                        </v-col>
                    </v-row>
                    <v-sheet class="text-center" style="border: 1px solid black">
                        <span class="text-subtitle-2 font-weight-bold">
                            7. DETAILS OF ACTION ON APPLICATION
                        </span>
                    </v-sheet>
                    <v-row no-gutters dense>
                        <v-col cols="6" style="border: 1px solid black" class="py-1">
                            <span>7.A CERTIFICATION OF LEAVE CREDITS</span>
                            <div class="text-center px-10 d-flex flex-column align-center">
                                <span>As of: </span>
                                <div class="w-75">
                                    <v-table class="text-caption font-italic" density="compact">
                                        <thead>
                                            <tr>
                                                <th style="border: 1px solid black"></th>
                                                <th style="border: 1px solid black">Vacation Leave</th>
                                                <th style="border: 1px solid black">Sick Leave</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style="border: 1px solid black">Total Earned</td>
                                                <td style="border: 1px solid black"></td>
                                                <td style="border: 1px solid black"></td>
                                            </tr>
                                            <tr>
                                                <td style="border: 1px solid black">
                                                    Less this application
                                                </td>
                                                <td style="border: 1px solid black"></td>
                                                <td style="border: 1px solid black"></td>
                                            </tr>
                                            <tr>
                                                <td style="border: 1px solid black">Balance</td>
                                                <td style="border: 1px solid black"></td>
                                                <td style="border: 1px solid black"></td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </div>

                                <div class="d-flex flex-column mt-8 w-50">
                                    <span>ELSA P. MARIANO</span>
                                    <span>Administrative Officer V</span>
                                    <v-divider></v-divider>
                                    <span>(Authorized Officer)</span>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="6" style="border: 1px solid black" class="py-1">
                            <span class="pb-10">7.B RECOMMENDATION</span>
                            <div class="flex flex-column pl-2">
                                <v-checkbox hide-details label="For approval" :readonly="true" />
                                <v-checkbox hide-details label="For disapproval due to" class="pb-16" :readonly="true" />
                                <div class="d-flex flex-column align-center justify-center mt-16">
                                    <span class="mt-5">________________________</span>
                                    <span>(Authorized Officer)</span>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                    <v-sheet style="border: 1px solid black">
                        <v-row no-gutters dense>
                            <v-col cols="6" class="py-1">
                                <span>7.C APPROVED FOR:</span>
                                <div class="d-flex flex-column pl-4">
                                    <span>____ days with pay</span>
                                    <span>____ days without pay</span>
                                    <span>____ others (Specify)</span>
                                </div>
                            </v-col>
                            <v-col cols="6" class="py-1">
                                <span>7.D DISAPPROVED DUE TO:</span>
                            </v-col>
                        </v-row>
                        <v-row no-gutters dense class="my-4">
                            <v-col cols="12" class="d-flex flex-column text-center text-subtitle-2 font-weight-bold">
                                <span>WILFREDO E. CABRAL</span>
                                <span>Regional Director, DepEd NCR and</span>
                                <span>Officer-In-Charge, Office of the Undersecretary</span>
                                <span>Human Resources and Organizational Development</span>
                                <span>_______________________________</span>
                                <span>(Authorized Official)</span>
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-sheet>
            </v-sheet>
        </v-col>
    </v-row>
    <v-sheet v-else height="100vh" class="d-flex align-center justify-center pa-4">
        <v-sheet style="border: 1px dashed grey" class="h-100 w-100 d-flex align-center justify-center" color="#ECEFF1">
            <v-row no-gutters class="d-flex justify-center">
                <v-col cols="12" sm="12" lg="5" xl="4">
                    <v-alert type="error" title="Error" text="Could not locate leave request try refreshing page." />
                </v-col>
            </v-row>
        </v-sheet>
    </v-sheet>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import swal from 'sweetalert';

const { $rest } = useNuxtApp();
const route = useRoute();


const leave_types = ref([
    {
        key: "vacation_leave",
        value:
            "Vacation Leave (Sec 51. Rule XVI, Omnibus Rules Implementing, E.O No. 292)",
        id: "vacation",
    },
    {
        key: "mandatory_force_leave",
        value:
            "Mandatory/Force Leave (Sec. 25 Rule XVI Omnibus, Rules implementing E.O. No. 292)",
        id: "mandatory",
    },
    {
        key: "sick_leave",
        value:
            "Sick Leave (Sec. 43 RULE XVL, Omnibus Rules Implementing E.O. No. 292)",
        id: "sick",
    },
    {
        key: "maternity_leave",
        value: "Maternity Leave (R.A. No. 11210 /IRR issued by CSC, DOLE and SSS)",
        id: "maternity",
    },
    {
        key: "paternity_leave",
        value:
            "Paternity Leave (R.A. No. 8187 / CSC MC No. 71, s.1998 as ammended)",
        id: "paternity",
    },
    {
        key: "special_privilege_leave",
        value:
            "Special Privilege Leave (Sec 21, Rule XVI, Omnibus Rules Implementing E.O. No 292)",
        id: "special_privilege",
    },
    {
        key: "solo_parent_leave",
        value: "Solo Parent Leave (R.A. No 8972 /CSC MC No. 8,s. 2004)",
        id: "solo_parent",
    },
    {
        key: "study_leave",
        value:
            "Study Leave (Sec 68, Rule XVI, Omnibus Rules Implementing E.O. No.292)",
        id: "study_leave",
    },
    {
        key: "vawc_leave",
        value: "10-day VAWC Leave (RA No. 9262 /CSC MC No. 15,s 2005)",
        id: "vawc_leave",
    },
    {
        key: "rehabilitation_privilege",
        value:
            "Rehabilitation Privilege (Sec, 55 Rule XVI, Omnibus Rules Implementing E.O. No, 292)",
        id: "rehabilitation_privilege",
    },
    {
        key: "special_leave_benefits_for_woman",
        value:
            "Special Leave Benefits for Woman (RA No.9710/CSC MC No, 25, s.2010)",
        id: "special_leave_benefits_for_woman",
    },
    {
        key: "special_emergency_leave",
        value:
            "Special Emergency (Calamity) Leave (CSC MC no. 2, s.202) as amended",
        id: "special_emergency_leave",
    },
    {
        key: "adoption_leave",
        value: "Adoption Leave(R.A. No. 8552)",
        id: "adoption_leave",
    },
]);

onBeforeMount(() => fetch_printing_data())

const request = ref<LeaveRequest>({} as LeaveRequest);
const fetch_printing_data = async () => {

    const { data, error } = await $rest("leave/printing-leave-form", {
        method: "GET",
        query: {
            id: route.params.id,
        },
    });

    if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
    request.value = data;
}


</script>
