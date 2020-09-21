# AUTO GENERATED FILE - DO NOT EDIT

dlTileLayer <- function(children=NULL, url=NULL, opacity=NULL, zIndex=NULL, minZoom=NULL, maxZoom=NULL, subdomains=NULL, errorTileUrl=NULL, zoomOffset=NULL, tms=NULL, zoomReverse=NULL, detectRetina=NULL, crossOrigin=NULL, tileSize=NULL, updateWhenIdle=NULL, updateWhenZooming=NULL, updateInterval=NULL, bounds=NULL, minNativeZoom=NULL, maxNativeZoom=NULL, noWrap=NULL, className=NULL, keepBuffer=NULL, id=NULL, pane=NULL, attribution=NULL) {
    
    props <- list(children=children, url=url, opacity=opacity, zIndex=zIndex, minZoom=minZoom, maxZoom=maxZoom, subdomains=subdomains, errorTileUrl=errorTileUrl, zoomOffset=zoomOffset, tms=tms, zoomReverse=zoomReverse, detectRetina=detectRetina, crossOrigin=crossOrigin, tileSize=tileSize, updateWhenIdle=updateWhenIdle, updateWhenZooming=updateWhenZooming, updateInterval=updateInterval, bounds=bounds, minNativeZoom=minNativeZoom, maxNativeZoom=maxNativeZoom, noWrap=noWrap, className=className, keepBuffer=keepBuffer, id=id, pane=pane, attribution=attribution)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'TileLayer',
        namespace = 'dash_leaflet',
        propNames = c('children', 'url', 'opacity', 'zIndex', 'minZoom', 'maxZoom', 'subdomains', 'errorTileUrl', 'zoomOffset', 'tms', 'zoomReverse', 'detectRetina', 'crossOrigin', 'tileSize', 'updateWhenIdle', 'updateWhenZooming', 'updateInterval', 'bounds', 'minNativeZoom', 'maxNativeZoom', 'noWrap', 'className', 'keepBuffer', 'id', 'pane', 'attribution'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
