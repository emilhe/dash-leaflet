"""
Enhanced EditControl example that only updates the last created feature.
Each feature retains its original color and emoji.
"""

import dash_leaflet as dl
import dash_mantine_components as dmc
from dash import Dash, html, Input, Output, State
import json

app = Dash(__name__)

app.layout = dmc.MantineProvider(dmc.Container([
    dmc.Title("Edit Control - Individual Feature Styling", order=2, ta="center", mb="lg"),

    dmc.Alert(
        "New behavior: Color and emoji changes only affect the last created feature!",
        title="Feature Update",
        color="blue",
        mb="md"
    ),

    dmc.Grid([
        # Map
        dmc.GridCol([
            dmc.Stack([
            dl.Map([
                dl.TileLayer(),
                dl.FeatureGroup(
                    dl.EditControl(
                        id="edit-control",
                        draw=dict(
                            polygon=True,
                            polyline=True,
                            rectangle=True,
                            circle=True,
                            marker=True,
                            circlemarker=False
                        ),
                        position="topright"
                    )
                ),

            ], style={'width': '100%', 'height': '500px'}, center=[51.505, -0.09], zoom=13),
# Features List
    dmc.Paper([
        dmc.Text("All Features", fw=600, mb="sm"),
        html.Div(id="features-list", style={'maxHeight': '200px', 'overflow': 'auto'})
    ], p="md", shadow="sm", withBorder=True, mt="md")

                ])
        ], span=8),

        # Controls
        dmc.GridCol([
            dmc.Stack([
                # Color Picker
                dmc.Paper([
                    dmc.Stack([
                        dmc.Text("Shape Color", fw=600),
                        dmc.Text("Changes color of the last drawn shape", size="sm", c="dimmed"),
                        dmc.ColorPicker(
                            id="color-picker",
                            format="hex",
                            value="#3388ff",
                            fullWidth=True,
                            swatches=[
                                "#fa5252", "#e64980", "#be4bdb", "#7950f2",
                                "#4c6ef5", "#228be6", "#15aabf", "#12b886",
                                "#40c057", "#82c91e", "#fab005", "#fd7e14",
                            ]
                        ),
                        dmc.TextInput(
                            id="color-input",
                            label="Or enter hex color:",
                            value="#3388ff",
                            placeholder="#000000"
                        )
                    ])
                ], p="md", shadow="sm", withBorder=True),

                # Emoji Picker
                dmc.Paper([
                    dmc.Stack([
                        dmc.Text("Marker Emoji", fw=600),
                        dmc.Text("Changes emoji of the last placed marker", size="sm", c="dimmed"),
                        dmc.SimpleGrid(
                            cols=5,
                            spacing="xs",
                            children=[
                                dmc.Button(
                                    emoji,
                                    id={"type": "emoji-btn", "emoji": emoji},
                                    variant="light",
                                    size="lg",
                                    style={"fontSize": "24px"}
                                )
                                for emoji in ["🏠", "🏢", "🏥", "🏫", "🛒",
                                             "📍", "⭐", "❤️", "🎯", "🚩",
                                             "🌳", "🚗", "✈️", "🍕", "☕"]
                            ]
                        ),
                        dmc.TextInput(
                            id="emoji-input",
                            label="Or type an emoji:",
                            value="📍",
                            placeholder="📍"
                        )
                    ])
                ], p="md", shadow="sm", withBorder=True),

                # Last Feature Info
                dmc.Paper([
                    dmc.Stack([
                        dmc.Text("Last Created Feature", fw=600),
                        html.Div(id="last-feature-info")
                    ])
                ], p="md", shadow="sm", withBorder=True)
            ])
        ], span=4),
    ]),

], fluid=True))


# Handle color picker
@app.callback(
    Output("edit-control", "currentColor"),
    Output("color-input", "value"),
    Input("color-picker", "value"),
    Input("color-input", "value"),
    State("edit-control", "currentColor")
)
def sync_color(picker_color, input_color, current_color):
    """Sync color between picker and input"""
    import dash
    ctx = dash.callback_context

    if not ctx.triggered:
        return current_color, current_color

    trigger_id = ctx.triggered[0]['prop_id'].split('.')[0]

    if trigger_id == "color-picker":
        return picker_color, picker_color
    else:
        return input_color, input_color


