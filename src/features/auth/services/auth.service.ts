import { useSessionStore, type RegisteredUser, type User } from '@/features/auth/store/session.store';

/**
 * Auth Service — mock (backend yok).
 *
 * Her fonksiyon Promise döndürür; setTimeout ile gerçek latency taklit
 * edilir — loading state'lerini düzgün test etmek için.
 *
 * Backend geldiğinde bu dosyadaki gövdeler değişecek:
 *   return api.post('/auth/login', creds);
 *
 * Component'ler aynı kalır — service layer'ın amacı tam bu.
 *
 * Not: `useSessionStore.getState()` — hook'un component DIŞINDAN
 * çağrıldığı form. Service/utility katmanında bunu kullanırız.
 */

type LoginPayload = { email: string; password: string };
type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
};
type LoginResponse = { user: User; token: string };

const latency = () => new Promise<void>((r) => setTimeout(r, 500));

export const authService = {
  async login({ email, password }: LoginPayload): Promise<LoginResponse> {
    await latency();
    const found = useSessionStore.getState().findUserByEmail(email);
    if (!found || found.password !== password) {
      throw new Error('E-posta veya şifre hatalı');
    }
    const { password: _p, securityAnswer: _sa, securityQuestion: _sq, ...publicUser } = found;
    return { user: publicUser, token: `mock-token-${found.id}` };
  },

  async register(payload: RegisterPayload): Promise<LoginResponse> {
    await latency();
    const store = useSessionStore.getState();
    if (store.findUserByEmail(payload.email)) {
      throw new Error('Bu e-posta zaten kayıtlı');
    }
    const record: RegisteredUser = {
      id: crypto.randomUUID(),
      name: payload.name,
      email: payload.email,
      password: payload.password,
      securityQuestion: payload.securityQuestion,
      securityAnswer: payload.securityAnswer.trim().toLowerCase(),
    };
    store.registerUser(record);
    const publicUser: User = { id: record.id, name: record.name, email: record.email };
    return { user: publicUser, token: `mock-token-${record.id}` };
  },

  async forgotQuestion(email: string): Promise<{ question: string }> {
    await latency();
    const found = useSessionStore.getState().findUserByEmail(email);
    if (!found) throw new Error('Bu e-posta ile kayıt bulunamadı');
    return { question: found.securityQuestion };
  },

  async forgotReset(email: string, answer: string, newPassword: string): Promise<void> {
    await latency();
    const found = useSessionStore.getState().findUserByEmail(email);
    if (!found) throw new Error('Bu e-posta ile kayıt bulunamadı');
    if (found.securityAnswer !== answer.trim().toLowerCase()) {
      throw new Error('Güvenlik cevabı yanlış');
    }
    useSessionStore.getState().resetPassword(email, newPassword);
  },

  async logout(): Promise<void> {
    await latency();
  },
};
