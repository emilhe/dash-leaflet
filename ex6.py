import dash
import dash_html_components as html
import dash_leaflet as dl
import dash_leaflet.express as dlx
import client_funcs

from dash_extensions import transcrypt


app = dash.Dash(__name__)
client_funcs = transcrypt.bind(app, client_funcs, invalidate=True)

# The app itself.
spider_markers = [dict(lat=56, lon=10)]
data = dlx.markers_to_geojson(spider_markers)
app.layout = html.Div([
    dl.Map([dl.TileLayer(), dl.GeoJSON2(data=data, pointToLayer=client_funcs.hest)],
           style={'width': '100%', 'height': '50vh', 'margin': "auto", "display": "block"})
])

if __name__ == "__main__":
    app.run_server(debug=True, port=8557)
