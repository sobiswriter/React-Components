import React, { useState, useCallback, useEffect } from 'react';
import { GALAXY_DESTINATIONS } from './destinations';
import { GalaxyCanvas } from './GalaxyCanvas';
import { CosmicHud } from './CosmicHud';
import { DestinationView } from './DestinationView';
import { cosmicAudio } from './audio';
import { GalaxyProps } from './types';
import './galaxy.css';

export const Galaxy: React.FC<GalaxyProps> = ({
  destinations = GALAXY_DESTINATIONS,
  onDestinationSelect,
  onReturnHome,
  className = '',
  initialMuted = true,
}) => {
  const [activeDestinationId, setActiveDestinationId] = useState<string | null>(null);
  const [hoveredDestinationId, setHoveredDestinationId] = useState<string | null>(null);
  const [isTraveling, setIsTraveling] = useState<boolean>(false);
  const [showDestinationOverlay, setShowDestinationOverlay] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(initialMuted);

  // Handle destination selection & travel trigger
  const handleDestinationSelect = useCallback(
    (id: string) => {
      if (isTraveling || activeDestinationId === id) return;

      const dest = destinations.find((d) => d.id === id);
      if (!dest) return;

      setIsTraveling(true);
      setShowDestinationOverlay(false);
      setActiveDestinationId(id);

      // Audio cue
      cosmicAudio.playTravelWhoosh();

      // Update URL hash route
      window.history.pushState({ destinationId: id }, '', `#${dest.route}`);

      // Optional user callback
      onDestinationSelect?.(dest);
    },
    [isTraveling, activeDestinationId, destinations, onDestinationSelect]
  );

  // Handle destination hover
  const handleDestinationHover = useCallback(
    (id: string | null) => {
      setHoveredDestinationId(id);
      if (id) {
        const dest = destinations.find((d) => d.id === id);
        if (dest) {
          cosmicAudio.playHoverChime(dest.color);
        }
      }
    },
    [destinations]
  );

  // Handle travel completion
  const handleTravelComplete = useCallback((_destId: string) => {
    setIsTraveling(false);
    setShowDestinationOverlay(true);
  }, []);

  // Handle returning back to home galaxy
  const handleReturnHome = useCallback(() => {
    if (isTraveling && !activeDestinationId) return;

    setIsTraveling(true);
    setShowDestinationOverlay(false);
    setActiveDestinationId(null);

    // Audio cue
    cosmicAudio.playTravelWhoosh();

    // Reset URL
    window.history.pushState(null, '', '#/');

    // Optional user callback
    onReturnHome?.();
  }, [isTraveling, activeDestinationId, onReturnHome]);

  // Handle return home complete
  const handleReturnHomeComplete = useCallback(() => {
    setIsTraveling(false);
    setShowDestinationOverlay(false);
  }, []);

  // Audio mute toggle
  const handleToggleMute = useCallback(() => {
    const muted = cosmicAudio.toggleMute();
    setIsMuted(muted);
  }, []);

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.destinationId) {
        const dest = destinations.find((d) => d.id === e.state.destinationId);
        if (dest) {
          setActiveDestinationId(dest.id);
        }
      } else {
        handleReturnHome();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [destinations, handleReturnHome]);

  const activeDestination = destinations.find((d) => d.id === activeDestinationId);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#030307] ${className}`}>
      {/* 3D Interactive Galaxy Canvas & Spatial Landmarks */}
      <GalaxyCanvas
        destinations={destinations}
        activeDestinationId={activeDestinationId}
        hoveredDestinationId={hoveredDestinationId}
        isTraveling={isTraveling}
        onDestinationSelect={handleDestinationSelect}
        onDestinationHover={handleDestinationHover}
        onTravelComplete={handleTravelComplete}
        onReturnHomeComplete={handleReturnHomeComplete}
      />

      {/* Cosmic HUD Interface */}
      <CosmicHud
        destinations={destinations}
        activeDestinationId={activeDestinationId}
        hoveredDestinationId={hoveredDestinationId}
        isTraveling={isTraveling}
        isMuted={isMuted}
        onDestinationSelect={handleDestinationSelect}
        onDestinationHover={handleDestinationHover}
        onReturnHome={handleReturnHome}
        onToggleMute={handleToggleMute}
      />

      {/* Traveled Destination Overlay View */}
      {showDestinationOverlay && activeDestination && (
        <DestinationView
          destination={activeDestination}
          onReturnHome={handleReturnHome}
        />
      )}
    </div>
  );
};

export default Galaxy;
