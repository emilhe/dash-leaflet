import dash
import dash_leaflet as dl
import dash_html_components as html

app = dash.Dash(__name__)
app.layout = html.Div([
    dl.Map(style={'width': '1000px', 'height': '500px'}, center=[56.05, 10.25], zoom=10, children=[
        dl.TileLayer(url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"),
    ])
])

if __name__ == '__main__':
    app.run_server(debug=False, port=8051)
