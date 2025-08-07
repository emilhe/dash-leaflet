from dash_leaflet import Rectangle
from tests.stubs import event_app_stub

component = Rectangle(bounds=[[56, 10], [55, 9]], id="rectangle")
app, _ = event_app_stub(components=[component])

if __name__ == "__main__":
    app.run(port=9997)