<template>
  <v-row dense>
    <v-col cols="12" xxl="6" xl="7" lg="6">
      <v-card class="px-4 pt-4 h-100" rounded="lg" elevation="2" border>
        <v-card-title class="text-center">ACM Activities</v-card-title>

        <v-card-text>
          <charts-line v-bind="acm_activity_cfg" :height="250" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn class="text-caption" color="primary" variant="text">View Complete Breakdown</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12" xxl="3" xl="5" lg="6">
      <v-card class="px-4 pt-4" rounded="lg" border>
        <v-card-title class="text-center">ACM Decisions</v-card-title>

        <v-card-text>
          <charts-pie v-bind="acm_decision_cfg" :height="250" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn class="text-caption" color="primary" variant="text">View Complete Breakdown</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>

definePageMeta({
  layout : "dev"
});

//Vital Metrics
const acm_activity_cfg = ref({
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "ACM Queries",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#1565C0",
        tension: 0.1,
      },
    ],
  },

  options: {
    responsive: true,
  },
});

const acm_decision_cfg = ref({
  data: {
    labels: ["Allow", "Deny", "Indeterminate"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
        hoverOffset: 4,
      },
    ],
  },

  options: {
    responsive: true,
  },
});

</script>