# AUTO GENERATED FILE - DO NOT EDIT

dlLayerGroup <- function(children=NULL, attribution=NULL, className=NULL, id=NULL) {
    
    props <- list(children=children, attribution=attribution, className=className, id=id)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'LayerGroup',
        namespace = 'dash_leaflet',
        propNames = c('children', 'attribution', 'className', 'id'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
