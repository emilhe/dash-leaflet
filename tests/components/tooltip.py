from dash_leaflet import Tooltip, Marker
from tests.stubs import app_stub

component = Marker(position=[56, 10], children=Tooltip(content="Hello world!"))
app = app_stub(components=[component])

if __name__ == "__main__":
    app.run_server(port=9997)