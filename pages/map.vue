<template>
  <v-row class="h-100" dense>
    <v-col cols="12">
      <v-card id="overlay-map" elevation="4" style="height : 84%" border>
        <v-card id="context-menu" elevation="2" width="320" max-height="320" shaped border>
          <v-toolbar class="pl-2" density="compact" border>
            <v-toolbar-title>Pins</v-toolbar-title>
            <v-spacer />

            <v-item-group>
              <v-btn @click="prepare_drop_point" dark icon>
                <v-icon>mdi-map-marker-plus</v-icon>
              </v-btn>
            </v-item-group>
          </v-toolbar>
          <v-divider />

          <v-card-text class="d-block text-center">
            <v-icon class="mb-2" color="grey darken-3" size="64">mdi-map-marker-circle</v-icon>
            <h6 class="text-subtitle-2 text--secondary">No Login Points found.</h6>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    <!-- Marker Dialog -->
    <v-dialog v-model="mark_dialog" width="800">
      <v-card border>

        <v-card-item style="overflow-y : auto">
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-card class="pa-5" elevation="2" v-if="loading_location_info"
                  :loading="Boolean(loading_location_info)" border>

                  <v-card-text class="d-block text-center">
                    <v-card-subtitle class="d-block text-center text-subtitle-2">Fetching Location Information
                    </v-card-subtitle>
                    <small>This should not take long...</small>
                  </v-card-text>
                  <v-card-text>
                  </v-card-text>
                </v-card>
                <v-card elevation="2" v-else border>
                  <v-item-group class="float-right" style="position: absolute;top: 8px;right: 8px;z-index: 900;">
                    <v-chip class="mr-2" border label>
                      X:{{location_coords[0].toPrecision(6)}}
                    </v-chip>
                    <v-chip label>
                      Y:{{location_coords[1].toPrecision(6)}}
                    </v-chip>
                  </v-item-group>
                  <v-img v-if="mini_preview" :src="mini_preview" alt="Location Preview" height="240" cover />
                  <v-card-text v-else>
                    <v-progress-circular />
                  </v-card-text>

                  <v-card-title class="px-4" style="white-space:pre-wrap">{{location_info.display_name}}</v-card-title>
                  <v-card-subtitle class="px-4">{{location_info.address.region}}</v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
            <br />
            <v-item-group mandatory>

              <v-row dense>
                <v-col cols="6">
                  <v-item v-slot="{isSelected, toggle}">
                    <v-card class="pa-5" @click="toggle" :elevation="isSelected ? 4 : 2" border>

                      <v-card-text>
                        <h4 class="text-h5">Login Point</h4>
                        <v-divider class="my-2" />
                        <span class="text-subtitle-2">Geographical points where users may sign-in to a particular
                          session/service.</span>
                      </v-card-text>

                      <v-card-text v-if="isSelected">
                        <v-scroll-y-transition>
                          <v-form>
                            <v-row dense>
                              <v-col cols="12">
                                <v-text-field label="Name" color="orange darken-4" hide-details
                                  clearable />
                              </v-col>

                              <v-col cols="12">
                                <v-text-field label="Login Radius" color="orange darken-4"
                                  prepend-inner-icon="mdi-map-marker-radius" type="number" suffix="Meters"/>
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-scroll-y-transition>
                      </v-card-text>
                    </v-card>
                  </v-item>
                </v-col>
                <v-col cols="6">
                  <v-item v-slot="{isSelected, toggle}">
                    <v-card class="pa-5" @click="toggle" :elevation="isSelected ? 4 : 2" border>

                      <v-card-text>
                        <h4 class="text-h5">Delivery Point</h4>
                        <v-divider class="my-2" />
                        <span class="text-subtitle-2">Geographical points where commodities can be shipped or dropped
                          off.</span>
                      </v-card-text>

                      <v-card-text v-if="isSelected">
                        <v-scroll-y-transition>
                          <v-form>
                            <v-row dense>
                              <v-col cols="12">
                                <v-text-field label="Name" color="orange darken-4" hide-details
                                  clearable />
                              </v-col>

                              <v-col cols="12">
                                <v-text-field label="Login Radius" color="orange darken-4"
                                  prepend-inner-icon="mdi-map-marker-radius" type="number" suffix="Meters" />
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-scroll-y-transition>
                      </v-card-text>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </v-container>
        </v-card-item>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts" setup>
import L, {LatLngTuple} from "leaflet";
import {SimpleMapScreenshoter} from "leaflet-simple-map-screenshoter";
import { useFetch } from "#app";
import { useSnackbar, useLocation } from "~/store/index";

let screenshoter:SimpleMapScreenshoter;

const snackbar = useSnackbar();

definePageMeta({
  layout : "map"
});

onMounted(()=> {
  const default_coords : LatLngTuple = [14.628241, 121.012750];
    coords.value = default_coords;

    let map = L.map("overlay-map");
    map.setView(default_coords, 19);
    map.createPane("snapshot-pane");

    const snapshotOptions = {
      hideElementsWithSelectors: [
        ".leaflet-control-container",
        ".leaflet-dont-include-pane",
        "#snapshot-button"
      ],
      hidden: true
    };

    screenshoter = new SimpleMapScreenshoter(snapshotOptions);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 24,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    let temp = useLocation();
    map.addEventListener("mousemove", ({latlng})=>{
      const { lat, lng } = latlng;

      temp.update_coords(lat, lng);
    });

    map.addEventListener("click", open_mark_dialog)
    screenshoter.addTo(map)
});


//States
let mark_dialog = ref(false);
let loading_location_info = ref(false);
let location_info   : any = ref(null);
let mini_preview    : any = ref(null);

let coords          = ref([0, 0]);
let location_coords = ref([0, 0]);


function fetch_location_data(e : any){
  loading_location_info.value = true;
  location_info.value = null;
  mini_preview.value = null;
  const { lat, lng } = e.latlng;
  location_coords.value = [lat, lng];
  useFetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat.toPrecision(6)}&lon=${lng.toPrecision(6)}&format=json`, { key : `${lat}-${lng}-${Date.now()}`})
  .then(({data})=> {
    location_info.value = data;
        
    screenshoter.takeScreen("image", {})
    .then((v)=>{
      mini_preview.value = v;
      loading_location_info.value = false;
    })
  });
}

function prepare_drop_point(){
  snackbar.set_message("Please select a point on the map to designate as a login point.", "primary");
}

function open_mark_dialog(e : any){
  if(snackbar.show){
    snackbar.reset_state();
    mark_dialog.value = true;
    fetch_location_data(e);
  }
}
</script>

<style scoped>
#overlay-map{
position : absolute;
top    : 80px;
bottom : 80px;
left   : 80px;
right  : 80px;
}


#context-menu{
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 900;
}
</style>