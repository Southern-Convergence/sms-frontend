<template>
  <v-card-text v-if="loading" class="d-block text-center">
    <v-progress-circular size="92" indeterminate />
    <h6 class="text-h6 mt-2">Loading</h6>
    <h6 class="text-subtitle-1">Fetching File Data</h6>
  </v-card-text>

  <v-card-text v-else-if="file_type === 'unknown'">
    <h6 class="text-h6">Unknown File Type</h6>

    <span>Download</span>
  </v-card-text>

  <v-layout class="d-flex">
    <embed class="pa-4 flex-grow-1" v-if="file_type === 'document'" :src="String($attrs.src)" :height="height" />
    <v-img class="pa-4" v-if="file_type === 'image'" :src="String($attrs.src)" :height="height" />
    <video class="pa-4 flex-grow-1" v-if="file_type === 'video'" :src="String($attrs.src)" controls />
    <audio class="pa-2 flex-grow-1" v-if="file_type === 'audio'" :src="String($attrs.src)" controls />
  </v-layout>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()

const { height } = withDefaults(defineProps<{height:any}>(), {height : 940});

onBeforeMount(async ()=> {
  if(attrs.src){
    loading.value = true;
    const result:any = await $fetch(attrs.src as string, { method : "HEAD" });
    type.value = result.type;
    loading.value = false;
  }
});

const type = ref("");
const loading = ref(true);

const file_type = computed(()=> {
  let _type = String(type.value);
  if(_type.includes("audio"))return "audio";
  if(_type.includes("image"))return "image";
  if(_type.includes("video"))return "video";
  if(_type.includes("text") || _type.includes("pdf"))return  "document";
  return "unknown";
});
</script>