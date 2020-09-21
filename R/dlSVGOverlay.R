# AUTO GENERATED FILE - DO NOT EDIT

dlSVGOverlay <- function(children=NULL, svg=NULL, bounds=NULL, opacity=NULL, zIndex=NULL, alt=NULL, interactive=NULL, bubblingMouseEvents=NULL, crossOrigin=NULL, errorOverlayUrl=NULL, className=NULL, id=NULL, pane=NULL, attribution=NULL) {
    
    props <- list(children=children, svg=svg, bounds=bounds, opacity=opacity, zIndex=zIndex, alt=alt, interactive=interactive, bubblingMouseEvents=bubblingMouseEvents, crossOrigin=crossOrigin, errorOverlayUrl=errorOverlayUrl, className=className, id=id, pane=pane, attribution=attribution)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'SVGOverlay',
        namespace = 'dash_leaflet',
        propNames = c('children', 'svg', 'bounds', 'opacity', 'zIndex', 'alt', 'interactive', 'bubblingMouseEvents', 'crossOrigin', 'errorOverlayUrl', 'className', 'id', 'pane', 'attribution'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
