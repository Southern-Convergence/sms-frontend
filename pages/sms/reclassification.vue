<template>
  <v-container class="h-100" >
    <v-row class="h-100"  align="center">
      <v-col cols="12">
        <v-sheet >
      
          <v-card-title >
           Summary of Reclassification Application
          </v-card-title>
          <v-card-subtitle> A brief overview of a reclassification request.</v-card-subtitle>
           <v-tabs v-model="tab" align-tabs="title" bg-color="indigo-darken-2">
              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
  
              <v-window v-model="tab">
                <v-window-item
                  v-for="item in items"
                  :key="item"
                
                >
                <v-card-text>
                     <v-row >
                    <v-col cols="4" v-for="index in 4"
                :key="index">
                       <v-card
                      class="mx-auto"
                      max-width="390"
                 
                      variant="tonal"
                      color="indigo"
        
          
                    >
                      <v-card-item >
                        <div>
                          <div class="text-overline mb-1">
                      Date : <b>07/15/1998</b> 
                          </div>
                          <div class="text-body-1 mb-1 ">
                            Position : <b>Teacher II</b>
                          </div>
                          <div class="text-body-2"> Name : Marianne Mae Paclian</div>
                          <div class="text-body-2"> School : Samar State University</div>
                        </div>
                      </v-card-item>

                      <v-card-actions>
                     <v-btn variant="tonal" class="font-weight-bold">
                          View Application
                        </v-btn>
                     
                     
                      </v-card-actions>
                    </v-card>
                    </v-col>
                   </v-row>
                </v-card-text>
                </v-window-item>
              </v-window>

     
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" >
  export default {
  layout : "std-systems",
    data () {
      return {
        tab: null,
        items: [
          'For Signature', 'Pending', 'For Evaluation', 'Evaluated', 'Verified', 'Recommended Approved' , 'Approved', 
        ],
        count: 10
       
      }
    },
  }
  
</script>
