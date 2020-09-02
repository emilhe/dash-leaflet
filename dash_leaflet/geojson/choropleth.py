marks = [0, 100, 1000]  # <kwarg>
colorscale = ['red', 'green', 'blue']  # <kwarg>
color_prop = "value"  # <kwarg>
style = {}  # <kwarg>


def discrete(feature, context):
    color = None
    for i, item in enumerate(marks):
        if feature["properties"][color_prop] > item:
            color = colorscale[i]
    style["fillColor"] = color
    return style
