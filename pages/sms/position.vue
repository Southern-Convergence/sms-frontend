<template>
  <div class="mx-auto">
    <v-sheet>
      <v-toolbar class="pt-2" color="indigo">
        <v-toolbar-title>List of Qualification Standards</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-settings</v-icon>
        </v-btn>

      </v-toolbar>

      <v-card-text class="overflow-y-auto">
        <v-sheet class="mr-2 mt-2 maintenance-item" :class="{ 'elevation-4': is_hovered }" variant="tonal" color="success"
          v-for=" position, index  in  position_data " :key="index">
          <v-alert class="my-1" border="start" border-color="success">
            <div class="text-uppercase font-weight-bold text-success">{{ position.title }}</div>
            <div v-for=" educ, index  in  position.education " :key="index" class="text-caption">
              {{ educ.text }} <br />
            </div>
            <div class="text-caption" v-if="position.education_level">
              {{ position.education_level }}
            </div>
            <div v-for=" exp, index  in  position.experience " :key="index" class="text-caption">
              {{ exp.text }} <br />

            </div>
            <div class="text-caption" v-if="position.training_hours">
              Training Hours :
              <span class="text-caption"> {{ position.training_hours }} </span>
            </div>

            <div class="text-caption" v-for=" rate, index  in  position.rating " :key="index">
              {{ rate.title }}
              <br />
            </div>

            <div class="text-caption w-50" v-if="position.sg">
              Salary Grade :
              <span class="text-caption"> {{ position.sg.salary_grade }} </span>
            </div>
            <div class="text-caption" v-if="position.sg">
              Equivalent :
              <span class="text-caption"> {{ position.sg.equivalent }} </span>
            </div>

          </v-alert>
        </v-sheet>
      </v-card-text>

    </v-sheet>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
definePageMeta({ layout: "std-systems" });
const { $rest } = useNuxtApp();
onBeforeMount(() => {

  get_qs()
});



const position_data = ref<Position[]>([]);
async function get_qs() {
  const { data, error } = await $rest('sms-position/get-qs', {
    method: "GET",
  })
  position_data.value = data
}

</script>

<style scoped>
.reclass-item {
  transition: background-color 0.3s ease-in-out;
}

.reclass-item:hover {
  background-color: #E8EAF6;

}
</style>