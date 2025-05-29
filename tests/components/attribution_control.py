from dash_leaflet import AttributionControl
from tests.stubs import app_stub

component = AttributionControl(position="bottomleft")
app = app_stub(components=[component])

if __name__ == "__main__":
    app.run(port=9997)