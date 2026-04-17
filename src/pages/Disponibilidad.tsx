import { useState, useMemo, useCallback } from 'react';
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
  Crown,
  Info,
  AlertCircle,
  X,
  Users,
  Music,
  Camera,
  Lightbulb
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
  isBefore,
  startOfDay,
  addDays,
  isWeekend,
} from 'date-fns';
import { es } from 'date-fns/locale';

// Animaciones reutilizables
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
};

// Tipos de eventos
const eventTypes = [
  { id: '15-years', label: 'Fiesta de 15', icon: Crown, color: 'from-violet-500 to-purple-600' },
  { id: 'wedding', label: 'Casamiento', icon: Sparkles, color: 'from-pink-500 to-rose-600' },
  { id: 'corporate', label: 'Evento Corporativo', icon: Users, color: 'from-blue-500 to-indigo-600' },
  { id: 'birthday', label: 'Cumpleaños', icon: PartyPopper, color: 'from-amber-500 to-orange-600' },
];

// Servicios incluidos
const includedServices = [
  { icon: Music, label: 'DJ Profesional', desc: '4 horas de música' },
  { icon: Camera, label: 'Fotografía', desc: 'Cobertura completa' },
  { icon: Lightbulb, label: 'Iluminación', desc: 'Luces y efectos' },
];

