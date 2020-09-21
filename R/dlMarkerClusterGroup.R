# AUTO GENERATED FILE - DO NOT EDIT

dlMarkerClusterGroup <- function(children=NULL, className=NULL, id=NULL, options=NULL) {
    
    props <- list(children=children, className=className, id=id, options=options)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'MarkerClusterGroup',
        namespace = 'dash_leaflet',
        propNames = c('children', 'className', 'id', 'options'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
