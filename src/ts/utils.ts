import * as L from 'leaflet'

//# region Special prop resolution

export function resolveRenderer(value: { method: string, options: object }): L.Renderer{
    if(value === undefined){
        return undefined
    }
    const {method, options} = value;
    if(method === 'svg'){
        return options? L.svg({...options}) : L.svg()
    }
    if(method === 'canvas'){
        return options? L.canvas({...options})  : L.canvas()
    }
}

export function resolveCRS(value: string): L.CRS {
    if (value === undefined) {
        return undefined
    }
    return L.CRS[value]
}

//#endregion
