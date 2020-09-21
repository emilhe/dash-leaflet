# AUTO GENERATED FILE - DO NOT EDIT

export dl_scalecontrol

"""
    dl_scalecontrol(;kwargs...)
    dl_scalecontrol(children::Any;kwargs...)
    dl_scalecontrol(children_maker::Function;kwargs...)


A ScaleControl component.
ScaleControl is a wrapper of ScaleControl in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component (dynamic).
- `imperial` (Bool; optional): Imperial scale or not.
- `metric` (Bool; optional): Metric scale or not.
- `updateWhenIdle` (Bool; optional): Update when idle or not.
- `maxWidth` (Real; optional): Control maxWidth.
- `className` (String; optional): A custom class name to assign to the image. Empty by default.
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
"""
function dl_scalecontrol(; kwargs...)
        available_props = Symbol[:children, :imperial, :metric, :updateWhenIdle, :maxWidth, :className, :id]
        wild_props = Symbol[]
        return Component("dl_scalecontrol", "ScaleControl", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_scalecontrol(children::Any; kwargs...) = dl_scalecontrol(;kwargs..., children = children)
dl_scalecontrol(children_maker::Function; kwargs...) = dl_scalecontrol(children_maker(); kwargs...)

