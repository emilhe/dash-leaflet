import dash
import dash_html_components as html
import dash_leaflet as dl

app = dash.Dash()
app.layout = html.Div([
    dl.Map([dl.TileLayer(), dl.SuperCluster(url='assets/leaflet_50k.pbf', format="geobuf", options={"radius": 100})], 
    center=(-37.79, 175.27), zoom=13, style={'width': '100%', 'height': '50vh', 'margin': "auto", "display": "block"})
])

if __name__ == '__main__':
    app.run_server(debug=True)