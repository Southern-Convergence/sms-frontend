<template>
  <v-row :class="$vuetify.display.mobile ? 'text-center' : ''" dense>
    <v-col cols="12">
      <h6 class="text-h5">Notification Settings</h6>
      <h6 class="text-subtitle-2 text-medium-emphasis">Review and configure how you receive notifications from our
        systems.
      </h6>
      <v-divider class="mt-4 mb-2"/>
    </v-col>

    <!-- <v-col cols="12">
      <v-layout class="py-4" d-flex>
        <v-text-field class="mr-2" v-model.number="notifications.ttl" label="TTL" type="number"/>
        <v-text-field v-model.number="notifications.delay" label="Delay" type="number" suffix="ms"/>
      </v-layout>
    </v-col> -->

    <v-col cols="12">
      <v-row dense>
        <v-col cols="12" v-for="sub, i in notifications.get_subscriptions" :key="sub.namespace">
          <v-list-item density="compact">
            <v-list-item-title class="text-h6 font-weight-medium pb-1">{{sub.title}}</v-list-item-title>
            <v-list-item-subtitle>{{sub.desc}}</v-list-item-subtitle>

            <template v-if="!$vuetify.display.mobile" v-slot:append>
              <v-layout class="d-block px-4">
                <v-switch class="mr-2 text-capitalize" v-for="channel in Object.entries(sub.channels)" :key="channel[0]"
                  :modelValue="channel[1]" :label="channel[0]"
                  @update:modelValue="(v)=> notifications.subscribe(sub.namespace, channel[0], Boolean(v))"
                  :loading="notifications.load_map[`${sub.namespace}-${channel[0]}`]"
                  :disabled="notifications.load_map[`${sub.namespace}-${channel[0]}`]" hide-details />
              </v-layout>
            </template>
          </v-list-item>

          <v-layout class="d-flex px-4" v-if="$vuetify.display.mobile">
            <v-spacer />
            <v-switch class="mr-2 text-capitalize" v-for="channel in Object.entries(sub.channels)" :key="channel[0]"
              :modelValue="channel[1]" :label="channel[0]"
              @update:modelValue="(v)=> notifications.subscribe(sub.namespace, channel[0], Boolean(v))"
              :loading="notifications.load_map[`${sub.namespace}-${channel[0]}`]"
              :disabled="notifications.load_map[`${sub.namespace}-${channel[0]}`]" hide-details />
            <v-spacer />
          </v-layout>

          <v-divider v-if="i !== notifications.get_subscriptions.length-1" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useNotifications } from '~/store/index';
definePageMeta({
  layout : "constrained",
});

const notifications = useNotifications();
</script>