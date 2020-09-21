# AUTO GENERATED FILE - DO NOT EDIT

export dl_geojson

"""
    dl_geojson(;kwargs...)
    dl_geojson(children::Any;kwargs...)
    dl_geojson(children_maker::Function;kwargs...)


A GeoJSON component.
LayerGroup is a wrapper of LayerGroup in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): Children
- `options` (Dict; optional): Options for the GeoJSON object (see https://leafletjs.com/reference-1.6.0.html#geojson-option for details).
- `data` (Dict | String; optional): Data (consider using url for better performance).
- `url` (String; optional): Url to data (use instead of data for better performance).
- `format` (a value equal to: "geojson", "geobuf"; optional): Data format.
- `hoverStyle` (String | Dict; optional): Style function applied on hover.
- `zoomToBoundsOnClick` (Bool; optional): If true, zoom to feature bounds on click.
- `zoomToBounds` (Bool; optional): If true, zoom bounds when data are set.
- `hideout` (Dict; optional): Object intended for passing variables to functional properties, i.e. clusterToLayer, hoverStyle and
(options) pointToLayer, style, filter, and onEachFeature functions.
- `pane` (String; optional): The leaflet pane of the component
- `cluster` (Bool; optional): If true, marker clustering will be performed.
- `clusterToLayer` (String; optional): Function that determines how a cluster is drawn.
- `spiderfyOnMaxZoom` (Bool; optional): If true, markers that are not resolved at max zoom level will be spiderfied on click.
- `superClusterOptions` (Dict; optional): Options for the SuperCluster object (see https://github.com/mapbox/supercluster for details).
- `id` (String; optional): The ID used to identify this component in Dash callbacks
- `n_clicks` (Real; optional): Dash callback property. Number of times the object has been clicked.
- `click_feature` (Dict; optional): Last feature clicked.
- `hover_feature` (Dict; optional): Last feature hovered.
"""
function dl_geojson(; kwargs...)
        available_props = Symbol[:children, :options, :data, :url, :format, :hoverStyle, :zoomToBoundsOnClick, :zoomToBounds, :hideout, :pane, :cluster, :clusterToLayer, :spiderfyOnMaxZoom, :superClusterOptions, :id, :n_clicks, :click_feature, :hover_feature]
        wild_props = Symbol[]
        return Component("dl_geojson", "GeoJSON", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_geojson(children::Any; kwargs...) = dl_geojson(;kwargs..., children = children)
dl_geojson(children_maker::Function; kwargs...) = dl_geojson(children_maker(); kwargs...)

