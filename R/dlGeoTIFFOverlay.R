# AUTO GENERATED FILE - DO NOT EDIT

dlGeoTIFFOverlay <- function(children=NULL, url=NULL, band=NULL, image=NULL, colorscale=NULL, domainMin=NULL, domainMax=NULL, clampHigh=NULL, clampLow=NULL, classes=NULL, clip=NULL, style=NULL, tileSize=NULL, opacity=NULL, updateWhenIdle=NULL, updateWhenZooming=NULL, updateInterval=NULL, zIndex=NULL, bounds=NULL, minZoom=NULL, maxZoom=NULL, minNativeZoom=NULL, maxNativeZoom=NULL, noWrap=NULL, className=NULL, keepBuffer=NULL, interactive=NULL, bubblingMouseEvents=NULL, id=NULL, pane=NULL, attribution=NULL, click_lat_lng_val=NULL, click_lat_lng_idx=NULL, dbl_click_lat_lng_val=NULL, dbl_click_lat_lng_idx=NULL) {
    
    props <- list(children=children, url=url, band=band, image=image, colorscale=colorscale, domainMin=domainMin, domainMax=domainMax, clampHigh=clampHigh, clampLow=clampLow, classes=classes, clip=clip, style=style, tileSize=tileSize, opacity=opacity, updateWhenIdle=updateWhenIdle, updateWhenZooming=updateWhenZooming, updateInterval=updateInterval, zIndex=zIndex, bounds=bounds, minZoom=minZoom, maxZoom=maxZoom, minNativeZoom=minNativeZoom, maxNativeZoom=maxNativeZoom, noWrap=noWrap, className=className, keepBuffer=keepBuffer, interactive=interactive, bubblingMouseEvents=bubblingMouseEvents, id=id, pane=pane, attribution=attribution, click_lat_lng_val=click_lat_lng_val, click_lat_lng_idx=click_lat_lng_idx, dbl_click_lat_lng_val=dbl_click_lat_lng_val, dbl_click_lat_lng_idx=dbl_click_lat_lng_idx)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'GeoTIFFOverlay',
        namespace = 'dash_leaflet',
        propNames = c('children', 'url', 'band', 'image', 'colorscale', 'domainMin', 'domainMax', 'clampHigh', 'clampLow', 'classes', 'clip', 'style', 'tileSize', 'opacity', 'updateWhenIdle', 'updateWhenZooming', 'updateInterval', 'zIndex', 'bounds', 'minZoom', 'maxZoom', 'minNativeZoom', 'maxNativeZoom', 'noWrap', 'className', 'keepBuffer', 'interactive', 'bubblingMouseEvents', 'id', 'pane', 'attribution', 'click_lat_lng_val', 'click_lat_lng_idx', 'dbl_click_lat_lng_val', 'dbl_click_lat_lng_idx'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
