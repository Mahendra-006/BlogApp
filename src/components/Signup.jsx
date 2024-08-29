import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                <div className="mb-6 flex justify-center">
                    <Logo width="120px" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                    Create Your Account
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-blue-500 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="space-y-6">
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: "Full name is required",
                        })}
                    />
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Invalid email address",
                            }
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
