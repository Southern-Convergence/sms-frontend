<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card-actions class="float-right">
          <v-btn @click="add_registry_dialog = true" variant="text" color="primary" icon>
            <v-icon size="32">mdi-plus</v-icon>
          </v-btn>
        </v-card-actions>
        <h6 class="text-h5">Registry</h6>
        <h6 class="text-subtitle-2 text-medium-emphasis">View or modify low-level variables used by the system.</h6>

        <v-divider />
      </v-col>
      <v-dialog v-model="add_registry_dialog" width="380">
        <v-card class="h-100" :loading="registry_classification_load" border>
          <v-card-title class="text-center">Add Registry Classification</v-card-title>
          <v-card-subtitle class="text-center pt-1" style="white-space : normal">Classifications allows us to bundle registry values for better organization.</v-card-subtitle>
          <v-divider />
          
          <v-card-text>
            <v-alert class="mb-4" type="error" density="compact">Failed</v-alert>
            <v-form>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field v-model="registry_classification_form.name" label="Name" :rules="[$validator.required]" hide-details/>
                </v-col>

                <v-col cols="12">
                  <v-textarea v-model="registry_classification_form.description" label="Description (Optional)"/>
                </v-col>

                <v-col cols="12">
                  <v-btn color="primary" @click="submit_registry_classification" :disabled="registry_classification_load" :loading="registry_classification_load" block>Submit</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>

<!-- 4 -->
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const { $rest } = useNuxtApp();

definePageMeta({
  layout : "admin"
});

const add_registry_dialog = ref(true);

const registry_classification_form = ref({
  name        : "",
  description : ""
})

const registry_classification_load = ref(false);
const registry_classification_error = ref("");

async function submit_registry_classification(){
  registry_classification_load.value = true;
  const { error } = await $rest("registry/create-registry-classification", {
    method : "POST",
    body   : registry_classification_form.value
  });
  registry_classification_load.value = false;

  if(error)registry_classification_error.value = error;
}
</script>