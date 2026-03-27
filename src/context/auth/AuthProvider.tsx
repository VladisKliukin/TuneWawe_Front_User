import type {ReactNode} from "react";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {AuthContext} from "./AuthContext";
import {API_BASE_URL} from "./constants";
import type {AuthContextType, AuthResponse, User} from "./AuthTypes";

const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("userData");

        if (!storedUser) {
            return null;
        }

        try {
            return JSON.parse(storedUser) as User;
        } catch {
            return null;
        }
    });
    const [token, setToken] = useState<string | null>(localStorage.getItem("userToken"));
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const register = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {email, password});
            if (response.status === 200) {
                return {success: true, message: "Registered successfully"};
            }
            return {success: false, message: response.data.message || "Registration failed"};
        } catch (error: unknown) {
            const err = error as AxiosError<{ message?: string }>;
            return {
                success: false,
                message: err.response?.data?.message || "Network Error. Please try again later",
            };
        }
    };

    const login = async (email: string, password: string) => {
        setLoading(true);

        try {
            const response = await axios.post<AuthResponse>(
                `${API_BASE_URL}/api/auth/login`,
                {email, password},
                {validateStatus: () => true}
            );

            if (response.status !== 200) {
                return {
                    success: false,
                    message: response.data?.message || "Login failed"
                };
            }

            const responseToken = response.data?.token;

            if (!responseToken) {
                return {
                    success: false,
                    message: "Login response does not contain a token",
                };
            }

            const nextUser =
                response.data?.email
                    ? {
                        email: response.data.email,
                        role: response.data.role ?? "user",
                    }
                    : null;

            setToken(responseToken);
            setUser(nextUser);
            localStorage.setItem("userToken", responseToken);

            if (nextUser) {
                localStorage.setItem("userData", JSON.stringify(nextUser));
            } else {
                localStorage.removeItem("userData");
            }

            return {
                success: true,
                message: response.data?.message || "Login successful",
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    success: false,
                    message: error.response?.data?.message ?? "Network Error. Please try again later",
                };
            }

            return {
                success: false,
                message: "Unexpected error occurred",
            };
        } finally {
            setLoading(false);
        }
    };

    const isAuthenticated = () => {
        return !!token && !!user;
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
    }


    const contextValue: AuthContextType = {
        user,
        token,
        loading,
        register,
        login,
        isAuthenticated,
        logout
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
