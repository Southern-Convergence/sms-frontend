<template>
  <v-sheet height="100vh" class="d-flex align-center justify-center">
    <v-card class="w-100 d-flex align-center justify-center elevation-3" rounded="lg">
      <v-sheet class="w-50 pa-10 gradient-background" height="70vh">
        <v-card-title class="text-h6 mt-5 text-white"> WELCOME to
          <strong>DepEd NCR Reclassification System</strong>
        </v-card-title>
        <v-card-subtitle class="text-grey">Elevate Your Career: A Guide to the Reclassification System </v-card-subtitle>

        <v-card-text>
          <v-list-item class="pl-2" density="compact">
            <template v-slot:prepend>
              <v-avatar class="mr-1" variant="text">
                <v-icon color="amber"> mdi-seal </v-icon>
              </v-avatar>
            </template>
            <v-list-item-title class="text-white">Individual Qualification</v-list-item-title>
            <!-- <v-list-item-subtitle></v-list-item-subtitle> -->
          </v-list-item>
          <v-row no-gutters>
            <v-col cols="12" class="pa-2">
              <v-select variant="solo" label="Select Position" hide-details prepend-inner-icon="mdi-account-hard-hat" />
            </v-col>
            <!-- <v-col cols="12" class="pa-2">
              <v-select :items="['Elementary', 'Secondary']" variant="solo" prepend-inner-icon="mdi-home" label=" Education
                Level" hide-details />
            </v-col> -->
            <v-col cols="12" class="pa-2">
              <v-select variant="solo" prepend-inner-icon="mdi-school" label=" Education" hide-details multiple
                item-value="_id" />
            </v-col>
            <v-col cols="12" class="pa-2">
              <v-select variant="solo" prepend-inner-icon="mdi-head-cog-outline" label=" Experience" hide-details
                multiple />
            </v-col>
            <v-col cols="12" class="pa-2">

              <v-text-field variant="solo" prepend-inner-icon="mdi-human-male-board" label=" Enter total training hours"
                hide-details type="number" />
            </v-col>
            <v-col cols="12" class="pa-2">
              <v-select variant="solo" prepend-inner-icon="mdi-star" label=" Performance Rating" hide-details />
            </v-col>

          </v-row>
        </v-card-text>
      </v-sheet>
      <v-sheet class="w-50  d-flex align-center" height="70vh" color="#E3F2FD">
        <div class="mx-auto w-100 pa-10" height="43vh">
          <!-- <v-toolbar color="transparent">
            <v-list-item class="pl-2" density="compact">
              <template v-slot:prepend>
                <v-avatar class="mr-1" variant="text">
                  <v-icon color="primary">mdi-certificate</v-icon>
                </v-avatar>
              </template>
              <v-list-item-title>Qualification Standards</v-list-item-title>
            </v-list-item>
          </v-toolbar>


          <v-list-item>
            Position : <b></b>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Education :</v-list-item-title>
            <v-list-item-subtitle> Sample</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Experience :</v-list-item-title>
            <v-list-item-subtitle> Sample</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Experience :</v-list-item-title>
            <v-list-item-subtitle> Sample</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Experience :</v-list-item-title>
            <v-list-item-subtitle> Sample</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Experience :</v-list-item-title>
            <v-list-item-subtitle> Sample</v-list-item-subtitle>
          </v-list-item>
-->
        </div>
      </v-sheet>

    </v-card>
  </v-sheet>
</template>

<script setup>

definePageMeta({ layout: "barren" });

</script>

<style scoped>
.gradient-background {
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(13, 13, 110, 1) 27%, rgba(22, 22, 166, 1) 56%, rgba(0, 212, 255, 1) 100%);
}

.other {
  background: rgb(253, 253, 243);
  background: radial-gradient(circle, rgba(253, 253, 243, 1) 11%, rgba(250, 252, 243, 1) 24%, rgba(248, 248, 245, 1) 44%, rgba(224, 244, 255, 1) 66%, rgba(220, 245, 247, 1) 82%);
}
</style>