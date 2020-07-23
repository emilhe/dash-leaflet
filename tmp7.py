import dash
import dash_html_components as html
import dash_leaflet as dl
import pickle
import json

# Load marker positions.
with open("positions.json", 'r') as f:
    positions = json.load(f)
# Create app.
app = dash.Dash(prevent_initial_callbacks=True)
app.layout = html.Div([
    dl.Map([dl.TileLayer(), dl.MarkerClusterGroup(children=[dl.Marker(position=pos) for pos in positions])],
           id="map", style={'width': '100%', 'height': '50vh', 'margin': "auto", "display": "block"}),
])

if __name__ == '__main__':
    app.run_server(debug=True)