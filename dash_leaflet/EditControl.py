# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class EditControl(Component):
    """An EditControl component.


Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    The children of this component (dynamic).

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- action (dict; default {n_actions: 0}):
    Fires on every action.

- className (string; optional):
    A custom class name to assign to the image. Empty by default.

- draw (dict; optional):
    Enable/disable draw controls. See example of usage here
    https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config.

- drawToolbar (dict; optional):
    Change this prop to manipulate the drawing toolbar, i.e. to change
    modes and/or invoke actions.

    `drawToolbar` is a dict with keys:

    - action (a value equal to: "cancel", "finish", "delete last point"; optional)

    - mode (a value equal to: "marker", "polygon", "polyline", "rectangle", "circle", "circlemarker"; optional)

    - n_clicks (number; optional)

- edit (dict; optional):
    Enable/disable edit controls. See example of usage here
    https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config.

- editToolbar (dict; optional):
    Change this prop to manipulate the edit toolbar, i.e. to change
    modes and/or invoke actions.

    `editToolbar` is a dict with keys:

    - action (a value equal to: "save", "cancel", "clear all"; optional)

    - mode (a value equal to: "edit", "remove"; optional)

    - n_clicks (number; optional)

- geojson (dict; default {type: "FeatureCollection", features: []}):
    Geojson representing the current features.

- onDrawVertex (string | dict; optional):
    Hook to leaflet-draw's draw:drawvertex event.

- onEditMove (string | dict; optional):
    Hook to leaflet-draw's draw:editmove event.

- onEditResize (string | dict; optional):
    Hook to leaflet-draw's draw:editresize event.

- onEditVertex (string | dict; optional):
    Hook to leaflet-draw's draw:editvertex event.

- onMounted (string | dict; optional):
    Hook to leaflet-draw's draw:mounted event.

- position (a value equal to: "topleft", "topright", "bottomleft", "bottomright"; optional):
    The position of this component."""
    @_explicitize_args
    def __init__(self, children=None, position=Component.UNDEFINED, draw=Component.UNDEFINED, edit=Component.UNDEFINED, action=Component.UNDEFINED, drawToolbar=Component.UNDEFINED, editToolbar=Component.UNDEFINED, geojson=Component.UNDEFINED, onMounted=Component.UNDEFINED, onDrawVertex=Component.UNDEFINED, onEditMove=Component.UNDEFINED, onEditResize=Component.UNDEFINED, onEditVertex=Component.UNDEFINED, className=Component.UNDEFINED, id=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'action', 'className', 'draw', 'drawToolbar', 'edit', 'editToolbar', 'geojson', 'onDrawVertex', 'onEditMove', 'onEditResize', 'onEditVertex', 'onMounted', 'position']
        self._type = 'EditControl'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'action', 'className', 'draw', 'drawToolbar', 'edit', 'editToolbar', 'geojson', 'onDrawVertex', 'onEditMove', 'onEditResize', 'onEditVertex', 'onMounted', 'position']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(EditControl, self).__init__(children=children, **args)
