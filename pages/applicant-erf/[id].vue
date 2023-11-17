<template>
    <div>DYNAMIC PAGE</div>
    <div>ERF FORM: {{ router.params.id }}</div>
</template>

<script lang="ts" setup>

const router = useRoute();

definePageMeta({ layout: "std-systems" })



</script>