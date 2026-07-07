import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail } from "lucide-react";
import { toast } from 'react-toastify';
import { registerVerify } from '../redux/slices/authSlice/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import Button from '../components/Button';

const Otp = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading }: any = useSelector((state: any) => state.auth);

    const state = location.state;
    const email = state?.email;
    const [OTP, setOTP] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const isDisabled = () => {
        return OTP.some(key => key.length === 0);
    };

    const handleSubmit = async () => {
        if (loading || isDisabled()) return;

        if (!email) {
            toast.error("Email not found. Please register again.");
            navigate("/auth", { replace: true });
            return;
        }

        const otpCode = OTP.join("").trim();

        if (otpCode.length !== 6) {
            toast.error("Please enter the complete 6-digit OTP.");
            return;
        }

        try {
            await dispatch(registerVerify({ email, otp: otpCode })).unwrap();
            toast.success("Verification successful");
            navigate("/dashboard", { replace: true });

        } catch (error: any) {
            const message =
                error?.message ||
                error?.error ||
                error?.data?.message ||
                "Verification failed. Please try again.";

            toast.error(message);
            setOTP(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }
    };

    useEffect(() => {
        if (!isDisabled()) {
            handleSubmit();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [OTP]);


    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        const updatedOtp = [...OTP];
        updatedOtp[index] = e.target.value;
        setOTP(updatedOtp);
        const nextIndex = Math.min(index + 1, 5);
        inputRefs.current[nextIndex]?.focus();
    }

    function handleOnBack(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        if (e.key === "Backspace") {
            const updatedOtp = [...OTP];
            updatedOtp[index] = '';
            setOTP(updatedOtp);
            const nextIndex = Math.max(index - 1, 0);
            requestAnimationFrame(() => inputRefs.current[nextIndex]?.focus());
        }
    }

    return (
        <div className='bg-zinc-950 min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4 select-none'>
            {/* Background glow effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

            <div className='relative z-10 w-full max-w-lg bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 shadow-2xl rounded-2xl p-8 flex flex-col items-center gap-6'>

                <div className='h-12 w-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center'>
                    <Mail className='h-6 w-6' />
                </div>

                <div className='text-center space-y-1.5'>
                    <h1 className='text-zinc-100 font-extrabold text-xl'>
                        Verify Your Account
                    </h1>
                    <p className='text-zinc-400 text-xs leading-relaxed'>
                        {`We sent a 6-digit OTP to `}
                        <span className="text-zinc-200 font-semibold">{email || "your email"}</span>
                    </p>
                </div>

                <div className='flex flex-wrap justify-center gap-3 py-4'>
                    {OTP.map((key, index) => (
                        <input
                            ref={el => { inputRefs.current[index] = el; }}
                            maxLength={1}
                            onChange={(e) => handleOnChange(e, index)}
                            value={key}
                            onKeyDown={(e) => handleOnBack(e, index)}
                            inputMode='numeric'
                            key={index}
                            className='w-12 h-14 sm:w-14 sm:h-16 bg-zinc-950 border-2 border-zinc-800 rounded-xl text-center text-zinc-100 font-bold text-xl sm:text-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder-zinc-700'
                        />
                    ))}
                </div>

                <div className='flex flex-row gap-3 w-full'>
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </Button>
                    <Button
                        className="flex-1"
                        onClick={() => { !isDisabled() && handleSubmit() }}
                        disabled={isDisabled()}
                        isLoading={loading}
                    >
                        Verify
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default Otp
