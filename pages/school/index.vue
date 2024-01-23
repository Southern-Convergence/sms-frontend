<template>
    <v-sheet width="85%" class="mx-auto ma-5 elevation-2">
        <v-sheet class="pa-6" height="auto" color="grey-lighten-4">
            <v-row no-gutters>
                <v-col cols="12" class="text-h6 font-weight-bold text-indigo">School Users </v-col>
                <v-col cols="12" class="text-grey"> A brief overview of school users. </v-col>
            </v-row>
        </v-sheet>
        <v-card-text class="overflow-y-auto h-100 d-flex">
            <v-row no-gutters>
                <v-col cols="4">
                    <v-btn prepend-icon="mdi-pencil-plus" @click="user_invite_dialog = true" color="indigo">
                        Invite
                        User</v-btn>
                    <v-sheet class="overflow-y-auto mt-3 ">
                        <v-sheet border class=" mr-2 mx-auto" v-for="user, index in users_data" :key="index">
                            <v-alert rounded="0" color="white" class="user-item space-around" border="start"
                                border-color="indigo">
                                <div>
                                    <div class="d-flex mb-1">
                                        <div class="text-uppercase  text-indigo text-body-1"> {{ user.first_name
                                        }}
                                            {{
                                                user.last_name }}
                                        </div>
                                        <v-spacer />
                                        <div> <v-chip density="compact" class="text-uppercase text-overline"
                                                color="success">{{
                                                    user.status }}</v-chip></div>
                                    </div>
                                    <div class="text-caption font-weight-bold">
                                        {{ user.role
                                        }}
                                    </div>
                                    <div class="text-caption"> <v-icon color="red"> mdi-email</v-icon> <u
                                            class="text-blue">{{
                                                user.email
                                            }}</u>
                                    </div>
                                    <div class="text-caption"> <v-icon color="success"> mdi-phone</v-icon> {{
                                        user.contact_number }}</div>
                                </div>
                            </v-alert>
                        </v-sheet>
                    </v-sheet>
                </v-col>
                <v-col cols="8">
                    <v-row no-gutters>
                        <v-col cols="6">
                            <v-sheet border height="76vh">
                                <v-toolbar color="white">
                                    <template v-slot:prepend>
                                        <v-icon color="green darken-2">mdi-cash</v-icon>
                                    </template>
                                    <b class="ml-3"> SALARY GRADE</b>
                                    <v-spacer />
                                    <v-tooltip text="Click to add Position" location="top">
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" @click="sg_dialog = true" color="indigo"
                                                class="font-weight-bold" rounded="0">
                                                <v-icon>mdi-plus</v-icon>ADD</v-btn>
                                        </template>
                                    </v-tooltip>
                                </v-toolbar>
                                <v-divider />
                                <v-card-text variant="tonal" class="">
                                    <v-list>
                                        <v-list-item value="notifications" v-for=" sg, index  in  sg_data " :key="index">
                                            <v-list-item-title> Salary Grade: {{ sg.salary_grade }}</v-list-item-title>
                                            <v-list-item-subtitle> Equivalent : {{ sg.equivalent }}</v-list-item-subtitle>
                                            <template v-slot:append>
                                                <v-btn color="grey-lighten-1" icon="mdi-information" variant="text"></v-btn>
                                            </template>
                                        </v-list-item>
                                    </v-list>
                                </v-card-text>
                            </v-sheet>
                        </v-col>
                        <v-col cols="6">
                            <v-sheet class="pl-2" border height="76vh">
                                <v-toolbar color="white">
                                    <template v-slot:prepend>
                                        <v-icon color="green darken-2">mdi-account</v-icon>
                                    </template>
                                    <b class="ml-3"> POSITION</b>
                                    <v-spacer />
                                    <v-tooltip text="Click to add Position" location="top">
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" @click="position_dialog = true" color="indigo"
                                                class="font-weight-bold" rounded="0">
                                                <v-icon>mdi-plus</v-icon>ADD</v-btn>
                                        </template>
                                    </v-tooltip>
                                </v-toolbar>
                                <v-divider />
                                <v-card-text variant="tonal">
                                    <v-list>
                                        <v-list-item value="notifications" v-for=" position, index  in  position_data "
                                            :key="index">
                                            <v-list-item-title> {{ position.title }}</v-list-item-title>
                                            <v-list-item-subtitle> Salary Grade : {{ position.sg }}</v-list-item-subtitle>
                                            <template v-slot:append>
                                                <v-btn color="grey-lighten-1" icon="mdi-information" variant="text"></v-btn>
                                            </template>
                                        </v-list-item>
                                    </v-list>
                                </v-card-text>
                            </v-sheet>
                        </v-col>
                    </v-row>

                </v-col>

            </v-row>



        </v-card-text>



        <v-dialog v-model="user_invite_dialog" max-width="40%">
            <v-sheet>
                <v-toolbar color="indigo" border>
                    <v-list-item class="pl-2" density="compact">
                        <template v-slot:prepend>
                            <v-avatar class="mr-1" variant="text">
                                <v-icon icon="mdi-account" dark />
                            </v-avatar>
                        </template>
                        <v-list-item-title> USER INVITE FORM</v-list-item-title>
                        <v-list-item-subtitle> Enter User Information</v-list-item-subtitle>
                    </v-list-item>
                    <v-spacer />
                    <v-btn @click="user_invite_dialog = false" class="mr-0" rounded="0" icon="mdi-close" />
                </v-toolbar>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12"><v-text-field v-model="school_user.email" density="compact" hide-details
                                label="Email address" prepend-inner-icon="mdi-email-outline" variant="outlined" /></v-col>
                        <v-col cols="4"><v-text-field v-model="school_user.firstname" density="compact" hide-details
                                label="Firstname" variant="outlined" /></v-col>
                        <v-col cols="4"><v-text-field v-model="school_user.middlename" density="compact" hide-details
                                label="Middlename" variant="outlined" /></v-col>
                        <v-col cols="4"><v-text-field v-model="school_user.lastname" density="compact" hide-details
                                label="Lastname" variant="outlined" /></v-col>
                        <v-col cols="4"><v-text-field v-model="school_user.contact_number" density="compact" hide-details
                                label="Contact Number" variant="outlined" /></v-col>
                        <v-col cols="4">
                            <v-select v-model="school_user.role" :items="roles" item-title="name" item-value="_id"
                                label="Role" hide-details /></v-col>
                    </v-row>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                    <v-row dense justify="center">
                        <v-col cols="4">
                            <v-btn @click="create_user" variant="tonal" color="indigo" block>
                                <v-icon class="pr-2" size="28"> mdi-message-text-fast</v-icon> Send Invite
                            </v-btn>
                        </v-col>
                    </v-row>

                </v-card-actions>
            </v-sheet>
        </v-dialog>
        <commons-dialog max-width="35%" v-model="sg_dialog" icon="mdi-school" :title="'Create Salary Grade'"
            @submit="create_sg" :submitText="'SUBMIT'">
            <v-card-text>
                <v-text-field v-model="sg.salary_grade" label="Salary Grade" />
                <v-text-field v-model="sg.equivalent" label="Equivalent" />
            </v-card-text>
        </commons-dialog>
        <commons-dialog max-width="35%" v-model="position_dialog" icon="mdi-school" :title="'Create Position'"
            @submit="create_position" :submitText="'SUBMIT'">
            <v-card-text>
                <v-text-field v-model="position.title" label="Position Title" />
                <v-select v-model="position.sg" :items="sg_item" label="Salary Grade" item-value="_id" />
            </v-card-text>
        </commons-dialog>


    </v-sheet>
