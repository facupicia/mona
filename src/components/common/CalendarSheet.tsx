import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSeason } from '@/context/SeasonContext';
import { cn } from '@/lib/utils';
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
import { useState, useMemo } from 'react';

interface CalendarSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  occupiedDates?: Date[];
}

export function CalendarSheet({
  isOpen,
  onClose,
  selectedDate,
  onSelectDate,
  occupiedDates = [],
}: CalendarSheetProps) {
  const { theme } = useSeason();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const isOccupied = (date: Date) => {
    return occupiedDates.some(occupied => isSameDay(occupied, date));
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50',
              'rounded-t-3xl',
              'shadow-2xl shadow-black/50',
              theme.card,
              'backdrop-blur-xl'
            )}
            style={{ maxHeight: '85vh' }}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-gray-400/50" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4">
              <div className="flex items-center gap-3">
                <div className={cn('p-2 rounded-xl', theme.primary)}>
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className={cn('text-lg font-semibold', theme.text)}>
                    Seleccionar fecha
                  </h3>
                  {selectedDate && (
                    <p className={cn('text-sm', theme.textMuted)}>
                      {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className={cn(
                  'p-2 rounded-xl transition-all active:scale-95',
                  'hover:bg-black/10',
                  theme.text
                )}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar */}
            <div className="px-4 pb-8 overflow-y-auto" style={{ maxHeight: '60vh' }}>
              {/* Month header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevMonth}
                  className={cn(
                    'p-2 rounded-xl transition-all active:scale-95',
                    'hover:bg-black/10',
                    theme.text
                  )}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <motion.span
                  key={currentMonth.toISOString()}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn('text-lg font-semibold capitalize', theme.text)}
                >
                  {format(currentMonth, 'MMMM yyyy', { locale: es })}
                </motion.span>
                
                <button
                  onClick={nextMonth}
                  className={cn(
                    'p-2 rounded-xl transition-all active:scale-95',
                    'hover:bg-black/10',
                    theme.text
                  )}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Week days */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map(day => (
                  <div
                    key={day}
                    className={cn(
                      'text-center text-xs font-medium py-2',
                      theme.textMuted
                    )}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
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
                          onSelectDate(day);
                          onClose();
                        }
                      }}
                      disabled={isOccupiedDay || !isCurrentMonth}
                      className={cn(
                        'aspect-square rounded-xl flex items-center justify-center',
                        'text-sm font-medium transition-all duration-200',
                        'active:scale-95 touch-manipulation',
                        'relative overflow-hidden',
                        !isCurrentMonth && 'opacity-30',
                        isOccupiedDay && 'opacity-40 cursor-not-allowed line-through decoration-2',
                        isSelected && theme.primary,
                        isSelected && 'text-white shadow-lg',
                        !isSelected && isTodayDate && 'ring-2 ring-offset-1',
                        !isSelected && isTodayDate && (theme.season === 'moscu' ? 'ring-blue-500' : 'ring-amber-500'),
                        !isSelected && !isTodayDate && isCurrentMonth && !isOccupiedDay && 'hover:bg-black/10',
                        theme.text
                      )}
                      style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                      {format(day, 'd')}
                      
                      {/* Occupied indicator */}
                      {isOccupiedDay && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className={cn('text-xs', theme.textMuted)}>Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className={cn('text-xs', theme.textMuted)}>Ocupado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn('w-3 h-3 rounded-full', theme.primary)} />
                  <span className={cn('text-xs', theme.textMuted)}>Seleccionado</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
