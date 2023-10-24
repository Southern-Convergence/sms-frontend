declare type Server = import("socket.io").Server;
declare type Socket = import("socket.io").Socket;
declare type Db     = import("mongodb").Db;

type FilteredFiles = Array<{paths : {complete : string, relative : string}, files : Array<string>, missing : Array<string>}>;

/* Event Framewerk */
declare type EventValidator = {[key : string] : (input : object)=> (string | false)};
declare type EventController = {[key : string] : (ctx : EventCtx, data : {[key : string] : any})=> Promise<any> }
declare type EventHooks = {[key : string] : {before? : EventHook, after? : EventHook}};
declare type EventHook = (ctx : EventCtx, data? : object) => Promise<object>;
declare type EventCtx = { io : Server, socket : Socket, db : Db, args : Array<(string | object)> };

declare type Namespaces = {[key : string] : [controller : EventController, event : EventHooks | null, validator : EventValidator]};

declare type Operation = ("Read" | "Write");
declare type Protocol  = ("HTTP" | "WS");


declare type LogFragment = {
  domain  : string;
  user_id : string;
  stamp   : number;
  host    : string;
  type    : ("in" | "out" | "req");
}