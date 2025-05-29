// src/components/StreetLabels/StreetLabelContext.tsx (Alternative)
import React, { createContext, useCallback, useMemo, useRef, useReducer } from 'react';
import L from 'leaflet';
import { LabelStyle } from './TextPathRenderer';
import { CanvasTextLayer } from './CanvasTextLayer';

export interface PolylineData {
  id: string;
  positions: L.LatLngExpression[];
  label: string;
  labelStyle?: LabelStyle;
}

interface StreetLabelContextType {
  registerPolyline: (data: PolylineData) => void;
  unregisterPolyline: (id: string) => void;
}

interface State {
  polylines: PolylineData[];
  version: number;
}

type Action =
  | { type: 'REGISTER'; payload: PolylineData }
  | { type: 'UNREGISTER'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'REGISTER': {
      const existing = state.polylines.findIndex(p => p.id === action.payload.id);
      if (existing >= 0) {
        // Update existing
        const newPolylines = [...state.polylines];
        newPolylines[existing] = action.payload;
        return { polylines: newPolylines, version: state.version + 1 };
      }
      // Add new
      return {
        polylines: [...state.polylines, action.payload],
        version: state.version + 1
      };
    }
    case 'UNREGISTER': {
      const filtered = state.polylines.filter(p => p.id !== action.payload);
      if (filtered.length === state.polylines.length) {
        return state; // No change
      }
      return { polylines: filtered, version: state.version + 1 };
    }
    default:
      return state;
  }
}

export const StreetLabelContext = createContext<StreetLabelContextType | null>(null);

export const StreetLabelProvider: React.FC<{
  children: React.ReactNode;
  collisionDetection?: boolean;
}> = ({ children, collisionDetection = true }) => {
  const [state, dispatch] = useReducer(reducer, { polylines: [], version: 0 });

  // Use refs to batch updates
  const pendingUpdates = useRef<Action[]>([]);
  const updateScheduled = useRef(false);

  const processPendingUpdates = useCallback(() => {
    const updates = pendingUpdates.current;
    pendingUpdates.current = [];
    updateScheduled.current = false;

    updates.forEach(action => dispatch(action));
  }, []);

  const registerPolyline = useCallback((polylineData: PolylineData) => {
    pendingUpdates.current.push({ type: 'REGISTER', payload: polylineData });

    if (!updateScheduled.current) {
      updateScheduled.current = true;
      requestAnimationFrame(processPendingUpdates);
    }
  }, [processPendingUpdates]);

  const unregisterPolyline = useCallback((id: string) => {
    pendingUpdates.current.push({ type: 'UNREGISTER', payload: id });

    if (!updateScheduled.current) {
      updateScheduled.current = true;
      requestAnimationFrame(processPendingUpdates);
    }
  }, [processPendingUpdates]);

  const contextValue = useMemo(() => ({
    registerPolyline,
    unregisterPolyline
  }), [registerPolyline, unregisterPolyline]);

  return (
    <StreetLabelContext.Provider value={contextValue}>
      {children}
      <CanvasTextLayer
        polylines={state.polylines}
        collisionDetection={collisionDetection}
      />
    </StreetLabelContext.Provider>
  );
};