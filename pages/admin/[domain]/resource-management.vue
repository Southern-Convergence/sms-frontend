<template>
  <div>
    <!--To produce a smoother transition, I've made the wizard states as siblings-->
    <v-fade-transition>
      <v-sheet v-if="resource_viewer" rounded="lg">
        <v-sheet class="text-center pa-4 rounded-t-lg" color="primary" rounded="sm">
          <v-icon icon="mdi-cube-outline" size="96" />
          <h5 class="text-h5 text-center">Resource Management</h5>
          <h5 class="text-subtitle-2 text-center">Declare, Modify and Group together multiple objects into usable units
            of
            accessible resources</h5>
        </v-sheet>
        <v-toolbar class="pa-2">
          <v-spacer />
          <v-toolbar-items>
            <v-btn-toggle variant="outlined" divided>
              <v-btn @click="toggle_wizard(true)">
                Open Resource Wizard
              </v-btn>
            </v-btn-toggle>
          </v-toolbar-items>
          <v-spacer />
        </v-toolbar>
      </v-sheet>
    </v-fade-transition>
    <v-fade-transition>
      <v-sheet v-if="resource_wizard" rounded="lg">
        <v-toolbar class="pa-2">
          <v-spacer />
          <v-toolbar-items>
            <v-btn-toggle variant="outlined" divided>
              <v-btn @click="toggle_wizard(false)">
                Close Resource Wizard
              </v-btn>
            </v-btn-toggle>
          </v-toolbar-items>
          <v-spacer />
        </v-toolbar>
        <v-sheet rounded="lg">
          <v-card-text class="h-100">
            <v-layout class="d-flex" style="height : inherit">
              <v-layout class="flex-grow-0 hidden-sm-and-down">
                <v-layout class="d-block">
                  <v-sheet class="rounded-ts-lg" min-width="220">
                    <v-toolbar class="rounded-ts-lg" density="compact">
                      <v-toolbar-title class="text-subtitle-2" style="white-space : normal">Subdomains</v-toolbar-title>

                      <v-menu location="start">
                        <template v-slot:activator="{props}">
                          <v-btn class="mr-0" icon="mdi-plus" v-bind="props" rounded="0" :ripple="false" />
                        </template>

                        <v-list>
                          <v-list-item @click="subdomain_dialog = true">Add Subdomain</v-list-item>
                          <v-list-item @click="page_dialog = true">Add Page</v-list-item>
                        </v-list>
                      </v-menu>
                    </v-toolbar>
                    <v-divider />
                  </v-sheet>
                  <v-sheet min-width="220" max-height="375" min-height="375" style="overflow-y : auto" border>
                    <v-slide-group v-model="highlighted_resource" v-on:update:model-value="set_highlighted_subdomain"
                      direction="vertical" v-if="resources.length" center-active>
                      <v-slide-group-item v-for="res in resources" :key="res._id" v-slot="{ isSelected, toggle }">
                        <v-card class="ma-2" rounded="lg" @click="toggle" height="64">
                          <v-card-title>
                            <v-list-item class="px-0 text-left text-capitalize" :title="res.name"
                              :subtitle="`Type: ${res.type}`">
                              <template v-slot:prepend>
                                <v-icon icon="mdi-group" dark />
                              </template>
                            </v-list-item>
                          </v-card-title>
                        </v-card>
                      </v-slide-group-item>
                    </v-slide-group>
                    <v-card-title class="text-center text-subtitle-2" v-else>No Subdomains Found</v-card-title>
                  </v-sheet>
                </v-layout>
              </v-layout>

              <v-fade-transition>
                <v-sheet class="flex-grow-1 pa-8" v-if="empty_banner" border>
                  <v-card-title class="text-center pb-0">
                    <v-avatar size="128">
                      <v-icon size="92" style="opacity : 60%;">mdi-cube-scan</v-icon>
                    </v-avatar>
                  </v-card-title>
                  <v-card-title class="text-center">
                    Select a resource to view
                  </v-card-title>

                  <v-card-subtitle class="text-subtitle-2 text-center">
                    You may add new resources by clicking the plus icon
                  </v-card-subtitle>
                </v-sheet>
                <v-sheet class="flex-grow-1" v-else>
                  <v-sheet class="flex-grow-1 rounded-te-lg" v-if="selected_resource.name">
                    <v-toolbar class="rounded-te-lg" density="compact">
                      <v-toolbar-title class="text-subtitle-2">Preview</v-toolbar-title>
                      <v-spacer />
                      <v-btn class="mr-0" icon="mdi-delete" color="red" :ripple="false" @click="delete_resource" />
                    </v-toolbar>
                    <v-divider />

                    <v-list-item class="pt-0" lines="three">
                      <template v-slot:prepend>
                        <v-avatar size="72" rounded="0">
                          <v-icon size="64">{{ icon_types[selected_resource.type] || "mdi-help" }}</v-icon>
                        </v-avatar>
                      </template>

                      <v-list-item-title>{{ selected_resource.name }}</v-list-item-title>
                      <v-list-item-subtitle class="text-capitalize">{{ selected_resource.type }}</v-list-item-subtitle>
                      <v-list-item-subtitle class="text-caption" style="white-space:normal">
                        <hr />
                        {{selected_resource.desc}}
                      </v-list-item-subtitle>
                    </v-list-item>

                    <v-card-text v-if="selected_resource.type === 'subdomain'">
                      <h6 class="text-center text-subtitle-2">Associated Resources</h6>
                      <v-sheet height="220" rounded="lg" style="border : 2px dashed lightblue; overflow-y : auto">
                        <Container @drop="assign_to_subdomain($event)" :get-child-payload="get_assigned_payload"
                          group-name="primitive-pool">
                          <Draggable v-for="e in selected_resource.resources" :key="e.id">
                            <lazy-uac-primitive :value="e" />
                          </Draggable>
                        </Container>
                      </v-sheet>
                    </v-card-text>

                    <v-card-text v-if="selected_resource.type === 'page'">
                      <h6 class="text-center text-subtitle-2">Associated Endpoints</h6>
                      <v-sheet min-height="220" rounded="lg" style="border : 2px dashed lightblue; overflow-y : auto">
                        <Container @drop="assign_to_page($event)" :get-child-payload="get_assigned_payload"
                          group-name="primitive-pool">
                          <Draggable v-for="e in selected_resource.resources" :key="e.id">
                            <lazy-uac-primitive :value="e" />
                          </Draggable>
                        </Container>
                      </v-sheet>
                    </v-card-text>
                  </v-sheet>
                </v-sheet>
              </v-fade-transition>
            </v-layout>
          </v-card-text>
        </v-sheet>
        <v-divider />
        <v-card-actions class="pa-0 d-flex">
          <v-menu location="left" :close-on-content-click="false">
            <template v-slot:activator="{props}">
              <v-btn v-bind="props" class="flex-shrink-1 ml-2" variant="text" border>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>

            <!--Filter Primitives-->
            <v-card width="240" border>
              <v-toolbar height="44" border>
                <v-toolbar-title class="text-subtitle-2 ml-2">Filter</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-text-field class="mb-2" v-model="primitive_filter.search" label="Text Search" hide-details />
                <v-select v-model="primitive_filter.type" label="Type" :items="filter_types" />
                <v-select v-model="primitive_filter.router" label="Filter by Router" no-data-text="No routers found"
                  hide-details />
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="warning" variant="outlined" size="small">Reset</v-btn>
                <v-btn color="primary" variant="outlined" size="small">Search</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
          <v-slide-group class="flex-grow-1" v-model="highlighted_resource"
            v-on:update:model-value="set_highlighted_primitive" style="overflow-x : auto" show-arrows>
            <Container orientation="horizontal" group-name="primitive-pool" :get-child-payload="get_primitive_payload"
              :get-ghost-parent="get_parent">
              <Draggable v-for="p in primitives" :key="p._id">
                <v-slide-group-item v-slot="{toggle}">
                  <lazy-uac-primitive :value="p" @click="toggle" />
                </v-slide-group-item>
              </Draggable>
            </Container>
          </v-slide-group>
        </v-card-actions>
      </v-sheet>
    </v-fade-transition>
    <!--Dialogs-->
    <v-dialog v-model="subdomain_dialog" max-width="450">
      <commons-simple-form title="Create Subdomain" req="admin/object-authority/create-subdomain"
        :before_submit="subdomain_body" @success="load_resources">
        <v-row dense>
          <v-col cols="12">
            <v-text-field label="Name" name="name" :rules="[$validator.required]" hide-details />
          </v-col>
          <v-col cols="12">
            <v-textarea label="Description (Optional)" name="desc" rows="3" hide-details />
          </v-col>
        </v-row>
      </commons-simple-form>
    </v-dialog>

    <v-dialog v-model="page_dialog" max-width="400">
      <commons-simple-form title="Create Page" req="admin/object-authority/create-page" :before_submit="page_body"
        @success="load_resources">
        <v-row dense>
          <v-col cols="12">
            <v-text-field label="Name" name="name" :rules="[$validator.required]" hide-details />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Absolute Path" name="path" prefix="/" :rules="[$validator.required]" hide-details />
          </v-col>
        </v-row>
      </commons-simple-form>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app';
