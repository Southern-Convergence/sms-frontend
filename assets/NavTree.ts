/**
 * @class NavTree
 * 
 * @classdesc Primitive template for creating (k)ary navigation trees for Vuetify.
 * 
 * @method add_nodes() Merges incoming nodes to the current arboresence's node list., routes are then recursively adjusted throughout the whole descendant tree.
 * @method is_branch() Determines if the current node is a branch (has children)
 */
export default class NavTree {
  name     : string;
  path     : string;
  icon     : string;
  active   : boolean = false;
  children : {[key : string] : NavTree} = {};
  attr     : {[key : string] : any} = {};
  params?  : {[key : string] : string};
  query?   : {[key : string] : string};
  
  constructor(name : string, path? : string, icon? : string, params? : {[key : string] : string}, query? : {[key : string] : string}) {
    this.name     = name;
    this.icon     = icon || "";
    this.path     = path ? path : name ? sanitize_title(name) : "404";
    this.params   = params;
    this.query    = query;
  }

  add_nodes(...node : NavTree[]){
    this.children = Object.fromEntries(node.map((v)=> [v.path, v]));
    return this;
  }

  is_branch(){
    return Boolean(Object.keys(this.children).length);
  }

    /*
    Include arbitrary values on each node.
  */
  set_attribute(key : string, value : any){
    this.attr[key] = value;
    return this;
  }
  
  set_params(params : {[key : string] : string}){
    this.params = params;
    return this;
  }

  propagate_path(prefix? : string){
    const items = Object.values(this.children);
    if(items.length)return items.forEach((v)=> {
      v.path = `${prefix ? `${prefix}-${v.path}` : `${this.path}-${v.path}`}`;
      v.propagate_path(v.path);
    });
  }
};

function sanitize_title(str : string){
  return str.toLowerCase().replace(/\s/g, "-");
}