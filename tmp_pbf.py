"""
Simple Vector Tile Layer Example

A minimal example showing how to use VectorTileLayer with OpenInfraMap tiles.
This demonstrates basic usage with click event handling.
"""

import dash_leaflet as dl
from dash import Dash
from dash_extensions.javascript import assign

# Custom event handler to log click events
event_handlers = dict(
    click=assign("function(e, ctx) { console.log('Click event:', e); console.log('Context:', ctx); }")
)

app = Dash(__name__)

app.layout = dl.Map(
    [
        # Base tile layer (OpenStreetMap)
        dl.TileLayer(),

        # Vector tile layer
        dl.VectorTileLayer(
            url="https://openinframap.org/tiles/{z}/{x}/{y}.pbf",
            # Control which zoom levels to fetch tiles at
            minDetailZoom=6,
            maxDetailZoom=14,
            # Simple styling - all features get these styles
            vectorTileLayerStyles={
                'power_line': {'color': '#FF0000', 'weight': 2},
                'power_tower': {'color': '#FF6600', 'radius': 3},
                'power_plant': {'color': '#990000', 'fillColor': '#FF0000', 'fillOpacity': 0.5},
            },
            # Custom event handlers (optional)
            eventHandlers=event_handlers,
        ),
    ],
    center=[56, 10],  # Denmark
    zoom=8,
    style={"height": "100vh"},  # Full viewport height
)

if __name__ == "__main__":
    app.run_server(debug=True)
