# AUTO GENERATED FILE - DO NOT EDIT

export dl_imageoverlay

"""
    dl_imageoverlay(;kwargs...)
    dl_imageoverlay(children::Any;kwargs...)
    dl_imageoverlay(children_maker::Function;kwargs...)


An ImageOverlay component.
ImageOverlay is a wrapper of ImageOverlay in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component
- `url` (String; required): The URL of the image
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
- `click_lat_lng` (Array of Reals; optional): Dash callback property. Receives [lat, lng] upon click. Requires interactive=True.
- `dbl_click_lat_lng` (Array of Reals; optional): Dash callback property. Receives [lat, lng] upon double click. Requires interactive=True.
"""
function dl_imageoverlay(; kwargs...)
        available_props = Symbol[:children, :url, :bounds, :opacity, :zIndex, :alt, :interactive, :bubblingMouseEvents, :crossOrigin, :errorOverlayUrl, :className, :id, :pane, :attribution, :click_lat_lng, :dbl_click_lat_lng]
        wild_props = Symbol[]
        return Component("dl_imageoverlay", "ImageOverlay", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_imageoverlay(children::Any; kwargs...) = dl_imageoverlay(;kwargs..., children = children)
dl_imageoverlay(children_maker::Function; kwargs...) = dl_imageoverlay(children_maker(); kwargs...)

