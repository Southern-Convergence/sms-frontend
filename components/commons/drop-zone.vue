<template>
  <v-card v-bind="$attrs" v-on="$listeners" :class="upload_highlight ? 'text-bold-emphasis' : 'text-medium-emphasis'"
    :elevation="upload_highlight ? 2 : 0" @drop.prevent="on_drop" @dragover.prevent="on_drag" @dragenter.prevent="on_drag"
    @dragleave="on_leave" :color="upload_highlight ? 'light-blue-lighten-5' : ''" border>

    <v-window v-model="upload_state">
      <v-window-item value="prompt">
        <slot name="default" />

        <v-card-title class="d-block text-center">
          <v-avatar size="92" contain>
            <v-img src="/file-upload.svg" alt="upload-icon" />
          </v-avatar>
        </v-card-title>

        <v-card-text class="text-center">
          <h6 class="text-body-1">Drag & Drop a file here</h6>
          <h6 class="text-caption">Or</h6>
          <v-btn class="mb-2" @click="handle_file_pick" variant="outlined" color="primary">Select File</v-btn>
          <v-file-input class="d-none" type="file" ref="img_uploader" @change="img_conversion" />
          <h6 class="text-caption text-body-1">Maximum Document Size: {{ max_total_size }}MB</h6>
        </v-card-text>
      </v-window-item>

      <v-window-item value="tag">
        <div>
          <v-window v-model="focused_file" show-arrows>
            <template v-slot:prev><v-btn @click="focused_file--" icon="mdi-chevron-left" variant="text" /></template>
            <template v-slot:next><v-btn @click="focused_file++" icon="mdi-chevron-right" variant="text" /></template>

            <v-window-item v-for="file, i in uploaded_files" :key="i">
              <v-card class="text-center" rounded="lg">
                <v-layout d-flex>
                  <v-spacer />
                  <v-avatar :image="`/${file.icon}.svg`" rounded="0" size="96" />
                  <v-spacer />
                </v-layout>

                <v-layout v-if="loading" class="py-2" d-flex>
                  <v-spacer />
                  <v-sheet width="160">
                    <v-progress-linear height="6" color="primary" rounded="lg" indeterminate />
                  </v-sheet>
                  <v-spacer />
                </v-layout>

                <v-card-text class="px-6 py-0">
                  <h6 class="text-body-1 pt-2">{{ file.name }}</h6>
                  <h6 class="text-subtitle-2">File Size: {{ file.size }}</h6>
                </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>

          <v-card-text class="d-flex">
            <v-spacer />
            <v-btn @click="clear_upload" :disabled="loading" class="mr-2" color="warning" variant="text">Cancel</v-btn>
            <v-btn @click="upload_files" :disabled="loading" color="success" variant="outlined">Upload{{
              uploaded_files.length > 1 ? " All" : "" }}</v-btn>
            <v-spacer />
          </v-card-text>
        </div>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts" setup>
import swal from 'sweetalert';

const { $bytes2mem } = useNuxtApp();

const { loading, file_length, max_file_size, max_total_size } = withDefaults(defineProps<UploadProps>(), {
  loading: false,
  file_length: 1,
  max_total_size: 16,
  max_file_size: 16
});

type UploadProps = {
  loading: boolean;
  file_length: number;

  max_file_size: number;
  max_total_size: number;
}

const emit = defineEmits(["update:modelValue", "upload"]);
const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => events.forEach((event) => document.body.addEventListener(event, prevent_defaults)));
onUnmounted(() => events.forEach((event) => document.body.removeEventListener(event, prevent_defaults)));

const upload_highlight = ref(false);
const img_uploader = ref(null);

function on_drop(e: DragEvent) {
  /* @ts-ignore */
  const files = [...e.dataTransfer?.files!];

  if (files.length > file_length) {
    return swal({
      title: "Not allowed",
      text: `You are only allowed to upload ${file_length} file${file_length > 1 ? "s" : ""}`,
      icon: "error"
    });
  }

  emit('update:modelValue', files);
  upload_form.value.files = files;
  upload_state.value = "tag";
  upload_highlight.value = false;
}

function on_drag() {
  upload_highlight.value = true;
}

function on_leave() {
  upload_highlight.value = false;
}

function prevent_defaults(e: Event) {
  e.preventDefault();
}


const upload_form = ref({
  files: [] as File[]
});

const focused_file = ref(0);

const upload_state = ref("prompt");
const uploading = ref(false);

function clear_upload() {
  upload_state.value = "prompt";
  upload_form.value.files = [];
}

const EXCEL_MIMETYPES = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformatsofficedocument.spreadsheetml.template",
  "application/vnd.ms-excel.sheet.macroEnabled.12",
  "application/vnd.ms-excel.template.macroEnabled.12",
  "application/vnd.ms-excel.addin.macroEnabled.12",
  "application/vnd.ms-excel.sheet.binary.macroEnabled.12"
];
const WORD_MIMETYPES = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-word.document.macroEnabled.12",
  "application/vnd.ms-word.template.macroEnabled.12"
];
const POWERPOINT_MIMETYPES = [
  "application/mspowerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.presentationml.template",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
  "application/vnd.ms-powerpoint.addin.macroEnabled.12",
  "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
  "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
  "application/vnd.ms-powerpoint.template.macroEnabled.12"
];

const uploaded_files = computed(() => {
  const files = upload_form.value.files;

  return files.map((v) => {
    const { name, type, size } = v;

    let icon = "file";

    if (type.includes("audio")) icon = "file-sound";
    if (type.includes("image")) icon = "file-image";
    if (type.includes("video")) icon = "file-video";
    if (type.includes("text")) icon = "file-document";

    if (type.includes("pdf")) icon = "file-pdf";

    if (EXCEL_MIMETYPES.includes(type)) icon = "file-excel";
    if (WORD_MIMETYPES.includes(type)) icon = "file-word";
    if (POWERPOINT_MIMETYPES.includes(type)) icon = "file-powerpoint";

    return { name, type, size: $bytes2mem(size), icon }
  });
});

function handle_file_pick() {
  /* @ts-ignore */
  img_uploader.value.click()
}

async function upload_files() {
  emit("upload", upload_form.value.files);
}

async function img_conversion(e: any) {
  upload_form.value.files = e.target.files;
  upload_files();
}
</script>