# AUTO GENERATED FILE - DO NOT EDIT

dlLocateControl <- function(children=NULL, className=NULL, id=NULL, startDirectly=NULL, options=NULL) {
    
    props <- list(children=children, className=className, id=id, startDirectly=startDirectly, options=options)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'LocateControl',
        namespace = 'dash_leaflet',
        propNames = c('children', 'className', 'id', 'startDirectly', 'options'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
