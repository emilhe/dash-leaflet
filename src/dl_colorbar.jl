# AUTO GENERATED FILE - DO NOT EDIT

export dl_colorbar

"""
    dl_colorbar(;kwargs...)
    dl_colorbar(children::Any;kwargs...)
    dl_colorbar(children_maker::Function;kwargs...)


A Colorbar component.
Colorbar is just a wrapper of LeafletColorbar.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component
- `position` (String; optional): Position of the colorbar. One of 'topleft', 'topright', 'bottomleft', 'bottomright'
- `colorscale` (String | Array of Strings; optional): Chroma-js colorscale. Either a colorscale name, e.g. "Viridis", or a list of colors,
e.g. ["black", "#fdd49e", "rgba(255,0,0,0.35)"].
The predefined colorscales are listed here:
https://github.com/gka/chroma.js/blob/master/src/colors/colorbrewer.js
- `width` (Real; optional): Width of the colorbar. If width > height then the colorbar will be in horizontal mode.
- `height` (Real; optional): Height of the colorbar. If height > width then the colorbar will be in vertical mode.
- `min` (Real; optional): Domain minimum of the colorbar. Translates to the first color of the colorscale.
- `max` (Real; optional): Domain maximum of the colorbar. Translates to the last color of the colorscale.
- `classes` (Real | Array of Reals; optional): The number or positions of discrete classes in the colorbar. If not set the 
colorbar will be continuous, which is the default.
- `unit` (String; optional): Optional text to append to the colorbar ticks.
- `nTicks` (Real; optional): Number of ticks on the colorbar.
- `tickDecimals` (Real; optional): If set, fixes the tick decimal points to the given number.
- `tickValues` (Array of Reals; optional): If set, these values are used for ticks (rather than the ones genrated based on nTicks).
- `tickText` (Array of Strings; optional): If set, this text will be used instead of the data values.
- `tooltip` (Bool; optional): If true, the value will be shown as tooltip on hover.
- `opacity` (Real; optional): Opacity of the colorbar. Use it to match the perceived colors from an overlay 
with opacity.
- `style` (Dict; optional): HTML style object to add to the colorbar entity, e.g. to set font color.
- `id` (String; optional): The ID used to identify this component in Dash callbacks
- `className` (String; optional): The class of the component
"""
function dl_colorbar(; kwargs...)
        available_props = Symbol[:children, :position, :colorscale, :width, :height, :min, :max, :classes, :unit, :nTicks, :tickDecimals, :tickValues, :tickText, :tooltip, :opacity, :style, :id, :className]
        wild_props = Symbol[]
        return Component("dl_colorbar", "Colorbar", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_colorbar(children::Any; kwargs...) = dl_colorbar(;kwargs..., children = children)
dl_colorbar(children_maker::Function; kwargs...) = dl_colorbar(children_maker(); kwargs...)