# Handle emoji buttons
@app.callback(
    Output("edit-control", "currentEmoji"),
    Output("emoji-input", "value"),
    [Input({"type": "emoji-btn", "emoji": emoji}, "n_clicks")
     for emoji in ["🏠", "🏢", "🏥", "🏫", "🛒", "📍", "⭐", "❤️", "🎯", "🚩",
                   "🌳", "🚗", "✈️", "🍕", "☕"]],
    Input("emoji-input", "value"),
    State("edit-control", "currentEmoji"),
    prevent_initial_call=True
)
def sync_emoji(*args):
    """Sync emoji between buttons and input"""
    import dash
    ctx = dash.callback_context

    if not ctx.triggered:
        return args[-1], args[-1]  # Return current emoji

    trigger_id = ctx.triggered[0]['prop_id']

    # Check if it's an emoji button
    if "emoji-btn" in trigger_id:
        emoji = json.loads(trigger_id.split('.')[0])['emoji']
        return emoji, emoji
    else:
        # It's the text input
        emoji = args[-2]  # Second to last argument is the input value
        return emoji, emoji


# Display last feature info
@app.callback(
    Output("last-feature-info", "children"),
    Input("edit-control", "geojson")
)
def show_last_feature(geojson):
    """Show info about the last created feature"""
    if not geojson or not geojson.get('features'):
        return dmc.Text("No features created yet", c="dimmed", size="sm")

    last_feature = geojson['features'][-1]
    props = last_feature.get('properties', {})

    if props.get('type') == 'marker':
        return dmc.Group([
            dmc.Badge("Marker", c="blue"),
            dmc.Text(props.get('emoji', '📍'), size="xl"),
            dmc.Text(f"ID: {props.get('leafletId', 'N/A')}", size="xs", c="dimmed")
        ])
    else:
        return dmc.Group([
            dmc.Badge(props.get('type', 'shape').capitalize(), c="green"),
            html.Div(style={
                'width': '20px',
                'height': '20px',
                'backgroundColor': props.get('color', '#3388ff'),
                'border': '1px solid #ccc',
                'borderRadius': '3px',
                'display': 'inline-block'
            }),
            dmc.Text(f"ID: {props.get('leafletId', 'N/A')}", size="xs", c="dimmed")
        ])


# Display all features
@app.callback(
    Output("features-list", "children"),
    Input("edit-control", "geojson")
)
def show_all_features(geojson):
    """Display all features with their properties"""
    if not geojson or not geojson.get('features'):
        return dmc.Text("No features drawn yet. Start drawing on the map!", c="dimmed", size="sm")

    feature_items = []
    for i, feature in enumerate(geojson['features']):
        props = feature.get('properties', {})
        feature_type = props.get('type', 'unknown')

        if feature_type == 'marker':
            emoji = props.get('emoji', '📍')
            item = dmc.Paper([
                dmc.Group([
                    dmc.Text(f"#{i+1}", fw=600, size="sm"),
                    dmc.Badge("Marker", size="sm"),
                    dmc.Text(emoji, size="lg"),
                    dmc.Text(f"ID: {props.get('leafletId', '')}", size="xs", c="dimmed")
                ])
            ], p="xs", withBorder=True, mb="xs")
        else:
            color = props.get('color', '#3388ff')
            item = dmc.Paper([
                dmc.Group([
                    dmc.Text(f"#{i+1}", fw=600, size="sm"),
                    dmc.Badge(feature_type.capitalize(), size="sm"),
                    html.Div(style={
                        'width': '16px',
                        'height': '16px',
                        'backgroundColor': color,
                        'border': '1px solid #ccc',
                        'borderRadius': '2px'
                    }),
                    dmc.Text(color, size="xs"),
                    dmc.Text(f"ID: {props.get('leafletId', '')}", size="xs", c="dimmed")
                ])
            ], p="xs", withBorder=True, mb="xs")

        feature_items.append(item)

    return dmc.Stack(feature_items)


if __name__ == "__main__":
    app.run(port=9997)