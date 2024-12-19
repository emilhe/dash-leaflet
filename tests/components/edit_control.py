from dash import html, dcc
from dash_leaflet import EditControl, TileLayer, FeatureGroup, EasyButton
from dash_mantine_components import ColorPicker, Button, Stack
from dash import Input, Output, State, no_update
from tests.stubs import app_stub
import json


def rgba_to_hex(rgba_str):
    """Convert RGBA string to hex color"""
    # Remove rgba() wrapper and split values
    rgba = rgba_str.replace('rgba(', '').replace(')', '').split(',')
    r, g, b = [int(x) for x in rgba[:3]]  # Convert RGB values to integers
    # Convert to hex format
    return f'#{r:02x}{g:02x}{b:02x}'


# Create the components
color_picker = ColorPicker(
    id="color-picker",
    format="rgba",
    value="rgba(51, 136, 255, 1)"  # Default Leaflet blue color
)

# Add the actions header and content container
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
                'stroke': True,
                'fill': True
            }
        },
        'polygon': {
            'shapeOptions': {
                'color': '#3388ff',
                'fillColor': '#3388ff',
                'fillOpacity': 0.2,
                'opacity': 0.5,
                'weight': 4,
                'stroke': True,
                'fill': True
            }
        },
        'circle': {
            'shapeOptions': {
                'color': '#3388ff',
                'fillColor': '#3388ff',
                'fillOpacity': 0.2,
                'opacity': 0.5,
                'weight': 4,
                'stroke': True,
                'fill': True
            }
        },
        'rectangle': {
            'shapeOptions': {
                'color': '#3388ff',
                'fillColor': '#3388ff',
                'fillOpacity': 0.2,
                'opacity': 0.5,
                'weight': 4,
                'stroke': True,
                'fill': True
            }
        },
    }
)

# Create the app using app_stub
app = app_stub(
    components=[
        TileLayer(),
        FeatureGroup(id="feature_group", children=[edit_control]),
        EasyButton(icon="fa-palette", title="color selector", id="color_selector_icon", n_clicks=1)
    ]
)

# Add color picker and actions display to the layout before the map
app.layout.children.insert(0, html.Div([
    color_controls,
]))

app.layout.children.insert(-1, html.Div([
    actions_header,
    actions_content
]))

@app.callback(Output("color-picker-container", "style"),
            Input("color_selector_icon", "n_clicks"))
def trigger_color_mode(n_clicks):
    print('trigger_color_mode')
    print(n_clicks % 2)
    if n_clicks % 2 == 0:
        return {"position": "absolute", "left": "45px", "top": "8vh", "zIndex": "1000"}
    else:
        return {"display":"none"}

@app.callback(
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
            'color': hex_color,  # stroke color
            'fillColor': hex_color,  # fill color
            'fillOpacity': 0.2,  # matching SVG fill-opacity
            'opacity': 0.5,  # matching SVG stroke-opacity
            'weight': 4,  # matching SVG stroke-width
            'stroke': True,
            'fill': True
        }
    }

    return {
        'polyline': shape_options,
        'polygon': shape_options,
        'circle': shape_options,
        'rectangle': shape_options,
    }, hex_color


@app.callback(
    Output("edit_control", "geojson"),
    Input("apply-color-button", "n_clicks"),
    State("edit_control", "geojson"),
    State("color-picker", "value"),
    prevent_initial_call=True
)
def apply_color_to_last(n_clicks, geojson_data, color):
    if not n_clicks or not geojson_data or not geojson_data.get('features'):
        return no_update

    # Convert rgba to hex
    hex_color = rgba_to_hex(color)

    # Copy the features list
    features = list(geojson_data['features'])

    # Update only the last feature's color
    if features:
        features[-1]['properties']['color'] = hex_color

    # Return updated geojson
    return {
        'type': 'FeatureCollection',
        'features': features
    }

@app.callback(
    Output("actions-content", "children"),
    Input("edit_control", "geojson"),
    Input("apply-color-button", "n_clicks")  # Add this to update when button is clicked
)
def display_action_data(geojson_data, n_clicks):
    if not geojson_data or not geojson_data.get('features'):
        return "No features drawn"

    # Create a new geojson object with underscore properties
    display_geojson = {
        'type': 'FeatureCollection',
        'features': []
    }

    for feature in geojson_data['features']:
        # Create new feature with underscore properties
        new_feature = {
            'type': 'Feature',
            'properties': {
                'type': feature['properties']['type'],
                '_leaflet_id': feature['properties']['leafletId'],
                'color': feature['properties']['color']
            },
            'geometry': feature['geometry']
        }

        # Add radius if present
        if 'radius' in feature['properties']:
            new_feature['properties']['_radius'] = feature['properties']['radius']
        if 'mRadius' in feature['properties']:
            new_feature['properties']['_mRadius'] = feature['properties']['mRadius']
        if 'bounds' in feature['properties']:
            new_feature['properties']['_bounds'] = feature['properties']['bounds']

        display_geojson['features'].append(new_feature)

    # Return the stringified geojson
    return str(display_geojson).replace("'", '"')


if __name__ == "__main__":
    app.run_server(port=9997)