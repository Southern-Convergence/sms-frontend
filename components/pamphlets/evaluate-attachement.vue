<template>
    <div>
        <v-row dense>
            <v-col cols="12" class="font-weight-bold text-subtitle-2 my-1">{{ props.title }}</v-col>
            <v-tooltip :text="props.tooltip" location="top">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" @click="handleButtonClick" variant="tonal" color="primary" density="compact">View
                        Attachment</v-btn>
                </template>
            </v-tooltip>

        </v-row>
        <v-row dense>
            <v-col cols="auto" class="mt-3 text-subtitle-2 font-weight-bold">Evaluation :</v-col>
            <v-col cols="auto">
                <v-checkbox v-model="props.valid" label="Valid" color="success" hide-details />
            </v-col>
            <v-col cols="auto">
                <v-checkbox v-model="props.invalid" label="Invalid" color="red" hide-details />
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="props.reason" label="Specify reason" hide-details variant="solo" />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';

interface Props {
    title: string;
    valid: boolean;
    invalid: boolean;
    reason?: string;
    tooltip?: string
}

const props = defineProps<Props>();


const handleButtonClick = () => {
    // dipak mram HAHA
}
</script>
