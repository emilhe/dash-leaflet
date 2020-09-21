% Auto-generated: do not edit by hand
\name{dlVideoOverlay}

\alias{dlVideoOverlay}

\title{VideoOverlay component}

\description{
VideoOverlay is a wrapper of VideoOverlay in react-leaflet. It takes similar properties to its react-leaflet counterpart.
}

\usage{
dlVideoOverlay(children=NULL, url=NULL, bounds=NULL, opacity=NULL,
play=NULL, zIndex=NULL, loop=NULL, keepAspectRatio=NULL,
alt=NULL, interactive=NULL, bubblingMouseEvents=NULL,
crossOrigin=NULL, errorOverlayUrl=NULL, className=NULL,
id=NULL, pane=NULL, attribution=NULL, click_lat_lng=NULL,
dbl_click_lat_lng=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component}

\item{url}{A value equal to: proptypes.string, proptypes.arrayof(proptypes.string). The URL of the video}

\item{bounds}{List of list of numericss. The geographical bounds the video is tied to.}

\item{opacity}{Numeric. The opacity of the image overlay.}

\item{play}{Logical. Sets the play status of the video}

\item{zIndex}{Numeric. The explicit zIndex of the overlay layer.}

\item{loop}{Logical. Whether the video will loop back to the beginning when played.}

\item{keepAspectRatio}{Logical. Whether the video will save aspect ratio after the projection. Relevant 
for supported browsers. Browser compatibility- 
https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit}

\item{alt}{Character. Text for the alt attribute of the image (useful for accessibility).}

\item{interactive}{Logical. If true, the image overlay will emit mouse events when clicked or hovered.}

\item{bubblingMouseEvents}{Logical. When true, a mouse event on this path will trigger the same 
event on the map (unless L.DomEvent.stopPropagation is used).}

\item{crossOrigin}{Logical. Whether the crossOrigin attribute will be added to the image. If 
a String is provided, the image will have its crossOrigin attribute 
set to the String provided. This is needed if you want to access image 
pixel data. Refer to CORS Settings for valid String values.}

\item{errorOverlayUrl}{Character. URL to the overlay image to show in place of the overlay that failed to load.}

\item{className}{Character. A custom class name to assign to the image. Empty by default.}

\item{id}{Character. The ID used to identify this component in Dash callbacks}

\item{pane}{Character. The leaflet pane of the component}

\item{attribution}{Character. The attribution string for the component (dynamic)}

\item{click_lat_lng}{List of numerics. Dash callback property. Receives [lat, lng] upon click. Requires interactive=True.}

\item{dbl_click_lat_lng}{List of numerics. Dash callback property. Receives [lat, lng] upon double click. Requires interactive=True.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

