from dash_leaflet import MeasureControl, TileLayer
from tests.stubs import app_stub

app = app_stub(components=[MeasureControl(), TileLayer()])

if __name__ == "__main__":
    app.run_server(port=9997)