import { useDomains, useSnackbar } from '~~/store';

/* @ts-ignore */
import { Container, Draggable } from "vue-dndrop";
import swal from 'sweetalert';

const route     = useRoute();
const domains   = useDomains();
const { $rest } = useNuxtApp();
const snackbar  = useSnackbar();
definePageMeta({
  layout : "domainmgr",
  middleware : "domain-params"
});

onBeforeMount(()=>{
  load_resources();
});

const items = ref({
  subdomains : [] as Subdomain[],
  pages      : [] as Page[],
  endpoints  : [] as Endpoint[],
  files      : [] as File[]
});
async function load_resources(){
  items.value = {
    subdomains : [] as Subdomain[],
    pages      : [] as Page[],
    endpoints  : [] as Endpoint[],
    files      : [] as File[]
  }
  
  const { data } = await $rest("admin/object-authority/get-resources", {
    method : "GET",
    query : {
      domain_id : domain.value._id
    }
  });

  let temp = data as any[];
  
  //Categorize Resources into either logical or primitive resources.
  temp.forEach((res : any)=>{
    const { type } = res;

    switch(type){
      case "subdomain" : items.value.subdomains.push(res as Subdomain);break;
      case "page"      : items.value.pages.push(res as Page);break;
      case "endpoint"  : items.value.endpoints.push(res as Endpoint);break;
      case "file"      : items.value.files.push(res as File);break;
    }
  });
}


