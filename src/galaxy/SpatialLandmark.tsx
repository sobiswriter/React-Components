import React from 'react';
import { DestinationConfig, ProjectedDestination } from './types';

interface SpatialLandmarkProps {
  destination: DestinationConfig;
  projection: ProjectedDestination | undefined;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

export const SpatialLandmark: React.FC<SpatialLandmarkProps> = ({
  destination,
  projection,
  isHovered,
  isSelected,
  onHover,
  onSelect,
}) => {
  if (!projection || !projection.visible) {
    return null;
  }

  const { x, y, scale } = projection;

  return (
    <div
      className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 select-none group"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: isHovered || isSelected ? 40 : 15,
      }}
      onMouseEnter={() => onHover(destination.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(destination.id)}
      role="button"
      tabIndex={0}
      aria-label={`Navigate to ${destination.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(destination.id);
        }
      }}
    >
      <div className="relative flex items-center gap-2.5">
        {/* Minimal Starlight Icon Anchor (Always visible, blends into starfield) */}
        <div className="relative flex items-center justify-center w-5 h-5">
          {/* Outer focus halo on hover */}
          <div
            className={`absolute inset-0 rounded-full border transition-all duration-300 ${
              isHovered
                ? 'scale-150 border-white/80 opacity-100 shadow-[0_0_12px_rgba(255,255,255,0.9)]'
                : 'scale-75 border-white/20 opacity-30 group-hover:opacity-75'
            }`}
            style={{
              borderColor: isHovered ? '#ffffff' : destination.color,
            }}
          />

          {/* Central Starlight Diamond Icon */}
          <div
            className={`w-2 h-2 rotate-45 transition-all duration-200 ${
              isHovered
                ? 'scale-125 bg-white shadow-[0_0_10px_#ffffff]'
                : 'scale-90 opacity-70 group-hover:opacity-100 group-hover:scale-110'
            }`}
            style={{
              backgroundColor: isHovered ? '#ffffff' : destination.color,
              boxShadow: isHovered
                ? `0 0 12px ${destination.color}`
                : `0 0 6px ${destination.color}88`,
            }}
          />
        </div>

        {/* Text Writings: ONLY visible when hovered (Clean, mysterious idle state) */}
        <div
          className={`flex flex-col text-left transition-all duration-300 ease-out origin-left ${
            isHovered
              ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
              : 'opacity-0 -translate-x-2 scale-95 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className="font-mono tracking-[0.24em] font-semibold text-[11px] text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] whitespace-nowrap"
            >
              {destination.sectorCode}
            </span>

            <span className="text-[8px] font-mono tracking-wider px-1.5 py-0.5 rounded border uppercase bg-white/10 text-white border-white/30 whitespace-nowrap">
              ENTER ↵
            </span>
          </div>

          {/* Expanded Preview Card on Hover */}
          <div className="mt-1 p-2 rounded bg-black/85 backdrop-blur-md border border-white/20 max-w-[200px] shadow-2xl">
            <p className="text-[10px] text-slate-200 font-sans line-clamp-2 leading-tight">
              {destination.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
