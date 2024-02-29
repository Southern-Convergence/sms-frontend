<template>
  <v-sheet height="98vh" class="pa-10" color="#E8EAF6">
    <v-card class="pa-10 " rounded="xl" flat color="transparent">
      <v-card-text> <v-row justify="center" dense>
          <v-col cols="12">
            <h6 class="text-title">Staffing Modification System Dashboard</h6>

            <h6 class="text-subtitle-2 text-medium-emphasis  ">Manage reclassification metrix and dashboard.
            </h6>
            <v-divider class="mt-4 mb-4" />
          </v-col>

        </v-row>

        <v-row>
          <v-col cols="6">
            <v-card class="pa-3 d-flex align-center justify-center h-100" color="primary" variant="tonal" rounded="xl">
              <v-card-text class="d-flex align-center justify-center">
                <div>
                  <b class="text-h5  text-uppercase "> Total Reclass Application</b>
                  <h6 class="text-h2 py-7 text-center font-weight-bold">
                    109
                  </h6>
                  <h5 class="text-center"> 16 Schools Division Office</h5>
                </div>
              </v-card-text>
            </v-card></v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="12" xl="6" lg="6">
                <v-card class="pa-3 " color="#29B6F6" rounded="xl">
                  <v-card-text>
                    <div class="justify-space-between">
                      <div>
                        <h3 class="text-white font-weight-regular"> Current Evaluated</h3>
                        <h6 class="text-h3 pt-5 font-weight-bold text-white">
                          1
                        </h6>
                        <h3 class="text-white text-caption font-weight-thin"> 10 of 101 reclass</h3>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" xl="6" lg="6">
                <v-card class="pa-3 " color="#512DA8" rounded="xl">
                  <v-card-text>
                    <div class="justify-space-between">
                      <div>
                        <h3 class="text-white font-weight-regular"> Current for DBM</h3>
                        <h6 class="text-h3 pt-5 font-weight-bold text-white">
                          10
                        </h6>
                        <h3 class="text-white text-caption font-weight-thin"> 10 of 101 reclass</h3>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" xl="6" lg="6">
                <v-card class="pa-3 " color="#9575CD" rounded="xl">
                  <v-card-text>
                    <div class="justify-space-between">
                      <div>
                        <h3 class="text-white font-weight-regular"> Completed</h3>
                        <h6 class="text-h3 pt-5 font-weight-bold text-white">
                          10
                        </h6>
                        <h3 class="text-white text-caption font-weight-thin"> 10 of 101 reclass</h3>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" xl="6" lg="6">
                <v-card class="pa-3 " color="#E57373" rounded="xl">
                  <v-card-text>
                    <div class="justify-space-between">
                      <div>
                        <h3 class="text-white font-weight-regular"> Pending</h3>
                        <h6 class="text-h3 pt-5 font-weight-bold text-white">
                          22
                        </h6>
                        <h3 class="text-white text-caption font-weight-thin"> 10 of 101 reclass</h3>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>



            </v-row>

          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card class="pa-3 d-flex align-center justify-center " height="30vh" rounded="xl">
              <v-card-text class="d-flex align-center ">
                <div>
                  Graph
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="pa-3 d-flex align-center justify-center " height="30vh" rounded="xl">
              <v-card-text class="d-flex align-center ">
                <div>
                  Graph
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>


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

.text-title {
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: #2b0cc8;
  letter-spacing: 1px;
  margin-bottom: 10px;

}
</style>