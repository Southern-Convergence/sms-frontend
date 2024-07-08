// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'

const { NODE_ENV } = process.env;

const IS_DEV = NODE_ENV === "development";
export default defineNuxtConfig({
  ssr: false,
  app: {
    pageTransition: {
      name: "page"
    },

    layoutTransition: {
      name: "rotate",
    },

    head: {
      title: "STD-Frontend",

      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1.25" },
      ],
    },
  },

  vite: {
    plugins: [
      vuetify()
    ]
  },

  css: [
    "vuetify/lib/styles/main.sass",
    "mdi/css/materialdesignicons.min.css",
    "@mdi/font/css/materialdesignicons.min.css",
    "leaflet/dist/leaflet.css",
    "~/assets/main.css",
  ],

  modules: ["@pinia/nuxt", "@vite-pwa/nuxt", "modules/uac-integration", ['@nuxtjs/google-fonts', {
    families: {
      Roboto: true,
      Inter: [400, 700],
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
      Ubuntu: true
    }
  }]],

  pwa: {
    mode: IS_DEV ? "development" : "production",
    registerType: "autoUpdate",
    strategies: "injectManifest",
    scope: "./",
    srcDir: "service-worker",
    filename: "sw.ts",

    manifest: {
      name: "UAC",
      short_name: "uac",
      description: "YAGNI ABAC UAC",
      theme_color: "#0D47A1",
      id: "/",

      icons: [
        {
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js}"],
      cacheId: "cyka blyat"
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },

  routeRules: {
    "/manifest.webmanifest": {
      headers: {
        "Content-Type": "application/manifest+json",
        "Cache-Control": "public, max-age=0, must-revalidate",
      }
    },

    "/notif.js": {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    }
  },

  plugins: [
    "~/plugins/index.ts",
    "~/plugins/sockets.ts",
    "~/plugins/vuetify.ts",
  ],

  runtimeConfig: {
    public: {
      PORT: process.env.PORT,
      API: process.env.API,
      DOMAIN: process.env.DOMAIN,

      CDN_ENDPOINT: process.env.CDN_ENDPOINT,
      VERSIONING_ENABLED_CDN_ENDPOINT: process.env.VERSIONING_ENABLED_CDN_ENDPOINT
    },
  }
});
