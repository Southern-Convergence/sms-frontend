<template>
  <div>DYNAMIC PAGE</div>
  <div>ERF FORM: {{ router.params.id }}</div>
  <div v-if="erfs.length">
    <div>Loading data please wait for 3 seconds</div>
  </div>
  <div v-else>
    {{ erfs }}
  </div>
</template>

<script lang="ts" setup>

const router = useRoute();

definePageMeta({ layout: "std-systems" })

//load data
onBeforeMount(() => {
  fetch_erf();
})


const erfs = ref([])
const fetch_erf = () => {

  setTimeout(() => {
    erfs.value[{
      data: "Hellow world!",
      form: router.params.id
    }]
  }, 2000);

}
</script>