import React, { useEffect, useRef, useState } from 'react';
import { TileLayer as ReactLeafletTileLayer, useMap } from 'react-leaflet';
import { TileLayerProps, assignLoadEventHandlers, LoadComponent, Modify } from "../props";
import L from 'leaflet';

// https://github.com/Leaflet/Leaflet/pull/8613
L.GridLayer.include({
	redraw() {
		if (this._map) {
			this._removeAllTiles();
			const tileZoom = Math.round(this._clampZoom(this._map.getZoom()));
			if (tileZoom !== this._tileZoom) {
				this._tileZoom = tileZoom;
				this._updateLevels();
			}
			this._update();
		}
		return this;
	},
});

type Props = Modify<TileLayerProps, {
	/**
	 * The URL template in the form 'https://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'. [MUTABLE, DL]
	 */
	url?: string;
} & LoadComponent>;

/**
 * Used to load and display tile layers on the map. Note that most tile servers require attribution.
 */
const TileLayer = ({
	// Set default to OSM
	url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	...props
}: Props) => {
	return (
        <ReactLeafletTileLayer url={url} {...assignLoadEventHandlers(props)}></ReactLeafletTileLayer>
    )
}

export default TileLayer;
