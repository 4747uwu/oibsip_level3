import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {  AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmailVerify = () => {
    const navigate = useNavigate();
    const { backendUrl, getAuthState } = useContext(AppContext);
    const [otp, setOtp] = useState('');

    const verifyOtp = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, 
                { otp },
                {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (data.success) {
                toast.success('Email verified successfully');
                await getAuthState(); // Update user data
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Verification Error:', error);
            toast.error(error.response?.data?.message || 'Verification failed');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-6 -mt-20 '>
           

            <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
                <h2 className='text-3xl font-semibold text-white text-center mb-6'>Verify Email</h2>
                <p className='text-center mb-8'>Please enter the verification code sent to your email</p>

                <form onSubmit={verifyOtp} className='space-y-6'>
                    <div className='flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img src={assets.mail_icon} className='w-6 h-6' alt="Email icon" />
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter verification code"
                            className='bg-transparent outline-none w-full text-white'
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className='w-full bg-gradient-to-r from-indigo-500 to-indigo-900 hover:from-indigo-600 hover:to-indigo-800 rounded-full py-2.5 text-white font-semibold transition-all duration-700 ease-in-out bg-[length:200%_auto] bg-left hover:bg-right'
                    >
                        Verify Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailVerify;
