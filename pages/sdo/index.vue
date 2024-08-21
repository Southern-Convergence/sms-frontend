<template>
  <div>


    <v-row no-gutters>
      <v-col cols="12"><v-btn prepend-icon="mdi-pencil-plus" @click="user_invite_dialog = true" color="indigo"
          rounded="0">
          Invite
          User</v-btn>

        <commons-sms class="my-2 mr-3" title="SDO USER MANAGEMENT" subtitle="A brief overview of users." rounded="lg"
          :items="users_data" :display_types="['grid', 'table']">
          <template v-slot:item="{ value, index, display }">
            <v-card :key="index" border class="pa-2 ma-1" rounded="lg">
              <div class="d-flex mb-1">
                <div class="text-uppercase  text-indigo text-body-1"> {{ value.first_name
                  }}
                  {{
                    value.last_name }}
                </div>
                <v-spacer />
                <div> <v-chip density="compact" class="text-uppercase text-overline"
                    :color="value.status === 'invited' ? 'error' : 'success'">{{
                      value.status }}</v-chip></div>
              </div>
              <div> {{ value.role ? value.role : 'Pending' }} <span v-if="value.division">
                  {{
                    value.division.title
                  }}
                </span>
              </div>
              <div class="text-caption text-capitalize mb-2">{{ value?.side ? value?.side : 'SDO' }}</div>


              <div><v-icon color="red-lighten-3"> mdi-email</v-icon> <u class="text-blue">{{
                value.email }}</u> </div>
              <div class="mt-2">
                <v-menu :close-on-content-click="false" location="end">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" density="compact" color="primary">
                      Manage</v-btn>
                  </template>

                  <v-card min-width="300">
                    <v-list>
                      <v-list-item title="Manage SDO User">
                        <template v-slot:append>
                          <v-icon color="indigo" size="24">mdi-human</v-icon>
                        </template>
                      </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list lines="two">
                      <v-list-item title="Update Account" subtitle="Update and modify an account."
                        @click="update_invite_dialog = true">
                        <template v-slot:prepend>
                          <v-icon color="primary" size="22">mdi-account-edit-outline</v-icon>
                        </template>
                      </v-list-item>
                      <v-list-item title="Suspend Account" subtitle="Suspend account for a soecific reason.">
                        <template v-slot:prepend>
                          <v-icon color="primary" size="22">mdi-account-off</v-icon>
                        </template>
                      </v-list-item>



                    </v-list>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn variant="text" color="error">
                        Close </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </div>

            </v-card>
          </template>

          <template v-slot:table="{ items }">
            <v-sheet border> <v-data-table :items="items" :headers="user_headers">
                <template v-slot:item.full_name="{ item }">
                  <span color="primary" density="compact">{{ item.selectable.first_name }} {{ item.selectable.last_name
                    }}
                  </span>
                </template>
                <template v-slot:item.status="{ item }">
                  <p density="compact" class="text-uppercase text-overline"
                    :class="item.status === 'invited' ? 'text-error' : 'text-success'">{{
                      item.selectable.status }}</p>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-menu :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" density="compact" color="primary">
                        Manage</v-btn>
                    </template>

                    <v-card min-width="300">
                      <v-list>
                        <v-list-item title="Manage User">
                          <template v-slot:append>
                            <v-icon color="indigo" size="24">mdi-human</v-icon>
                          </template>
                        </v-list-item>
                      </v-list>

                      <v-divider></v-divider>

                      <v-list lines="two">
                        <v-list-item title="Update Account" subtitle="Update and modify an account."
                          @click="update_invite_dialog = true">
                          <template v-slot:prepend>
                            <v-icon color="primary" size="22">mdi-account-edit-outline</v-icon>
                          </template>
                        </v-list-item>
                        <v-list-item title="Suspend Account" subtitle="Suspend account for a soecific reason.">
                          <template v-slot:prepend>
                            <v-icon color="primary" size="22">mdi-account-off</v-icon>
                          </template>
                        </v-list-item>



                      </v-list>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn variant="text" color="error">
                          Close </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </template>

              </v-data-table></v-sheet>
          </template>
        </commons-sms>

      </v-col>



    </v-row>





    <!-- Dialog -->
    <v-dialog v-model="user_invite_dialog" max-width="40%">
      <v-sheet>
        <v-toolbar color="indigo" border>
          <v-list-item class="pl-2" density="compact">
            <template v-slot:prepend>
              <v-avatar class="mr-1" variant="text">
                <v-icon icon="mdi-account" dark />
              </v-avatar>
            </template>
            <v-list-item-title> USER INVITE FORM</v-list-item-title>
            <v-list-item-subtitle> Enter User Information</v-list-item-subtitle>
          </v-list-item>
          <v-spacer />
          <v-btn @click="user_invite_dialog = false" class="mr-0" rounded="0" icon="mdi-close" />
        </v-toolbar>
        <v-card-text>
          <v-form ref="sdo_user_form">
            <v-row dense>

              <v-col cols="12"><v-text-field v-model="invitation_form.email" density="compact" label="Email address"
                  prepend-inner-icon="mdi-email-outline" required
                  :rules="[(v) => /.+@.+/.test(v) || 'Invalid Email address']" /></v-col>
              <v-col cols="4"><v-text-field v-model="invitation_form.first_name" density="compact" hide-details="auto"
                  label="Firstname" required :rules="[v => !!v || 'Firstname is required']" /></v-col>
              <v-col cols="4"><v-text-field v-model="invitation_form.middle_name" density="compact" hide-details="auto"
                  label="Middlename" /></v-col>
              <v-col cols="4"><v-text-field v-model="invitation_form.last_name" density="compact" hide-details="auto"
                  label="Lastname" required :rules="[v => !!v || 'Lastname is required']" /></v-col>




              <v-col cols="6">
                <v-select v-model="invitation_form.apts" :items="sdo_roles" item-title="name" return-object label="Role"
                  hide-details="auto" item-value="_id" :rules="[v => !!v || 'Role is required']" />
              </v-col>


            </v-row>
          </v-form>


        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-row dense justify="center">
            <v-col cols="4">
              <v-btn @click="invite_user" variant="tonal" color="indigo" block>
                <v-icon class="pr-2" size="28"> mdi-message-text-fast</v-icon> Send Invite
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-sheet>
    </v-dialog>

  </div>
