import { io } from "socket.io-client";

import useAuth from "~/store/auth";
import useNav  from "~/store/nav";


export default defineNuxtPlugin(() => {
  const cfg  = useRuntimeConfig();
  const auth = useAuth();
  const is_authorized = ref(false);
  
  let socket = io(cfg.public.API, { transports : ["websocket", "polling"], auth : { token : `Bearer ${auth.access_id}` }});
  
  is_authorized.value = socket.connected;
  
  let on = (event : string, cb : (...args : any[])=> void)=>socket.on(event, cb);
  let emit = (event : string, data? : any): Promise<any>=> {
    return new Promise((resolve, reject)=> {
      socket.emit(event, data, (v : {[key : string] : any})=> {
        if(v.error)return reject(v.error);
        resolve(v);
      });
    });
  };

  const connect = async()=> {
    if(!auth.logged_in)return;
    const { access_id } = auth;

    socket = io(cfg.public.API, { transports : ["websocket", "polling"], auth : { token : `Bearer ${access_id}` }});
    is_authorized.value = true;
  }

  const disconnect = async()=> {
    socket.disconnect();
    is_authorized.value = false;
  }

  return {
    provide: {
      socket : {on, emit, connect, disconnect, is_authorized}
    }
  }
})