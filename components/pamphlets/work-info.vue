<template>
  <wizards-pamphlet definition="work-info">
    <template v-slot:service-info>
      <v-row dense>
        <v-col cols="7">
          <v-row dense>
            <v-col cols="6">
              <v-text-field label="First Day of Service" type="date" hide-details />
            </v-col>
            <v-col cols="6">
              <v-text-field label="No. of Years in the Service" type="number" hide-details />
            </v-col>
            <v-col cols="12">
              <v-text-field label="No. of Years in current position" type="number" hide-details />
            </v-col>
            <v-col cols="12">
              <v-text-field label="Previous Experience with DepEd" hide-details />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
  </wizards-pamphlet>
</template>