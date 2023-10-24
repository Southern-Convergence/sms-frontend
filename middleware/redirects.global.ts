import useAuth from "~/store/auth";
import useNav from "~/store/nav";
import {useGlobalConfig} from "~/store/index";

//Index and Profile pages are not included as they are handled separately for an intuitive routing experience.

const PUBLIC_ROUTES = [
  "account-recovery",
  "forgot-password",
  "login",
  "cookie-policy",
  "privacy-policy",
  "onboarding",
  "loading",
  "home",
  "error",
]
/* Code should be relevant to redirects and or conditionally forwarding users to default pages */
export default defineNuxtRouteMiddleware((to, from)=>{
  const gcfg   = useGlobalConfig();
  const nav    = useNav();
  const auth   = useAuth();
  
  if(from.name !== "loading")gcfg.set_referrer(from.fullPath);
  //If public, return immediately (i.e allow navigation, note: overrides page-blocking rules.);
  const matched_routes = PUBLIC_ROUTES.filter((v)=> to.name?.toString().includes(v))
  if(matched_routes.length)return;

  //Placeholder page while loading page-resources
  if(!gcfg.ready && !["loading", "index"].includes(to.name?.toString() as string)){
    return navigateTo("/loading");
  }
  
  //Session Behavior:
  //* Redirect to index if not logged in.
  //* Otherwise go to default page.
  //* Redirect to default page if logged in and tries to access
  if(!auth.logged_in && to.name !== "index")return navigateTo("/");

  if(auth.logged_in && to.name === "index"){
    //Declare default page for a given user type
    switch(auth.type){
      case "regional" : return navigateTo("/account/profile");
      default         : return navigateTo("/account/settings");
    }
  }
  
  //Handle redirects to appropriate profile page.
  if(to.fullPath.includes("/account/profile") && !to.redirectedFrom && auth.type !== Object.keys(to.params)[0]){
    const account_params = computed(()=>  ({[`${auth.type}`] : auth.user.username}));
    return navigateTo({name : `account-profile-${Object.keys(account_params.value)[0]}`, params : account_params.value, force : true});
  }
  
  if(gcfg.ready && !String(to.name).includes("error")){
    //Actual checking of page-authorizations goes here
    //The Ultravisor role is supposed to contain all resources declared under the collection with the same name.
    const accessible = nav.is_navigable(to.name?.toString() as string);
    //if(!accessible)return navigateTo("/error/unauthorized");
  }
})