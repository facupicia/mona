import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSeason } from '@/context/SeasonContext';
import { CalendarSheet } from '@/components/common/CalendarSheet';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  User, 
  Phone, 
  MessageSquare, 
  Send, 
  PartyPopper, 
  Heart, 
  Building2,
  CheckCircle2,
  Sparkles,
  Clock,
  Users,
  Star
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { createEventLead } from '@/lib/supabase';
import type { EventType, Season } from '@/types';

interface EventosProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export function Eventos({ isModalOpen, onCloseModal }: EventosProps) {
  const { theme, season } = useSeason();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'xv' as EventType,
    message: '',
  });

  // Fechas ocupadas de ejemplo
  const occupiedDates = [
    new Date(2026, 2, 15),
    new Date(2026, 2, 22),
    new Date(2026, 2, 29),
    new Date(2026, 3, 5),
    new Date(2026, 3, 12),
  ];

  const eventTypes: { value: EventType; label: string; icon: typeof PartyPopper; desc: string }[] = [
    { value: 'xv', label: 'XV Años', icon: PartyPopper, desc: 'La fiesta más importante' },
    { value: 'boda', label: 'Boda', icon: Heart, desc: 'Celebra tu amor' },
    { value: 'corporativo', label: 'Corporativo', icon: Building2, desc: 'Eventos de empresa' },
    { value: 'otro', label: 'Otro', icon: Sparkles, desc: 'Cumpleaños, aniversarios' },
  ];

  const benefits = [
    { icon: CheckCircle2, text: 'Presupuesto sin compromiso' },
    { icon: Clock, text: 'Respuesta en 24hs' },
    { icon: Users, text: 'Capacidad hasta 500 personas' },
    { icon: Star, text: 'Ambientación personalizada' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !formData.name || !formData.phone) return;

    setIsSubmitting(true);

    try {
      await createEventLead({
        name: formData.name,
        phone: formData.phone,
        event_date: selectedDate.toISOString().split('T')[0],
        event_type: formData.eventType,
        message: formData.message,
        season: season as Season,
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({ name: '', phone: '', eventType: 'xv', message: '' });
        setSelectedDate(null);
        onCloseModal?.();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <div className={cn('min-h-screen pb-24', theme.bg)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-8 pb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className={cn('p-2 rounded-xl', theme.primary)}>
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={cn('text-2xl font-bold', theme.text)}>
              Cotizar Evento
            </h1>
            <p className={cn('text-sm', theme.textMuted)}>
              Completá el formulario y te contactamos
            </p>
          </div>
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-6"
      >
        <div className={cn(
          'grid grid-cols-2 gap-2 p-3 rounded-2xl',
          theme.card,
          'border',
          theme.border
        )}>
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="flex items-center gap-2">
                <Icon className={cn('w-4 h-4 flex-shrink-0', season === 'moscu' ? 'text-blue-400' : 'text-orange-400')} />
                <span className={cn('text-xs', theme.textMuted)}>{benefit.text}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="px-6 space-y-5"
      >
        {/* Date selector */}
        <div>
          <label className={cn('block text-sm font-medium mb-2', theme.text)}>
            Fecha del evento <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setIsCalendarOpen(true)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-4 rounded-xl',
              'border-2 transition-all',
              'active:scale-98',
              selectedDate 
                ? cn(theme.primary, 'text-white border-transparent')
                : cn('border-dashed', theme.border, theme.text)
            )}
          >
            <Calendar className="w-5 h-5" />
            <span className="flex-1 text-left font-medium">
              {selectedDate 
                ? format(selectedDate, "EEEE d 'de' MMMM, yyyy", { locale: es })
                : 'Seleccionar fecha'
              }
            </span>
            {!selectedDate && <Sparkles className="w-4 h-4 opacity-50" />}
          </button>
        </div>

        {/* Name input */}
        <div>
          <label className={cn('block text-sm font-medium mb-2', theme.text)}>
            Nombre completo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className={cn('absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5', theme.textMuted)} />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Tu nombre"
              className={cn(
                'w-full pl-12 pr-4 py-4 rounded-xl',
                'bg-transparent border-2',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                theme.border,
                theme.text,
                'placeholder:text-gray-400',
                'focus:ring-blue-500/50',
                'transition-all'
              )}
              required
            />
          </div>
        </div>

        {/* Phone input */}
        <div>
          <label className={cn('block text-sm font-medium mb-2', theme.text)}>
            WhatsApp <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className={cn('absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5', theme.textMuted)} />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+54 9 11 1234-5678"
              className={cn(
                'w-full pl-12 pr-4 py-4 rounded-xl',
                'bg-transparent border-2',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                theme.border,
                theme.text,
                'placeholder:text-gray-400',
                'focus:ring-blue-500/50',
                'transition-all'
              )}
              required
            />
          </div>
        </div>

        {/* Event type */}
        <div>
          <label className={cn('block text-sm font-medium mb-3', theme.text)}>
            Tipo de evento
          </label>
          <div className="grid grid-cols-2 gap-3">
            {eventTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.eventType === type.value;
              
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, eventType: type.value })}
                  className={cn(
                    'flex flex-col items-start gap-1 p-4 rounded-xl',
                    'border-2 transition-all',
                    'active:scale-95 text-left',
                    isSelected
                      ? cn(theme.primary, 'text-white border-transparent')
                      : cn(theme.card, theme.border, 'border', theme.text, 'hover:bg-black/5')
                  )}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="font-semibold text-sm">{type.label}</span>
                  <span className={cn('text-xs', isSelected ? 'text-white/80' : theme.textMuted)}>
                    {type.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className={cn('block text-sm font-medium mb-2', theme.text)}>
            ¿Algo más que quieras contarnos?
          </label>
          <div className="relative">
            <MessageSquare className={cn('absolute left-4 top-4 w-5 h-5', theme.textMuted)} />
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Cantidad de invitados, temática, preferencias..."
              rows={4}
              className={cn(
                'w-full pl-12 pr-4 py-4 rounded-xl resize-none',
                'bg-transparent border-2',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                theme.border,
                theme.text,
                'placeholder:text-gray-400',
                'focus:ring-blue-500/50',
                'transition-all'
              )}
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!selectedDate || !formData.name || !formData.phone || isSubmitting}
            className={cn(
              'w-full py-4 rounded-2xl',
              'flex items-center justify-center gap-3',
              'font-bold text-lg text-white',
              'transition-all duration-200',
              'active:scale-98',
              'shadow-xl',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              theme.primary,
              'hover:opacity-90'
            )}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar consulta
              </>
            )}
          </button>
          
          <p className={cn('text-center text-xs mt-3', theme.textMuted)}>
            Te contactaremos por WhatsApp en menos de 24hs
          </p>
        </div>
      </motion.form>

      {/* Calendar Sheet */}
      <CalendarSheet
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        occupiedDates={occupiedDates}
      />

      {/* Success modal */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-sm w-full p-8 rounded-3xl text-center bg-white text-gray-900"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">¡Recibido!</h3>
            <p className="text-gray-600 mb-6">
              Gracias por tu consulta. Te contactaremos por WhatsApp en menos de 24 horas.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Respuesta garantizada</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );

  // Si es modal, renderizar de forma diferente
  if (isModalOpen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={cn(
            'min-h-screen rounded-t-3xl mt-20',
            theme.bgGradient
          )}
        >
          {/* Close button */}
          <button
            onClick={onCloseModal}
            className={cn(
              'absolute top-4 right-4 z-10',
              'p-2 rounded-full',
              'bg-black/20 backdrop-blur-sm',
              theme.text
            )}
          >
            ✕
          </button>
          {content}
        </motion.div>
      </motion.div>
    );
  }

  return content;
}
