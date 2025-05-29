import dash
from dash import html
import dash_leaflet as dl

# Create the Dash app
app = dash.Dash(__name__)

# Define some example street coordinates
oxford_street = [[51.5155, -0.1419], [51.5147, -0.1342], [51.5138, -0.1265]]
regent_street = [[51.5174, -0.1428], [51.5134, -0.1393], [51.5099, -0.1356]]
piccadilly = [[51.5074, -0.1278], [51.5067, -0.1340], [51.5064, -0.1396]]
park_lane = [[51.5073, -0.1600], [51.5089, -0.1574], [51.5114, -0.1531]]

# Define the map layout
app.layout = html.Div([
    dl.Map([
        # Add tile layer
        dl.TileLayer(),

        # Wrap polylines in StreetLabelProvider for label support
        dl.StreetLabelProvider([
            # Regular Polyline with street label
            dl.Polyline(
                id="oxford-street",
                positions=oxford_street,
                pathOptions={
                    "color": "#2c3e50",
                    "weight": 5,
                    "opacity": 0.8
                },
                label="Oxford Street",
                labelStyle={
                    "fontSize": 14,
                    "fontFamily": "Arial, sans-serif",
                    "textColor": "#2c3e50",
                    "strokeColor": "#ffffff",
                    "strokeWidth": 3,
                    "minZoom": 12,
                    "maxZoom": 18
                },
                showLabel=True
            ),

            # Another Polyline with different styling
            dl.Polyline(
                id="regent-street",
                positions=regent_street,
                pathOptions={
                    "color": "#e74c3c",
                    "weight": 5,
                    "opacity": 0.8
                },
                label="Regent Street",
                labelStyle={
                    "fontSize": 14,
                    "fontFamily": "Arial, sans-serif",
                    "textColor": "black",
                    "strokeColor": "white",
                    "strokeWidth": 3,
                    "minZoom": 12,
                    "maxZoom": 18
                },
                showLabel=True
            ),

            # AntPath with street label (animated polyline with static label)
            dl.AntPath(
                id="piccadilly",
                positions=piccadilly,
                color="#3498db",
                weight=5,
                opacity=0.6,
                delay=400,
                dashArray=[10, 20],
                pulseColor="#ffffff",
                label="Piccadilly",
                labelStyle={
                    "fontSize": 16,
                    "fontFamily": "Arial Black, sans-serif",
                    "textColor": "#3498db",
                    "strokeColor": "#ffffff",
                    "strokeWidth": 4,
                    "minZoom": 13,
                    "maxZoom": 18
                },
                showLabel=True
            ),

            # Another AntPath with different animation settings
            dl.AntPath(
                id="park-lane",
                positions=park_lane,
                color="#27ae60",
                weight=6,
                opacity=0.7,
                delay=600,
                dashArray=[15, 25],
                pulseColor="#ffffff",
                reverse=True,  # Animation runs in reverse
                label="Park Lane",
                labelStyle={
                    "fontSize": 14,
                    "fontFamily": "Georgia, serif",
                    "textColor": "#27ae60",
                    "strokeColor": "#ffffff",
                    "strokeWidth": 3,
                    "minZoom": 12,
                    "maxZoom": 18
                },
                showLabel=True
            ),
        ], collisionDetection=True),  # Enable collision detection for all labels

        # Add markers for reference points
        dl.Marker(
            position=[51.5155, -0.1419],
            children=[dl.Tooltip("Oxford Circus", permanent=True)]
        ),
        dl.Marker(
            position=[51.5074, -0.1278],
            children=[dl.Tooltip("Hyde Park Corner", permanent=True)]
        ),
    ],
        style={'width': '100%', 'height': '100vh'},
        center=[51.5120, -0.1400],
        zoom=14,
        id="map"
    ),

    # Add some explanatory text
    html.Div([
        html.H3("Dash-Leaflet Street Labels Demo"),
        html.P("This map demonstrates street labels on both regular Polylines and animated AntPaths:"),
        html.Ul([
            html.Li("Oxford Street - Blue polyline with standard label"),
            html.Li("Regent Street - Red polyline with standard label"),
            html.Li("Piccadilly - Animated blue path with larger bold label"),
            html.Li("Park Lane - Animated green path with serif font, animation reversed")
        ]),
        html.P("Try zooming in and out to see how labels appear/disappear based on zoom constraints."),
        html.P("Collision detection is enabled, so overlapping labels will be hidden.")
    ], style={
        'position': 'absolute',
        'top': '10px',
        'right': '10px',
        'backgroundColor': 'rgba(255, 255, 255, 0.9)',
        'padding': '20px',
        'borderRadius': '5px',
        'maxWidth': '400px',
        'zIndex': 1000
    })
])

if __name__ == '__main__':
    app.run(debug=True, port=9997)