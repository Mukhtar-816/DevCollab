import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice/auth.actions.tsx";
// import { AppDispatch, RootState } from "../redux/store.tsx";

// ─── Icons ───────────────────────────────────────────────────────────────────

const FingerprintIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10.5a9 9 0 0018 0c0-1.615-.392-3.14-1.083-4.5A11.96 11.96 0 0112 2.464z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-red-300" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z" />
    <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

const Authentication: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state:any) => state.auth);

  const [tab, setTab] = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepPersistent, setKeepPersistent] = useState(false);

  const handleQuickFill = () => {
    setEmail("demo@example.com");
    setPassword("Password123!");
  };

  const handleSubmit = () => {
    if (!email || !password) return;
    dispatch(login({ email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl" style={{ minHeight: "580px" }}>

        {/* ── Left Panel ─────────────────────────────────────── */}
        <div
          className="hidden md:flex flex-col justify-between w-5/12 p-8 relative overflow-hidden"
          style={{ background: "linear-gradient(160deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)" }}
        >
          {/* Decorative circle blobs */}
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10 bg-red-300" />
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 bg-red-400" />

          {/* Top: Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-red-800 flex items-center justify-center">
                <FingerprintIcon />
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-widest">CRIMSON NODE</p>
                <p className="text-red-300 text-xs tracking-widest">SECURITY SUITE</p>
              </div>
            </div>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-800/60 border border-red-700">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white text-xs font-medium">Interactive Node Sandbox</span>
            </div>
          </div>

          {/* Mid: Headline */}
          <div className="relative z-10 my-6">
            <h2 className="text-white text-3xl font-light leading-snug mb-3">
              Accelerate your
              <br />
              <span className="font-bold">Digital Growth.</span>
            </h2>
            <p className="text-red-200 text-sm leading-relaxed">
              The unified platform for secure enterprise authentication, sandboxed logs, and local credential management.
            </p>
          </div>

          {/* Demo Card */}
          <div className="relative z-10">
            <div className="rounded-xl bg-red-800/50 border border-red-700 p-4">
              <div className="flex items-center gap-2 mb-3">
                <DatabaseIcon />
                <span className="text-white text-sm font-semibold">Demonstration Account Ready</span>
              </div>
              <div className="text-red-200 text-xs space-y-1 font-mono mb-3">
                <p>ID: demo@example.com</p>
                <p>Pass: Password123!</p>
              </div>
              <button
                onClick={handleQuickFill}
                className="text-red-300 text-xs hover:text-white transition-colors"
              >
                Quick fill &amp; login →
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-2 mt-4 text-red-400 text-xs">
              <ShieldIcon />
              <span>Standard TLS-256</span>
              <span className="text-red-600">•</span>
              <span>Offline Safe</span>
            </div>
          </div>
        </div>

        {/* ── Right Panel ────────────────────────────────────── */}
        <div className="flex-1 bg-white flex flex-col justify-center px-8 py-10">

          {/* Tab toggle */}
          <div className="flex justify-end mb-6">
            <div className="flex rounded-full border border-gray-200 p-0.5 text-sm">
              <button
                onClick={() => setTab("signin")}
                className={`px-5 py-1.5 rounded-full font-medium transition-all ${
                  tab === "signin"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab("register")}
                className={`px-5 py-1.5 rounded-full font-medium transition-all ${
                  tab === "register"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 tracking-widest mb-1">WELCOME BACK</p>
            <h1 className="text-2xl font-bold text-gray-900">Access your account</h1>
            <p className="text-gray-400 text-sm mt-1">
              Welcome back! Choose standard input or social providers.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error.message}
            </div>
          )}

          {/* Email */}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-500 tracking-widest mb-1.5">
              EMAIL ADDRESS
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-200 transition">
              <MailIcon />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 tracking-widest mb-1.5">
              MASTER PASSWORD
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-200 transition">
              <LockIcon />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="flex-1 text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent"
              />
              <button
                onClick={() => setShowPassword((p) => !p)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </div>

          {/* Persist + Forgot */}
          <div className="flex items-center justify-between mb-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={keepPersistent}
                onChange={(e) => setKeepPersistent(e.target.checked)}
                className="accent-red-700 w-4 h-4 rounded"
              />
              <span className="text-sm text-gray-600">Keep me persistent</span>
            </label>
            <button className="text-sm font-semibold text-red-700 hover:text-red-900 transition">
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #7f1d1d, #b91c1c)" }}
          >
            {loading ? (
              <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <>
                Sign In Credentials
                <span className="text-lg">→</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400 tracking-widest font-medium">PLATFORM ACCESS OPTIONS</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Google", icon: <GoogleIcon /> },
              { label: "Apple", icon: <AppleIcon /> },
              { label: "GitHub", icon: <GithubIcon /> },
            ].map(({ label, icon }) => (
              <button
                key={label}
                className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition"
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;