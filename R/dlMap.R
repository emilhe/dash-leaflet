# AUTO GENERATED FILE - DO NOT EDIT

dlMap <- function(children=NULL, animate=NULL, duration=NULL, easeLinearity=NULL, noMoveStart=NULL, bounds=NULL, boundsOptions=NULL, boxZoom=NULL, center=NULL, doubleClickZoom=NULL, dragging=NULL, keyboard=NULL, maxBounds=NULL, scrollWheelZoom=NULL, useFlyTo=NULL, tap=NULL, touchZoom=NULL, viewport=NULL, zoom=NULL, preferCanvas=NULL, attributionControl=NULL, zoomControl=NULL, closePopupOnClick=NULL, zoomSnap=NULL, zoomDelta=NULL, trackResize=NULL, crs=NULL, minZoom=NULL, maxZoom=NULL, renderer=NULL, zoomAnimation=NULL, zoomAnimationThreshold=NULL, fadeAnimation=NULL, markerZoomAnimation=NULL, transform3DLimit=NULL, inertia=NULL, inertiaDeceleration=NULL, inertiaMaxSpeed=NULL, worldCopyJump=NULL, maxBoundsViscosity=NULL, keyboardPanDelta=NULL, wheelDebounceTime=NULL, wheelPxPerZoomLevel=NULL, tapTolerance=NULL, bounceAtZoomLimits=NULL, id=NULL, style=NULL, className=NULL, attribution=NULL, click_lat_lng=NULL, dbl_click_lat_lng=NULL, location_lat_lon_acc=NULL) {
    
    props <- list(children=children, animate=animate, duration=duration, easeLinearity=easeLinearity, noMoveStart=noMoveStart, bounds=bounds, boundsOptions=boundsOptions, boxZoom=boxZoom, center=center, doubleClickZoom=doubleClickZoom, dragging=dragging, keyboard=keyboard, maxBounds=maxBounds, scrollWheelZoom=scrollWheelZoom, useFlyTo=useFlyTo, tap=tap, touchZoom=touchZoom, viewport=viewport, zoom=zoom, preferCanvas=preferCanvas, attributionControl=attributionControl, zoomControl=zoomControl, closePopupOnClick=closePopupOnClick, zoomSnap=zoomSnap, zoomDelta=zoomDelta, trackResize=trackResize, crs=crs, minZoom=minZoom, maxZoom=maxZoom, renderer=renderer, zoomAnimation=zoomAnimation, zoomAnimationThreshold=zoomAnimationThreshold, fadeAnimation=fadeAnimation, markerZoomAnimation=markerZoomAnimation, transform3DLimit=transform3DLimit, inertia=inertia, inertiaDeceleration=inertiaDeceleration, inertiaMaxSpeed=inertiaMaxSpeed, worldCopyJump=worldCopyJump, maxBoundsViscosity=maxBoundsViscosity, keyboardPanDelta=keyboardPanDelta, wheelDebounceTime=wheelDebounceTime, wheelPxPerZoomLevel=wheelPxPerZoomLevel, tapTolerance=tapTolerance, bounceAtZoomLimits=bounceAtZoomLimits, id=id, style=style, className=className, attribution=attribution, click_lat_lng=click_lat_lng, dbl_click_lat_lng=dbl_click_lat_lng, location_lat_lon_acc=location_lat_lon_acc)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Map',
        namespace = 'dash_leaflet',
        propNames = c('children', 'animate', 'duration', 'easeLinearity', 'noMoveStart', 'bounds', 'boundsOptions', 'boxZoom', 'center', 'doubleClickZoom', 'dragging', 'keyboard', 'maxBounds', 'scrollWheelZoom', 'useFlyTo', 'tap', 'touchZoom', 'viewport', 'zoom', 'preferCanvas', 'attributionControl', 'zoomControl', 'closePopupOnClick', 'zoomSnap', 'zoomDelta', 'trackResize', 'crs', 'minZoom', 'maxZoom', 'renderer', 'zoomAnimation', 'zoomAnimationThreshold', 'fadeAnimation', 'markerZoomAnimation', 'transform3DLimit', 'inertia', 'inertiaDeceleration', 'inertiaMaxSpeed', 'worldCopyJump', 'maxBoundsViscosity', 'keyboardPanDelta', 'wheelDebounceTime', 'wheelPxPerZoomLevel', 'tapTolerance', 'bounceAtZoomLimits', 'id', 'style', 'className', 'attribution', 'click_lat_lng', 'dbl_click_lat_lng', 'location_lat_lon_acc'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
