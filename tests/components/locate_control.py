from dash_leaflet import LocateControl, TileLayer
from tests.stubs import app_stub

component = LocateControl(locateOptions=dict(enableHighAccuracy=True))
app = app_stub(components=[component, TileLayer()])

if __name__ == "__main__":
    app.run(port=9997)