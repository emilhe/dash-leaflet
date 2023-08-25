from dash_leaflet import EditControl, TileLayer, FeatureGroup
from tests.stubs import app_stub

component = FeatureGroup(EditControl())
app = app_stub(components=[component, TileLayer()])

if __name__ == "__main__":
    app.run_server(port=9997)