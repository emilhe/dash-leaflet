# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class BaseLayer(Component):
    """A BaseLayer component.
BaseLayer is a wrapper of LayersControl.BaseLayer in react-leaflet.
It takes similar properties to its react-leaflet counterpart.

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    Attribution.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- checked (boolean; optional):
    Checked.

- name (string; optional):
    Name."""
    @_explicitize_args
    def __init__(self, children=None, checked=Component.UNDEFINED, name=Component.UNDEFINED, id=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'checked', 'name']
        self._type = 'BaseLayer'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'checked', 'name']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(BaseLayer, self).__init__(children=children, **args)
