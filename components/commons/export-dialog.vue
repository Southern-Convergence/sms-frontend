<template>
  <commons-dialog v-model="value" :title="`Export ${name}`" persistent>
    <v-card-text class="pt-4">
      <v-row justify="center" align="start" dense>
        <!--Export Preview Panel-->
        <v-col cols="12" xxl="9" xl="9" lg="8" md="12">
          <v-sheet class="h-100 text-center" rounded="lg" border>
            <!--
              Weird Vuetify bug:
              show-select prop is not reactive.

              Temp Fix:
              2 copies of the table with the other one having the prop set to true. soooo bad.
            -->
            <v-data-table id="preview-table" v-model="selected_rows" :headers="table_headers"
              v-if="selected_record_inclusion_mode === 'Range'" :items="table_items" :options.sync="table_options"
              density="compact">

              <template v-for="header in built_headers" :key="header.key" #[`column.${header.key}`]>
                <h6 class="text-center font-weight-bold text-body-2">{{ header.key }}</h6>
              </template>

              <template v-for="header in built_headers" :key="header.key" #[`item.${header.key}`]="{ item }">

                <v-chip v-if="item.value[header.key].type === 'array'" label outlined>
                  <v-icon>mdi-code-brackets</v-icon>
                  Truncated Array...
                </v-chip>
                <v-chip v-else-if="item.value[header.key].type === 'object'" label outlined>
                  <v-icon>mdi-code-json</v-icon>
                  Truncated Object...
                </v-chip>
                <span v-else>
                  {{ item.value[header.key].value }}
                </span>
              </template>
            </v-data-table>

            <v-data-table id="preview-table" v-model="selected_rows" :headers="table_headers" v-else :items="table_items"
              :options.sync="table_options" item-key="index" density="compact" show-select>

              <template v-for="header in built_headers" :key="header.key" #[`column.${header.key}`]>
                <h6 class="text-center font-weight-bold text-body-2">{{ header.key }}</h6>
              </template>

              <template v-for="header in built_headers" :key="header.key" #[`item.${header.key}`]="{ item }">

                <v-chip v-if="item.value[header.key].type === 'array'" label outlined>
                  <v-icon>mdi-code-brackets</v-icon>
                  Truncated Array...
                </v-chip>
                <v-chip v-else-if="item.value[header.key].type === 'object'" label outlined>
                  <v-icon>mdi-code-json</v-icon>
                  Truncated Object...
                </v-chip>
                <span v-else>
                  {{ item.value[header.key].value }}
                </span>
              </template>
            </v-data-table>
          </v-sheet>
        </v-col>

        <!--Export Options Panel-->
        <v-col cols="12" xxl="3" xl="3" lg="4" md="12">
          <v-card class="h-100" rounded="lg" border>
            <v-card-title class="text-center text-body-1 py-2">Export Options</v-card-title>

            <v-card-text>
              <v-expansion-panels v-model="options_state" accordion mandatory>

                <!--Field Inclusion-->
                <v-expansion-panel>
                  <v-expansion-panel-title class="pl-0">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon class="mr-2">mdi-table-column-width</v-icon>
                      </template>
                      <v-list-item-title>Field Inclusion</v-list-item-title>
                      <v-list-item-subtitle>Selectively include fields for export.</v-list-item-subtitle>
                    </v-list-item>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text>
                    <v-select v-model="selected_fields" :items="fields" label="Selected Fields" multiple hide-details>
                      <template v-slot:selection="{ item, index }">
                        <v-chip class="ma-1" v-if="index < 6" variant="outlined" label small>{{ item.title }}</v-chip>
                        <span v-if="index === 6">
                          (+{{ selected_fields.length - 6 }} fields)
                        </span>
                      </template>
                    </v-select>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <!--Record Inclusion-->
                <v-expansion-panel>
                  <v-expansion-panel-title class="pl-0">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon class="mr-2">mdi-format-list-group</v-icon>
                      </template>
                      <v-list-item-title>Record Inclusion</v-list-item-title>
                      <v-list-item-subtitle>Selectively include records for export.</v-list-item-subtitle>
                    </v-list-item>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text class="px-0">
                    <v-select v-model="selected_record_inclusion_mode" :items="record_inclusion_modes" hide-details>
                      <template v-slot:selection="{ item }">
                        <v-list-item class="pa-0">
                          <template v-slot:prepend>
                            <v-icon class="mr-2" size="24">{{ item.raw.icon }}</v-icon>
                          </template>
                          <v-list-item-title>{{ item.raw.title }}</v-list-item-title>
                          <v-list-item-subtitle>{{ item.raw.subtitle }}</v-list-item-subtitle>
                        </v-list-item>
                      </template>
                    </v-select>

                    <v-layout class="px-8 pt-4" style="align-items : center"
                      v-if="selected_record_inclusion_mode === 'Range'" d-flex>
                      <v-text-field class="centered-input" v-model.number="range_from" label="From" type="number"
                        @input="verify_from" dense hide-details outlined />
                      <v-spacer />
                      <v-icon class="mx-6">mdi-arrow-expand-right</v-icon>
                      <v-spacer />
                      <v-text-field class="centered-input" v-model.number="range_to" label="To" type="number"
                        @input="verify_to" dense hide-details outlined />
                    </v-layout>
                  </v-expansion-panel-text>
                </v-expansion-panel>

              </v-expansion-panels>
            </v-card-text>

            <!--Export Options and Information-->
            <v-card-text>
              <v-layout style="align-items : center" d-flex>
                <v-chip class="text-caption mr-2" variant="outlined" label pill>
                  <b>{{ selected_rows.length }} Entr{{ selected_rows.length > 1 ? "ies" : "y" }}</b>
                </v-chip>

                <v-spacer />

                <v-btn class="text-body-2 pl-3 pr-1" color="success" @click="export_entries" size="small">
                  {{ export_formats[export_format].title }}

                  <v-menu transition="fade-transition" location="bottom center">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" size="x-small" :ripple="false" variant="text" icon>
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>

                    <v-card max-width="375" border>
                      <v-card-title class="text-body-1">Select Export Format</v-card-title>
                      <v-divider />
                      <v-card-text class="">
                        <v-list class="py-0" density="compact">
                          <v-list-item-group v-model="export_format" color="primary">
                            <v-list-item v-for="item, i in export_formats" :key="item.icon" style="white-space : normal"
                              :title="item.title" :subtitle="item.subtitle" :active="i === export_format" color="primary"
                              rounded="lg" @click="export_format = i">
                              <template v-slot:prepend>
                                <v-icon class="mr-2">{{ item.icon }}</v-icon>
                              </template>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-menu>
                </v-btn>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </commons-dialog>
