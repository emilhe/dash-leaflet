from dash_leaflet import TileLayer
from tests.stubs import event_app_stub

target_id = "tile_layer"
component = TileLayer(id=target_id, url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
app, _ = event_app_stub(components=[component], target_prop="load")

if __name__ == "__main__":
    app.run_server(port=9997)