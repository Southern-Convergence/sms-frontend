<template>
  <!-- <v-card border :rounded="0" class="w-50">
    <v-card-title class="d-flex align-center " >
      <v-icon class="mr-2">mdi-record</v-icon>
      <span>INCREMENTING</span>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-1 ma-0">
      <v-sheet border class="pa-4">
        <div class="text-center text-h1">{{  count }}</div>
      </v-sheet>
    </v-card-text>

    
    <v-divider />
    <v-card-actions class="pa-0 ma-0">
      <v-btn :disabled="is_disabled" variant="tonal" block @click="increment">Increment</v-btn>
    </v-card-actions>
  </v-card> -->


  <v-card border :rounded="0" class="w-50">
    <v-card-title class="d-flex align-center " >
      <v-icon class="mr-2">mdi-record</v-icon>
      <span>INCREMENTING</span>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-1 ma-0">
      <v-sheet border class="pa-4">
        <form ref="form_ref">
          <v-text-field v-model="clone_marianne_1.height" />
          <v-text-field v-model="clone_marianne_1.weight" />
          <v-text-field v-model="clone_marianne_1.age" />
          <v-text-field v-model="clone_marianne_1.name" />
        </form>
      </v-sheet>
    </v-card-text>
    <v-divider />
    <v-card-actions class="pa-0 ma-0">
      <v-btn :disabled="is_disabled" variant="tonal" block @click="submit_marianne">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'std-systems' })

/**
 * SUBMIT TO DATABASE
 */
interface Marianne {
  height: number;
  weight: number;
  age: number | string;
  name: string;
}

interface SMS_FORM { 
  marianne: Marianne;
}

const clone_marianne_1 = ref<Marianne>({ height: 6, weight: 60, age: "18",name: "Hello" });
const form_ref = ref({})

function submit_marianne() {
  console.log(clone_marianne_1.value)
}

interface Props {
  marianne: Marianne;
  status?: String;
}

const props = defineProps<Props>();


/** 
 * HANDLES INCREMENTING
 */
const count = ref(0) //data
function increment() { //methods
  count.value++
}
const is_disabled = computed(() => {
  if (count.value !== 5) return false;
  return true
})


function add(num1 : number, num2 : number) : number {
  return num1 + num2
}
</script>