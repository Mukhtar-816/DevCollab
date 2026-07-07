import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { KeyRound } from 'lucide-react';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error('Both fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    // Simulate reset
    setTimeout(() => {
      setLoading(false);
      toast.success('Password updated successfully. You can now log in.');
      navigate('/auth');
    }, 1500);
  };

  return (
    <div className="bg-zinc-950 min-h-screen flex w-full justify-center items-center relative overflow-hidden px-4 select-none">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 shadow-2xl rounded-2xl p-8">
        <div className="flex flex-col items-center text-center gap-3 mb-6">
          <div className="h-10 w-10 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-zinc-100 font-extrabold text-xl">Set new password</h2>
            <p className="text-zinc-400 text-xs mt-1">
              Your new password must be different from previous passwords.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="New Password"
            type="password"
            placeholder="Min 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" isLoading={loading} className="w-full mt-2 font-bold">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
