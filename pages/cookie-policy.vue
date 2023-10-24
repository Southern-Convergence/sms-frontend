<template>
<!--   <commons-simple-form title="Create Subdomain" req="admin/object-authority/create-subdomain" :misc_data="{domain_id : '6480e3fab98f439120610c73'}" :before_submit="handle_before_submit">
    <v-text-field label="Name" name="name" />
    <v-textarea label="Description (Optional)" name="desc" />
  </commons-simple-form> -->
  Cookie Policy
</template>

<script lang="ts" setup>

function handle_before_submit(data : any){
  const { domain_id, name, desc } = data;

  return {
    domain_id,
    subdomain : { name, desc }
  }
}
</script>