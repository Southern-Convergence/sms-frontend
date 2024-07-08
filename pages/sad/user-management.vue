<template>
  <commons-item-container title="User Management" icon="mdi-account-search" rounded="lg" :items="calced_employees"
    :headers="employee_headers" :loading="!ready" extended>
    <template v-slot:extension>
      <v-layout style="align-items : center" d-flex>
        <v-sheet min-width="260" color="transparent">
          <v-text-field v-model="search_str" placeholder="Search by keywords..." :loading="!ready"
            :messages="`${calced_employees.length} Match${calced_employees.length > 1 ? 'es' : ''}`" hide-details
            autofocus clearable>
            <template v-slot:prepend-inner>
              <v-icon>mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </v-sheet>
        <v-spacer />

        <v-item-group>
          <v-btn class="text-body-1" variant="outlined" color="primary" disabled>
            <v-icon>mdi-file-export-outline</v-icon>
            Export
          </v-btn>
          <v-btn class="text-body-1 ml-1" @click="user_dialog = true" variant="outlined" color="primary">
            <v-icon class="mr-1">mdi-account-plus</v-icon>
            Add User
          </v-btn>
        </v-item-group>
      </v-layout>
    </template>

    <template v-slot:table="props">
      <v-sheet rounded="lg" :loading="!ready" border>
        <v-data-table v-bind="props" id="employee-table" :loading="!ready" :group-by="header_grouping"
          density="comfortable">
          <template v-slot:item.actions="{ item }">
            <v-menu :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-chip class="text-capitalize" v-bind="props" variant="outlined" size="small" label>Actions</v-chip>
              </template>

              <v-list>
                <v-list-item @click="manage_user(item.value, 'records')">Manage Records</v-list-item>
                <v-list-item @click="manage_user(item.value, 'access')">Manage Access</v-list-item>
                <v-list-item @click="manage_user(item.value, 'pds')">View PDS</v-list-item>
              </v-list>
            </v-menu>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip class="text-capitalize" variant="outlined" :color="get_status_color(item.raw.status)" size="small"
              label>{{ item.raw.status }}</v-chip>
          </template>
        </v-data-table>
      </v-sheet>
    </template>

    <template v-slot:item="{ value }">
      <v-lazy :options="{ 'threshold': 0.1 }">
        <v-card border>
          <v-chip class="float-right mt-2 mr-1 text-capitalize"
            :color="value.status === 'deactivated' ? 'error' : 'primary'">{{ value.status }}</v-chip>
          <v-card-title class="text-body-1">{{ value.name }}</v-card-title>

          <v-card-text>
            <span>Office: {{ value.office }}</span>
            <br />
            <span>Unit: {{ value.unit }}</span>
            <br />
            <span>Employee ID: {{ value.agency_id }}</span>
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-menu :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props">Manage</v-btn>
              </template>

              <v-list>
                <v-list-item @click="manage_user(value, 'records')">Manage Records</v-list-item>
                <v-list-item @click="manage_user(value, 'access')">Manage Access</v-list-item>
                <v-list-item @click="manage_user(value, 'pds')">View PDS</v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
        </v-card>
      </v-lazy>
    </template>

    <commons-dialog v-model="user_dialog" width="460" title="Add User" subtitle="Manually invite a user"
      icon="mdi-account-outline" persistent>
      <v-card-text>
        <v-alert type="info" variant="tonal" density="compact" prominent
          text="Note: Manually adding users are reserved for special cases and should not be taken as the default mode of user onboarding."
          border="start" />

        <v-divider class="my-2" />

        <v-form v-model="valid_invitation" @submit.prevent="invite_user">
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="invitation_form.first_name" label="First Name" :rules="[$validator.required]"
                hide-details />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="invitation_form.middle_name" label="Middle Name (Optional)" hide-details />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="invitation_form.last_name" label="Last Name" :rules="[$validator.required]"
                hide-details />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="invitation_form.appellation" label="Appellation" hide-details />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="invitation_form.email" label="Email Address"
                :rules="[$validator.required, $validator.email]" />
            </v-col>

            <v-col cols="12">
              <v-select v-model="invitation_form.group" :items="user_groups" label="User Group (Optional)" hide-details
                clearable>
                <template v-slot:selection="{ item }">
                  <v-list-item class="px-0">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>

                    <v-list-item-subtitle>
                      {{ item.value.desc }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>

            <v-col cols="12">
              <v-select v-model="invitation_form.apts" :items="valid_apts" label="Access" :rules="[$validator.required]"
                hide-details chips multiple />
            </v-col>
            <v-col cols="12">
              <commons-designation-picker :rules="[$validator.required]"
                @designation_update="(v: any) => invitation_form.designation = v" />
            </v-col>

            <v-col cols="12">
              <v-btn color="primary" type="submit" block>Submit</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </commons-dialog>

    <commons-dialog v-model="record_dialog" @update:modelValue="active_user = null" title="Records Management"
      subtitle="Manage employee records" icon="mdi-form-select" max-width="1280" persistent>
      <hris-record-library :value="active_user" v-if="active_user" />
    </commons-dialog>

    <commons-dialog v-model="access_dialog" width="520" title="User Management" subtitle="Manage employee access."
      icon="mdi-account-cog" persistent>

      <v-card-text v-if="active_user">
        <v-list-item class="px-0">
          <template v-slot:prepend>
            <layout-avatar size="64" :user="active_user" />
          </template>
          <v-list-item-title>{{ active_user.name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ active_user.office }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{ active_user.position }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-card-text>

      <v-window v-model="access_window">
        <v-window-item value="main-menu">
          <v-card-text class="pt-0">
            <v-list>
              <v-list-subheader>Administrative Actions</v-list-subheader>
              <v-list-item class="mb-2 mx-2" v-for="option, i in manage_account_options" :key="i" :title="option.title"
                @click="access_window = option.window" color="primary" rounded="lg" border>
                <template v-slot:prepend>
                  <v-icon class="mr-2" color="primary">{{ option.icon }}</v-icon>
                </template>
                <v-list-item-subtitle>{{ option.subtitle }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item v-if="active_user.status === 'active'" class="mb-2 mx-2" title="Suspend Account"
                @click="access_window = 'suspend'" color="primary" rounded="lg" border>
                <template v-slot:prepend>
                  <v-icon class="mr-2" color="primary">mdi-account-off</v-icon>
                </template>
                <v-list-item-subtitle>Temporarily suspend access.</v-list-item-subtitle>
              </v-list-item>

              <v-list-item class="mb-2 mx-2" color="primary" rounded="lg" v-if="active_user.status === 'active'"
                title="Deactivate account." @click="access_window = 'deactivate'" border>
                <template v-slot:prepend>
                  <v-icon class="mr-2" color="primary">mdi-account-remove-outline</v-icon>
                </template>
                <v-list-item-subtitle>Deactivate account for a specific reason.</v-list-item-subtitle>
              </v-list-item>

              <!-- <v-list-item class="mb-2 mx-2" color="primary" rounded="lg" v-else title="Reactivate account."
                @click="access_window = 'reactivate'" border>
                <template v-slot:prepend>
                  <v-icon class="mr-2" color="primary">mdi-account-reactivate-outline</v-icon>
                </template>
                <v-list-item-subtitle>Reactivate account for a specific reason.</v-list-item-subtitle>
              </v-list-item> -->
            </v-list>
          </v-card-text>
        </v-window-item>

        <v-window-item value="review-logs">
          <v-card-text class="pt-0">
            <v-btn class="float-left" @click="access_window = 'main-menu'" variant="text" icon="mdi-arrow-left" />
            <v-card-title class="text-body-1">
              Review Log History
            </v-card-title>

            <v-card-text class="pa-2">
              <h6 class="text-body-1">There are no logs to be found.</h6>
            </v-card-text>
          </v-card-text>
        </v-window-item>

        <v-window-item value="suspend">
          <v-card-text class="pt-0">
            <v-btn class="float-left" @click="access_window = 'main-menu'" variant="text" icon="mdi-arrow-left" />
            <v-card-title class="text-body-1">
              Suspend User
            </v-card-title>

            <v-card-text class="mt-4">
              <v-combobox v-model="suspension_mode" :items="suspension_types" label="Specify Reason (Required)"
                :rules="[$validator.required]" />

              <v-textarea rows="2" v-model="suspension_details" label="Explanation"
                messages="This will be shown to the suspended user upon login." />
              <br />
              <v-btn color="error" @click="suspend_user" block>Suspend</v-btn>
              <label class="mt-4 text-center d-block text-medium-emphasis">
                Suspending a user will cause them to temporarily lose access to their account and its associated
                systems.
              </label>
            </v-card-text>
          </v-card-text>
        </v-window-item>

        <v-window-item value="deactivate">
          <v-card-text class="pt-0">
            <v-btn class="float-left" @click="access_window = 'main-menu'" variant="text" icon="mdi-arrow-left" />
            <v-card-title class="text-body-1">
              Deactivate User
            </v-card-title>

            <v-card-text class="mt-4">
              <v-select v-model="deactivation_mode" :items="deactivation_types" label="Specify Reason (Required)"
                :rules="[$validator.required]" />

              <v-btn color="error" @click="deactivate_user" block>Deactivate</v-btn>

              <label class="mt-4 text-center d-block text-medium-emphasis">
                Deactivating a user will cause them to lose access to their account and its associated systems.
              </label>
            </v-card-text>
          </v-card-text>
        </v-window-item>

        <v-window-item value="reactivate">
          <v-card-text class="pt-0">
            <v-btn class="float-left" @click="access_window = 'main-menu'" variant="text" icon="mdi-arrow-left" />
            <v-card-title class="text-body-1">
              Reactivate User
            </v-card-title>
          </v-card-text>
        </v-window-item>
      </v-window>
    </commons-dialog>

    <lazy-pamphlets-pds v-model="pds_dialog" v-if="pds_dialog" :user="active_user._id" :readonly="true" width="960" />
    <layout-std-snackbar />
  </commons-item-container>
</template>

<script lang="ts" setup>
import { useSnackbar, useDomains, useLoader, useAPTs } from '~~/store';
import usePlantilla from "~~/store/plantilla";
import swal from "sweetalert";
const { $rest, $abbreviate } = useNuxtApp();

const apts = useAPTs();
const loader = useLoader();
const domains = useDomains();
const snackbar = useSnackbar();
const plantilla = usePlantilla();

definePageMeta({
  layout: "barren"
});

onBeforeMount(async () => {
  ready.value = false;
  await plantilla.fetch();
  await load_resources();
  get_employees();
  ready.value = true;
});

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

  apts.hydrate(apt_res.data, domain.value.access_policies);
  user_groups.value = user_group_res.data.map((v: any) => ({ title: v.name, value: v }));
}

async function get_employees() {
  const { data } = await $rest("hris/get-users", {
    method: "GET"
  });

  employees.value = data.map((v: any) => ({
    ...v,
    name: `${v.first_name} ${v.middle_name} ${v.last_name}`,
    office: $abbreviate(v.office),
    unit: $abbreviate(v.unit),
  }));
}

const ready = ref(false);
const search_str = ref("");
const employees = ref([]);
const active_user = ref(null as any);

const user_dialog = ref(false);
const access_window = ref('main-menu');
const record_dialog = ref(false);
const access_dialog = ref(false);
const pds_dialog = ref(false);

/* Invitation Form */
const valid_invitation = ref(false);
const invitation_form = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
  appellation: "",
  email: "",

  apts: [],
  group: "",
  designation: {
    office: null,
    unit: null,
    position: null
  }
} as any);
const suspension_mode = ref("");
const suspension_details = ref("");
const suspension_types = ref([
  "Suspicious Behavior",
] as string[]);
const deactivation_mode = ref("")
const deactivation_types = ref([
  "Resignation",
  "Transferred",
  "Retired",
  "Deceased",
  "Others"
]);
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
  swal({
    title: success ? "Success" : "Request Failed",
    icon: success ? "success" : "error",
    text: data || (error || "Failed to reach server"),
  });
}
function deactivate_user() {
  swal({
    icon: "warning",
    title: "Deactivate User",
    text: "are you sure you want to do this?",

    buttons: {
      cancel: true,
      deactivate: true
    }
  })
    .then(async () => {
      const { data, error } = await $rest("hris/deactivate-user", {
        method: "POST",
        body: {
          user_id: active_user.value._id,
          reason: deactivation_mode.value
        }
      })

      const success = Boolean(data);
      if (success) {
        deactivation_mode.value = "";
        get_employees();
        snackbar.success(data);
      }
      swal({
        title: success ? "Success" : "Request Failed",
        icon: success ? "success" : "error",
        text: data || (error || "Failed to reach server"),
      });
    });
}
function suspend_user() {
  swal({
    icon: "warning",
    title: "Suspend User",
    text: "are you sure you want to do this?",

    buttons: {
      cancel: true,
      deactivate: true
    }
  })
    .then(async () => {
      const { data, error } = await $rest("hris/suspend-user", {
        method: "POST",
        body: {
          user_id: active_user.value._id,
          reason: suspension_mode.value
        }
      })

      const success = Boolean(data);
      if (success) {
        suspension_mode.value = "";
        suspension_details.value = "";
        get_employees();
      }
      swal({
        title: success ? "Success" : "Request Failed",
        icon: success ? "success" : "error",
        text: data || (error || "Failed to reach server"),
      });

    });
}
const manage_account_options = ref([
  {
    title: "Review Activity Logs",
    icon: "mdi-format-list-checkbox",
    subtitle: "Review actions in chronological order.",
    window: "review-logs"
  }
]);
const valid_apts = computed(() => {
  return apts.get_items.filter((v: any) => !v.internal).map((v) => ({ title: v.name, value: v }));
});
function manage_user(user: any, type: string) {
  active_user.value = user;

  switch (type) {
    case "records": record_dialog.value = true; break;
    case "access": access_dialog.value = true; break;
    case "pds": pds_dialog.value = true; break;
  }
}

