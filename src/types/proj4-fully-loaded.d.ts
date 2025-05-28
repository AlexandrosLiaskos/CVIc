declare module 'proj4-fully-loaded' {
  import * as proj4Type from 'proj4';
  const proj4: typeof proj4Type;
  export = proj4;
  export as namespace proj4;
}
