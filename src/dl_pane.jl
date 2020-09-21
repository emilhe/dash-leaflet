# AUTO GENERATED FILE - DO NOT EDIT

export dl_pane

"""
    dl_pane(;kwargs...)
    dl_pane(children::Any;kwargs...)
    dl_pane(children_maker::Function;kwargs...)


A Pane component.
Pane is a wrapper of Pane in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component
- `name` (String; optional): The pane name
- `pane` (String; optional): The leaflet pane of the component
- `style` (Dict; optional): The CSS style of the component (dynamic)
- `className` (String; optional): A custom class name to assign to the pane. Empty by default.
- `id` (String; optional): The ID used to identify this component in Dash callbacks
"""
function dl_pane(; kwargs...)
        available_props = Symbol[:children, :name, :pane, :style, :className, :id]
        wild_props = Symbol[]
        return Component("dl_pane", "Pane", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_pane(children::Any; kwargs...) = dl_pane(;kwargs..., children = children)
dl_pane(children_maker::Function; kwargs...) = dl_pane(children_maker(); kwargs...)

