import dash_leaflet as dl
from dash import Dash

app = Dash()
app.layout = dl.Map(
    [
        dl.TileLayer(),
        dl.VectorTileLayer(url="https://openinframap.org/tiles/{z}/{x}/{y}.pbf", maxDetailZoom=6, style={}),
    ],
    center=[56, 10],
    zoom=8,
    style={"height": "50vh"},
)

if __name__ == "__main__":
    app.run_server(debug=True)
