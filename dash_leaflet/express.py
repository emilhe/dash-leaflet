import json
import geobuf
import dash_leaflet as dl
import base64


def categorical_colorbar(*args, categories, colorscale, **kwargs):
    indices = list(range(len(categories) + 1))
    return dl.Colorbar(*args, min=0, max=len(categories), classes=indices, colorscale=colorscale, tooltip=False,
                       tickValues=[item + 0.5 for item in indices[:-1]], tickText=categories, **kwargs)


def markers_to_geojson(markers):
    geojson = {"type": "FeatureCollection", "features": []}
    for marker in markers:
        feature = {"type": "Feature", "geometry": {"type": "Point", "coordinates": [marker["lon"], marker["lat"]]}}
        props = [key for key in marker.keys() if key not in ["lat", "lon"]]
        if props:
            feature["properties"] = {prop: marker[prop] for prop in props}
        geojson["features"].append(feature)
    return geojson


def geojson_to_geobuf(geojson):
    return base64.b64encode(geobuf.encode(geojson)).decode()
