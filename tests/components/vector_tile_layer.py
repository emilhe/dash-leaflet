"""
VectorTileLayer component test/example.

This example demonstrates the VectorTileLayer component using OpenInfraMap's
vector tile endpoint which provides infrastructure data (power lines, stations, etc).
"""
import json
from dash import Dash, html, Output, Input
from dash_leaflet import MapContainer, TileLayer, VectorTileLayer
from dash_extensions.javascript import assign

# Style function for the vector tiles - colors different infrastructure types
style = assign("""function(feature, layerName, zoom) {
    // Different colors for different layer types
    var colors = {
        'power_line': '#ff0000',
        'power_tower': '#ff6600',
        'power_substation': '#0066ff',
        'power_plant': '#00ff00',
        'power_generator': '#ffff00'
    };
    var color = colors[layerName] || '#888888';

    // Style based on feature type
    if (feature.type === 1) {  // Point
        return {
            radius: 4,
            fillColor: color,
            color: '#000',
            weight: 1,
            fillOpacity: 0.8
        };
    } else {  // Line/Polygon
        return {
            color: color,
            weight: 2,
            opacity: 0.8
        };
    }
}""")

# Hover style to highlight features
hover_style = assign("""function(feature, layerName, zoom) {
    return {
        weight: 4,
        color: '#ffff00',
        opacity: 1
    };
}""")

app = Dash(__name__)
app.layout = html.Div([
    html.H3("VectorTileLayer Example - OpenInfraMap"),
    html.P("Click on features to see their properties. Hover to highlight."),
    MapContainer(
        [
            TileLayer(),
            VectorTileLayer(
                id="vector-tiles",
                url="https://openinframap.org/tiles/{z}/{x}/{y}.pbf",
                maxDetailZoom=14,
                minDetailZoom=4,
                style=style,
                hoverStyle=hover_style,
                attribution='&copy; <a href="https://openinframap.org">OpenInfraMap</a>'
            ),
        ],
        center=[51.5, -0.1],  # London
        zoom=10,
        style={"height": "500px", "width": "100%"},
    ),
    html.Div([
        html.H4("Click Data:"),
        html.Pre(id="click-output", style={"backgroundColor": "#f0f0f0", "padding": "10px"}),
    ]),
    html.Div([
        html.H4("Hover Data:"),
        html.Pre(id="hover-output", style={"backgroundColor": "#f0f0f0", "padding": "10px"}),
    ]),
])


@app.callback(
    Output("click-output", "children"),
    Input("vector-tiles", "clickData"),
)
def display_click_data(click_data):
    if click_data is None:
        return "Click on a feature to see its data"
    return json.dumps(click_data, indent=2)


@app.callback(
    Output("hover-output", "children"),
    Input("vector-tiles", "hoverData"),
)
def display_hover_data(hover_data):
    if hover_data is None:
        return "Hover over a feature to see its data"
    return json.dumps(hover_data, indent=2)


if __name__ == "__main__":
    app.run_server(debug=True, port=9998)
