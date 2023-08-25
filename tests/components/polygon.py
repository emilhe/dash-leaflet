from dash_leaflet import Polygon
from tests.stubs import event_app_stub

component = Polygon(positions=[[56, 10], [56, 11], [54, 12], [57, 9]], id="polygon")
app, _ = event_app_stub(components=[component])

if __name__ == "__main__":
    app.run_server(port=9997)