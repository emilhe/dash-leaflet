from dash_leaflet import LocateControl, TileLayer
from tests.stubs import app_stub

component = LocateControl()
app = app_stub(components=[component, TileLayer()])

if __name__ == "__main__":
    app.run_server(port=9997)