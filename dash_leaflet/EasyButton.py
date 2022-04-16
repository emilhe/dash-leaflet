# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class EasyButton(Component):
    """An EasyButton component.
EasyButton is based on https://github.com/CliffCloud/Leaflet.EasyButton

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    The children of this component (dynamic).

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- className (string; optional):
    A custom class name to assign to the image. Empty by default.

- icon (string; required):
    The icon to show, e.g. 'fa-globe' from
    \"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\".

- n_clicks (number; default 0):
    Dash callback property. Number of times the object has been
    clicked."""
    @_explicitize_args
    def __init__(self, children=None, icon=Component.REQUIRED, className=Component.UNDEFINED, id=Component.UNDEFINED, n_clicks=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'className', 'icon', 'n_clicks']
        self._type = 'EasyButton'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'className', 'icon', 'n_clicks']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in ['icon']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(EasyButton, self).__init__(children=children, **args)
