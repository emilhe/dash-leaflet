from dash_leaflet import TileLayer, EasyButton
from tests.stubs import event_app_stub

component = EasyButton(icon="fa-globe", title="So easy", id="btn")
app_kwargs = dict(external_stylesheets=["https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"])
app, _ = event_app_stub(components=[component, TileLayer()], app_kwargs=app_kwargs, target_prop="n_clicks")

if __name__ == "__main__":
    app.run_server(port=9997, debug=True)