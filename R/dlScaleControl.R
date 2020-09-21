# AUTO GENERATED FILE - DO NOT EDIT

dlScaleControl <- function(children=NULL, imperial=NULL, metric=NULL, updateWhenIdle=NULL, maxWidth=NULL, className=NULL, id=NULL) {
    
    props <- list(children=children, imperial=imperial, metric=metric, updateWhenIdle=updateWhenIdle, maxWidth=maxWidth, className=className, id=id)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'ScaleControl',
        namespace = 'dash_leaflet',
        propNames = c('children', 'imperial', 'metric', 'updateWhenIdle', 'maxWidth', 'className', 'id'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
