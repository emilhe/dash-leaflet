import React, { useEffect, useRef, useState } from 'react';
import { TileLayer as ReactLeafletTileLayer, useMap } from 'react-leaflet';
import { TileLayerProps, assignLoadEventHandlers, LoadComponent, Modify } from "../props";
import L from 'leaflet';

// Override redraw method in L.GridLayer to round Zoom levels
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

// Use the extended L.GridLayer
class CustomTileLayer extends L.TileLayer {
	redraw(): this {
		(L.GridLayer.prototype as any).redraw.call(this);
		return this;
	}
}

const createCustomTileLayer = (url: string, props: L.TileLayerOptions) => {
	return new CustomTileLayer(url, props);
}

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
	const tileLayerRef = useRef<CustomTileLayer | null>(null);
	const map = useMap();

	// Use state to track when redraw is necessary
	const [redrawNeeded, setRedrawNeeded] = useState(false);

	useEffect(() => {
		if (redrawNeeded && tileLayerRef.current) {
			tileLayerRef.current.redraw();
			setRedrawNeeded(false); // Reset the redraw flag
		}
	}, [redrawNeeded]);

	useEffect(() => {
		setRedrawNeeded(true);
	}, [url, props.attribution]);

	return (
		<ReactLeafletTileLayer
			url={url}
			{...assignLoadEventHandlers(props)}
			ref={(instance) => {
				if (instance) {
					tileLayerRef.current = createCustomTileLayer(url, props);
					map.addLayer(tileLayerRef.current);
				} else {
					if (tileLayerRef.current) {
						map.removeLayer(tileLayerRef.current);
					}
					tileLayerRef.current = null;
				}
			}}
		/>
	);
};

export default TileLayer;
