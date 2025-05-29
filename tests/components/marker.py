from dash_leaflet import Marker
from tests.stubs import event_app_stub

selector = ".leaflet-marker-icon"
component = Marker(position=[56, 10], id="marker")
app, _ = event_app_stub(components=[component])

if __name__ == "__main__":
    app.run(port=9997)