/* Primitive Filter */
const primitive_filter = ref({
  search : "",
  type   : "All",
  router : []
})

/* Wizard Toggle */
const resource_viewer = ref(true);
const resource_wizard = ref(false);
function toggle_wizard(state : boolean){
  if(state){
    resource_viewer.value = false;
    return setTimeout(()=> resource_wizard.value = true, 350);
  }

  resource_wizard.value = false;
  resource_viewer.value = true
}
function set_highlighted_subdomain(index : any){
  highlighted_type.value = "subdomains";
  set_highlighted_resource(index);
}
function set_highlighted_primitive(index : any){
  highlighted_type.value = "primitives";
  set_highlighted_resource(index);
}
function set_highlighted_resource(index : any){
  if(typeof index === "undefined"){
    setTimeout(()=>{
      empty_banner.value = true
    }, 350);
    /* @ts-ignore */
    return highlighted_resource.value = undefined;
  }
  
  empty_banner.value = false;
  /* @ts-ignore */
  highlighted_resource.value = undefined;
  return setTimeout(()=>{
    highlighted_resource.value = index;
  }, 350);
}

/* Create Subdomain */
const subdomain_dialog = ref(false);
function subdomain_body(data : any){
  return {
    domain_id : domain.value._id,
    subdomain : data
  }
}
function delete_resource(){
  const { _id } = selected_resource.value;

  swal({
    title : "Delete Resource",
    text  : "Are you sure you want to delete this resource?",

    dangerMode : true
  })
  .then(async(res)=> {
    if(res){
      const { data, error } = await $rest("admin/object-authority/delete-resource", {
        method : "DELETE",
        body : {
          resource_id : _id
        }
      });

      swal({ icon : error ? "error" : "success", title : data || error, buttons : {ok :true}});
    }
  })
}
const page_dialog      = ref(false);
function page_body(data : any){
  return {
    domain_id : domain.value._id,
    page      : data
  }
}

