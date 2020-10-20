# Changelog

All notable changes to this project will be documented in this file.

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