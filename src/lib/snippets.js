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