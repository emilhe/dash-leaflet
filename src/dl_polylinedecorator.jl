# AUTO GENERATED FILE - DO NOT EDIT

export dl_polylinedecorator

"""
    dl_polylinedecorator(;kwargs...)
    dl_polylinedecorator(children::Any;kwargs...)
    dl_polylinedecorator(children_maker::Function;kwargs...)


A PolylineDecorator component.
Polyline is a wrapper of Polyline in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component. If positions are not specified, an attempt is made to read them from the
children property. In this case, the children must be a single PolyLine or a single Polygon.
- `positions` (Array of Array of Realss | Array of Array of Array of Realsss; optional): An array of geographical points (lat, lon)
- `patterns` (optional): List of patterns to be added.. patterns has the following type: Array of lists containing elements 'offset', 'endOffset', 'repeat', 'dash', 'arrowHead', 'marker'.
Those elements have the following types:
  - `offset` (String; optional)
  - `endOffset` (String; optional)
  - `repeat` (String; optional)
  - `dash` (optional): . dash has the following type: lists containing elements 'pixelSize', 'pathOptions'.
Those elements have the following types:
  - `pixelSize` (Real; optional)
  - `pathOptions` (Dict; optional)
  - `arrowHead` (optional): . arrowHead has the following type: lists containing elements 'polygon', 'pixelSize', 'headAngle', 'pathOptions'.
Those elements have the following types:
  - `polygon` (Bool; optional)
  - `pixelSize` (Real; optional)
  - `headAngle` (Real; optional)
  - `pathOptions` (Dict; optional)
  - `marker` (optional): . marker has the following type: lists containing elements 'markerOptions', 'rotate'.
Those elements have the following types:
  - `markerOptions` (Dict; optional)
  - `rotate` (Bool; optional)s
- `id` (String; optional): The ID used to identify this component in Dash callbacks
"""
function dl_polylinedecorator(; kwargs...)
        available_props = Symbol[:children, :positions, :patterns, :id]
        wild_props = Symbol[]
        return Component("dl_polylinedecorator", "PolylineDecorator", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_polylinedecorator(children::Any; kwargs...) = dl_polylinedecorator(;kwargs..., children = children)
dl_polylinedecorator(children_maker::Function; kwargs...) = dl_polylinedecorator(children_maker(); kwargs...)

