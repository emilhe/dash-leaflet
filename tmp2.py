import dash
import dash_html_components as html
import dash_core_components as dcc
import dash_leaflet as dl
import plotly.express as px

# Example graph.
df = px.data.iris()
fig = px.scatter(df, x="sepal_width", y="sepal_length")
graph = dcc.Graph(figure=fig, style={"width": "400px", "height": "250px"})
# Create map with marker.
app = dash.Dash()
app.layout = html.Div([
    dl.Map([dl.TileLayer(), dl.CircleMarker(center=(56, 10), children=dl.Tooltip(graph))],
           id="map", style={'width': '100%', 'height': '100vh', 'margin': "auto", "display": "block"}),
])

if __name__ == '__main__':
    app.run_server()