import React, { useEffect, useRef, useState } from 'react'
import CustomInput from '../components/CustomInput';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Mail } from "lucide-react";
import { toast } from 'react-toastify';
import { registerVerify } from '../redux/slices/authSlice/auth.actions';
import { useDispatch } from 'react-redux';

const Otp = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const state = location.state;
    const email = state?.email;
    const [OTP, setOTP] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const isDisabled = () => {
        let flag = false;

        OTP.map(key => {
            if (key.length == 0) {
                flag = true;
            }
        });

        return flag;
    };

    const handleSubmit = async () => {
        if (isLoading || isDisabled()) return;

        if (!email) {
            toast.error("Email not found. Please register again.");
            navigate("/register", { replace: true });
            return;
        }

        const otpCode = OTP.join("").trim();

        if (otpCode.length !== 6) {
            toast.error("Please enter the complete 6-digit OTP.");
            return;
        }

        try {
            setIsLoading(true);

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
            setOTP(OTP.fill(""));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isDisabled()) {
            handleSubmit();
        }
    }, [1, isDisabled()]);


    function handleOnChange(e: any, index: number) {

        let updatedOtp = [...OTP];

        updatedOtp[index] = e.target.value;

        setOTP(updatedOtp);
        let nextIndex = Math.min(index + 1, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    function handleOnBack(e: any, index: number) {
        let updatedOtp = [...OTP];

        if (e.key == "Backspace") {
            updatedOtp[index] = '';
            let nextIndex = Math.max(index - 1, 0);
            requestAnimationFrame(() => inputRefs.current[nextIndex]?.focus())
            // return;
        }
    }

    return (
        <div className='bg-red-900 h-[100vh] w-full items-center justify-center flex overflow-hidden'>
            <div className='bg-white flex-col shadow-2xl border  items-center transition-all min-w-75 w-100 mx-5 flex sm:min-h-120 my-10 sm:mx-10 sm:min-w-150 sm:w-250 shadow-3xl overflow-hidden border-white/30  rounded-lg'>

                <div className='bg-red-900/30 p-4 rounded-full my-5 '>
                    <Mail className='text-red-900' />
                </div>

                <h1 className='text-red-900 font-bold text-xl text-center md:text-3xl mt-1 mb-2'>
                    Verify Your Account
                </h1>

                <p className='text-neutral-500 text-sm'>{`We sent an OTP on ${email || "user@gmail.com"}`}</p>

                <div className='flex flex-wrap justify-center px-5 gap-5 py-10'>
                    {OTP?.map((key, index) => (
                        <input
                            ref={el => { inputRefs.current[index] = el; }}
                            maxLength={1}
                            onChange={(e) => handleOnChange(e, index)}
                            value={key}
                            onKeyDown={(e) => handleOnBack(e, index)}
                            inputMode='numeric'
                            key={index}
                            className='border-3 border-neutral-300 bg-neutral-100 text-back transition-all font-bold text-2xl sm:text-3xl text-center focus:border-3  outline-none focus:border-red-900 rounded-md max-w-15 min-h-15 sm:max-w-18 sm:min-h-20 text-black' />
                    ))}
                </div>

                <div className='flex flex-row gap-5'>
                    <button onClick={() => navigate(-1)} className='rounded-md px-5 py-[10px] sm:px-10 hover:scale-105  border-neutral-200 border transition-all duration-300 bg-white shadow-xl my-10 text-red-900 font-semibold text-lg'>
                        <h1>Go Back</h1>
                    </button>
                    <button onClick={() => { !isDisabled() && handleSubmit() }} disabled={isDisabled()} className={`${isDisabled() ? "bg-red-900/60" : "bg-red-900"} rounded-md  px-5 py-[10px] sm:px-10 hover:scale-105  transition-all duration-300 shadow-xl border border-white/10 my-10 text-white font-semibold text-lg`}>
                        {isLoading ? <h1>....</h1> : <h1>Verify</h1>}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Otp
