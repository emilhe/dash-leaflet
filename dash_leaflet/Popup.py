# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Popup(Component):
    """A Popup component.
Popup is a wrapper of Popup in react-leaflet.
It takes similar properties to its react-leaflet counterpart.

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    The children of this component.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- attribution (string; optional):
    The attribution string for the component (dynamic).

- autoClose (boolean; optional):
    Set it to False if you want to override the default behavior of
    the popup  closing when another popup is opened.

- autoPan (boolean; optional):
    Set it to False if you don't want the map to do panning  animation
    to fit the opened popup.

- autoPanPadding (dict; optional):
    Equivalent of setting both top left and bottom right autopan
    padding  to the same value.

- autoPanPaddingBottomRight (dict; optional):
    The margin between the popup and the bottom right corner of the
    map view after autopanning was performed.

- autoPanPaddingTopLeft (dict; optional):
    The margin between the popup and the top left corner of the map
    view after autopanning was performed.

- className (string; optional):
    The class of the component (dynamic).

- closeButton (boolean; optional):
    Controls the presence of a close button in the popup.

- closeOnClick (boolean; optional):
    Set it if you want to override the default behavior of the popup
    closing  when user clicks on the map. Defaults to the map's
    closePopupOnClick option.

- closeOnEscapeKey (boolean; optional):
    Set it to False if you want to override the default behavior of
    the ESC  key for closing of the popup.

- keepInView (boolean; optional):
    Set it to True if you want to prevent users from panning the popup
    off of the screen while it is open.

- maxHeight (number; optional):
    If set, creates a scrollable container of the given height inside
    a popup if its content exceeds it.

- maxWidth (number; optional):
    Max width of the popup, in pixels.

- minWidth (number; optional):
    Min width of the popup, in pixels.

- pane (string; optional):
    The leaflet pane of the component.

- position (list of numbers; optional):
    A geographical point (lat, lon)."""
    @_explicitize_args
    def __init__(self, children=None, position=Component.UNDEFINED, maxWidth=Component.UNDEFINED, minWidth=Component.UNDEFINED, maxHeight=Component.UNDEFINED, autoPan=Component.UNDEFINED, autoPanPaddingTopLeft=Component.UNDEFINED, autoPanPaddingBottomRight=Component.UNDEFINED, autoPanPadding=Component.UNDEFINED, keepInView=Component.UNDEFINED, closeButton=Component.UNDEFINED, autoClose=Component.UNDEFINED, closeOnEscapeKey=Component.UNDEFINED, closeOnClick=Component.UNDEFINED, id=Component.UNDEFINED, className=Component.UNDEFINED, pane=Component.UNDEFINED, attribution=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'attribution', 'autoClose', 'autoPan', 'autoPanPadding', 'autoPanPaddingBottomRight', 'autoPanPaddingTopLeft', 'className', 'closeButton', 'closeOnClick', 'closeOnEscapeKey', 'keepInView', 'maxHeight', 'maxWidth', 'minWidth', 'pane', 'position']
        self._type = 'Popup'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'attribution', 'autoClose', 'autoPan', 'autoPanPadding', 'autoPanPaddingBottomRight', 'autoPanPaddingTopLeft', 'className', 'closeButton', 'closeOnClick', 'closeOnEscapeKey', 'keepInView', 'maxHeight', 'maxWidth', 'minWidth', 'pane', 'position']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(Popup, self).__init__(children=children, **args)
