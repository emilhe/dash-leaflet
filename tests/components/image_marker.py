from dash import html, dcc, callback_context
from dash_leaflet import ImageMarker, TileLayer
from dash_image_gallery import DashImageGallery
from tests.stubs import event_app_stub
from dash.dependencies import Input, Output, State, ALL
import json

# Test images data
images = [
    {
        "original": "https://picsum.photos/800/600",
        "thumbnail": "https://picsum.photos/200/150",
        "originalHeight": 600,
        "originalWidth": 800,
        "description": "Image Set 1 - Image 1"
    },
    {
        "original": "https://picsum.photos/801/601",
        "thumbnail": "https://picsum.photos/201/151",
        "originalHeight": 601,
        "originalWidth": 801,
        "description": "Image Set 1 - Image 2"
    },
    {
        "original": "https://picsum.photos/802/602",
        "thumbnail": "https://picsum.photos/202/152",
        "originalHeight": 602,
        "originalWidth": 802,
        "description": "Image Set 1 - Image 3"
    }
]

images2 = [
    {
        "original": "https://picsum.photos/803/603",
        "thumbnail": "https://picsum.photos/203/153",
        "originalHeight": 603,
        "originalWidth": 803,
        "description": "Image Set 2 - Image 1"
    },
    {
        "original": "https://picsum.photos/804/604",
        "thumbnail": "https://picsum.photos/204/154",
        "originalHeight": 604,
        "originalWidth": 804,
        "description": "Image Set 2 - Image 2"
    },
    {
        "original": "https://picsum.photos/805/605",
        "thumbnail": "https://picsum.photos/205/155",
        "originalHeight": 605,
        "originalWidth": 805,
        "description": "Image Set 2 - Image 3"
    }
]

# Create test components
markers = [
    ImageMarker(
        position=[56, 10],
        images=images,
        width=60,
        height=60,
        id={"type": "image-marker", "index": 0}
    ),
    ImageMarker(
        position=[53, 9],
        images=images2,
        width=60,
        height=60,
        id={"type": "image-marker", "index": 1}
    )
]

# Create the test app
app, _ = event_app_stub(components=[*markers, TileLayer()])

# Create gallery container
gallery_container = html.Div(
    [
        # Gallery content
        html.Div(
            DashImageGallery(
                id='image-gallery',
                items=[],
                infinite=True,
                showNav=True,
                showThumbnails=True,
                thumbnailPosition='bottom',
                showFullscreenButton=True,
                showPlayButton=True,
                showBullets=False,
                showIndex=True,
            ),
            id='gallery-content',
            style={
                'position': 'fixed',
                'top': '50%',
                'left': '50%',
                'transform': 'translate(-50%, -50%)',
                'zIndex': 1000,
                'backgroundColor': 'white',
                'padding': '20px',
                'borderRadius': '8px',
                'boxShadow': '0 0 20px rgba(0,0,0,0.3)',
                'width': '80%',
                'maxWidth': '1000px'
            },
        ),
        # Overlay
        html.Div(
            [],
            id="gallery-overlay",
            n_clicks=0,
            style={
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'width': '100%',
                'height': '100%',
                'backgroundColor': 'rgba(0,0,0,0.7)',
                'zIndex': 999,
                'cursor': 'pointer'
            }
        ),
    ],
    id='gallery-container',
    style={'display': 'none'}
)

# Add gallery container to the layout
app.layout.children.append(gallery_container)


@app.callback(
    [Output('gallery-container', 'style'),
     Output('image-gallery', 'items'),
     Output({'type': 'image-marker', 'index': ALL}, 'n_clicks')],
    [Input({'type': 'image-marker', 'index': ALL}, 'n_clicks'),
     Input('gallery-overlay', 'n_clicks')],
    prevent_initial_call=True
)
def toggle_gallery(marker_clicks, overlay_clicks):
    ctx = callback_context
    if not ctx.triggered:
        return {'display': 'none'}, [], [0] * len(markers)

    trigger = ctx.triggered[0]['prop_id']

    # Handle overlay click
    if 'gallery-overlay' in trigger:
        return {'display': 'none'}, [], [0] * len(markers)

    # Handle marker clicks
    if 'image-marker' in trigger:
        marker_id = json.loads(trigger.split('.')[0])
        marker_index = marker_id['index']

        if marker_clicks and any(marker_clicks):
            # Reset all markers' n_clicks
            n_clicks_reset = [0] * len(markers)
            # Show gallery with appropriate images
            return {'display': 'block'}, images if marker_index == 0 else images2, n_clicks_reset

    # Default state
    return {'display': 'none'}, [], [0] * len(markers)


# Add callback to reset overlay clicks
@app.callback(
    Output('gallery-overlay', 'n_clicks'),
    [Input('gallery-overlay', 'n_clicks')],
    prevent_initial_call=True
)
def reset_overlay_clicks(n_clicks):
    return 0


if __name__ == "__main__":
    app.run_server(port=9997)