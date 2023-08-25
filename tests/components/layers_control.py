from dash_leaflet import LayersControl, TileLayer, BaseLayer, Overlay, Marker
from tests.stubs import app_stub

component = LayersControl(position="topright", children=[
    BaseLayer(name="default", children=[TileLayer()], checked=True),
    BaseLayer(name="other", children=[TileLayer(url="http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png")]),
    Overlay(name="marker", children=[Marker(position=[56, 10])])
])
app = app_stub(components=[component])

if __name__ == "__main__":
    app.run_server(port=9997)