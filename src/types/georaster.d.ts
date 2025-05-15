declare module 'georaster' {
  export interface GeoRaster {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    pixelWidth: number;
    pixelHeight: number;
    projection: number;
    noDataValue: number;
    numberOfRasters: number;
    values: any[];
    dimensions: {
      x: number;
      y: number;
    };
  }

  export default function(options: any): Promise<GeoRaster>;
  export function fromArrays(options: any): Promise<GeoRaster>;
  export function parse(data: any): Promise<GeoRaster>;
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
