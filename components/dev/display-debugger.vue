<template>
  <v-sheet rounded="lg">
    <v-card-text class="py-1 d-flex">
      <v-chip variant="outlined" rounded="lg" label>
        Viewport: <span class="font-weight-bold">{{ display.width }}x{{ display.height }}</span>
      </v-chip>

      <v-chip class="ml-2" variant="outlined" rounded="lg" label>
        Breakpoint: <span class="text-uppercase font-weight-bold">{{ breakpoint }}</span>
      </v-chip>

      <v-chip class="ml-2" variant="outlined" rounded="lg" label>
        Mobile: <span class="font-weight-bold">{{ display.mobile }}</span>
      </v-chip>
    </v-card-text>
  </v-sheet>
</template>

<script lang="ts" setup>
import {useDisplay} from "vuetify";

const display = useDisplay();
const breakpoint = computed(()=> {
  const { xxl, xl, lg, md, sm, xs } = display;

  //Syntax looks silly, but dis is the only one liner I know of.
  return Object.entries({xxl, xl, lg, md, sm, xs}).filter(([_, v])=> v.value).map(([k])=> k)[0];
});
</script>