from dash import Dash, html, dcc, callback, Output, Input, State
from dash_leaflet import AntPath, TileLayer, MapContainer, Marker, Popup, Tooltip
from dash_mantine_components import ColorPicker, Button, NumberInput, Stack, Grid, Switch, GridCol, Group, Textarea
import math
from tests.stubs import app_stub

# Sample paths data
# Polyline
polyline_path = [
    [51.508, -0.11],
    [51.503, -0.06],
    [51.51, -0.047],
    [51.515, -0.09],
    [51.508, -0.11]
]

# Polygon
polygon_path = [
    [51.515, -0.12],
    [51.52, -0.10],
    [51.525, -0.13],
    [51.515, -0.12]  # Close the polygon
]

# Rectangle (using bounds)
rectangle_path = [
    [51.495, -0.15],
    [51.505, -0.13]
]


# Circle (approximated with points)
def create_circle_path(center_lat, center_lon, radius_km, num_points=32):
    points = []
    for i in range(num_points + 1):
        angle = (2 * math.pi * i) / num_points
        dx = radius_km * math.cos(angle)
        dy = radius_km * math.sin(angle)
        # Approximate conversion to lat/lon
        lat = center_lat + (dy / 111)
        lon = center_lon + (dx / (111 * math.cos(math.radians(center_lat))))
        points.append([lat, lon])
    return points


circle_path = create_circle_path(51.51, -0.08, 0.5)


# Curve path (approximated Bezier curve)
def create_curve_path(start, control, end, num_points=32):
    points = []
    for i in range(num_points + 1):
        t = i / num_points
        # Quadratic Bezier curve
        lat = (1 - t) ** 2 * start[0] + 2 * (1 - t) * t * control[0] + t ** 2 * end[0]
        lon = (1 - t) ** 2 * start[1] + 2 * (1 - t) * t * control[1] + t ** 2 * end[1]
        points.append([lat, lon])
    return points


curve_path = create_curve_path([51.505, -0.09], [51.515, -0.07], [51.51, -0.05])

app = app_stub(
    components=[
            TileLayer(),
            # Polyline AntPath
            AntPath(
                id='antpath-polyline',
                positions=polyline_path,
                color="#0000FF",
                pulseColor="#FFFFFF",
                delay=800,
                weight=10,
                dashArray=[1, 100],  # Add default dashArray
                children='Polyline Path'
            ),
            # Polygon AntPath
            AntPath(
                id='antpath-polygon',
                positions=polygon_path,
                color="#FF0000",
                pulseColor="#FFFF00",
                delay=400,
                weight=8,
                children="Polygon Path"
            ),
            # Rectangle AntPath
            AntPath(
                id='antpath-rectangle',
                positions=rectangle_path,
                color="#00FF00",
                pulseColor="#FFFFFF",
                delay=400,
                weight=3,
                children="Rectangle Path"
            ),
            # Circle AntPath
            AntPath(
                id='antpath-circle',
                positions=circle_path,
                color="#FF00FF",
                pulseColor="#FFFFFF",
                delay=100,
                weight=6,
                dashArray=[1, 10],
                children="Circle Path"
            ),
            # Curve AntPath
            AntPath(
                id='antpath-curve',
                positions=curve_path,
                color="#00FFFF",
                pulseColor="#FFFFFF",
                delay=400,
                weight=10,
                children="Curve Path"
            ),
        ], zoom=13, center=[51.51, -0.09]
)



app.layout.children.insert(-1, html.Div([
    Grid([
        GridCol([
            # Modify the Stack in your layout to include these controls:
            Stack([
                Group([
                    Stack([html.Label('Base Color'),
                        ColorPicker(id='color-picker', value='#0000FF'),]),
                    Stack([html.Label('Pulse Color'),
                        ColorPicker(id='pulse-color-picker', value='#FFFFFF')]),
                    Stack([
                        NumberInput(id='delay-input', value=400, min=100, max=2000, step=100, label="Delay"),
                        NumberInput(id='weight-input', value=3, min=1, max=10, label="Line Weight"),
                    ]),
                    Stack([
                        NumberInput(id='dash-size-input', value=10, min=1, max=50, label="Dash Size"),
                        NumberInput(id='gap-size-input', value=20, min=1, max=50, label="Gap Size"),
                    ]),
                    Stack([
                        Switch(id='pause-switch', label='Pause Animation'),
                        Switch(id='reverse-switch', label='Reverse Animation'),
                    ]),
                ], grow=True),
            ]),
            Textarea(
                    label="Autosize with 4 rows max",
                    placeholder="Autosize with 4 rows max",
                    w=500,
                    autosize=True,
                    minRows=2,
                    maxRows=4,
                )
        ], span=12)
    ], style={'padding': '20px'})

]))


@callback(
    [Output('antpath-polyline', 'color'),
     Output('antpath-polygon', 'color'),
     Output('antpath-rectangle', 'color'),
     Output('antpath-circle', 'color'),
     Output('antpath-curve', 'color')],
    Input('color-picker', 'value')
)
def update_color(color):
    return [color] * 5

@callback(
    [Output('antpath-polyline', 'pulseColor'),
     Output('antpath-polygon', 'pulseColor'),
     Output('antpath-rectangle', 'pulseColor'),
     Output('antpath-circle', 'pulseColor'),
     Output('antpath-curve', 'pulseColor')],
    Input('pulse-color-picker', 'value')
)
def update_pulse_color(color):
    return [color] * 5

@callback(
    [Output('antpath-polyline', 'delay'),
     Output('antpath-polygon', 'delay'),
     Output('antpath-rectangle', 'delay'),
     Output('antpath-circle', 'delay'),
     Output('antpath-curve', 'delay')],
    Input('delay-input', 'value')
)
def update_delay(delay):
    return [delay] * 5

@callback(
    [Output('antpath-polyline', 'weight'),
     Output('antpath-polygon', 'weight'),
     Output('antpath-rectangle', 'weight'),
     Output('antpath-circle', 'weight'),
     Output('antpath-curve', 'weight')],
    Input('weight-input', 'value')
)
def update_weight(weight):
    return [weight] * 5

@callback(
    [Output('antpath-polyline', 'dashArray'),
     Output('antpath-polygon', 'dashArray'),
     Output('antpath-rectangle', 'dashArray'),
     Output('antpath-circle', 'dashArray'),
     Output('antpath-curve', 'dashArray')],
    [Input('dash-size-input', 'value'),
     Input('gap-size-input', 'value')]
)
def update_dash_array(dash_size, gap_size):
    dash_array = [dash_size, gap_size]
    return [dash_array] * 5

@callback(
    [Output('antpath-polyline', 'paused'),
     Output('antpath-polygon', 'paused'),
     Output('antpath-rectangle', 'paused'),
     Output('antpath-circle', 'paused'),
     Output('antpath-curve', 'paused')],
    Input('pause-switch', 'checked')
)
def update_pause(paused):
    return [paused] * 5


@callback(
    [Output('antpath-polyline', 'reverse'),
     Output('antpath-polygon', 'reverse'),
     Output('antpath-rectangle', 'reverse'),
     Output('antpath-circle', 'reverse'),
     Output('antpath-curve', 'reverse')],
    Input('reverse-switch', 'checked')
)
def update_reverse(reverse):
    return [reverse] * 5


if __name__ == '__main__':
    app.run_server(debug=True, port=9996)