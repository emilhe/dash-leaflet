from dash_leaflet import Marker, FeatureGroup
from tests.stubs import event_app_stub

selector = ".leaflet-marker-icon"
target_id = "marker"
component = FeatureGroup(Marker(position=[56, 10], id=target_id))
app, _ = event_app_stub(components=[component], target_id=target_id)

if __name__ == "__main__":
    app.run_server(port=9997)