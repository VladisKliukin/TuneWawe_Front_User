import {assets} from "../assets/assets.ts";
import * as React from "react";
import {useState} from "react";
import toast from "react-hot-toast";
import {useAuth} from "../context/auth/useAuth";
import type {RegisterProps} from "../context/auth/AuthTypes.ts";

const Register = ({onSwitchToLogin}: RegisterProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {register} = useAuth();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        console.error(error);
        console.log(loading);
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            toast.error("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            toast.error("Passwords don't match");
            return;
        }

        setLoading(true);
        try {
            const result = await register(email, password);
            if (result.success) {
                toast.success(result.message);
                onSwitchToLogin();
            } else {
                toast.error(result.message);
                setError(result.message);
            }
        } catch (e: unknown) {
            toast.error("An unexpected error occurred. Please try again later");
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Unexpected error");
            }
        } finally {
            setLoading(false);
        }

    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/*header*/}
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center justify-center mb-6">
                            <img src={assets.logo} alt="logo" className="w-16 h-16"/>
                            <h1 className="ml-3 text-3xl font-bold text-white">TuneWave</h1>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Join TuneWave</h2>
                    <p className="text-gray-300">
                        Create your account to start listening
                    </p>
                </div>
                {/*Register form*/}
                <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/*Email field*/}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                                Email address:
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                autoComplete="email"
                                required
                                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/*Password field*/}
                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-200 mb-2">Password: </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="new-password"
                                required
                                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/*Confirm Password field*/}
                        <div>
                            <label htmlFor="confirmPassword"
                                   className="block text-sm font-medium text-gray-200 mb-2">Confirm Password: </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                autoComplete="new-password"
                                required
                                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                placeholder="Confirm your Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {error && (
                            <div className="bg-red-500/20 border-red-500 rounded-lg p-3 text-red-300 text-sm">
                                {error}
                            </div>
                        )}
                        {/*Submit button*/}
                        <button
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-purple-500 rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105">
                            {loading ?
                                (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white- r-2"></div>
                                        Creating account...
                                    </div>
                                )
                                :
                                (
                                    "Create Account"
                                )
                            }
                        </button>

                    </form>
                    {/* Switch to login */}
                    <div className="mt-6 text center">
                        <p className="text-sm text-gray-400">
                            Already have an account?
                            <button
                                onClick={onSwitchToLogin}
                                className="text-purple-400 hover:text-purple-300 font-medium transition-colors cursor-pointer">
                                Sing in here
                            </button>
                        </p>
                    </div>

                    {/*Terms and conditions*/}
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            By creating an account, you agree to our Terms of Service and private Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;