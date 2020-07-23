import dash
import dash_html_components as html
import dash_leaflet as dl
import dash_leaflet.express as dlx
import pandas as pd
import numpy as np

# A possible syntax.
markers = [
    dict(lat=55, lon=10, tooltip="I am a tooltip"),
    dict(lat=56, lon=10, popup="I am a popup"),
    dict(lat=55, lon=11, markerOptions=dict(opacity=0.5)),
    dict(lat=56, lon=12, markerOptions=dict(icon=dict(iconUrl="assets/icon_plane.png"))),
]
# The same data, now as a dataframe.
data = [
    [55, 10, "I am a tooltip", None, None, None],
    [56, 10, None, "I am a popup", None, None],
    [55, 11, None, None, "0.5", None],
    [56, 11, None, None, None, "assets/icon_plane.png"]
]
df = pd.DataFrame(data=data, columns=["lat", "lon", "tooltip", "popup", "opacity", "icon"])

def row_to_marker(row):
    marker = {key: row[key] for key in df.columns if row[key]}
    # Handle non-direct mappings.
    if "opacity" in marker:
        marker["markerOptions"] = dict(opacity=0.5)
    if "icon" in marker:
        marker["markerOptions"] =dict(icon=dict(iconUrl="assets/icon_plane.png"))
    return marker
    
markers = df.apply(row_to_marker, axis=1)

app = dash.Dash()
app.layout = html.Div([
    dl.Map([dl.TileLayer(), dlx.supercluster(markers, options={"radius": 100})], 
    center=(56, 10), zoom=5, style={'width': '100%', 'height': '50vh', 'margin': "auto", "display": "block"})
])

if __name__ == '__main__':
    app.run_server(debug=False)