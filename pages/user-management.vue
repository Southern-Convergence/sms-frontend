
<template>
    <v-sheet width="85%" class="mx-auto ma-5">
        <v-card height="90vh">
            <v-sheet class="pa-6" height="auto" color="grey-lighten-4">
                <v-row no-gutters>
                    <v-col cols="12" class="text-h6 font-weight-bold text-indigo">USER MANAGEMENT </v-col>
                    <v-col cols="12" class="text-grey"> A brief overview of users. </v-col>
                </v-row>
            </v-sheet>
            <v-card-text>
                <v-row dense>
                    <v-col cols="8">
                        <v-btn prepend-icon="mdi-pencil-plus" @click="user_invite_dialog = true" color="indigo">
                            Invite
                            User</v-btn>
                        <v-sheet class="overflow-y-auto d-flex flex-wrap ga-3 ">
                            <v-sheet class="pa-1 pt-2" width="50%" variant="tonal" v-for="user, index in users_data"
                                :key="index">
                                <v-alert rounded="0" class="my-1  space-around" border="start" border-color="indigo">
                                    <div>
                                        <div class="d-flex mb-1">
                                            <div class="text-uppercase  text-indigo text-body-1"> {{ user.firstname
                                            }}
                                                {{
                                                    user.lastname }}
                                            </div>
                                            <v-spacer />
                                            <div> <v-chip density="compact" class="text-uppercase text-overline"
                                                    color="success">{{
                                                        user.status }}</v-chip></div>
                                        </div>
                                        <!-- <div class="text-body-2">{{ sdo.type }}</div> -->
                                        <div class="text-body-2"><b> {{ user.role }}</b> <b v-if="user.division"> of
                                                {{
                                                    user.division.title
                                                }}</b>
                                        </div>
                                        <div class="text-caption font-weight-bold mb-2">{{ user.type }}</div>

                                        <div class="text-caption"> <v-icon color="red"> mdi-email</v-icon> <u
                                                class="text-blue">{{ user.email }}</u>
                                        </div>
                                        <div class="text-caption"> <v-icon color="success"> mdi-phone</v-icon> {{
                                            user.contact_number }}</div>
                                    </div>
                                </v-alert>
                            </v-sheet>

                        </v-sheet>

                    </v-col>
                    <v-col cols="4">
                        <v-sheet class="pl-2 w-100">
                            <v-btn @click="create_sdo_dialog = true" prepend-icon="mdi-pencil-plus" color="success"
                                class="mr-0 mb-3"> Create
                                School Division Office </v-btn>
                            <v-sheet height="70vh" class="overflow-auto">
                                <v-sheet variant="tonal" v-for="(sdo, index) in sdo_data" :key="index" class="pb-2 mr-2">
                                    <v-alert class="user-item" @click="route_to_sdo(sdo._id)" border="start"
                                        border-color="success" color="green-ligthen-5" rounded="0">
                                        <div class="font-weight-bold text-uppercase text-subtitle-1
