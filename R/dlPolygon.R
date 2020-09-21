# AUTO GENERATED FILE - DO NOT EDIT

dlPolygon <- function(children=NULL, positions=NULL, smoothFactor=NULL, noClip=NULL, stroke=NULL, color=NULL, weight=NULL, opacity=NULL, lineCap=NULL, lineJoin=NULL, dashArray=NULL, dashOffset=NULL, fill=NULL, fillColor=NULL, fillOpacity=NULL, fillRule=NULL, bubblingMouseEvents=NULL, renderer=NULL, className=NULL, interactive=NULL, id=NULL, pane=NULL, attribution=NULL, click_lat_lng=NULL, dbl_click_lat_lng=NULL) {
    
    props <- list(children=children, positions=positions, smoothFactor=smoothFactor, noClip=noClip, stroke=stroke, color=color, weight=weight, opacity=opacity, lineCap=lineCap, lineJoin=lineJoin, dashArray=dashArray, dashOffset=dashOffset, fill=fill, fillColor=fillColor, fillOpacity=fillOpacity, fillRule=fillRule, bubblingMouseEvents=bubblingMouseEvents, renderer=renderer, className=className, interactive=interactive, id=id, pane=pane, attribution=attribution, click_lat_lng=click_lat_lng, dbl_click_lat_lng=dbl_click_lat_lng)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Polygon',
        namespace = 'dash_leaflet',
        propNames = c('children', 'positions', 'smoothFactor', 'noClip', 'stroke', 'color', 'weight', 'opacity', 'lineCap', 'lineJoin', 'dashArray', 'dashOffset', 'fill', 'fillColor', 'fillOpacity', 'fillRule', 'bubblingMouseEvents', 'renderer', 'className', 'interactive', 'id', 'pane', 'attribution', 'click_lat_lng', 'dbl_click_lat_lng'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
