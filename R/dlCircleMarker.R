# AUTO GENERATED FILE - DO NOT EDIT

dlCircleMarker <- function(children=NULL, center=NULL, radius=NULL, stroke=NULL, color=NULL, weight=NULL, opacity=NULL, lineCap=NULL, lineJoin=NULL, dashArray=NULL, dashOffset=NULL, fill=NULL, fillColor=NULL, fillOpacity=NULL, fillRule=NULL, bubblingMouseEvents=NULL, renderer=NULL, className=NULL, interactive=NULL, id=NULL, pane=NULL, attribution=NULL, n_clicks=NULL) {
    
    props <- list(children=children, center=center, radius=radius, stroke=stroke, color=color, weight=weight, opacity=opacity, lineCap=lineCap, lineJoin=lineJoin, dashArray=dashArray, dashOffset=dashOffset, fill=fill, fillColor=fillColor, fillOpacity=fillOpacity, fillRule=fillRule, bubblingMouseEvents=bubblingMouseEvents, renderer=renderer, className=className, interactive=interactive, id=id, pane=pane, attribution=attribution, n_clicks=n_clicks)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'CircleMarker',
        namespace = 'dash_leaflet',
        propNames = c('children', 'center', 'radius', 'stroke', 'color', 'weight', 'opacity', 'lineCap', 'lineJoin', 'dashArray', 'dashOffset', 'fill', 'fillColor', 'fillOpacity', 'fillRule', 'bubblingMouseEvents', 'renderer', 'className', 'interactive', 'id', 'pane', 'attribution', 'n_clicks'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
