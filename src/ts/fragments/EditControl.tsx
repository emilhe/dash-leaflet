import React from 'react';
import { EditControl as ReactLeafletEditControl } from '../react-leaflet/EditControl';
import { EditControlProps } from 'react-leaflet-draw';

require('../../../node_modules/leaflet-draw/dist/leaflet.draw.css');

/**
 * Lazy loader.
 */
const EditControl = (props: EditControlProps) => {
    return (
        <ReactLeafletEditControl {...props}></ReactLeafletEditControl>
    )
}

export default EditControl;