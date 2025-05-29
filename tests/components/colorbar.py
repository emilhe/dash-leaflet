from dash_leaflet import Colorbar
from tests.stubs import event_app_stub

colorscale = ['red', 'yellow', 'green', 'blue', 'purple']  # rainbow
colorbar = Colorbar(colorscale=colorscale, width=20, height=150, min=0, max=1, unit='m', id="bar", position="bottomleft")
app, _ = event_app_stub(components=[colorbar])

if __name__ == "__main__":
    app.run(port=9997)