/* Utils and Headers */
const employee_headers = ref([
  {
    title: "Employee ID",
    key: "agency_id",
    width: 120
  },
  {
    title: "Name",
    key: "name",
    width: 200
  },
  {
    title: "Office",
    key: "office",
    width: 100
  },
  {
    title: "Unit",
    key: "unit",
    width: 100
  },
  {
    title: "Position",
    key: "position"
  },
  {
    title: "Civil Status",
    key: "personal_information.civil_status"
  },
  {
    title: "Status",
    key: "status"
  },
  {
    title: "Actions",
    key: "actions"
  }
].map((v) => ({
  ...v,
  sortable: false
})));
const header_grouping = ref([
  {
    key: "office"
  },
  {
    key: "unit"
  }
]);
const calced_employees = computed(() => {
  const temp = employees.value.filter((v: any) => {
    const { name, office, unit, position, agency_id } = v;

    const term = `${name} ${office} ${unit} ${position} ${agency_id}`.toLowerCase();
    return term.indexOf((search_str.value || "").toLowerCase()) !== -1;
  });
  return temp;
});

function get_status_color(status: string) {
  switch (status) {
    case "active": return "success";
    case "inactive": return "error";
    default: return ""
  }
}
</script>

<style scoped>
::v-deep(#employee-table th:not(:last-child)) {
  border-right: 1px solid lightgrey
}

::v-deep(#employee-table td:not(:last-child)) {
  border-right: 1px solid lightgrey
}

::v-deep(#employee-table .v-data-table-footer) {
  border-top: 1px solid lightgrey;
}
</style>