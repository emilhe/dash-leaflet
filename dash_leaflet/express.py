import json
import dash_leaflet as dl


# Utils methods

def categorical_colorbar(*args, categories, colorscale, **kwargs):
    indices = list(range(len(categories) + 1))
    return dl.Colorbar(*args, min=0, max=len(categories), classes=indices, colorscale=colorscale, tooltip=False,
                       tickValues=[item + 0.5 for item in indices[:-1]], tickText=categories, **kwargs)


def geojson(data, *args, style, **kwargs):
    feature_id = "id"
    # Check if id is present and unique.
    ids = [f["id"] for f in data["features"] if hasattr(f, "id")]
    id_valid = len(list(set(ids))) == len(data["features"])
    if not id_valid:
        feature_id = "leaflet_id" if len(ids) > 0 else "id"
        for i, f in enumerate(data["features"]):
            f[feature_id] = i
    # Setup options (for now assumed to be style only).
    featureOptions = {f["id"]: dict(style=style(f)) for f in data["features"]}
    return dl.GeoJSON(*args, data=data, featureOptions=featureOptions, featureId=feature_id, **kwargs)


# Data samples.

def us_states_population_density():
    with open("us-states.json", 'r') as f:
        data = json.load(f)
    return data
