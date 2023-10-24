/*
  Quality of Life store.

  This acts as a centralized store and provider of dashboard data and options.
  Heck, it even handles data fetching...
  DISCLAIMER: Opinionated dashboard setup.
*/
import { defineStore } from "pinia";

const DASHBOARD_DECLARATION:{[key : string] : any} = {
  //Practical Samples
  /*   
  "HRIS" : {
    link : "dashboard-hris",
    desc : "Human Resources Information System",
    subtypes : [
      { title : "Overview" },
      { title : "Demographics", link : "demographics" },
      { title : "Diversity", link : "diversity" },
      { title : "Step Increment", link : "step-increment"}
    ]
  },
  "PSHRMS" : {
    link : "dashboard-pshrms",
    desc : "Human Resources Management System",
    subtypes : [
      { title : "Overview" },
      { title : "LDNA", link : "ldna" },
      { title : "Commitments", link : "commitments" }
    ]
  }
  */
}

export default defineStore({
  id : "dashboard-provider",

  state : ()=> ({
    //Analytics states
    loading : false,
    ready   : true,
    error   : "",

    dashboard : "Index",
    subtype   : "Overview",

    //subsystem-select data
    dashboard_declaration : DASHBOARD_DECLARATION,

    options : {},
  }),

  actions : {
    fetch(...reqs : Promise<any>[]):Promise<any[]>{
      this.ready = false;
      this.loading;

      return Promise.all(reqs).then((v)=>{
        this.ready = true;
        this.loading = false;

        return v.map((d)=> d.data);
      })
      .catch((err)=>{
        this.error = err;
        this.ready = false;
        this.loading = false;
        return [];
      });

    },

    change_dashboard([dashboard, subtype] : [string, string]){
      this.dashboard = dashboard;
      this.subtype = subtype;
    }
  }
})