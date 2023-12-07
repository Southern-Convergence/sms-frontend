
<template>
    <v-container class="h-100">
        <v-card>
            <v-toolbar color="indigo" border>
                <v-list-item class="pl-2" density="compact">
                    <template v-slot:prepend>
                        <v-avatar class="mr-1" variant="text">
                            <v-icon icon="mdi-account" dark />
                        </v-avatar>
                    </template>
                    <v-list-item-title> User Management</v-list-item-title>
                    <v-list-item-subtitle>A brief overview of school users.</v-list-item-subtitle>
                </v-list-item>
                <v-spacer></v-spacer>
                <v-btn @click="user_invite_dialog = true" variant="outlined">
                    <v-icon>mdi-plus</v-icon> Invite User</v-btn>
            </v-toolbar>
            <v-tabs density="compact" v-model="tab" color="primary">

                <v-tab class="mx-2" :value="sdo">
                    School Division Office
                </v-tab>
                <v-tab class="mx-2" :value="ro">
                    Regional Office
                </v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item value="sdo">
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="6" v-for="sdo in get_sdo" :key="sdo">
                                <v-card class="mx-auto" color="indigo" elevation="2" variant="tonal">
                                    <v-card-item>
                                        <div>
                                            <div class="d-flex text-body-1 mb-1">
                                                <div> Name : <b class="text-uppercase">{{ sdo.lastname }} , {{ sdo.firstname
                                                }}</b>
                                                </div>
                                                <v-spacer />
                                                <div> <v-chip>{{
                                                    sdo.status }}</v-chip></div>

                                            </div>
                                            <div class="text-body-2"> Email : {{ sdo.email }}</div>
                                            <div class="text-body-2"> Contact Number : {{ sdo.contact_number }}</div>
                                            <div class="text-body-2 mt-4">{{ sdo.type }}</div>
                                            <div class="text-body-2">{{ sdo.role }}</div>
                                        </div>
                                    </v-card-item>
                                    <v-card-actions>
                                        <v-btn @click="user_invite_dialog.dialog = true" color="indigo" variant="tonal">
                                            View Information
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-window-item>
                <v-window-item value="ro">
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="6" v-for="ro in get_ro" :key="ro">
                                <v-card class="mx-auto" color="indigo" elevation="2" variant="tonal">
                                    <v-card-item>
                                        <div>
                                            <div class="d-flex text-body-1 mb-1">
                                                <div> Name : <b class="text-uppercase">{{ ro.lastname }} , {{ ro.firstname
                                                }}</b>
                                                </div>
                                                <v-spacer />
                                                <div> <v-chip>{{
                                                    ro.status }}</v-chip></div>



                                            </div>
                                            <div class="text-body-2"> Email : {{ ro.email }}</div>
                                            <div class="text-body-2"> Contact Number : {{ ro.contact_number }}</div>
                                            <div class="text-body-2 mt-4">{{ ro.type }}</div>
                                            <div class="text-body-2">{{ ro.role }}</div>
                                        </div>
                                    </v-card-item>
                                    <v-card-actions>
                                        <v-btn @click="user_invite_dialog.dialog = true" color="indigo" variant="tonal">
                                            View Information
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>

                    </v-card-text>
                </v-window-item>
            </v-window>
        </v-card>

        <!-- Dialog -->
        <v-dialog v-model="user_invite_dialog" max-width="40%">
            <v-card>
                <v-toolbar color="indigo" border>
                    <v-list-item class="pl-2" density="compact">
                        <template v-slot:prepend>
                            <v-avatar class="mr-1" variant="text">
                                <v-icon icon="mdi-account" dark />
                            </v-avatar>
                        </template>
                        <v-list-item-title> User Information</v-list-item-title>
                        <v-list-item-subtitle> Invite user form</v-list-item-subtitle>
                    </v-list-item>
                    <v-spacer />
                    <v-btn @click="user_invite_dialog = false" class="mr-0" rounded="0" icon="mdi-close" />
                </v-toolbar>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="5"><v-text-field v-model="user.lastname" label="Lastname" hide-details /></v-col>
                        <v-col cols="5"><v-text-field v-model="user.firstname" label="Firstname" hide-details /></v-col>
                        <v-col cols="2"><v-text-field v-model="user.middlename" label="MI" hide-details /></v-col>

                        <v-col cols="6"><v-text-field v-model="user.email" label="Email Address" hide-details /></v-col>
                        <v-col cols="6"><v-text-field v-model="user.contact_number" label="Contact Number"
                                hide-details /></v-col>

                        <v-col cols="6"><v-select v-model="user.type" label="Type" :items="$user_type"
                                hide-details /></v-col>
                        <v-col cols="6"><v-text-field v-model="user.role" label="Role" hide-details /></v-col>
                    </v-row>

                    <v-row dense v-if="user.type === 'School'">
                        <v-col cols="6"><v-text-field v-model="user.school.division" label="Division"
                                hide-details /></v-col>
                        <v-col cols="6"><v-text-field v-model="user.school.school_name" label="School Name"
                                hide-details /></v-col>
                        <v-col cols="6"><v-text-field v-model="user.school.principal" label="Principal Name"
                                hide-details /></v-col>
                        <v-col cols="6"><v-text-field v-model="user.school.address" label="School Address"
                                hide-details /></v-col>
                        <v-col cols="6"><v-text-field v-model="user.school.school_email" label="Email"
                                hide-details /></v-col>

                    </v-row>

                </v-card-text>
                <v-divider />
                <v-card-actions>
                    <v-row dense justify="center">
                        <v-col cols="4">
                            <v-btn @click="user_invite_dialog = false" variant="tonal" color="error" block>Cancel</v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn @click="create_user" variant="tonal" color="success" block>
                                Submit
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { $rest } = useNuxtApp();
import swal from 'sweetalert';

definePageMeta({
    layout: "barren"
});
const { $user_type } = useNuxtApp();

onBeforeMount(() => {
    get_users()
})

const tab = ref(0);
const count = ref(10);


const user = ref({
    date: new Date(),
    ...{} as User,
    status: 'Pending',
    school: ref({} as School)
});


const items = ref([
    'School Division Office Users', 'Regional Office Users',
]);

const onUserTypeChange = () => {
    // Additional logic if needed
    if (user.type === 'School') {
        user.school = { division: '', school_name: '', principal: '', address: '', school_email: '' };
    } else {
        user.school = null; // or any other appropriate value
    }
};

const user_invite_dialog = ref(false);

async function create_user() {
    const { data, error } = await $rest('user/create-user', {
        method: "POST",
        body: { ...user.value }

    })
    console.log(data);
    console.log(error);


    if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
    return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}

const users_data = ref([])
async function get_users() {
    const { data, error } = await $rest('user/get-users', {
        method: "GET",
    })
    users_data.value = data

}

const get_ro = computed(() => {
    return users_data.value.filter((i) => i.type == 'Regional Office');
})

const get_sdo = computed(() => {
    return users_data.value.filter((i) => i.type == 'School Division Office' || i.type == 'School');
})
</script>
