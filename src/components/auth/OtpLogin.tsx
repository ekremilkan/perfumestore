import type { FormEvent } from 'react';
import { useState } from 'react';

type Props = {
  texts: {
    emailLabel: string;
    sendOtp: string;
    otpLabel: string;
    otpPlaceholder: string;
    verifyOtp: string;
    success: string;
    error: string;
  };
  redirectTo: string;
};

export function OtpLogin({ texts, redirectTo }: Props) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'otp'>('email');

  const handleSendOtp = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch('/api/auth/email-otp/create-verification-otp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, type: 'sign-in' })
      });
      if (!response.ok) {
        throw new Error('Failed request');
      }
      setMessage(texts.success);
      setStep('otp');
    } catch (err) {
      console.error(err);
      setError(texts.error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/sign-in/email-otp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      if (!response.ok) {
        throw new Error('Failed request');
      }
      window.location.href = redirectTo;
    } catch (err) {
      console.error(err);
      setError(texts.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && <p className="rounded-full bg-red-100 px-4 py-2 text-sm text-red-700">{error}</p>}
      {message && <p className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">{message}</p>}
      <form className="space-y-4" onSubmit={step === 'email' ? handleSendOtp : handleVerify}>
        <label className="flex flex-col gap-2 text-sm text-[var(--color-secondary)]">
          {texts.emailLabel}
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
          />
        </label>
        {step === 'otp' && (
          <label className="flex flex-col gap-2 text-sm text-[var(--color-secondary)]">
            {texts.otpLabel}
            <input
              required
              value={otp}
              pattern="\\d{6}"
              onChange={(event) => setOtp(event.target.value)}
              placeholder={texts.otpPlaceholder}
              className="rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
            />
          </label>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[var(--color-secondary)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[color-mix(in srgb,var(--color-secondary) 85%,white 15%)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {step === 'email' ? texts.sendOtp : texts.verifyOtp}
        </button>
      </form>
    </div>
  );
}
