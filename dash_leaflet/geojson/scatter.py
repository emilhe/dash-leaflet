import math

default_options = dict(vmin=0, vmax=1, cmap=['yellow', 'red', 'black'], color_prop="value",
                       circle_options=dict(fillOpacity=1, stroke=False, radius=5))


def _resolve_options(x, y):
    if y is None:
        return x
    z = dict(x)  # start with x's keys and values
    z.update(y)  # modifies z with y's keys and values & returns None
    return z


def _resolve_circle_options(options, value):
    color_scale = chroma.scale(options["cmap"]).domain([options["vmin"], options["vmax"]])
    circle_options = dict(options["circle_options"])
    circle_options["fillColor"] = color_scale(value)
    return circle_options


def point_to_layer(feature, latlng, context):
    options = _resolve_options(default_options, context["props"]["funcScope"])
    circle_options = _resolve_circle_options(options, feature["properties"][options["color_prop"]])
    return L.circleMarker(latlng, circle_options)


def cluster_to_layer(feature, latlng, index, context):
    options = _resolve_options(default_options, context["props"]["funcScope"])
    # Set color based on mean value of leaves.
    leaves = index.getLeaves(feature["properties"]["cluster_id"])
    value_sum = 0
    for leaf in leaves:
        value_sum += leaf["properties"][options["color_prop"]]
    value_mean = value_sum / len(leaves)
    circle_options = _resolve_circle_options(options, value_mean)
    # Set radius so that cluster area = area of leaves.
    area = math.sqrt(len(leaves))
    circle_options["radius"] = options["circle_options"]["radius"] * area
    # Render a circle.
    return L.circleMarker(latlng, circle_options)
