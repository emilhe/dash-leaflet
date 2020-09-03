default_options = dict(min=0, max=1, colorscale=['yellow', 'red', 'black'], color_prop="value",
                       popup_prop="popup", circle_options=dict(fillOpacity=1, stroke=False, radius=5))


def _resolve_options(x, y):
    if y is None:
        return x
    z = dict(x)  # start with x's keys and values
    z.update(y)  # modifies z with y's keys and values & returns None
    return z


def _get_color(options, value):
    csc = chroma.scale(options.colorscale).domain([options.min, options.max])
    return csc(value)


def bind_popup(feature, layer, context):
    options = _resolve_options(default_options, context.props.hideout)
    if feature.properties and feature.properties[options.popup_prop]:
        value = feature.properties[options.popup_prop]
        if Number.isFinite(value):
            value = value.toString()
        layer.bindPopup(value)


def point_to_layer(feature, latlng, context):
    options = _resolve_options(default_options, context.props.hideout)
    circle_options = dict(options.circle_options)
    circle_options.fillColor = _get_color(options, feature.properties[options.color_prop])
    return L.circleMarker(latlng, circle_options)


def cluster_to_layer(feature, latlng, index, context):
    options = _resolve_options(default_options, context.props.hideout)
    # Set color based on mean value of leaves.
    leaves = index.getLeaves(feature.properties.cluster_id)
    value_sum = 0
    for leaf in leaves:
        value_sum += leaf.properties[options.color_prop]
    value_mean = value_sum / len(leaves)
    # Render a circle with the number of leaves written in the center.
    icon = L.divIcon.scatter(dict(
        html='<div style="background-color:white;"><span>' +
             feature.properties.point_count_abbreviated +
             '</span></div>',
        className="marker-cluster",
        iconSize=L.point(40, 40),
        color=_get_color(options, value_mean)
    ))
    return L.marker(latlng, dict(icon=icon))
