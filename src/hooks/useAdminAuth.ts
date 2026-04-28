import { useState, useEffect, useCallback } from 'react';

const ADMIN_KEY = import.meta.env.VITE_ADMIN_STORAGE_KEY ?? 'mona-admin-auth';
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN ?? '';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas

interface AdminSession {
  authenticated: boolean;
  expiresAt: number;
}

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_KEY);
      if (stored) {
        const session: AdminSession = JSON.parse(stored);
        if (session.authenticated && Date.now() < session.expiresAt) {
          setIsAdmin(true);
        } else {
          localStorage.removeItem(ADMIN_KEY);
        }
      }
    } catch {
      localStorage.removeItem(ADMIN_KEY);
    }
  }, []);

  const login = useCallback((pin: string): boolean => {
    if (!ADMIN_PIN) {
      // eslint-disable-next-line no-console
      console.error('VITE_ADMIN_PIN no está configurado en las variables de entorno');
      return false;
    }
    if (pin === ADMIN_PIN) {
      const session: AdminSession = {
        authenticated: true,
        expiresAt: Date.now() + SESSION_DURATION_MS,
      };
      localStorage.setItem(ADMIN_KEY, JSON.stringify(session));
      setIsAdmin(true);
      setShowLogin(false);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_KEY);
    setIsAdmin(false);
  }, []);

  const openLogin = useCallback(() => {
    setShowLogin(true);
  }, []);

  const closeLogin = useCallback(() => {
    setShowLogin(false);
  }, []);

  return { isAdmin, showLogin, login, logout, openLogin, closeLogin };
}
