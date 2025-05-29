# Changelog

All notable changes to this project will be documented in this file.

## [1.1.4] - UNRELEASED

### Changed

- Fix issue with the `action` property of the `EditControl` not firering [#265](https://github.com/emilhe/dash-leaflet/pull/265), thereby resolving [#264](https://github.com/emilhe/dash-leaflet/issues/264)
- Fix spiderfy function not working in some cases [#267](https://github.com/emilhe/dash-leaflet/pull/267), thereby resolving [#266](https://github.com/emilhe/dash-leaflet/issues/266)

## [1.1.3] - 15-05-25

### Changed

- Relax (minimum) Python version requirement from `3.12` to `3.11`

## [1.1.2] - 12-05-25

### Changed

- Update `geobuf` / `protobuf` dependency version pins

## [1.1.1] - 05-04-25

### Changed

- Update dependency to Dash 3.0.0
- Fix issue with `TileLayer` component on non-integer zoom update [#236](https://github.com/emilhe/dash-leaflet/issues/236)
- Fix issue with extra Dash props making it into `WMSTileLayer` component [#225](https://github.com/emilhe/dash-leaflet/issues/225)
- Update build system to use uv

## [1.0.15] - 11-01-24

### Changed

- Propagate pane information to `GeoJSON` object, thereby fixing [#221](https://github.com/emilhe/dash-leaflet/issues/221)

## [1.0.13] - 27-12-23

### Changed

- Viewport tracking logic changed to use delta updates, which combined with a delay fixes [#211](https://github.com/emilhe/dash-leaflet/issues/211)
- Re-enable the ability to set `zoom`/`center` props (due to many user requests)

## [1.0.12] - 05-11-23

### Changed

- Bugfix in `GeoJSON` component correcting wrong behavior when changing clustered data dynamically
- Correct `GeoJSON` component data type definition (remove string as allowed type)

## [1.0.11] - 07-10-23

### Added

- Publishing to npm added to CICD pipeline

## [1.0.10] - 2023-09-29

### Changed

- Extend `viewport` property to support `bounds` manipulation

## [1.0.9] - 2023-09-25

### Added

- Add `viewport` property for the `Map` component to enable easy manipulation of the viewport (i.e. zoom/center)

## [1.0.8] - 2023-08-30

### Added

- Add support for `flatgeobuf` file format, including bounding box filtering
- Add extra optional options (`svg`, `geobuf`, `all`)

### Changed

- Restored support for `geobuf` file format

## [1.0.7] - 2023-08-27

### Changed

- When clustering is enabled, the `GeoJSON` component now performs _delta_ updates, i.e. features that remain within the viewport are no longer redraw on pan/zoom. Fixes [#180](https://github.com/thedirtyfew/dash-leaflet/issues/180)
- The map viewport is now tracked (through the `zoom`, `center`, and `bounds` properties) unless `trackViewport` it set to `False`. Fixes [#194](https://github.com/thedirtyfew/dash-leaflet/issues/194)

## [1.0.4] - 2023-08-26

### Added

- Add option to specify custom units in the `MeasureControl`. Fixes [#130](https://github.com/thedirtyfew/dash-leaflet/issues/130)
- Add `invalidateSize` option to the map component. Fixes [#73](https://github.com/thedirtyfew/dash-leaflet/issues/73)

### Changed

- The `GeoJSON` component now supports single features (in addition to feature collections). Fixes [#160](https://github.com/thedirtyfew/dash-leaflet/issues/160)

## [1.0.0] - 2023-08-25

### Added

- New event handling system, allowing much greater flexibility
- Basic unit tests for all components (rendering or better)
- Added (separate) `Attribution` component

### Changed

- Library completely rewritten in TypeScript based on React Leaflet v4
- Dependencies updated (incl. React version bump), npm now reports _0 vulnerabilities_
- Various fixes, incl. but not limited to [#193](https://github.com/thedirtyfew/dash-leaflet/issues/193), [#192](https://github.com/thedirtyfew/dash-leaflet/issues/192), [#189](https://github.com/thedirtyfew/dash-leaflet/issues/189), [#184](https://github.com/thedirtyfew/dash-leaflet/issues/184), [#178](https://github.com/thedirtyfew/dash-leaflet/issues/178)
- The `GeoJSON` component is now loaded async, bringing the main asset < 300 kB

### Removed

- Dropped `Minichart` component. The underlying library is not maintained, and the current version in incompatible with newer versions of Leaflet
- Dropped `MarkerClusterGroup` component due to performance issues. Please use the `GeoJSON` instead
- Dropped `GeoTIFFOverlay` component. This (highly custom) component has long been deprecated, and I decided now was the time to drop it completely

## [0.1.28] - 2023-06-27

### Added

- Added leaflet source maps

### Changed

- Modified ImageOverlay `loaded` property to include more information

## [0.1.26] - 2023-06-19

### Changed

- Added ImageOverlay `loaded` property, which is set to `true` when the image has finished loading

## [0.1.25] - 2022-07-20

### Changed

- Leaflet and react-leaflet are now [bundled with dash-leaflet](https://github.com/thedirtyfew/dash-leaflet/pull/146). This structure enables **development of plugins as external packages**.
- Various dependency updates.

## [0.1.23] - 2021-08-11

### Changed

- Changed loading of js chunks so that a chunk is only loaded when actually needed.

## [0.1.22] - 2021-08-11

### Added

- Added [`Minichart component`](https://github.com/thedirtyfew/dash-leaflet/pull/116).

### Changed

- The following components are now loaded async: `EditControl`, `GeoTIFFOverlay`, `LocateControl`, `MeasureControl`, `MarkerClusterGroup`. As a result, the main bundle size has been reduced to about half (< 500 kB).
- Update to Dash 2.0.
- Prop validation of `GeoJSON` component `hideout` prop relaxed.
- Prop validation of `Polygon` component `positions` prop relaxed.

## [0.1.18] - 2021-02-09

### Added

- Added `drawToolbar` and `editToolbar` props to `EditControl` component.

### Changed

- Polygons collected into the `geojson` prop of the `EditControl` component are now closed.

## [0.1.16] - 2021-07-07

### Added

- Added `EditControl` component.
- Added `GestureHandling` component.
- Fixing [issue](https://github.com/thedirtyfew/dash-leaflet/issues/95)
- Fixing [issue](https://github.com/thedirtyfew/dash-leaflet/issues/96)

## [0.1.15] - 2020-17-06

### Added

- New `FeatureGroup` component.

### Changed

- Fixed bug in `GeoJSON` component arising when all features are filtered out and `zoomToBounds=True`.

### Removed

- Dropped bundled js functions (previously located in `express.js`).

## [0.1.14] - 2020-17-06

### Added

- Added `extraProps` prop to `WMSTileLayer` component as per [request](https://github.com/thedirtyfew/dash-leaflet/issues/90).

## [0.1.13] - 2020-13-01

### Added

- Added `layers` prop to `LayersControl` component.
- Added `FullscreenControl` as per [request](https://github.com/thedirtyfew/dash-leaflet/issues/67).

## [0.1.12] - 2020-12-12

### Changed

- Regression (bounds passed from Dash not applied) due to fix in 0.1.11 [fixed](https://github.com/thedirtyfew/dash-leaflet/issues/62)

## [0.1.11] - 2020-04-12

### Changed

- New attempt at fixing a [bug](https://github.com/thedirtyfew/dash-leaflet/issues/56) typically seen with multiple maps in multiple tabs.

## [0.1.10] - 2020-27-11

### Changed

- Breaking syntax changes in functional properties.

## [0.1.8] - 2020-20-11

### Changed

- Fixed a [bug](https://github.com/thedirtyfew/dash-leaflet/issues/56) typically seen with multiple maps in multiple tabs.

## [0.1.7] - 2020-14-11

### Added

- Added [MeasureControl](https://github.com/thedirtyfew/dash-leaflet/pull/50).

## [0.1.5] - 2020-20-10

### Added

- Added EasyButton component.
- Added tracking of map bounds.

## [0.1.4] - 2020-23-09

### Added

- The LayersControl has (finally) been added.

### Changed

- Minor changes to GeoJSON standard functions adding support for discrete/continuous color scales for both scatter and choropleth

## [0.1.3] - 2020-17-09

### Added

- The map now supports [different CRS](https://github.com/thedirtyfew/dash-leaflet/issues/31).
- The GeoJSON component now [supports custom panes](https://github.com/thedirtyfew/dash-leaflet/issues/38).
- The GeoJSON now supports [changing style dynamically](https://github.com/thedirtyfew/dash-leaflet/issues/42).

## [0.1.1] - 2020-04-09

### Changed

- The MarkerClusterGroup is again included for backwards compatibility
- Per default, the GeoJSON now renders tooltip/popup if a `tooltip`/`popup` property is available on the feature
- The GeoJSON example functions (scatter, choropleth) have been moved from Python to JavaScript thus eliminating the dash-transcrypt dependency

## [0.1.0] - 2020-03-09

### Added

- New geojson subpackage. It contains modules with examples of python function definitions to ease the transition to functional props

### Changed

- The GeoJSON has been completely rewritten to support a wider range of use cases. It now uses functional props

### Removed

- The SuperCluster component has been removed. The GeoJSON component now handles marker clustering

## [0.0.22] - 2020-30-07

### Changed

- Supercluster: spiderfy bug fixed, added automatic maxZoom detection

## [0.0.21] - 2020-24-07

### Added

- Added Supercluter component.

## [0.0.20] - 2020-09-07

### Added

- Added tracking of map zoom and center.
- Added tracking marker position.
- Added build instructions to readme.

## [0.0.19] - 2020-09-07

### Added

- Added some build automation (github actions).

## [0.0.18] - 2020-22-06

### Changed

- Fix of bug in Polygon prop validation.
- Added DivMarker component.

## [0.0.17] - 2020-19-05

### Changed

- Pane component bug fixed.
- Verification of scrollWheelZoom type corrected.

## [0.0.16] - 2020-20-05

### Added

- Pane component added.

## [0.0.15] - 2020-19-05

### Changed

- PolylineDecorator component properties "positions" and "children" changed to dynamic.

## [0.0.14] - 2020-17-05

### Added

- PolylineDecorator component added.

## [0.0.13] - 2020-11-05

### Changed

- Options property added to MarkerClusterGroup.

## [0.0.12] - 2020-11-05

### Changed

- Property added to GeoJSON object (n_click).
- Link added to heroku documentation.

## [0.0.11] - 2020-11-05

### Changed

- GeoJSON object added.

## [0.0.10] - 2020-06-05

### Changed

- Support of multiple urls for VideoOverlay

## [0.0.9] - 2020-28-04

### Added

- ScaleControl object added.

## [0.0.8] - 2020-22-04

### Changed

- Property added to Map to signal location change (location_lat_lon_acc)
- CircleMarker changed to use n_clicks like Marker
- New options added to LocateControl

## [0.0.7] - 2020-17-04

### Added

- LocationControl object added.

## [0.0.6] - 2020-16-04

### Added

- MarkerClusterGroup object added.

## [0.0.5] - 2020-11-04

### Changed

- Click event for Marker object change from yielding (lat, lon) to n_clicks to ensure that the event fires on each click.

## [0.0.4] - 2020-10-04

### Added

- Click event for Marker object added.
