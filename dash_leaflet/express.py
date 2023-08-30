import logging

import dash_leaflet as dl
import base64


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


def geojson_to_geobuf(geojson):
    help_txt = "e.g. via pip by running 'pip install dash-leaflet[geobuf]' or 'pip install dash-leaflet[all]'."
    try:
        import geobuf
        import google.protobuf
    except ImportError as ex:
        logging.error(f"Unable to import [geobuf/protobuf]. Please install it, {help_txt}")
        raise ex
    if google.protobuf.__version__ != "3.20.0":
        logging.warning(f"The recommended protobuf version is 3.20.0 (you have {google.protobuf.__version__}). You can fix it {help_txt}")

    return base64.b64encode(geobuf.encode(geojson)).decode()
