import dash
import dash_leaflet as dl
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Output, Input, State
from dash.exceptions import PreventUpdate

app = dash.Dash()
app.layout = html.Div([
    dcc.Store(id='map-store', storage_type='local'),
    dl.Map(dl.TileLayer(), style={'width': '1000px', 'height': '500px'}, id='map'),
    html.Div(id='map-output'),
])


@app.callback(
    Output('map-store', 'data'),
    [Input('map', 'changed_zoom'),
     Input('map', 'changed_center')],
    [State('map-store', 'data')]
)
def store_map_viewport(z, c, data):
    if data is None:
        data = {}
    if z is not None:
        data['zoom'] = z
    if c is not None:
        data['center'] = c
    if data:
        return data
    raise PreventUpdate


@app.callback(
    [Output('map', 'center'),
     Output('map', 'zoom')],
    [Input('map-store', 'modified_timestamp')],
    [State('map-store', 'data')])
def update_map_viewport(ts, data):
    if not ts:
        raise PreventUpdate
    return data['center'], data['zoom']


if __name__ == '__main__':
    app.run_server(debug=True)
