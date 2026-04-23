'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, HelpCircle, Lock, CheckCircle2 } from 'lucide-react';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { authService } from '@/features/auth/services/auth.service';
import { useUIStore } from '@/shared/store/ui.store';

/**
 * ForgotPasswordForm — 2 adımlı şifre sıfırlama.
 *
 *   step = 'email'  → e-posta ver → güvenlik sorusu dönsün
 *   step = 'answer' → cevap + yeni şifre → sıfırla
 *   step = 'done'   → 2sn sonra login'e yönlendir
 *
 * Pattern: discriminated union ile state machine benzeri akış.
 */

type Step = 'email' | 'answer' | 'done';

export function ForgotPasswordForm() {
  const [step,        setStep]        = useState<Step>('email');
  const [email,       setEmail]       = useState('');
  const [question,    setQuestion]    = useState('');
  const [answer,      setAnswer]      = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState<string | null>(null);

  const addToast = useUIStore((s) => s.addToast);
  const router   = useRouter();

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await authService.forgotQuestion(email);
      setQuestion(res.question);
      setStep('answer');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  }

  async function handleResetSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (newPassword.length < 6) {
      setError('Yeni şifre en az 6 karakter olmalı');
      return;
    }
    setLoading(true);
    try {
      await authService.forgotReset(email, answer, newPassword);
      setStep('done');
      addToast('Şifre başarıyla güncellendi', 'success');
      setTimeout(() => router.replace('/login'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  }

  if (step === 'email') {
    return (
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <Input
          label="E-posta"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="h-4 w-4" />}
          placeholder="demo@local"
          required
        />
        {error && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300 animate-fade-in">
            {error}
          </div>
        )}
        <Button type="submit" fullWidth size="lg" loading={loading}>
          Devam Et
        </Button>
      </form>
    );
  }

  if (step === 'answer') {
    return (
      <form onSubmit={handleResetSubmit} className="space-y-4">
        <div className="rounded-md border border-zinc-800 bg-zinc-900/70 p-3">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Güvenlik sorunuz
          </p>
          <p className="mt-1 text-sm text-zinc-200">{question}</p>
        </div>

        <Input
          label="Cevap"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          leftIcon={<HelpCircle className="h-4 w-4" />}
          required
        />

        <Input
          label="Yeni Şifre"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          leftIcon={<Lock className="h-4 w-4" />}
          hint="En az 6 karakter"
          required
        />

        {error && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300 animate-fade-in">
            {error}
          </div>
        )}

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Şifreyi Güncelle
        </Button>
      </form>
    );
  }

  // done
  return (
    <div className="flex flex-col items-center py-6 text-center animate-scale-in">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 ring-4 ring-emerald-500/20">
        <CheckCircle2 className="h-8 w-8 text-emerald-400" />
      </div>
      <p className="mt-4 text-sm text-zinc-400">
        Şifren güncellendi. Giriş sayfasına yönlendiriliyorsun...
      </p>
    </div>
  );
}

/**
 * Parent page başlık ve alt yazıyı akışa göre değiştirebilsin diye
 * step'i dışa okutmak isteyen bir hook. Sadece bu component dosyası
 * içinde kullanmak yeterli olduğu için ihraç etmiyoruz.
 *
 * Bu dosyada başlık yönetimi için ayrı bir component export etmek
 * yerine, parent page (forgot-password/page.tsx) kendi başlığını
 * statik verir — daha basit.
 */
