# AUTO GENERATED FILE - DO NOT EDIT

export dl_rectangle

"""
    dl_rectangle(;kwargs...)
    dl_rectangle(children::Any;kwargs...)
    dl_rectangle(children_maker::Function;kwargs...)


A Rectangle component.
Rectangle is a wrapper of Rectangle in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component
- `bounds` (Array of Array of Realss; required): An array of two geographical points (lat, lon)
- `smoothFactor` (Real; optional): How much to simplify the polyline on each zoom level. More means better 
performance and smoother look, and less means more accurate representation.
- `noClip` (Bool; optional): Disable polyline clipping.
- `stroke` (Bool; optional): Whether to draw stroke along the path. Set it to false to disable borders 
on Rectangles or circles.
- `color` (String; optional): Stroke color
- `weight` (Real; optional): Stroke width in pixels
- `opacity` (Real; optional): Stroke opacity
- `lineCap` (String; optional): A string that defines shape to be used at the end of the stroke.
- `lineJoin` (String; optional): A string that defines shape to be used at the corners of the stroke.
- `dashArray` (String; optional): A string that defines the stroke dash pattern. Doesn't work on Canvas-powered 
layers in some old browsers.
- `dashOffset` (String; optional): A string that defines the distance into the dash pattern to start the dash. 
Doesn't work on Canvas-powered layers in some old browsers.
- `fill` (Bool; optional): Whether to fill the path with color. Set it to false to disable filling on 
Rectangles or circles.
- `fillColor` (String; optional): Fill color. Defaults to the value of the color option
- `fillOpacity` (Real; optional): Fill opacity
- `fillRule` (String; optional): A string that defines how the inside of a shape is determined.
- `bubblingMouseEvents` (Bool; optional): When true, a mouse event on this path will trigger the same 
event on the map (unless L.DomEvent.stopPropagation is used).
- `renderer` (Dict; optional): Use this specific instance of Renderer for this path. Takes 
precedence over the map's default renderer.
- `className` (String; optional): Custom class name set on an element. Only for SVG renderer.
- `interactive` (Bool; optional): If false, the layer will not emit mouse events and will act
as a part of the underlying map.
- `id` (String; optional): The ID used to identify this component in Dash callbacks
- `pane` (String; optional): The leaflet pane of the component
- `attribution` (String; optional): The attribution string for the component
- `click_lat_lng` (Array of Reals; optional): Dash callback property. Receives [lat, lng] upon click.
- `dbl_click_lat_lng` (Array of Reals; optional): Dash callback property. Receives [lat, lng] upon double click.
"""
function dl_rectangle(; kwargs...)
        available_props = Symbol[:children, :bounds, :smoothFactor, :noClip, :stroke, :color, :weight, :opacity, :lineCap, :lineJoin, :dashArray, :dashOffset, :fill, :fillColor, :fillOpacity, :fillRule, :bubblingMouseEvents, :renderer, :className, :interactive, :id, :pane, :attribution, :click_lat_lng, :dbl_click_lat_lng]
        wild_props = Symbol[]
        return Component("dl_rectangle", "Rectangle", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_rectangle(children::Any; kwargs...) = dl_rectangle(;kwargs..., children = children)
dl_rectangle(children_maker::Function; kwargs...) = dl_rectangle(children_maker(); kwargs...)

