from dash_leaflet import Polyline
from tests.stubs import event_app_stub

selector = ".leaflet-interactive"
component = Polyline(positions=[[56, 10], [56, 11], [54, 12], [57, 9]], id="polyline")
app, _ = event_app_stub(components=[component])

if __name__ == "__main__":
    app.run_server(port=9997)