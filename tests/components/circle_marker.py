from dash_leaflet import CircleMarker
from tests.stubs import event_app_stub

component = CircleMarker(center=[56, 10], radius=100, id="circle_marker")
app, _ = event_app_stub(components=[component])

if __name__ == "__main__":
    app.run_server(port=9997)