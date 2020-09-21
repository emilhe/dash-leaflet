
module DashLeaflet
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.1.3"

include("dl_circle.jl")
include("dl_circlemarker.jl")
include("dl_colorbar.jl")
include("dl_divmarker.jl")
include("dl_geojson.jl")
include("dl_geotiffoverlay.jl")
include("dl_imageoverlay.jl")
include("dl_layergroup.jl")
include("dl_locatecontrol.jl")
include("dl_map.jl")
include("dl_marker.jl")
include("dl_markerclustergroup.jl")
include("dl_pane.jl")
include("dl_polygon.jl")
include("dl_polyline.jl")
include("dl_polylinedecorator.jl")
include("dl_popup.jl")
include("dl_rectangle.jl")
include("dl_svgoverlay.jl")
include("dl_scalecontrol.jl")
include("dl_tilelayer.jl")
include("dl_tooltip.jl")
include("dl_videooverlay.jl")
include("dl_wmstilelayer.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dash_leaflet",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "dash_leaflet.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
