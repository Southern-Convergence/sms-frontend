/* Export Dialog Types */
declare type ExportProps = {
  title : string;
}

/* Pamphlet Types */
declare type Section = {
  name       : string;
  icon?      : string;
  subsection : {title : string; template : string}[];
  active     : number; 
}

declare type PamphletDefinitions = {[definition : string] : Section[]};