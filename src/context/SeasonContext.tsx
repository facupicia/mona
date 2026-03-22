import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Season, SeasonTheme } from '@/types';
import { seasonThemes } from '@/types';

// Detectar temporada basada en el mes actual
// Mayo-Octubre = California (Verano)
// Noviembre-Abril = Moscú (Invierno)
function detectSeason(): Season {
  const month = new Date().getMonth(); // 0-11
  // Mayo (4) a Octubre (9) = California
  // Noviembre (10) a Abril (3) = Moscú
  return month >= 4 && month <= 9 ? 'california' : 'moscu';
}

interface SeasonContextType {
  season: Season;
  theme: SeasonTheme;
  isManual: boolean;
  toggleSeason: () => void;
  setSeason: (season: Season) => void;
  resetToAuto: () => void;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export function SeasonProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeasonState] = useState<Season>(detectSeason());
  const [isManual, setIsManual] = useState(false);

  const theme = seasonThemes[season];

  const toggleSeason = useCallback(() => {
    setSeasonState(prev => (prev === 'moscu' ? 'california' : 'moscu'));
    setIsManual(true);
  }, []);

  const setSeason = useCallback((newSeason: Season) => {
    setSeasonState(newSeason);
    setIsManual(true);
  }, []);

  const resetToAuto = useCallback(() => {
    setSeasonState(detectSeason());
    setIsManual(false);
  }, []);

  // Actualizar theme-color meta tag
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const color = season === 'moscu' ? '#020617' : '#fff7ed';
      metaThemeColor.setAttribute('content', color);
    }
  }, [season]);

  // Haptic feedback al cambiar de temporada (si está disponible)
  useEffect(() => {
    if (isManual && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, [season, isManual]);

  return (
    <SeasonContext.Provider
      value={{
        season,
        theme,
        isManual,
        toggleSeason,
        setSeason,
        resetToAuto,
      }}
    >
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  const context = useContext(SeasonContext);
  if (context === undefined) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return context;
}
