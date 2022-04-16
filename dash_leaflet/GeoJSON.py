# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class GeoJSON(Component):
    """A GeoJSON component.
LayerGroup is a wrapper of LayerGroup in react-leaflet.
It takes similar properties to its react-leaflet counterpart.

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    Children.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- click_feature (dict; optional):
    Last feature clicked.

- cluster (boolean; default False):
    If True, marker clustering will be performed.

- clusterToLayer (string | dict; optional):
    Function that determines how a cluster is drawn.

- data (dict | string; optional):
    Data (consider using url for better performance).

- format (a value equal to: "geojson", "geobuf"; default "geojson"):
    Data format.

- hideout (string | dict; optional):
    Object intended for passing variables to functional properties,
    i.e. clusterToLayer, hoverStyle and (options) pointToLayer, style,
    filter, and onEachFeature functions.

- hoverStyle (string | dict; optional):
    Style function applied on hover.

- hover_feature (dict; optional):
    Last feature hovered.

- n_clicks (number; default 0):
    Dash callback property. Number of times the object has been
    clicked.

- options (dict; optional):
    Options for the GeoJSON object (see
    https://leafletjs.com/reference-1.6.0.html#geojson-option for
    details).

- pane (string; optional):
    The leaflet pane of the component.

- spiderfyOnMaxZoom (boolean; default True):
    If True, markers that are not resolved at max zoom level will be
    spiderfied on click.

- superClusterOptions (dict; optional):
    Options for the SuperCluster object (see
    https://github.com/mapbox/supercluster for details).

- url (string; optional):
    Url to data (use instead of data for better performance).

- zoomToBounds (boolean; default False):
    If True, zoom bounds when data are set.

- zoomToBoundsOnClick (boolean; default False):
    If True, zoom to feature bounds on click."""
    @_explicitize_args
    def __init__(self, children=None, options=Component.UNDEFINED, data=Component.UNDEFINED, url=Component.UNDEFINED, format=Component.UNDEFINED, hoverStyle=Component.UNDEFINED, zoomToBoundsOnClick=Component.UNDEFINED, zoomToBounds=Component.UNDEFINED, hideout=Component.UNDEFINED, pane=Component.UNDEFINED, cluster=Component.UNDEFINED, clusterToLayer=Component.UNDEFINED, spiderfyOnMaxZoom=Component.UNDEFINED, superClusterOptions=Component.UNDEFINED, id=Component.UNDEFINED, n_clicks=Component.UNDEFINED, click_feature=Component.UNDEFINED, hover_feature=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'click_feature', 'cluster', 'clusterToLayer', 'data', 'format', 'hideout', 'hoverStyle', 'hover_feature', 'n_clicks', 'options', 'pane', 'spiderfyOnMaxZoom', 'superClusterOptions', 'url', 'zoomToBounds', 'zoomToBoundsOnClick']
        self._type = 'GeoJSON'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'click_feature', 'cluster', 'clusterToLayer', 'data', 'format', 'hideout', 'hoverStyle', 'hover_feature', 'n_clicks', 'options', 'pane', 'spiderfyOnMaxZoom', 'superClusterOptions', 'url', 'zoomToBounds', 'zoomToBoundsOnClick']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(GeoJSON, self).__init__(children=children, **args)
