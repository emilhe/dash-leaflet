import json
import dash_leaflet as dl


def categorical_colorbar(*args, categories, colorscale, **kwargs):
    indices = list(range(len(categories) + 1))
    return dl.Colorbar(*args, min=0, max=len(categories), classes=indices, colorscale=colorscale, tooltip=False,
                       tickValues=[item + 0.5 for item in indices[:-1]], tickText=categories, **kwargs)


def geojson(data, *args, style, **kwargs):
    feature_id = "id"
    # If id missing and/or not unique, a new id (this list index) is assigned (this is NOT recommended).
    if not _validate_feature_ids(data):
        feature_id = "dash_id"
        for i, f in enumerate(data["features"]):
            f[feature_id] = i
    # Setup style.
    feature_style = {f[feature_id]: style(f) for f in data["features"]}
    return dl.GeoJSON(*args, data=data, featureStyle=feature_style, featureId=feature_id, **kwargs)


def geojson_style(data, style):
    # If an id is there, use it.
    if _validate_feature_ids(data):
        return {f["id"]: style(f) for f in data["features"]}
    # Otherwise, use the list index.
    return {i: style(f) for i, f in enumerate(data["features"])}


def _validate_feature_ids(data):
    ids = [f["id"] for f in data["features"] if "id" in f]
    return len(list(set(ids))) == len(data["features"])
