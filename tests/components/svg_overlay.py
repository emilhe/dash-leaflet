from dash_leaflet import SVGOverlay, TileLayer
from tests.stubs import event_app_stub
from dash_svg import Rect

selector = ".leaflet-interactive"
bounds = [[56, 10], [55, 9]]
component = SVGOverlay(
    children=[
        Rect(width=200, height=200),
        Rect(x=75, y=23, width=50, height=50, style="fill:red"),
        Rect(x=75, y=123, width=50, height=50, style="fill:#0013ff"),
    ],
    attributes=dict(
        stroke='red',
        viewbox="0 0 200 200",
        xmlns="http://www.w3.org/2000/svg"
    ), bounds=bounds, id="svg_overlay", interactive=True,
)
center = [(bounds[0][0] + bounds[1][0])/2, (bounds[0][1] + bounds[1][1])/2]
app, _ = event_app_stub(components=[component, TileLayer()], center=center, zoom=8)

if __name__ == "__main__":
    app.run_server(port=9997)