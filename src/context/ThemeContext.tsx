import { createContext, useContext, type ReactNode } from 'react';

export interface ThemeConfig {
  /* Colores base */
  bg: string;
  bgGradient: string;
  surface: string;
  surfaceElevated: string;
  
  /* Primarios - Violeta */
  primary: string;
  primarySoft: string;
  primaryGlow: string;
  
  /* Acentos - Dorado */
  accent: string;
  accentSoft: string;
  accentGlow: string;
  
  /* Texto */
  text: string;
  textMuted: string;
  textInverse: string;
  
  /* Componentes */
  card: string;
  cardHover: string;
  input: string;
  inputFocus: string;
  border: string;
  borderHover: string;
  
  /* Navegación */
  navBg: string;
  navActive: string;
  navInactive: string;
  
  /* Efectos */
  glass: string;
  glassLight: string;
  glow: string;
  shimmer: string;
  
  /* Gradientes */
  gradientPrimary: string;
  gradientGold: string;
  gradientHero: string;
  gradientCard: string;
  
  /* Utilidades */
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  shadowGlow: string;
  shadowGold: string;
}

export const theme: ThemeConfig = {
  /* Colores base */
  bg: 'bg-[hsl(265,50%,4%)]',
  bgGradient: 'bg-gradient-to-b from-[hsl(265,50%,4%)] via-[hsl(265,40%,6%)] to-[hsl(265,50%,4%)]',
  surface: 'bg-[hsl(265,35%,8%)]',
  surfaceElevated: 'bg-[hsl(265,30%,10%)]',
  
  /* Primarios - Violeta */
  primary: 'bg-[hsl(265,90%,55%)]',
  primarySoft: 'bg-[hsl(265,70%,55%)]/20',
  primaryGlow: 'shadow-[0_0_30px_hsl(265,90%,55%)]',
  
  /* Acentos - Dorado */
  accent: 'bg-[hsl(43,90%,55%)]',
  accentSoft: 'bg-[hsl(43,90%,55%)]/20',
  accentGlow: 'shadow-[0_0_30px_hsl(43,90%,55%)]',
  
  /* Texto */
  text: 'text-[hsl(260,20%,96%)]',
  textMuted: 'text-[hsl(260,10%,60%)]',
  textInverse: 'text-[hsl(265,80%,8%)]',
  
  /* Componentes */
  card: 'bg-gradient-to-br from-[hsl(265,35%,10%)] to-[hsl(265,30%,8%)]',
  cardHover: 'hover:from-[hsl(265,35%,12%)] hover:to-[hsl(265,30%,10%)]',
  input: 'bg-[hsl(265,25%,8%)] border-[hsl(265,25%,18%)]',
  inputFocus: 'focus:border-[hsl(265,90%,55%)]/60 focus:ring-4 focus:ring-[hsl(265,90%,55%)]/10',
  border: 'border-[hsl(265,30%,15%)]',
  borderHover: 'hover:border-[hsl(265,90%,55%)]/40',
  
  /* Navegación */
  navBg: 'bg-[hsl(265,50%,4%)]/90 backdrop-blur-xl',
  navActive: 'bg-[hsl(265,90%,55%)] text-white',
  navInactive: 'text-[hsl(260,10%,50%)] hover:text-white',
  
  /* Efectos */
  glass: 'bg-[hsl(265,30%,12%)]/60 backdrop-blur-2xl border border-[hsl(265,30%,20%)]/50',
  glassLight: 'bg-white/[0.08] backdrop-blur-xl border border-white/[0.12]',
  glow: 'shadow-[0_0_40px_hsl(265,90%,55%)]',
  shimmer: 'animate-shimmer',
  
  /* Gradientes */
  gradientPrimary: 'bg-gradient-to-r from-[hsl(265,85%,48%)] via-[hsl(265,90%,55%)] to-[hsl(265,85%,65%)]',
  gradientGold: 'bg-gradient-to-r from-[hsl(43,95%,55%)] via-[hsl(40,100%,60%)] to-[hsl(43,95%,55%)]',
  gradientHero: 'bg-gradient-to-b from-[hsl(265,80%,8%)]/95 via-[hsl(265,60%,12%)]/85 to-[hsl(265,50%,8%)]/98',
  gradientCard: 'bg-gradient-to-br from-[hsl(265,35%,10%)]/90 to-[hsl(265,30%,8%)]/95',
  
  /* Sombras */
  shadowSm: 'shadow-lg shadow-black/20',
  shadowMd: 'shadow-xl shadow-black/30',
  shadowLg: 'shadow-2xl shadow-black/40',
  shadowGlow: 'shadow-[0_0_40px_hsl(265,90%,55%)/0.3]',
  shadowGold: 'shadow-[0_4px_20px_hsl(43,90%,55%)/0.4]',
};

interface ThemeContextType {
  theme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType>({ theme });

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
