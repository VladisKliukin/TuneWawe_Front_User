export interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    register: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    isAuthenticated: () => boolean;
    getAuthHeaders: () => { Authorization: string } | null;
}

export interface User {
    email: string;
    role: string;
}

export interface AuthResponse {
    token?: string;
    message?: string;
    email?: string;
    role?: string;
}

export type LoginProps = {
    onSwitchToRegister: () => void;
};

export type RegisterProps = {
    onSwitchToLogin: () => void;
};