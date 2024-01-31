<template>
  <v-sheet>
    <!-- cols="10" xxl="8" xl="8" lg="10" -->
    <v-row dense justify="center">
      <v-col cols="12" class="font-weight-bold text-h6">
        NEW GOVERNMENT PERMIT (FOR REVIEW)
      </v-col>
      <v-col cols="12" class="pl-5 font-weight-bold text-h6">
        School Profile
      </v-col>
      <v-col cols="12">
        <v-sheet class="mx-auto">
          <v-card-item>
            <v-card-title class="font-weight-bold">SAMAR STATE UNIVERSITY</v-card-title>
            <v-card-subtitle>
              <i class="me-1 text-blue"> <v-icon icon="mdi-gmail" size="small" color="red" />
                samarstateuniversity@gamail.com</i>
              <br />
              <span class="me-1"> <v-icon color="blue" icon="mdi-map-marker-star-outline" size="small" />
                Guisorongan
                Catbalogan Samar</span>
            </v-card-subtitle>
            <div>
              <v-chip-group>
                <v-chip>3563265234</v-chip>

                <v-chip>Muntinlupa</v-chip>

                <v-chip>Public</v-chip>

                <v-chip>District 3</v-chip>
              </v-chip-group>
            </div>
          </v-card-item>

          <v-card-text>
            <div class="text-subtitle-1">
              Principal: <b class="text-grey"> Marianne Mae Paclian</b>
            </div>
            <div class="text-subtitle-1">
              <v-icon color="success" icon="mdi-phone" size="small" /> +639512165312
            </div>
            <div class="text-subtitle-2 text-blue font-italic">
              <v-icon color="blue" icon="mdi-gmail" size="small" /> mariannemaepaclian@gmail.com
            </div>
          </v-card-text>

        </v-sheet>
      </v-col>

    </v-row>
  </v-sheet>
</template>
<script lang="ts" setup>
definePageMeta({ layout: "barren" })
const router = useRouter();
import swal from 'sweetalert';
import useAuth from "~/store/auth";




</script>
<style scoped>
* {
  font-size: 13px
}
</style>
