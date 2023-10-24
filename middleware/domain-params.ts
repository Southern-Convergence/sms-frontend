//A middleware for the resolution of active domain id (UAC-Admin pages)
//Issue Link: https://github.com/nuxt/nuxt/issues/20471

import { useDomains } from "~~/store";


export default defineNuxtRouteMiddleware((to, from)=> {
  const domains = useDomains();

  useState("active_domain", ()=> to.params.domain);
  /* @ts-ignore */
  domains.set_active_domain(to.params.domain);
});