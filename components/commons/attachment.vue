<template>
    <v-card variant="tonal" border>
        <v-card-text class="text-center">
            <h6 class="text-caption mb-2 text-indigo text-uppercase font-weight-bold">{{ title }}</h6>
            <v-btn class="mb-2" variant="outlined" color="primary" @click="selectFile">Select File</v-btn>
            <v-file-input class="d-none" type="file" ref="img_uploader" @change="handleFileChange" />
            <h6 class="text-caption text-body-1">Maximum Document Size: 16 MB</h6>
            <div v-if="selectedFile">
                <p class="text-body-1">Selected File: {{ selectedFile.name }}</p>
            </div>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import swal from 'sweetalert';

const title = "Your Component Title";
let selectedFile = null;

const selectFile = () => {
    const fileInput = refs.img_uploader;
    if (fileInput) {
        fileInput.click();
    }
};

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        swal('File Selected', `Selected file: ${file.name}`, 'success');
        selectedFile = file;
    }
};
</script>
