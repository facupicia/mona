import { motion } from 'framer-motion';
import { useSeason } from '@/context/SeasonContext';
import { SeasonSwipe } from '@/components/common/SeasonSwipe';
import { SeasonIndicator } from '@/components/common/SeasonIndicator';
import { cn } from '@/lib/utils';
import { 
  MessageCircle, 
  Calendar, 
  Sparkles, 
  Heart, 
  Building2, 
  PartyPopper,
  ArrowRight,
  Camera
} from 'lucide-react';

interface HomeProps {
  onOpenEventModal: () => void;
  onNavigate: (page: 'home' | 'eventos' | 'galeria') => void;
}

export function Home({ onOpenEventModal, onNavigate }: HomeProps) {
  const { theme, season } = useSeason();

  const eventTypes = [
    { 
      icon: PartyPopper, 
      title: 'XV Años',
      desc: 'La fiesta de tus sueños',
      color: 'from-pink-500 to-rose-500'
    },
    { 
      icon: Heart, 
      title: 'Bodas',
      desc: 'Celebra tu amor',
      color: 'from-red-500 to-pink-500'
    },
    { 
      icon: Building2, 
      title: 'Corporativos',
      desc: 'Eventos de empresa',
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      icon: Sparkles, 
      title: 'Otros',
      desc: 'Cumpleaños, aniversarios',
      color: 'from-violet-500 to-purple-500'
    },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section - Enfocado en Eventos */}
      <SeasonSwipe>
        <section className="relative h-[100dvh] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src='https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80'
              alt={season === 'moscu' ? 'Moscú Events' : 'California Events'}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient overlay */}
            <div className={cn(
              'absolute inset-0 bg-gradient-to-b',
              theme.heroGradient
            )} />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between px-6 py-12">
            {/* Top section */}
            <div className="pt-safe">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between"
              >
                <div className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium',
                  'bg-white/20 backdrop-blur-sm text-white'
                )}>
                  {season === 'moscu' ? 'Moscú Eventos' : 'California Eventos'}
                </div>
                <SeasonIndicator />
              </motion.div>
            </div>

            {/* Middle section - Big title */}
            <div className="flex-1 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <p className="text-white/80 text-lg mb-2 font-medium">
                  Organizamos tu
                </p>
                <h1 className={cn(
                  'text-5xl sm:text-6xl font-black tracking-tighter',
                  'text-white drop-shadow-2xl',
                  'leading-none'
                )}>
                  EVENTO
                  <br />
                  <span className={cn(
                    'text-transparent bg-clip-text',
                    season === 'moscu' 
                      ? 'bg-gradient-to-r from-blue-400 to-violet-400'
                      : 'bg-gradient-to-r from-orange-400 to-yellow-400'
                  )}>
                    PERFECTO
                  </span>
                </h1>
                <p className={cn(
                  'mt-4 text-lg',
                  'text-white/90 drop-shadow-lg max-w-sm'
                )}>
                  XV años, bodas, eventos corporativos y más. 
                  Hacemos de tu celebración algo inolvidable.
                </p>
              </motion.div>
            </div>

            {/* Bottom section - CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              {/* Primary CTA */}
              <button
                onClick={onOpenEventModal}
                className={cn(
                  'w-full py-4 rounded-2xl',
                  'flex items-center justify-center gap-3',
                  'font-bold text-lg text-white',
                  'transition-all duration-200',
                  'active:scale-98',
                  'shadow-xl shadow-black/30',
                  season === 'moscu' 
                    ? 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400'
                )}
                style={{ minHeight: '56px' }}
              >
                <Calendar className="w-5 h-5" />
                Cotizar mi Evento
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => onNavigate('galeria')}
                className={cn(
                  'w-full py-3 rounded-2xl',
                  'flex items-center justify-center gap-2',
                  'font-medium',
                  'transition-all duration-200',
                  'active:scale-98',
                  'bg-white/10 backdrop-blur-sm text-white',
                  'border border-white/20',
                  'hover:bg-white/20'
                )}
              >
                <Camera className="w-4 h-4" />
                Ver Galería de Eventos
              </button>
            </motion.div>
          </div>
        </section>
      </SeasonSwipe>

      {/* Event Types Section */}
      <section className={cn('px-6 py-10', theme.bg)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={cn('text-2xl font-bold mb-2', theme.text)}>
            ¿Qué tipo de evento?
          </h2>
          <p className={cn('text-base mb-6', theme.textMuted)}>
            Tenemos la experiencia para hacerlo inolvidable
          </p>

          <div className="grid grid-cols-2 gap-3">
            {eventTypes.map((event, idx) => {
              const Icon = event.icon;
              return (
                <motion.button
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={onOpenEventModal}
                  className={cn(
                    'p-4 rounded-2xl text-left',
                    'transition-all duration-200',
                    'active:scale-95',
                    theme.card,
                    'border',
                    theme.border,
                    'hover:shadow-lg'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-xl mb-3',
                    'flex items-center justify-center',
                    'bg-gradient-to-br',
                    event.color
                  )}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={cn('font-bold text-base', theme.text)}>
                    {event.title}
                  </h3>
                  <p className={cn('text-xs mt-1', theme.textMuted)}>
                    {event.desc}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className={cn('px-6 py-10', theme.bg)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn('rounded-3xl p-6', theme.card, 'backdrop-blur-sm border', theme.border)}
        >
          <h2 className={cn('text-2xl font-bold mb-6', theme.text)}>
            ¿Por qué elegirnos?
          </h2>
          
          <div className="space-y-4">
            {[
              { value: '10+', label: 'Años de experiencia' },
              { value: '500+', label: 'Eventos realizados' },
              { value: '50K+', label: 'Invitados felices' },
              { value: '100%', label: 'Eventos personalizados' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center',
                  theme.primary,
                  'text-white font-bold text-lg'
                )}>
                  {stat.value}
                </div>
                <span className={cn('font-medium', theme.text)}>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Final */}
      <section className={cn('px-6 py-10', theme.bg)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            'rounded-3xl p-8 text-center',
            'bg-gradient-to-br',
            season === 'moscu'
              ? 'from-blue-600 to-violet-600'
              : 'from-orange-500 to-amber-500'
          )}
        >
          <Sparkles className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            ¿Listo para tu evento?
          </h2>
          <p className="text-white/80 mb-6">
            Contanos qué tenés en mente y te armamos un presupuesto
          </p>
          <button
            onClick={onOpenEventModal}
            className={cn(
              'w-full py-4 rounded-2xl',
              'flex items-center justify-center gap-2',
              'font-bold text-lg',
              'bg-white text-gray-900',
              'transition-all duration-200',
              'active:scale-98',
              'shadow-xl'
            )}
          >
            <MessageCircle className="w-5 h-5" />
            Consultar Ahora
          </button>
        </motion.div>
      </section>

      {/* Footer Info */}
      <section className={cn('px-6 py-8 pb-32', theme.bg)}>
        <div className="text-center">
          <p className={cn('text-sm', theme.textMuted)}>
            {season === 'moscu' ? 'Moscú' : 'California'} - Experiencias inolvidables
          </p>
          <p className={cn('text-xs mt-2', theme.textMuted)}>
            Av. Principal 1234
          </p>
        </div>
      </section>
    </div>
  );
}
