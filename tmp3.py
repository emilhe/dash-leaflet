import dash
import dash_html_components as html
import dash_leaflet as dl
import json

from dash.dependencies import Input, Output

app = dash.Dash(prevent_initial_callbacks=True)
app.layout = html.Div([
    dl.Map([dl.TileLayer(), dl.Marker(id="marker", draggable=True, position=(56,10))],
           id="map", style={'width': '100%', 'height': '50vh', 'margin': "auto", "display": "block"}),
    html.Div(id="output")
])


@app.callback(Output("output", "children"), [Input("marker", "position")])
def map_click(click_lat_lng):
    return json.dumps(click_lat_lng)


if __name__ == '__main__':
    app.run_server()