import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import { BottomNav } from '@/components/common/BottomNav';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { Footer } from '@/components/common/Footer';
import { Home } from '@/pages/Home';
import { Galeria } from '@/pages/Galeria';
import './App.css';

type Page = 'home' | 'galeria';

// Transiciones suaves y elegantes entre páginas
const pageVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
    scale: 0.98,
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

// Mapeo de páginas para determinar dirección
const pageOrder: Page[] = ['home', 'galeria'];

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [direction, setDirection] = useState(0);

  const handleNavigate = (page: Page) => {
    const currentIndex = pageOrder.indexOf(currentPage);
    const newIndex = pageOrder.indexOf(page);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[hsl(265,50%,4%)] overflow-x-hidden">
      {/* Background gradient mesh */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-purple-950/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* Decorative grid pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main content */}
      <main className="relative mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
          {currentPage === 'home' && (
            <motion.div
              key="home"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Home onNavigate={handleNavigate} />
            </motion.div>
          )}
          
          {currentPage === 'galeria' && (
            <motion.div
              key="galeria"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Galeria />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* WhatsApp Float Button */}
      <WhatsAppButton />

      {/* Footer - Global */}
      <Footer onNavigate={handleNavigate} />

      {/* Bottom Navigation */}
      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
