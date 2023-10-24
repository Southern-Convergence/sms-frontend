declare type GrantTable = {
  [domain : string] : {
    [ap_template : string] : {
      [page : string] : BoundResource
    }
  }
}

declare type Domain = {
  _id        : string;
  name       : string;
  secret_key : string;
  resources  : Resource[];
  active     : boolean;
  icon       : string;
  type       : ("external" | "internal");

  access_policies   : Policy[];
  security_policies : Policy[];
    
  access_templates : AccessTemplate[];
  user_groups : any;
  
  
  /* Resources */
  subdomains : Subdomain[];
  pages      : Page[];
  endpoints  : Endpoint[];
  files      : File[];
}

declare type Policy = {
  _id  : string;
  name : string;
  type : ("access" | "security");
  desc : string;
  attr : string;
  icon : string;

  sub_policies? : SubPolicy[];
}

declare type SubPolicy = {
  name : string;
  desc : string;
}

/* AUAC Resource Types */
declare type Resource = {
  _id       : ObjectId;
  name      : string;
  type      : string;
  desc      : string;
  resources : Resource[];
};
declare interface Subdomain extends Resource{};
declare interface Page extends Resource {
  ref       : string;
  resources : Resource[];
}
declare interface Endpoint extends Resource{
  ref      : string;
  desc     : string;
  sfr_cfg  : SFRConfig;
  protocol : Protocol;
}
declare interface File extends Resource {
  meta : object;
}

/* AP */
declare type AccessTemplate = {
  basis  : string;
  name   : string;

  resources : []
}

declare type DomainMap = {
  [key : string] : Domain
}

declare type RoleMap = {
  [ap_schema : string] : {
    [name : string] : {
      pages : Grants,
      endpoints : {}
    }
  }
}

declare type BoundResource = {
  pages     : {
    [page : string] : boolean
  }
  endpoints : {
    [endpoint_name : string] : boolean
  }
}

declare type ResourceMap = {
  [domain : string] : {
    pages     : {[name : string] : Page},
    endpoints : {[name : string] : boolean},
    files     : {[name : string] : File}
  }
}

declare type NamespaceMap = {
  [namespace : string] : {
    [protocol : Protocol] : {
      [endpoint : string] : string; //Protocol (HTTP or WS)
    }
  }
}

declare type Grants = {[page : string] : boolean};
declare type PageGrant = {name : string; ref : string; write : true};

/* Common object for the resolution of Grants */
declare type GrantAddress = {
  domain : string;
  type   : string;
  attr   : string;
}


/* Custom Errors */

//Notation:
/*
  A = Issues with Resolving Grant Access.
  I = Insufficient Privileges
  O = Ownership Issues
  L = Location Issues

  A01  = Domain
  A02  = Policy
  A03  = Access-Template
  I01  = No Access.
  I02  = No Write Access.
  O01  = No Ownership.
  O02  = Ownership Revoked.
  L01  = Out of Perimeter
  L02  = Out of Bounds(Locality)
*/
declare type UACException = (
  "UAC-A01" |
  "UAC-A02" |
  "UAC-A03" |
  "UAC-I01" |
  "UAC-I02" |
  "UAC-O01" |
  "UAC-O02" |
  "UAC-L01" |
  "UAC-L02"
)