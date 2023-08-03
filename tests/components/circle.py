from dash_leaflet import Circle
from tests.stubs import event_app_stub

selector = ".leaflet-interactive"
component = Circle(center=[56, 10], radius=100, id="circle")
app, _ = event_app_stub(components=[component])

if __name__ == "__main__":
    app.run_server(port=9997)