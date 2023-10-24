<template>
  <v-menu v-model="modal_value" :close-on-content-click="false" ref="menu">
    <template v-slot:activator="{props}">
      <v-btn v-bind="props" class="mr-1" color="primary" icon>
        <v-icon icon="mdi-apps" />
      </v-btn>
    </template>
    <v-card width="280" border>
      <v-toolbar density="compact" flat border>
        <v-toolbar-items v-if="context === 1">
          <v-btn @click="prev_context" icon="mdi-chevron-left" />
        </v-toolbar-items>
        <v-toolbar-title class="font-weight-medium">{{selected_system || "Subsystems"}}</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-window v-model="context">
          <v-window-item>
            <v-row dense>
              <v-col v-for="[system, val] in Object.entries(systems_dashboard)" :key="system" cols="12">
                <v-sheet @click="()=> select_system(system)" style="cursor : pointer" border>
                  <v-list-item lines="two">
                    <v-list-item-title>{{system}}</v-list-item-title>
                    <v-list-item-subtitle>{{val.desc}}</v-list-item-subtitle>
                  </v-list-item>
                </v-sheet>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item>
            <v-row dense>
              <v-col v-for="dashboard,i in dashboards" :key="i" cols="12">
                <v-sheet @click="()=> save_selection(dashboard.title)" style="cursor : pointer" border>
                  <v-list-item lines="one" :to="{ name : `${systems_dashboard[selected_system].link}${dashboard.link ? `-${dashboard.link}` : ''}`, params : {}}">
                    <v-list-item-title>{{dashboard.title}}</v-list-item-title>
                  </v-list-item>
                </v-sheet>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
import useAnalyticsProvider from "~/store/anal_provider";
let instance = getCurrentInstance();
let anal_provider = useAnalyticsProvider();
  //Subsystems are declared here for now.
  //Code redundance will be handled later on.
  //This specific component acts as part of a component which itself acts as a dashboard options provider.
  //Provider in the sense that it dispenses options in a centralized store which eases and reduces code clutter.

  const context = ref(0); //Possible States: "Subsystem" | "Dashboard"
  const selected_system   = ref("");
  const modal_value = ref(false);

  const systems_dashboard = anal_provider.dashboard_declaration;

  const dashboards = computed(()=>{
    if(!selected_system.value)return [];

    return systems_dashboard[selected_system.value].subtypes;
  })

  function select_system(system : string){
    context.value = 1;
    selected_system.value = system
  }
  function prev_context(){
    context.value = 0;
    selected_system.value = "";
  }
  function save_selection(dashboard : string){
    instance?.emit("input", [selected_system.value, dashboard]);
    modal_value.value = false;
  }
</script>