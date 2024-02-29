<template>
  <v-row>

    <v-col cols="12" class="mx-auto">
      <v-card height="auto" color="indigo">
        <div class="d-flex flex-no-wrap justify-space-between  pl-4">
          <v-avatar class="py-3" size="128">
            <v-img src="/yanyan.jpg" />
          </v-avatar>
          <div>
            <h6 class="text-h6 font-weight-bold mt-4">
              {{ full_name }}
            </h6>

            <h6 class="text-subtitle-2"> {{ user.side }}</h6>
            <h6 class="text-subtitle-2"> {{ user.role }}</h6>

            <h6 class="font-italic text-blue"> <v-icon icon="mdi-gmail" size="small" color="red" />
              mariannemaepaclian@gamail.com</h6>
            <v-btn class="mx-0 px-0 mt-1 text-caption" variant="text" x-small density="compact"> <u>Edit Account
              </u></v-btn>
          </div>
          <v-spacer />

        </div>
        <v-divider />

        <v-sheet height="auto">
          <v-card-title> <v-icon class="pr-2">mdi-history</v-icon>Designation History</v-card-title>
          <v-divider />
          <v-card-text>
            <template v-slot:subtitle="{ subtitle }">
              <div v-html="subtitle"></div>
            </template>

            <v-list item-props="lines">
              <v-list-item v-for="item in items" :key="item.id">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>

        </v-sheet>


      </v-card>
    </v-col>

  </v-row>
</template>

<script lang="ts" setup>
import useNav from "~/store/nav";
definePageMeta({
  layout: "barren"
});
import useAuth from "~/store/auth";
const user = useAuth().user;

const items = ref([
  { id: 1, title: 'Regional Office  Recommending Approver', subtitle: '07/15/2022' },
  { id: 2, title: 'Regional Office  Approver', subtitle: '07/15/2024' },

]);
const full_name = computed(() => {
  const first_name = user.first_name;
  const middle_name = user.middle_name ? `${user.middle_name.charAt(0)}.` : '';
  const last_name = user.last_name;
  return `${first_name} ${middle_name} ${last_name}`;
});

const lines = ref(3);
</script>