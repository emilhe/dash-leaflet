# AUTO GENERATED FILE - DO NOT EDIT

export dl_map

"""
    dl_map(;kwargs...)
    dl_map(children::Any;kwargs...)
    dl_map(children_maker::Function;kwargs...)


A Map component.
Map is a wrapper of Map in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component (dynamic)
- `animate` (Bool; optional): If true, panning will always be animated if possible. If false, it will not
animate panning, either resetting the map view if panning more than a screen
away, or just setting a new offset for the map pane (except for panBy which
always does the latter).
- `duration` (Real; optional): Duration of animated panning, in seconds.
- `easeLinearity` (Real; optional): Easing of the inertia
- `noMoveStart` (Bool; optional): If true, panning won't fire movestart event on start (used internally for panning
inertia).
- `bounds` (Array of Array of Realss; optional): Sets a map view that contains the given geographical bounds with the maximum zoom
level possible.
- `boundsOptions` (Dict; optional): Object with the following entries:

paddingTopLeft: Sets the amount of padding in the top left corner of a map container
                that shouldn't be accounted for when setting the view to fit bounds.
                Useful if you have some control overlays on the map like a sidebar
                and you don't want them to obscure objects you're zooming to.
paddingBottomRight: The same for the bottom right corner of the map.
padding: Equivalent of setting both top left and bottom right padding to the same value.
maxZoom: The maximum possible zoom to use.
- `boxZoom` (Bool; optional): Whether the map can be zoomed to a rectangular area specified by dragging
the mouse while pressing the shift key.
- `center` (Array of Reals; optional): Sets the geographic center of the map
- `doubleClickZoom` (Bool | String; optional): Whether the map can be zoomed in by double clicking on it and zoomed out by
double clicking while holding shift. If passed 'center', double-click zoom
will zoom to the center of the view regardless of where the mouse was.
Defaults to true.
- `dragging` (Bool; optional): Whether the map be draggable with mouse/touch or not.
- `keyboard` (Bool; optional): Makes the map focusable and allows users to navigate the map with keyboard
arrows and +/- keys.
- `maxBounds` (Array of Array of Realss; optional): When this option is set, the map restricts the view to the given geographical bounds,
bouncing the user back if the user tries to pan outside the view. To set the
restriction dynamically, use setMaxBounds method.
- `scrollWheelZoom` (Bool | String; optional): Whether the map can be zoomed by using the mouse wheel. If passed 'center',
it will zoom to the center of the view regardless of where the mouse was.
- `useFlyTo` (Bool; optional): Boolean to control whether to use flyTo functions for bounds and center.
If false map.fitBounds and map.setView will be used. If true map.flyToBounds
and map.flyTo will be used. Defaults to false.
- `tap` (Bool; optional): Enables mobile hacks for supporting instant taps (fixing 200ms click delay on
iOS/Android) and touch holds (fired as contextmenu events).
- `touchZoom` (Dict; optional): Whether the map can be zoomed by touch-dragging with two fingers. If passed
'center', it will zoom to the center of the view regardless of where the touch
events (fingers) were. Enabled for touch-capable web browsers except for old
Androids.
- `viewport` (Dict; optional): Sets the viewport, which is an object containing 'center' and 'zoom'.
- `zoom` (Real; optional): Sets the map zoom level
- `preferCanvas` (Bool; optional): Whether Paths should be rendered on a Canvas renderer. By default,
all Paths are rendered in a SVG renderer.
- `attributionControl` (Bool; optional): Whether a attribution control is added to the map by default.
- `zoomControl` (Bool; optional): Whether a zoom control is added to the map by default.
- `closePopupOnClick` (Bool; optional): Set it to false if you don't want popups to close when user clicks the map.
- `zoomSnap` (Real; optional): Forces the map's zoom level to always be a multiple of this, particularly
right after a fitBounds() or a pinch-zoom. By default, the zoom level
snaps to the nearest integer; lower values (e.g. 0.5 or 0.1) allow for
greater granularity. A value of 0 means the zoom level will not be snapped
after fitBounds or a pinch-zoom.
- `zoomDelta` (Real; optional): Controls how much the map's zoom level will change after a zoomIn(),
zoomOut(), pressing + or - on the keyboard, or using the zoom controls.
Values smaller than 1 (e.g. 0.5) allow for greater granularity.
- `trackResize` (Bool; optional): Whether the map automatically handles browser window resize to update itself.
- `crs` (a value equal to: "EPSG3395", "EPSG3857", "EPSG4326", "Earth", "Simple", "Base"; optional): The Coordinate Reference System to use. Don't change this if you're not sure
what it means. Set the crs property to one of these strings to use the corresponding Leaflet CRS object
- `minZoom` (Real; optional): Minimum zoom level of the map. If not specified and at least one GridLayer or
TileLayer is in the map, the lowest of their minZoom options will be used instead.
- `maxZoom` (Real; optional): Maximum zoom level of the map. If not specified and at least one GridLayer or
TileLayer is in the map, the highest of their maxZoom options will be used instead.
- `renderer` (Dict; optional): The default method for drawing vector layers on the map. L.SVG or L.Canvas by default
depending on browser support.
- `zoomAnimation` (Bool; optional): Whether the map zoom animation is enabled. By default it's enabled in all browsers
that support CSS3 Transitions except Android.
- `zoomAnimationThreshold` (Real; optional): Won't animate zoom if the zoom difference exceeds this value.
- `fadeAnimation` (Bool; optional): Whether the tile fade animation is enabled. By default it's enabled in all browsers
that support CSS3 Transitions except Android.
- `markerZoomAnimation` (Bool; optional): Whether markers animate their zoom with the zoom animation, if disabled they will
disappear for the length of the animation. By default it's enabled in all browsers
that support CSS3 Transitions except Android.
- `transform3DLimit` (Real; optional): Defines the maximum size of a CSS translation transform. The default value should
not be changed unless a web browser positions layers in the wrong place after doing
a large panBy.
- `inertia` (Bool; optional): If enabled, panning of the map will have an inertia effect where the map builds
momentum while dragging and continues moving in the same direction for some time.
Feels especially nice on touch devices. Enabled by default unless running on old
Android devices.
- `inertiaDeceleration` (Real; optional): The rate with which the inertial movement slows down, in pixels/second.
- `inertiaMaxSpeed` (Real; optional): Max speed of the inertial movement, in pixels/second.
- `worldCopyJump` (Bool; optional): With this option enabled, the map tracks when you pan to another "copy" of
the world and seamlessly jumps to the original one so that all overlays like
markers and vector layers are still visible.
- `maxBoundsViscosity` (Real; optional): If maxBounds is set, this option will control how solid the bounds are when
dragging the map around. The default value of 0.0 allows the user to drag
outside the bounds at normal speed, higher values will slow down map dragging
outside bounds, and 1.0 makes the bounds fully solid, preventing the user from
dragging outside the bounds.
- `keyboardPanDelta` (Real; optional): Amount of pixels to pan when pressing an arrow key.
- `wheelDebounceTime` (Real; optional): Limits the rate at which a wheel can fire (in milliseconds). By default user
can't zoom via wheel more often than once per 40 ms.
- `wheelPxPerZoomLevel` (Real; optional): How many scroll pixels (as reported by L.DomEvent.getWheelDelta) mean a change
of one full zoom level. Smaller values will make wheel-zooming faster (and vice
versa).
- `tapTolerance` (Real; optional): The max number of pixels a user can shift his finger during touch for it to
be considered a valid tap.
- `bounceAtZoomLimits` (Bool; optional): Set it to false if you don't want the map to zoom beyond min/max zoom and then
bounce back when pinch-zooming.
- `id` (String; optional): The ID used to identify this component in Dash callbacks (dynamic)
- `style` (Dict; optional): The CSS style of the component (dynamic)
- `className` (String; optional): The class name of the component (dynamic)
- `attribution` (String; optional): The attribution string for the component (dynamic)
- `click_lat_lng` (Array of Reals; optional): Dash callback property. Receives [lat, lng] upon click.
- `dbl_click_lat_lng` (Array of Reals; optional): Dash callback property. Receives [lat, lng] upon double click.
- `location_lat_lon_acc` (Array of Reals; optional): Dash callback property. Receives [lat, lng, accuracy] when user location is found.
"""
function dl_map(; kwargs...)
        available_props = Symbol[:children, :animate, :duration, :easeLinearity, :noMoveStart, :bounds, :boundsOptions, :boxZoom, :center, :doubleClickZoom, :dragging, :keyboard, :maxBounds, :scrollWheelZoom, :useFlyTo, :tap, :touchZoom, :viewport, :zoom, :preferCanvas, :attributionControl, :zoomControl, :closePopupOnClick, :zoomSnap, :zoomDelta, :trackResize, :crs, :minZoom, :maxZoom, :renderer, :zoomAnimation, :zoomAnimationThreshold, :fadeAnimation, :markerZoomAnimation, :transform3DLimit, :inertia, :inertiaDeceleration, :inertiaMaxSpeed, :worldCopyJump, :maxBoundsViscosity, :keyboardPanDelta, :wheelDebounceTime, :wheelPxPerZoomLevel, :tapTolerance, :bounceAtZoomLimits, :id, :style, :className, :attribution, :click_lat_lng, :dbl_click_lat_lng, :location_lat_lon_acc]
        wild_props = Symbol[]
        return Component("dl_map", "Map", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_map(children::Any; kwargs...) = dl_map(;kwargs..., children = children)
dl_map(children_maker::Function; kwargs...) = dl_map(children_maker(); kwargs...)

