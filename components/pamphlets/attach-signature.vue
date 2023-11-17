<template>
    <v-row dense justify="center" class="ma-2">
        <!-- For Signature -->
        <v-col cols="12" class="text-center">
            <!-- <v-img height="50" scr="/NCR.png" /> -->
            <v-icon>mdi-pencil </v-icon>
        </v-col>
        <v-col cols="12" class="text-center font-weight-bold text-uppercase ">{{ name }}</v-col>
        <v-col cols="12" class="text-center">
            <v-divider />
            {{ position }}
        </v-col>
        <v-row dense justify="center">
            <v-col cols="auto">
                <v-btn @click="clear" density="compact" class="font-weight-bold" variant="text" color="error">
                    Clear
                </v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn @click="sign" density="compact" class="font-weight-bold" variant="text" color="primary">
                    Sign
                </v-btn>
            </v-col>
        </v-row>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    name: String,
    position: String,
});

const clear = () => {
    // dik nasabot pa
};

const sign = () => {
    // dik nasabot pa
};
</script>
