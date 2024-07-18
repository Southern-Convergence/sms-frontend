import { defineStore } from "pinia";
import useAuth from "~~/store/auth";

const storage = localStorage;

export const useGlobalConfig = defineStore("config", {
  state: () => {
    //Deserialize from cookie:
    let preferences = JSON.parse(
      String(storage.getItem("preferences"))
    ) as Preferences;

    //Load defaults
    if (!preferences) {
      preferences = {
        dark: false,
        lang: "en",
        //idk, add moar.
      };
    }

    return {
      //for i18n adherence
      langs: ["EN (Philippines)", "Tagalog", "Waray"],
      ready: false,
      referrer: "",

      preferences,
    };
  },

  actions: {
    set_dark_mode() {
      this.preferences.dark = !this.preferences.dark;
      this.save_preferences();
    },

    save_preferences() {
      storage.setItem("preferences", JSON.stringify(this.preferences));
    },

    set_referrer(referrer: string) {
      this.referrer = referrer;
    },

    clear_referrer(referrer: string) {
      this.referrer = "";
    }
  },
});

/* export const useNotifications = defineStore("notifications", {
  state : ()=> ({
    items : [
      //Example Only
      {
        subsystem : "pshrms",
        type : "info",
        details : {
          text : "You're LDNA Assessment Figures have been completed",
          html : ""
        }
      }
    ]
  }),

  actions : {
    //Fetch those fucking notifications
    //Flag those notifications as read

    //Any interactions with preferences must touch the selected storage option for persistence of preferences.
    
  },

  getters : {
    get_notifications() : NotificationObject[]{
      return this.items as NotificationObject[];
    }
  }
}); */

export const useSnackbar = defineStore("snackbar", {
  state: () => ({
    value: false,
    text: "",
    type: "" as "error" | "success" | "warning" | "info" | undefined,
    timeout: -1,
  }),

  actions: {
    set_message(
      text: string,
      type: "error" | "success" | "warning" | "info" | undefined,
      timeout?: number
    ) {
      this.text = text;
      this.type = type;
      this.timeout = timeout || 2000;
      this.value = true;
    },

    success(text: string, timeout?: number) {
      this.set_message(text, "success", timeout);
    },
    error(text: string, timeout?: number) {
      this.set_message(text, "error", timeout);
    },
    warning(text: string, timeout?: number) {
      this.set_message(text, "warning", timeout);
    },
    info(text: string, timeout?: number) {
      this.set_message(text, "info", timeout);
    },
  },
});

export const useLocation = defineStore("location", {
  state: () => ({
    x: 0,
    y: 0,
  }),

  actions: {
    update_coords(x: number, y: number) {
      this.x = x;
      this.y = y;
    },
  },

  getters: {
    get_coords(): string[] {
      return [this.x.toPrecision(8), this.y.toPrecision(8)];
    },
  },
});

export const useDomains = defineStore("domains", {
  state: () => ({
    domains: {} as DomainMap,
    active_domain: null as any,
  }),

  actions: {
    async hydrate(data: any[]) {
      this.domains = Object.fromEntries(data.map((v: any) => {
        let temp = v;
        const count_offset = (v.administrators || []).reduce((a: number, b: any) => a + b.users, 0);
        v.administrators.push({ name: "Regular User", users: v.users - count_offset });

        const user_groups = v.administrators;

        delete temp.administrators;
        delete temp.users;

        return [v.name, { ...temp, user_groups: Object.fromEntries(user_groups.map((u: any) => [u.name, u.users])) }];
      }));
    },

    set_active_domain(domain_name: string) {
      console.log("Setting active domain to:", domain_name);
      this.active_domain = this.domains[domain_name];
    },


  },
});

export const useService = defineStore("service", {
  state: () => ({}) as any,

  actions: {
    hydrate(data: any) {
      this.$state = data;
    }
  },

  getters: {
    get_service(): any {
      return this.$state;
    }
  }
});

export const usePolicies = defineStore("policies", {
  state: () => ({
    access_policies: [] as Policy[],
    security_policies: [] as Policy[],
  }),

  actions: {
    hydrate(policies: Policy[]) {
      this.access_policies = [];
      this.security_policies = [];
      policies.forEach((v) =>
        (v.type === "access"
          ? this.access_policies
          : this.security_policies
        ).push(v)
      );
    },
  },
});

export const useResources = defineStore("resources", {
  state: () => ({
    updated: false,
    resources: [] as Resource[],
  }),

  actions: {
    hydrate(resources: any[]) {
      this.resources = [];
      this.resources = resources;
      this.updated = true;
    },
  },

  getters: {
    get_items(): Resource[] {
      return this.resources || [];
    },
  },
});

