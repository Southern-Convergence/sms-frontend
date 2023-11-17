
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

                    <v-list-item-title>List of Schools</v-list-item-title>
                    <v-list-item-subtitle>A brief overview of school profile.</v-list-item-subtitle>
                </v-list-item>
                <v-spacer></v-spacer>
                <v-btn @click="invite_school_dialog.dialog = true" variant="outlined">
                    <v-icon>mdi-plus</v-icon> Invite
                    School</v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row dense>
                    <v-col cols="4" v-for="index in 7" :key="index">
                        <v-card class="mx-auto" color="indigo" elevation="2" variant="tonal">
                            <v-card-item>
                                <div>
                                    <div class="text-body-1 mb-1">
                                        School : <b>Samar State University</b>
                                    </div>
                                    <div class="text-body-2"> Email : samarstate university@gmail.com</div>
                                    <div class="text-body-2"> Principal : Samar State University</div>
                                    <div class="text-body-2"> Contact Number : 09886434687</div>
                                </div>
                            </v-card-item>
                            <v-card-actions>
                                <v-btn @click="school_profile_dialog.dialog = true" color="primary" variant="tonal">
                                    View Profile
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>

        </v-card>
        <commons-dialog max-width="40%" v-model="school_profile_dialog.dialog" icon="mdi-school"
            :title="school_profile_dialog.title" :subtitle="school_profile_dialog.subtitle" :submitText="'Update'">
            <v-card-text>

                <v-card-item>
                    <v-card-title class="font-weight-bold">SAMAR STATE UNIVERSITY</v-card-title>
                    <v-card-subtitle>
                        <i class="me-1 text-blue"> <v-icon icon="mdi-gmail" size="small" color="red" />
                            samarstateuniversity@gamail.com</i>
                        <br />
                        <span class="me-1"> <v-icon color="blue" icon="mdi-map-marker-star-outline" size="small" />
                            Guisorongan
                            Catbalogan Samar</span>
                    </v-card-subtitle>
                    <div>
                        <v-chip-group>
                            <v-chip>3563265234</v-chip>

                            <v-chip>Muntinlupa</v-chip>

                            <v-chip>Public</v-chip>

                            <v-chip>District 3</v-chip>
                        </v-chip-group>
                    </div>
                </v-card-item>

                <v-card-text>
                    <div class="text-subtitle-1">
                        Principal: <b class="text-grey"> Marianne Mae Paclian</b>
                    </div>
                    <div class="text-subtitle-1">
                        <v-icon color="success" icon="mdi-phone" size="small" /> +639512165312
                    </div>
                    <div class="text-subtitle-2 text-blue font-italic">
                        <v-icon color="blue" icon="mdi-gmail" size="small" /> mariannemaepaclian@gmail.com
                    </div>
                </v-card-text>

                <v-divider class="mx-4 mb-1"></v-divider>
                <v-card-text>
                    <div class="text-subtitle-1">
                        Registrar: <b class="text-grey"> Marianne Mae Paclian</b>
                    </div>
                    <div class="text-subtitle-1">
                        <v-icon color="success" icon="mdi-phone" size="small" /> +639512165312
                    </div>
                    <div class="text-subtitle-2 text-blue font-italic">
                        <v-icon color="blue" icon="mdi-gmail" size="small" /> mariannemaepaclian@gmail.com
                    </div>
                </v-card-text>

            </v-card-text>
        </commons-dialog>
        <commons-dialog max-width="50%" v-model="invite_school_dialog.dialog" icon="mdi-school"
            :title="invite_school_dialog.title" :subtitle="invite_school_dialog.subtitle" :submitText="'Submit'">
            <v-card-text class="ma-2">
                <v-row dense>
                    <v-col cols="6"><v-text-field label="Name of School" hide-details /></v-col>
                    <v-col cols="6"><v-text-field label="Contact Person" hide-details /></v-col>
                    <v-col cols="6"><v-text-field label="School Address" hide-details /></v-col>
                    <v-col cols="6"><v-text-field label="Telephone Number" hide-details /></v-col>
                    <v-col cols="6"><v-text-field label="School Head" hide-details /></v-col>
                    <v-col cols="6"><v-select label="School Type" hide-details :items="$school_type" /></v-col>

                    <v-col cols="6"><v-text-field label="School Email" hide-details /></v-col>
                    <v-col cols="3"><v-text-field label="School ID" hide-details /></v-col>
                    <v-col cols="3"><v-text-field label="Years in Corporation" hide-details /></v-col>
                    <v-col cols="3"><v-select label="Division" hide-details :items="$divisions" /></v-col>
                    <v-col cols="3"><v-text-field label="District" hide-details /></v-col>
                </v-row>
            </v-card-text>
        </commons-dialog>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({ layout: "std-systems" })
const { $divisions, $school_type } = useNuxtApp();


const count = ref(10);

const items = ref([
    'School Division Office Users', 'Regional Office Users',
]);

const school_profile_dialog = ref({
    dialog: false,
    title: 'School Profile',
    subtitle: 'Your educational background and civil service information',
});

const invite_school_dialog = ref({
    dialog: false,
    title: 'School Profile',
    subtitle: 'Your educational background and civil service information',
});
</script>
