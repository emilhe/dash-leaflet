from dash_leaflet import VideoOverlay, TileLayer
from tests.stubs import event_app_stub

bounds = [[ 32, -130], [ 13, -100]]
component = VideoOverlay(
    url="https://www.mapbox.com/bites/00188/patricia_nasa.mp4", 
    bounds=bounds, opacity=0.8, id="image_overlay", interactive=True, play=True
)
app, _ = event_app_stub(components=[component, TileLayer()], bounds=bounds, zoom=4)

if __name__ == "__main__":
    app.run_server(port=9997)