import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { DestinationConfig } from './types';

interface CosmicHudProps {
  destinations: DestinationConfig[];
  activeDestinationId: string | null;
  hoveredDestinationId: string | null;
  isTraveling: boolean;
  isMuted: boolean;
  onDestinationSelect: (id: string) => void;
  onDestinationHover: (id: string | null) => void;
  onReturnHome: () => void;
  onToggleMute: () => void;
}

export const CosmicHud: React.FC<CosmicHudProps> = ({
  destinations,
  activeDestinationId,
  hoveredDestinationId,
  isTraveling,
  isMuted,
  onDestinationSelect,
  onDestinationHover,
  onReturnHome,
  onToggleMute,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-5 md:p-8 select-none">
      {/* Top Header */}
      <header className="flex items-center justify-between gap-4">
        {/* Left: Minimal Site Title */}
        <div className="pointer-events-auto flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-slate-300">
            PORTFOLIO // GALAXY
          </span>
        </div>

        {/* Right: Whisper-quiet Destination Quick-Links */}
        <nav
          className="pointer-events-auto hidden sm:flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase text-slate-400"
          aria-label="Direct navigation"
        >
          {destinations.map((dest) => {
            const isSelected = activeDestinationId === dest.id;
            const isHovered = hoveredDestinationId === dest.id;

            return (
              <button
                key={dest.id}
                onClick={() => onDestinationSelect(dest.id)}
                onMouseEnter={() => onDestinationHover(dest.id)}
                onMouseLeave={() => onDestinationHover(null)}
                disabled={isTraveling}
                className={`transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'text-white font-semibold'
                    : isHovered
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {dest.name}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Bottom Footer */}
      <footer className="flex items-end justify-between gap-4">
        {/* Left: Subtle Hint */}
        <div className="text-[9px] md:text-[10px] font-mono tracking-wider text-slate-400">
          <span>DRAG TO ROTATE 3D • CLICK STAR TO ENTER</span>
        </div>

        {/* Right: Sound & Return Controls */}
        <div className="pointer-events-auto flex items-center gap-3">
          {activeDestinationId && (
            <button
              onClick={onReturnHome}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[10px] font-mono tracking-wider text-slate-200 transition-all active:scale-95 cursor-pointer shadow-lg"
              title="Return to Home Galaxy"
            >
              <RotateCcw className="w-3 h-3 text-cyan-300" />
              <span>RETURN HOME</span>
            </button>
          )}

          <button
            onClick={onToggleMute}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3 h-3 text-cyan-400" />
                <span>SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 text-slate-500" />
                <span>SOUND OFF</span>
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};
