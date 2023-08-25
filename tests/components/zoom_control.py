from dash_leaflet import ZoomControl
from tests.stubs import app_stub

component = ZoomControl(position="bottomright")
app = app_stub(components=[component])

if __name__ == "__main__":
    app.run_server(port=9997)