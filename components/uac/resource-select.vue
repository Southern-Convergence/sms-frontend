<template>
  <commons-select-item-container v-bind="$attrs" :items="shown_items" title="Select Resources" height="400" extended>
    <template v-slot:extension>
      <v-tabs v-model="resource_type">
        <v-tab v-for="res, i in resource_types" :key="i" class="text-subtitle-1 text-capitalize" :value="res"
          variant="flat" color="primary">{{ res.type }}</v-tab>
      </v-tabs>
    </template>

    <template v-slot:item="{value, isSelected, toggle}">
      <v-lazy>
        <v-card class="py-2" @click="toggle" border>
          <v-list-item :title="value.name">
            <template v-slot:prepend>
              <v-icon class="mr-2" size="42">{{ icon_types[value.type] }}</v-icon>
            </template>

            <v-list-item-subtitle v-if="value.type === 'endpoint'" v-text="value.ref" />
            <v-list-item-subtitle v-if="value.type === 'page'" v-text="value.path" />

            <template v-slot:append>
              <v-checkbox :model-value="isSelected" hide-details />
            </template>
          </v-list-item>
        </v-card>
      </v-lazy>
    </template>

    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn @click="$emit('set')" color="primary" :disabled="disable_actions">Set</v-btn>
      <v-spacer />
    </v-card-actions>
  </commons-select-item-container>
</template>

<script lang="ts" setup>
import { useResources } from "~~/store/index";
const resources = useResources();

const props = withDefaults(defineProps<{disable_actions : boolean}>(), {
  disable_actions : false
});

const resource_types = ref([
  {type : "Subdomains"},
  {type : "Pages"},
  {type : "Endpoints"},
  {type : "Files"},
]);
const resource_type  = ref(resource_types.value[0]);

const shown_items = computed(()=> {
  return resources.get_items.map((v)=> ({
    ...v,
    hide : `${v.type}s` !== resource_type.value.type.toLowerCase()
  }))
});

const icon_types = ref({
  subdomain : "mdi-group",
  page      : "mdi-note-outline",
  endpoint  : "mdi-api"
}) as any;
</script>