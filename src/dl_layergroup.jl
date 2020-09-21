# AUTO GENERATED FILE - DO NOT EDIT

export dl_layergroup

"""
    dl_layergroup(;kwargs...)
    dl_layergroup(children::Any;kwargs...)
    dl_layergroup(children_maker::Function;kwargs...)


A LayerGroup component.
LayerGroup is a wrapper of LayerGroup in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): Attribution
- `attribution` (String; optional): Attribution
- `className` (String; optional): A custom class name to assign to the image. Empty by default.
- `id` (String; optional): The ID used to identify this component in Dash callbacks
"""
function dl_layergroup(; kwargs...)
        available_props = Symbol[:children, :attribution, :className, :id]
        wild_props = Symbol[]
        return Component("dl_layergroup", "LayerGroup", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_layergroup(children::Any; kwargs...) = dl_layergroup(;kwargs..., children = children)
dl_layergroup(children_maker::Function; kwargs...) = dl_layergroup(children_maker(); kwargs...)

