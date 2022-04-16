# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class PolylineDecorator(Component):
    """A PolylineDecorator component.
Polyline is a wrapper of Polyline in react-leaflet.
It takes similar properties to its react-leaflet counterpart.

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    The children of this component. If positions are not specified, an
    attempt is made to read them from the children property. In this
    case, the children must be a single PolyLine or a single Polygon.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- patterns (list of dicts; optional):
    List of patterns to be added.

    `patterns` is a list of dicts with keys:

    - arrowHead (dict; optional)

        `arrowHead` is a dict with keys:

        - headAngle (number; optional)

        - pathOptions (dict; optional)

        - pixelSize (number; optional)

        - polygon (boolean; optional)

    - dash (dict; optional)

        `dash` is a dict with keys:

        - pathOptions (dict; optional)

        - pixelSize (number; optional)

    - endOffset (string; optional)

    - marker (dict; optional)

        `marker` is a dict with keys:

        - markerOptions (dict; optional)

        - rotate (boolean; optional)

    - offset (string; optional)

    - repeat (string; optional)

- positions (list of list of numberss | list of list of list of numbersss; optional):
    An array of geographical points (lat, lon)."""
    @_explicitize_args
    def __init__(self, children=None, positions=Component.UNDEFINED, patterns=Component.UNDEFINED, id=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'patterns', 'positions']
        self._type = 'PolylineDecorator'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'patterns', 'positions']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(PolylineDecorator, self).__init__(children=children, **args)
