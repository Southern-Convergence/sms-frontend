<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage v-if="gcfg.ready"/>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import "v-calendar/dist/style.css";

import _ from "chart.js/auto";
import {useGlobalConfig} from "~~/store/index";

const gcfg = useGlobalConfig();
</script>