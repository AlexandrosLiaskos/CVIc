declare module 'leaflet-image' {
  export default function leafletImage(
    map: any,
    callback: (error: Error | null, canvas: HTMLCanvasElement) => void
  ): void;
}
