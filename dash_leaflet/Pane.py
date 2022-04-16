# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Pane(Component):
    """A Pane component.
Pane is a wrapper of Pane in react-leaflet.
It takes similar properties to its react-leaflet counterpart.

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    The children of this component.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- className (string; optional):
    A custom class name to assign to the pane. Empty by default.

- name (string; optional):
    The pane name.

- pane (string; optional):
    The leaflet pane of the component.

- style (dict; optional):
    The CSS style of the component (dynamic)."""
    @_explicitize_args
    def __init__(self, children=None, name=Component.UNDEFINED, pane=Component.UNDEFINED, style=Component.UNDEFINED, className=Component.UNDEFINED, id=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'className', 'name', 'pane', 'style']
        self._type = 'Pane'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'className', 'name', 'pane', 'style']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(Pane, self).__init__(children=children, **args)
