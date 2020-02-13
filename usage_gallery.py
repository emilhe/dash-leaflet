import json
import dash
import dash_core_components as dcc
import dash_html_components as html
import dash_leaflet as dl
import settings

from dash.dependencies import Output, Input

# Mapbox setup
mapbox_url = "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{{z}}/{{x}}/{{y}}{{r}}?access_token={access_token}"
mapbox_token = settings.MAPBOX_TOKEN
mapbox_ids = ["light-v9", "dark-v9", "streets-v9", "outdoors-v9", "satellite-streets-v9"]

# region Example 1

MAP_ID = "map-id"
BASE_LAYER_ID = "base-layer-id"
BASE_LAYER_DROPDOWN_ID = "base-layer-drop-down-id"
COORDINATE_CLICK_ID = "coordinate-click-id"


def render_example1():
    comment = """ Marker with default icon, marker with custom icon, circle marker (fixed pixel radius), 
    circle (fixed physical radius), polyline, polygon and rectangle, all supporting tooltips and popups. """
    return [
        html.H1("Example 1: Basic components"),
        html.P(comment),
        dl.Map(id=MAP_ID, style={'width': '1000px', 'height': '500px'}, center=[56.05, 10.25], zoom=10, children=[
            dl.TileLayer(id=BASE_LAYER_ID),
            # Marker with tool tip and popup.
            dl.Marker(position=[56, 9.8], children=[
                dl.Tooltip("Marker tooltip"),
                dl.Popup([
                    html.H1("Marker popup"),
                    html.P("with inline html")
                ])
            ]),
            # Marker with custom icon.
            dl.Marker(position=[55.94, 9.96], icon={
                "iconUrl": "/assets/149059.svg",
                "iconSize": [25, 25]
            }, children=[
                dl.Tooltip("Marker with custom icon")
            ]),
            # Circle marker (with fixed radius in pixel).
            dl.CircleMarker(center=[56.05, 10.15], radius=20, children=[
                dl.Popup('Circle marker, 20px')
            ]),
            # Circle with fixed radius in meters.
            dl.Circle(center=[56.145, 10.21], radius=2000, color='rgb(255,128,0)', children=[
                dl.Tooltip('Circle, 2km radius')
            ]),
            # Polyline marker.
            dl.Polyline(id='polyline', positions=[[56.06, 10.0],
                                                  [56.056, 10.01],
                                                  [56.064, 10.028],
                                                  [56.0523, 10.0717],
                                                  [56.044, 10.073]], children=[
                dl.Tooltip('Polyline')
            ]),
            # Polygon marker.
            dl.Polygon(id='polygon', positions=[[56.013, 9.84],
                                                [56.0544, 9.939],
                                                [56.003, 10.001]], children=[
                dl.Tooltip('Polygon')
            ]),
            # Rectangle marker.
            dl.Rectangle(id='rectangle', bounds=[[55.9, 10.2], [56.0, 10.5]], children=[
                dl.Tooltip('Rectangle')
            ])]),
        dcc.RadioItems(
            id=BASE_LAYER_DROPDOWN_ID,
            options=[{"label": i, "value": mapbox_url.format(id=i, access_token=mapbox_token)} for i in mapbox_ids],
            labelStyle={'display': 'inline-block'},
            value=mapbox_url.format(id="light-v9", access_token=mapbox_token)
        ),
        html.P("Coordinate (click on map):"),
        html.Div(id=COORDINATE_CLICK_ID),
    ]


def register_example1(app):
    @app.callback(Output(BASE_LAYER_ID, "url"),
                  [Input(BASE_LAYER_DROPDOWN_ID, "value")])
    def set_baselayer(url):
        return url

    @app.callback(Output(COORDINATE_CLICK_ID, 'children'),
                  [Input(MAP_ID, 'click_lat_lng')])
    def click_coord(e):
        if e is not None:
            return json.dumps(e)
        else:
            return "-"


# endregion

# region Example 2

