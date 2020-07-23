# import json
# from geojson import Point, Feature, FeatureCollection, dump

# # Load marker positions.
# with open("positions.json", 'r') as f:
#     positions = json.load(f)
# # Convert to GeoJSON.
# features = []
# for pos in positions:
#     features.append(Feature(geometry=Point((pos[1], pos[0])), properties={"cluster": False}))
# feature_collection = FeatureCollection(features)
# with open('myfile.geojson', 'w') as f:
#    dump(feature_collection, f)

import dash
import dash_html_components as html
import dash_leaflet as dl
import geobuf
from geojson import load
import json

from dash.dependencies import Input, Output

with open('leaflet_50k.geojson', 'r') as f:
   data = load(f)
# dct = {}
import bz2
import compress_json
import io
import base64

data_io = io.BytesIO()
# Write the data.
fout = bz2.open(data_io)
# Get the data.
data_value = data_io.getvalue()
content = base64.b64encode(data_value).decode()
# fout = bz2.open(path, mode=mode, encoding="utf-8",
#                **compression_kwargs)

data1 = json.dumps(data)
data2 = bz2.compress(data1.encode("utf-8"))
data3 = base64.b64encode(data2).decode()

print(len(data1))
print(len(data2))
print(len(data3))

# compress_json.dump(data, "filepath2.json.gz") # for a gzip file
# compress_json.dump(data, "filepath2.json.bz") # for a bz2 file
# compress_json.dump(data, "filepath2.json.lzma") # for a lzma file

# gb = geobuf.encode(data)
# with open('myfile.pbf', 'pbf') as f:
#    f.write(gb)

# data["features"] = data["features"] # [:1000]

app = dash.Dash(prevent_initial_callbacks=True)
app.layout = html.Div([
    dl.Map([dl.TileLayer(), dl.SuperCluster(data=data, id="cluster")],  center=(42.54, -78.05), zoom=5, id="map", preferCanvas=True,
           style={'width': '100%', 'height': '50vh', 'margin': "auto", "display": "block"}),
    html.Div(id="output1"),
    html.Div(id="output2")
])

@app.callback(Output("output1", "children"), [Input("cluster", "n_clicks")])
def func1(click_lat_lng):
    return json.dumps(click_lat_lng)

@app.callback(Output("output2", "children"), [Input("cluster", "marker_click")])
def func2(click_lat_lng):
    return json.dumps(click_lat_lng)

if __name__ == '__main__':
    app.run_server(debug=False)