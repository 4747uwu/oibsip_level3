import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {  AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { backendUrl } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Email input, 2: OTP & new password

    const sendResetOTP = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, 
                { email },
                {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (data.success) {
                toast.success('Reset OTP sent to your email');
                setStep(2);
            }
        } catch (error) {
            console.error('Reset OTP Error:', error);
            toast.error(error.response?.data?.message || 'Failed to send reset OTP');
        }
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, 
                { email, otp, newPassword },
                {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (data.success) {
                toast.success('Password reset successfully');
                navigate('/login');
            }
        } catch (error) {
            console.error('Password Reset Error:', error);
            toast.error(error.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-6 -mt-20'>
            

            <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
                <h2 className='text-3xl font-semibold text-white text-center mb-6'>Reset Password</h2>

                {step === 1 ? (
                    <form onSubmit={sendResetOTP} className='space-y-6'>
                        <div className='flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                            <img src={assets.mail_icon} className='w-6 h-6' alt="Email icon" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className='bg-transparent outline-none w-full text-white'
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className='w-full bg-gradient-to-r from-indigo-500 to-indigo-900 hover:from-indigo-600 hover:to-indigo-800 rounded-full py-2.5 text-white font-semibold transition-all duration-700 ease-in-out bg-[length:200%_auto] bg-left hover:bg-right'
                        >
                            Send Reset OTP
                        </button>
                    </form>
                ) : (
                    <form onSubmit={resetPassword} className='space-y-6'>
                        <div className='flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] mb-4'>
                            <img src={assets.mail_icon} className='w-6 h-6' alt="OTP icon" />
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className='bg-transparent outline-none w-full text-white'
                                required
                            />
                        </div>
                        <div className='flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                            <img src={assets.lock_icon} className='w-6 h-6' alt="Password icon" />
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className='bg-transparent outline-none w-full text-white'
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className='w-full bg-gradient-to-r from-indigo-500 to-indigo-900 hover:from-indigo-600 hover:to-indigo-800 rounded-full py-2.5 text-white font-semibold transition-all duration-700 ease-in-out bg-[length:200%_auto] bg-left hover:bg-right'
                        >
                            Reset Password
                        </button>
                    </form>
                )}

                <p className='text-center mt-4'>
                    <span 
                        onClick={() => navigate('/login')} 
                        className='text-indigo-500 cursor-pointer hover:underline'
                    >
                        Back to Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
