'use client';

import { create } from 'zustand';

/**
 * UI Store — Toast kuyruğu gibi ephemeral UI state.
 *
 * Toast'u tetikleyen component ile render eden ToastContainer farklı
 * yerlerde; prop drilling yerine global store ile bağlıyoruz.
 * Persist YOK — sayfa yenilenince toast'lar gider (beklenen davranış).
 *
 * Zustand store'ları Next.js'te client-side çalışır. 'use client'
 * directive'i ile import eden component de otomatik client olur.
 */

export type ToastType = 'success' | 'error' | 'info';
export type Toast = { id: string; message: string; type: ToastType };

type UIState = {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  toasts: [],

  addToast: (message, type = 'info') => {
    const id = crypto.randomUUID();
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 3000);
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
