import * as L from 'leaflet'

declare module 'leaflet' {
  namespace Control {
    interface DrawConstructorOptions {
      position?: string
      draw?: {
        polyline?: boolean | any
        polygon?: boolean | any
        rectangle?: boolean | any
        circle?: boolean | any
        marker?: boolean | any
        circlemarker?: boolean | any
      }
      edit?: {
        featureGroup: L.FeatureGroup
        remove?: boolean
      }
    }

    class Draw extends Control {
      constructor(options?: DrawConstructorOptions)
    }
  }

  namespace Draw {
    interface DrawEvent {
      CREATED: 'draw:created'
      EDITED: 'draw:edited'
      DELETED: 'draw:deleted'
      DRAWSTART: 'draw:drawstart'
      DRAWSTOP: 'draw:drawstop'
      DRAWVERTEX: 'draw:drawvertex'
      EDITSTART: 'draw:editstart'
      EDITMOVE: 'draw:editmove'
      EDITRESIZE: 'draw:editresize'
      EDITVERTEX: 'draw:editvertex'
      EDITSTOP: 'draw:editstop'
      DELETESTART: 'draw:deletestart'
      DELETESTOP: 'draw:deletestop'
    }

    const Event: DrawEvent
  }
} 