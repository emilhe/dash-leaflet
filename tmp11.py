import dash
import dash_html_components as html
import dash_leaflet as dl
import dash_leaflet.express as dlx

# Create a few customized markers.
markers = [
    dict(lat=-37.8, lon=174.95, tooltip="I am a tooltip"),  # marker with tooltip
    dict(lat=-37.8, lon=175.00, popup="I am a popup"),  # marker with popup
    dict(lat=-37.8, lon=175.05, markerOptions=dict(opacity=0.5)),  # marker with options
    dict(lat=-37.8, lon=175.10, markerOptions=dict(icon=dict(iconUrl="assets/icon_plane.png"))),  # marker with custom icon
]
# Add a few markers at the same location to illustrate spiderfy.
markers += [dict(lat=-37.8, lon=175.7)]*100

# Create example app.
app = dash.Dash()
app.layout = html.Div([
    dl.Map([
        dl.TileLayer(),
        # Create super cluter from in-memory geojson (less performant).
        dlx.supercluster(markers),
        # Create super cluster from hosted asset (most performant).
        dl.SuperCluster(url='assets/leaflet_50k.pbf', format="geobuf", superclusterOptions={"radius": 100}),
    ], center=(-37.8, 175.3), zoom=11, style={'width': '100%', 'height': '50vh', 'margin': "auto", "display": "block"})
])

if __name__ == '__main__':
    app.run_server(port=7001)