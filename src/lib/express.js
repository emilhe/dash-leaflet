require('./snippets.css')

// region Leaflet extensions

L.DivIcon.Scatter = L.DivIcon.extend({
    createIcon: function(oldIcon) {
           let icon = L.DivIcon.prototype.createIcon.call(this, oldIcon);
           icon.style.backgroundColor = this.options.color;
           return icon;
    }
})

L.divIcon.scatter = function(opts) {
    return new L.DivIcon.Scatter(opts);
}

// endregion

function resolve(primary, fallback, keys){
    const obj = {}
    for(let i = 0; i < keys.length; i++){
        obj[keys[i]] = primary[keys[i]]? primary[keys[i]] : fallback[keys[i]]
    }
    return obj
}

// region Color

const color_defaults = {min:0, max:1, colorscale:['yellow', 'red', 'black']}

function get_color_continuous(options, value){
    const {min, max, colorscale} = resolve(options, color_defaults, ["min", "max", "colorscale"])
    const csc = chroma.scale(colorscale).domain([min, max])
    return csc(value)
}

function get_color_discrete(options, value) {
    const {classes, colorscale} = resolve(options, color_defaults, ["classes", "colorscale"])
    let color = null;
    for (let i = 0; i < classes.length; ++i) {
        if (value > classes[i]) {
            color = colorscale[i]
        }
    }
    return color
}

function get_color(options, value){
    const {classes} = resolve(options, color_defaults, ["classes"])
    if(classes){
        return get_color_discrete(options, value)
    }
    return get_color_continuous(options, value)
}

// endregion


const scatter_defaults = {color_prop: "value", circle_options: {fillOpacity:1, stroke:false, radius:5}};
const choropleth_defaults = {color_prop: "value", style:{}}



window.dlx = Object.assign({}, window.dlx, {
    scatter: {

        point_to_layer: function(feature, latlng, context){
            const {circle_options, color_prop} = resolve(context.props.hideout, scatter_defaults,
                ["circle_options", "color_prop"])
            circle_options.fillColor = get_color(context.props.hideout, feature.properties[color_prop]);
            return L.circleMarker(latlng, circle_options);
        },

        cluster_to_layer: function (feature, latlng, index, context) {
            const {color_prop} = resolve(context.props.hideout, scatter_defaults, ["color_prop"])
            // Set color based on mean value of leaves.
            const leaves = index.getLeaves(feature.properties.cluster_id);
            let value_sum = 0;
            for (let i = 0; i < leaves.length; ++i) {
                value_sum += leaves[i].properties[color_prop]
            }
            const value_mean = value_sum / leaves.length;
            // Render a circle with the number of leaves written in the center.
            const icon = L.divIcon.scatter({
                html: '<div style="background-color:white;"><span>' + feature.properties.point_count_abbreviated + '</span></div>',
                className: "marker-cluster",
                iconSize: L.point(40, 40),
                color: get_color(context.props.hideout, value_mean)
            });
            return L.marker(latlng, {icon : icon})
        }

    },

    choropleth: {

        style: function (feature, context) {
            const {style, color_prop} = resolve(context.props.hideout, choropleth_defaults, 
                ["style", "color_prop"])
            style.fillColor = get_color(context.props.hideout, feature.properties[color_prop])
            return style
        }

    }
});