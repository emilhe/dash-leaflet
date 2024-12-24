from dash import html, dcc, callback_context, callback
from dash_leaflet import EditControl, TileLayer, FeatureGroup, EasyButton
from dash_mantine_components import ColorPicker, Button, Stack
from dash import Input, Output, State, no_update
from tests.stubs import app_stub
from dash_emoji_mart import DashEmojiMart
import dash_leaflet.express as dlx  # For creating feature groups
import json


def rgba_to_hex(rgba_str):
    """Convert RGBA string to hex color"""
    rgba = rgba_str.replace('rgba(', '').replace(')', '').split(',')
    r, g, b = [int(x) for x in rgba[:3]]
    return f'#{r:02x}{g:02x}{b:02x}'


# Create custom emoji list
custom = [
    {
        'id': 'custom',
        'name': 'Custom',
        'emojis': [
            {
                'id': 'alien_face',
                'name': 'Alien Face',
                'short_names': ['alien_face'],
                'keywords': ['alien', 'face'],
                'skins': [{'src': '/assets/emoji/faces/alien_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'concern_face',
                'name': 'Concern Face',
                'short_names': ['concern_face'],
                'keywords': ['concern', 'face'],
                'skins': [{'src': '/assets/emoji/faces/concern_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'cowboy_face',
                'name': 'Cowboy Face',
                'short_names': ['cowboy_face'],
                'keywords': ['cowboy', 'face'],
                'skins': [{'src': '/assets/emoji/faces/cowboy_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'crazy_face',
                'name': 'Crazy Face',
                'short_names': ['crazy_face'],
                'keywords': ['crazy', 'face'],
                'skins': [{'src': '/assets/emoji/faces/crazy_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'daw_face',
                'name': 'Daw Face',
                'short_names': ['daw_face'],
                'keywords': ['daw', 'face'],
                'skins': [{'src': '/assets/emoji/faces/daw_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'eye_roll_face',
                'name': 'Eye Roll Face',
                'short_names': ['eye_roll_face'],
                'keywords': ['eye', 'roll', 'face'],
                'skins': [{'src': '/assets/emoji/faces/eye_roll_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'eye_rolling_shocked_face',
                'name': 'Eye Rolling Shocked Face',
                'short_names': ['eye_rolling_shocked_face'],
                'keywords': ['eye', 'rolling', 'shocked', 'face'],
                'skins': [{'src': '/assets/emoji/faces/eye_rolling_shocked_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'faint_face',
                'name': 'Faint Face',
                'short_names': ['faint_face'],
                'keywords': ['faint', 'face'],
                'skins': [{'src': '/assets/emoji/faces/faint_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'fight_face',
                'name': 'Fight Face',
                'short_names': ['fight_face'],
                'keywords': ['fight', 'face'],
                'skins': [{'src': '/assets/emoji/faces/fight_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'happy_cry_face',
                'name': 'Happy Cry Face',
                'short_names': ['happy_cry_face'],
                'keywords': ['happy', 'cry', 'face'],
                'skins': [{'src': '/assets/emoji/faces/happy_cry_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'hungry_face',
                'name': 'Hungry Face',
                'short_names': ['hungry_face'],
                'keywords': ['hungry', 'face'],
                'skins': [{'src': '/assets/emoji/faces/hungry_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'medic_face',
                'name': 'Medic Face',
                'short_names': ['medic_face'],
                'keywords': ['medic', 'face'],
                'skins': [{'src': '/assets/emoji/faces/medic_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'money_face',
                'name': 'Money Face',
                'short_names': ['money_face'],
                'keywords': ['money', 'face'],
                'skins': [{'src': '/assets/emoji/faces/money_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'nerd_face',
                'name': 'Nerd Face',
                'short_names': ['nerd_face'],
                'keywords': ['nerd', 'face'],
                'skins': [{'src': '/assets/emoji/faces/nerd_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'open_face',
                'name': 'Open Face',
                'short_names': ['open_face'],
                'keywords': ['open', 'face'],
                'skins': [{'src': '/assets/emoji/faces/open_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'rip_face',
                'name': 'RIP Face',
                'short_names': ['rip_face'],
                'keywords': ['rip', 'face'],
                'skins': [{'src': '/assets/emoji/faces/rip_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'shocked_face',
                'name': 'Shocked Face',
                'short_names': ['shocked_face'],
                'keywords': ['shocked', 'face'],
                'skins': [{'src': '/assets/emoji/faces/shocked_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'sick_face',
                'name': 'Sick Face',
                'short_names': ['sick_face'],
                'keywords': ['sick', 'face'],
                'skins': [{'src': '/assets/emoji/faces/sick_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'smile_face',
                'name': 'Smile Face',
                'short_names': ['smile_face'],
                'keywords': ['smile', 'face'],
                'skins': [{'src': '/assets/emoji/faces/smile_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'snicker_face',
                'name': 'Snicker Face',
                'short_names': ['snicker_face'],
                'keywords': ['snicker', 'face'],
                'skins': [{'src': '/assets/emoji/faces/snicker_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'soft_smile_face',
                'name': 'Soft Smile Face',
                'short_names': ['soft_smile_face'],
                'keywords': ['soft', 'smile', 'face'],
                'skins': [{'src': '/assets/emoji/faces/soft_smile_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'sour_face',
                'name': 'Sour Face',
                'short_names': ['sour_face'],
                'keywords': ['sour', 'face'],
                'skins': [{'src': '/assets/emoji/faces/sour_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'startled_face',
                'name': 'Startled Face',
                'short_names': ['startled_face'],
                'keywords': ['startled', 'face'],
                'skins': [{'src': '/assets/emoji/faces/startled_face.png'}],
                'native': '',
                'unified': 'custom',
            },
            {
                'id': 'whoa_face',
                'name': 'Whoa Face',
                'short_names': ['whoa_face'],
                'keywords': ['whoa', 'face'],
                'skins': [{'src': '/assets/emoji/faces/whoa_face.png'}],
                'native': '',
                'unified': 'custom',
            },
        ],
    },
]

# Create the components
color_picker = ColorPicker(
    id="color-picker",
    format="rgba",
    value="rgba(51, 136, 255, 1)"
)

actions_header = html.H3("Actions:", id="actions")
actions_content = html.Pre(id="actions-content", style={
    'whiteSpace': 'pre-wrap',
    'wordBreak': 'break-word',
    'backgroundColor': '#f5f5f5',
    'padding': '10px',
    'borderRadius': '4px',
    'marginBottom': '20px'
})

color_controls = html.Div(Stack([
    color_picker,
    Button(
        "Apply Color to Last Drawing",
        id="apply-color-button",
        style={"marginLeft": "10px", "marginTop": "auto", "marginBottom": "auto"}
    )
]), id="color-picker-container")

emoji_picker = html.Div(DashEmojiMart(
    id='emoji-picker',
    custom=custom,
    autoFocus=False,
    categories=['frequent', 'custom'],
    dynamicWidth=False,
    emojiButtonSize=36,
    emojiSize=24,
), id="emoji-picker-container")

edit_control = EditControl(
    id="edit_control",
    position='topright',
    draw={
        'polyline': {
            'shapeOptions': {
                'color': '#3388ff',
                'fillColor': '#3388ff',
                'fillOpacity': 0.2,
                'opacity': 0.5,
                'weight': 4,
            }
        },
        'polygon': {
            'shapeOptions': {
                'color': '#3388ff',
                'fillColor': '#3388ff',
                'fillOpacity': 0.2,
                'opacity': 0.5,
                'weight': 4,
            }
        },
        'circle': {
            'shapeOptions': {
                'color': '#3388ff',
                'fillColor': '#3388ff',
                'fillOpacity': 0.2,
                'opacity': 0.5,
                'weight': 4,
            }
        },
        'rectangle': {
            'shapeOptions': {
                'color': '#3388ff',
                'fillColor': '#3388ff',
                'fillOpacity': 0.2,
                'opacity': 0.5,
                'weight': 4,
            }
        },
        'marker': True,  # Simplified marker config
    }
)

feature_group = FeatureGroup([edit_control], id="feature_group")



# Create the app using app_stub
app = app_stub(
    components=[
        TileLayer(),
        feature_group,
        EasyButton(icon="fa-palette", title="color selector", id="color_selector_icon", n_clicks=1),
        EasyButton(icon="fa-icons", title="emoji selector", id="emoji_selector_icon", n_clicks=1)
    ]
)

app.layout.children.insert(0, html.Div([color_controls, emoji_picker]))
app.layout.children.insert(-1, html.Div([actions_header, actions_content]))


@callback(
    Output("emoji-picker-container", "style"),
    Input("emoji_selector_icon", "n_clicks")
)
def toggle_emoji_picker(n_clicks):
    if n_clicks % 2 == 0:
        return {"position": "absolute", "left": "45px", "top": "8vh", "zIndex": "1000"}
    return {"display": "none"}


@callback(
    Output("color-picker-container", "style"),
    Input("color_selector_icon", "n_clicks")
)
def toggle_color_picker(n_clicks):
    if n_clicks % 2 == 0:
        return {"position": "absolute", "left": "45px", "top": "8vh", "zIndex": "1000"}
    return {"display": "none"}


@callback(
    Output("edit_control", "draw"),
    Output("edit_control", "currentColor"),
    Input("color-picker", "value")
)
def update_draw_options(color):
    if not color:
        return no_update, no_update

    hex_color = rgba_to_hex(color)
    shape_options = {
        'shapeOptions': {
            'color': hex_color,
            'fillColor': hex_color,
            'fillOpacity': 0.2,
            'opacity': 0.5,
            'weight': 4,
        }
    }

    marker_options = {
        'icon': {
            'iconUrl': '/assets/emoji/faces/alien_face.png',
            'iconSize': [25, 25],
            'iconAnchor': [12.5, 12.5]
        }
    }

    return {
        'polyline': shape_options,
        'polygon': shape_options,
        'circle': shape_options,
        'rectangle': shape_options,
        'marker': marker_options
    }, hex_color


@callback(
    Output("edit_control", "geojson"),
    Output("emoji-picker", "value"),  # Add this output to clear the emoji value
    [Input("apply-color-button", "n_clicks"),
     Input("emoji-picker", "value")],
    [State("edit_control", "geojson"),
     State("color-picker", "value")]
)
def update_features(n_clicks, emoji_value, geojson_data, color):
    if not geojson_data or not geojson_data.get('features'):
        return no_update, no_update

    ctx = callback_context
    if not ctx.triggered:
        return no_update, no_update

    triggered_id = ctx.triggered[0]['prop_id'].split('.')[0]
    features = list(geojson_data['features'])

    if triggered_id == "apply-color-button" and color and n_clicks:
        hex_color = rgba_to_hex(color)
        # Update the last non-marker feature's color
        for feature in reversed(features):
            if feature['properties']['type'] != 'marker':
                feature['properties']['color'] = hex_color
                break
        return {
            'type': 'FeatureCollection',
            'features': features
        }, no_update

    elif triggered_id == "emoji-picker" and emoji_value:
        # Find the last marker in the list
        for feature in reversed(features):
            if feature['properties']['type'] == 'marker':
                feature['properties']['emoji'] = emoji_value
                feature['properties']['icon'] = {
                    'iconUrl': emoji_value,
                    'iconSize': [25, 25],
                    'iconAnchor': [12.5, 12.5]
                }
                break

        return {
            'type': 'FeatureCollection',
            'features': features
        }, None  # Clear the emoji picker value

    return no_update, no_update


@callback(
    Output("actions-content", "children"),
    [Input("edit_control", "geojson"),
     Input("apply-color-button", "n_clicks"),
     Input("emoji-picker", "value")]
)
def display_action_data(geojson_data, n_clicks, emoji_value):
    if not geojson_data or not geojson_data.get('features'):
        return "No features drawn"

    display_geojson = {
        'type': 'FeatureCollection',
        'features': []
    }

    for feature in geojson_data['features']:
        new_feature = {
            'type': 'Feature',
            'properties': {
                'type': feature['properties']['type'],
                'leafletId': feature['properties']['leafletId'],
                'color': feature['properties'].get('color'),
            }
        }

        # Add emoji property for markers
        if feature['properties']['type'] == 'marker' and 'emoji' in feature['properties']:
            new_feature['properties']['emoji'] = feature['properties']['emoji']

        # Add other properties if present
        for prop in ['radius', 'mRadius', 'bounds']:
            if prop in feature['properties']:
                new_feature['properties'][prop] = feature['properties'][prop]

        new_feature['geometry'] = feature['geometry']
        display_geojson['features'].append(new_feature)

    return str(display_geojson).replace("'", '"')

if __name__ == "__main__":
    app.run_server(port=9997)