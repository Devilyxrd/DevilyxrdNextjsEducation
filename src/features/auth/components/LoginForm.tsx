'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { authService } from '@/features/auth/services/auth.service';
import { useSessionStore } from '@/features/auth/store/session.store';
import { useUIStore } from '@/shared/store/ui.store';

/**
 * LoginForm — client component.
 *
 * Next.js notları:
 *  - useRouter: programmatic navigation (react-router'daki useNavigate eşdeğeri)
 *  - useSearchParams: URL query parametrelerini okur. /login?next=/orders ile
 *    geldiyse login sonrası oraya yönlendiriyoruz.
 *
 * Akış:
 *  1) Form submit → validate (minimal) → authService.login (500ms mock)
 *  2) Başarılı: session.login(user, token) → toast → redirect
 *  3) Başarısız: hata toast + inline mesaj, input'lar dolu kalır.
 */

export function LoginForm() {
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const login    = useSessionStore((s) => s.login);
  const addToast = useUIStore((s) => s.addToast);
  const router   = useRouter();
  const params   = useSearchParams();

  const next = params.get('next') ?? '/';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { user, token } = await authService.login(form);
      login(user, token);
      addToast(`Hoş geldin, ${user.name}`, 'success');
      router.replace(next);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Giriş yapılamadı';
      setError(message);
      addToast(message, 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="E-posta"
        type="email"
        name="email"
        autoComplete="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        leftIcon={<Mail className="h-4 w-4" />}
        placeholder="demo@local"
        required
      />

      <Input
        label="Şifre"
        type="password"
        name="password"
        autoComplete="current-password"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        leftIcon={<Lock className="h-4 w-4" />}
        placeholder="demo1234"
        required
      />

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-xs text-zinc-400 transition-colors hover:text-brand-300"
        >
          Şifremi unuttum
        </Link>
      </div>

      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300 animate-fade-in">
          {error}
        </div>
      )}

      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={loading}
        leftIcon={<LogIn className="h-4 w-4" />}
      >
        Giriş Yap
      </Button>

      <div className="rounded-md border border-zinc-800 bg-zinc-900/70 p-3 text-xs text-zinc-400">
        <div className="font-semibold text-zinc-300">Demo hesap</div>
        <div className="mt-1 space-y-0.5 font-mono">
          <div>E-posta: demo@local</div>
          <div>Şifre:   demo1234</div>
        </div>
      </div>
    </form>
  );
}
