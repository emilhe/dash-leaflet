# dynamic_street_labels.py
# Example showing dynamic label updates (e.g., for traffic conditions)

import dash
from dash import html, dcc, Input, Output, State
import dash_leaflet as dl

app = dash.Dash(__name__)

# Initial street data
streets = {
    "street1": {
        "positions": [[40.7580, -73.9855], [40.7489, -73.9680], [40.7410, -73.9540]],
        "name": "Broadway",
        "traffic": "normal"
    },
    "street2": {
        "positions": [[40.7614, -73.9776], [40.7505, -73.9739]],
        "name": "5th Avenue",
        "traffic": "normal"
    },
    "street3": {
        "positions": [[40.7527, -73.9772], [40.7433, -73.9916]],
        "name": "42nd Street",
        "traffic": "normal"
    }
}

# Traffic colors
traffic_colors = {
    "normal": {"color": "#2ecc71", "text": "#27ae60"},
    "moderate": {"color": "#f39c12", "text": "#d68910"},
    "heavy": {"color": "#e74c3c", "text": "#c0392b"}
}


def create_street_components(streets_data):
    """Create polyline components with labels based on current traffic"""
    components = []

    for street_id, data in streets_data.items():
        traffic = data["traffic"]
        colors = traffic_colors[traffic]

        # Add traffic info to label if not normal
        label = data["name"]
        if traffic != "normal":
            label = f"{data['name']} ({traffic.capitalize()} Traffic)"

        components.append(
            dl.Polyline(
                id=street_id,
                positions=data["positions"],
                pathOptions={
                    "color": colors["color"],
                    "weight": 6,
                    "opacity": 0.8
                },
                label=label,
                labelStyle={
                    "fontSize": 14,
                    "fontFamily": "Arial, sans-serif",
                    "textColor": colors["text"],
                    "strokeColor": "#ffffff",
                    "strokeWidth": 3,
                    "minZoom": 12
                }
            )
        )

    return components


app.layout = html.Div([
    html.Div([
        html.H2("Dynamic Street Labels - Traffic Monitor"),
        html.P("Click buttons to simulate traffic changes:"),
        html.Div([
            html.Button("Normal Traffic", id="btn-normal", n_clicks=0,
                        style={"backgroundColor": "#2ecc71", "color": "white", "margin": "5px"}),
            html.Button("Moderate Traffic", id="btn-moderate", n_clicks=0,
                        style={"backgroundColor": "#f39c12", "color": "white", "margin": "5px"}),
            html.Button("Heavy Traffic", id="btn-heavy", n_clicks=0,
                        style={"backgroundColor": "#e74c3c", "color": "white", "margin": "5px"}),
        ]),
        html.Div(id="traffic-status", style={"marginTop": "10px"})
    ], style={
        "position": "absolute",
        "top": "10px",
        "right": "10px",
        "backgroundColor": "rgba(255, 255, 255, 0.9)",
        "padding": "20px",
        "borderRadius": "5px",
        "zIndex": 1000,
        "maxWidth": "300px"
    }),

    html.Div([
        dl.Map(
            id="map",
            children=[
                dl.TileLayer(),
                dl.StreetLabelProvider(
                    id="street-labels",
                    children=create_street_components(streets),
                    collisionDetection=True
                ),
            ],
            style={'width': '100%', 'height': '100vh'},
            center=[40.7505, -73.9750],
            zoom=14
        )
    ]),

    # Store for street data
    dcc.Store(id="streets-store", data=streets)
])


@app.callback(
    [Output("streets-store", "data"),
     Output("traffic-status", "children")],
    [Input("btn-normal", "n_clicks"),
     Input("btn-moderate", "n_clicks"),
     Input("btn-heavy", "n_clicks")],
    [State("streets-store", "data")]
)
def update_traffic(n_normal, n_moderate, n_heavy, current_streets):
    """Simulate traffic updates"""
    ctx = dash.callback_context

    if not ctx.triggered:
        return current_streets, "Current: Normal traffic on all streets"

    button_id = ctx.triggered[0]["prop_id"].split(".")[0]

    # Determine which streets to update based on button
    if button_id == "btn-normal":
        traffic_level = "normal"
        affected_streets = ["street1", "street2", "street3"]
        status = "✅ All streets back to normal traffic"
    elif button_id == "btn-moderate":
        traffic_level = "moderate"
        affected_streets = ["street1", "street3"]
        status = "⚠️ Moderate traffic on Broadway and 42nd Street"
    else:  # heavy
        traffic_level = "heavy"
        affected_streets = ["street2"]
        status = "🚨 Heavy traffic on 5th Avenue!"

    # Update street data
    updated_streets = current_streets.copy()

    # Reset all to normal first
    for street_id in updated_streets:
        updated_streets[street_id]["traffic"] = "normal"

    # Then apply selected traffic
    for street_id in affected_streets:
        if street_id in updated_streets:
            updated_streets[street_id]["traffic"] = traffic_level

    return updated_streets, status


@app.callback(
    Output("street-labels", "children"),
    [Input("streets-store", "data")]
)
def update_street_labels(streets_data):
    """Update street components when traffic changes"""
    return create_street_components(streets_data)


if __name__ == '__main__':
    app.run(debug=True, port=9997)