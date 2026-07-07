import React, { useState, useRef } from 'react';
import CustomInput from '../components/CustomInput';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { login, register } from '../redux/slices/authSlice/auth.actions';
import { clearError } from '../redux/slices/authSlice/auth.slice';
import { toast } from 'react-toastify';
import { normalizeError } from '../utils/getErrorMessage';
import Button from '../components/Button';
import { ShieldCheck } from 'lucide-react';

type Tab = 'login' | 'signup';

const authActions = {
  login,
  signup: register,
};

const Authentication = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading }: any = useSelector((state: any) => state.auth);

  const [currentTab, setCurrentTab] = useState<Tab>('login');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitLockRef = useRef(false);

  function switchTab(tab: Tab) {
    if (loading) return;
    setCurrentTab(tab);
    setFormData({ email: "", password: "", confirmPassword: "" });
    dispatch(clearError());
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading || submitLockRef.current) return;

    const email = formData.email.trim();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword?.trim();

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    if (currentTab === "signup") {
      if (!confirmPassword) {
        toast.error("Please confirm your password.");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
    }

    submitLockRef.current = true;

    try {
      const action =
        currentTab === "login"
          ? authActions.login({ email, password })
          : authActions.signup({ email, password });

      await dispatch(action).unwrap();

      if (currentTab === "login") {
        toast.success("Login successful");
        navigate("/dashboard", { replace: true });
        return;
      }

      toast.success("OTP sent to your email");
      navigate("/register/verify", {
        state: { email },
        replace: true,
      });
    } catch (error) {
      let er: any = normalizeError(error);
      toast.error(er.error || "Authentication failed");
    } finally {
      submitLockRef.current = false;
    }
  }

  const features = [
    "Collaborate on real-world projects with devs",
    "Build a verified profile showing your tech stack",
    "Engage with feedback and code reviews",
  ];

  const passwordMismatch =
    currentTab === 'signup' &&
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  return (
    <div className="bg-zinc-950 min-h-screen flex w-full justify-center items-center relative overflow-hidden px-4 select-none selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      {/* Main card box */}
      <div className="relative z-10 w-full max-w-4xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[560px]">
        
        {/* Left Side: Branding and Features */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-indigo-950/40 via-zinc-900/80 to-zinc-950 p-8 flex flex-col justify-between border-r border-zinc-800/60">
          <div className="space-y-8">
            <div className="flex items-center gap-2" onClick={() => navigate('/')}>
              <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xs">
                D
              </div>
              <span className="font-extrabold text-sm text-zinc-100 tracking-tight">DevCollab</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-zinc-100 font-extrabold text-xl leading-tight">
                Unlock project collaboration.
              </h2>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Connect with engineers worldwide to coordinate, build, and publish modern software.
              </p>
            </div>

            <ul className="space-y-4 pt-2">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-300 text-xs">
                  <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-[9px]">
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 pt-6 border-t border-zinc-900 flex items-center gap-2 text-zinc-500 text-[10px] font-semibold tracking-wide uppercase">
            <ShieldCheck className="h-4 w-4 text-indigo-500" />
            <span>Secure JWT Authentication</span>
          </div>
        </div>

        {/* Right Side: Tab Buttons & Form fields */}
        <div className="w-full md:w-7/12 p-8 sm:p-10 flex flex-col justify-center bg-zinc-900/30">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-sm mx-auto">
            
            {/* Custom tab switcher */}
            <div className="relative p-1 bg-zinc-950 border border-zinc-900 rounded-xl flex w-fit">
              <div
                className={`absolute top-1 bottom-1 bg-indigo-600 rounded-lg ease-in-out transition-all duration-300 -z-0 ${
                  currentTab === 'login' ? 'left-1 w-20' : 'left-21 w-20'
                }`}
              />

              <button
                type="button"
                disabled={loading}
                onClick={() => switchTab('login')}
                className={`w-20 py-1.5 relative z-10 text-xs font-bold transition-colors duration-300 rounded-lg cursor-pointer ${
                  currentTab === 'login' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => switchTab('signup')}
                className={`w-20 py-1.5 relative z-10 text-xs font-bold transition-colors duration-300 rounded-lg cursor-pointer ${
                  currentTab === 'signup' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Helper title */}
            <div>
              <h3 className="text-zinc-200 font-bold text-lg">
                {currentTab === 'login' ? 'Welcome back' : 'Create an account'}
              </h3>
              <p className="text-zinc-500 text-xs mt-1">
                {currentTab === 'login' 
                  ? 'Sign in to access your projects and dashboard.' 
                  : 'Get started by configuring your user credentials.'}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <CustomInput
                title="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                disabled={loading}
                required
              />
              <CustomInput
                title="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                disabled={loading}
                required
              />

              {currentTab === 'signup' && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                  <CustomInput
                    title="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type="password"
                    disabled={loading}
                    required
                  />
                </div>
              )}

              {passwordMismatch && (
                <p className="text-rose-500 text-[11px] font-medium -mt-1">Passwords do not match</p>
              )}
            </div>

            {currentTab === 'login' && (
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-[11px] text-zinc-400 hover:text-indigo-400 self-end -mt-2 transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            )}

            <Button
              type="submit"
              isLoading={loading}
              className="w-full mt-2 py-2.5 font-bold"
            >
              {currentTab === 'login' ? 'Sign In' : 'Create Account'}
            </Button>

            <p className="text-center text-xs text-zinc-500">
              {currentTab === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                disabled={loading}
                onClick={() => switchTab(currentTab === 'login' ? 'signup' : 'login')}
                className="text-indigo-400 font-bold hover:underline hover:text-indigo-300 disabled:opacity-50 cursor-pointer"
              >
                {currentTab === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authentication;