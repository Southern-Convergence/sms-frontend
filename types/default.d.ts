declare type Point = { x : Number; y : Number; };

declare type RadialPoint = {
  point  : Point;
  radius : Number;
}

declare type SessionObject = {
  sid     : string;
  icon    : string;
  current : boolean;
  browser : any;
  ip?     : string;
  os      : any;
  last_access: string;

  device? : string;
  arch?   : string;
}

//Notification Object
declare type NotificationObject = {
  subsystem : string;
  type      : ("info" | "warn" | "error");
  details   : object;
  read?     : boolean;
}

//Common Utilities
declare type Preferences = {
  dark : boolean;
  lang : string;
}