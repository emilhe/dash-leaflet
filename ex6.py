import dash_html_components as html
import dash
import dash_core_components as dcc
import dash_leaflet as dl
import dash_leaflet.express as dlx
from dash.dependencies import Input, Output

spider_markers = [dict(lat=-37.8, lon=175.6)] * 100
data = dlx.markers_to_geojson(spider_markers)

app = dash.Dash(__name__)
app.layout = html.Div([
    dl.Map([dl.TileLayer(), dl.GeoJSON2(data=data, pointToLayer="hest")],
           style={'width': '100%', 'height': '50vh', 'margin': "auto", "display": "block"})
])


# @app.callback(Output("my-output", "children"),
#               [Input("my-input", "value")])
# def output_text(value):
#     value = 0 if value is None else value
#     return html.Div(html.H6(value))


if __name__ == "__main__":
    app.run_server(debug=True, port=8557)