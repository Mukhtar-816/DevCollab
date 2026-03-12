import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { registerVerify } from '../../redux/authSlice/auth.Actions';
import { useApp } from '../../context/AppContext';

const Otp = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLoading, setIsAuthenticated } = useApp();

  // Use location.state safely
  const email = location.state?.email;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // Security: Redirect if no email is present in state
  useEffect(() => {
    if (!email) {
      toast.error("Unauthorized access. Please register first.");
      navigate("/register");
    }
  }, [email, navigate]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Take only the last character (prevents multiple digits in one box)
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasteData)) return toast.error("Please paste a 6-digit number");

    const digits = pasteData.split("");
    setOtp(digits);
    inputRefs.current[5].focus();
  };

  const handleVerifyOtp = async () => {
    const verificationCode = otp.join("");

    if (verificationCode.length !== 6) {
      return toast.error("Please enter the full 6-digit code");
    }

    setLoading(true);
    try {
      const res = await dispatch(registerVerify({ email, otp: verificationCode })).unwrap();
      setIsAuthenticated(true);
      // If using unwrap(), it goes straight to success or throws to catch
      toast.success("Account Verified! Welcome to DevCollab.");
      navigate("/dashboard");

    } catch (err) {
      // Handles rejected state automatically if using createAsyncThunk + unwrap
      toast.error(err || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-slate-950 px-4 select-none'>
      <Card className="w-full max-w-md border-slate-800 bg-slate-900 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Verify Account</CardTitle>
          <CardDescription className="text-slate-400">
            Code sent to: <span className="text-indigo-400 font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-between gap-2 md:gap-4' onPaste={handlePaste}>
            {otp.map((data, index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric" // Better for mobile keyboards
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-14 w-full text-center text-xl font-bold transition-all focus:ring-2 focus:ring-indigo-500 bg-slate-800 border-slate-700 text-white selection:bg-transparent"
              />
            ))}
          </div>

          <button
            onClick={handleVerifyOtp}
            className="mt-8 w-full rounded-lg bg-indigo-600 py-3.5 font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-500/20"
          >
            Verify & Continue
          </button>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">Didn't receive a code?</span>
            <button className="ml-2 font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              Resend Code
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Otp;