% Auto-generated: do not edit by hand
\name{dlPolylineDecorator}

\alias{dlPolylineDecorator}

\title{PolylineDecorator component}

\description{
Polyline is a wrapper of Polyline in react-leaflet. It takes similar properties to its react-leaflet counterpart.
}

\usage{
dlPolylineDecorator(children=NULL, positions=NULL, patterns=NULL, id=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component. If positions are not specified, an attempt is made to read them from the
children property. In this case, the children must be a single PolyLine or a single Polygon.}

\item{positions}{List of list of numericss | list of list of list of numericsss. An array of geographical points (lat, lon)}

\item{patterns}{List of lists containing elements 'offset', 'endoffset', 'repeat', 'dash', 'arrowhead', 'marker'.
those elements have the following types:
  - offset (character; optional)
  - endoffset (character; optional)
  - repeat (character; optional)
  - dash (optional): . dash has the following type: lists containing elements 'pixelsize', 'pathoptions'.
those elements have the following types:
  - pixelsize (numeric; optional)
  - pathoptions (named list; optional)
  - arrowhead (optional): . arrowhead has the following type: lists containing elements 'polygon', 'pixelsize', 'headangle', 'pathoptions'.
those elements have the following types:
  - polygon (logical; optional)
  - pixelsize (numeric; optional)
  - headangle (numeric; optional)
  - pathoptions (named list; optional)
  - marker (optional): . marker has the following type: lists containing elements 'markeroptions', 'rotate'.
those elements have the following types:
  - markeroptions (named list; optional)
  - rotate (logical; optional)s. List of patterns to be added.}

\item{id}{Character. The ID used to identify this component in Dash callbacks}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

