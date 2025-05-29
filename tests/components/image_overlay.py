from dash_leaflet import ImageOverlay, TileLayer
from tests.stubs import event_app_stub

bounds = [[40.712216, -74.22655], [40.773941, -74.12544]]
component = ImageOverlay(
    url="https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg", 
    bounds=bounds, opacity=0.5, id="image_overlay", interactive=True
)
app, _ = event_app_stub(components=[component, TileLayer()], bounds=bounds)

if __name__ == "__main__":
    app.run(port=9997)