</template>
<script setup lang="ts">
const router = useRouter();
const route = useRoute();
import { ref } from 'vue';
import swal from 'sweetalert';

import useAuth from "~/store/auth";

definePageMeta({ layout: "std-applicant" })


onBeforeMount(() => {
    get_users(),
        get_apts(),
        get_sg(),
        get_school_position()
})

const auth = useAuth().user;

const school_user = ref<SmsUser>({
    username: "",
    password: "",
    admin: false,
    email: "",
    last_name: "",
    middle_name: "",
    first_name: "",
    contact_number: "",
    type: "School",
    role: "",
    designation_information: {
        division: "",
        school: route.query.id,
    },
    status: "pending",
});


const { $rest } = useNuxtApp();
const is_hovered = ref(false);

const roles = ref([]);
const get_apts = async () => {

    const domain = auth.access[0].domain_id;
    if (!domain) return swal({ title: "Fuck" })
    const { data, error } = await $rest("admin/policy-authority/get-apts", { method: "GET", query: { domain_id: domain } });

    const apts = data.filter((v: any) => v.internal === false);
    roles.value = apts;
}

const user_invite_dialog = ref(false);
async function create_user() {
    const { data, error } = await $rest('sms-school/create-school-user', {
        method: "POST",
        body: { ...school_user.value }

    })

    if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
    user_invite_dialog.value = ref(false)
    get_users()
    return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
const users_data = ref<SmsUser[]>([])
async function get_users() {
    const { data, error } = await $rest('sms-school/get-school-users', {
        method: "GET",
        query: { id: route.query.id }

    });
    users_data.value = data;
}


// SALARY GRADE
const sg_dialog = ref(false);
const sg = ref<SalaryGrade>({

    salary_grade: 0,
    equivalent: 0
});
async function create_sg() {
    const { data, error } = await $rest('sms-salary-grade/create-school-sg', {
        method: "POST",
        body: { ...sg.value }

    })
    if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
    sg_dialog.value = false
    get_sg()
    return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
/**
 * HANDLES FETCHING SALARY GRADE
 */


const sg_data = ref<SalaryGrade[]>([]);
async function get_sg() {
    const { data, error } = await $rest('sms-salary-grade/get-school-sg', {
        method: "GET",
    })

    sg_data.value = data
}
const sg_item = computed(() => {
    return sg_data.value.map((v: SalaryGrade) => {
        return {
            ...v,
            title: Number(v.salary_grade)
        };
    });
});


const position_dialog = ref(false);
interface Position {
    title: String,
    sg: String,
}
const position = ref<Position>({
    title: "",
    sg: "",
});
async function create_position() {
    const { data, error } = await $rest('sms-position/create-school-position', {
        method: "POST",
        body: { ...position.value }

    })
    if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
    position_dialog.value = false
    return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
/**
 * HANDLES FETCHING SALARY GRADE
 */


const position_data = ref<[Position]>([]);
async function get_school_position() {
    const { data, error } = await $rest('sms-position/get-school-position', {
        method: "GET",
    })

    position_data.value = data
}




</script>
<style scoped>
.user-item {
    transition: background-color 0.3s ease-in-out;
}

.user-item:hover {
    background-color: #E8EAF6;
}
</style>