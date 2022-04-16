# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class TileLayer(Component):
    """A TileLayer component.
TileLayer is a wrapper of TileLayer in react-leaflet.
It takes similar properties to its react-leaflet counterpart.

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    The children of this component.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- attribution (string; optional):
    The attribution string for the component.

- bounds (list of numbers; optional):
    If set, tiles will only be loaded inside the set LatLngBounds.

- className (string; optional):
    A custom class name to assign to the tile layer. Empty by default.

- crossOrigin (boolean; optional):
    Whether the crossOrigin attribute will be added to the tiles. If
    a String is provided, all tiles will have its crossOrigin
    attribute  set to the String provided. This is needed if you want
    to access tile  pixel data. Refer to CORS Settings for valid
    String values.

- detectRetina (boolean; optional):
    If True and user is on a retina display, it will request four
    tiles of half  the specified size and a bigger zoom level in place
    of one to utilize the  high resolution.

- errorTileUrl (string; optional):
    URL to the tile image to show in place of the tile that failed to
    load.

- keepBuffer (number; optional):
    When panning the map, keep this many rows and columns of tiles
    before unloading them.

- maxNativeZoom (number; optional):
    Maximum zoom number the tile source has available. If it is
    specified, the tiles on all zoom levels higher than  maxNativeZoom
    will be loaded from maxNativeZoom level  and auto-scaled.

- maxZoom (number; optional):
    The maximum zoom level up to which this layer will be displayed
    (inclusive).

- minNativeZoom (number; optional):
    Minimum zoom number the tile source has available. If it  is
    specified, the tiles on all zoom levels lower than  minNativeZoom
    will be loaded from minNativeZoom level  and auto-scaled.

- minZoom (number; optional):
    The minimum zoom level down to which this layer will be displayed
    (inclusive).

- noWrap (boolean; optional):
    Whether the layer is wrapped around the antimeridian. If  True,
    the GridLayer will only be displayed once at low zoom  levels. Has
    no effect when the map CRS doesn't wrap around.  Can be used in
    combination with bounds to prevent requesting  tiles outside the
    CRS limits.

- opacity (number; optional):
    Opacity of the tiles. Can be used in the createTile() function.

- pane (string; optional):
    The leaflet pane of the component.

- subdomains (string; optional):
    Subdomains of the tile service. Can be passed in the form of one
    string  (where each letter is a subdomain name) or an array of
    strings.

- tileSize (number; optional):
    Width and height of tiles in the grid. Use a number if width and
    height are equal, or L.point(width, height) otherwise.

- tms (boolean; optional):
    If True, inverses Y axis numbering for tiles (turn this on for TMS
    services).

- updateInterval (number; optional):
    Tiles will not update more than once every updateInterval
    milliseconds when panning.

- updateWhenIdle (boolean; optional):
    Load new tiles only when panning ends. True by default on mobile
    browsers, in order to avoid too many requests and keep smooth
    navigation. False otherwise in order to display new tiles during
    panning, since it is easy to pan outside the keepBuffer option  in
    desktop browsers.

- updateWhenZooming (boolean; optional):
    By default, a smooth zoom animation (during a touch zoom or a
    flyTo()) will update grid layers every integer zoom level.
    Setting this option to False will update the grid layer only  when
    the smooth animation ends.

- url (string; default "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"):
    A URL template for the tile layer, ie. a string of the following
    form: 'http://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png' where
    {s} means one of the available subdomains (used sequentially to
    help with browser parallel requests per domain limitation;
    subdomain  values are specified in options; a, b or c by default,
    can be omitted),  {z} zoom level, {x} and {y} tile coordinates.
    {r} can be used to add \"@2x\" to the URL to load retina tiles.

- zIndex (number; optional):
    The explicit zIndex of the tile layer.

- zoomOffset (number; optional):
    The zoom number used in tile URLs will be offset with this value.

- zoomReverse (boolean; optional):
    If set to True, the zoom number used in tile URLs will be reversed
    (maxZoom - zoom instead of zoom)."""
    @_explicitize_args
    def __init__(self, children=None, url=Component.UNDEFINED, opacity=Component.UNDEFINED, zIndex=Component.UNDEFINED, minZoom=Component.UNDEFINED, maxZoom=Component.UNDEFINED, subdomains=Component.UNDEFINED, errorTileUrl=Component.UNDEFINED, zoomOffset=Component.UNDEFINED, tms=Component.UNDEFINED, zoomReverse=Component.UNDEFINED, detectRetina=Component.UNDEFINED, crossOrigin=Component.UNDEFINED, tileSize=Component.UNDEFINED, updateWhenIdle=Component.UNDEFINED, updateWhenZooming=Component.UNDEFINED, updateInterval=Component.UNDEFINED, bounds=Component.UNDEFINED, minNativeZoom=Component.UNDEFINED, maxNativeZoom=Component.UNDEFINED, noWrap=Component.UNDEFINED, className=Component.UNDEFINED, keepBuffer=Component.UNDEFINED, id=Component.UNDEFINED, pane=Component.UNDEFINED, attribution=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'attribution', 'bounds', 'className', 'crossOrigin', 'detectRetina', 'errorTileUrl', 'keepBuffer', 'maxNativeZoom', 'maxZoom', 'minNativeZoom', 'minZoom', 'noWrap', 'opacity', 'pane', 'subdomains', 'tileSize', 'tms', 'updateInterval', 'updateWhenIdle', 'updateWhenZooming', 'url', 'zIndex', 'zoomOffset', 'zoomReverse']
        self._type = 'TileLayer'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'attribution', 'bounds', 'className', 'crossOrigin', 'detectRetina', 'errorTileUrl', 'keepBuffer', 'maxNativeZoom', 'maxZoom', 'minNativeZoom', 'minZoom', 'noWrap', 'opacity', 'pane', 'subdomains', 'tileSize', 'tms', 'updateInterval', 'updateWhenIdle', 'updateWhenZooming', 'url', 'zIndex', 'zoomOffset', 'zoomReverse']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(TileLayer, self).__init__(children=children, **args)
