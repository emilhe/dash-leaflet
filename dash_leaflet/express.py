import json
import dash_leaflet as dl


# Utils methods

def categorical_colorbar(*args, categories, colorscale, **kwargs):
    indices = list(range(len(categories) + 1))
    return dl.Colorbar(*args, min=0, max=len(categories), classes=indices, colorscale=colorscale, tooltip=False,
                       tickValues=[item + 0.5 for item in indices[:-1]], tickText=categories, **kwargs)


def geojson(data, *args, style, **kwargs):
    featureOptions = {f["id"]: dict(style=style(f)) for f in data["features"]}
    return dl.GeoJSON(*args, data=data, featureOptions=featureOptions, **kwargs)


# Data samples.

def us_states_population_density():
    with open("us-states.json", 'r') as f:
        data = json.load(f)
    return data
