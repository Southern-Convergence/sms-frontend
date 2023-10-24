<template>
  <commons-select-item-container v-bind="$attrs" :items="shown_items" title="Select APTs" height="400" extended>
    <template v-slot:extension>
      <v-tabs v-model="selected_ap">
        <v-tab v-for="ap, i in partitioned_apts" :key="i" class="text-subtitle-1 text-capitalize" :value="ap._id"
          variant="flat" color="primary">{{ ap.name }}</v-tab>
      </v-tabs>
    </template>

    <template v-slot:item="{value, isSelected, toggle}">
      <v-lazy>
        <v-card class="py-2" @click="toggle" border>
          <v-list-item :title="value.name" :subtitle="value.desc">
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
      <v-btn @click="$emit('set')" color="primary" :disabled="disable_actions">Assign</v-btn>
      <v-spacer />
    </v-card-actions>
  </commons-select-item-container>
</template>

<script lang="ts" setup>
import { useResources, useAPTs } from "~~/store/index";

const apts = useAPTs();

const props = withDefaults(defineProps<{disable_actions : boolean}>(), {
  disable_actions : false
});

const partitioned_apts = computed(()=> Object.values(apts.partitioned) as any[]);
const selected_ap = ref("");
const shown_items = computed(()=> {
  return apts.get_items.map((v)=> ({
    ...v,
    hide : v.basis._id !== selected_ap.value
  }));
});
</script>