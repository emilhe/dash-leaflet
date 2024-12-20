import React from 'react';
import { createLayerComponent } from '@react-leaflet/core';
import L from 'leaflet';
import { assignClickEventHandlers, ClickComponent, MarkerProps, Modify } from "../props";

interface ImageItem {
    /**
     * Original image URL for full view
     */
    original: string;

    /**
     * Thumbnail image URL (optional, defaults to original)
     */
    thumbnail?: string;

    /**
     * Original image height
     */
    originalHeight?: number;

    /**
     * Original image width
     */
    originalWidth?: number;

    /**
     * Optional description for the image
     */
    description?: string;
}

type Props = Modify<Omit<MarkerProps, "icon">, {
    /**
     * Array of image items to display in the gallery
     */
    images: ImageItem[];

    /**
     * Width of the marker thumbnail in pixels.
     */
    width?: number;

    /**
     * Height of the marker thumbnail in pixels.
     */
    height?: number;

    /**
     * Object with keys specifying the event type and values containing the corresponding event handlers.
     */
    eventHandlers?: object;

    /**
     * If set to true, default events handlers are not registered.
     */
    disableDefaultEventHandlers?: boolean;

    /**
     * Map pane where the marker icon will be added.
     */
    pane?: string;

    /**
     * The geographical location of the marker.
     */
    position: L.LatLngExpression;

    /**
     * Optional ID for the gallery component
     */
    galleryId?: string;

    /**
     * Callback for when marker is clicked
     */
    setProps?: (props: Record<string, any>) => void;

    /**
     * Number of clicks on the marker
     */
    n_clicks?: number;
} & ClickComponent>;

interface CustomDivIconOptions extends L.DivIconOptions {
    images?: ImageItem[];
    width?: number;
    height?: number;
    galleryId?: string;
    onClick?: () => void;
}

class CustomDivIcon extends L.DivIcon {
    declare options: CustomDivIconOptions;

    constructor(options: CustomDivIconOptions) {
        super(options);
    }

    createIcon(oldIcon: HTMLElement): HTMLElement {
        const containerDiv = document.createElement('div');
        containerDiv.className = 'leaflet-marker-photo-container';
        containerDiv.style.position = 'relative';
        containerDiv.style.width = `${this.options.width || 40}px`;
        containerDiv.style.height = `${this.options.height || 40}px`;
        containerDiv.style.cursor = 'pointer';

        const img = document.createElement('img');
        if (this.options.images?.[0]?.thumbnail || this.options.images?.[0]?.original) {
            img.src = this.options.images[0].thumbnail || this.options.images[0].original;
        }
        img.className = 'leaflet-marker-photo';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.border = '2px solid white';
        img.style.boxShadow = '3px 3px 10px rgba(0,0,0,0.2)';
        img.style.backgroundColor = 'white';
        img.style.padding = '2px';
        img.style.position = 'absolute';
        img.style.left = '50%';
        img.style.top = '50%';
        img.style.transform = 'translate(-50%, -50%)';
        img.style.transition = 'transform 0.2s ease-in-out';

        containerDiv.appendChild(img);

        if (this.options.images && this.options.images.length > 1) {
            const badge = document.createElement('div');
            badge.className = 'leaflet-marker-photo-badge';
            badge.style.position = 'absolute';
            badge.style.top = '-8px';
            badge.style.right = '-8px';
            badge.style.backgroundColor = '#3182ce';
            badge.style.color = 'white';
            badge.style.borderRadius = '50%';
            badge.style.padding = '2px 6px';
            badge.style.fontSize = '12px';
            badge.style.fontWeight = 'bold';
            badge.style.boxShadow = '0 0 0 2px white';
            badge.style.zIndex = '1000';
            badge.textContent = String(this.options.images.length);
            containerDiv.appendChild(badge);
        }

        // Add hover effect
        containerDiv.addEventListener('mouseenter', () => {
            img.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        containerDiv.addEventListener('mouseleave', () => {
            img.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Add click listener
        containerDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.options.onClick) {
                this.options.onClick();
            }
        });

        return containerDiv;
    }
}

/**
 * A customized marker component that displays multiple images with gallery support.
 * Shows the first image as thumbnail and opens a full gallery view on click.
 */
const ImageMarker = createLayerComponent<L.Marker, Props>(
    function createLeafletElement(props, context) {
        const { position, images, width, height, galleryId, setProps, n_clicks = 0, ...otherProps } = props;
        const nProps = assignClickEventHandlers(otherProps);

        const handleClick = () => {
            if (setProps) {
                setProps({ n_clicks: (n_clicks || 0) + 1 });
            }
        };

        const iconOptions: CustomDivIconOptions = {
            images,
            width: width || 60,
            height: height || 60,
            galleryId,
            className: 'custom-image-marker',
            iconSize: [width || 60, height || 60],
            iconAnchor: [(width || 60) / 2, (height || 60) / 2],
            popupAnchor: [0, -(height || 60) / 2],
            onClick: handleClick
        };

        const icon = new CustomDivIcon(iconOptions);

        const marker = new L.Marker(position, {
            ...nProps,
            icon
        });

        return {
            instance: marker,
            context: { ...context }
        };
    },
    function updateLeafletElement(instance, props, prevProps) {
        if (props.position !== prevProps.position) {
            instance.setLatLng(props.position);
        }
        if (props.images !== prevProps.images ||
            props.width !== prevProps.width ||
            props.height !== prevProps.height) {
            const iconOptions: CustomDivIconOptions = {
                images: props.images,
                width: props.width || 60,
                height: props.height || 60,
                galleryId: props.galleryId,
                className: 'custom-image-marker',
                iconSize: [props.width || 60, props.height || 60],
                iconAnchor: [(props.width || 60) / 2, (props.height || 60) / 2],
                popupAnchor: [0, -(props.height || 60) / 2],
                onClick: () => props.setProps?.({ n_clicks: (props.n_clicks || 0) + 1 })
            };
            const icon = new CustomDivIcon(iconOptions);
            instance.setIcon(icon);
        }
    }
);

export default ImageMarker;