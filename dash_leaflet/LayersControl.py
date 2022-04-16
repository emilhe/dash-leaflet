# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class LayersControl(Component):
    """A LayersControl component.


Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    Attribution.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- baseLayer (string; optional):
    Name of the currently selected base layer.

- className (string; optional):
    A custom class name. Empty by default.

- collapsed (boolean; optional):
    Collapsed.

- overlays (list of strings; optional):
    Names of the currently selected overlays.

- position (a value equal to: 'topleft', 'topright', 'bottomleft', 'bottomright'; optional):
    Position."""
    @_explicitize_args
    def __init__(self, children=None, collapsed=Component.UNDEFINED, position=Component.UNDEFINED, className=Component.UNDEFINED, id=Component.UNDEFINED, baseLayer=Component.UNDEFINED, overlays=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'baseLayer', 'className', 'collapsed', 'overlays', 'position']
        self._type = 'LayersControl'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'baseLayer', 'className', 'collapsed', 'overlays', 'position']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(LayersControl, self).__init__(children=children, **args)
