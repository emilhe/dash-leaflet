# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Map(Component):
    """A Map component.
Map is a wrapper of Map in react-leaflet.
It takes similar properties to its react-leaflet counterpart.

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    The children of this component (dynamic).

- id (string; optional):
    The ID used to identify this component in Dash callbacks
    (dynamic).

- animate (boolean; optional):
    If True, panning will always be animated if possible. If False, it
    will not animate panning, either resetting the map view if panning
    more than a screen away, or just setting a new offset for the map
    pane (except for panBy which always does the latter).

- attribution (string; optional):
    The attribution string for the component (dynamic).

- attributionControl (boolean; optional):
    Whether a attribution control is added to the map by default.

- bounceAtZoomLimits (boolean; optional):
    Set it to False if you don't want the map to zoom beyond min/max
    zoom and then bounce back when pinch-zooming.

- bounds (list of list of numberss; optional):
    Sets a map view that contains the given geographical bounds with
    the maximum zoom level possible.

- boundsOptions (dict; optional):
    Object with the following entries:  paddingTopLeft: Sets the
    amount of padding in the top left corner of a map container
    that shouldn't be accounted for when setting the view to fit
    bounds.                 Useful if you have some control overlays
    on the map like a sidebar                 and you don't want them
    to obscure objects you're zooming to. paddingBottomRight: The same
    for the bottom right corner of the map. padding: Equivalent of
    setting both top left and bottom right padding to the same value.
    maxZoom: The maximum possible zoom to use.

- boxZoom (boolean; optional):
    Whether the map can be zoomed to a rectangular area specified by
    dragging the mouse while pressing the shift key.

- center (list of numbers; default [56, 10]):
    Sets the geographic center of the map.

- className (string; optional):
    The class name of the component (dynamic).

- click_lat_lng (list of numbers; optional):
    Dash callback property. Receives [lat, lng] upon click.

- closePopupOnClick (boolean; optional):
    Set it to False if you don't want popups to close when user clicks
    the map.

- crs (a value equal to: "EPSG3395", "EPSG3857", "EPSG4326", "Earth", "Simple", "Base"; default "EPSG3857"):
    The Coordinate Reference System to use. Don't change this if
    you're not sure what it means. Set the crs property to one of
    these strings to use the corresponding Leaflet CRS object.

- dbl_click_lat_lng (list of numbers; optional):
    Dash callback property. Receives [lat, lng] upon double click.

- doubleClickZoom (boolean | string; optional):
    Whether the map can be zoomed in by double clicking on it and
    zoomed out by double clicking while holding shift. If passed
    'center', double-click zoom will zoom to the center of the view
    regardless of where the mouse was. Defaults to True.

- dragging (boolean; optional):
    Whether the map be draggable with mouse/touch or not.

- duration (number; optional):
    Duration of animated panning, in seconds.

- easeLinearity (number; optional):
    Easing of the inertia.

- fadeAnimation (boolean; optional):
    Whether the tile fade animation is enabled. By default it's
    enabled in all browsers that support CSS3 Transitions except
    Android.

- inertia (boolean; optional):
    If enabled, panning of the map will have an inertia effect where
    the map builds momentum while dragging and continues moving in the
    same direction for some time. Feels especially nice on touch
    devices. Enabled by default unless running on old Android devices.

- inertiaDeceleration (number; optional):
    The rate with which the inertial movement slows down, in
    pixels/second.

- inertiaMaxSpeed (number; optional):
    Max speed of the inertial movement, in pixels/second.

- keyboard (boolean; optional):
    Makes the map focusable and allows users to navigate the map with
    keyboard arrows and +/- keys.

- keyboardPanDelta (number; optional):
    Amount of pixels to pan when pressing an arrow key.

- location_lat_lon_acc (list of numbers; optional):
    Dash callback property. Receives [lat, lng, accuracy] when user
    location is found.

- markerZoomAnimation (boolean; optional):
    Whether markers animate their zoom with the zoom animation, if
    disabled they will disappear for the length of the animation. By
    default it's enabled in all browsers that support CSS3 Transitions
    except Android.

- maxBounds (list of list of numberss; optional):
    When this option is set, the map restricts the view to the given
    geographical bounds, bouncing the user back if the user tries to
    pan outside the view. To set the restriction dynamically, use
    setMaxBounds method.

- maxBoundsViscosity (number; optional):
    If maxBounds is set, this option will control how solid the bounds
    are when dragging the map around. The default value of 0.0 allows
    the user to drag outside the bounds at normal speed, higher values
    will slow down map dragging outside bounds, and 1.0 makes the
    bounds fully solid, preventing the user from dragging outside the
    bounds.

- maxZoom (number; optional):
    Maximum zoom level of the map. If not specified and at least one
    GridLayer or TileLayer is in the map, the highest of their maxZoom
    options will be used instead.

- minZoom (number; optional):
    Minimum zoom level of the map. If not specified and at least one
    GridLayer or TileLayer is in the map, the lowest of their minZoom
    options will be used instead.

- noMoveStart (boolean; optional):
    If True, panning won't fire movestart event on start (used
    internally for panning inertia).

- preferCanvas (boolean; optional):
    Whether Paths should be rendered on a Canvas renderer. By default,
    all Paths are rendered in a SVG renderer.

- renderer (dict; optional):
    The default method for drawing vector layers on the map. L.SVG or
    L.Canvas by default depending on browser support.

- scrollWheelZoom (boolean | string; optional):
    Whether the map can be zoomed by using the mouse wheel. If passed
    'center', it will zoom to the center of the view regardless of
    where the mouse was.

- style (dict; default {'width': "100%", 'height': "100%", "position": "relative"}):
    The CSS style of the component (dynamic).

- tap (boolean; optional):
    Enables mobile hacks for supporting instant taps (fixing 200ms
    click delay on iOS/Android) and touch holds (fired as contextmenu
    events).

- tapTolerance (number; optional):
    The max number of pixels a user can shift his finger during touch
    for it to be considered a valid tap.

- touchZoom (dict; optional):
    Whether the map can be zoomed by touch-dragging with two fingers.
    If passed 'center', it will zoom to the center of the view
    regardless of where the touch events (fingers) were. Enabled for
    touch-capable web browsers except for old Androids.

- trackResize (boolean; optional):
    Whether the map automatically handles browser window resize to
    update itself.

- transform3DLimit (number; optional):
    Defines the maximum size of a CSS translation transform. The
    default value should not be changed unless a web browser positions
    layers in the wrong place after doing a large panBy.

- useFlyTo (boolean; optional):
    Boolean to control whether to use flyTo functions for bounds and
    center. If False map.fitBounds and map.setView will be used. If
    True map.flyToBounds and map.flyTo will be used. Defaults to
    False.

- viewport (dict; optional):
    Sets the viewport, which is an object containing 'center' and
    'zoom'.

- wheelDebounceTime (number; optional):
    Limits the rate at which a wheel can fire (in milliseconds). By
    default user can't zoom via wheel more often than once per 40 ms.

- wheelPxPerZoomLevel (number; optional):
    How many scroll pixels (as reported by L.DomEvent.getWheelDelta)
    mean a change of one full zoom level. Smaller values will make
    wheel-zooming faster (and vice versa).

- worldCopyJump (boolean; optional):
    With this option enabled, the map tracks when you pan to another
    \"copy\" of the world and seamlessly jumps to the original one so
    that all overlays like markers and vector layers are still
    visible.

- zoom (number; default 6):
    Sets the map zoom level.

- zoomAnimation (boolean; optional):
    Whether the map zoom animation is enabled. By default it's enabled
    in all browsers that support CSS3 Transitions except Android.

- zoomAnimationThreshold (number; optional):
    Won't animate zoom if the zoom difference exceeds this value.

- zoomControl (boolean; optional):
    Whether a zoom control is added to the map by default.

- zoomDelta (number; optional):
    Controls how much the map's zoom level will change after a
    zoomIn(), zoomOut(), pressing + or - on the keyboard, or using the
    zoom controls. Values smaller than 1 (e.g. 0.5) allow for greater
    granularity.

- zoomSnap (number; optional):
    Forces the map's zoom level to always be a multiple of this,
    particularly right after a fitBounds() or a pinch-zoom. By
    default, the zoom level snaps to the nearest integer; lower values
    (e.g. 0.5 or 0.1) allow for greater granularity. A value of 0
    means the zoom level will not be snapped after fitBounds or a
    pinch-zoom."""
    @_explicitize_args
    def __init__(self, children=None, animate=Component.UNDEFINED, duration=Component.UNDEFINED, easeLinearity=Component.UNDEFINED, noMoveStart=Component.UNDEFINED, bounds=Component.UNDEFINED, boundsOptions=Component.UNDEFINED, boxZoom=Component.UNDEFINED, center=Component.UNDEFINED, doubleClickZoom=Component.UNDEFINED, dragging=Component.UNDEFINED, keyboard=Component.UNDEFINED, maxBounds=Component.UNDEFINED, scrollWheelZoom=Component.UNDEFINED, useFlyTo=Component.UNDEFINED, tap=Component.UNDEFINED, touchZoom=Component.UNDEFINED, viewport=Component.UNDEFINED, zoom=Component.UNDEFINED, preferCanvas=Component.UNDEFINED, attributionControl=Component.UNDEFINED, zoomControl=Component.UNDEFINED, closePopupOnClick=Component.UNDEFINED, zoomSnap=Component.UNDEFINED, zoomDelta=Component.UNDEFINED, trackResize=Component.UNDEFINED, crs=Component.UNDEFINED, minZoom=Component.UNDEFINED, maxZoom=Component.UNDEFINED, renderer=Component.UNDEFINED, zoomAnimation=Component.UNDEFINED, zoomAnimationThreshold=Component.UNDEFINED, fadeAnimation=Component.UNDEFINED, markerZoomAnimation=Component.UNDEFINED, transform3DLimit=Component.UNDEFINED, inertia=Component.UNDEFINED, inertiaDeceleration=Component.UNDEFINED, inertiaMaxSpeed=Component.UNDEFINED, worldCopyJump=Component.UNDEFINED, maxBoundsViscosity=Component.UNDEFINED, keyboardPanDelta=Component.UNDEFINED, wheelDebounceTime=Component.UNDEFINED, wheelPxPerZoomLevel=Component.UNDEFINED, tapTolerance=Component.UNDEFINED, bounceAtZoomLimits=Component.UNDEFINED, id=Component.UNDEFINED, style=Component.UNDEFINED, className=Component.UNDEFINED, attribution=Component.UNDEFINED, click_lat_lng=Component.UNDEFINED, dbl_click_lat_lng=Component.UNDEFINED, location_lat_lon_acc=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'animate', 'attribution', 'attributionControl', 'bounceAtZoomLimits', 'bounds', 'boundsOptions', 'boxZoom', 'center', 'className', 'click_lat_lng', 'closePopupOnClick', 'crs', 'dbl_click_lat_lng', 'doubleClickZoom', 'dragging', 'duration', 'easeLinearity', 'fadeAnimation', 'inertia', 'inertiaDeceleration', 'inertiaMaxSpeed', 'keyboard', 'keyboardPanDelta', 'location_lat_lon_acc', 'markerZoomAnimation', 'maxBounds', 'maxBoundsViscosity', 'maxZoom', 'minZoom', 'noMoveStart', 'preferCanvas', 'renderer', 'scrollWheelZoom', 'style', 'tap', 'tapTolerance', 'touchZoom', 'trackResize', 'transform3DLimit', 'useFlyTo', 'viewport', 'wheelDebounceTime', 'wheelPxPerZoomLevel', 'worldCopyJump', 'zoom', 'zoomAnimation', 'zoomAnimationThreshold', 'zoomControl', 'zoomDelta', 'zoomSnap']
        self._type = 'Map'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'animate', 'attribution', 'attributionControl', 'bounceAtZoomLimits', 'bounds', 'boundsOptions', 'boxZoom', 'center', 'className', 'click_lat_lng', 'closePopupOnClick', 'crs', 'dbl_click_lat_lng', 'doubleClickZoom', 'dragging', 'duration', 'easeLinearity', 'fadeAnimation', 'inertia', 'inertiaDeceleration', 'inertiaMaxSpeed', 'keyboard', 'keyboardPanDelta', 'location_lat_lon_acc', 'markerZoomAnimation', 'maxBounds', 'maxBoundsViscosity', 'maxZoom', 'minZoom', 'noMoveStart', 'preferCanvas', 'renderer', 'scrollWheelZoom', 'style', 'tap', 'tapTolerance', 'touchZoom', 'trackResize', 'transform3DLimit', 'useFlyTo', 'viewport', 'wheelDebounceTime', 'wheelPxPerZoomLevel', 'worldCopyJump', 'zoom', 'zoomAnimation', 'zoomAnimationThreshold', 'zoomControl', 'zoomDelta', 'zoomSnap']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(Map, self).__init__(children=children, **args)
