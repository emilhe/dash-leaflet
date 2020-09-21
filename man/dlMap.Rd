% Auto-generated: do not edit by hand
\name{dlMap}

\alias{dlMap}

\title{Map component}

\description{
Map is a wrapper of Map in react-leaflet. It takes similar properties to its react-leaflet counterpart.
}

\usage{
dlMap(children=NULL, animate=NULL, duration=NULL,
easeLinearity=NULL, noMoveStart=NULL, bounds=NULL,
boundsOptions=NULL, boxZoom=NULL, center=NULL,
doubleClickZoom=NULL, dragging=NULL, keyboard=NULL,
maxBounds=NULL, scrollWheelZoom=NULL, useFlyTo=NULL,
tap=NULL, touchZoom=NULL, viewport=NULL, zoom=NULL,
preferCanvas=NULL, attributionControl=NULL,
zoomControl=NULL, closePopupOnClick=NULL, zoomSnap=NULL,
zoomDelta=NULL, trackResize=NULL, crs=NULL, minZoom=NULL,
maxZoom=NULL, renderer=NULL, zoomAnimation=NULL,
zoomAnimationThreshold=NULL, fadeAnimation=NULL,
markerZoomAnimation=NULL, transform3DLimit=NULL,
inertia=NULL, inertiaDeceleration=NULL,
inertiaMaxSpeed=NULL, worldCopyJump=NULL,
maxBoundsViscosity=NULL, keyboardPanDelta=NULL,
wheelDebounceTime=NULL, wheelPxPerZoomLevel=NULL,
tapTolerance=NULL, bounceAtZoomLimits=NULL, id=NULL,
style=NULL, className=NULL, attribution=NULL,
click_lat_lng=NULL, dbl_click_lat_lng=NULL,
location_lat_lon_acc=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component (dynamic)}

\item{animate}{Logical. If true, panning will always be animated if possible. If false, it will not
animate panning, either resetting the map view if panning more than a screen
away, or just setting a new offset for the map pane (except for panBy which
always does the latter).}

\item{duration}{Numeric. Duration of animated panning, in seconds.}

\item{easeLinearity}{Numeric. Easing of the inertia}

\item{noMoveStart}{Logical. If true, panning won't fire movestart event on start (used internally for panning
inertia).}

\item{bounds}{List of list of numericss. Sets a map view that contains the given geographical bounds with the maximum zoom
level possible.}

\item{boundsOptions}{Named list. Object with the following entries:

paddingTopLeft: Sets the amount of padding in the top left corner of a map container
                that shouldn't be accounted for when setting the view to fit bounds.
                Useful if you have some control overlays on the map like a sidebar
                and you don't want them to obscure objects you're zooming to.
paddingBottomRight: The same for the bottom right corner of the map.
padding: Equivalent of setting both top left and bottom right padding to the same value.
maxZoom: The maximum possible zoom to use.}

\item{boxZoom}{Logical. Whether the map can be zoomed to a rectangular area specified by dragging
the mouse while pressing the shift key.}

\item{center}{List of numerics. Sets the geographic center of the map}

\item{doubleClickZoom}{Logical | character. Whether the map can be zoomed in by double clicking on it and zoomed out by
double clicking while holding shift. If passed 'center', double-click zoom
will zoom to the center of the view regardless of where the mouse was.
Defaults to true.}

\item{dragging}{Logical. Whether the map be draggable with mouse/touch or not.}

\item{keyboard}{Logical. Makes the map focusable and allows users to navigate the map with keyboard
arrows and +/- keys.}

\item{maxBounds}{List of list of numericss. When this option is set, the map restricts the view to the given geographical bounds,
bouncing the user back if the user tries to pan outside the view. To set the
restriction dynamically, use setMaxBounds method.}

\item{scrollWheelZoom}{Logical | character. Whether the map can be zoomed by using the mouse wheel. If passed 'center',
it will zoom to the center of the view regardless of where the mouse was.}

\item{useFlyTo}{Logical. Boolean to control whether to use flyTo functions for bounds and center.
If false map.fitBounds and map.setView will be used. If true map.flyToBounds
and map.flyTo will be used. Defaults to false.}

\item{tap}{Logical. Enables mobile hacks for supporting instant taps (fixing 200ms click delay on
iOS/Android) and touch holds (fired as contextmenu events).}

\item{touchZoom}{Named list. Whether the map can be zoomed by touch-dragging with two fingers. If passed
'center', it will zoom to the center of the view regardless of where the touch
events (fingers) were. Enabled for touch-capable web browsers except for old
Androids.}

\item{viewport}{Named list. Sets the viewport, which is an object containing 'center' and 'zoom'.}

\item{zoom}{Numeric. Sets the map zoom level}

\item{preferCanvas}{Logical. Whether Paths should be rendered on a Canvas renderer. By default,
all Paths are rendered in a SVG renderer.}

\item{attributionControl}{Logical. Whether a attribution control is added to the map by default.}

\item{zoomControl}{Logical. Whether a zoom control is added to the map by default.}