export function Disponibilidad() {
  const { theme } = useTheme();
  const today = startOfDay(new Date());
  
  // Estados
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEventType, setSelectedEventType] = useState<string>('15-years');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '',
    message: '',
  });

  // Fechas ocupadas (simuladas - en producción vendrían de una API)
  const occupiedDates = useMemo(() => [
    addDays(today, 5),
    addDays(today, 12),
    addDays(today, 18),
    addDays(today, 25),
    addDays(today, 32),
    addDays(today, 40),
  ], [today]);

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const isOccupied = useCallback((date: Date) => {
    return occupiedDates.some(occupied => isSameDay(occupied, date));
  }, [occupiedDates]);

  const isPast = useCallback((date: Date) => {
    return isBefore(startOfDay(date), today);
  }, [today]);

  const isDisabled = useCallback((date: Date) => {
    return isOccupied(date) || isPast(date);
  }, [isOccupied, isPast]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Validación del formulario
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length < 3 ? 'El nombre debe tener al menos 3 caracteres' : '';
      case 'phone':
        const phoneRegex = /^[\d\s\-+()]{8,}$/;
        return !phoneRegex.test(value) ? 'Ingresá un número de teléfono válido' : '';
      case 'guests':
        const num = parseInt(value);
        return !value || num < 10 ? 'Mínimo 10 invitados' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (touchedFields.has(field)) {
      const error = validateField(field, value);
      setFormErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: string) => {
    setTouchedFields(prev => new Set(prev).add(field));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setFormErrors(prev => ({ ...prev, [field]: error }));
  };

  const isFormValid = () => {
    return (
      selectedDate &&
      formData.name.trim().length >= 3 &&
      /^[\d\s\-+()]{8,}$/.test(formData.phone) &&
      parseInt(formData.guests) >= 10
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos los campos
    const errors: Record<string, string> = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) errors[field] = error;
    });
    
    if (Object.keys(errors).length > 0 || !selectedDate) {
      setFormErrors(errors);
      setTouchedFields(new Set(Object.keys(formData)));
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulación de envío
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Consulta enviada:', {
        event_type: selectedEventType,
        event_date: selectedDate.toISOString().split('T')[0],
        ...formData,
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({ name: '', phone: '', guests: '', message: '' });
        setSelectedDate(null);
        setTouchedFields(new Set());
        setFormErrors({});
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navegación con teclado
  const handleKeyDown = (e: React.KeyboardEvent, day: Date) => {
    const dayIndex = days.findIndex(d => isSameDay(d, day));
    let newIndex = dayIndex;

    switch (e.key) {
      case 'ArrowLeft':
        newIndex = Math.max(0, dayIndex - 1);
        break;
      case 'ArrowRight':
        newIndex = Math.min(days.length - 1, dayIndex + 1);
        break;
      case 'ArrowUp':
        newIndex = Math.max(0, dayIndex - 7);
        break;
      case 'ArrowDown':
        newIndex = Math.min(days.length - 1, dayIndex + 7);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isDisabled(day)) {
          setSelectedDate(day);
        }
        return;
    }

    if (newIndex !== dayIndex) {
      e.preventDefault();
      const newDay = days[newIndex];
      setFocusedDate(newDay);
      document.getElementById(`day-${newDay.toISOString()}`)?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(265,50%,4%)] pb-8">
      {/* Header */}
      <motion.header
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
            <Calendar className="w-7 h-7 text-white" aria-hidden="true" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Reservá tu fecha
            </h1>
            <p className="text-sm text-slate-400">
              Elegí el día perfecto para tu evento
            </p>
          </div>
        </div>
      </motion.header>

      {/* Tipo de evento */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-8"
        role="radiogroup"
        aria-label="Tipo de evento"
      >
        <h2 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
          ¿Qué tipo de evento querés celebrar?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {eventTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedEventType === type.id;
            return (
              <motion.button
                key={type.id}
                onClick={() => setSelectedEventType(type.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                role="radio"
                aria-checked={isSelected}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-2xl',
                  'border-2 transition-all duration-300',
                  'text-left',
                  isSelected
                    ? cn('bg-gradient-to-r', type.color, 'border-transparent text-white shadow-lg')
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span className="font-medium text-sm">{type.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* Calendario */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-8"
        aria-label="Calendario de disponibilidad"
      >
        <div className={cn(
          'p-6 rounded-3xl',
          'bg-gradient-to-br from-[hsl(265,35%,12%)] to-[hsl(265,30%,8%)]',
          'border border-violet-500/20',
          'shadow-2xl shadow-black/30'
        )}>
          {/* Header del calendario */}
          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={prevMonth}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Mes anterior: ${format(subMonths(currentMonth, 1), 'MMMM yyyy', { locale: es })}`}
              className={cn(
                'p-3 rounded-xl',
                'bg-white/10 text-white',
                'hover:bg-white/20',
                'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[hsl(265,35%,8%)]',
                'transition-all duration-200'
              )}
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </motion.button>
            
            <h2 
              className="text-xl font-bold text-white capitalize"
              aria-live="polite"
            >
              {format(currentMonth, 'MMMM yyyy', { locale: es })}
            </h2>
            
            <motion.button
              onClick={nextMonth}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Mes siguiente: ${format(addMonths(currentMonth, 1), 'MMMM yyyy', { locale: es })}`}
              className={cn(
                'p-3 rounded-xl',
                'bg-white/10 text-white',
                'hover:bg-white/20',
                'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[hsl(265,35%,8%)]',
                'transition-all duration-200'
              )}
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </motion.button>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 mb-3" role="row">
            {weekDays.map((day, index) => (
              <div
                key={day}
                className={cn(
                  'text-center text-xs font-semibold py-3',
                  index === 0 || index === 6 ? 'text-amber-400' : 'text-slate-500'
                )}
                role="columnheader"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Grid de días */}
          <div 
            className="grid grid-cols-7 gap-2"
            role="grid"
            aria-label="Días del mes"
          >
            {days.map((day, index) => {
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isOccupiedDay = isOccupied(day);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isTodayDate = isToday(day);
              const isPastDate = isPast(day);
              const isWeekendDay = isWeekend(day);
              const isDisabledDay = isDisabled(day);

              return (
                <motion.button
                  key={day.toISOString()}
                  id={`day-${day.toISOString()}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.01 }}
                  onClick={() => {
                    if (!isDisabledDay) {
                      setSelectedDate(day);
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(e, day)}
                  disabled={isDisabledDay}
                  tabIndex={isSameDay(day, (focusedDate || selectedDate || today)) ? 0 : -1}
                  role="gridcell"
                  aria-selected={isSelected}
                  aria-disabled={isDisabledDay}
                  aria-label={format(day, "EEEE d 'de' MMMM", { locale: es }) + 
                    (isOccupiedDay ? ' - Ocupado' : isSelected ? ' - Seleccionado' : ' - Disponible')}
                  className={cn(
                    'aspect-square rounded-2xl flex items-center justify-center',
                    'text-base font-semibold transition-all duration-200',
                    'relative overflow-hidden',
                    'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[hsl(265,35%,8%)]',
                    !isCurrentMonth && 'opacity-20',
                    isDisabledDay && 'cursor-not-allowed',
                    
                    // Estados visuales
                    isSelected && [
                      'bg-gradient-to-br from-violet-500 to-purple-600',
                      'text-white shadow-lg shadow-violet-500/40',
                      'scale-105'
                    ],
                    
                    !isSelected && isTodayDate && !isDisabledDay && [
                      'ring-2 ring-amber-400 ring-offset-2 ring-offset-[hsl(265,35%,8%)]',
                      'text-amber-400 bg-amber-400/10',
                      'hover:bg-amber-400/20'
                    ],
                    
                    !isSelected && !isTodayDate && isCurrentMonth && !isDisabledDay && [
                      'text-slate-200',
                      isWeekendDay 
                        ? 'bg-violet-500/10 hover:bg-violet-500/20 text-violet-300'
                        : 'bg-white/5 hover:bg-white/10'
                    ],
                    
                    isOccupiedDay && [
                      'bg-red-500/10 text-red-400/50',
                      'after:absolute after:inset-0',
                      'after:bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(239,68,68,0.1)_4px,rgba(239,68,68,0.1)_8px)]'
                    ]
                  )}
                  style={{ minHeight: '48px', minWidth: '48px' }}
                >
                  <span className="relative z-10">{format(day, 'd')}</span>
                  
                  {/* Indicadores */}
                  {isOccupiedDay && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" aria-hidden="true" />
                  )}
                  {isTodayDate && !isSelected && !isDisabledDay && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" aria-hidden="true" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Leyenda mejorada */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30" aria-hidden="true" />
              <span className="text-xs text-slate-400">Seleccionado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-lg ring-2 ring-amber-400 bg-amber-400/10" aria-hidden="true" />
              <span className="text-xs text-slate-400">Hoy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-lg bg-violet-500/20" aria-hidden="true" />
              <span className="text-xs text-slate-400">Fin de semana</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-lg bg-red-500/20 relative overflow-hidden" aria-hidden="true">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(239,68,68,0.3)_2px,rgba(239,68,68,0.3)_4px)]" />
              </div>
              <span className="text-xs text-slate-400">Ocupado</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Fecha seleccionada - Card destacada */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="px-6 mb-8"
          >
            <div className={cn(
              'p-6 rounded-3xl relative overflow-hidden',
              'bg-gradient-to-br from-violet-600 via-violet-500 to-purple-600',
              'shadow-2xl shadow-violet-500/30'
            )}>
              {/* Decoración */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-900/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" aria-hidden="true" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                    <PartyPopper className="w-5 h-5 text-amber-300" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-violet-200 font-medium">Fecha seleccionada</p>
                    <p className="text-2xl font-bold text-white">
                      {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                    </p>
                  </div>
                </div>
                
                {/* Servicios incluidos */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/20">
                  {includedServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <div 
                        key={service.label}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm"
                      >
                        <Icon className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                        <span className="text-xs text-white font-medium">{service.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alerta si no hay fecha seleccionada */}
      {!selectedDate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6 mb-6"
        >
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-amber-300">Seleccioná una fecha</p>
              <p className="text-xs text-amber-400/70 mt-1">
                Elegí el día de tu evento en el calendario para continuar
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Formulario */}
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="px-6 space-y-5"
        aria-label="Formulario de consulta"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-violet-400" aria-hidden="true" />
          Tus datos
        </h2>

        {/* Nombre */}
        <div className="space-y-2">
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-slate-300"
          >
            Nombre completo <span className="text-red-400" aria-hidden="true">*</span>
            <span className="sr">(requerido)</span>
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" aria-hidden="true" />
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder="Ej: María González"
              aria-required="true"
              aria-invalid={!!formErrors.name}
              aria-describedby={formErrors.name ? 'name-error' : undefined}
              className={cn(
                'w-full pl-12 pr-4 py-4 rounded-2xl',
                'bg-[hsl(265,25%,10%)] border-2',
                formErrors.name && touchedFields.has('name')
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                  : 'border-[hsl(265,25%,20%)] focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10',
                'text-white placeholder:text-slate-600',
                'transition-all duration-200',
                'focus:outline-none'
              )}
            />
          </div>
          {formErrors.name && touchedFields.has('name') && (
            <p id="name-error" className="text-xs text-red-400 flex items-center gap-1" role="alert">
              <AlertCircle className="w-3 h-3" aria-hidden="true" />
              {formErrors.name}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div className="space-y-2">
          <label 
            htmlFor="phone" 
            className="block text-sm font-medium text-slate-300"
          >
            WhatsApp <span className="text-red-400" aria-hidden="true">*</span>
            <span className="sr">(requerido)</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" aria-hidden="true" />
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              placeholder="+54 9 11 1234-5678"
              aria-required="true"
              aria-invalid={!!formErrors.phone}
              aria-describedby={formErrors.phone ? 'phone-error' : undefined}
              className={cn(
                'w-full pl-12 pr-4 py-4 rounded-2xl',
                'bg-[hsl(265,25%,10%)] border-2',
                formErrors.phone && touchedFields.has('phone')
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                  : 'border-[hsl(265,25%,20%)] focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10',
                'text-white placeholder:text-slate-600',
                'transition-all duration-200',
                'focus:outline-none'
              )}
            />
          </div>
          {formErrors.phone && touchedFields.has('phone') && (
            <p id="phone-error" className="text-xs text-red-400 flex items-center gap-1" role="alert">
              <AlertCircle className="w-3 h-3" aria-hidden="true" />
              {formErrors.phone}
            </p>
          )}
        </div>

        {/* Cantidad de invitados */}
        <div className="space-y-2">
          <label 
            htmlFor="guests" 
            className="block text-sm font-medium text-slate-300"
          >
            Cantidad de invitados <span className="text-red-400" aria-hidden="true">*</span>
            <span className="sr">(requerido, mínimo 10)</span>
          </label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" aria-hidden="true" />
            <input
              id="guests"
              type="number"
              min="10"
              value={formData.guests}
              onChange={(e) => handleInputChange('guests', e.target.value)}
              onBlur={() => handleBlur('guests')}
              placeholder="Ej: 100"
              aria-required="true"
              aria-invalid={!!formErrors.guests}
              aria-describedby={formErrors.guests ? 'guests-error' : undefined}
              className={cn(
                'w-full pl-12 pr-4 py-4 rounded-2xl',
                'bg-[hsl(265,25%,10%)] border-2',
                formErrors.guests && touchedFields.has('guests')
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                  : 'border-[hsl(265,25%,20%)] focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10',
                'text-white placeholder:text-slate-600',
                'transition-all duration-200',
                'focus:outline-none'
              )}
            />
          </div>
          {formErrors.guests && touchedFields.has('guests') && (
            <p id="guests-error" className="text-xs text-red-400 flex items-center gap-1" role="alert">
              <AlertCircle className="w-3 h-3" aria-hidden="true" />
              {formErrors.guests}
            </p>
          )}
        </div>

        {/* Mensaje */}
        <div className="space-y-2">
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-slate-300"
          >
            ¿Algo más que quieras contarnos?
            <span className="text-slate-500 font-normal ml-1">(opcional)</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-500" aria-hidden="true" />
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Temática, preferencias de música, requerimientos especiales..."
              rows={4}
              className={cn(
                'w-full pl-12 pr-4 py-4 rounded-2xl resize-none',
                'bg-[hsl(265,25%,10%)] border-2 border-[hsl(265,25%,20%)]',
                'text-white placeholder:text-slate-600',
                'focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10',
                'transition-all duration-200',
                'focus:outline-none'
              )}
            />
          </div>
        </div>

        {/* Botón submit */}
        <div className="pt-4">
          <motion.button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            whileHover={isFormValid() && !isSubmitting ? { scale: 1.02, y: -2 } : {}}
            whileTap={isFormValid() && !isSubmitting ? { scale: 0.98 } : {}}
            aria-busy={isSubmitting}
            className={cn(
              'w-full py-4 rounded-2xl',
              'flex items-center justify-center gap-3',
              'font-bold text-lg text-white',
              'transition-all duration-300',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'bg-gradient-to-r from-violet-600 via-violet-500 to-purple-600',
              'shadow-xl shadow-violet-500/25',
              'border border-violet-400/30',
              'relative overflow-hidden group',
              'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[hsl(265,50%,4%)]'
            )}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
            
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  aria-hidden="true"
                />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 relative z-10" aria-hidden="true" />
                <span className="relative z-10">
                  {selectedDate ? 'Consultar disponibilidad' : 'Seleccioná una fecha'}
                </span>
              </>
            )}
          </motion.button>
          
          <p className="text-center text-xs text-slate-500 mt-3">
            Te contactaremos por WhatsApp en menos de 24hs
          </p>
        </div>
      </motion.form>

      {/* Modal de éxito */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className={cn(
                'max-w-sm w-full p-8 rounded-3xl text-center relative',
                'bg-gradient-to-br from-[hsl(265,35%,12%)] to-[hsl(265,30%,8%)]',
                'border border-violet-500/30',
                'shadow-2xl shadow-violet-500/20'
              )}
            >
              {/* Botón cerrar */}
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <motion.div 
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                aria-hidden="true"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 id="success-title" className="text-2xl font-bold text-white mb-2">
                  ¡Consulta enviada!
                </h3>
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
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>Respuesta garantizada</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
