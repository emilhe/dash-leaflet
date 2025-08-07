from dash_leaflet import GestureHandling, TileLayer
from tests.stubs import app_stub

app = app_stub(components=[GestureHandling(), TileLayer()])

if __name__ == "__main__":
    app.run(port=9997)