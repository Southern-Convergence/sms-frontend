<template>
  <commons-item-container title="User Management" subtitle="Create or modify users and their respective access rights."
    icon="mdi-account-group" :display_types="['grid', 'list']" :display="1" :items="shown_users" extended>
    <template v-slot:extension>
      <v-layout d-flex>
        <v-tabs v-model="selected_user_group" color="primary">
          <v-tab class="text-subtitle-1" v-for="user_group in user_groups" :key="user_group" :value="user_group" variant="flat">{{ user_group }}</v-tab>
        </v-tabs>
        <v-spacer />

        <v-menu>
          <template v-slot:activator="{props}">
            <v-btn v-bind="props" icon="mdi-plus" />
          </template>

          <v-list>
            <v-list-item title="Add User" @click="user_dialog = true" />
            <v-list-item title="Add User Group" @click="user_group_dialog = true" />
          </v-list>
        </v-menu>
      </v-layout>
    </template>

    <template v-slot:item="{value}">
      <v-card border>
        <v-chip class="float-right mt-2 mr-2 text-capitalize">{{ value.status }}</v-chip>
        <v-card-title>{{value.first_name}} {{ value.last_name }}</v-card-title>
        <v-card-subtitle>
          e-mail: {{ value.email }}
        </v-card-subtitle>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="manage_user(value)">Manage</v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <commons-dialog v-model="user_dialog" title="Add User" width="360">
      <v-card>
        <v-form v-model="valid_create_user_form" @submit.prevent="create_user">
          <v-card-text class="pb-0">
            <v-row dense>
              <v-col cols="12">
                <v-select v-model="create_user_form.user_type" :items="$user_types" label="User Type" item-title="name"
                  item-value="prop" hide-details>
                  <template v-slot:selection="{item}">
                    <v-list-item class="px-0" :title="item.raw.name" :subtitle="item.raw.desc">
                      <template v-slot:prepend>
                        <v-avatar class="mr-0" variant="text" size="42">
                          <v-icon class="mr-2" size="32" :icon="item.raw.icon" color="primary" />
                        </v-avatar>
                      </template>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12">
                <v-select v-model="create_user_form.apts" :items="valid_apts" label="Access" :rules="[$validator.required]" hide-details chips multiple>
                </v-select>
              </v-col>

              <v-col cols="12">
                <v-select v-model="create_user_form.group" :items="valid_user_groups" label="User Group (Optional)" clearable>
                </v-select>
              </v-col>
            </v-row>
          </v-card-text>


          <v-card-text v-if="create_user_form.user_type === 'internal'">
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="create_user_form.user_info.first_name" label="First Name" :rules="[$validator.required]" hide-details />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="create_user_form.user_info.middle_name" label="Middle Name (Optional)" hide-details />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="create_user_form.user_info.last_name" label="Last Name" :rules="[$validator.required]" hide-details />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="create_user_form.user_info.email" label="E-Mail" :rules="[$validator.email]" type="email" hide-details />
              </v-col>
            </v-row>
          </v-card-text>
          
          <v-card-text v-else-if="create_user_form.user_type === 'npe'">
            <v-layout>
              <v-spacer />
              <v-avatar size="42">
                <v-icon size="42">mdi-information-outline</v-icon>
              </v-avatar>
              <v-spacer />
            </v-layout>

            <span class="d-block text-center">In Progress</span>
          </v-card-text>

          <v-card-actions class="d-block px-4">
            <v-btn color="primary" variant="flat" type="submit" block>Invite</v-btn>
            <span class="text-caption text-center d-block pt-2">An invitation will be sent to the specified email
              address</span>
          </v-card-actions>
        </v-form>
      </v-card>
    </commons-dialog>
    <commons-dialog v-model="user_group_dialog" title="Add User Group" width="360">
      <commons-simple-form :hide-toolbar="true" req="admin/subject-authority/create-user-group" :misc_data="{domain_id : domain._id}" @success="load_resources">
        <v-row dense>
          <v-col cols="12">
            <v-text-field label="Name" name="name" :rules="[$validator.required]" hide-details />
          </v-col>

          <v-col cols="12">
            <v-textarea rows="2" label="Description (Optional)" name="desc" hide-details />
          </v-col>
        </v-row>
      </commons-simple-form>
    </commons-dialog>

    <commons-dialog v-model="manage_user_dialog" @update:modelValue="reset_user" width="400" title="Manage User">
      <v-card class="px-4" v-if="active_user" :loading="loading_user">
        <v-card-text class="pt-2">
          <v-list-item class="pb-0 px-0 pt-0" :title="`${active_user.first_name} ${active_user.last_name}`">
            <v-list-item-subtitle class="d-flex">Email: {{ active_user.email }} </v-list-item-subtitle>
            <v-list-item-subtitle>User Group: {{ selected_user_group }}</v-list-item-subtitle>
            <template v-slot:append>
              <v-chip class="text-capitalize">{{ active_user.status }}</v-chip>
            </template>
          </v-list-item>
          <v-divider />

          <v-list class="mt-2">
            <span class="text-title-1 text-medium-emphasis">Applied APTs</span>
            <v-list-item class="mb-2" v-for="apt in active_user.access" :key="apt._id" :title="apt.name" subtitle="Role Based" rounded="lg" border>
              <template v-slot:append>
                <v-btn class="text-subtitle-1" @click="revoke_apt(apt)" variant="text" color="error">Revoke</v-btn>
                <v-tooltip location="bottom">
                  <template v-slot:activator="{props}">
                    <v-btn class="text-subtitle-1" v-bind="props" variant="text" color="primary" rounded="0" density="compact" icon="mdi-open-in-new" />
                  </template>
                  <span>View APT</span>
                </v-tooltip>
              </template>
            </v-list-item>

            <v-list-item rounded="lg" title="Add APT" @click="select_apt = true" border>
              <template v-slot:prepend>
                <v-avatar class="mr-0">
                  <v-icon color="primary">mdi-plus-circle</v-icon>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-text>
          <v-row dense>
            <!-- 
              Buttons are based on the status of user
            -->
            <v-col cols="12">
              <v-layout d-flex>
                <v-divider style="align-self : center"/>
                <span class="px-1 text-caption">Actions</span>
                <v-divider style="align-self : center"/>
              </v-layout>
            </v-col>

            <v-col cols="12" v-if="active_user.status === 'invited'">
              <v-btn color="primary" block>Resend Invitation</v-btn>
            </v-col>





            <v-col cols="12">
              <v-layout d-flex>
                <v-divider class="text-red" style="align-self : center"/>
                <span class="px-1 text-caption text-red">Danger</span>
                <v-divider class="text-red" style="align-self : center"/>
              </v-layout>
            </v-col>
            <v-col cols="12">
              <v-btn color="warning" block>Suspend</v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn color="error" block>Deactivate</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </commons-dialog>

    <commons-dialog v-model="select_apt" width="520" hide-toolbar>
      <uac-neo-apt-select v-model="selected_apts" @set="handle_apt_assignment" :disable_actions="disable_apt_setting"/>
    </commons-dialog>
  </commons-item-container>