</template>

<script lang="ts" setup>
import exportFromJson from "export-from-json";

defineEmits(["update:modelValue"]);

type ExportProps = {
  name?  : string;
  items  : any[];
  value? : boolean;
}

const { items, name, value } = withDefaults(defineProps<ExportProps>(), {
  name: "",
});



//Preview Table Options:
const options_state = ref(0);
const table_options = ref({
  page: 1,
  itemsPerPage: 10
});

const export_format = ref(2);
const export_formats = [
  { title: "Export as JSON", subtitle: "Convert data to Serialized JSON Array", icon: "mdi-code-json", type: "json" },
  { title: "Export as XML", subtitle: "Convert data to XML File", icon: "mdi-xml", type: "xml" },
  { title: "Export as Excel", subtitle: "Convert data to Excel File", icon: "mdi-file-excel", type: "xls" },
  { title: "Export as CSV", subtitle: "Convert data to delimited File", icon: "mdi-file-delimited", type: "csv" },
  { title: "Export as HTML", subtitle: "Convert data to HTML File", icon: "mdi-language-html5", type: "html" },
  { title: "Export as Text", subtitle: "Convert data to Plain Text File", icon: "mdi-file-document", type: "txt" },
];

const selected_record_inclusion_mode = ref("Range");
const record_inclusion_modes = ref([
  {
    icon: "mdi-gesture-tap",
    title: "Manual",
    subtitle: "Manually select records from the table."
  },
  {
    icon: "mdi-arrow-expand-right",
    title: "Range",
    subtitle: "Select by specifying a range of documents."
  },
]);
const range_from = ref(1);
const range_to = ref(1);
const selected_rows = ref([]);


