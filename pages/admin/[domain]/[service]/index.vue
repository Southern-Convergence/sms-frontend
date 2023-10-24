<template>
  <VueMarkdown style="font-family: Ubuntu;" :source="service.description" />
</template>

<script setup>
import VueMarkdown from 'markdown-vue'
import { useService } from "~/store/index";
const service = useService().get_service;

definePageMeta({
  layout : "dev"
});
const data = ref('# asdf')

</script>