import json
import dash
import dash_html_components as html
import dash_leaflet as dl
import dash_leaflet.express as dlx
import some_module

from dash_extensions import transcrypt
from dash.dependencies import Output, Input

# Create some sample data.
markers = [dict(lat=56, lon=10)]
data = dlx.markers_to_geojson(markers)
# Create example app.
app = dash.Dash(__name__)
transcrypt.bind(app, some_module)  # this is where the magic happens
app.layout = html.Div([
    dl.Map([dl.TileLayer(), dl.GeoJSON2(data=data, options=dict(pointToLayer=some_module.hest), id="geojson")],
           style={'width': '100%', 'height': '50vh', 'margin': "auto", "display": "block"}, id="map"),
    html.Div(id="log")
])


@app.callback(Output("log", "children"), [Input("geojson", "featureHover")])
def onclick(n_clicks):
    return json.dumps(n_clicks)


if __name__ == "__main__":
    app.run_server(debug=True, port=8557)
