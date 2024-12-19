import json
from typing import Optional
from dash import Dash, html, Output, Input
from dash_leaflet import MapContainer
from dash.development.base_component import Component
import dash_mantine_components as dmc
import dash
def app_stub(components: Optional[list[Component]] = None, app_kwargs=None, **kwargs):
    if "bounds" not in kwargs:
        kwargs["center"] = kwargs["center"] if ("center" in kwargs) else [56,10]
        kwargs["zoom"] = kwargs["zoom"] if ("zoom" in kwargs) else 6
    dash._dash_renderer._set_react_version('18.2.0')

    app = Dash(__name__, **(app_kwargs if app_kwargs is not None else {}), external_stylesheets=[dmc.styles.ALL, "https://use.fontawesome.com/releases/v6.2.1/css/all.css"])
    app.layout = dmc.MantineProvider(
        [
            MapContainer(components if components is not None else [], id="map", **kwargs, style=dict(width="100%", height="500px")),
            html.Div(id="log")
        ],
    forceColorScheme="dark",

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