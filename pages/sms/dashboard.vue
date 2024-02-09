<template>
  <v-sheet class="pa-10">
    <v-card class="pa-10 " rounded="lg" flat>
      <v-card-text> <v-row justify="center" dense>
          <v-col cols="12">
            <h6 class="text-h5 reclass-title">Staffing Modification System Dashboard</h6>

            <h6 class="text-subtitle-2 text-medium-emphasis  ">Manage reclassification metrix and dashboard.
            </h6>
            <v-divider class="mt-4 mb-2" />
          </v-col>

        </v-row>
        <v-sheet height="40vh">
          <v-row>
            <v-col cols="5">
              <v-card class="pa-3 d-flex align-center justify-center h-100" color="primary" variant="tonal" rounded="lg">
                <v-card-text class="d-flex align-center justify-center">
                  <div>
                    <h5 class="text-h5  text-uppercase font-roboto"> Total Reclass Application</h5>
                    <h6 class="text-h1 py-10 text-center font-weight-bold">
                      1
                    </h6>
                    <h5 class="text-center"> 16 Schools Division Office</h5>
                  </div>
                </v-card-text>
              </v-card></v-col>
            <v-col cols="7">
              <v-row>
                <v-col cols="12" xl="6" lg="6">
                  <v-card class="pa-3" color="green" rounded="lg">
                    <div class=" justify-space-between py-4 pl-4">
                      <div>
                        <h5 class="font-roboto text-center"> EVALUATED</h5>
                        <h6 class="text-h1 text-center font-weight-bold">
                          1
                        </h6>
                      </div>
                    </div>
                  </v-card>
                </v-col> <v-col cols="12" xl="6" lg="6">
                  <v-card class="pa-3" color="primary" rounded="lg">
                    <div class=" justify-space-between py-4 pl-4">
                      <div>
                        <h5 class="font-roboto text-center"> DBM</h5>
                        <h6 class="text-h1 text-center font-weight-bold">
                          1
                        </h6>
                      </div>
                    </div>
                  </v-card>
                </v-col>

              </v-row>
              <v-row>
                <v-col cols="12" xl="6" lg="6">
                  <v-card class="pa-3" color="yellow" rounded="lg">
                    <div class=" justify-space-between py-4 pl-4">
                      <div>
                        <h5 class="font-roboto text-center"> COMPLETED</h5>
                        <h6 class="text-h1 text-center font-weight-bold">
                          1
                        </h6>
                      </div>
                    </div>
                  </v-card>
                </v-col> <v-col cols="12" xl="6" lg="6">
                  <v-card class="pa-3" color="pink" rounded="lg">
                    <div class=" justify-space-between py-4 pl-4">
                      <div>
                        <h5 class="font-roboto text-center"> PENDING</h5>
                        <h6 class="text-h1 text-center font-weight-bold">
                          1
                        </h6>
                      </div>
                    </div>
                  </v-card>
                </v-col>

              </v-row>
            </v-col>
          </v-row>
        </v-sheet>

      </v-card-text>
    </v-card>
  </v-sheet>
</template>


<script lang="ts" setup>
import useAuth from "~/store/auth";

const { $rest } = useNuxtApp();
const auth = useAuth();

definePageMeta({ layout: "std-systems" });


</script>

<style scoped>
.font-roboto {
  font-family: 'Roboto', sans-serif;
  font-size: 20px
}
</style>