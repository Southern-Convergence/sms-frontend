import { defineStore } from "pinia";
import {useGlobalConfig, useNotifications} from "~/store/index";
import useNav from "~/store/nav";

let mode = window.localStorage.getItem("session-mode");
if(!mode){
  mode = "persistent";
  window.localStorage.setItem("session-mode", "persistent");
}

let storage = mode === "persistent" ? window.localStorage : window.sessionStorage;

export default defineStore({
  id: "auth",
  state: ()=> {
    const nav = useNav();
    const gcfg = useGlobalConfig();
    const notifications = useNotifications();
    //Add if session mode is missing

    const matched_user = JSON.parse(String(storage.getItem("user")));
    
    let obj = {
      mode,
      user          : matched_user,
      appelation    : "",
      type          : "unknown",
      status        : "",
      pfp : {
        type : "placeholder",
        ref : ""
      },
      logged_in     : Boolean(matched_user),
      ...matched_user
    };

    if(obj.logged_in){
      nav.fetch_resources();
      notifications.init();
    }
    
    else gcfg.ready = true;
    let temp = build_user_info(matched_user);

    return {...obj, ...temp};
  },

  actions: {
    async login(username : string, password : string) {
      const { $rest } = useNuxtApp();
      const nav = useNav();
      const notifications = useNotifications();
      
      let { data, error } = await $rest("auth/login", {
        method: "POST",
        body: { username, password }
      });

      if(!data && !error){
        //Failed to connect to backend services
        return Promise.reject("Failed to connect to the server.");
      }
      
      if(error)return Promise.reject(error);
      
      const user_results = await $rest("auth/get-user", { method  : "GET" });
      if(user_results.error && user_results.error !== "Already signed-in")return Promise.reject(user_results.error);
      let temp = build_user_info(user_results.data);
    
      this.user = user_results.data;
      this.name = temp.name;
      this.type = temp.type || "";
      this.pfp  = temp.pfp || { type : "", ref  : ""};
      this.access = temp.access;
      this.access_id = temp.access_id;
      this.status = temp.status;

      storage.setItem("user", JSON.stringify(user_results.data));
      storage.setItem("sid", data);
      this.logged_in = true;

      //Since we're logged in, we might as well get our grant privileges.
      if(this.logged_in){
        nav.fetch_resources();
        notifications.init();
      }
      return Promise.resolve(true);
    },
    logout() {
      const { $socket, $rest } = useNuxtApp();
      const router = useRouter();
      const gcfg = useGlobalConfig();

      gcfg.ready = false;
      router.replace({name : "index"})
      this.cleanup();

      $rest("auth/logout", {
        method: "GET",
        credentials : "include"
      }).then(()=>{
        gcfg.ready = true;
      })


      $socket.disconnect();
    },
    cleanup(){
      this.logged_in = false;
      storage.clear();
    },
    switch_mode(persistent : boolean){
      storage = persistent ? window.localStorage : window.sessionStorage;
    },

    get_type(){
      return this.user.type || "guest";
    },
  }
});

function build_user_info(matched_user : any){
  if(matched_user){
    const { first_name, last_name, access, type, pfp, status } = matched_user;
    
    return {
      type,
      name : `${first_name} ${last_name}`,
      pfp : {
        type : pfp ? "img" : "placeholder",
        ref  : pfp ? pfp : `${first_name[0]}${last_name[0]}`
      },

      access    : access.name,
      access_id : access._id,
      status
    }
  }
  return {};
}