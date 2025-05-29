from dash_leaflet import TileLayer, PolylineDecorator
from tests.stubs import event_app_stub

patterns = [dict(offset='5%', repeat='10%', marker={})]
arrow = PolylineDecorator(positions=[[58.44773, -28.65234], [52.9354, -23.33496], [53.01478, -14.32617],
                                  [58.1707, -10.37109], [59.68993, -0.65918]], patterns=patterns, id="decorator")
app, _ = event_app_stub(components=[arrow, TileLayer()], center=[56, -12])

if __name__ == "__main__":
    app.run(port=9997, debug=True)