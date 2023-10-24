<template>
  <v-row dense>
    <v-col cols="12">
      <h6 class="text-h5">Security</h6>
      <h6 class="text-subtitle-2 text-medium-emphasis">Manage and Evaluate security-related account settings.
      </h6>
      <v-divider class="mt-4 mb-2" />
    </v-col>

    <v-col cols="12" xl="5" lg="5">
      <v-list class="py-0">
        <v-list-item class="px-0 pt-0">
          <v-card class="px-2 pb-2" elevation="2" rounded="lg" color="primary" border>
            <v-list-item lines="two" style="white-space : normal">
              <v-list-item-title>
                Credentials
                <v-icon class="float-right" size="28">mdi-shield-key</v-icon>
              </v-list-item-title>
              <v-list-item-subtitle class="pb-4">Update or review your existing credentials.</v-list-item-subtitle>

              <v-list-item-action class="float-right">
                <v-btn class="mr-2" size="small" variant="outlined" @click="review_user_info_dialog = true">User
                  ID</v-btn>
                <v-btn size="small" variant="outlined" @click="review_password_dialog = true">Passwords</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </v-list-item>
        <v-list-item class="px-0">
          <v-card class="px-2 pb-2" elevation="2" rounded="lg" color="primary" border>
            <v-list-item lines="two" style="white-space : normal">
              <v-list-item-title>
                Authentication Methods
                <v-icon class="float-right" size="28">mdi-two-factor-authentication</v-icon>
              </v-list-item-title>
              <v-list-item-subtitle class="pb-4">Select your preferred secondary authentication
                method.</v-list-item-subtitle>


              <v-menu v-model="auth_info_menu" :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                  <v-btn class="pa-0" size="small" variant="text" v-bind="props">
                    <v-icon>mdi-help-circle</v-icon>
                  </v-btn>
                </template>

                <v-card class="mx-auto" max-width="344">
                  <v-card-text>
                    <p class="text-h6 text--primary">Multi-Factor Authentication</p>

                    <div class="text--primary">
                      Is a security measure which requires users to provide 2 or more forms of identification before
                      gaining
                      formal access to our systems.
                    </div>
                  </v-card-text>

                  <v-card-text>
                    We <text class="text-warning">highly recommend</text> setting this up due to the sensitive nature of
                    HRIS's ESS(Employee Self-Service) Functionality.
                  </v-card-text>
                  <v-card-actions class="float-right">
                    <v-btn variant="text" color="primary">
                      <a href="https://en.wikipedia.org/wiki/Multi-factor_authentication" target="_blank">
                        Learn More
                      </a>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
              <v-list-item-action class="float-right">
                <v-btn size="small" variant="outlined" @click="review_auth_dialog = true">Review</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </v-list-item>
        <v-list-item class="px-0">
          <v-card class="px-2 pb-2" elevation="2" rounded="lg" color="primary" border>
            <v-list-item lines="two" style="white-space : normal">
              <v-list-item-title>
                Access Logs
                <v-icon class="float-right" size="28">mdi-book-search</v-icon>
              </v-list-item-title>
              <v-list-item-subtitle class="pb-4">Review recent actions.</v-list-item-subtitle>

              <v-list-item-action class="float-right">
                <v-btn size="small" variant="outlined" @click="review_access_logs_dialog = true">Review</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </v-list-item>
      </v-list>
    </v-col>

    <v-col cols="12" xl="5" lg="6">
      <v-sheet class="px-6 pt-6" rounded="lg" border>
        <h6 class="text-h6">Active Sessions</h6>
        <small class="text-subtitle-2 text-medium-emphasis">You are currently logged in from the following
          devices.</small>

        <v-list-item class="px-0 mt-4" v-for="(item, i) in sessions.slice(0, 2)" :key="i" :value="i"
          active-color="primary" rounded="sm">
          <template v-slot:prepend>
            <v-icon class="mr-3" :icon="item.icon" size="32" />
          </template>

          <v-list-item-title class="text-body-2">{{item.browser}} on {{item.os}} {{item.current ? "(This Session)" :
            "" }}</v-list-item-title>
          <v-list-item-subtitle class="text-subtitle-2">{{item.last_access}}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item class="px-0 mt-2 text-blue-darken-4 text-subtitle-2" v-if="sessions.length > 2">
          And {{ sessions.length - 2 }} Other Session{{ (sessions.length - 2) > 1 ? "s" : ""}}
        </v-list-item>

        <v-divider class="mt-3" />

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" variant="text" :ripple="false" @click="manage_session_dialog = true">
            Manage Sessions
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-sheet>
    </v-col>

    <!--Dialogs-->

    <v-dialog v-model="review_user_info_dialog" max-width="420">
      <v-card class="px-2 py-4" elevation="2" rounded="lg">
        <v-card-title class="text-center pb-0">Update User ID</v-card-title>

        <v-form v-model="allow_user_id_update" @submit.prevent="update_user_id">
          <v-card-text>
            <v-text-field class="mb-2" v-model="update_user_id_form.username" label="Username" :placeholder="current_values.username" :rules="[$validator.required]"
              prepend-inner-icon="mdi-account" />
            <v-text-field v-model="update_user_id_form.email" label="E-mail"
              :rules="[$validator.required, $validator.email]" :placeholder="current_values.email" prepend-inner-icon="mdi-email" />
            <br />
            <v-btn color="primary" type="submit" :disabled="!allow_user_id_update" block>Submit</v-btn>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="review_password_dialog" max-width="480">
      <v-card class="px-2 py-4" elevation="2" rounded="lg">
        <v-card-title class="text-center pb-0">Update Password</v-card-title>
        <v-card-subtitle class="text-center text-subtitle-2 px-12" style="white-space : normal">A strong password is
          important to guard against common security attacks.</v-card-subtitle>


        <v-form v-model="allow_password_update" @submit.prevent="update_password">
          <v-card-text>
            <commons-stronk-password v-model="update_password_form.old_password" label="Old Password"
              :rules="[$validator.required]" hide-details />

            <commons-stronk-password class="my-4" v-model="update_password_form.new_password" label="New Password" />

            <commons-stronk-password v-model="update_password_form.confirm_new_password" label="Confirm New Password"
              :rules="[$validator.required]" hide-details />
            <br />

            <v-btn color="primary" :disabled="!valid_password_form" type="submit" block>Submit</v-btn>

            <br />
          </v-card-text>
        </v-form>

        <v-card-subtitle class="text-center font-weight-bold">Available Resources</v-card-subtitle>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel rounded="lg">
              <v-expansion-panel-title expand-icon="mdi-eye" collapse-icon="mdi-eye-off">
                <v-list-item class="px-0" lines="two" title="Erwin's Credential Guide for the Digital Age">
                  <v-list-item-subtitle>
                    Erwin Lorenzo Uy<br />
                    <small class="font-weight-bold">Chief Security Officer</small>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                Cognizant of common data-security incidents and industry best-practices,
                this curated guideline from <text class="text-blue-darken-4">Southern Convergence</text> equips users
                with the necessary information to create
                sufficiently strong credentials.

                <br />
                <br />

                <v-btn class="float-right" size="small" variant="outlined" color="primary">View as PDF</v-btn>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="review_auth_dialog" width="480">
      <v-card class="px-2 py-4" elevation="2" rounded="lg" min-height="400">
        <v-card-title class="text-center pb-0">Authentication Methods</v-card-title>
        <v-card-subtitle class="text-center text-subtitle-2 px-8" style="white-space : normal">
          Multi-factor authentication provides an additional layer of security to our systems by requiring 2 or more
          security checks.
        </v-card-subtitle>
        <v-card-text>

          <v-row dense>
            <v-col cols="12">
              <v-card elevation="2" rounded="lg" border>
                <v-card-title>
                  <v-list-item class="px-0">
                    <v-list-item-title>Knowledge Factor</v-list-item-title>
                    <v-list-item-subtitle>Something that <b>you know.</b></v-list-item-subtitle>

                    <template v-slot:append>
                      <v-switch v-model="knowledge_factor" hide-details />
                    </template>
                  </v-list-item>
                </v-card-title>
                <v-expand-transition>
                  <v-card-text v-show="knowledge_factor">
                    <v-divider class="mb-2" />

                    <v-list>
                      <v-list-item class="pa-4 my-1" lines="two" v-for="factor in knowledge_factors" :key="factor.title"
                        :title="factor.title" :subtitle="factor.subtitle" rounded="lg" border>
                        <template v-slot:append>
                          <v-btn size="large" variant="plain" icon="mdi-chevron-right"></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-expand-transition>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card elevation="2" rounded="lg" border>
                <v-card-title>
                  <v-list-item class="px-0">
                    <v-list-item-title>Possession Factor</v-list-item-title>
                    <v-list-item-subtitle>Something that <b>you have.</b></v-list-item-subtitle>

                    <template v-slot:append>
                      <v-switch v-model="possession_factor" hide-details />
                    </template>
                  </v-list-item>
                </v-card-title>
                <v-expand-transition>
                  <v-card-text v-show="possession_factor">
                    <v-divider class="mb-2" />

                    <v-list>
                      <v-list-item class="pa-4 my-1" lines="two" v-for="factor in possession_factors" :key="factor.title"
                        :title="factor.title" :subtitle="factor.subtitle" rounded="lg" border>
                        <template v-slot:append>
                          <v-btn size="large" variant="plain" icon="mdi-chevron-right"></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-expand-transition>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card elevation="2" rounded="lg" border>
                <v-card-title>
                  <v-list-item class="px-0">
                    <v-list-item-title>Inherent Factor</v-list-item-title>
                    <v-list-item-subtitle>Something that <b>you are.</b></v-list-item-subtitle>

                    <template v-slot:append>
                      <v-switch v-model="inherent_factor" hide-details />
                    </template>
                  </v-list-item>
                </v-card-title>
                <v-expand-transition>
                  <v-card-text v-show="inherent_factor">
                    <v-divider class="mb-2" />

                    <v-list>
                      <v-list-item class="pa-4 my-1" lines="two" v-for="factor in inherent_factors" :key="factor.title"
                        :title="factor.title" :subtitle="factor.subtitle" rounded="lg" border>
                        <template v-slot:append>
                          <v-btn size="large" variant="plain" icon="mdi-chevron-right"></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <br />

        <v-card-subtitle class="text-center font-weight-bold">Available Resources</v-card-subtitle>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel rounded="lg">
              <v-expansion-panel-title expand-icon="mdi-eye" collapse-icon="mdi-eye-off">
                <v-list-item class="px-0" lines="two" title="Erwin's MFA Guide for Dummies.">
                  <v-list-item-subtitle>
                    Erwin Lorenzo Uy<br />
                    <small class="font-weight-bold">Chief Security Officer</small>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                We present to you a culmination of erwin's years worth of effort and dedication
                to produce this highly-acclaimed introductory book about Multi-Factor Authentications
                full of bite-sized, intuitive examples, practical applications and even historical trivias,
                all condensed into a single, easy-to-digest handbook.

                <br />
                <br />

                <v-btn class="float-right" size="small" variant="outlined" color="primary">View as PDF</v-btn>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="review_access_logs_dialog" max-width="800">
      <v-card class="px-2 py-4" elevation="2" rounded="lg" min-height="400">
        <v-card-title class="text-center pb-0">Access Logs</v-card-title>
        <v-card-subtitle class="text-center text-subtitle-2 px-8" style="white-space : normal">
          Recent access logs
        </v-card-subtitle>
        <v-card-text>
          <v-sheet rounded="lg" border>
            <v-data-table v-model.expanded="expanded_logs" :headers="data_log_headers" :items="data_logs"
              item-value="nature" show-expand>
              <template v-slot:expanded-row>
                <v-sheet width="500">
                  <v-card-text>
                    <h6 class="text-body-1">Timestamp:</h6>
                    <h6 class="text-body-1">IP Address:</h6>
                    <h6 class="text-body-1">Country:</h6>
                    <h6 class="text-body-1">Access Policy:</h6>
                    <h6 class="text-body-1">Access Template:</h6>
                    <h6 class="text-body-1">Access Variables:</h6>
                  </v-card-text>
                  <v-divider />
                </v-sheet>
              </template>
            </v-data-table>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="manage_session_dialog" width="450">
      <v-card class="h-100" rounded="lg" min-height="400" border>
        <v-card-title class="text-center pb-0">Session Management</v-card-title>
        <v-card-subtitle class="text-center text-subtitle-2">Manage ongoing sessions.</v-card-subtitle>

        <v-card-text>
          <v-expansion-panels variant="accordion" mandatory>
            <v-expansion-panel v-for="(item, i) in sessions" :key="i">
              <v-expansion-panel-title>
                <v-list-item class="px-0" rounded="lg">
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon" size="32" />
                  </template>

                  <v-list-item-title class="text-body-2">{{item.browser}} on {{item.os}} {{item.current ? "(This Session)"
                    :
                    "" }}</v-list-item-title>
                  <v-list-item-subtitle class="text-subtitle-2">{{item.last_access}}</v-list-item-subtitle>
                </v-list-item>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-row dense>
                  <v-col cols="12">
                    <v-card rounded="lg" border>
                      <v-card-title class="text-body-1">Access Information</v-card-title>
                      <v-divider />
                      <v-card-text class="text-caption">
                        IP Address: {{ item.ip }}
                        <br />
                        Location: Unavailable
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12">
                    <v-card rounded="lg" border>
                      <v-card-title class="text-body-1">Device Information</v-card-title>
                      <v-divider />
                      <v-card-text class="text-caption">
                        Browser: {{ item.browser }}
                        <br />
                        Operating System: {{ item.os }}
                        <br />
                        Device Name: {{ item.device }}
                        <br />
                        CPU Architecture: {{ item.arch }}
                        <br />
                        SID: {{ item.sid }}
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-card-actions class="float-right mt-2" v-if="!item.current">
                  <v-btn @click="terminate_dialog(item.sid)" variant="plain" color="red">
                    Terminate
                  </v-btn>
                </v-card-actions>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>

        <v-card-actions>
          <v-alert density="compact" variant="tonal" type="info" class="text-center text-subtitle-2">
            Session information may or may not be accurate.
          </v-alert>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts" setup>
