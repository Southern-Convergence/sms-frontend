<!-- 
  Note:
  Component will require having an _id property within each object to function properly.
  Also, $attrs are bound to item-groups, even though it may not seem like it.

  Oh another one, Having a "hide" property will cause an element to not render
-->

<template>
  <v-sheet id="item-container" class="h-100 d-block" color="transparent" border>
    <v-toolbar class="d-block border-b" extension-height="64" :extended="Boolean($attrs.extended)">

      <v-toolbar-title>
        <v-list-item class="pl-0" :title="title" :subtitle="subtitle">
          <template v-if="$attrs.icon || $attrs.img" v-slot:prepend>
            <v-icon v-if="$attrs.icon" color="primary" size="28" :icon="icon" />
            <img class="pr-3" v-else-if="Boolean($attrs.img)" height="28" :src="String($attrs.img)" />
          </template>
        </v-list-item>
      </v-toolbar-title>

      <template v-if="$attrs.extended === ''" v-slot:extension>
        <v-divider />
        <v-sheet class="pa-1" min-height="64">
          <slot name="extension" />
        </v-sheet>
      </template>

      <v-toolbar-items>
        <v-btn-toggle v-model="display_mode" style="align-self: center" dense mandatory>
          <v-tooltip v-for="display_type, i in display_types" :key="i" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="text" color="primary" :icon="`mdi-${display_type_props[display_type]}`" />
            </template>
            <span class="text-capitalize">{{ display_type }}</span>
          </v-tooltip>
        </v-btn-toggle>
      </v-toolbar-items>
    </v-toolbar>

    <slot name="prepend-body" />

    <v-sheet :height="Number($attrs.height)" :max-height="Number($attrs['max-height'])" style="overflow-y : auto">
      <v-card-text>
        <v-row v-if="!items.length && $attrs['display-type'] !== 'table'" justify="center" align="center" dense>
          No Item Found
        </v-row>

        <v-row class="h-100" dense>
          <v-col v-if="display_type === 'table'">
            <!--
            Slot for table was preferred instead of passing props from this component to a nested table to allow
            for customization of the table (slots, events, etc.)
          -->
            <slot name="table" :items="items" :headers="$attrs.headers" />
          </v-col>

          <v-col v-else>
            <v-item-group v-bind="$attrs" multiple>
              <v-row dense>
                <v-col v-for="item, i in items" :key="item._id" :cols="cols.default" :xl="cols.xl" :lg="cols.lg"
                  :md="cols.md" :sm="cols.sm" v-show="!item.hide">
                  <v-item v-slot="{ isSelected, toggle }" :value="item._id">
                    <slot name="item" :value="item" :index="i" :display="display_type" :toggle="toggle"
                      :isSelected="isSelected" />
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </v-col>
        </v-row>
      </v-card-text>
    </v-sheet>

    <slot name="default" />
  </v-sheet>
</template>

<script lang="ts">

export default {
  props : {
    title : {
      type : String,
      required : false,
      default : ""
    },
    subtitle : {
      type : String,
      required : false,
      default : ""
    },
    icon : {
      type : String,
      required : false,
      default : ""
    },
    items : {
      type     : Array,
      required : false,
      default  : []
    },

    loading : {
      type     : Boolean,
      required : false,
      default  : false
    },

    display: {
      type: Number,
      required: false,
      default: 0
    },
    display_types: {
      type: Array<String>,
      required: false,
      default: () => ["list"],
    }
  },

  beforeMount() {
    this.display_mode = this.display;
  },

  data() {
    return {
      display_mode: 0,
      display_type_props : {
        "table": "table",
        "grid" : "view-grid",
        "list" : "view-list",
      },

      selected : []
    }
  },

  methods : {
  },

  computed : {
    display_type() {
      return this.display_types[this.display_mode];
    },
    cols() {
      if (this.display_type === "table") {
        return {
          default: 12,
          xl: 12,
          lg: 12,
          md: 12,
          sm: 12,
        };
      }

      const grid = this.display_type === "grid";
      return {
        default: grid ? 12 : 12,
        xl: grid ? 4 : 12,
        lg: grid ? 4 : 12,
        md: grid ? 6 : 12,
        sm: grid ? 12 : 12,
      };
    }
  }
}
</script>

<style scoped>
::v-deep(.v-toolbar__extension) {
  display: block
}
</style>