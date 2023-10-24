<template>
  <v-card class="ma-1" rounded="lg" v-bind="$attrs" border>
    <v-list-item class="px-2">
      <v-list-item-title>
        <v-icon size="18">mdi-{{ deduced_icon }}</v-icon>
        <span class="text-caption pl-1">{{ value.name }}</span>
      </v-list-item-title>
    </v-list-item>
  </v-card>
</template>

<script lang="ts" setup>
const { value } = withDefaults(defineProps<{value:any}>(), {value : {}});

const deduced_icon = computed(()=> {
  switch(value.type){
    case "endpoint" : return "api";
    case "page"     : return "note-outline"
    default         : return "help";
  }
})
</script>