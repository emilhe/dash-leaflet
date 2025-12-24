# VectorTileLayer Improvements

## Summary

This document outlines the improvements made to the VectorTileLayer component implementation.

## What Was Changed

### 1. Fixed Props Passing Bug
**Issue:** The component was passing the original `props` instead of the modified `nProps` to the lazy-loaded component, which meant event handlers weren't being properly applied.

**Fix:** Changed line 26 in `VectorTileLayer.tsx` from `{...props}` to `{...nProps}`.

### 2. Added Default Event Handlers
**Issue:** The component had TODO comments indicating missing event handlers. It didn't provide any default interactivity like other components (e.g., GeoJSON).

**Fix:** Implemented default event handlers for:
- `click` - Sets `n_clicks` and `clickData` props
- `dblclick` - Sets `n_dblclicks` and `dblclickData` props
- `mouseover` - Sets `hoverData` prop
- `mouseout` - Clears `hoverData` prop

These handlers extract feature data including:
- Geographic coordinates (`latlng`)
- Layer coordinates (`layerPoint`, `containerPoint`)
- Feature properties (if available)
- Layer name (if available)

### 3. Added ClickComponent Interface
**Issue:** The component didn't include the ClickComponent interface, which provides standardized click/hover props.

**Fix:** Modified the Props type to include ClickComponent, enabling `n_clicks`, `clickData`, `hoverData`, etc.

### 4. Improved Documentation
**Issue:** Documentation was minimal and contained TODOs.

**Changes:**
- Added comprehensive JSDoc comments to the main component
- Improved documentation for all VectorTileLayerOptions properties
- Added `[MUTABLE, DL]` tags for Dash property generation
- Explained the differences between `minDetailZoom`/`maxDetailZoom` and native zoom options
- Added examples in documentation comments
- Removed all TODO comments

### 5. Code Cleanup
**Issue:** Unused imports and commented-out code.

**Fix:**
- Removed unused imports (`omit`, `pick`, `GridLayer`)
- Removed commented-out imports
- Removed TODO comments after addressing them
- Cleaned up code formatting

### 6. Created Comprehensive Examples
**Created:**
- `examples/vector_tile_layer_example.py` - Full-featured example with:
  - Dynamic styling using style functions
  - Simple styling using vectorTileLayerStyles
  - Interactive click and hover displays
  - Feature filtering
  - Layer ordering
  - Extensive comments explaining all options

- Improved `tmp_pbf.py` with better comments and styling examples

## Library Choice Justification

After research, we confirmed that **`leaflet-vector-tile-layer`** is the right choice over alternatives:

### vs. Leaflet.VectorGrid
**Advantages of leaflet-vector-tile-layer:**
- **Better styling flexibility** - Supports dynamic `setStyle()` method and style functions
- **Better zoom handling** - `minDetailZoom`/`maxDetailZoom` maintain consistent stroke weight, while VectorGrid scales tiles
- **Future-proof** - Built using Leaflet's public API, more likely to work with future Leaflet versions
- **Full DOM control** - `featureToLayer` option provides complete control over SVG DOM
- **getBounds() support** - Can get bounds of all loaded features

### vs. MapLibre GL
**Why not MapLibre:**
- Different paradigm (WebGL vs SVG)
- More complex integration
- May be overkill for many use cases
- leaflet-vector-tile-layer is sufficient for most Dash applications

## TypeScript Type Improvements

The component now properly exports:
- `VectorTileLayerOptions` - All vector tile specific options
- `VectorTileLayerProps` - Complete props including TileLayer props
- Proper typing for DashFunction parameters

## Breaking Changes

**None.** All changes are backward compatible. The component will work exactly as before if no interactive props are used.

## Migration Notes

For users of the old implementation:
1. No changes required - existing code will work as-is
2. To use new interactive features, add callbacks for `clickData`, `hoverData`, etc.
3. Can now use `disableDefaultEventHandlers=True` to disable new event handlers if needed

## Testing Recommendations

1. **Basic functionality**: Run `tmp_pbf.py` to verify tiles load and display correctly
2. **Interactive features**: Run `examples/vector_tile_layer_example.py` to test click/hover
3. **Styling**: Test both `style` function and `vectorTileLayerStyles` approaches
4. **Filtering**: Test `filter` function with different zoom levels
5. **Build**: Ensure TypeScript compilation succeeds

## References

- [leaflet-vector-tile-layer on npm](https://www.npmjs.com/package/leaflet-vector-tile-layer)
- [Leaflet.VectorGrid comparison](https://github.com/michelalfonso9/Leaflet.VectorTileLayer-)
- [MapTiler Leaflet Vector Tiles Guide](https://docs.maptiler.com/leaflet/examples/vector-tiles-in-leaflet-js/)
