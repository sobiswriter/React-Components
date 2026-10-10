import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DestinationConfig, ProjectedDestination } from './types';
import { GalaxyEngine } from './GalaxyEngine';
import { SpatialLandmark } from './SpatialLandmark';

interface GalaxyCanvasProps {
  destinations: DestinationConfig[];
  activeDestinationId: string | null;
  hoveredDestinationId: string | null;
  isTraveling: boolean;
  onDestinationSelect: (id: string) => void;
  onDestinationHover: (id: string | null) => void;
  onTravelComplete: (id: string) => void;
  onReturnHomeComplete: () => void;
}

export const GalaxyCanvas: React.FC<GalaxyCanvasProps> = ({
  destinations,
  activeDestinationId,
  hoveredDestinationId,
  isTraveling,
  onDestinationSelect,
  onDestinationHover,
  onTravelComplete,
  onReturnHomeComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<GalaxyEngine | null>(null);
  const [projections, setProjections] = useState<Map<string, ProjectedDestination>>(new Map());

  // Handle projected positions updates from Three.js render loop
  const handleProjectedPositionsUpdate = useCallback((list: ProjectedDestination[]) => {
    setProjections((prev) => {
      const next = new Map(prev);
      list.forEach((p) => next.set(p.id, p));
      return next;
    });
  }, []);

  // Initialize GalaxyEngine on mount
  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new GalaxyEngine({
      canvas: canvasRef.current,
      destinations,
      onProjectedPositionsUpdate: handleProjectedPositionsUpdate,
      onTravelComplete,
      onReturnHomeComplete,
    });

    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [destinations, handleProjectedPositionsUpdate, onTravelComplete, onReturnHomeComplete]);

  // Sync hover state to engine
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setHoveredDestination(hoveredDestinationId);
    }
  }, [hoveredDestinationId]);

  // Trigger travel in engine when activeDestinationId changes
  useEffect(() => {
    if (!engineRef.current) return;

    if (activeDestinationId) {
      engineRef.current.travelToDestination(activeDestinationId);
    } else {
      engineRef.current.returnToHome();
    }
  }, [activeDestinationId]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#030307]">
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none cursor-grab active:cursor-grabbing"
      />

      {/* Spatial 2D Landmarks Layer (hidden or dimmed when traveled into a destination) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          activeDestinationId && !isTraveling ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {destinations.map((dest) => (
          <SpatialLandmark
            key={dest.id}
            destination={dest}
            projection={projections.get(dest.id)}
            isHovered={hoveredDestinationId === dest.id}
            isSelected={activeDestinationId === dest.id}
            onHover={onDestinationHover}
            onSelect={onDestinationSelect}
          />
        ))}
      </div>
    </div>
  );
};
