# AUTO GENERATED FILE - DO NOT EDIT

dlDivMarker <- function(children=NULL, position=NULL, iconOptions=NULL, draggable=NULL, opacity=NULL, zIndexOffset=NULL, keyboard=NULL, title=NULL, alt=NULL, riseOnHover=NULL, riseOffset=NULL, bubblingMouseEvents=NULL, autoPan=NULL, autoPanPadding=NULL, autoPanSpeed=NULL, interactive=NULL, id=NULL, pane=NULL, attribution=NULL, n_clicks=NULL) {
    
    props <- list(children=children, position=position, iconOptions=iconOptions, draggable=draggable, opacity=opacity, zIndexOffset=zIndexOffset, keyboard=keyboard, title=title, alt=alt, riseOnHover=riseOnHover, riseOffset=riseOffset, bubblingMouseEvents=bubblingMouseEvents, autoPan=autoPan, autoPanPadding=autoPanPadding, autoPanSpeed=autoPanSpeed, interactive=interactive, id=id, pane=pane, attribution=attribution, n_clicks=n_clicks)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DivMarker',
        namespace = 'dash_leaflet',
        propNames = c('children', 'position', 'iconOptions', 'draggable', 'opacity', 'zIndexOffset', 'keyboard', 'title', 'alt', 'riseOnHover', 'riseOffset', 'bubblingMouseEvents', 'autoPan', 'autoPanPadding', 'autoPanSpeed', 'interactive', 'id', 'pane', 'attribution', 'n_clicks'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
