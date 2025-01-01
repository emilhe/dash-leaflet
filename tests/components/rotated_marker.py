from dash import Dash, html
from dash.dependencies import Input, Output
from dash_leaflet import RotatedMarker, TileLayer
from tests.stubs import app_stub

# Define test selector
selector = ".leaflet-marker-icon"

icon = {
        "iconUrl": "https://github.com/weijun-lab/Leaflet.TrackPlayer/blob/master/examples/lib/assets/car.png?raw=true",
        "iconSize": [30, 30],
        "iconAnchor": [15, 15],
        "popupAnchor": [0, 0],
    }

# Create a rotated marker component
component = RotatedMarker(
    position=[56, 10],
    id="rotated-marker",
    rotationAngle=45,  # 45 degree rotation
    rotationOrigin='center center',  # rotate around center
    icon=icon
)

# Create the test app
app = app_stub(components=[component, TileLayer()])

if __name__ == "__main__":
    app.run_server(debug=True, port=8051)