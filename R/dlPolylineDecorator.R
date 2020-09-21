# AUTO GENERATED FILE - DO NOT EDIT

dlPolylineDecorator <- function(children=NULL, positions=NULL, patterns=NULL, id=NULL) {
    
    props <- list(children=children, positions=positions, patterns=patterns, id=id)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'PolylineDecorator',
        namespace = 'dash_leaflet',
        propNames = c('children', 'positions', 'patterns', 'id'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
