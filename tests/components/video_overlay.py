from dash_leaflet import VideoOverlay, TileLayer
from tests.stubs import event_app_stub

bounds = [[ 32, -130], [ 13, -100]]
component = VideoOverlay(
    url="https://www.mapbox.com/bites/00188/patricia_nasa.mp4", 
    bounds=bounds, opacity=0.8, id="image_overlay", interactive=True, play=True
)
center = [(bounds[0][0] + bounds[1][0])/2, (bounds[0][1] + bounds[1][1])/2]
app, _ = event_app_stub(components=[component, TileLayer()], center=center, zoom=4)

if __name__ == "__main__":
    app.run_server(port=9997)