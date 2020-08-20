def hest(feature, latlng):
    icon = L.icon(iconUrl="https://leafletjs.com/examples/custom-icons/leaf-green.png")
    return L.marker(latlng, dict(icon=icon))