/* Resource Interactions (DnD) */
function assign_to_subdomain(drop_result : any){
  const { removedIndex, addedIndex, payload } = drop_result;
  const subdomain_index = highlighted_resource.value;
  if (removedIndex !== null || addedIndex !== null) {
    
    if(subdomain_index != null){
      const subdomain = Object.assign({}, items.value.subdomains[subdomain_index]);
      
      subdomain.resources = applyDrag(subdomain.resources, drop_result);
      items.value.subdomains[subdomain_index] = subdomain;
      update_selected_resource(payload)
    }
  }
}
function assign_to_page(drop_result : any){
  const { removedIndex, addedIndex, payload } = drop_result;
  const primitive_index = highlighted_resource.value;
  if (removedIndex !== null || addedIndex !== null) {
    
    if(primitive_index != null){
      const page = Object.assign({}, items.value.pages[primitive_index]);
      
      page.resources = applyDrag(page.resources, drop_result);
      items.value.pages[primitive_index] = page;
      update_selected_resource(payload);
    }
  }

  
}

async function update_selected_resource(resource : any){
  const { _id } = selected_resource.value;

  const { data, error } = await $rest("admin/object-authority/resource-assignment", {
    method : "POST",
    body : {
      parent : _id,
      child  : resource._id
    }
  });

  snackbar.set_message(error || data, error ? "error" : "success");
}

function get_primitive_payload(index : number){
  return JSON.parse(JSON.stringify(primitives.value[index]));
}
function get_assigned_payload(index: number){
  return JSON.parse(JSON.stringify(primitives.value[index]));
}
function get_parent(){
  return document.body;
}

/* Computed Items */
const resources = computed(()=> {
  const { subdomains } = items.value;
  return subdomains as any[];
});
const primitives = computed(()=> {
  const { pages, endpoints, files } = items.value;
  /* @ts-ignore */
  return pages.concat(endpoints, files) as any[];
});
const domain  = computed(()=> useDomains().domains[String(route.params.domain)]);
const highlighted_resource = ref(null);
const highlighted_type     = ref("subdomain");
const selected_resource    = computed(()=> {
  if(typeof highlighted_resource.value !== "number")return {};
  
  return highlighted_type.value === "subdomains" ? resources.value[highlighted_resource.value] : primitives.value[highlighted_resource.value];
});
const empty_banner = ref(true);

/* Others */
//Filter
const filter_types = ref(["All", "Pages", "Endpoints", "Files"]);
const icon_types = ref({
  subdomain : "mdi-group",
  page      : "mdi-note-outline",
  endpoint  : "mdi-api"
}) as any;

function applyDrag(arr : any[], dragResult : any) {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null)itemToAdd = result.splice(removedIndex, 1)[0];
  if (addedIndex !== null)result.splice(addedIndex, 0, itemToAdd);

  return result;
};
</script>