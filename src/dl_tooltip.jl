# AUTO GENERATED FILE - DO NOT EDIT

export dl_tooltip

"""
    dl_tooltip(;kwargs...)
    dl_tooltip(children::Any;kwargs...)
    dl_tooltip(children_maker::Function;kwargs...)


A Tooltip component.
Tooltip is a wrapper of Tooltip in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component
- `offset` (Dict; optional): Optional offset of the tooltip position.
- `direction` (String; optional): Direction where to open the tooltip. Possible values are: right, 
left, top, bottom, center, auto. auto will dynamically switch between 
right and left according to the tooltip position on the map.
- `permanent` (Bool; optional): Whether to open the tooltip permanently or only on mouseover.
- `sticky` (Bool; optional): If true, the tooltip will follow the mouse instead of being fixed at 
the feature center.
- `interactive` (Bool; optional): If true, the tooltip will listen to the feature events.
- `opacity` (Real; optional): Tooltip container opacity
- `id` (String; optional): The ID used to identify this component in Dash callbacks
- `className` (String; optional): The class of the component (dynamic)
- `pane` (String; optional): The leaflet pane of the component
- `attribution` (String; optional): The attribution string for the component (dynamic)
"""
function dl_tooltip(; kwargs...)
        available_props = Symbol[:children, :offset, :direction, :permanent, :sticky, :interactive, :opacity, :id, :className, :pane, :attribution]
        wild_props = Symbol[]
        return Component("dl_tooltip", "Tooltip", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_tooltip(children::Any; kwargs...) = dl_tooltip(;kwargs..., children = children)
dl_tooltip(children_maker::Function; kwargs...) = dl_tooltip(children_maker(); kwargs...)

