<!-- Developer Note -->

<!--
  BUG: v-file-input only returns the filename prefixed with fakepath.
-->

<template>
  <div>
    <v-form v-model="valid_form" ref="form" @submit.prevent="attempt_submit" :disabled="res_load">
      <v-card :loading="res_load" rounded="lg">
        <v-toolbar color="primary" v-if="!$attrs['hide-toolbar']" dark>
          <v-list-item class="pl-2" density="compact" :title="title">
            <template v-if="icon" v-slot:prepend>
              <v-icon :icon="icon" dark />
            </template>
            <v-list-item-subtitle v-if="subtitle">{{ subtitle }}</v-list-item-subtitle>
          </v-list-item>
        </v-toolbar>

        <v-card-text id="form-body">
          <slot name="default" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-item-group>
            <v-btn class="text-body-1" variant="text" color="warning" :disabled="res_load" type="reset">Clear</v-btn>

            <v-btn class="text-body-1" variant="outlined" color="primary" type="submit" :loading="res_load"
              :disabled="!req || !valid_form">
              Submit
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
          </v-item-group>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import swal from 'sweetalert';

const emits = defineEmits([
  "success"
])

//An idea from: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements#accessing_form_controls 
type FormProps = {
  title     : string,                                        //Title of the containing card
  subtitle? : string,                                        //Subtitle of the containing card
  icon?     : string,                                        //Icon of the containing card
  req       : string,                                        //POST Endpoint to send the parsed request body. disables the submit button if blank

  misc_data?        : { [key: string]: any },
  before_submit?    : (data: { [key: string]: any }) => any,

  confirm_title?    : string,                                    //Confirmation Title, No confirmation is shown if blank
  confirm_subtitle? : string,                                    //Confirmation Subtitle
  confirm_danger?   : boolean,                                   //Confirmation dialog is set to dangerMode(Swal prop)
  confirm_type?     : ("success" | "warning" | "info" | "error") 
}
const props = withDefaults(defineProps<FormProps>(), {
  title    : "Form Title",
  subtitle : "",
  icon     : "",
  type     : "info",
  req      : "",

  before_submit : (data : any)=> data,
  misc_data : null,
  
  confirm_title    : "",
  confirm_subtitle : "",
  confirm_danger   : false,
  confirm_type     : "info"
});

const { title, subtitle, icon, req, misc_data } = props;

const { $rest } = useNuxtApp();


const valid_form = ref(false);

/* Request Submission */
function attempt_submit(form : SubmitEvent){
  /* @ts-ignore */
  const target = form.currentTarget as any[];
    //For some reason, raw refs does not play nice with ES6 Functions...
  let result: { [key: string]: any } = {};
  for (const { name, value, type, checked, nodeName } of target) {
    if (type === "checkbox") {
      result[name] = checked;
      continue;
    }
    if (nodeName === "INPUT" || nodeName === "TEXTAREA") result[name] = value;
  }

  if(props.confirm_title){
    swal({
      title : props.confirm_title,
      text  : props.confirm_subtitle,
      icon  : props.confirm_type,
      
      buttons    : ["Cancel", "Submit"],
      dangerMode : props.confirm_danger,
    })
    .then((r)=> {
      if(r)submit(result);
    });
  }else{
    submit(result);
  }
}

async function submit(form_body: any) {
  if(misc_data){
    form_body = {
      ...form_body,
      ...misc_data
    }
  }
  const body = props.before_submit ? props.before_submit(form_body) : form_body;
  const { data, error } = await $rest(req, {
    method: "POST",
    body
  });

  const success = Boolean(data);

  if(success){
    emits("success");
  }

  swal({
    title   : success ? "Success" : "Request Failed",
    icon    : success ? "success" : "error",
    text    : data || (error || "Failed to reach server"),
  })
}
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>