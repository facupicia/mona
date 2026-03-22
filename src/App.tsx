import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SeasonProvider } from '@/context/SeasonContext';
import { SeasonWrapper } from '@/components/common/SeasonWrapper';
import { BottomNav } from '@/components/common/BottomNav';
import { SeasonToggle } from '@/components/common/SeasonToggle';
import { Home } from '@/pages/Home';
import { Eventos } from '@/pages/Eventos';
import { Galeria } from '@/pages/Galeria';
import './App.css';

type Page = 'home' | 'eventos' | 'galeria';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SeasonWrapper>
      <main className="relative">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Home 
                onOpenEventModal={() => setIsEventModalOpen(true)} 
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}
          
          {currentPage === 'eventos' && (
            <motion.div
              key="eventos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Eventos />
            </motion.div>
          )}
          
          {currentPage === 'galeria' && (
            <motion.div
              key="galeria"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Galeria />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Season Toggle FAB */}
      <SeasonToggle />

      {/* Bottom Navigation */}
      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Event Modal (from home CTA) */}
      <AnimatePresence>
        {isEventModalOpen && (
          <Eventos 
            isModalOpen={isEventModalOpen} 
            onCloseModal={() => setIsEventModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </SeasonWrapper>
  );
}

function App() {
  return (
    <SeasonProvider>
      <AppContent />
    </SeasonProvider>
  );
}

export default App;
