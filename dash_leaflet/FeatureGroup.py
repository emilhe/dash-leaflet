# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class FeatureGroup(Component):
    """A FeatureGroup component.
FeatureGroup is a wrapper of FeatureGroup in react-leaflet.
It takes similar properties to its react-leaflet counterpart.

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    Children.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- attribution (string; optional):
    Attribution.

- className (string; optional):
    A custom class name. Empty by default."""
    @_explicitize_args
    def __init__(self, children=None, attribution=Component.UNDEFINED, className=Component.UNDEFINED, id=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'attribution', 'className']
        self._type = 'FeatureGroup'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'attribution', 'className']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(FeatureGroup, self).__init__(children=children, **args)
