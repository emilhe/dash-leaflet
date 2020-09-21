# AUTO GENERATED FILE - DO NOT EDIT

export dl_markerclustergroup

"""
    dl_markerclustergroup(;kwargs...)
    dl_markerclustergroup(children::Any;kwargs...)
    dl_markerclustergroup(children_maker::Function;kwargs...)


A MarkerClusterGroup component.
MarkerClusterGroup is a wrapper of MarkerClusterGroup in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component (dynamic)
- `className` (String; optional): A custom class name to assign to the image. Empty by default.
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `options` (Dict; optional): Marker cluster group options (a dict). See list of options here
https://github.com/Leaflet/Leaflet.markercluster#all-options
"""
function dl_markerclustergroup(; kwargs...)
        available_props = Symbol[:children, :className, :id, :options]
        wild_props = Symbol[]
        return Component("dl_markerclustergroup", "MarkerClusterGroup", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_markerclustergroup(children::Any; kwargs...) = dl_markerclustergroup(;kwargs..., children = children)
dl_markerclustergroup(children_maker::Function; kwargs...) = dl_markerclustergroup(children_maker(); kwargs...)

