"""
Basic VectorTileLayer example.

Demonstrates basic usage of VectorTileLayer with click events.
"""
import json
from dash import Dash, html, Output, Input
from dash_leaflet import MapContainer, TileLayer, VectorTileLayer

app = Dash(__name__)
app.layout = html.Div([
    MapContainer(
        [
            TileLayer(),
            VectorTileLayer(
                id="vtl",
                url="https://openinframap.org/tiles/{z}/{x}/{y}.pbf",
                maxDetailZoom=14,
                style={"weight": 2, "color": "#ff0000"},
            ),
        ],
        center=[56, 10],
        zoom=8,
        style={"height": "50vh"},
    ),
    html.Pre(id="info"),
])


@app.callback(Output("info", "children"), Input("vtl", "clickData"))
def show_click(data):
    return json.dumps(data, indent=2)


if __name__ == "__main__":
    app.run_server(debug=True)
