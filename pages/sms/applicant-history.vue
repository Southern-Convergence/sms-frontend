
<template>
  <v-container class="h-100 d-flex  align-center justify-center">
    <v-sheet border class="w-50">
      <v-toolbar color="indigo" border>
        <v-list-item class="pl-2" density="compact">
          <template v-slot:prepend>
            <v-avatar class="mr-1" variant="text">
              <v-icon icon="mdi-history" dark />
            </v-avatar>
          </template>

          <v-list-item-title>Reclassification Application History</v-list-item-title>

        </v-list-item>
        <v-spacer>
        </v-spacer>

      </v-toolbar>

      <v-card-text> <v-sheet width="auto" border>
          <v-timeline side="end">
            <v-timeline-item>


              <v-sheet border class="elevation-2 pa-3" width="400">
                <v-card-title class="text-orange"> Pending for Approval </v-card-title>
                <v-card-subtitle class="font-weight-bold">
                  Marianne Mae Paclian
                </v-card-subtitle>
                <v-card-subtitle> January 02, 2023</v-card-subtitle>
              </v-sheet>
            </v-timeline-item>
            <v-timeline-item>


              <v-sheet border class="elevation-2 pa-3" width="400">
                <v-card-title class="text-success"> Approved </v-card-title>
                <v-card-subtitle class="font-weight-bold">
                  Marianne Mae Paclian
                </v-card-subtitle>
                <v-card-subtitle> January 02, 2023</v-card-subtitle>
              </v-sheet>
            </v-timeline-item>
            <v-timeline-item>


              <v-sheet border class="elevation-2 pa-3" width="400">
                <v-card-title class="text-success"> Approved </v-card-title>
                <v-card-subtitle class="font-weight-bold">
                  Marianne Mae Paclian
                </v-card-subtitle>
                <v-card-subtitle> January 02, 2023</v-card-subtitle>
              </v-sheet>
            </v-timeline-item>
            <v-timeline-item size="large">


              <v-sheet border class="elevation-2 pa-3" width="400">
                <v-card-title class="text-error"> Dissapproved </v-card-title>
                <v-card-subtitle class="font-weight-bold">
                  Marianne Mae Paclian
                </v-card-subtitle>
                <v-card-subtitle> January 02, 2023</v-card-subtitle>
                <v-card-subtitle class="text-error">
                  Remarks : (If Dissapproved)</v-card-subtitle>
                <v-card-text> Bakit ganyan ayuko niyan</v-card-text>
              </v-sheet>
            </v-timeline-item>
          </v-timeline>
        </v-sheet> </v-card-text>
    </v-sheet>

  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';



</script>
