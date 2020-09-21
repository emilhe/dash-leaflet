# AUTO GENERATED FILE - DO NOT EDIT

dlColorbar <- function(children=NULL, position=NULL, colorscale=NULL, width=NULL, height=NULL, min=NULL, max=NULL, classes=NULL, unit=NULL, nTicks=NULL, tickDecimals=NULL, tickValues=NULL, tickText=NULL, tooltip=NULL, opacity=NULL, style=NULL, id=NULL, className=NULL) {
    
    props <- list(children=children, position=position, colorscale=colorscale, width=width, height=height, min=min, max=max, classes=classes, unit=unit, nTicks=nTicks, tickDecimals=tickDecimals, tickValues=tickValues, tickText=tickText, tooltip=tooltip, opacity=opacity, style=style, id=id, className=className)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Colorbar',
        namespace = 'dash_leaflet',
        propNames = c('children', 'position', 'colorscale', 'width', 'height', 'min', 'max', 'classes', 'unit', 'nTicks', 'tickDecimals', 'tickValues', 'tickText', 'tooltip', 'opacity', 'style', 'id', 'className'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
