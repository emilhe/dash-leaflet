# AUTO GENERATED FILE - DO NOT EDIT

dlGeoJSON <- function(children=NULL, options=NULL, data=NULL, url=NULL, format=NULL, hoverStyle=NULL, zoomToBoundsOnClick=NULL, zoomToBounds=NULL, hideout=NULL, pane=NULL, cluster=NULL, clusterToLayer=NULL, spiderfyOnMaxZoom=NULL, superClusterOptions=NULL, id=NULL, n_clicks=NULL, click_feature=NULL, hover_feature=NULL) {
    
    props <- list(children=children, options=options, data=data, url=url, format=format, hoverStyle=hoverStyle, zoomToBoundsOnClick=zoomToBoundsOnClick, zoomToBounds=zoomToBounds, hideout=hideout, pane=pane, cluster=cluster, clusterToLayer=clusterToLayer, spiderfyOnMaxZoom=spiderfyOnMaxZoom, superClusterOptions=superClusterOptions, id=id, n_clicks=n_clicks, click_feature=click_feature, hover_feature=hover_feature)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'GeoJSON',
        namespace = 'dash_leaflet',
        propNames = c('children', 'options', 'data', 'url', 'format', 'hoverStyle', 'zoomToBoundsOnClick', 'zoomToBounds', 'hideout', 'pane', 'cluster', 'clusterToLayer', 'spiderfyOnMaxZoom', 'superClusterOptions', 'id', 'n_clicks', 'click_feature', 'hover_feature'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
