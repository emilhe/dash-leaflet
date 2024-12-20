from dash import html, dcc
from dash_leaflet import ImageMarker, TileLayer
from dash_image_gallery import DashImageGallery
from tests.stubs import event_app_stub
from dash.dependencies import Input, Output, State

# Test images data
images = [
    {
        "original": "https://picsum.photos/800/600",
        "thumbnail": "https://picsum.photos/200/150",
        "originalHeight": 600,
        "originalWidth": 800,
        "description": "Image 1"
    },
    {
        "original": "https://picsum.photos/801/601",
        "thumbnail": "https://picsum.photos/201/151",
        "originalHeight": 601,
        "originalWidth": 801,
        "description": "Image 2"
    },
    {
        "original": "https://picsum.photos/802/602",
        "thumbnail": "https://picsum.photos/202/152",
        "originalHeight": 602,
        "originalWidth": 802,
        "description": "Image 3"
    }
]

# Create test components
marker = ImageMarker(
    position=[56, 10],
    images=images,
    width=60,
    height=60,
    id="image-marker"
)

# Create the test app with marker first
app, _ = event_app_stub(components=[marker, TileLayer()])

# Create gallery container
gallery_container = html.Div(
    [
        # Clickable overlay
        html.Div(
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
        # Gallery content
        html.Div(
            DashImageGallery(
                id='image-gallery',
                items=images,
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
        )
    ],
    id='gallery-container',
    style={'display': 'none'}
)

# Add dcc.Store for state management
app.layout = html.Div([
    *app.layout.children,
    gallery_container,
    dcc.Store(id='click-store', data={'marker_clicks': 0, 'overlay_clicks': 0}),
])

# Add client-side callbacks
app.clientside_callback(
    """
    function(marker_clicks, overlay_clicks, current_style) {
        const ctx = dash_clientside.callback_context;
        if (!ctx.triggered.length) return current_style;

        const triggered = ctx.triggered[0];
        const prop_id = triggered.prop_id.split('.');
        const isMarkerClick = prop_id[0] === 'image-marker';
        const isOverlayClick = prop_id[0] === 'gallery-overlay';

        if (isMarkerClick) {
            return {'display': 'block'};
        } else if (isOverlayClick) {
            return {'display': 'none'};
        }
        return current_style;
    }
    """,
    Output('gallery-container', 'style'),
    [Input('image-marker', 'n_clicks'),
     Input('gallery-overlay', 'n_clicks')],
    [State('gallery-container', 'style')],
    prevent_initial_call=True
)

if __name__ == "__main__":
    app.run_server(port=9997, debug=True)