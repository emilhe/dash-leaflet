def hest(feature, latlng):
    icon = L.icon(iconUrl='https://leafletjs.com/examples/custom-icons/leaf-green.png',
                  shadowUrl='https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
                  iconSize=[38, 95],
                  shadowSize=[50, 64],
                  iconAnchor=[22, 94],
                  shadowAnchor=[4, 62],
                  popupAnchor=[-3, -76])
    return L.marker(latlng, dict(icon=icon))
