# AUTO GENERATED FILE - DO NOT EDIT

export dl_circlemarker

"""
    dl_circlemarker(;kwargs...)
    dl_circlemarker(children::Any;kwargs...)
    dl_circlemarker(children_maker::Function;kwargs...)


A CircleMarker component.
CircleMarker is a wrapper of CircleMarker in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component
- `center` (Array of Reals; required): The center of the circle marker (lat, lon)
- `radius` (Real; optional): Radius of the circle marker, in pixels
- `stroke` (Bool; optional): Whether to draw stroke along the path. Set it to false to disable borders 
on polygons or circles.
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
polygons or circles.
- `fillColor` (String; optional): Fill color. Defaults to the value of the color option
- `fillOpacity` (Real; optional): Fill opacity
- `fillRule` (String; optional): A string that defines how the inside of a shape is determined.
- `bubblingMouseEvents` (Bool; optional): When true, a mouse event on this path will trigger the same 
event on the map (unless L.DomEvent.stopPropagation is used).
- `renderer` (Dict; optional): Use this specific instance of Renderer for this path. Takes 
precedence over the map's default renderer.
- `className` (String; optional): Custom class name set on an element. Only for SVG renderer.
- `interactive` (Bool; optional): If true, the image overlay will emit mouse events when clicked or hovered.
- `id` (String; optional): The ID used to identify this component in Dash callbacks
- `pane` (String; optional): The leaflet pane of the component
- `attribution` (String; optional): The attribution string for the component
- `n_clicks` (Real; optional): Dash callback property. Number of times the object has been clicked
"""
function dl_circlemarker(; kwargs...)
        available_props = Symbol[:children, :center, :radius, :stroke, :color, :weight, :opacity, :lineCap, :lineJoin, :dashArray, :dashOffset, :fill, :fillColor, :fillOpacity, :fillRule, :bubblingMouseEvents, :renderer, :className, :interactive, :id, :pane, :attribution, :n_clicks]
        wild_props = Symbol[]
        return Component("dl_circlemarker", "CircleMarker", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_circlemarker(children::Any; kwargs...) = dl_circlemarker(;kwargs..., children = children)
dl_circlemarker(children_maker::Function; kwargs...) = dl_circlemarker(children_maker(); kwargs...)