</template>

<script lang="ts" setup>
import swal from 'sweetalert';
import { diff  } from "deep-object-diff";
import { definePageMeta } from '~~/.nuxt/imports';
import { useLoader, useDomains, useAPTs } from "~~/store";

const loader    = useLoader();
const route     = useRoute();
const { $rest, $toPOJO } = useNuxtApp();

definePageMeta({
  layout : "domainmgr",
  middleware : "domain-params"
});

const users       = ref({} as any);
const user_groups = computed(()=> Object.keys(users.value));
const valid_user_groups = computed(()=> Object.values(users.value)
.filter((v : any)=> v.name !== "Unassigned")
.map((v : any)=> ({title : v.name, value : {id : v._id, name : v.name}})));

const active_user        = ref(null as any);
const manage_user_dialog = ref(false);
const loading_user       = ref(false);
async function manage_user(user : any){
  manage_user_dialog.value = true;
  active_user.value = user;
  selected_apts.value = user.access.map((v)=> v._id);
}

function reset_user(){
  active_user.value = null;
}

const selected_user_group = ref("Unassigned");

/* @ts-ignore */
const shown_users = computed(()=> {
  const map_res = users.value[selected_user_group.value];
  return map_res ? map_res.users : [];
});


const user_dialog = ref(false);
const valid_create_user_form = ref(false);
const create_user_form = ref({
  user_type  : "internal",
  apts  : [],
  group : "",
  user_info : {
    first_name : "",
    middle_name : "",
    last_name : "",
    email : "",

    domain_name : "",
    port : ""
  },
});
const user_group_dialog = ref(false);

