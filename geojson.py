import dash
import dash_html_components as html
import json
import dash_leaflet as dl
import client_funcs

from dash.exceptions import PreventUpdate
from dash.dependencies import Output, Input
from dash_extensions.transpile import module2js, inject_js
from dash_leaflet import express as dlx
from client_funcs import marks, colorscale


def get_info(feature=None):
    header = [html.H4("US Population Density")]
    if not feature:
        return header + ["Hoover over a state"]
    return header + [html.B(feature["properties"]["name"]), html.Br(),
                     "{:.3f} people / mi".format(feature["properties"]["density"]), html.Sup("2")]


# Create colorbar.
ctg = ["{}+".format(mark, marks[i + 1]) for i, mark in enumerate(marks[:-1])] + ["{}+".format(marks[-1])]
colorbar = dlx.categorical_colorbar(categories=ctg, colorscale=colorscale, width=300, height=30, position="bottomleft")
# Create geojson.
with open("assets/us-states.json", 'r') as f:
    data = json.load(f)
js = module2js(client_funcs)  # do transcrypt to enable passing python functions as props
print(str(client_funcs.style))

geojson = dl.GeoJSON(data=data, id="geojson", options=dict(style=client_funcs.style),
                     hoverStyle=client_funcs.hover_style)
# Create info control.
info = html.Div(children=get_info(), id="info", className="info",
                style={"position": "absolute", "top": "10px", "right": "10px", "z-index": "1000"})
# Create app.
app = dash.Dash(prevent_initial_callbacks=True)
app.layout = html.Div([dl.Map(children=[dl.TileLayer(), geojson, colorbar, info], center=[39, -98], zoom=4, id="map")],
                      style={'width': '100%', 'height': '50vh', 'margin': "auto", "display": "block"})
# Inject transcrypted javascript.
inject_js(app, js)


@app.callback(Output("info", "children"), [Input("geojson", "featureHover")])
def info_on_hover(feature):
    return get_info(feature)


@app.callback(Output("map", "bounds"), [Input("geojson", "boundsClick")])
def zoom_on_click(bounds):
    if bounds is None:
        raise PreventUpdate
    return bounds


if __name__ == '__main__':
    app.run_server(port=7777, debug=True)
