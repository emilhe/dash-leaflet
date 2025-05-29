"""
Full demo of the enhanced EditControl with emoji and color support.
Run this file to see the complete functionality.
"""

import json
from dash import Dash, html, dcc, Input, Output, State, callback
import dash_leaflet as dl
import dash_mantine_components as dmc
from dash_emoji_mart import DashEmojiMart

# Create custom emoji data for the emoji picker
custom_emojis = [
    {
        'id': 'custom',
        'name': 'Custom Icons',
        'emojis': [
            {
                'id': 'home',
                'name': 'Home',
                'short_names': ['home'],
                'keywords': ['house', 'building'],
                'skins': [{'src': 'https://cdn-icons-png.flaticon.com/512/25/25694.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'office',
                'name': 'Office',
                'short_names': ['office'],
                'keywords': ['work', 'building'],
                'skins': [{'src': 'https://cdn-icons-png.flaticon.com/512/2098/2098316.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'restaurant',
                'name': 'Restaurant',
                'short_names': ['restaurant'],
                'keywords': ['food', 'dining'],
                'skins': [{'src': 'https://cdn-icons-png.flaticon.com/512/3448/3448609.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'park',
                'name': 'Park',
                'short_names': ['park'],
                'keywords': ['nature', 'trees'],
                'skins': [{'src': 'https://cdn-icons-png.flaticon.com/512/2926/2926989.png'}],
                'native': '',
                'unified': 'custom',
            },
        ],
    },
]

app = Dash(__name__)

app.layout = dmc.MantineProvider(dmc.Container([
    dmc.Title("Enhanced Leaflet Map Editor", order=1, style={'textAlign': 'center', 'marginBottom': '20px'}),

    dmc.Grid([
        # Map Column
        dmc.GridCol([
            dmc.Paper([
                dl.Map([
                    dl.TileLayer(),
                    dl.FeatureGroup(
                        dl.EditControl(
                            id="edit-control",
                            draw=dict(
                                polygon=dict(
                                    shapeOptions=dict(
                                        color='#3388ff',
                                        weight=4,
                                        opacity=0.5
                                    )
                                ),
                                polyline=dict(
                                    shapeOptions=dict(
                                        color='#3388ff',
                                        weight=4,
                                        opacity=0.5
                                    )
                                ),
                                rectangle=dict(
                                    shapeOptions=dict(
                                        color='#3388ff',
                                        weight=4,
                                        opacity=0.5
                                    )
                                ),
                                circle=dict(
                                    shapeOptions=dict(
                                        color='#3388ff',
                                        weight=4,
                                        opacity=0.5
                                    )
                                ),
                                marker=True,
                                circlemarker=False
                            ),
                            position="topright"
                        )
                    )
                ], style={'width': '100%', 'height': '600px'}, center=[51.505, -0.09], zoom=13, id="map")
            ], shadow="sm", p="md"),

            # Features Display
            dmc.Paper([
                dmc.Stack([
                    dmc.Text("Created Features", fw=600, size="lg"),
                    html.Div(id="features-display", style={'maxHeight': '200px', 'overflow': 'auto'}),
                ])
            ], shadow="sm", p="md", withBorder=True, mt="md"),
        ], span=8),

        # Controls Column
        dmc.GridCol([
            dmc.Stack([
                # Color Picker
                dmc.Paper([
                    dmc.Stack([
                        dmc.Text("Shape Color", fw=600, size="lg"),
                        dmc.Text("Select a color for polygons, lines, rectangles, and circles:", size="sm",
                                 c="dimmed"),
                        dmc.ColorInput(
                            id="color-input",
                            label="Color",
                            value="#3388ff",
                            format="hex",
                            w="100%",
                            withEyeDropper=True,
                            swatches=[
                                "#fa5252",  # Red
                                "#e64980",  # Pink
                                "#be4bdb",  # Purple
                                "#7950f2",  # Violet
                                "#4c6ef5",  # Indigo
                                "#228be6",  # Blue
                                "#15aabf",  # Cyan
                                "#12b886",  # Teal
                                "#40c057",  # Green
                                "#82c91e",  # Lime
                                "#fab005",  # Yellow
                                "#fd7e14",  # Orange
                            ],
                        ),
                    ])
                ], shadow="sm", p="md", withBorder=True),

                # Emoji Picker
                dmc.Paper([
                    dmc.Stack([
                        dmc.Text("Marker Icon", fw=600, size="lg"),
                        dmc.Text("Select an emoji or custom icon for markers:", size="sm", c="dimmed"),
                        dmc.Paper([
                            DashEmojiMart(
                                id="emoji-picker",
                                custom=custom_emojis,
                                categories=['frequent', 'people', 'nature', 'foods', 'activity', 'places', 'objects',
                                            'custom'],
                                dynamicWidth=True,
                                emojiButtonSize=28,
                                emojiSize=22,
                                perLine=7,
                                theme="light",
                                set="native",
                                previewPosition="none",
                                # style={'width': '100%'}
                            ),
                        ], style={'maxHeight': '320px', 'overflow': 'auto'}, withBorder=True),

                        dmc.Group([
                            dmc.Text("Selected:", size="sm"),
                            html.Div(id="selected-emoji", style={'fontSize': '28px'}),
                        ]),
                    ])
                ], shadow="sm", p="md", withBorder=True),

                # Feature Info
                dmc.Paper([
                    dmc.Stack([
                        dmc.Text("Drawing Instructions", fw=600, size="lg"),
                        dmc.List([
                            dmc.ListItem("Select a shape tool from the map controls"),
                            dmc.ListItem("Choose a color for shapes (polygons, lines, etc.)"),
                            dmc.ListItem("Select an emoji for marker icons"),
                            dmc.ListItem("Click on the map to draw"),
                            dmc.ListItem("Use the edit tool to modify existing features"),
                        ], size="sm"),
                    ])
                ], shadow="sm", p="md", withBorder=True),
            ])
        ], span=4),
    ]),

    # Hidden elements
    html.Div(id="current-emoji", style={'display': 'none'}),
], fluid=True, p="xl"))


@app.callback(
    [Output("selected-emoji", "children"), Output("current-emoji", "children")],
    Input("emoji-picker", "value"),
    prevent_initial_call=True
)
def update_selected_emoji(emoji):
    """Update the selected emoji display"""
    if emoji:
        # Check if it's a URL (custom emoji)
        if isinstance(emoji, str) and emoji.startswith('http'):
            return html.Img(src=emoji, style={'width': '32px', 'height': '32px'}), emoji
        else:
            return emoji, emoji
    return "📍", ""  # Default pin emoji


@app.callback(
    Output("edit-control", "currentColor"),
    Input("color-input", "value")
)
def update_current_color(color):
    """Update the current color for new shapes"""
    return color if color else "#3388ff"


@app.callback(
    Output("edit-control", "currentEmoji"),
    Input("current-emoji", "children")
)
def update_current_emoji(emoji):
    """Update the current emoji for new markers"""
    return emoji if emoji else ""


@app.callback(
    Output("features-display", "children"),
    Input("edit-control", "geojson")
)
def display_features(geojson):
    """Display the created features in a nice format"""
    if not geojson or not geojson.get('features'):
        return dmc.Text("No features created yet. Start drawing on the map!", c="dimmed", size="sm")

    feature_cards = []
    for i, feature in enumerate(geojson['features']):
        props = feature.get('properties', {})
        feature_type = props.get('type', 'unknown')
        color = props.get('color', '#3388ff')
        emoji = props.get('emoji', '')

        # Create a nice display for each feature
        if feature_type == 'marker':
            icon_display = html.Span(emoji if emoji else "📍", style={'fontSize': '20px'})
            feature_info = dmc.Group([
                icon_display,
                dmc.Text(f"Marker {i + 1}", size="sm"),
            ])
        else:
            color_box = html.Div(style={
                'width': '20px',
                'height': '20px',
                'backgroundColor': color,
                'border': '1px solid #ddd',
                'borderRadius': '3px',
                'display': 'inline-block'
            })
            feature_info = dmc.Group([
                color_box,
                dmc.Text(f"{feature_type.capitalize()} {i + 1}", size="sm"),
            ])

        feature_cards.append(
            dmc.Paper(
                feature_info,
                p="xs",
                withBorder=True,
                style={'marginBottom': '5px'}
            )
        )

    return dmc.Stack(feature_cards)


if __name__ == "__main__":
    app.run(port=9997)