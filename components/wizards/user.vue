<template>
  <v-dialog v-bind="$attrs" v-on="$listeners">
    <v-card>
      <v-toolbar>
        User Wizard
        <v-spacer />
        <v-btn variant="plain" icon="mdi-close" @click="$emit('input', false)"/>
      </v-toolbar>

      
    </v-card>
  </v-dialog>
</template>