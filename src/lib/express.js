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
        obj[keys[i]] = (primary && primary[keys[i]])? primary[keys[i]] : fallback[keys[i]]
    }
    return obj
}

// region Color

const colorDefaults = {min:0, max:1, colorscale:['yellow', 'red', 'black']}

function getColorContinuous(options, value){
    const {min, max, colorscale} = resolve(options, colorDefaults, ["min", "max", "colorscale"])
    const csc = chroma.scale(colorscale).domain([min, max])
    return csc(value)
}

function getColorDiscrete(options, value) {
    const {classes, colorscale} = resolve(options, colorDefaults, ["classes", "colorscale"])
    let color = null;
    for (let i = 0; i < classes.length; ++i) {
        if (value > classes[i]) {
            color = colorscale[i]
        }
    }
    return color
}

function getColor(options, value){
    const {classes} = resolve(options, colorDefaults, ["classes"])
    if(classes){
        return getColorDiscrete(options, value)
    }
    return getColorContinuous(options, value)
}

// endregion


const scatterDefaults = {colorProp: "value", circleOptions: {fillOpacity:1, stroke:false, radius:5}};
const choroplethDefaults = {colorProp: "value", style:{}}



window.dlx = Object.assign({}, window.dlx, {
    scatter: {

        pointToLayer: function(feature, latlng, context){
            const {circleOptions, colorProp} = resolve(context.props.hideout, scatterDefaults,
                ["circleOptions", "colorProp"])
            circleOptions.fillColor = getColor(context.props.hideout, feature.properties[colorProp]);
            return L.circleMarker(latlng, circleOptions);
        },

        clusterToLayer: function (feature, latlng, index, context) {
            const {colorProp} = resolve(context.props.hideout, scatterDefaults, ["colorProp"])
            // Set color based on mean value of leaves.
            const leaves = index.getLeaves(feature.properties.cluster_id);
            let valueSum = 0;
            for (let i = 0; i < leaves.length; ++i) {
                valueSum += leaves[i].properties[colorProp]
            }
            const valueMean = valueSum / leaves.length;
            // Render a circle with the number of leaves written in the center.
            const icon = L.divIcon.scatter({
                html: '<div style="background-color:white;"><span>' + feature.properties.point_count_abbreviated + '</span></div>',
                className: "marker-cluster",
                iconSize: L.point(40, 40),
                color: getColor(context.props.hideout, valueMean)
            });
            return L.marker(latlng, {icon : icon})
        }

    },

    choropleth: {

        style: function (feature, context) {
            const {style, colorProp} = resolve(context.props.hideout, choroplethDefaults,
                ["style", "colorProp"])
            style.fillColor = getColor(context.props.hideout, feature.properties[colorProp])
            return style
        }

    }
});