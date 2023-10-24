<template>
  <v-container class="h-100">
    <v-row class="h-100" justify="center" align="center">
      <!-- <v-col cols="8">
        <v-sheet 
          border
          height="460" >
         <v-card-title  class="bg-indigo"  > <v-icon medium class="mx-2">mdi-note-edit-outline</v-icon> Equivalent Record Form</v-card-title>
         <v-card-text class="bg-indigo-lighten-5">
          <v-row no-gutters>
            <v-col cols="6" class="pa-5">
                  <v-row no-gutters>
                    <v-col cols="10">
                      <v-select label="Select Position"/>
                    </v-col>
                      <v-col cols="12">
                      <v-text-field  label="Education" />
                      <v-text-field label="Experience"/>
                      <v-text-field label="Training"/>
                      <v-text-field label="Eligibility"/>
                    </v-col>

              
                 <v-col cols="12">
                       <v-row no-gutters justify="center">
                        <v-col cols="auto" class="mx-2"><v-btn  color="orange" variant="tonal" > Clear</v-btn></v-col>
                          <v-col cols="auto"><v-btn  color="success" variant="flat"> Submit</v-btn></v-col>
                      </v-row>
                 </v-col>
                 
                  </v-row>

            </v-col>
              <v-col cols="6" class="mt-15">

                        <div class="text-body-1 py-2"> Qualification Standard : <b color="indigo"> Teacher II</b></div>
                        <div> Any Bachelor's Degree in Education or its equivalent</div>
                        <div>20 years in Science</div>
                         <div> 20 M.A. units</div>
              </v-col>
          </v-row>
         </v-card-text>
        </v-sheet>
      </v-col> -->
      <!-- <v-col cols="5" >
        <v-sheet 
         border  height="460" >
            <v-card-title  class="bg-indigo"  > Application Timeline</v-card-title>
       <v-row no-gutters justify="center">
         <v-timeline   v-for="(item, i) in items"
            :key="i"
            :dot-color="item.color"
            :icon="item.icon"
            fill-dot>
          <v-timeline-item >
        
            <template v-slot:opposite>
              <span> 07/15/2023</span> <br/>
              <span>Remarks : None</span>
            </template>
            <v-card class="elevation-2 pa-2" :class="['text-h6', `bg-${item.color}`]">
              <div class="text-body-1">
            Signed by
              </div>
              <div class="text-body-1"> School Principal</div>
            </v-card>
          </v-timeline-item>
        </v-timeline>
       </v-row>
     
        </v-sheet>
      </v-col> -->
    </v-row>
<v-row no-gutters justify="center">
      <v-sheet border width="70%">
        <v-card-title class="bg-indigo" >
           Complete the following requirements
        </v-card-title>
        <v-card-text>
          <v-container>
             <small>Personal Information</small> <br/>
            <v-row no-gutters>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6"  class="px-1">
                <v-text-field
                  label="Surename"
                />
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6"  class="px-1">
             <v-text-field
                  label="Given Name"
                />
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6"  class="px-1">
               <v-text-field
                  label="Middle Name"
                />
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6"  class="px-1">
                <v-text-field
                  label="Date of Birth"
                />
              </v-col>
                 <v-col cols="12" xl="4" lg="4" md="4" sm="6"  class="px-1">
             <v-text-field
                  label="Sex"
                />
              </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6"  class="px-1">
               <v-text-field
                  label="Employee No"
                />
              </v-col>

                   <v-col cols="12" xl="4" lg="4" md="4" sm="6"  class="px-1">
               <v-text-field
                  label="Authorized Position Title"
                />
              </v-col>
                   <v-col cols="12" xl="4" lg="4" md="4" sm="6"  class="px-1">
               <v-text-field
                  label="Salary Grade"
                />
              </v-col>
                   <v-col cols="12" xl="4" lg="4" md="4" sm="6"  class="px-1">
               <v-text-field
                  label="Item No"
                />
              </v-col>
                   <v-col cols="12" xl="4" lg="4" md="4" sm="6"  class="px-1">
               <v-text-field
                  label="Plantila No"
                />
              </v-col>
                   <v-col cols="12" xl="4" lg="4" md="4" sm="6"  class="px-1">
               <v-text-field
                  label="Authorized Salary"
                />
              </v-col>
                   <v-col cols="12" xl="4" lg="4" md="4" sm="6"  class="px-1">
               <v-text-field
                  label="Latest IPCRF Rating"
                />
              </v-col>
              
            </v-row>

            <v-row no-gutters>
              <v-col cols="12"></v-col>
            </v-row>

          </v-container>
      
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Clear
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            NEXT 
          </v-btn>
        </v-card-actions>
      </v-sheet>
</v-row>
  </v-container>
</template>

// <script lang="ts">
//   export default {
//     layout : "std-systems",
//     data: () => ({
//       items: [
//         {
//           color: 'red-lighten-2',
//           icon: 'mdi-star',
//         },
//         {
//           color: 'purple-lighten-2',
//           icon: 'mdi-book-variant',
//         },
//         {
//           color: 'green-lighten-1',
//           icon: 'mdi-airballoon',
//         },
    
//       ],
//     }),
//   }
// </script>


<script lang="ts" setup>
definePageMeta({ layout : "std-systems" });
</script>