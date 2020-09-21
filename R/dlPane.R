# AUTO GENERATED FILE - DO NOT EDIT

dlPane <- function(children=NULL, name=NULL, pane=NULL, style=NULL, className=NULL, id=NULL) {
    
    props <- list(children=children, name=name, pane=pane, style=style, className=className, id=id)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Pane',
        namespace = 'dash_leaflet',
        propNames = c('children', 'name', 'pane', 'style', 'className', 'id'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
