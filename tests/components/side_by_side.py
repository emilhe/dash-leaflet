from dash_leaflet import SideBySide, TileLayer, Map
from tests.stubs import app_stub

left_layer = TileLayer(
    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    maxZoom=19,
    className="leaflet-layer-left"
)

right_layer = TileLayer(
    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
    maxZoom=19,
    subdomains='abcd',
    className="leaflet-layer-right"
)

app = app_stub(components=[
    Map([

        right_layer,  # Then right layer
        left_layer,  # Add left layer first
        SideBySide(  # Then the control
            leftLayers=[left_layer],
            rightLayers=[right_layer],
            thumbSize=42,
            padding=0
        )
    ], style={'height': '100%'}, center=[51.505, -0.09], zoom=13)
])

if __name__ == "__main__":
    app.run_server(debug=True, dev_tools_hot_reload=False, port=8051)