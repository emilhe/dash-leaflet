from dash_leaflet import WMSTileLayer
from tests.stubs import event_app_stub

target_id = "tile_layer"
component = WMSTileLayer(
    url='http://ows.mundialis.de/services/service?',
    layers='SRTM30-Colored-Hillshade',
    id=target_id
)
app, _ = event_app_stub(components=[component], target_prop="load")

if __name__ == "__main__":
    app.run_server(port=9997)