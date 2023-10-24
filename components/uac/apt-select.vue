<template>
  <commons-dialog v-bind="$attrs" width="420" hide-toolbar>
    <commons-select-item-container v-model="selected_apts" v-if="apts.updated" title="Select APT" :items="shown_apts" :hide-toolbar-title="true" height="380" extended>

      <template v-slot:extension>
        <v-tabs v-model="selected_ap">
          <v-tab v-for="ap in partitioned_apts" :key="i" class="text-subtitle-1 text-capitalize" :value="ap._id"
            variant="flat" color="primary">{{ ap.name }}</v-tab>
        </v-tabs>
      </template>

      <template v-slot:item="{value, toggle}">
        <v-lazy>
          <v-card class="py-2" @click="value.selected = !Boolean(value.selected); toggle();" border>
            <v-list-item :title="value.name" :subtitle="value.desc">
              <template v-slot:append>
                <v-checkbox :model-value="value.selected" />
              </template>
            </v-list-item>
          </v-card>
        </v-lazy>
      </template>

      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn @click="selection" color="primary">Assign</v-btn>
        <v-spacer />
      </v-card-actions>
    </commons-select-item-container>
  </commons-dialog>
</template>

<script lang="ts" setup>
import { useDomains, useAPTs } from "~~/store/index";

const { $rest } = useNuxtApp();

const emits = defineEmits(["update:modelValue", "selection"]);

const route = useRoute();

const apts = useAPTs();
const partitioned_apts = computed(()=> Object.values(apts.partitioned) as any[]);
const selected_ap = ref("");
const shown_apts = computed(()=> {
  if(!apts.partitioned[selected_ap.value])return [];
  return apts.partitioned[selected_ap.value].apts;
});

 

const domains = useDomains();
const domain = computed(()=> {
  /* @ts-ignore */
  return domains.domains[route.params.domain] || {}
});

function selection(){
  emits("update:modelValue", false);
  emits("selection", shown_apts.value.filter((v : any)=> v.selected));
}

onBeforeMount(async()=> {
  if(!apts.updated){
    const { data } = await $rest("admin/object-authority/get-apts", { method : "GET", query : {domain_id : domain.value._id}})
    apts.hydrate(data, domain.value.access_policies);
  }
})
</script>