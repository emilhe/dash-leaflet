# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class SVGOverlay(Component):
    """A SVGOverlay component.
NOTE: This component is not fully tested. Consider it beta.

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    The children of this component.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- alt (string; optional):
    Text for the alt attribute of the image (useful for
    accessibility).

- attribution (string; optional):
    The attribution string for the component (dynamic).

- bounds (list of list of numberss; required):
    The geographical bounds the image is tied to.

- bubblingMouseEvents (boolean; optional):
    When True, a mouse event on this path will trigger the same  event
    on the map (unless L.DomEvent.stopPropagation is used).

- className (string; optional):
    A custom class name to assign to the image. Empty by default.

- crossOrigin (boolean; optional):
    Whether the crossOrigin attribute will be added to the image. If
    a String is provided, the image will have its crossOrigin
    attribute  set to the String provided. This is needed if you want
    to access image  pixel data. Refer to CORS Settings for valid
    String values.

- errorOverlayUrl (string; optional):
    URL to the overlay image to show in place of the overlay that
    failed to load.

- interactive (boolean; optional):
    If True, the image overlay will emit mouse events when clicked or
    hovered.

- opacity (number; optional):
    The opacity of the image overlay.

- pane (string; optional):
    The leaflet pane of the component.

- svg (string; required):
    The SVG as text.

- zIndex (number; optional):
    The explicit zIndex of the overlay layer."""
    @_explicitize_args
    def __init__(self, children=None, svg=Component.REQUIRED, bounds=Component.REQUIRED, opacity=Component.UNDEFINED, zIndex=Component.UNDEFINED, alt=Component.UNDEFINED, interactive=Component.UNDEFINED, bubblingMouseEvents=Component.UNDEFINED, crossOrigin=Component.UNDEFINED, errorOverlayUrl=Component.UNDEFINED, className=Component.UNDEFINED, id=Component.UNDEFINED, pane=Component.UNDEFINED, attribution=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'alt', 'attribution', 'bounds', 'bubblingMouseEvents', 'className', 'crossOrigin', 'errorOverlayUrl', 'interactive', 'opacity', 'pane', 'svg', 'zIndex']
        self._type = 'SVGOverlay'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'alt', 'attribution', 'bounds', 'bubblingMouseEvents', 'className', 'crossOrigin', 'errorOverlayUrl', 'interactive', 'opacity', 'pane', 'svg', 'zIndex']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in ['svg', 'bounds']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(SVGOverlay, self).__init__(children=children, **args)
