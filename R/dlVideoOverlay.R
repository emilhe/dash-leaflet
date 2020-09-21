# AUTO GENERATED FILE - DO NOT EDIT

dlVideoOverlay <- function(children=NULL, url=NULL, bounds=NULL, opacity=NULL, play=NULL, zIndex=NULL, loop=NULL, keepAspectRatio=NULL, alt=NULL, interactive=NULL, bubblingMouseEvents=NULL, crossOrigin=NULL, errorOverlayUrl=NULL, className=NULL, id=NULL, pane=NULL, attribution=NULL, click_lat_lng=NULL, dbl_click_lat_lng=NULL) {
    
    props <- list(children=children, url=url, bounds=bounds, opacity=opacity, play=play, zIndex=zIndex, loop=loop, keepAspectRatio=keepAspectRatio, alt=alt, interactive=interactive, bubblingMouseEvents=bubblingMouseEvents, crossOrigin=crossOrigin, errorOverlayUrl=errorOverlayUrl, className=className, id=id, pane=pane, attribution=attribution, click_lat_lng=click_lat_lng, dbl_click_lat_lng=dbl_click_lat_lng)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'VideoOverlay',
        namespace = 'dash_leaflet',
        propNames = c('children', 'url', 'bounds', 'opacity', 'play', 'zIndex', 'loop', 'keepAspectRatio', 'alt', 'interactive', 'bubblingMouseEvents', 'crossOrigin', 'errorOverlayUrl', 'className', 'id', 'pane', 'attribution', 'click_lat_lng', 'dbl_click_lat_lng'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
