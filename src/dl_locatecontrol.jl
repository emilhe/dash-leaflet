# AUTO GENERATED FILE - DO NOT EDIT

export dl_locatecontrol

"""
    dl_locatecontrol(;kwargs...)
    dl_locatecontrol(children::Any;kwargs...)
    dl_locatecontrol(children_maker::Function;kwargs...)


A LocateControl component.
LocateControl is a wrapper of LocateControl in react-leaflet. The component requires linking font-awesome, i.e.
app = dash.Dash(external_stylesheets=['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'])
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component (dynamic).
- `className` (String; optional): A custom class name to assign to the image. Empty by default.
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `startDirectly` (Bool; optional): If true, the location control is activated on map load.
- `options` (Dict; optional): Location control options (a dict). See list of options in the code,
https://github.com/domoritz/leaflet-locatecontrol/blob/gh-pages/src/L.Control.Locate.js#L146
"""
function dl_locatecontrol(; kwargs...)
        available_props = Symbol[:children, :className, :id, :startDirectly, :options]
        wild_props = Symbol[]
        return Component("dl_locatecontrol", "LocateControl", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_locatecontrol(children::Any; kwargs...) = dl_locatecontrol(;kwargs..., children = children)
dl_locatecontrol(children_maker::Function; kwargs...) = dl_locatecontrol(children_maker(); kwargs...)