/*
  Note: Credential Management will be implemented with 2FA as a required verification process,
  however this will be deferred due to time constraints.
*/
import swal from "sweetalert";
import { useLoader } from "~~/store";
import useAuth from "~/store/auth";
const { $rest } = useNuxtApp();

const loader = useLoader();
const auth = useAuth();
const router = useRouter();

definePageMeta({
  layout : "constrained",
});

onMounted(()=> {
  current_values.value.username = auth.user.username;
  current_values.value.email    = auth.user.email;
  fetch_sessions();
});

const session_termination = ()=> swal({
  title : "Confirm Action",
  text  : "You will be forcibly logged out of your current session.",
  icon  : "warning",
  /* @ts-ignore */
  buttons : true
});

let review_password_dialog = ref(false);
let allow_password_update  = ref(false);
const update_password_form = ref({
  old_password : "",

  new_password         : "",
  confirm_new_password : ""
});

async function update_password(){
  const v = await session_termination();
  
  if(v){
    const { old_password, new_password } = update_password_form.value;
    const { data, error } = await $rest("auth/update-credentials", { method : "POST", body : { old_password, new_password }});
    const res = swal({ icon : error ? "error" : "success", title : data || error, buttons : {ok :true}});
    if(!error)res.then(()=> {
      auth.logout();
      router.replace({name : "index"});
    });
  }
}
const valid_password_form = computed(()=> {
  const { new_password, confirm_new_password } = update_password_form.value;
  return allow_password_update.value && new_password === confirm_new_password;
})

