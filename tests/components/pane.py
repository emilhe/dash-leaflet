from dash_leaflet import Marker, Pane, Tooltip, Rectangle
from tests.stubs import event_app_stub

selector = ".leaflet-marker-icon"
target_id = "upper"
components = [
    Pane(Rectangle(bounds=[[55, 9], [57, 11]], children=[Tooltip("lower")]), style=dict(zIndex=499), name="lower"),
    Pane(Marker(position=[56, 10], id=target_id, children=[Tooltip(target_id)]), style=dict(zIndex=500), name=target_id)
]
app, _ = event_app_stub(components=components, target_id=target_id)

if __name__ == "__main__":
    app.run_server(port=9997)
