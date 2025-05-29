import dash_leaflet.express as dlx
from dash_leaflet import GeoJSON
from tests.stubs import event_app_stub

selector = ".leaflet-marker-icon"
cities = [dict(name="Aalborg", lat=57.0268172, lon=9.837735),
          dict(name="Aarhus", lat=56.1780842, lon=10.1119354),
          dict(name="Copenhagen", lat=55.6712474, lon=12.5237848)]
geojson = dlx.dicts_to_geojson([{**c, **dict(tooltip=c['name'])} for c in cities])
component = GeoJSON(data=geojson, id="geojson")
app, _ = event_app_stub(components=[component])

if __name__ == "__main__":
    app.run(port=9997)