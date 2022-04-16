# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DivMarker(Component):
    """A DivMarker component.
Marker is a wrapper of Marker in react-leaflet.
It takes similar properties to its react-leaflet counterpart.

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    The children of this component.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- alt (string; optional):
    Text for the alt attribute of the icon image (useful for
    accessibility).

- attribution (string; optional):
    The attribution string for the component.

- autoPan (boolean; optional):
    Whether to pan the map when dragging this marker near its edge or
    not.

- autoPanPadding (dict; optional):
    Distance (in pixels to the left/right and to the top/bottom) of
    the map edge to start panning the map.

- autoPanSpeed (number; optional):
    Number of pixels the map should pan by.

- bubblingMouseEvents (boolean; optional):
    When True, a mouse event on this marker will trigger the same
    event on the map (unless L.DomEvent.stopPropagation is used).

- draggable (boolean; optional):
    Whether the marker is draggable with mouse/touch or not.

- iconOptions (dict; optional):
    Options passed to DivIcon constructor.

    `iconOptions` is a dict with keys:

    - className (string; optional)

    - html (string; optional)

    - iconAnchor (list of numbers; optional)

    - iconSize (list of numbers; optional)

    - popupAnchor (list of numbers; optional)

- interactive (boolean; optional):
    If False, the layer will not emit mouse events and will act as a
    part of the underlying map.

- keyboard (boolean; optional):
    Whether the marker can be tabbed to with a keyboard and clicked by
    pressing enter.

- n_clicks (number; default 0):
    Dash callback property. Number of times the object has been
    clicked.

- opacity (number; optional):
    The opacity of the marker.

- pane (string; optional):
    The leaflet pane of the component.

- position (list of numbers; required):
    A geographical point (lat, lon).

- riseOffset (number; optional):
    The z-index offset used for the riseOnHover feature.

- riseOnHover (boolean; optional):
    If True, the marker will get on top of others when you hover the
    mouse over it.

- title (string; optional):
    Text for the browser tooltip that appear on marker hover (no
    tooltip by default).

- zIndexOffset (number; optional):
    By default, marker images zIndex is set automatically based on its
    latitude. Use this option if you want to put the marker on top of
    all others (or below), specifying a high value like 1000 (or high
    negative value, respectively)."""
    @_explicitize_args
    def __init__(self, children=None, position=Component.REQUIRED, iconOptions=Component.UNDEFINED, draggable=Component.UNDEFINED, opacity=Component.UNDEFINED, zIndexOffset=Component.UNDEFINED, keyboard=Component.UNDEFINED, title=Component.UNDEFINED, alt=Component.UNDEFINED, riseOnHover=Component.UNDEFINED, riseOffset=Component.UNDEFINED, bubblingMouseEvents=Component.UNDEFINED, autoPan=Component.UNDEFINED, autoPanPadding=Component.UNDEFINED, autoPanSpeed=Component.UNDEFINED, interactive=Component.UNDEFINED, id=Component.UNDEFINED, pane=Component.UNDEFINED, attribution=Component.UNDEFINED, n_clicks=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'alt', 'attribution', 'autoPan', 'autoPanPadding', 'autoPanSpeed', 'bubblingMouseEvents', 'draggable', 'iconOptions', 'interactive', 'keyboard', 'n_clicks', 'opacity', 'pane', 'position', 'riseOffset', 'riseOnHover', 'title', 'zIndexOffset']
        self._type = 'DivMarker'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'alt', 'attribution', 'autoPan', 'autoPanPadding', 'autoPanSpeed', 'bubblingMouseEvents', 'draggable', 'iconOptions', 'interactive', 'keyboard', 'n_clicks', 'opacity', 'pane', 'position', 'riseOffset', 'riseOnHover', 'title', 'zIndexOffset']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in ['position']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(DivMarker, self).__init__(children=children, **args)
