import json

import dash
import dash_html_components as html
import dash_core_components as dcc
import dash_leaflet as dl

from dash.dependencies import Input, Output

modes = ["ALL", "CREATE", "EDIT", "DELETE", "APPEND"]
# Create app.
app = dash.Dash(prevent_initial_callbacks=True)
app.layout = html.Div([
    dl.Map([dl.TileLayer(), dl.Freedraw(modes=[modes[0]], id="freedraw")], zoom=3, center=(51, 10)),
    dcc.Dropdown(id="dd", options=[dict(value=m, label=m) for m in modes], value=modes[0], multi=True),
    html.Div(id="output")
], style={'width': '100%', 'height': '50vh', 'margin': "auto", "display": "block"})


@app.callback(Output("freedraw", "modes"), [Input("dd", "value")])
def update(modes):
    return [modes] if isinstance(modes, str) else modes


@app.callback(Output("output", "children"), [Input("freedraw", "markers")])
def listen(markers):
    return json.dumps(markers)


if __name__ == '__main__':
    app.run_server(port=5757, debug=True)
