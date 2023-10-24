declare type PageMeta = import("nuxt/app").PageMeta;

export declare module "nuxt/app" {
  interface PageMeta {
    /** A brief description of the page */
    desc?       : string;

    /** Indicates if the page requires an active session */
    is_public?  : boolean;

    /** Endpoints used within the page */
    endpoints?  : string[];

    /** Tags to associate this page with */
    tags?       : string[];

    /** Subsystems to bind this page into */
    subsystems? : string[];
  }
}