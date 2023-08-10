import React from 'react';
import { EditControl as ReactLeafletEditControl, EditControlProps } from 'react-leaflet-draw';

require('../../../node_modules/leaflet-draw/dist/leaflet.draw.css');

/**
 * EditControl is based on https://github.com/alex3165/react-leaflet-draw/
 */
const EditControl = (props: EditControlProps) => {
    return (
        <ReactLeafletEditControl {...props}></ReactLeafletEditControl>
    )
}

export default EditControl;