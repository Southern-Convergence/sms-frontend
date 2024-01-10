<template>
  <v-dialog v-model="props.dialog">
    <v-row no-gutters class="d-flex justify-center">
      <v-col cols="12" sm="12" lg="10" xl="8">
        <v-card>
          <v-card-title class="d-flex align-center justify-space-between">
            <span class="d-flex align-center text-overline">
              <v-icon class="mr-2">mdi-record</v-icon>
              <span>{{ props.title }}</span>
            </span>
            <v-icon @click="emit('close')">mdi-close</v-icon>
          </v-card-title>
          <v-divider />
          <v-card-text class="pa-1 ma-0">
            <v-sheet border height="80vh">
              <iframe v-for="item, index in src.link" :key="index" :src="`${CDN}${item}`" class="w-100 h-100" />
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script lang="ts" setup>

interface Props {
  dialog: boolean;
  src: Att;
  title: string;
}

const cfg = useRuntimeConfig();
const { CDN_ENDPOINT, DEV_CDN_ENDPOINT } = cfg.public;
const CDN = cfg.public.NODE_ENV === "development" ? DEV_CDN_ENDPOINT : CDN_ENDPOINT;

const props = withDefaults(defineProps<Props>(), { dialog: false, src: "", title: "" })
const emit = defineEmits(["click", "close"]);

</script>
