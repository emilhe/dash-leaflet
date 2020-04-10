# Dash Leaflet

Dash Leaflet is a light wrapper around React-Leaflet. The syntax is similar to other Dash components, with naming conventions following the React-Leaflet API. A minimal working example can be implemented in a few lines, 
 
    import dash
    import dash_leaflet as dl
    import dash_html_components as html
    
    app = dash.Dash()
    app.layout = html.Div([
        dl.Map(style={'width': '1000px', 'height': '500px'}, center=[56.05, 10.25], zoom=10, children=dl.TileLayer())
    ])
    
    if __name__ == '__main__':
        app.run_server(debug=False)

Not all React-Leaflet components have been implemented, but the basics are in place:

* TileLayer
* WMSTileLayer
* LayerGroup
* Polygon
* Polyline
* Rectangle
* Circle
* CircleMarker
* Marker
* ImageOverlay
* VideoOverlay
* Popup
* Tooltip

Component documentation is available on the React-Leaflet website,

https://react-leaflet.js.org/docs/en/components 

More advanced Dash Leaflet examples are available in the usage gallery,

https://github.com/thedirtyfew/dash-leaflet/blob/master/usage_gallery.py