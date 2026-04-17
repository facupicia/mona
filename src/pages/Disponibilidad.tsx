import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  User, 
  Phone, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  Sparkles,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  PartyPopper,
  Crown
} from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns';
import { es } from 'date-fns/locale';


const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

export function Disponibilidad() {
  const { theme } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  // Fechas ocupadas de ejemplo
  const occupiedDates = useMemo(() => [
    new Date(2026, 3, 15),
    new Date(2026, 3, 22),
    new Date(2026, 3, 29),
    new Date(2026, 4, 5),
    new Date(2026, 4, 12),
    new Date(2026, 4, 20),
    new Date(2026, 5, 3),
    new Date(2026, 5, 10),
  ], []);

  const benefits = [
    { icon: CheckCircle2, text: 'Reserva sin seña inicial', color: 'text-green-400' },
    { icon: Clock, text: 'Respuesta en 24hs', color: 'text-amber-400' },
    { icon: Star, text: 'Servicio personalizado', color: 'text-violet-400' },
  ];

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const isOccupied = (date: Date) => {
    return occupiedDates.some(occupied => isSameDay(occupied, date));
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !formData.name || !formData.phone) return;

    setIsSubmitting(true);

    try {
      // TODO: Implementar envío de formulario (email, API, etc.)
      console.log('Formulario enviado:', {
        name: formData.name,
        phone: formData.phone,
        event_date: selectedDate.toISOString().split('T')[0],
        message: formData.message,
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({ name: '', phone: '', message: '' });
        setSelectedDate(null);
      }, 4000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo o contactanos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(265,50%,4%)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-10 pb-6"
      >
        <div className="flex items-center gap-4">
          <motion.div 
            className={cn(
              'p-4 rounded-2xl',
              'bg-gradient-to-br from-violet-500 to-purple-600',
              'shadow-lg shadow-violet-500/25'
            )}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Calendar className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Disponibilidad
            </h1>
            <p className="text-sm text-slate-400">
              Elegí tu fecha ideal para los 15
            </p>
          </div>
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="px-6 mb-6"
      >
        <div className="flex flex-wrap gap-2">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-full',
                  'bg-gradient-to-r from-violet-500/10 to-purple-500/10',
                  'border border-violet-500/20',
                  'backdrop-blur-sm'
                )}
              >
                <Icon className={cn('w-4 h-4', benefit.color)} />
                <span className="text-slate-300 text-xs font-medium">{benefit.text}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Calendar Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="px-6 mb-6"
      >
        <div className={cn(
          'p-5 rounded-3xl',
          'bg-gradient-to-br from-[hsl(265,35%,10%)] to-[hsl(265,30%,8%)]',
          'border border-violet-500/20',
          'shadow-xl shadow-black/20'
        )}>
          {/* Month header */}
          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={prevMonth}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'p-2.5 rounded-xl',
                'bg-white/5 text-white',
                'hover:bg-white/10',
                'transition-colors'
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.span
              key={currentMonth.toISOString()}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-semibold capitalize text-white"
            >
              {format(currentMonth, 'MMMM yyyy', { locale: es })}
            </motion.span>
            
            <motion.button
              onClick={nextMonth}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'p-2.5 rounded-xl',
                'bg-white/5 text-white',
                'hover:bg-white/10',
                'transition-colors'
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Week days */}
          <div className="grid grid-cols-7 gap-1 mb-3">
            {weekDays.map(day => (
              <div
                key={day}
                className="text-center text-xs font-medium py-2 text-slate-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((day, index) => {
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isOccupiedDay = isOccupied(day);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isTodayDate = isToday(day);

              return (
                <motion.button
                  key={day.toISOString()}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.01 }}
                  onClick={() => {
                    if (!isOccupiedDay && isCurrentMonth) {
                      setSelectedDate(day);
                    }
                  }}
                  disabled={isOccupiedDay || !isCurrentMonth}
                  whileHover={!isOccupiedDay && isCurrentMonth ? { scale: 1.1 } : {}}
                  whileTap={!isOccupiedDay && isCurrentMonth ? { scale: 0.95 } : {}}
                  className={cn(
                    'aspect-square rounded-xl flex items-center justify-center',
                    'text-sm font-medium transition-all duration-200',
                    'relative overflow-hidden',
                    !isCurrentMonth && 'opacity-20',
                    isOccupiedDay && 'opacity-30 cursor-not-allowed',
                    isSelected && [
                      'bg-gradient-to-br from-violet-500 to-purple-600',
                      'text-white shadow-lg shadow-violet-500/30'
                    ],
                    !isSelected && isTodayDate && [
                      'ring-2 ring-violet-400 ring-offset-2 ring-offset-[hsl(265,35%,8%)]',
                      'text-violet-300'
                    ],
                    !isSelected && !isTodayDate && isCurrentMonth && !isOccupiedDay && [
                      'text-slate-300 hover:bg-violet-500/20'
                    ],
                    isOccupiedDay && 'line-through decoration-red-500 decoration-2'
                  )}
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  {format(day, 'd')}
                  
                  {/* Status indicator */}
                  {isOccupiedDay && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500" />
                  )}
                  {isTodayDate && !isSelected && !isOccupiedDay && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/30" />
              <span className="text-xs text-slate-400">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/30" />
              <span className="text-xs text-slate-400">Ocupado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-purple-600" />
              <span className="text-xs text-slate-400">Seleccionado</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selected Date Display */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="px-6 mb-6"
          >
            <div className={cn(
              'p-5 rounded-2xl',
              'bg-gradient-to-r from-violet-600 via-violet-500 to-purple-600',
              'text-white text-center relative overflow-hidden',
              'shadow-xl shadow-violet-500/20'
            )}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <PartyPopper className="w-5 h-5 text-amber-300" />
                  <p className="text-sm text-violet-200 font-medium">Fecha seleccionada</p>
                </div>
                <p className="text-xl font-bold">
                  {format(selectedDate, "EEEE d 'de' MMMM, yyyy", { locale: es })}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onSubmit={handleSubmit}
        className="px-6 space-y-5"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-violet-400" />
          Tus datos
        </h3>

        {/* Name input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Nombre completo <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Tu nombre"
              className={cn(
                'w-full pl-12 pr-4 py-4 rounded-xl',
                'bg-[hsl(265,25%,8%)] border-2 border-[hsl(265,25%,18%)]',
                'text-white placeholder:text-slate-600',
                'focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10',
                'transition-all duration-200'
              )}
              required
            />
          </div>
        </div>

        {/* Phone input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            WhatsApp <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+54 9 11 1234-5678"
              className={cn(
                'w-full pl-12 pr-4 py-4 rounded-xl',
                'bg-[hsl(265,25%,8%)] border-2 border-[hsl(265,25%,18%)]',
                'text-white placeholder:text-slate-600',
                'focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10',
                'transition-all duration-200'
              )}
              required
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            ¿Algo más que quieras contarnos?
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Cantidad de invitados, temática, preferencias de música..."
              rows={4}
              className={cn(
                'w-full pl-12 pr-4 py-4 rounded-xl resize-none',
                'bg-[hsl(265,25%,8%)] border-2 border-[hsl(265,25%,18%)]',
                'text-white placeholder:text-slate-600',
                'focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10',
                'transition-all duration-200'
              )}
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4">
          <motion.button
            type="submit"
            disabled={!selectedDate || !formData.name || !formData.phone || isSubmitting}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'w-full py-4 rounded-2xl',
              'flex items-center justify-center gap-3',
              'font-bold text-lg text-white',
              'transition-all duration-300',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0',
              'bg-gradient-to-r from-violet-600 via-violet-500 to-purple-600',
              'shadow-xl shadow-violet-500/25',
              'border border-violet-400/30',
              'relative overflow-hidden group'
            )}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                <Send className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Consultar disponibilidad</span>
              </>
            )}
          </motion.button>
          
          <p className="text-center text-xs text-slate-500 mt-3">
            Te contactaremos por WhatsApp en menos de 24hs
          </p>
        </div>
      </motion.form>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className={cn(
                'max-w-sm w-full p-8 rounded-3xl text-center',
                'bg-gradient-to-br from-[hsl(265,35%,12%)] to-[hsl(265,30%,8%)]',
                'border border-violet-500/30',
                'shadow-2xl shadow-violet-500/20'
              )}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">¡Consulta enviada!</h3>
                <p className="text-slate-400 mb-6">
                  Gracias por tu interés. Te contactaremos por WhatsApp en menos de 24 horas para confirmar disponibilidad.
                </p>
              </motion.div>

              <motion.div 
                className="flex items-center justify-center gap-2 text-sm text-violet-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Clock className="w-4 h-4" />
                <span>Respuesta garantizada</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
