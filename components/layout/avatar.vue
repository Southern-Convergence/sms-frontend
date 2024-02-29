<template>
  <v-avatar v-bind="$attrs" class="ml-2" color="primary" style="cursor : pointer" size="32">
    <span v-if="auth.pfp.type === 'placeholder'">{{ auth.pfp.ref }}</span>
    <v-img :src="auth.pfp.ref" v-else />
  </v-avatar>
</template>

<script lang="ts" setup>
import useAuth from "~/store/auth";

const auth = useAuth();
</script>