import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { 
  Sparkles, 
  Heart, 
  Music, 
  Camera,
  ArrowRight,
  Crown,
  Star,
  PartyPopper,
  Gem,
  ChevronRight,
  MessageCircle,
  BadgePercent,
  CreditCard,
  CalendarDays
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/contact';

interface HomeProps {
  onNavigate: (page: 'home' | 'galeria') => void;
}

// Animaciones reutilizables
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const backgroundParticles = [
  { left: '8%', top: '18%', size: 'w-1 h-1', color: 'bg-amber-300/50', delay: 0 },
  { left: '18%', top: '72%', size: 'w-1.5 h-1.5', color: 'bg-violet-300/35', delay: 0.7 },
  { left: '31%', top: '36%', size: 'w-1 h-1', color: 'bg-white/35', delay: 1.1 },
  { left: '46%', top: '84%', size: 'w-1 h-1', color: 'bg-amber-200/45', delay: 1.6 },
  { left: '62%', top: '24%', size: 'w-1.5 h-1.5', color: 'bg-violet-200/35', delay: 0.4 },
  { left: '74%', top: '58%', size: 'w-1 h-1', color: 'bg-amber-300/45', delay: 1.9 },
  { left: '88%', top: '14%', size: 'w-1 h-1', color: 'bg-white/30', delay: 1.3 },
  { left: '92%', top: '78%', size: 'w-1.5 h-1.5', color: 'bg-violet-300/30', delay: 0.9 },
];

const lightTrails = [
  { left: '6%', top: '22%', width: 'w-40 sm:w-64', rotate: '-rotate-[18deg]', color: 'from-transparent via-amber-300/25 to-transparent', delay: 0 },
  { left: '52%', top: '16%', width: 'w-56 sm:w-80', rotate: '-rotate-[24deg]', color: 'from-transparent via-violet-300/20 to-transparent', delay: 1.2 },
  { left: '28%', top: '64%', width: 'w-48 sm:w-72', rotate: '-rotate-[14deg]', color: 'from-transparent via-cyan-200/15 to-transparent', delay: 2.1 },
  { left: '68%', top: '82%', width: 'w-44 sm:w-64', rotate: '-rotate-[20deg]', color: 'from-transparent via-amber-200/20 to-transparent', delay: 0.6 },
];

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

  const updates = [
    {
      icon: BadgePercent,
      eyebrow: 'Contratando en abril y mayo',
      title: '25% OFF',
      desc: 'Promo vigente para reservar tu evento viernes. Ideal para congelar fecha y asegurar producción completa.',
      action: 'Consultar promo',
      accent: 'from-amber-300 to-orange-500',
      backdrop: 'from-rose-950/80 via-black/70 to-violet-950/80',
    },
    {
      icon: CreditCard,
      eyebrow: 'Financia tu evento',
      title: '3, 6 y 12 cuotas',
      desc: 'Opciones de pago flexibles para organizar tu fiesta con tiempo, sin resignar música, luces ni ambientación.',
      action: 'Ver financiación',
      accent: 'from-cyan-300 to-violet-400',
      backdrop: 'from-emerald-950/70 via-black/70 to-violet-950/80',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[hsl(265,50%,4%)] overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(168,85,247,0.08)_36%,transparent_58%),radial-gradient(ellipse_at_50%_0%,rgba(245,158,11,0.08),transparent_42%)]" />
        <div className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />

        {lightTrails.map((trail, index) => (
          <motion.div
            key={`trail-${index}`}
            className={cn(
              'absolute h-px blur-[1px] bg-gradient-to-r',
              trail.width,
              trail.rotate,
              trail.color
            )}
            style={{ left: trail.left, top: trail.top }}
            animate={{
              x: ['-14vw', '14vw', '-14vw'],
              opacity: [0.08, 0.55, 0.08],
            }}
            transition={{
              duration: 9 + index * 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: trail.delay,
            }}
          />
        ))}

        {backgroundParticles.map((particle, index) => (
          <motion.span
            key={`particle-${index}`}
            className={cn('absolute rounded-full shadow-[0_0_14px_currentColor]', particle.size, particle.color)}
            style={{ left: particle.left, top: particle.top }}
            animate={{
              y: [0, -18, 0],
              x: [0, 8, 0],
              opacity: [0.25, 0.9, 0.25],
              scale: [1, 1.35, 1],
            }}
            transition={{
              duration: 5 + index * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[100dvh] w-full overflow-hidden">
        {/* Background with Overlay */}
        <div className="absolute inset-0 bg-[hsl(265,50%,8%)]">
          <div className={cn(
            'absolute inset-0',
            theme.gradientHero
          )} />
          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-transparent to-amber-500/10" />
          {/* Radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-600/10 via-transparent to-transparent" />
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
        <div className="relative z-10 min-h-[100dvh] flex flex-col justify-between px-4 sm:px-6 py-6 sm:py-8">

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center -mt-4 sm:-mt-8">
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
                className="mb-4 sm:mb-6"
              >
                <div className="relative inline-block">
                  <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto" />
                  <motion.div
                    className="absolute inset-0 blur-xl bg-amber-400/40 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              
              {/* Subtitle */}
              <motion.p 
                className="text-violet-300 text-sm sm:text-lg mb-2 sm:mb-3 font-medium tracking-wider uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Fiesta de 15 años
              </motion.p>

              {/* Main Title */}
              <h1 className="relative">
                <span className={cn(
                  'block text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white',
                  'leading-[0.9]'
                )}>
                  MONA
                </span>
                <span className={cn(
                  'block text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter',
                  'bg-gradient-to-r from-violet-400 via-amber-300 to-violet-400',
                  'bg-clip-text text-transparent leading-[0.9] mt-1'
                )}>
                  EVENTOS
                </span>
                {/* Decorative line */}
                <motion.div 
                  className="h-1 w-24 sm:w-32 mx-auto mt-3 sm:mt-4 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </h1>

              {/* Description */}
              <motion.p 
                className={cn(
                  'mt-4 sm:mt-6 text-base sm:text-lg max-w-xs sm:max-w-md mx-auto',
                  'text-slate-300 leading-relaxed px-2'
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
            className="space-y-3 max-w-md mx-auto w-full pb-2"
          >
            {/* Primary CTA */}
            <motion.a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'w-full py-3.5 sm:py-4 rounded-2xl',
                'flex items-center justify-center gap-2 sm:gap-3',
                'font-bold text-base sm:text-lg text-white',
                'transition-all duration-300',
                'bg-gradient-to-r from-violet-600 via-violet-500 to-purple-600',
                'shadow-xl shadow-violet-500/30',
                'border border-violet-400/30',
                'relative overflow-hidden group'
              )}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <MessageCircle className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Consultanos por WhatsApp</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform hidden sm:inline-block" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.button
              onClick={() => onNavigate('galeria')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'w-full py-3.5 sm:py-4 rounded-2xl',
                'flex items-center justify-center gap-2',
                'font-medium text-white text-sm sm:text-base',
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

      {/* Instagram Updates Section */}
      <section className="relative z-10 px-4 sm:px-6 py-14 sm:py-18 max-w-7xl mx-auto">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-7 sm:mb-10"
            variants={fadeInUp}
          >
            <div>
              <span className="inline-flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-medium tracking-wider uppercase mb-2">
                Novedades
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                Promos activas para tu fiesta
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl">
                Estas son las novedades que estamos compartiendo en redes para quienes quieren reservar fecha o financiar su evento.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-2 rounded-full bg-white/[0.06] border border-white/10 text-slate-300 text-xs sm:text-sm">
              <CalendarDays className="w-4 h-4 text-amber-400" />
              Abril y mayo
            </div>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-2">
            {updates.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className={cn(
                    'relative min-h-[360px] sm:min-h-[420px] overflow-hidden rounded-2xl sm:rounded-3xl',
                    'border border-white/10 bg-[hsl(265,35%,8%)] shadow-2xl shadow-black/30'
                  )}
                >
                  <div className={cn('absolute inset-0 bg-gradient-to-br', item.backdrop)} />
                  <div
                    className={cn(
                      'absolute inset-0 opacity-70',
                      index === 0
                        ? 'bg-[radial-gradient(circle_at_68%_20%,rgba(255,214,153,0.22),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(168,85,247,0.25),transparent_32%)]'
                        : 'bg-[radial-gradient(circle_at_25%_18%,rgba(16,185,129,0.22),transparent_30%),radial-gradient(circle_at_78%_72%,rgba(168,85,247,0.28),transparent_34%)]'
                    )}
                  />
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="relative z-10 flex min-h-[360px] sm:min-h-[420px] flex-col justify-between p-5 sm:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-white">
                        <div className={cn('p-2 rounded-xl bg-gradient-to-br', item.accent)}>
                          <Icon className="w-4 h-4 text-violet-950" />
                        </div>
                        <span className="text-xs font-semibold tracking-wider uppercase">
                          Mona eventos
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-white/75 mb-2">
                        {item.eyebrow}
                      </p>
                      <h3 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none mb-4">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-md mb-5">
                        {item.desc}
                      </p>
                      <motion.a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={cn(
                          'inline-flex items-center gap-2 rounded-full px-4 py-2.5',
                          'bg-white text-violet-950 text-sm font-bold',
                          'shadow-lg shadow-black/20'
                        )}
                      >
                        <MessageCircle className="w-4 h-4" />
                        {item.action}
                      </motion.a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 max-w-7xl mx-auto">
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
            className="text-center mb-8 sm:mb-12"
            variants={fadeInUp}
          >
            <span className="text-amber-400 text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
              Nuestros Servicios
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Todo para tu fiesta
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
              Servicios premium para una noche inolvidable
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'p-3 sm:p-5 rounded-2xl text-center',
                    'bg-gradient-to-br from-[hsl(265,35%,10%)] to-[hsl(265,30%,8%)]',
                    'border border-violet-500/20',
                    'hover:border-violet-500/40',
                    'transition-all duration-300',
                    'group cursor-pointer'
                  )}
                >
                  <div className={cn(
                    'w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4',
                    'flex items-center justify-center',
                    'bg-gradient-to-br shadow-lg',
                    service.gradient
                  )}>
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base mb-1 sm:mb-1.5 text-white group-hover:text-violet-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            'rounded-2xl sm:rounded-3xl p-5 sm:p-8 relative overflow-hidden',
            'bg-gradient-to-br from-violet-950/40 to-purple-950/20',
            'border border-violet-500/20'
          )}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="text-center mb-6 sm:mb-8">
              <span className="text-amber-400 text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
                ¿Por qué elegirnos?
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                La mejor elección para tu día
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Nos especializamos en hacer tus sueños realidad
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
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
                      'flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl',
                      'bg-white/[0.03] border border-white/[0.06]',
                      'hover:bg-white/[0.06] hover:border-white/[0.1]',
                      'transition-all duration-300'
                    )}
                  >
                    <div className="p-1.5 sm:p-2 rounded-lg bg-amber-500/10 flex-shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-200 leading-tight">
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
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            'rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden',
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
              <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-amber-300 mx-auto mb-3 sm:mb-4" />
            </motion.div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
              ¿Lista para tu gran noche?
            </h2>
            <p className="text-violet-200 mb-6 sm:mb-8 max-w-xs mx-auto text-sm sm:text-base">
              Escribinos y empecemos a planear tu evento soñado
            </p>
            <motion.a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'w-full py-3.5 sm:py-4 rounded-2xl',
                'flex items-center justify-center gap-2',
                'font-bold text-base sm:text-lg',
                'bg-white text-violet-700',
                'shadow-xl shadow-black/20',
                'transition-all duration-300',
                'group'
              )}
            >
              <MessageCircle className="w-5 h-5" />
              Consultanos por WhatsApp
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform hidden sm:inline-block" />
            </motion.a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
