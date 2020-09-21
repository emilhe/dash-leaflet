import geobuf
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
    return base64.b64encode(geobuf.encode(geojson)).decode()


# region Function properties

class _PropFuncNamespace:

    def _prop_func(self, prop):
        return f"window.dlx.{self.__class__.__name__[1:].lower()}.{prop}"


class _Scatter(_PropFuncNamespace):

    def __init__(self):
        self.point_to_layer = self._prop_func("point_to_layer")
        self.cluster_to_layer = self._prop_func("cluster_to_layer")


class _Choropleth(_PropFuncNamespace):

    def __init__(self):
        self.style = self._prop_func("style")


scatter = _Scatter()
choropleth = _Choropleth()

# endregion
