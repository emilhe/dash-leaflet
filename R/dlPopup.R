# AUTO GENERATED FILE - DO NOT EDIT

dlPopup <- function(children=NULL, position=NULL, maxWidth=NULL, minWidth=NULL, maxHeight=NULL, autoPan=NULL, autoPanPaddingTopLeft=NULL, autoPanPaddingBottomRight=NULL, autoPanPadding=NULL, keepInView=NULL, closeButton=NULL, autoClose=NULL, closeOnEscapeKey=NULL, closeOnClick=NULL, id=NULL, className=NULL, pane=NULL, attribution=NULL) {
    
    props <- list(children=children, position=position, maxWidth=maxWidth, minWidth=minWidth, maxHeight=maxHeight, autoPan=autoPan, autoPanPaddingTopLeft=autoPanPaddingTopLeft, autoPanPaddingBottomRight=autoPanPaddingBottomRight, autoPanPadding=autoPanPadding, keepInView=keepInView, closeButton=closeButton, autoClose=autoClose, closeOnEscapeKey=closeOnEscapeKey, closeOnClick=closeOnClick, id=id, className=className, pane=pane, attribution=attribution)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Popup',
        namespace = 'dash_leaflet',
        propNames = c('children', 'position', 'maxWidth', 'minWidth', 'maxHeight', 'autoPan', 'autoPanPaddingTopLeft', 'autoPanPaddingBottomRight', 'autoPanPadding', 'keepInView', 'closeButton', 'autoClose', 'closeOnEscapeKey', 'closeOnClick', 'id', 'className', 'pane', 'attribution'),
        package = 'dashLeaflet'
        )

    structure(component, class = c('dash_component', 'list'))
}
