<template>
  <v-sheet>
    <v-list>
      <v-list-item v-for="d, index in data" :key="index" class="my-2">
        <v-list-item-title>
          LOAD ERF: {{ d.form }}
        </v-list-item-title>
        <v-btn color="primary" @click="load_erf(d.form)">Load</v-btn>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

definePageMeta({ layout: "std-systems" })
const router = useRouter();

const data = [
  {
    form: 1,
  },
  {
    form: 2,
  },
  {
    form: 3,
  },
  {
    form: 4,
  }
]

const load_erf = (id: number) => {
  const routeData = router.resolve({ path: `dynamic/${id}` });
  window.open(routeData.href, '_blank');
}
</script>