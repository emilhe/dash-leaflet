from dash_leaflet import DivMarker
from tests.stubs import event_app_stub

selector = ".leaflet-marker-icon"
component = DivMarker(position=[56, 10], id="marker", iconOptions=dict(html="This is <b> html <b/>"))
app, _ = event_app_stub(components=[component])

if __name__ == "__main__":
    app.run(port=9997)