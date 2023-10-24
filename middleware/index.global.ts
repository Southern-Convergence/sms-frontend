import useAuth from "~/store/auth";

/* Code should be relevant to setup and preparation of internal utilities. */
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();
  const { $socket } = useNuxtApp();
  
  //Initiate a socket connection if logged in and socket is uninitialized
  if(auth.logged_in && !$socket.is_authorized.value)$socket.connect();
});