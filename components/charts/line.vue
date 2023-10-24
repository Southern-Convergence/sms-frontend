<template>
  <LineChart :chart-data="data" :options="options" v-bind="$attrs"/>
</template>

<script lang="ts" setup>
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import { LineChart } from "vue-chart-3";

Chart.register(...registerables);

const { data, options } = withDefaults(defineProps<{
  data     : ChartData<"line">;
  options? : ChartOptions<"line">;
}>(), {});

</script>