import dash
import dash_html_components as html
import dash_leaflet as dl
import dash_leaflet.express as dlx
import geobuf
import base64
from numpy import random

# Create some simple markers.
markers = [dict(lat=56 + random.rand(), lon=10 + random.rand()) for i in range(10000)]
# Create a few customized markers.
markers += [
    dict(lat=55, lon=9, tooltip="I am a tooltip"),  # marker with tooltip
    dict(lat=55, lon=10, popup="I am a popup"),  # marker with popup
    dict(lat=55, lon=11, markerOptions=dict(opacity=0.5)),  # marker with options
    dict(lat=55, lon=12, markerOptions=dict(icon=dict(iconUrl="assets/icon_plane.png"))),  # marker with custom icon
]
# Convert markers to geobuf (smaller payload than raw geojson).
geojson = dlx.markers_to_geojson(markers)
pbf = base64.b64encode(geobuf.encode(geojson)).decode()
# Create example app.
app = dash.Dash()
app.layout = html.Div([
    dl.Map([dl.TileLayer(), dl.SuperCluster(data=pbf, format="geobuf", options={"radius": 100, "maxZoom": 18})], 
    center=(56, 10), zoom=7, style={'width': '100%', 'height': '50vh', 'margin': "auto", "display": "block"})
])

@app.server.errorhandler(404)
def page_not_found(error):
    output = "Hest"

if __name__ == '__main__':
    app.run_server(debug=False)