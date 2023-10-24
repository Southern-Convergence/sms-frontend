<template>
  <v-card >
    <v-toolbar>
      <v-toolbar-title>
        <v-list-item class="px-0" title="Available Endpoints" :subtitle="selected_category.name"></v-list-item>
      </v-toolbar-title>

      <v-spacer />

      <v-menu>
        <template v-slot:activator="{props}">
          <v-btn v-bind="props" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list v-model="selected_category">
          <v-list-item v-for="category in endpoint_categories" :key="category.name" :title="category.name"
            @click="selected_category = category" />
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-divider />

    <v-card-text style="max-height: 400px; overflow-y: auto;">
      <div :class="$vuetify.display.mobile ? 'd-block' : 'd-flex flex-row'">
        <v-tabs v-model="selected_subcategory" :direction="$vuetify.display.mobile ? 'horizontal' : 'vertical'"
          color="primary" show-arrows>
          <v-tab class="text-subtitle-2 text-capitalize"
            v-for="cat in Object.keys(active_service_paths[selected_category.ref])" :key="cat" :value="cat">
            {{ cat.replaceAll("-", " ") }}
          </v-tab>
        </v-tabs>

        <v-list class="flex-grow-1" lines="two">
          <v-lazy v-for="path in active_service_paths[selected_category.ref][selected_subcategory]"
            :key="path.operationId">
            <v-list-item class="mb-2" :title="path.operationId" :subtitle="path.ref" rounded="lg" density="compact"
              border>
              <template v-slot:prepend>
                <v-chip class="text-uppercase mr-2" :color="method_colors[path.method]" variant="outlined" label>
                  {{ path.method }}
                </v-chip>
              </template>

              <template v-slot:append>
                <v-btn class="text-caption" @click="show_endpoint(path)" color="primary" variant="text">View</v-btn>
              </template>
            </v-list-item>
          </v-lazy>
        </v-list>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { useService } from "~/store/index";
const service = useService().get_service;

definePageMeta({
  layout : "dev"
});

const endpoint_categories = ref([
  {name : "By Service Tag", ref : "stags"},
  {name : "By Router", ref : "routers"},
  {name : "By Method", ref : "methods"}
])
const selected_category = ref({name : "By Service Tag", ref : "stags"});
const selected_subcategory = ref("" as any);

const active_service_paths = computed(()=> {
  let results = {
    routers : {},
    methods : {},
    stags   : {}
  } as any

  const active_service = service;
  active_service.paths.forEach((specs : any)=>{
    const {sfr_spec, oas_spec} = specs;
    const { method, ref } = sfr_spec;

    const obj ={...oas_spec, tags : oas_spec.tags.splice(2), ref, method};
    const [router, stag] = oas_spec.tags.slice(0,2).map((v:string)=> v.split(":")[1]);
    
    //Build Routers
    if(results.routers[router])results.routers[router].push(obj);
    else results.routers[router] = [obj];

    //Build Methods
    if(results.methods[method.toUpperCase()])results.methods[method.toUpperCase()].push(obj);
    else results.methods[method.toUpperCase()] = [obj];

    //Build STags
    if(results.stags[stag])results.stags[stag].push(obj);
    else results.stags[stag] = [obj];
  });

  return results;
});
function show_endpoint(endpoint : Endpoint){

}
const method_colors = ref({
  "GET"    : "success",
  "POST"   : "warning",
  "DELETE" : "error"
} as any)
</script>