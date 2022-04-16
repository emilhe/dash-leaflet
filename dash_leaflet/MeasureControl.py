# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class MeasureControl(Component):
    """A MeasureControl component.


Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    The children of this component (dynamic).

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- activeColor (string; optional):
    The color to use for map features rendered while actively
    perfoming a measurement.

- captureZIndex (number; optional):
    The Z-index of the marker used to capture measure clicks.

- className (string; optional):
    A custom class name to assign to the image. Empty by default.

- completedColor (string; optional):
    The color to use for features generated from a completed
    measurement.

- decPoint (string; optional):
    The decimal point and thousands separator used when displaying
    measurements.

- popupOptions (dict; optional):
    The options applied to the popup of the resulting measure feature.

- position (a value equal to: "topleft", "topright", "bottomleft", "bottomright"; optional):
    The position of this component.

- primaryAreaUnit (a value equal to: "acres", "hectares", "sqfeet", "sqmeters", "sqmiles"; optional):
    The units used to display area results. secondaryAreaUnit is
    optional.

- primaryLengthUnit (a value equal to: "feet", "meters", "miles", "kilometers"; optional):
    The units used to display length results. secondaryLengthUnit is
    optional.

- secondaryAreaUnit (a value equal to: "acres", "hectares", "sqfeet", "sqmeters", "sqmiles", undefined; optional)

- secondaryLengthUnit (a value equal to: "feet", "meters", "miles", "kilometers", undefined; default undefined)

- thousandsSep (string; optional)"""
    @_explicitize_args
    def __init__(self, children=None, position=Component.UNDEFINED, primaryLengthUnit=Component.UNDEFINED, secondaryLengthUnit=Component.UNDEFINED, primaryAreaUnit=Component.UNDEFINED, secondaryAreaUnit=Component.UNDEFINED, activeColor=Component.UNDEFINED, completedColor=Component.UNDEFINED, popupOptions=Component.UNDEFINED, captureZIndex=Component.UNDEFINED, decPoint=Component.UNDEFINED, thousandsSep=Component.UNDEFINED, className=Component.UNDEFINED, id=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'activeColor', 'captureZIndex', 'className', 'completedColor', 'decPoint', 'popupOptions', 'position', 'primaryAreaUnit', 'primaryLengthUnit', 'secondaryAreaUnit', 'secondaryLengthUnit', 'thousandsSep']
        self._type = 'MeasureControl'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'activeColor', 'captureZIndex', 'className', 'completedColor', 'decPoint', 'popupOptions', 'position', 'primaryAreaUnit', 'primaryLengthUnit', 'secondaryAreaUnit', 'secondaryLengthUnit', 'thousandsSep']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(MeasureControl, self).__init__(children=children, **args)
