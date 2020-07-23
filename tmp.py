import dash
import dash_leaflet as dl
import dash_html_components as html
import json

from dash.dependencies import Output, Input, State

app = dash.Dash()
app.layout = html.Div([
dl.Map(dl.TileLayer(), style={'width': '1000px', 'height': '500px'}, trackViewport=True, id="map"),
html.Div(id="output1"), html.Div(id="output2"), html.Div(id="output3")
]) 

@app.callback(Output("output1", "children"), [Input("map", "zoom")])
def func(viewport):
        print(viewport)
        return json.dumps(viewport)

@app.callback(Output("output2", "children"), [Input("map", "center")])
def func(viewport):
        print(viewport)
        return json.dumps(viewport)

@app.callback(Output("output3", "children"), [Input("map", "viewport")])
def func(viewport):
        print(viewport)
        return json.dumps(viewport)

if __name__ == '__main__':
        app.run_server()  

