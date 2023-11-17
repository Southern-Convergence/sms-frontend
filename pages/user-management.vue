
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
                <v-btn @click="user_invite_dialog.dialog = true" variant="outlined">
                    <v-icon>mdi-plus</v-icon> Invite User</v-btn>
            </v-toolbar>
            <v-tabs v-model="tab" color="primary">
                <v-tab class="mx-2" v-for="(item, index) in items" :key="index">
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-card-text v-if="tab === 0">
                <v-row dense>
                    <v-col cols="4" v-for="index in 7" :key="index">
                        <v-card class="mx-auto" color="indigo" elevation="2" variant="tonal">
                            <v-card-item>
                                <div>
                                    <div class="text-body-1 mb-1">
                                        Name : <b>Marianne Mae Paclian</b>
                                    </div>
                                    <div class="text-body-2"> Position : Teacher III or Role : Admin</div>
                                    <div class="text-body-2"> School : Samar State University</div>
                                    <div class="text-body-2"> Email : <i>mariannemaepaclian1998@gmail.com</i></div>
                                </div>
                            </v-card-item>
                            <v-card-actions>
                                <v-btn @click="user_invite_dialog.dialog = true" color="primary" variant="tonal">
                                    View Information
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text v-if="tab === 1">
                <v-row dense>
                    <v-col cols="4" v-for="index in 7" :key="index">
                        <v-card class="mx-auto" color="indigo" elevation="2" variant="tonal">
                            <v-card-item>
                                <div>
                                    <div class="text-body-1 mb-1">
                                        Name : <b>Marianne Mae Paclian</b>
                                    </div>
                                    <div class="text-body-2"> Position : Teacher III</div>
                                    <div class="text-body-2"> School : Samar State University</div>
                                    <div class="text-body-2"> Email : <i>mariannemaepaclian1998@gmail.com</i></div>
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
        </v-card>
        <commons-dialog max-width="40%" v-model="user_invite_dialog.dialog" icon="mdi-school"
            :title="user_invite_dialog.title" :subtitle="user_invite_dialog.subtitle" persistent>
            <v-card-text>
                <v-card class="mx-auto" flat>
                    <v-card-item>
                        <v-row dense>
                            <v-col cols="5"><v-text-field label="Firstname" hide-details /></v-col>
                            <v-col cols="2"><v-text-field label="MI" hide-details /></v-col>
                            <v-col cols="5"><v-text-field label="Lastname" hide-details /></v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="7"><v-text-field label="mariannemaepaclian@gmail.com" hide-details /></v-col>
                            <v-col cols="5"><v-text-field label="098765545678" hide-details /></v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="7"><v-select label="Type" :items="$user_type" hide-details /></v-col>
                            <v-col cols="5"><v-text-field label="Role" hide-details /></v-col>
                        </v-row>
                    </v-card-item>
                </v-card>
            </v-card-text>
            <v-divider />
            <v-card-actions>

                <v-row dense justify="center">
                    <v-col cols="6">
                        <v-btn variant="tonal" color="error" block>
                            CANCEL
                        </v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn variant="tonal" color="success" block>
                            SUBMIT
                        </v-btn>
                    </v-col>
                </v-row>


            </v-card-actions>
        </commons-dialog>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
    layout: "barren"
});
const { $user_type } = useNuxtApp();

const tab = ref(0); // Default tab index
const count = ref(10);

const items = ref([
    'School Division Office Users', 'Regional Office Users',
]);

const user_invite_dialog = ref({
    dialog: false,
    title: 'Invite User',
    subtitle: 'Your educational background and civil service information',
});
</script>
