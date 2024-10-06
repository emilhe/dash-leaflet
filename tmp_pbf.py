import dash_leaflet as dl
from dash import Dash
from dash_extensions.javascript import assign

# url = "https://klokantech.github.io/mapbox-gl-js-offline-example/countries/{z}/{x}/{y}.pbf"
url = "https://openinframap.org/tiles/{z}/{x}/{y}.pbf"
geojson_filter = assign("function(x, y, z){{console.log('THERE BE DRAGONS'); console.log(x); console.log(y); console.log(z);}}")

app = Dash()
app.layout = dl.Map([dl.TileLayer(), dl.VectorTileLayer(url=url, featureToLayer=geojson_filter, maxDetailZoom=6)], center=[40, -100], zoom=1, style={'height': '50vh'})

if __name__ == '__main__':
    app.run_server(debug=True)