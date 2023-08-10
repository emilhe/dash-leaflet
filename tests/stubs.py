import json
from typing import Optional
from dash import Dash, html, Output, Input
from dash_leaflet import MapContainer
from dash.development.base_component import Component

def app_stub(components: Optional[list[Component]] = None, app_kwargs=None, **kwargs):
    app = Dash(__name__, **(app_kwargs if app_kwargs is not None else {}))
    app.layout = html.Div(
        [
            MapContainer(components if components is not None else [], id="map", **kwargs, style=dict(width="1000px", height="500px")),
            html.Div(id="log")
        ]
    )
    return app

def event_app_stub(components: Optional[list[Component]] = None, target_id: Optional[str] = None, target_prop="n_clicks", **kwargs):
    """
    A basic Dash app with a map container (and optionally additional components) along with a single callback that fires on click events. 
    """
    if target_id is None:
        target_id = "map" if components is None else components[0].id
    app = app_stub(components=components, **kwargs)

    @app.callback(Output("log", "children"), Input(target_id, target_prop))
    def onevent(e):
        """
        On event, route event information to log element.
        """
        return json.dumps(e)
    
    return app, f"#{target_id}"