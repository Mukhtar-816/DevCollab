// Authentication.tsx
import React, { useState, useEffect, useRef } from 'react'
import CustomInput from '../components/CustomInput';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { login, register } from '../redux/slices/authSlice/auth.actions';
import { clearError } from '../redux/slices/authSlice/auth.slice';
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';

type Tab = 'login' | 'signup';

const authActions = {
  login,
  signup: register,
};

const Authentication = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {setIsAuthenticated} : any = useAuth();
  const { loading, error, success, pendingMode } = useSelector((state: RootState) => state.auth);

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
    setFormData({ email: "", password: "", confirmPassword: ""});
    dispatch(clearError());
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (loading || submitLockRef.current) return;

  if (currentTab === 'signup' && formData.password !== formData.confirmPassword) {
    return;
  }

  if (!formData.email || !formData.password) return;

  submitLockRef.current = true;
  const mode = currentTab;

  const action = mode === 'login'
    ? authActions.login({ email: formData.email, password: formData.password })
    : authActions.signup({ email: formData.email, password: formData.password });

  try {
    await dispatch(action).unwrap();
    if (mode === 'login') {
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      navigate('/register/verify', { state: { email: formData.email } });
    };
  } catch  (e : any) {
    toast.error(`Error :${e?.error} : ${JSON.stringify(e?.details)}`);
    console.log(JSON.stringify(e));
  } finally {
    submitLockRef.current = false;
  }
}
  const features = [
    "Collaborate on real projects with real devs",
    "Build a portfolio that recruiters notice",
    "Get feedback from senior engineers",
  ];

  const showError = error && pendingMode === null && !loading;
  const passwordMismatch =
    currentTab === 'signup' &&
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  return (
    <div className='bg-red-900 flex w-full h-[100vh] justify-center items-center'>
    

      <div className='bg-white shadow-2xl transition-all min-w-75 w-100 mx-5 flex md:min-h-150 my-10 sm:mx-10 sm:min-w-150 sm:w-250 overflow-hidden border-white/60 border rounded-lg'>
        <div className='w-1/3 bg-red-900 p-8 space-y-8 hidden sm:flex sm:flex-col relative overflow-hidden'>
          <div className='absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full' />
          <div className='absolute bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full' />
          <div className='absolute top-1/2 right-0 w-24 h-24 bg-red-700/40 rounded-full blur-xl' />

          <div className='relative z-10 space-y-8'>
            <h1 className='text-red-800 font-bold text-2xl border-[1px] border-red-200 rounded-md text-center bg-red-100 px-2 py-1'>
              Welcome to DevCollab :)
            </h1>
            <h1 className='text-white/80 text-sm'>
              Tell us about yourself and show your potential...!
            </h1>

            <ul className='space-y-4 pt-4'>
              {features.map((f, i) => (
                <li key={i} className='flex items-start gap-3 text-white/90 text-sm'>
                  <span className='mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-xs'>
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className='relative z-10 mt-auto pt-10'>
            <div className='flex -space-x-2'>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className='w-8 h-8 rounded-full bg-red-700 border-2 border-red-900 flex items-center justify-center text-[10px] text-white/80'>
                  D{i}
                </div>
              ))}
            </div>
            <p className='text-white/60 text-xs mt-2'>Join 2,000+ developers already collaborating</p>
          </div>
        </div>

        <div className='flex p-10 w-full sm:w-2/3'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-8 w-full justify-center'>
            <div className='relative max-w-45 px-2 py-1 justify-between border-neutral-100 border shadow-lg shadow-neutral-200 rounded-md flex flex-row'>
              <div
                className={`absolute top-1 left-2 bg-red-900 w-21 rounded-md ease-in-out transition-all duration-500 h-8 -z-0 ${
                  currentTab === "login" ? "translate-x-0" : "translate-x-20"
                }`}
              />

              <button
                type="button"
                disabled={loading}
                onClick={() => switchTab('login')}
                className={`w-21 h-8 relative z-10 text-md transition-colors duration-300 disabled:cursor-not-allowed ${
                  currentTab === 'login' ? "text-white" : "text-red-900"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => switchTab('signup')}
                className={`w-21 h-8 relative z-10 text-md transition-colors duration-300 disabled:cursor-not-allowed ${
                  currentTab === 'signup' ? "text-white" : "text-red-900"
                }`}
              >
                SignUp
              </button>
            </div>

            <div className='-mt-4 h-5'>
              <h1 className='text-neutral-400 text-sm transition-all duration-300'>
                {currentTab === "login"
                  ? "Resume your progress with our platform"
                  : "Join us and start your productive journey"}
              </h1>
            </div>

            <div className='flex flex-col gap-4'>
              {/* {currentTab === 'signup' && (
                <CustomInput
                  title="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                />
              )} */}

              <CustomInput
                title="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
              />
              <CustomInput
                title="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
              />

              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  currentTab === 'signup' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className='overflow-hidden'>
                  <CustomInput
                    title="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type="password"
                  />
                </div>
              </div>

              {passwordMismatch && (
                <p className='text-red-600 text-xs -mt-2'>Passwords don't match</p>
              )}

              {showError && (
                <p className='text-red-600 text-xs -mt-2'>{error?.message}</p>
              )}
            </div>

            {currentTab === "login" && (
              <button type="button" className='text-xs text-red-900 self-end -mt-4 hover:underline transition-all'>
                Forgot password?
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className='bg-red-900 text-white rounded-md h-10 w-full hover:bg-red-800 active:scale-[0.98] transition-all duration-200 shadow-md shadow-red-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100'
            >
              {loading
                ? "Please wait..."
                : currentTab === "login" ? "Login" : "Create Account"}
            </button>

            <div className='flex items-center gap-3'>
              <div className='h-px bg-neutral-200 flex-1' />
              <span className='text-neutral-400 text-xs'>or continue with</span>
              <div className='h-px bg-neutral-200 flex-1' />
            </div>

            <div className='flex gap-3'>
              <button
                type="button"
                disabled={loading}
                className='flex-1 h-10 border border-neutral-200 rounded-md text-sm text-neutral-600 hover:bg-neutral-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed'
              >
                Google
              </button>
              <button
                type="button"
                disabled={loading}
                className='flex-1 h-10 border border-neutral-200 rounded-md text-sm text-neutral-600 hover:bg-neutral-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed'
              >
                GitHub
              </button>
            </div>

            <p className='text-center text-xs text-neutral-400'>
              {currentTab === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                disabled={loading}
                onClick={() => switchTab(currentTab === "login" ? "signup" : "login")}
                className='text-red-900 font-medium hover:underline disabled:cursor-not-allowed disabled:opacity-60'
              >
                {currentTab === "login" ? "Sign up" : "Login"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Authentication