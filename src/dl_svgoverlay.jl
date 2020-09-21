# AUTO GENERATED FILE - DO NOT EDIT

export dl_svgoverlay

"""
    dl_svgoverlay(;kwargs...)
    dl_svgoverlay(children::Any;kwargs...)
    dl_svgoverlay(children_maker::Function;kwargs...)


A SVGOverlay component.
NOTE: This component is not fully tested. Consider it beta.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component
- `svg` (String; required): The SVG as text
- `bounds` (Array of Array of Realss; required): The geographical bounds the image is tied to.
- `opacity` (Real; optional): The opacity of the image overlay.
- `zIndex` (Real; optional): The explicit zIndex of the overlay layer.
- `alt` (String; optional): Text for the alt attribute of the image (useful for accessibility).
- `interactive` (Bool; optional): If true, the image overlay will emit mouse events when clicked or hovered.
- `bubblingMouseEvents` (Bool; optional): When true, a mouse event on this path will trigger the same 
event on the map (unless L.DomEvent.stopPropagation is used).
- `crossOrigin` (Bool; optional): Whether the crossOrigin attribute will be added to the image. If 
a String is provided, the image will have its crossOrigin attribute 
set to the String provided. This is needed if you want to access image 
pixel data. Refer to CORS Settings for valid String values.
- `errorOverlayUrl` (String; optional): URL to the overlay image to show in place of the overlay that failed to load.
- `className` (String; optional): A custom class name to assign to the image. Empty by default.
- `id` (String; optional): The ID used to identify this component in Dash callbacks
- `pane` (String; optional): The leaflet pane of the component
- `attribution` (String; optional): The attribution string for the component (dynamic)
"""
function dl_svgoverlay(; kwargs...)
        available_props = Symbol[:children, :svg, :bounds, :opacity, :zIndex, :alt, :interactive, :bubblingMouseEvents, :crossOrigin, :errorOverlayUrl, :className, :id, :pane, :attribution]
        wild_props = Symbol[]
        return Component("dl_svgoverlay", "SVGOverlay", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_svgoverlay(children::Any; kwargs...) = dl_svgoverlay(;kwargs..., children = children)
dl_svgoverlay(children_maker::Function; kwargs...) = dl_svgoverlay(children_maker(); kwargs...)

