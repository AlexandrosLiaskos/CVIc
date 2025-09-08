declare module 'georaster' {
  interface GeoRasterMetadata {
    noDataValue?: number;
    projection?: number;
    xmin?: number;
    ymin?: number;
    xmax?: number;
    ymax?: number;
    pixelWidth?: number;
    pixelHeight?: number;
    readOnDemand?: boolean;
  }

  interface GeoRasterOptions {
    cache?: boolean;
    forceXHR?: boolean;
  }

  export interface GeoRaster {
    width: number;
    height: number;
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    pixelWidth: number;
    pixelHeight: number;
    projection: number;
    noDataValue: number;
    numberOfRasters: number;
    values?: number[][][];
    mins?: number[];
    maxs?: number[];
    ranges?: number[];
    dimensions: {
      x: number;
      y: number;
    };
    getValues?: (options: {
      left: number;
      top: number;
      right: number;
      bottom: number;
      width: number;
      height: number;
      resampleMethod?: 'bilinear' | 'nearest';
    }) => Promise<number[][][]>;
    toCanvas?: (options?: { width?: number; height?: number }) => HTMLCanvasElement;
  }

  function parseGeoraster(
    input: ArrayBuffer | string | Blob | number[][][],
    metadata?: GeoRasterMetadata,
    debug?: boolean,
    options?: GeoRasterOptions
  ): Promise<GeoRaster>;

  export = parseGeoraster;
}

declare module 'georaster-layer-for-leaflet' {
  import { GeoRaster } from 'georaster';
  import { GridLayer, GridLayerOptions } from 'leaflet';

  interface GeoRasterLayerOptions extends GridLayerOptions {
    georaster: GeoRaster;
    opacity?: number;
    resolution?: number;
    pixelValuesToColorFn?: (values: number[]) => string;
  }

  export default class GeoRasterLayer extends GridLayer {
    constructor(options: GeoRasterLayerOptions);
    getBounds(): L.LatLngBounds;
    getColor(values: number[]): string | undefined;
    updateColors(pixelValuesToColorFn: (values: number[]) => string, options?: any): this;
  }
}