const selected_fields = ref([] as string[]);
const fields = computed(() => built_headers.value.map((v) => v.key));

//Table Values
const table_headers = computed(() => built_headers.value.filter(({ key }) => selected_fields.value.includes(key)));
const table_items = computed(() => built_items.value.map((v) => {
  let result = Object.entries(v).filter(([k]) => selected_fields.value.includes(k));

  return { ...Object.fromEntries(result), index: v.index };
}));


/*
Common Utility Fns. Hands off! 

Builds headers from the provided data props...
It iterates over each element, pulls its keys,
Then feeds it into an instance of Set where its
Passed unto Array.from static method.
Thereby producing an array of all possible headers derived from the input array.
*/

const built_headers = computed(() => {
  let header_set = new Set<string>(items.reduce((t, v) => t.concat(Object.keys(v)), []));
  return Array.from(header_set).map((key) => ({ title: key, key, align: "center", divider: true }));
})

const built_items = computed(() => {
  return items.map((v, index) => {
    const result = Object.fromEntries(table_headers.value.map(({ key }) => {
      const temp = v[key];

      //Meta is a custom property used by build items.
      //It allows the object navigator to distinguish between iterable array and iterable object.
      const is_array = Array.isArray(temp);
      let type = is_array ? 'array' : typeof temp;
      const iterable = type === "array" || type === "object";

      return [key, { value: temp || "", iterable, type }];
    }));

    return { ...result, index };
  })
});

//Record Inclusion Methods
function verify_from() {
  nextTick(() => {
    const num = range_from.value;
    if (num < 1) range_from.value = 1;
    else if (num > range_to.value) range_from.value = range_to.value;

    select_range();
  })
}

function verify_to() {
  const num = range_to.value;
  if (num === 0 || num < range_from.value) range_to.value = range_from.value;
  else if (num > built_items.value.length) range_to.value = built_items.value.length;
  select_range();
}

function select_range() {
  const min = range_from.value;
  const max = range_to.value;
  /* @ts-ignore */
  selected_rows.value = table_items.value.slice(min - 1, max);
}


function export_entries() {
  const { type } = export_formats[export_format.value];

  /* @ts-ignore */
  let data = selected_rows.value.map((v) => Object.fromEntries(Object.entries(v).filter(([k]) => k !== "index").map(([k, v]) => [k, v.value])));
  /* @ts-ignore */
  exportFromJson({ data, fileName: `${name || "entries"}-${new Date().toDateString()}`, exportType: type });
}

onBeforeMount(() => {
  if (items) {
    selected_fields.value = fields.value;
    /* @ts-ignore */
    selected_rows.value = table_items.value;
    range_from.value = 1;
    range_to.value = built_items.value.length;
  } else {
    selected_fields.value = [];
    selected_rows.value = [];

    range_from.value = 0;
    range_to.value = 0;

    /* Revert to default control state */
    selected_record_inclusion_mode.value = "Range";
    options_state.value = 0;
    export_format.value = 2;
  }
})
</script>

<style scoped>
::v-deep(#preview-table .v-data-table-header__content) {
  place-content: center
}

::v-deep(#preview-table th, .v-data-table__td) {
  border-right: 1px solid lightgrey
}

::v-deep(#preview-table td) {
  border-right: 1px solid lightgrey
}

::v-deep(#preview-table) {
  border-collapse: collapse
}

::v-deep(.v-expansion-panel-text__wrapper) {
  padding-inline: 8px;
}
</style>