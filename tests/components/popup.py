from dash import html
from dash_leaflet import Popup
from tests.stubs import event_app_stub

target_id = "popup"
component = Popup(position=[56, 10], children=html.Button("Click me!", id=target_id))
app, selector = event_app_stub(target_id=target_id, components=[component])

if __name__ == "__main__":
    app.run_server(port=9997)