import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  Sparkles, 
  Heart, 
  Music, 
  Camera,
  ArrowRight,
  Crown,
  Star,
  PartyPopper,
  Gem,
  ChevronRight
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'home' | 'disponibilidad' | 'galeria') => void;
}

// Animaciones reutilizables
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

export function Home({ onNavigate }: HomeProps) {
  const { theme } = useTheme();

  const services = [
    { 
      icon: Music, 
      title: 'DJ & Música', 
      desc: 'Lo mejor de cumbia, reggaeton y electrónica',
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500'
    },
    { 
      icon: Sparkles, 
      title: 'Iluminación', 
      desc: 'Luces LED, rayos láser y efectos especiales',
      gradient: 'from-amber-400 via-orange-400 to-amber-500'
    },
    { 
      icon: Camera, 
      title: 'Fotografía', 
      desc: 'Cobertura profesional de tu noche soñada',
      gradient: 'from-pink-500 via-rose-500 to-pink-600'
    },
    { 
      icon: PartyPopper, 
      title: 'Ambientación', 
      desc: 'Decoración temática y personalizada',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-500'
    },
  ];

  const highlights = [
    { icon: Crown, text: '10+ años de experiencia', delay: 0 },
    { icon: Heart, text: 'Más de 500 fiestas', delay: 0.1 },
    { icon: Star, text: 'Las mejores reseñas', delay: 0.2 },
    { icon: Gem, text: 'Servicio premium', delay: 0.3 },
  ];

  return (
    <div className="min-h-screen bg-[hsl(265,50%,4%)] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen w-screen left-1/2 -translate-x-1/2">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src='https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80'
            alt='Fiesta de 15 años'
            className="w-full h-full object-cover"
          />
          <div className={cn(
            'absolute inset-0',
            theme.gradientHero
          )} />
          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-transparent to-amber-500/10" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/60 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 h-screen flex flex-col justify-between px-6 py-8">
          {/* Top Badge */}
          <motion.div 
            className="pt-safe flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className={cn(
              'px-5 py-2.5 rounded-full',
              'bg-gradient-to-r from-violet-500/20 to-purple-500/20',
              'backdrop-blur-md border border-violet-400/30',
              'flex items-center gap-2'
            )}>
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-violet-200 text-sm font-medium tracking-wide">
                Especialistas en fiestas de 15
              </span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center -mt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Crown Icon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <div className="relative inline-block">
                  <Crown className="w-16 h-16 text-amber-400 mx-auto" />
                  <motion.div
                    className="absolute inset-0 blur-xl bg-amber-400/40 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              
              {/* Subtitle */}
              <motion.p 
                className="text-violet-300 text-lg mb-3 font-medium tracking-wider uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
              
              </motion.p>

              {/* Main Title */}
              <h1 className="relative">
                <span className={cn(
                  'block text-6xl sm:text-8xl font-black tracking-tighter text-white',
                  'leading-[0.9]'
                )}>
                  MONA
                </span>
                <span className={cn(
                  'block text-6xl sm:text-8xl font-black tracking-tighter',
                  'bg-gradient-to-r from-violet-400 via-amber-300 to-violet-400',
                  'bg-clip-text text-transparent leading-[0.9] mt-1'
                )}>
                  EVENTOS
                </span>
                {/* Decorative line */}
                <motion.div 
                  className="h-1 w-32 mx-auto mt-4 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </h1>

              {/* Description */}
              <motion.p 
                className={cn(
                  'mt-6 text-lg max-w-md mx-auto',
                  'text-slate-300 leading-relaxed'
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Transformamos tu noche soñada en una experiencia inolvidable. 
                La celebración que siempre imaginaste.
              </motion.p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="space-y-3 max-w-md mx-auto w-full"
          >
            {/* Primary CTA */}
            <motion.button
              onClick={() => onNavigate('disponibilidad')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'w-full py-4 rounded-2xl',
                'flex items-center justify-center gap-3',
                'font-bold text-lg text-white',
                'transition-all duration-300',
                'bg-gradient-to-r from-violet-600 via-violet-500 to-purple-600',
                'shadow-xl shadow-violet-500/30',
                'border border-violet-400/30',
                'relative overflow-hidden group'
              )}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Calendar className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Ver Disponibilidad</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              onClick={() => onNavigate('galeria')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'w-full py-4 rounded-2xl',
                'flex items-center justify-center gap-2',
                'font-medium text-white',
                'transition-all duration-300',
                'bg-white/10 backdrop-blur-md',
                'border border-white/20',
                'hover:bg-white/15 hover:border-white/30'
              )}
            >
              <Camera className="w-4 h-4" />
              Ver Galería de Eventos
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-20 relative w-[60%] mx-auto">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <span className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-2 block">
              Nuestros Servicios
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Todo para tu fiesta
            </h2>
            <p className="text-slate-400 text-base max-w-md mx-auto">
              Servicios premium para una noche inolvidable
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 gap-4">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'p-5 rounded-2xl text-center',
                    'bg-gradient-to-br from-[hsl(265,35%,10%)] to-[hsl(265,30%,8%)]',
                    'border border-violet-500/20',
                    'hover:border-violet-500/40',
                    'transition-all duration-300',
                    'group cursor-pointer'
                  )}
                >
                  <div className={cn(
                    'w-14 h-14 rounded-2xl mx-auto mb-4',
                    'flex items-center justify-center',
                    'bg-gradient-to-br shadow-lg',
                    service.gradient
                  )}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-violet-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-6 py-16 w-[60%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            'rounded-3xl p-8 relative overflow-hidden',
            'bg-gradient-to-br from-violet-950/40 to-purple-950/20',
            'border border-violet-500/20'
          )}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <span className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-2 block">
                ¿Por qué elegirnos?
              </span>
              <h2 className="text-2xl font-bold text-white mb-2">
                La mejor elección para tu día
              </h2>
              <p className="text-sm text-slate-400">
                Nos especializamos en hacer tus sueños realidad
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay, duration: 0.4 }}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-xl',
                      'bg-white/[0.03] border border-white/[0.06]',
                      'hover:bg-white/[0.06] hover:border-white/[0.1]',
                      'transition-all duration-300'
                    )}
                  >
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-200">
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-16 w-[60%] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            'rounded-3xl p-8 text-center relative overflow-hidden',
            'bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800'
          )}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-t from-black/20 to-transparent" />
          
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-12 h-12 text-amber-300 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              ¿Lista para tu gran noche?
            </h2>
            <p className="text-violet-200 mb-8 max-w-xs mx-auto">
              Consultá disponibilidad y reservá tu fecha ahora
            </p>
            <motion.button
              onClick={() => onNavigate('disponibilidad')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'w-full py-4 rounded-2xl',
                'flex items-center justify-center gap-2',
                'font-bold text-lg',
                'bg-white text-violet-700',
                'shadow-xl shadow-black/20',
                'transition-all duration-300',
                'group'
              )}
            >
              <Calendar className="w-5 h-5" />
              Consultar Disponibilidad
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
