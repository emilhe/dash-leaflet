from dash_leaflet import ImageOverlay, TileLayer
from tests.stubs import event_app_stub

bounds = [[40.712216, -74.22655], [40.773941, -74.12544]]
component = ImageOverlay(
    url="https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg", 
    bounds=bounds, opacity=0.5, id="image_overlay", interactive=True
)
center = [(bounds[0][0] + bounds[1][0])/2, (bounds[0][1] + bounds[1][1])/2]
app, _ = event_app_stub(components=[component, TileLayer()], center=center, zoom=12)

if __name__ == "__main__":
    app.run_server(port=9997)