export const useAPTs = defineStore("apts", {
  state: () => ({
    updated: false,
    apts: [] as AccessTemplate[],
    partitioned: {} as any,
  }),

  actions: {
    hydrate(apts: any, active_policies: any[]) {
      this.apts = [];
      this.apts = apts;

      this.partitioned = Object.fromEntries(
        active_policies.map((v) => [v._id, { ...v, apts: [] }])
      );

      apts.forEach((v: any) => {
        this.partitioned[v.basis._id].apts.push(v);
      });

      this.updated = true;
    },
  },

  getters: {
    get_items(): AccessTemplate[] {
      return this.apts;
    },
  },
});

export const useLoader = defineStore("loader", {
  state: () => ({
    loading: false,
    text: "",

    //Shittiest var names
    taking_awhile: false,
    taking_awhile_tracker: null as any,
  }),

  actions: {
    set(value: string | boolean) {
      this.loading = Boolean(value);
      this.text = String(value) || "";

      if (this.loading) {
        this.taking_awhile_tracker = setTimeout(() => {
          this.taking_awhile = true;
        }, 3000);
      } else {
        clearTimeout(this.taking_awhile_tracker);
        this.taking_awhile = false;
      }

      if (!this.loading) this.text = ""; //Reset if toggled off
    },
  },
});

export const useExport = defineStore("export", {
  state: () => ({
    dialog: false,
    data: [],
  }),
});

export const useNotifications = defineStore("notifications", {
  state: () => ({
    public_key: "",
    endpoint: "",
    subscriptions: {
      "hris-approval-queue-updates": {
        title: "Approval Queue Updates",
        desc: "Notifications about approval queue",
        channels: { push: false, email: false, sms: false },
      },

      "updates-and-changelogs": {
        title: "Updates and Changelogs",
        desc: "Allows us to send notifications of newly introduced updates and changelogs.",
        channels: { push: false, email: false, sms: false },
      },

      "tips-and-tricks": {
        title: "Tips and Tricks",
        desc: "Allows us to send helpful information about using our systems.",
        channels: { push: false, email: false, sms: false },
      },

      "security-updates": {
        title: "Security Updates and Logs",
        desc: "(Recommended) Allows us to send any security-related information such as security-patches, activity logs, anomalous access, etc.",
        channels: { push: false, email: false, sms: false },
      },
    } as any,
    load_map: {} as any,

    ttl: 30000,
    delay: 2000,
  }),

  actions: {
    async init() {
      const { $rest } = useNuxtApp();
      const auth = useAuth();

      const [vapid_key, active_subs] = await Promise.allSettled([
        $rest("notification/get-vapid-key"),
        $rest("notification/get-subscriptions"),
      ]).then(([a, b]) => {
        /* @ts-ignore */
        return [a.value.data, b.value.data || []];
      });

      this.public_key = vapid_key;
      //Hydrate subscriptions state based off of user subscription data.
      if (active_subs.data) {
        Object.entries(active_subs.namespaces).forEach(([k, v]: any) => {
          const matched_sub = this.subscriptions[k];

          Object.entries(v).forEach(([_k, _v]) => {
            if (matched_sub) this.subscriptions[k].channels[_k] = _v;
          });
        });
      }

      manage_permission(urlBase64ToUint8Array(vapid_key))
        .then((sub) => {
          this.submit_preference("allow", sub)
        });
    },

    async subscribe(namespace: string, channel: string, value: boolean) {
      const { $rest } = useNuxtApp();
      const snackbar = useSnackbar();

      this.load_map[`${namespace}-${channel}`] = true;
      this.subscriptions[namespace].channels[channel] = value;

      const { data, error } = await $rest(`notification/${value ? "subscribe" : "unsubscribe"}`, { method: "POST", body: { namespace, channel } });
      if (value) this.sample(`Notification about ${namespace}-${channel}.`);

      snackbar.set_message(error ? error : data, error ? "error" : "success");
      if (error) this.subscriptions[namespace].channels[channel] = !value; //Revert
      this.load_map[`${namespace}-${channel}`] = false;
    },

    async submit_preference(permission: string, subscription?: any) {
      const { $rest } = useNuxtApp();
      $rest("notification/toggle", {
        method: "POST",
        body: { permission, subscription }
      });
    },

    sample(message: string) {
      const { $rest } = useNuxtApp();

      $rest("notification/notify", {
        method: "POST",
        body: {
          message,
          ttl: this.ttl,
          delay: this.delay,
        },
      });
    },
  },

  getters: {
    get_subscriptions(): any[] {
      //@ts-ignore mahubya pag surat types yaering
      return Object.entries(this.subscriptions).map(([k, v]) => ({ ...v, namespace: k }));
    },
  },
});

async function manage_permission(vapid_key: Uint8Array) {
  const registration = await navigator.serviceWorker.ready;
  return registration.pushManager.getSubscription()
    .then((sub) => {
      if (sub) return sub;

      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapid_key,
      });
    });
}

function urlBase64ToUint8Array(str: string) {



  var padding = '='.repeat((4 - str.length % 4) % 4);
  var base64 = (str + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}