from dash_leaflet import ScaleControl
from tests.stubs import app_stub

component = ScaleControl(position="bottomleft")
app = app_stub(components=[component])

if __name__ == "__main__":
    app.run_server(port=9997)