'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Session Store — kullanıcı oturumunun tek kaynağı.
 *
 * Backend yok; login/register/forgot akışları mock. Store:
 *   - user + token (publicly expose edilen alanlar)
 *   - registeredUsers (mock DB — normalde backend'de olurdu)
 *   - hydrated flag (persist async yüklenir; ilk render'da user null
 *     görünür; ProtectedRoute bu flag'i bekler)
 *
 * Next.js SSR notu: persist `localStorage` kullanır; SSR sırasında
 * çalışmaz. Bu yüzden bu store'u SADECE client component'larda
 * kullanıyoruz. `onRehydrateStorage` hidrasyon sonrası hydrated=true
 * yapar — böylece client-side'da state hazır olur.
 */

export type User = {
  id: string;
  name: string;
  email: string;
};

export type RegisteredUser = User & {
  password: string;              // Eğitim için plain. Prod'da HASH.
  securityQuestion: string;
  securityAnswer: string;        // Eğitim için plain. Prod'da HASH.
};

type SessionState = {
  user: User | null;
  token: string | null;
  hydrated: boolean;

  registeredUsers: RegisteredUser[];

  login: (user: User, token: string) => void;
  logout: () => void;
  registerUser: (record: RegisteredUser) => void;
  updateUser: (patch: Partial<User>) => void;
  resetPassword: (email: string, newPassword: string) => boolean;

  isLoggedIn: () => boolean;
  findUserByEmail: (email: string) => RegisteredUser | undefined;
};

const DEMO_USER: RegisteredUser = {
  id: 'demo-1',
  name: 'Demo Kullanıcı',
  email: 'demo@local',
  password: 'demo1234',
  securityQuestion: 'İlk evcil hayvanımın adı?',
  securityAnswer: 'pamuk',
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      hydrated: false,
      registeredUsers: [DEMO_USER],

      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      registerUser: (record) =>
        set((s) => ({ registeredUsers: [...s.registeredUsers, record] })),
      updateUser: (patch) =>
        set((s) => (s.user ? { user: { ...s.user, ...patch } } : s)),

      resetPassword: (email, newPassword) => {
        const users = get().registeredUsers;
        const idx = users.findIndex(
          (u) => u.email.toLowerCase() === email.toLowerCase(),
        );
        if (idx === -1) return false;
        const updated = [...users];
        updated[idx] = { ...updated[idx], password: newPassword };
        set({ registeredUsers: updated });
        return true;
      },

      isLoggedIn: () => get().user !== null,
      findUserByEmail: (email) =>
        get().registeredUsers.find(
          (u) => u.email.toLowerCase() === email.toLowerCase(),
        ),
    }),
    {
      name: 'session-storage',
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const hasDemo = state.registeredUsers.some(
          (u) => u.email === DEMO_USER.email,
        );
        if (!hasDemo) {
          state.registeredUsers = [DEMO_USER, ...state.registeredUsers];
        }
        state.hydrated = true;
      },
    },
  ),
);
