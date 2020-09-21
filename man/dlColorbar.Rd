% Auto-generated: do not edit by hand
\name{dlColorbar}

\alias{dlColorbar}

\title{Colorbar component}

\description{
Colorbar is just a wrapper of LeafletColorbar.
}

\usage{
dlColorbar(children=NULL, position=NULL, colorscale=NULL, width=NULL,
height=NULL, min=NULL, max=NULL, classes=NULL, unit=NULL,
nTicks=NULL, tickDecimals=NULL, tickValues=NULL,
tickText=NULL, tooltip=NULL, opacity=NULL, style=NULL,
id=NULL, className=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component}

\item{position}{Character. Position of the colorbar. One of 'topleft', 'topright', 'bottomleft', 'bottomright'}

\item{colorscale}{Character | list of characters. Chroma-js colorscale. Either a colorscale name, e.g. "Viridis", or a list of colors,
e.g. ["black", "#fdd49e", "rgba(255,0,0,0.35)"].
The predefined colorscales are listed here:
https://github.com/gka/chroma.js/blob/master/src/colors/colorbrewer.js}

\item{width}{Numeric. Width of the colorbar. If width > height then the colorbar will be in horizontal mode.}

\item{height}{Numeric. Height of the colorbar. If height > width then the colorbar will be in vertical mode.}

\item{min}{Numeric. Domain minimum of the colorbar. Translates to the first color of the colorscale.}

\item{max}{Numeric. Domain maximum of the colorbar. Translates to the last color of the colorscale.}

\item{classes}{Numeric | list of numerics. The number or positions of discrete classes in the colorbar. If not set the 
colorbar will be continuous, which is the default.}

\item{unit}{Character. Optional text to append to the colorbar ticks.}

\item{nTicks}{Numeric. Number of ticks on the colorbar.}

\item{tickDecimals}{Numeric. If set, fixes the tick decimal points to the given number.}

\item{tickValues}{List of numerics. If set, these values are used for ticks (rather than the ones genrated based on nTicks).}

\item{tickText}{List of characters. If set, this text will be used instead of the data values.}

\item{tooltip}{Logical. If true, the value will be shown as tooltip on hover.}

\item{opacity}{Numeric. Opacity of the colorbar. Use it to match the perceived colors from an overlay 
with opacity.}

\item{style}{Named list. HTML style object to add to the colorbar entity, e.g. to set font color.}

\item{id}{Character. The ID used to identify this component in Dash callbacks}

\item{className}{Character. The class of the component}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

