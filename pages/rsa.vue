<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card class="rsa-item" elevation="2" :class="{ 'elevation-4': is_hovered }" variant="outlined" color="indigo">
          <v-card-item>
            <div class="text-h6 text-uppercase font-weight-bold">
              Chief Education Supervisor
            </div>
            <div class="text-subtitle-2 text-grey">
              Human Resourse Management System
            </div>
            <v-row no-gutters class="mt-2 text-caption">
              <v-col cols="3"> Plantilla Item No</v-col>
              <v-col cols="auto" class="font-weight-bold">: 83</v-col>
            </v-row>
            <v-row no-gutters class="text-caption">
              <v-col cols="3"> Salary Grade</v-col>
              <v-col cols="auto" class="font-weight-bold"> : 23</v-col>
            </v-row>
            <v-row no-gutters class="text-caption">
              <v-col cols="3"> Monthly Salary</v-col>
              <v-col cols="auto" class="font-weight-bold">: 50,000.00</v-col>
            </v-row>
          </v-card-item>
          <v-card-actions>
            <v-btn class="ml-2" density="compact" rounded="0" variant="tonal">
              UPDATE DETAILS
            </v-btn>
            <v-spacer />
            <div class="d-flex">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <div class="mt-1 pr-2 text-button" v-bind="attrs" v-on="on">
                    Calendar
                  </div>
                </template>
                <span>Tooltip text here</span>
              </v-tooltip>
              <v-checkbox color="primary" v-model="checkbox" hide-details />
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
const checkbox = ref(false)
const is_hovered = ref(false)
</script>

<style scoped>
.rsa-item {
  transition: background-color 0.3s ease-in-out;
}

.rsa-item:hover {
  background-color: #818fcd;
}
</style>
