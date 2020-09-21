# AUTO GENERATED FILE - DO NOT EDIT

dlWMSTileLayer <- function(children=NULL, url=NULL, layers=NULL, styles=NULL, format=NULL, transparent=NULL, version=NULL, crs=NULL, uppercase=NULL, minZoom=NULL, maxZoom=NULL, subdomains=NULL, errorTileUrl=NULL, zoomOffset=NULL, tms=NULL, zoomReverse=NULL, detectRetina=NULL, crossOrigin=NULL, tileSize=NULL, opacity=NULL, updateWhenIdle=NULL, updateWhenZooming=NULL, updateInterval=NULL, zIndex=NULL, bounds=NULL, minNativeZoom=NULL, maxNativeZoom=NULL, noWrap=NULL, pane=NULL, className=NULL, keepBuffer=NULL, attribution=NULL, id=NULL) {
    
    props <- list(children=children, url=url, layers=layers, styles=styles, format=format, transparent=transparent, version=version, crs=crs, uppercase=uppercase, minZoom=minZoom, maxZoom=maxZoom, subdomains=subdomains, errorTileUrl=errorTileUrl, zoomOffset=zoomOffset, tms=tms, zoomReverse=zoomReverse, detectRetina=detectRetina, crossOrigin=crossOrigin, tileSize=tileSize, opacity=opacity, updateWhenIdle=updateWhenIdle, updateWhenZooming=updateWhenZooming, updateInterval=updateInterval, zIndex=zIndex, bounds=bounds, minNativeZoom=minNativeZoom, maxNativeZoom=maxNativeZoom, noWrap=noWrap, pane=pane, className=className, keepBuffer=keepBuffer, attribution=attribution, id=id)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'WMSTileLayer',
        namespace = 'dash_leaflet',
        propNames = c('children', 'url', 'layers', 'styles', 'format', 'transparent', 'version', 'crs', 'uppercase', 'minZoom', 'maxZoom', 'subdomains', 'errorTileUrl', 'zoomOffset', 'tms', 'zoomReverse', 'detectRetina', 'crossOrigin', 'tileSize', 'opacity', 'updateWhenIdle', 'updateWhenZooming', 'updateInterval', 'zIndex', 'bounds', 'minNativeZoom', 'maxNativeZoom', 'noWrap', 'pane', 'className', 'keepBuffer', 'attribution', 'id'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
