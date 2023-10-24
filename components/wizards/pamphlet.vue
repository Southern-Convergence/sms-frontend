<!--
  An arguably over-engineered way of representing lengthy forms (like idk, maybe around 80+ fields.)

  As the name implies, it is like a pamphlet, or should I name it a bible?
  anyways it is a representation of a form divided into sections and subsections

  Fillin up these sections or subsections emits an update event which you can use to hook up into an update endpoint,
  thereby allowing for lazy-filling of numerous fields.

  The markup for this component is found in pages/account/personal-info.vue
  I'll move it later...
-->

<template>
  <v-card v-bind="$attrs" rounded="lg" elevation="2" border>
    <v-toolbar class="rounded-t-lg" border>
      <v-list-item class="pl-2" density="compact">
        <template v-slot:prepend>
          <v-avatar class="mr-1">
            <v-icon v-if="active_node.icon" :icon="active_node.icon"/>
          </v-avatar>
        </template>
        <v-list-item-content>
          
          <v-list-item-title>{{ active_node.name }}</v-list-item-title>
          <v-list-item-subtitle v-if="active_page.title">{{ active_page.title }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-toolbar>
    
    <v-card-text id="bound-form-body" style="height : 400px; overflow-y : auto">
      <v-window v-model="active_page">
        <v-window-item v-for="subsection in subsections" :key="subsection.title" :value="subsection">
          <slot :name="subsection.template" />
        </v-window-item>
      </v-window>
    </v-card-text>

    <v-toolbar class="rounded-b-lg" border flat>
      <v-toolbar-title>
        <!--Substep Nav-->
        <div class="text-center" style="min-height : 54px">
          <v-btn v-if="(selected_node !== 0)" height="54" variant="plain" rounded="lg"
            style="position: absolute; left : 0px" @click="prev_node">
            <v-list-item class="px-0 text-left" title="Prev" :subtitle="local_nodes[selected_node-1].name">
              <template v-slot:prepend>
                <v-icon class="mr-2" icon="mdi-arrow-left" size="32" />
              </template>
            </v-list-item>
          </v-btn>

          <v-btn-group v-if="(active_node && active_node.subsection.length)" class="align-center">
            <v-btn :disabled="(active_node.active === 0)" variant="plain" size="24" @click="prev_page">
              <template v-slot:prepend>
                <v-icon v-if="(active_node.active !== 0)" icon="mdi-chevron-left" size="28" />
              </template>
            </v-btn>
            <v-list-item class="text-center">
              <v-list-item-title class="font-weight-bold">
                <v-icon class="pt-4" :icon="`mdi-roman-numeral-${active_node.active+1}`" size="26" />
              </v-list-item-title>
              <v-list-item-subtitle><small>Page</small></v-list-item-subtitle>
            </v-list-item>
            <v-btn :disabled="(active_node.active === active_node.subsection.length - 1)" variant="plain" size="24"
              @click="next_page">
              <template v-slot:append>
                <v-icon v-if="(active_node.active !== active_node.subsection.length - 1)" icon="mdi-chevron-right"
                  size="28" />
              </template>
            </v-btn>
          </v-btn-group>

          <v-btn v-if="(selected_node !== local_nodes.length-1)" height="54" variant="plain" rounded="lg"
            style="position: absolute; right : 0px" @click="next_node">
            <v-list-item class="px-0 text-right" title="Next" :subtitle="local_nodes[selected_node+1].name">
              <template v-slot:append>
                <v-icon class="ml-2" icon="mdi-arrow-right" size="32" />
              </template>
            </v-list-item>
          </v-btn>
        </div>
      </v-toolbar-title>

      <slot name="dialogs" />
    </v-toolbar>
  </v-card>
</template>

<script lang="ts" setup>
import {Ref} from 'vue';

const { $pamphlet_definitions } = useNuxtApp();
const { definition  } = withDefaults(defineProps<{definition : string}>(), {definition : ""});

onBeforeMount(()=> local_nodes.value = $pamphlet_definitions[definition] || []);

const local_nodes:Ref<Section[]> = ref([]);

/* Maintaining States */
const selected_node = ref(0);
const active_node = computed(()=> local_nodes.value[selected_node.value]);
const active_page = computed(()=> {
  const { subsection, active } = local_nodes.value[selected_node.value];
  return (subsection[active] || "");
});

/* Control Fns */
const prev_node = ()=> selected_node.value--;
const next_node = ()=> selected_node.value++;
const prev_page = ()=> local_nodes.value[selected_node.value].active--;
const next_page = ()=> local_nodes.value[selected_node.value].active++;

/* Section/Subsection Processing */
const subsections = computed(()=> local_nodes.value.flatMap((v)=> v.subsection));
</script>

<style scoped>
::v-deep(#bound-form-body) {
  min-height: 400px;
}

::v-deep(#bound-form-body .v-row) {
  padding-top: 6px;
}
</style>