</template>

<script setup lang="ts">

const route = useRoute();
const router = useRouter();
import { ref } from 'vue';
import swal from 'sweetalert';

import useAuth from "~/store/auth";
import { useAPTs, useDomains, useLoader } from '~/store/index';

const apts = useAPTs();
const loader = useLoader();
const domains = useDomains();

definePageMeta({ layout: "barren" })


onBeforeMount(() => {
  Promise.all([
    get_users(),

    get_apts(),
    load_resources()
  ])
})

const auth = useAuth().user;

const { $rest } = useNuxtApp();



const DEFAULT_DOMAIN = "Southern Convergence"; //Until We perfect the microservices based approach,

const domain = computed(() => domains.active_domain) as any;
const user_groups = ref([]);
async function load_resources() {
  const domain_res = await $rest("admin/policy-authority/get-domains", { method: "GET" });
  domains.hydrate(domain_res.data);
  /* @ts-ignore */
  if (!domain.value) domains.set_active_domain(DEFAULT_DOMAIN);

  const query = { domain_id: domain.value._id };
  const [apt_res, user_group_res] = await Promise.all([
    $rest("admin/policy-authority/get-apts", { method: "GET", query }),
    $rest("admin/subject-authority/get-user-groups", { method: "GET", query })
  ]);
  console.log(apt_res.data, domain.value.access_policies);
  apts.hydrate(apt_res.data, domain.value.access_policies);
  user_groups.value = user_group_res.data.map((v: any) => ({ title: v.name, value: v }));
}



const user_headers = ref([
  { title: "Full Name", key: "full_name" },
  { title: "Role", key: "role" },
  { title: "Side", key: "side" },
  { title: "Email Address", key: "email" },
  { title: "Status", key: "status" },
  { title: "Actions", key: "actions" },
])




/**
 * 
 */


const invitation_form = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
  appellation: "",

  email: "",

  apts: [],
  group: "",
  designation: {
    division: route.query.id
  },
  side: "SDO"
} as any);



const user_invite_dialog = ref(false);
const sdo_user_form = ref()

const users_data = ref<SmsUser[]>([])
async function get_users() {
  const { data, error } = await $rest('sms-sdo/get-sdo-users', {
    method: "GET",
    query: { id: route.query.id }
  });
  users_data.value = data
}





async function invite_user() {
  loader.set("Sending out invitation form...");

  invitation_form.value.apts = [invitation_form.value.apts];
  const { data, error } = await $rest("auth/invite-user", {
    method: "POST",
    body: {
      domain: {
        id: domain.value._id,
        name: domain.value.name,
      },
      ...invitation_form.value
    }
  });

  loader.set(false);
  const success = Boolean(data);
  // user_form.value.reset();
  swal({
    title: success ? "Success" : "Request Failed",
    icon: success ? "success" : "error",
    text: data || (error || "Failed to reach server"),
  });
}
const roles = ref([]);

const get_apts = async () => {
  const domain = auth.access[0].domain_id;
  if (!domain) return swal({ title: "Fuck" })
  const { data, error } = await $rest("admin/policy-authority/get-apts", { method: "GET", query: { domain_id: domain } });

  const apts = data.filter((v: any) => v.internal === false);
  roles.value = apts.filter((role: any) => need_roles.includes(role.name))
}


const need_roles = ["Administrative Officer IV", "Evaluator", "SDO Admin"]

const sdo_roles = computed(() => {
  return roles.value.filter(role => need_roles.includes(role.name))
})





</script>
<style scoped>
* {
  font-size: 12px
}

.user-item {
  transition: background-color 0.3s ease-in-out;
}

.user-item:hover {
  background-color: #E8EAF6;
}
</style>