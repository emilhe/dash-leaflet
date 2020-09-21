% Auto-generated: do not edit by hand
\name{dlLocateControl}

\alias{dlLocateControl}

\title{LocateControl component}

\description{
LocateControl is a wrapper of LocateControl in react-leaflet. The component requires linking font-awesome, i.e. app = dash.Dash(external_stylesheets=['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'])
}

\usage{
dlLocateControl(children=NULL, className=NULL, id=NULL, startDirectly=NULL,
options=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component (dynamic).}

\item{className}{Character. A custom class name to assign to the image. Empty by default.}

\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{startDirectly}{Logical. If true, the location control is activated on map load.}

\item{options}{Named list. Location control options (a dict). See list of options in the code,
https://github.com/domoritz/leaflet-locatecontrol/blob/gh-pages/src/L.Control.Locate.js#L146}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

