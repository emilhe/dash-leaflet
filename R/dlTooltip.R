# AUTO GENERATED FILE - DO NOT EDIT

dlTooltip <- function(children=NULL, offset=NULL, direction=NULL, permanent=NULL, sticky=NULL, interactive=NULL, opacity=NULL, id=NULL, className=NULL, pane=NULL, attribution=NULL) {
    
    props <- list(children=children, offset=offset, direction=direction, permanent=permanent, sticky=sticky, interactive=interactive, opacity=opacity, id=id, className=className, pane=pane, attribution=attribution)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Tooltip',
        namespace = 'dash_leaflet',
        propNames = c('children', 'offset', 'direction', 'permanent', 'sticky', 'interactive', 'opacity', 'id', 'className', 'pane', 'attribution'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
