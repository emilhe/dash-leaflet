import dash
import dash_html_components as html
import dash_leaflet as dl

app = dash.Dash()
app.layout = html.Div([
    dl.Map([dl.TileLayer(), dl.Marker(position=(56,10), children=[dl.Popup("Hello world!")])],
           id="map", style={'width': '100%', 'height': '50vh', 'margin': "auto", "display": "block"}),
])

if __name__ == '__main__':
    app.run_server(port=8051)