let review_user_info_dialog = ref(false);
let allow_user_id_update    = ref(false);
const current_values        = ref({
  username : "",
  email    : ""
});
const update_user_id_form = ref({
  username : "",
  email    : ""
});


async function update_user_id(){
  const v = await session_termination();
  if(v){
    const { username, email } = update_user_id_form.value;
    const { data, error } = await $rest("auth/update-user-id", { method : "POST", body : { username, email }});
    const res = swal({ icon : error ? "error" : "success", title : data || error, buttons : {ok :true}})
    if(!error)res.then(()=> {
      auth.logout();
      router.replace({name : "index"});
    });
  }
}




let auth_info_menu            = ref(false);
let review_auth_dialog        = ref(false);
let review_access_logs_dialog = ref(false);


let data_log_headers = ref([
  { title : "Nature", key : "nature" },
  { title : "Date", key : "date" },
  { title : "Resource", key : "requested_resource" },
  { title : "Decision", key : "request_decision" },
  { title : "Justification", key : "request_justification"}
]);

let data_logs = ref([
  { nature : "Session In", date   : "12/25/2022" },
  {
    nature                : "Access Request",
    date                  : "12/25/2022",
    requested_resource    : "[REST:GET]api/pshrms/get-offices",
    request_decision      : "Allow",
    request_justification : ""
  },
  { nature : "Session Out", date   : "12/25/2022" }
]);

