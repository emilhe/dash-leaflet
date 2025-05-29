"""
Simple test to verify individual feature styling works correctly.
Each feature should retain its own color/emoji.
"""

import dash_leaflet as dl
from dash import Dash, html, Input, Output, dcc
import json

app = Dash(__name__)

app.layout = html.Div([
    html.H3("Test: Individual Feature Styling"),

    # Instructions
    html.Div([
        html.P("Test Steps:", style={'fontWeight': 'bold'}),
        html.Ol([
            html.Li("Set color to RED, draw a polygon"),
            html.Li("Set color to BLUE, draw a circle"),
            html.Li("Set emoji to 🏠, place a marker"),
            html.Li("Set emoji to ⭐, place another marker"),
            html.Li("Change color to GREEN - only the last shape should turn green"),
            html.Li("Change emoji to 🎯 - only the last marker should change"),
        ]),
    ], style={'backgroundColor': '#f0f0f0', 'padding': '10px', 'marginBottom': '10px'}),

    # Quick color buttons
    html.Div([
        html.Button("Red", id="red-btn", style={'backgroundColor': '#ff0000', 'color': 'white', 'margin': '5px'}),
        html.Button("Blue", id="blue-btn", style={'backgroundColor': '#0000ff', 'color': 'white', 'margin': '5px'}),
        html.Button("Green", id="green-btn", style={'backgroundColor': '#00ff00', 'color': 'black', 'margin': '5px'}),
        html.Span("Current color: "),
        html.Span(id="current-color", style={'fontWeight': 'bold'}),
    ]),

    # Quick emoji buttons
    html.Div([
        html.Button("🏠", id="house-btn", style={'fontSize': '20px', 'margin': '5px'}),
        html.Button("⭐", id="star-btn", style={'fontSize': '20px', 'margin': '5px'}),
        html.Button("🎯", id="target-btn", style={'fontSize': '20px', 'margin': '5px'}),
        html.Span("Current emoji: "),
        html.Span(id="current-emoji", style={'fontSize': '20px', 'fontWeight': 'bold'}),
    ], style={'marginTop': '10px'}),

    # Map
    dl.Map([
        dl.TileLayer(),
        dl.FeatureGroup(
            dl.EditControl(
                id="edit-control",
                draw=dict(
                    polygon=True,
                    polyline=False,
                    rectangle=False,
                    circle=True,
                    marker=True,
                    circlemarker=False
                ),
                currentColor="#ff0000",
                currentEmoji="🏠"
            )
        )
    ], style={'width': '100%', 'height': '400px', 'marginTop': '10px'},
        center=[51.505, -0.09], zoom=13),

    # Feature display
    html.Div([
        html.H4("Created Features:"),
        html.Pre(id="features-output", style={'fontSize': '12px', 'backgroundColor': '#f5f5f5', 'padding': '10px'})
    ])
])


# Color button handlers
@app.callback(
    Output("edit-control", "currentColor"),
    Output("current-color", "children"),
    Output("current-color", "style"),
    Input("red-btn", "n_clicks"),
    Input("blue-btn", "n_clicks"),
    Input("green-btn", "n_clicks"),
    prevent_initial_call=True
)
def set_color(red, blue, green):
    import dash
    ctx = dash.callback_context

    if not ctx.triggered:
        return "#ff0000", "#ff0000", {'color': '#ff0000', 'fontWeight': 'bold'}

    button_id = ctx.triggered[0]['prop_id'].split('.')[0]

    if button_id == "red-btn":
        return "#ff0000", "#ff0000", {'color': '#ff0000', 'fontWeight': 'bold'}
    elif button_id == "blue-btn":
        return "#0000ff", "#0000ff", {'color': '#0000ff', 'fontWeight': 'bold'}
    elif button_id == "green-btn":
        return "#00ff00", "#00ff00", {'color': '#00ff00', 'fontWeight': 'bold'}

    return "#ff0000", "#ff0000", {'color': '#ff0000', 'fontWeight': 'bold'}


# Emoji button handlers
@app.callback(
    Output("edit-control", "currentEmoji"),
    Output("current-emoji", "children"),
    Input("house-btn", "n_clicks"),
    Input("star-btn", "n_clicks"),
    Input("target-btn", "n_clicks"),
    prevent_initial_call=True
)
def set_emoji(house, star, target):
    import dash
    ctx = dash.callback_context

    if not ctx.triggered:
        return "🏠", "🏠"

    button_id = ctx.triggered[0]['prop_id'].split('.')[0]

    if button_id == "house-btn":
        return "🏠", "🏠"
    elif button_id == "star-btn":
        return "⭐", "⭐"
    elif button_id == "target-btn":
        return "🎯", "🎯"

    return "🏠", "🏠"


# Display features
@app.callback(
    Output("features-output", "children"),
    Input("edit-control", "geojson")
)
def show_features(geojson):
    if not geojson or not geojson.get('features'):
        return "No features yet"

    output = []
    for i, feature in enumerate(geojson['features']):
        props = feature.get('properties', {})
        feature_type = props.get('type', 'unknown')

        if feature_type == 'marker':
            output.append(f"Feature {i + 1}: {feature_type} - Emoji: {props.get('emoji', 'none')}")
        else:
            output.append(f"Feature {i + 1}: {feature_type} - Color: {props.get('color', 'none')}")

    return "\n".join(output) + f"\n\nTotal features: {len(geojson['features'])}"


if __name__ == "__main__":
    app.run(port=9997)