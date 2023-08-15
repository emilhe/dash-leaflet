import dash_leaflet as dl


def categorical_colorbar(*args, categories, colorscale, **kwargs):
    indices = list(range(len(categories) + 1))
    return dl.Colorbar(*args, min=0, max=len(categories), classes=indices, colorscale=colorscale, tooltip=False,
                       tickValues=[item + 0.5 for item in indices[:-1]], tickText=categories, **kwargs)


def dicts_to_geojson(dicts, lat="lat", lon="lon"):
    geojson = {"type": "FeatureCollection", "features": []}
    for d in dicts:
        feature = {"type": "Feature", "geometry": {"type": "Point", "coordinates": [d[lon], d[lat]]}}
        props = [key for key in d.keys() if key not in [lat, lon]]
        if props:
            feature["properties"] = {prop: d[prop] for prop in props}
        geojson["features"].append(feature)
    return geojson