const apts = useAPTs();
const valid_apts = computed(()=> {
  return apts.get_items.map((v)=> ({title : v.name, value : v}));
});
const select_apt = ref(false);
const selected_apts = ref([]);
const disable_apt_setting = computed(()=> {
  if(!select_apt.value)return true;
  //Diffs the current active apt's resources against the selected resources;
  const prev_resources = $toPOJO(active_user.value.access.map((v)=> v._id));
  const d = diff(prev_resources, $toPOJO(selected_apts.value));
  return !Object.keys(d).length;
})

async function create_user(){
  let form_body:any = Object.assign({}, create_user_form.value);

  switch(create_user_form.value.user_type){
    case "internal" : {
      delete form_body.user_info.domain_name;
      delete form_body.user_info.port;
    }break;

    case "npe" : {
      delete form_body.user_info.first_name;
      delete form_body.user_info.middle_name;
      delete form_body.user_info.last_name;
      delete form_body.user_info.email;
    }break;
  }

  if(!form_body.group)delete form_body.group;

  loader.set("Sending out invitation form...")
  const { data, error } = await $rest("admin/subject-authority/invite-user", {
    method : "POST",
    body : {
      domain : {
        id   : domain.value._id,
        name : domain.value.name 
      },
      ...form_body
    }
  });
  loader.set(false);

  const success = Boolean(data);
  swal({
    title   : success ? "Success" : "Request Failed",
    icon    : success ? "success" : "error",
    text    : data || (error || "Failed to reach server"),
  });

  load_resources();
}

async function delete_user(){
  
}

async function handle_apt_assignment(apts : any){
  loader.set("Assigning APTs");
  const { data, error } = await $rest("admin/subject-authority/set-apts", {
    method : "POST",
    body   : {
      user_id : active_user.value._id,
      apts    : selected_apts.value
    }
  });
  loader.set(false);
  load_resources();
  swal({ icon : error ? "error" : "success", title : data || error, buttons : {ok :true}});
  loader.set(false);
}
async function revoke_apt(apt : any){
  loader.set("Revoking APT");
  const { data, error } = await $rest("admin/subject-authority/revoke-apt", {
    method : "POST",
    body : {
      user_id : active_user.value._id,
      apt     : apt._id
    }
  });
  loader.set(false);

  load_resources();

  swal({ icon : error ? "error" : "success", title : data || error, buttons : {ok :true}})
}

const domain = computed(()=> useDomains().domains[String(route.params.domain)]);

onBeforeMount(load_resources);

async function load_resources(){
  loader.set("Fetching Values...");
  const reqs = [
    $rest("admin/subject-authority/get-users", { method : "GET", query : { domain_id : domain.value._id}}),
  ];

  const [fetched_users] = await Promise.all(reqs).then((v)=> v.map((d)=> d.data));
  users.value = fetched_users;
  loader.set(false);
}
</script>