% Auto-generated: do not edit by hand
\name{dlPopup}

\alias{dlPopup}

\title{Popup component}

\description{
Popup is a wrapper of Popup in react-leaflet. It takes similar properties to its react-leaflet counterpart.
}

\usage{
dlPopup(children=NULL, position=NULL, maxWidth=NULL, minWidth=NULL,
maxHeight=NULL, autoPan=NULL, autoPanPaddingTopLeft=NULL,
autoPanPaddingBottomRight=NULL, autoPanPadding=NULL,
keepInView=NULL, closeButton=NULL, autoClose=NULL,
closeOnEscapeKey=NULL, closeOnClick=NULL, id=NULL,
className=NULL, pane=NULL, attribution=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component}

\item{position}{List of numerics. A geographical point (lat, lon)}

\item{maxWidth}{Numeric. Max width of the popup, in pixels.}

\item{minWidth}{Numeric. Min width of the popup, in pixels.}

\item{maxHeight}{Numeric. If set, creates a scrollable container of the given height
inside a popup if its content exceeds it.}

\item{autoPan}{Logical. Set it to false if you don't want the map to do panning 
animation to fit the opened popup.}

\item{autoPanPaddingTopLeft}{Named list. The margin between the popup and the top left corner of the map 
view after autopanning was performed.}

\item{autoPanPaddingBottomRight}{Named list. The margin between the popup and the bottom right corner of the
map view after autopanning was performed.}

\item{autoPanPadding}{Named list. Equivalent of setting both top left and bottom right autopan padding 
to the same value.}

\item{keepInView}{Logical. Set it to true if you want to prevent users from panning the popup 
off of the screen while it is open.}

\item{closeButton}{Logical. Controls the presence of a close button in the popup.}

\item{autoClose}{Logical. Set it to false if you want to override the default behavior of the popup 
closing when another popup is opened.}

\item{closeOnEscapeKey}{Logical. Set it to false if you want to override the default behavior of the ESC 
key for closing of the popup.}

\item{closeOnClick}{Logical. Set it if you want to override the default behavior of the popup closing 
when user clicks on the map. Defaults to the map's closePopupOnClick option.}

\item{id}{Character. The ID used to identify this component in Dash callbacks}

\item{className}{Character. The class of the component (dynamic)}

\item{pane}{Character. The leaflet pane of the component}

\item{attribution}{Character. The attribution string for the component (dynamic)}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

