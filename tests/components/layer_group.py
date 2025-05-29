from dash_leaflet import Marker, LayerGroup
from tests.stubs import event_app_stub

selector = ".leaflet-marker-icon"
target_id = "marker"
component = LayerGroup(Marker(position=[56, 10], id=target_id))
app, _ = event_app_stub(components=[component], target_id=target_id)

if __name__ == "__main__":
    app.run(port=9997)