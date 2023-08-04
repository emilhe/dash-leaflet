* Note that "interactive" flag doesn't work on "Popup"
* WHAT ABOUT RENDERER ARG?
* ADD PATH BEHAVIOR? OR NOT? OR MAGIC?

* Compare current components to dash-leaflet

* WHAT ABOUT EVENTS? N_CLICKS? OR?
- Maybe SKIP default events for popup/tooltip? They are NOT there in dash-leaflet v1

STILL MISSING FROM REACT LEAFLET

* GeoJSON

OTHER COMPONENTS

* DivMarker?
* EasyButton
* FullScreenControl
* GestureHandling 

* EditControl [async]
* LocateControl [async]
* MeasureControl [async]
* Minichart [async]

NOT CARRIED FORWARD (at least not for now)

* ColorBar (MAYBE?)
* GeoTIFFOverlay [async]
* MarkerClusterGroup [async]

TEST TODO:

* After making map, REMOVE controls by default, ADD them in tests and check that they are there

OLD TODO:

TODO:

* Add a legend control (see https://ipyleaflet.readthedocs.io/en/latest/api_reference/search_control.html#example for inspiration)
* Add a geosearch control (see e.g. https://github.com/smeijer/leaflet-geosearch)
* Add unit tests
* Rewrite in TypeScript
* Add TimeDimension control and objects (see https://github.com/socib/Leaflet.TimeDimension)
