<template>
  <v-text-field 
    v-bind="$attrs"
    prepend-inner-icon="mdi-lock"
    :append-inner-icon="show_value ? 'mdi-eye-off' : 'mdi-eye'" 
    :type="show_value ? 'text' :   'password'"
    :rules="[
      $validator.required,
      $validator.min_password_length,
      $validator.has_number,
      $validator.has_lower_case,
      $validator.has_upper_case,
      $validator.has_special_char
    ]"
    :messages="['Requires at least 1 number, 1 lowercase & uppercase character, & 1 special character.']"
    @click:append-inner="show_value = !show_value"
  />
</template>

<script lang="ts" setup>
const show_value = ref(false);

function clear_error(){

}
</script>