def render_example2():
    return [
        html.H1("Example 2: WMSTileLayer"),
        dl.Map(style={'width': '1000px', 'height': '500px'},
               center=[40, -100],
               zoom=4,
               children=[
                   dl.TileLayer(url=mapbox_url.format(id="dark-v9", access_token=mapbox_token)),
                   dl.WMSTileLayer(url="http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi",
                                   layers="nexrad-n0r-900913",
                                   format="image/png",
                                   transparent=True),
               ])
    ]


# endregion

# region Example 3

def render_example3():
    return [
        html.H1("Example 3: ImageOverlay"),
        dl.Map(style={'width': '1000px', 'height': '500px'},
               bounds=[[40.712216, -74.22655], [40.773941, -74.12544]],
               children=[
                   dl.TileLayer(),
                   dl.ImageOverlay(opacity=0.5, url="/assets/newark_nj_1922.jpg",
                                   bounds=[[40.712216, -74.22655], [40.773941, -74.12544]])
               ]),
    ]


# endregion

# region Example 4

BUTTON_PLAY_ID = "button-play"
VIDEO_OVERLAY_ID = "video-overlay-id"


def render_example4():
    return [
        html.H1("Example 4: VideoOverlay"),
        dl.Map(style={'width': '1000px', 'height': '500px'},
               bounds=[[32, -130], [13, -100]],
               children=[
                   dl.TileLayer(url=mapbox_url.format(id="satellite-streets-v9", access_token=mapbox_token)),
                   dl.VideoOverlay(id=VIDEO_OVERLAY_ID, url="/assets/patricia_nasa.webm",
                                   bounds=[[32, -130], [13, -100]]),
               ]),
        html.Button(id=BUTTON_PLAY_ID, children="Play/pause"),
    ]


def register_example4(app):
    @app.callback(Output(VIDEO_OVERLAY_ID, 'play'),
                  [Input(BUTTON_PLAY_ID, 'n_clicks')])
    def play_pause(n):
        if n is None or n % 2 == 0:
            return True
        else:
            return False


# endregion

# region Example 5

GEOTIFF_ID = "geotiff-id"
GEOTIFF_MARKER_ID = "geotiff-marker-id"


def render_example5():
    # Example from https://plot.ly/python/scatter-plots-on-maps/#us-airports-map
    color_domain = dict(domainMin=20, domainMax=40, colorscale=['white', 'orange', 'red'])
    return [
        html.H1("Example 5: GeoTIFFOverlay"),
        html.P("US airports (most arrivals)"),
        dl.Map(style={'width': '1000px', 'height': '500px'},
               center=[25, 45],
               zoom=5,
               children=[
                   dl.TileLayer(url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png"),
                   dl.GeoTIFFOverlay(id=GEOTIFF_ID, interactive=True, url="/assets/tz850.tiff", band=1, opacity=0.9,
                                     **color_domain),
                   dl.Colorbar(width=200, height=20, **color_domain, unit="°C", style={'color': 'white'}),
                   html.Div(id=GEOTIFF_MARKER_ID)
               ]),
    ]


def register_example5(app):
    @app.callback(Output(GEOTIFF_MARKER_ID, 'children'),
                  [Input(GEOTIFF_ID, 'click_lat_lng_val')])
    def geotiff_marker(x):
        if x is not None:
            lat, lon, val = x
            return dl.Marker(position=[lat, lon], icon={
                "iconUrl": "/assets/thermometer.png",
                "iconSize": [40, 40],
                "iconAnchor": [20, 36]
            }, children=[
                dl.Tooltip('{:.1f}°C'.format(val))
            ])
        else:
            return None


# endregion

app = dash.Dash(__name__, external_scripts=['https://codepen.io/chriddyp/pen/bWLwgP.css'])

# Create layout.
app.layout = html.Div(
    render_example1() +
    render_example2() +
    render_example3() +
    render_example4() +
    render_example5()
)
# Bind callbacks.
register_example1(app)
register_example4(app)
register_example5(app)

if __name__ == '__main__':
    app.run_server(debug=False, port=8150)
