# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class FullscreenControl(Component):
    """A FullscreenControl component.
Thin wrapper of https://github.com/krvital/react-leaflet-fullscreen. Requires linking font-awesome, i.e. app =
dash.Dash(external_stylesheets=['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'])

Keyword arguments:

- forcePseudoFullscreen (boolean; optional):
    Force use of pseudo full screen even if full screen API is
    available, default False.

- forceSeparateButton (boolean; optional):
    Force separate button to detach from zoom buttons, default False.

- fullscreenElement (boolean; optional):
    Dom element to render in full screen, False by default, fallback
    to map._container.

- position (a value equal to: 'topleft', 'topright', 'bottomleft', 'bottomright'; optional):
    Position.

- title (string; optional):
    Title of the button, default Full Screen.

- titleCancel (string; optional):
    Title of the button when fullscreen is on, default Exit Full
    Screen."""
    @_explicitize_args
    def __init__(self, position=Component.UNDEFINED, title=Component.UNDEFINED, titleCancel=Component.UNDEFINED, forceSeparateButton=Component.UNDEFINED, forcePseudoFullscreen=Component.UNDEFINED, fullscreenElement=Component.UNDEFINED, **kwargs):
        self._prop_names = ['forcePseudoFullscreen', 'forceSeparateButton', 'fullscreenElement', 'position', 'title', 'titleCancel']
        self._type = 'FullscreenControl'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['forcePseudoFullscreen', 'forceSeparateButton', 'fullscreenElement', 'position', 'title', 'titleCancel']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(FullscreenControl, self).__init__(**args)
