"""
VectorTileLayer Example

This example demonstrates the VectorTileLayer component which provides an efficient way
to display large amounts of vector data using vector tiles (typically in Protobuf format).

Features demonstrated:
- Basic vector tile layer with OpenInfraMap tiles
- Dynamic styling with vectorTileLayerStyles
- Interactive click and hover events
- Custom styling function
- Layer filtering
"""

import dash_leaflet as dl
from dash import Dash, html, callback, Output, Input
from dash_extensions.javascript import assign

# Example 1: Basic vector tile layer with simple styling
app = Dash(__name__, prevent_initial_callbacks=True)

# Define style function for dynamic feature styling
# This function receives (feature, layerName, zoom) and returns style object
style_function = assign("""function(feature, layerName, zoom) {
    // Different colors for different layer types
    const styles = {
        power_line: { color: '#FF0000', weight: 2 },
        power_tower: { color: '#FF6600', radius: 3 },
        power_plant: { color: '#990000', fillColor: '#FF0000', fillOpacity: 0.5 },
        power_substation: { color: '#CC6600', fillColor: '#FFAA00', fillOpacity: 0.6 }
    };

    // Default style
    const defaultStyle = { color: '#3388ff', weight: 2, fillOpacity: 0.4 };

    return styles[layerName] || defaultStyle;
}""")

# Alternative: Simple vectorTileLayerStyles (similar to VectorGrid)
# This is easier if you know the layer names ahead of time
simple_styles = {
    'power_line': {'color': '#FF0000', 'weight': 2},
    'power_tower': {'color': '#FF6600', 'radius': 3},
    'power_plant': {'color': '#990000', 'fillColor': '#FF0000', 'fillOpacity': 0.5},
    'power_substation': {'color': '#CC6600', 'fillColor': '#FFAA00', 'fillOpacity': 0.6},
}

# Filter function to only show certain features
filter_function = assign("""function(feature, layerName, zoom) {
    // Only show power lines at zoom level 10 and above
    if (layerName === 'power_line' && zoom < 10) {
        return false;
    }
    return true;
}""")

app.layout = html.Div([
    html.H1("Vector Tile Layer Example"),
    html.Div([
        html.H3("Map with OpenInfraMap Vector Tiles"),
        html.P("Click on features to see their properties. Hover to highlight."),
    ]),

    dl.Map(
        [
            # Base tile layer
            dl.TileLayer(),

            # Vector tile layer with all features
            dl.VectorTileLayer(
                id='vector-tiles',
                url="https://openinframap.org/tiles/{z}/{x}/{y}.pbf",

                # Styling options (choose one):
                # Option 1: Use a dynamic style function for maximum flexibility
                style=style_function,
                # Option 2: Use simple vectorTileLayerStyles (comment out style above to use this)
                # vectorTileLayerStyles=simple_styles,

                # Zoom configuration
                # minDetailZoom and maxDetailZoom control the zoom levels at which tiles are fetched
                # Outside this range, tiles are rendered from cached data, maintaining stroke weight
                minDetailZoom=8,
                maxDetailZoom=14,

                # Optional: Filter features
                # filter=filter_function,

                # Optional: Specify which layers to render (others are ignored)
                # layers=['power_line', 'power_plant', 'power_substation'],

                # Optional: Custom layer ordering
                # layerOrder=assign("function(layers, zoom) { return layers.sort(); }"),

                # Interactive features
                # The component automatically tracks clicks, double-clicks, and hover events
            ),
        ],
        center=[56, 10],  # Denmark
        zoom=8,
        style={'height': '600px', 'width': '100%'},
        id='map'
    ),

    # Display click and hover data
    html.Div([
        html.Div([
            html.H4("Clicked Feature:"),
            html.Pre(id='click-output', style={'background': '#f0f0f0', 'padding': '10px'}),
        ], style={'width': '48%', 'display': 'inline-block', 'vertical-align': 'top'}),

        html.Div([
            html.H4("Hovered Feature:"),
            html.Pre(id='hover-output', style={'background': '#f0f0f0', 'padding': '10px'}),
        ], style={'width': '48%', 'display': 'inline-block', 'vertical-align': 'top', 'margin-left': '4%'}),
    ]),
])


@callback(
    Output('click-output', 'children'),
    Input('vector-tiles', 'clickData'),
    prevent_initial_call=True
)
def display_click_data(click_data):
    if not click_data:
        return "Click on a feature to see its data"

    # Format the output nicely
    output = []
    if 'properties' in click_data:
        output.append(f"Properties: {click_data['properties']}")
    if 'layerName' in click_data:
        output.append(f"Layer: {click_data['layerName']}")
    if 'latlng' in click_data:
        output.append(f"Location: {click_data['latlng']}")

    return '\n'.join(output) if output else str(click_data)


@callback(
    Output('hover-output', 'children'),
    Input('vector-tiles', 'hoverData'),
    prevent_initial_call=True
)
def display_hover_data(hover_data):
    if not hover_data:
        return "Hover over a feature to see its data"

    # Format the output nicely
    output = []
    if 'properties' in hover_data:
        output.append(f"Properties: {hover_data['properties']}")
    if 'layerName' in hover_data:
        output.append(f"Layer: {hover_data['layerName']}")
    if 'latlng' in hover_data:
        output.append(f"Location: {hover_data['latlng']}")

    return '\n'.join(output) if output else str(hover_data)


if __name__ == '__main__':
    app.run_server(debug=True)