\item{closePopupOnClick}{Logical. Set it to false if you don't want popups to close when user clicks the map.}

\item{zoomSnap}{Numeric. Forces the map's zoom level to always be a multiple of this, particularly
right after a fitBounds() or a pinch-zoom. By default, the zoom level
snaps to the nearest integer; lower values (e.g. 0.5 or 0.1) allow for
greater granularity. A value of 0 means the zoom level will not be snapped
after fitBounds or a pinch-zoom.}

\item{zoomDelta}{Numeric. Controls how much the map's zoom level will change after a zoomIn(),
zoomOut(), pressing + or - on the keyboard, or using the zoom controls.
Values smaller than 1 (e.g. 0.5) allow for greater granularity.}

\item{trackResize}{Logical. Whether the map automatically handles browser window resize to update itself.}

\item{crs}{A value equal to: "epsg3395", "epsg3857", "epsg4326", "earth", "simple", "base". The Coordinate Reference System to use. Don't change this if you're not sure
what it means. Set the crs property to one of these strings to use the corresponding Leaflet CRS object}

\item{minZoom}{Numeric. Minimum zoom level of the map. If not specified and at least one GridLayer or
TileLayer is in the map, the lowest of their minZoom options will be used instead.}

\item{maxZoom}{Numeric. Maximum zoom level of the map. If not specified and at least one GridLayer or
TileLayer is in the map, the highest of their maxZoom options will be used instead.}

\item{renderer}{Named list. The default method for drawing vector layers on the map. L.SVG or L.Canvas by default
depending on browser support.}

\item{zoomAnimation}{Logical. Whether the map zoom animation is enabled. By default it's enabled in all browsers
that support CSS3 Transitions except Android.}

\item{zoomAnimationThreshold}{Numeric. Won't animate zoom if the zoom difference exceeds this value.}

\item{fadeAnimation}{Logical. Whether the tile fade animation is enabled. By default it's enabled in all browsers
that support CSS3 Transitions except Android.}

\item{markerZoomAnimation}{Logical. Whether markers animate their zoom with the zoom animation, if disabled they will
disappear for the length of the animation. By default it's enabled in all browsers
that support CSS3 Transitions except Android.}

\item{transform3DLimit}{Numeric. Defines the maximum size of a CSS translation transform. The default value should
not be changed unless a web browser positions layers in the wrong place after doing
a large panBy.}

\item{inertia}{Logical. If enabled, panning of the map will have an inertia effect where the map builds
momentum while dragging and continues moving in the same direction for some time.
Feels especially nice on touch devices. Enabled by default unless running on old
Android devices.}

\item{inertiaDeceleration}{Numeric. The rate with which the inertial movement slows down, in pixels/second.}

\item{inertiaMaxSpeed}{Numeric. Max speed of the inertial movement, in pixels/second.}

\item{worldCopyJump}{Logical. With this option enabled, the map tracks when you pan to another "copy" of
the world and seamlessly jumps to the original one so that all overlays like
markers and vector layers are still visible.}

\item{maxBoundsViscosity}{Numeric. If maxBounds is set, this option will control how solid the bounds are when
dragging the map around. The default value of 0.0 allows the user to drag
outside the bounds at normal speed, higher values will slow down map dragging
outside bounds, and 1.0 makes the bounds fully solid, preventing the user from
dragging outside the bounds.}

\item{keyboardPanDelta}{Numeric. Amount of pixels to pan when pressing an arrow key.}

\item{wheelDebounceTime}{Numeric. Limits the rate at which a wheel can fire (in milliseconds). By default user
can't zoom via wheel more often than once per 40 ms.}

\item{wheelPxPerZoomLevel}{Numeric. How many scroll pixels (as reported by L.DomEvent.getWheelDelta) mean a change
of one full zoom level. Smaller values will make wheel-zooming faster (and vice
versa).}

\item{tapTolerance}{Numeric. The max number of pixels a user can shift his finger during touch for it to
be considered a valid tap.}

\item{bounceAtZoomLimits}{Logical. Set it to false if you don't want the map to zoom beyond min/max zoom and then
bounce back when pinch-zooming.}

\item{id}{Character. The ID used to identify this component in Dash callbacks (dynamic)}

\item{style}{Named list. The CSS style of the component (dynamic)}

\item{className}{Character. The class name of the component (dynamic)}

\item{attribution}{Character. The attribution string for the component (dynamic)}

\item{click_lat_lng}{List of numerics. Dash callback property. Receives [lat, lng] upon click.}

\item{dbl_click_lat_lng}{List of numerics. Dash callback property. Receives [lat, lng] upon double click.}

\item{location_lat_lon_acc}{List of numerics. Dash callback property. Receives [lat, lng, accuracy] when user location is found.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

\examples{
if (interactive() && require(dash)) {
  library(dash)
  library(dashLeaflet)

  app <- Dash$new()

  app$layout(dlMap(
      dlTileLayer(),
      style = list(width = '1000px',
                   height = '500px')
      )
  )

  app$run_server()
}
}
