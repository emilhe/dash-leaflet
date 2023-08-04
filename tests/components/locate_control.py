from dash_leaflet import LocateControl, TileLayer
from tests.stubs import event_app_stub

selector = ".leaflet-interactive"
component = LocateControl(id="locate")
app, _ = event_app_stub(components=[component, TileLayer()])

if __name__ == "__main__":
    app.run_server(port=9997)