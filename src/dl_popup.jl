# AUTO GENERATED FILE - DO NOT EDIT

export dl_popup

"""
    dl_popup(;kwargs...)
    dl_popup(children::Any;kwargs...)
    dl_popup(children_maker::Function;kwargs...)


A Popup component.
Popup is a wrapper of Popup in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component
- `position` (Array of Reals; optional): A geographical point (lat, lon)
- `maxWidth` (Real; optional): Max width of the popup, in pixels.
- `minWidth` (Real; optional): Min width of the popup, in pixels.
- `maxHeight` (Real; optional): If set, creates a scrollable container of the given height
inside a popup if its content exceeds it.
- `autoPan` (Bool; optional): Set it to false if you don't want the map to do panning 
animation to fit the opened popup.
- `autoPanPaddingTopLeft` (Dict; optional): The margin between the popup and the top left corner of the map 
view after autopanning was performed.
- `autoPanPaddingBottomRight` (Dict; optional): The margin between the popup and the bottom right corner of the
map view after autopanning was performed.
- `autoPanPadding` (Dict; optional): Equivalent of setting both top left and bottom right autopan padding 
to the same value.
- `keepInView` (Bool; optional): Set it to true if you want to prevent users from panning the popup 
off of the screen while it is open.
- `closeButton` (Bool; optional): Controls the presence of a close button in the popup.
- `autoClose` (Bool; optional): Set it to false if you want to override the default behavior of the popup 
closing when another popup is opened.
- `closeOnEscapeKey` (Bool; optional): Set it to false if you want to override the default behavior of the ESC 
key for closing of the popup.
- `closeOnClick` (Bool; optional): Set it if you want to override the default behavior of the popup closing 
when user clicks on the map. Defaults to the map's closePopupOnClick option.
- `id` (String; optional): The ID used to identify this component in Dash callbacks
- `className` (String; optional): The class of the component (dynamic)
- `pane` (String; optional): The leaflet pane of the component
- `attribution` (String; optional): The attribution string for the component (dynamic)
"""
function dl_popup(; kwargs...)
        available_props = Symbol[:children, :position, :maxWidth, :minWidth, :maxHeight, :autoPan, :autoPanPaddingTopLeft, :autoPanPaddingBottomRight, :autoPanPadding, :keepInView, :closeButton, :autoClose, :closeOnEscapeKey, :closeOnClick, :id, :className, :pane, :attribution]
        wild_props = Symbol[]
        return Component("dl_popup", "Popup", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_popup(children::Any; kwargs...) = dl_popup(;kwargs..., children = children)
dl_popup(children_maker::Function; kwargs...) = dl_popup(children_maker(); kwargs...)

