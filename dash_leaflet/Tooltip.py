# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Tooltip(Component):
    """A Tooltip component.
Tooltip is a wrapper of Tooltip in react-leaflet.
It takes similar properties to its react-leaflet counterpart.

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    The children of this component.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- attribution (string; optional):
    The attribution string for the component (dynamic).

- className (string; optional):
    The class of the component (dynamic).

- direction (string; optional):
    Direction where to open the tooltip. Possible values are: right,
    left, top, bottom, center, auto. auto will dynamically switch
    between  right and left according to the tooltip position on the
    map.

- interactive (boolean; optional):
    If True, the tooltip will listen to the feature events.

- offset (dict; optional):
    Optional offset of the tooltip position.

- opacity (number; optional):
    Tooltip container opacity.

- pane (string; optional):
    The leaflet pane of the component.

- permanent (boolean; optional):
    Whether to open the tooltip permanently or only on mouseover.

- sticky (boolean; optional):
    If True, the tooltip will follow the mouse instead of being fixed
    at  the feature center."""
    @_explicitize_args
    def __init__(self, children=None, offset=Component.UNDEFINED, direction=Component.UNDEFINED, permanent=Component.UNDEFINED, sticky=Component.UNDEFINED, interactive=Component.UNDEFINED, opacity=Component.UNDEFINED, id=Component.UNDEFINED, className=Component.UNDEFINED, pane=Component.UNDEFINED, attribution=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'attribution', 'className', 'direction', 'interactive', 'offset', 'opacity', 'pane', 'permanent', 'sticky']
        self._type = 'Tooltip'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'attribution', 'className', 'direction', 'interactive', 'offset', 'opacity', 'pane', 'permanent', 'sticky']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(Tooltip, self).__init__(children=children, **args)