//auth_methods
let knowledge_factor  = ref(false);
let possession_factor = ref(false);
let inherent_factor   = ref(false);

const knowledge_factors = ref([
  { title : "Security PIN", subtitle : "A short 5-digit number is used to verify identity." },
  { title : "Security Pattern", subtitle : "A user-defined pattern on a 3x3 grid is used to verify identity."},
  { title : "Passphrase", subtitle : "A sentence-like string of words composed of at least 15 characters."},
  { title : "Security Questions", subtitle : "A set of secret questions, the answers of which only the user knows."}
]);

const possession_factors = ref([
  { title : "SMS OTP", subtitle : "A secret code sent to a user's phone(possession) to verify identity.", icon : "mdi-message-alert-outline"},
  { title : "USB Token", subtitle : "A physical USB device that is used to verify identity.", icon : "mdi-usb-flash-drive-outline"},
  { title : "Smart Cards", subtitle : "A physical card-like device used to verify identity.", icon : "mdi-smart-card-outline"}
]);

const inherent_factors = ref([
  { title : "Fingerprint Signature", subtitle : "Creases and grooves on a user's finger is used to verify identity.", icon : "mdi-fingerprint"},
  { title : "Face Recognition", subtitle : "Unique facial features of a user is used to verify identity.", icon : "mdi-face-recognition"}
]);

