# AUTO GENERATED FILE - DO NOT EDIT

export dl_videooverlay

"""
    dl_videooverlay(;kwargs...)
    dl_videooverlay(children::Any;kwargs...)
    dl_videooverlay(children_maker::Function;kwargs...)


A VideoOverlay component.
VideoOverlay is a wrapper of VideoOverlay in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component
- `url` (a value equal to: PropTypes.string, PropTypes.arrayOf(PropTypes.string); required): The URL of the video
- `bounds` (Array of Array of Realss; required): The geographical bounds the video is tied to.
- `opacity` (Real; optional): The opacity of the image overlay.
- `play` (Bool; optional): Sets the play status of the video
- `zIndex` (Real; optional): The explicit zIndex of the overlay layer.
- `loop` (Bool; optional): Whether the video will loop back to the beginning when played.
- `keepAspectRatio` (Bool; optional): Whether the video will save aspect ratio after the projection. Relevant 
for supported browsers. Browser compatibility- 
https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
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
function dl_videooverlay(; kwargs...)
        available_props = Symbol[:children, :url, :bounds, :opacity, :play, :zIndex, :loop, :keepAspectRatio, :alt, :interactive, :bubblingMouseEvents, :crossOrigin, :errorOverlayUrl, :className, :id, :pane, :attribution, :click_lat_lng, :dbl_click_lat_lng]
        wild_props = Symbol[]
        return Component("dl_videooverlay", "VideoOverlay", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_videooverlay(children::Any; kwargs...) = dl_videooverlay(;kwargs..., children = children)
dl_videooverlay(children_maker::Function; kwargs...) = dl_videooverlay(children_maker(); kwargs...)

