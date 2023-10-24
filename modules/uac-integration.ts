import { defineNuxtModule } from "@nuxt/kit";
import axios from "axios";
import {Nuxt, NuxtPage} from "nuxt/schema";
const { API, UAC_DOMAIN, TITLE, DESCRIPTION, VERSION } = process.env;

export default defineNuxtModule({
  meta : {
    name : "@sctc/uac-integration",
    compatibility : {
      nuxt : "^3.0.0"
    }
  },

  setup (_, nuxt) {
    let pages = [] as NuxtPage[];

    nuxt.hook("close", ()=> {
      update_service_status()
      .then(({data})=> {
        console.log(`[UAC-REGISTRY-LINK] ${data}`);
      });
    });

    nuxt.hook("build:error", (error)=> {
      update_service_status(error)
      .then(({data})=>{
        console.log(`[UAC-REGISTRY-LINK] ${data}`)
      });
    });

    nuxt.hook("pages:extend", (args)=> {
      /*
        Possibly a nuxt bug/issue:

        Unable to extract meta defined within definePageMeta;
        Categorization and developer-enabled tagging of resource dependencies per page is simply impossible until fixed.
        Hindeeeeeeeeeeeeeee
      */
      pages = args.map((v)=> ({
        name : v.name,
        path : v.path.replace("/", ""),
        meta : v.meta || {}
      }));

      console.log(`[UAC-REGISTRY-LINK] Detected ${pages.length} pages.`);
    });

    nuxt.hook("build:done", ()=> {
      console.log(`[UAC-INTEGRATION] Attempting registration...`);
      register_service(nuxt, pages)
      .then(({data})=> console.log(`[UAC-REGISTRY-LINK]`, data.data))
      .catch((error)=> console.log(`[UAC-REGISTRY-LINK] ${error}`));
    });
  }
});


function register_service(nuxt : Nuxt, pages : NuxtPage[]){
  return axios({
    method: "POST",
    url: `${API}/registry/register-frontend`,
    data: {
      domain    : UAC_DOMAIN,
      framework : "Vue",
      version   : nuxt._version,
      info : {
        title       : TITLE,
        description : DESCRIPTION,
        version     : VERSION
      },

      pages,
      port : nuxt.options.runtimeConfig.public.PORT,
      cfg  : nuxt.options.runtimeConfig.public
    }
  });
}

function update_service_status(error? : Error){
  const data = { ok : !Boolean(error), service : TITLE, domain : UAC_DOMAIN};

  /* @ts-ignore */
  if(!data.ok)data.error = error;
  return axios({
    method : "POST",
    url : `${API}/registry/update-service-status`,
    data
  });
}