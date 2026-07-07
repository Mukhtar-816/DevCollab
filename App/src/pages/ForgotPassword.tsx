import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Email is required.');
      return;
    }

    setLoading(true);
    // Simulate sending recovery email
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
      toast.success('Recovery link sent to your email.');
    }, 1200);
  };

  return (
    <div className="bg-zinc-950 min-h-screen flex w-full justify-center items-center relative overflow-hidden px-4 select-none">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 shadow-2xl rounded-2xl p-8">
        <button
          onClick={() => navigate('/auth')}
          className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors text-xs font-semibold mb-6 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </button>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <h2 className="text-zinc-100 font-extrabold text-2xl">Forgot password?</h2>
              <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">
                Enter your email address and we'll send you a link to reset your account password.
              </p>
            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" isLoading={loading} className="w-full font-bold">
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center text-center gap-4 py-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="h-12 w-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-zinc-100 font-bold text-lg">Check your inbox</h3>
              <p className="text-zinc-400 text-xs leading-relaxed max-w-xs">
                We've sent a recovery email to <span className="text-zinc-200 font-semibold">{email}</span>. Click the link inside to configure a new password.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSent(false)}
              className="mt-2"
            >
              Resend email
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
