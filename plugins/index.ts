import i18n from "i18n-iso-countries";

/* @ts-ignore */
import en from "i18n-iso-countries/langs/en";
import {UseFetchOptions} from "nuxt/dist/app/composables";
import {KeyOfRes} from "nuxt/dist/app/composables/asyncData";

export default defineNuxtPlugin(()=>{
  const router = useRouter();
  const LOCALE = "en"; //Please refer to this when changing locales: https://en.wikipedia.org/wiki/ISO_3166-1#Officially_assigned_code_elements

  //Support EN locale
  i18n.registerLocale(en);

  const cfg  = useRuntimeConfig();
  
  return {
    provide : {
      //API Wrapper: Cuz Fetch API is stupid enough not to include a configuration option for setting default headers
      //https://github.com/nuxt/framework/discussions/4504

      async rest(url : string, options? : UseFetchOptions<unknown, (res: unknown) => any, KeyOfRes<(res: unknown) => any>>){
        let merged_headers = options?.headers || {};
        merged_headers = {
          ...merged_headers,
          "Access-Control-Allow-Origin"      : cfg.public.DOMAIN,
          'Access-Control-Allow-Credentials' : 'true',
          "Access-Control-Allow-Headers"     : '*',
          "Access-Control-Expose-Headers"    : '*'
        }

        const response = await useFetch(url, {
          ...options,
          headers : merged_headers,
          key : Date.now().toString(),
          baseURL : cfg.public.API,
          credentials : "include",
          mode : "cors"
        }).then(({data, error})=> {
          return {
            /* @ts-ignore */
            data     : toPOJO((data.value || {}).data),
            error    : toPOJO(((error.value || {}).data || {}).error),
            err_code : error.value?.statusCode
          }
        });

        //Signifies a session-timeout
        if(response.err_code && response.err_code === 401)router.replace({name : "session-timeout"});
        
        return response;
      },
        
      //Global Settings: (Locale, Theme, etc.)
      locale : LOCALE,
      phone_code : "+63",
      
      validator : {
        required : (v : string)=> !!v || "This Field is required",
        email    : (v : string)=>{
          if (v) {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(v) || "Invalid e-mail.";
          }

          return true;
        },

        min_password_length : (v : string)=> !v || v.length >= 8 || "Minimum of 8 characters.",
        has_number          : (v : string)=> !v || /\d/.test(v) || "Requires at least 1 number.",
        has_lower_case      : (v : string)=> !v || /[a-z]/.test(v) || "Requires at least 1 lowercase character.",
        has_upper_case      : (v : string)=> !v || /[A-Z]/.test(v) || "Requires at least 1 uppercase character.",
        has_special_char    : (v : string)=> {
          let pattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          return !v || pattern.test(v) || "Requires at least 1 special character."
        }
      },

      //Commonly used/agreed variables and items.
      user_types : [
        {
          name : "Internal",
          prop : "internal",
          icon : "mdi-human",
          desc : "Refers to users associated with the administration of internal UAC functionalities."
        },
        {
          name : "NPE (Non-Person Entity)",
          prop : "npe",
          icon : "mdi-robot-outline",
          desc : "Refers to services/scripts that interact with your APIs"
        }
      ],

      toPOJO
    }
  }
});

function toPOJO(value : any){
  if(!value)return null;
  return JSON.parse(JSON.stringify(value));
}