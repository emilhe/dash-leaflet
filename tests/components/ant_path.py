"""
Simple example demonstrating the AntPath component for animated polylines.
"""

import dash_leaflet as dl
import dash_mantine_components as dmc
from dash import Dash, html, Input, Output

app = Dash(__name__)

app.layout = dmc.MantineProvider(
    dmc.Container([
        dmc.Title("Simple AntPath Example", order=2, ta="center", mb="lg"),

        dmc.Paper([
            dl.Map([
                dl.TileLayer(),

                # Static AntPath with default settings
                dl.AntPath(
                    positions=[[51.505, -0.09], [51.51, -0.1], [51.515, -0.08]],
                    color="red",
                    weight=5,
                    opacity=0.7,
                    id="ant-path-1"
                ),

                # AntPath with custom pulse color and speed
                dl.AntPath(
                    positions=[[51.5, -0.11], [51.508, -0.12], [51.503, -0.13]],
                    color="blue",
                    pulseColor="yellow",
                    weight=4,
                    delay=200,
                    dashArray=[15, 30],
                    id="ant-path-2"
                ),

                # Paused AntPath
                dl.AntPath(
                    positions=[[51.51, -0.06], [51.513, -0.07], [51.518, -0.065]],
                    color="green",
                    pulseColor="white",
                    weight=6,
                    paused=True,
                    id="ant-path-3"
                ),

            ], style={'width': '100%', 'height': '500px'}, center=[51.505, -0.09], zoom=13),

            dmc.Stack([
                dmc.Text("Click on the paths to see click events working!", size="sm", c="dimmed"),
                html.Div(id="click-output", style={'marginTop': '10px'})
            ], mt="md")
        ], p="md", shadow="sm", withBorder=True)
    ], fluid=True)
)


@app.callback(
    Output("click-output", "children"),
    [Input("ant-path-1", "n_clicks"),
     Input("ant-path-2", "n_clicks"),
     Input("ant-path-3", "n_clicks")]
)
def handle_clicks(clicks1, clicks2, clicks3):
    """Handle clicks on AntPath components"""
    import dash
    ctx = dash.callback_context

    if not ctx.triggered:
        return "No path clicked yet"

    prop_id = ctx.triggered[0]['prop_id'].split('.')[0]
    path_map = {
        "ant-path-1": "Red path",
        "ant-path-2": "Blue path with yellow pulse",
        "ant-path-3": "Green paused path"
    }

    return dmc.Alert(
        f"{path_map.get(prop_id, 'Unknown path')} was clicked!",
        color="blue",
        icon=dmc.Text("🐜")
    )


if __name__ == "__main__":
    app.run(debug=True, port=8888)