">
                                            {{ sdo.title }}
                                        </div>
                                        <div>
                                            <v-icon color="blue"> mdi-map-marker</v-icon> {{ sdo.address }}
                                        </div>
                                        <div class="text-blue font-italic text-decoration-underline">
                                            <v-icon color="red"> mdi-email</v-icon> {{ sdo.email }}
                                        </div>
                                        <div>
                                            <v-icon color="success"> mdi-phone</v-icon> {{ sdo.telephone }}
                                        </div>
                                    </v-alert>
                                </v-sheet>
                            </v-sheet>
                        </v-sheet>

                    </v-col>
                </v-row>
            </v-card-text>


        </v-card>

        <!-- Dialog -->
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
                    <v-form ref="user_form">
                        <v-row dense>
                            <v-col cols="12"><v-text-field v-model="user.email" density="compact" label="Email address"
                                    prepend-inner-icon="mdi-email-outline" required
                                    :rules="[(v) => /.+@.+/.test(v) || 'Invalid Email address']" /></v-col>
                            <v-col cols="4"><v-text-field v-model="user.firstname" density="compact" hide-details="auto"
                                    label="Firstname" required :rules="[v => !!v || 'Firstname is required']" /></v-col>
                            <v-col cols="4"><v-text-field v-model="user.middlename" density="compact" hide-details="auto"
                                    label="Middlename" /></v-col>
                            <v-col cols="4"><v-text-field v-model="user.lastname" density="compact" hide-details="auto"
                                    label="Lastname" required :rules="[v => !!v || 'Lastname is required']" /></v-col>
                            <v-col cols="4"><v-text-field v-model="user.contact_number" density="compact"
                                    hide-details="auto" label="Contact Number" type="tel"
                                    :rules="[v => !!v || 'Contact Number is required']" /></v-col>
                            <v-col cols="12"> Roles and Designation </v-col>
                            <v-col cols="6"><v-select v-model="user.type" label="Type"
                                    :items="['School Division Office', 'Regional Office']" hide-details="auto" required
                                    :rules="[v => !!v || 'Type is required']" /></v-col>
                            <v-col cols="6" v-if="user.type !== 'Regional Office'">
                                <v-select v-model="user.designation_information.division" :items="sdo_data" label="Division"
                                    item-value="_id" hide-details="auto" /></v-col>
                            <v-col cols="6">
                                <v-select v-model="user.role" :items="roles" item-title="name" item-value="_id" label="Role"
                                    hide-details="auto" :rules="[v => !!v || 'Role is required']" />
                            </v-col>
                        </v-row>
                    </v-form>
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

        <commons-dialog v-model="create_sdo_dialog" max-width="35%" icon="mdi-school" title="Create School Division Office"
            @submit="create_sdo" submitText="Submit">
            <v-card-text>
                <v-form ref="create_sdo_form">
                    <v-text-field v-model="sdo.title" label=" Division" hide-details="auto" required
                        :rules="[v => !!v || 'Division is required']" />
                    <v-textarea class="mt-2" v-model="sdo.address" rows="3" label="Division Address" hide-details="auto"
                        prepend-inner-icon="mdi-map-marker" required :rules="[v => !!v || 'Address is required']" />
                    <v-text-field class="mt-2" v-model="sdo.email" label="Email Address" hide-details="auto"
                        prepend-inner-icon="mdi-email-outline" required
                        :rules="[(v) => /.+@.+/.test(v) || 'Invalid Email address']" />
                    <v-text-field class="mt-2" v-model="sdo.telephone" type="tel" label="Telephone Number"
                        hide-details="auto" prepend-inner-icon="mdi-phone" />
                </v-form>
            </v-card-text>
        </commons-dialog>
    </v-sheet>
</template>

<script setup lang="ts">
const router = useRouter();
import { ref } from 'vue';
import swal from 'sweetalert';

import useAuth from "~/store/auth";

definePageMeta({ layout: "std-applicant" })


onBeforeMount(() => {
    Promise.all([
        get_users(),
        get_sdo(),
        get_apts()
    ])
})

const auth = useAuth().user;

const { $rest, $user_type, $ro_roles, $sdo_roles } = useNuxtApp();


const is_hovered = ref(false);



const user = ref<SmsUser>({
    username: "",
    password: "",
    admin: false,
    email: "",
    lastname: "",
    middlename: "",
    firstname: "",
    contact_number: "",
    type: "",
    role: "",
    designation_information: {
        division: "",
        school: "",
    },
    status: "pending",
});


/**
 * 
 */

const roles = ref([]);
const get_apts = async () => {

    const domain = auth.access[0].domain_id;
    if (!domain) return swal({ title: "Fuck" })
    const { data, error } = await $rest("admin/policy-authority/get-apts", { method: "GET", query: { domain_id: domain } });

    const apts = data.filter((v: any) => v.internal === false);
    roles.value = apts;
}



const user_invite_dialog = ref(false);
const user_form = ref();

async function create_user() {
    if (!user_form.value.isValid) {
        return swal({ title: "Invalid Email" })
    }
    swal({ title: "User sucessfully invited!" })
    const { data, error } = await $rest('user/create-user', {
        method: "POST",
        body: { ...user.value }

    })
    if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
    get_users()
    return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
const users_data = ref<SmsUser[]>([])
async function get_users() {
    const { data, error } = await $rest('user/get-users', {
        method: "GET",
    });

    users_data.value = data.filter((v) => !!v.role && v.role !== 'School Admin');
}


const sdo = ref<Sdo>({
    title: "",
    address: "",
    email: "",
    telephone: "",
})

/**
 * SDO 
 */
const create_sdo_dialog = ref(false)
const create_sdo_form = ref();

async function create_sdo() {
    if (!create_sdo_form.value.isValid) {
        return swal({ title: "Completed required field!" })
    }
    const { data, error } = await $rest('sms-sdo/create-sdo', {
        method: "POST",
        body: { ...sdo.value }
    });

    if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
    get_sdo();
    create_sdo_dialog.value = false;
    return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
const route_to_sdo = (id: string) => {
    router.push({
        name: 'sdo',
        query: {
            id: id
        }
    });
}
const sdo_data = ref<Sdo[]>([]);
async function get_sdo() {
    const { data, error } = await $rest('sms-sdo/get-sdo', {
        method: "GET",
    })
    sdo_data.value = data
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