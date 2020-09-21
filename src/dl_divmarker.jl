# AUTO GENERATED FILE - DO NOT EDIT

export dl_divmarker

"""
    dl_divmarker(;kwargs...)
    dl_divmarker(children::Any;kwargs...)
    dl_divmarker(children_maker::Function;kwargs...)


A DivMarker component.
Marker is a wrapper of Marker in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component
- `position` (Array of Reals; required): A geographical point (lat, lon)
- `iconOptions` (optional): Options passed to DivIcon constructor.. iconOptions has the following type: lists containing elements 'iconSize', 'iconAnchor', 'popupAnchor', 'className', 'html'.
Those elements have the following types:
  - `iconSize` (Array of Reals; optional)
  - `iconAnchor` (Array of Reals; optional)
  - `popupAnchor` (Array of Reals; optional)
  - `className` (Array of Reals; optional)
  - `html` (String; optional)
- `draggable` (Bool; optional): Whether the marker is draggable with mouse/touch or not.
- `opacity` (Real; optional): The opacity of the marker.
- `zIndexOffset` (Real; optional): By default, marker images zIndex is set automatically based
on its latitude. Use this option if you want to put the
marker on top of all others (or below), specifying a high
value like 1000 (or high negative value, respectively).
- `keyboard` (Bool; optional): Whether the marker can be tabbed to with a keyboard and clicked by
pressing enter.
- `title` (String; optional): Text for the browser tooltip that appear on marker hover (no tooltip
by default).
- `alt` (String; optional): Text for the alt attribute of the icon image (useful for accessibility).
- `riseOnHover` (Bool; optional): If true, the marker will get on top of others when you hover the mouse
over it.
- `riseOffset` (Real; optional): The z-index offset used for the riseOnHover feature.
- `bubblingMouseEvents` (Bool; optional): When true, a mouse event on this marker will trigger the same event
on the map (unless L.DomEvent.stopPropagation is used).
- `autoPan` (Bool; optional): Whether to pan the map when dragging this marker near its edge or not.
- `autoPanPadding` (Dict; optional): Distance (in pixels to the left/right and to the top/bottom) of the map
edge to start panning the map.
- `autoPanSpeed` (Real; optional): Number of pixels the map should pan by.
- `interactive` (Bool; optional): If false, the layer will not emit mouse events and will act as a part of
the underlying map.
- `id` (String; optional): The ID used to identify this component in Dash callbacks
- `pane` (String; optional): The leaflet pane of the component
- `attribution` (String; optional): The attribution string for the component
- `n_clicks` (Real; optional): Dash callback property. Number of times the object has been clicked
"""
function dl_divmarker(; kwargs...)
        available_props = Symbol[:children, :position, :iconOptions, :draggable, :opacity, :zIndexOffset, :keyboard, :title, :alt, :riseOnHover, :riseOffset, :bubblingMouseEvents, :autoPan, :autoPanPadding, :autoPanSpeed, :interactive, :id, :pane, :attribution, :n_clicks]
        wild_props = Symbol[]
        return Component("dl_divmarker", "DivMarker", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_divmarker(children::Any; kwargs...) = dl_divmarker(;kwargs..., children = children)
dl_divmarker(children_maker::Function; kwargs...) = dl_divmarker(children_maker(); kwargs...)