async function fetch_sessions(){
  loading_sessions.value = true;
  loader.set("Fetching Sessions")
  let { data, error } = await $rest("auth/get-sessions");
  loader.set(false);
  raw_sessions.value = data;
  loading_sessions.value = false;
}


//Access Logs:
const expanded_logs = ref([]);


const loading_sessions = ref(false);

let raw_sessions = ref([]);

const manage_session_dialog = ref(false);


const account_state = computed(()=>{
  return {
    icon : "shield-error",
    completion : "60%",
    uncomplied : []
  }
});


const sessions = computed(()=>{
  let current_session : SessionObject[] = [];
  let accumulator:SessionObject[] = [];
  raw_sessions.value.forEach(({_id, agent, start, ip, current})=>{
    const { browser, os, device, cpu } = agent;

    let device_name = "No Data.";
    let arch        = "No Data.";

    /* @ts-ignore */
    const { vendor, model } = device;
    if(vendor)device_name = `${vendor} ${model}`;
    
    /* @ts-ignore */
    if(cpu.architecture)arch = cpu.architecture.toUpperCase();

    /* @ts-ignore */
    let obj = { sid : _id, arch, device : device_name, ip, icon : `mdi-${get_browser_icon(browser.name)}`, current : Boolean(current), browser : browser.name || "Unknown Browser", os : os.name || "Unknown OS", last_access : get_duration(start)};
    (current ? current_session : accumulator).push(obj);
  });

  return current_session.concat(accumulator);
});

function get_duration(stamp : number){
  const delta = Date.now() - stamp;

  const minutes = (delta / 1000) / 60;
  const hours   = parseInt(String(minutes / 60));
  const days    = hours / 24;


  if(days >= 1)return `${parseInt(String(days))} day${parseInt(String(days)) > 1 ? "s" : ""} ago.`;
  if(minutes >= 60)return `${hours} hour${hours > 1 ? "s" : ""} ago.`;
  if(minutes <= 1)return "A few seconds ago.";
  if(minutes < 5)return "A few minutes ago.";

  return `${parseInt(String(minutes))} Minute${minutes > 1 ? "s" : ""} ago.`;
}

function get_browser_icon(browser : string){
  switch(browser){
    case "Chrome"                   : return "google-chrome";
    case "Firefox"                  : return "firefox";
    case "IE"                       : return "microsoft-internet-explorer";
    case "Edge"                     : return "microsoft-edge";
    case "Android Browser"          : return "android";
    case "Safari"                   : return "apple-safari";
    case "Opera"                    : return "opera";
    case "Opera [Mini/Mobi/Tablet]" : return "opera";

    default : return "monitor";
  }
}

async function terminate_dialog(session_id : string){
  const confirm = await swal({
    icon  : "warning",
    title : "Terminate Session?",
    text   : "Terminating a session will abruptly disconnect it from our systems",

    buttons : {
      cancel : true,
      terminate : true
    }
  });

  if(confirm){
    const { data, error } = await $rest("auth/terminate-session", {
      method : "POST",
      body : {
        session_id
      }
    })

    if(data)fetch_sessions();

    swal({ icon : error ? "error" : "success", title : data || error, buttons : {ok :true}});
  }
}

function update_credentials(){

}

</script>