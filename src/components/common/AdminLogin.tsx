import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Lock, Unlock, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AdminLoginProps {
  isAdmin: boolean;
  onLogin: (pin: string) => boolean;
  onLogout: () => void;
  onOpen: () => void;
}

export function AdminLogin({ isAdmin, onLogin, onLogout, onOpen }: AdminLoginProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleOpen = () => {
    setShowDialog(true);
    setPin('');
    setError(false);
    onOpen();
  };

  const handleClose = () => {
    setShowDialog(false);
    setPin('');
    setError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 4) {
      setError(true);
      return;
    }
    const success = onLogin(pin);
    if (success) {
      handleClose();
    } else {
      setError(true);
      setPin('');
    }
  };

  const handleKeyPad = (digit: string) => {
    if (pin.length < 10) {
      setPin((prev) => prev + digit);
      setError(false);
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  if (isAdmin) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={onLogout}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
          'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
          'hover:bg-emerald-500/25 transition-colors'
        )}
      >
        <Unlock className="w-4 h-4" />
        <span>Modo Admin</span>
        <LogOut className="w-3.5 h-3.5 ml-1" />
      </motion.button>
    );
  }

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={handleOpen}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
          'bg-white/5 text-slate-400 border border-white/10',
          'hover:text-white hover:bg-white/10 transition-colors'
        )}
      >
        <Shield className="w-4 h-4" />
        <span>Acceso Admin</span>
      </motion.button>

      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'w-full max-w-sm rounded-3xl p-6',
                'bg-[hsl(265,40%,8%)] border border-white/10',
                'shadow-2xl shadow-violet-500/10'
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-500/15">
                    <Lock className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Acceso Admin</h3>
                    <p className="text-xs text-slate-500">Ingresá el PIN para gestionar fotos</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* PIN Display */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-12 h-14 rounded-xl flex items-center justify-center text-xl font-bold transition-all',
                        error
                          ? 'bg-red-500/10 border-2 border-red-500/50 text-red-400'
                          : i < pin.length
                            ? 'bg-violet-500/20 border-2 border-violet-500/50 text-white'
                            : 'bg-white/5 border-2 border-white/10 text-slate-600'
                      )}
                    >
                      {i < pin.length ? '•' : ''}
                    </div>
                  ))}
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-red-400"
                  >
                    PIN incorrecto
                  </motion.p>
                )}

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-3">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                    <button
                      key={digit}
                      type="button"
                      onClick={() => handleKeyPad(digit)}
                      className={cn(
                        'aspect-square rounded-2xl text-lg font-semibold text-white',
                        'bg-white/5 hover:bg-white/10 active:bg-white/15',
                        'border border-white/10 transition-colors'
                      )}
                    >
                      {digit}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={handleBackspace}
                    className={cn(
                      'aspect-square rounded-2xl text-sm font-medium text-slate-400',
                      'bg-white/5 hover:bg-white/10 active:bg-white/15',
                      'border border-white/10 transition-colors'
                    )}
                  >
                    Borrar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleKeyPad('0')}
                    className={cn(
                      'aspect-square rounded-2xl text-lg font-semibold text-white',
                      'bg-white/5 hover:bg-white/10 active:bg-white/15',
                      'border border-white/10 transition-colors'
                    )}
                  >
                    0
                  </button>
                  <Button
                    type="submit"
                    className={cn(
                      'aspect-square rounded-2xl p-0',
                      'bg-gradient-to-br from-violet-600 to-purple-600',
                      'hover:from-violet-500 hover:to-purple-500',
                      'text-white font-semibold'
                    )}
                  >
                    OK
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
