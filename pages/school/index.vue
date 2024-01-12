<template>
    <v-sheet width="85%" class="mx-auto ma-5">
        <v-sheet class="pa-6" height="auto" color="grey-lighten-4">
            <v-row no-gutters>
                <v-col cols="12" class="text-h6 font-weight-bold text-indigo">School Users </v-col>
                <v-col cols="12" class="text-grey"> A brief overview of school users. </v-col>
            </v-row>
        </v-sheet>
        <v-card-text class="overflow-y-auto h-100">
            <v-sheet>
                <v-btn prepend-icon="mdi-pencil-plus" @click="user_invite_dialog = true" color="indigo">
                    Invite
                    User</v-btn>
                <v-sheet class="overflow-y-auto d-flex flex-wrap ga-3 ">
                    <v-sheet class="pa-1 pt-2" width="33.3%" variant="tonal" v-for="user, index in users_data" :key="index">
                        <v-alert rounded="0" class="my-1 user-item space-around" border="start" border-color="indigo">
                            <div>
                                <div class="d-flex mb-1">
                                    <div class="text-uppercase  text-indigo text-body-1"> {{ user.firstname
                                    }}
                                        {{
                                            user.lastname }}
                                    </div>
                                    <v-spacer />
                                    <div> <v-chip density="compact" class="text-uppercase text-overline" color="success">{{
                                        user.status }}</v-chip></div>
                                </div>
                                <div class="text-caption font-weight-bold">
                                    {{ user.role
                                    }}
                                </div>


                                <div class="text-caption"> <v-icon color="red"> mdi-email</v-icon> <u class="text-blue">{{
                                    user.email
                                }}</u>
                                </div>
                                <div class="text-caption"> <v-icon color="success"> mdi-phone</v-icon> {{
                                    user.contact_number }}</div>
                            </div>
                        </v-alert>
                    </v-sheet>
                </v-sheet>
            </v-sheet>

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
        get_apts()
})

const auth = useAuth().user;

const school_user = ref<SmsUser>({
    username: "",
    password: "",
    admin: false,
    email: "",
    lastname: "",
    middlename: "",
    firstname: "",
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



</script>
<style scoped>
.user-item {
    transition: background-color 0.3s ease-in-out;
}

.user-item:hover {
    background-color: #E8EAF6;
}
</style>