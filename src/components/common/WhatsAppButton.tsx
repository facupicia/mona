import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getWhatsAppUrl, whatsappNumber } from '@/lib/contact';

interface WhatsAppButtonProps {
  className?: string;
}

export function WhatsAppButton({ className }: WhatsAppButtonProps) {
  const handleClick = () => {
    if (!whatsappNumber) {
      console.warn('VITE_WHATSAPP_NUMBER no configurado');
      return;
    }
    window.open(getWhatsAppUrl(), '_blank');
  };

  return (
    <div className="fixed right-4 sm:right-5 z-40" style={{ bottom: 'calc(env(safe-area-inset-bottom) + 5.5rem)' }}>
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className={cn(
          'absolute right-full mr-3 top-1/2 -translate-y-1/2',
          'px-3 py-2 rounded-xl',
          'bg-white text-slate-900 text-sm font-medium',
          'shadow-lg whitespace-nowrap',
          'hidden sm:block'
        )}
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-green-500" />
          <span>¡Escríbenos!</span>
        </div>
        {/* Arrow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white rotate-45" />
      </motion.div>

      {/* Main Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        aria-label="Contactar por WhatsApp"
        className={cn(
          'relative w-12 h-12 sm:w-14 sm:h-14 rounded-full',
          'flex items-center justify-center',
          'bg-gradient-to-br from-green-400 to-green-600',
          'text-white shadow-2xl',
          'border-2 border-white/20',
          'overflow-hidden group',
          className
        )}
      >
        {/* Animated background rings */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500"
          animate={{ 
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500"
          animate={{ 
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5
          }}
        />

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-green-400 blur-xl opacity-40" />

        {/* Icon */}
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, 0],
          }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
        </motion.div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </motion.button>

      {/* Notification dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-red-500 border-2 border-[hsl(265,50%,4%)]"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-red-500"
          animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
