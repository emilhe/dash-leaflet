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

const scatter_defaults = {min:0, max:1, colorscale:['yellow', 'red', 'black'], color_prop:"value",
    circle_options: {fillOpacity:1, stroke:false, radius:5}};

const choropleth_defaults = {marks:[0, 100, 1000], colorscale:['red', 'green', 'blue'], color_prop:"value", style:{}}

function get_color(options, value){
    const csc = chroma.scale(options.colorscale).domain([options.min, options.max])
    return csc(value)
}

window.dlx = Object.assign({}, window.dlx, {
    scatter: {

        point_to_layer: function(feature, latlng, context){
            const options = Object.assign({}, scatter_defaults, context.props.hideout);
            const {circle_options} = options;
            circle_options.fillColor = get_color(options, feature.properties[options.color_prop]);
            return L.circleMarker(latlng, circle_options);
        },

        cluster_to_layer: function (feature, latlng, index, context) {
            const options = Object.assign({}, scatter_defaults, context.props.hideout);
            // Set color based on mean value of leaves.
            const leaves = index.getLeaves(feature.properties.cluster_id);
            let value_sum = 0;
            for (let i = 0; i < leaves.length; ++i) {
                value_sum += leaves[i].properties[options.color_prop]
            }
            const value_mean = value_sum / leaves.length;
            // Render a circle with the number of leaves written in the center.
            const icon = L.divIcon.scatter({
                html: '<div style="background-color:white;"><span>' + feature.properties.point_count_abbreviated + '</span></div>',
                className: "marker-cluster",
                iconSize: L.point(40, 40),
                color: get_color(options, value_mean)
            });
            return L.marker(latlng, {icon : icon})
        }

    },

    choropleth: {

        discrete: function (feature, context) {
            const options = Object.assign({}, choropleth_defaults, context.props.hideout);
            const {style, marks, colorscale, color_prop} = options
            let color = null;
            for (let i = 0; i < marks.length; ++i) {
                if (feature.properties[color_prop] > marks[i]) {
                    color = colorscale[i]
                }
            }
            style.fillColor = color
            return style
        }

    }
});