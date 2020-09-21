% Auto-generated: do not edit by hand
\name{dlGeoJSON}

\alias{dlGeoJSON}

\title{GeoJSON component}

\description{
LayerGroup is a wrapper of LayerGroup in react-leaflet. It takes similar properties to its react-leaflet counterpart.
}

\usage{
dlGeoJSON(children=NULL, options=NULL, data=NULL, url=NULL,
format=NULL, hoverStyle=NULL, zoomToBoundsOnClick=NULL,
zoomToBounds=NULL, hideout=NULL, pane=NULL, cluster=NULL,
clusterToLayer=NULL, spiderfyOnMaxZoom=NULL,
superClusterOptions=NULL, id=NULL, n_clicks=NULL,
click_feature=NULL, hover_feature=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. Children}

\item{options}{Named list. Options for the GeoJSON object (see https://leafletjs.com/reference-1.6.0.html#geojson-option for details).}

\item{data}{Named list | character. Data (consider using url for better performance).}

\item{url}{Character. Url to data (use instead of data for better performance).}

\item{format}{A value equal to: "geojson", "geobuf". Data format.}

\item{hoverStyle}{Character | named list. Style function applied on hover.}

\item{zoomToBoundsOnClick}{Logical. If true, zoom to feature bounds on click.}

\item{zoomToBounds}{Logical. If true, zoom bounds when data are set.}

\item{hideout}{Named list. Object intended for passing variables to functional properties, i.e. clusterToLayer, hoverStyle and
(options) pointToLayer, style, filter, and onEachFeature functions.}

\item{pane}{Character. The leaflet pane of the component}

\item{cluster}{Logical. If true, marker clustering will be performed.}

\item{clusterToLayer}{Character. Function that determines how a cluster is drawn.}

\item{spiderfyOnMaxZoom}{Logical. If true, markers that are not resolved at max zoom level will be spiderfied on click.}

\item{superClusterOptions}{Named list. Options for the SuperCluster object (see https://github.com/mapbox/supercluster for details).}

\item{id}{Character. The ID used to identify this component in Dash callbacks}

\item{n_clicks}{Numeric. Dash callback property. Number of times the object has been clicked.}

\item{click_feature}{Named list. Last feature clicked.}

\item{hover_feature}{Named list. Last feature hovered.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

