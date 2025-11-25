import { supabase } from "../config/supabase.config.js";
import { StatusCodes } from "http-status-codes";
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const { data, error: errorSignUp } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                },
            },
        });
        const user = data?.user;
        const { error: errorInsertProfile } = await supabase.from("profiles").insert([
            {
                id: user.id,
                full_name: username,
                avatar_url: null,
                role: "user",
            },
        ]);
        if (errorInsertProfile) {
            return res.sendResponse(StatusCodes.NON_AUTHORITATIVE_INFORMATION, false, "Error inserting profile", null, errorInsertProfile);
        }
        if (errorSignUp) {
            return res.sendResponse(StatusCodes.NON_AUTHORITATIVE_INFORMATION, false, "Error signing up", null, errorSignUp);
        }
        return res.sendResponse(StatusCodes.OK, true, "User signed up successfully", data);
    }
    catch (error) {
        return res.sendResponse(StatusCodes.NON_AUTHORITATIVE_INFORMATION, false, "Error signing up", null, error);
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
        return res.sendResponse(StatusCodes.NOT_ACCEPTABLE, false, "Email and password are required", null, "Email and password are required");
    }
    try {
        const { data: supabaseData, error: errorLogin } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        const token = supabaseData?.session?.access_token;
        const username = supabaseData?.user?.user_metadata?.username;
        if (!token || errorLogin || !username) {
            return res.sendResponse(StatusCodes.UNAUTHORIZED, false, "Unauthorized or username is required", null, "Unauthorized or username is required");
        }
        if (errorLogin) {
            return res.sendResponse(StatusCodes.NON_AUTHORITATIVE_INFORMATION, false, "Error logging in", null, errorLogin);
        }
        return res.sendResponse(StatusCodes.OK, true, "Logged in successfully", { token, username });
    }
    catch (error) {
        return res.sendResponse(StatusCodes.NON_AUTHORITATIVE_INFORMATION, false, "Error logging in", null, error);
    }
};
export const logout = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
        return res.sendResponse(StatusCodes.UNAUTHORIZED, false, "Unauthorized", null, "Unauthorized");
    }
    const { error } = await supabase.auth.admin.signOut(token);
    if (error) {
        return res.sendResponse(StatusCodes.NON_AUTHORITATIVE_INFORMATION, false, "Error logging out", null, error);
    }
    return res.sendResponse(StatusCodes.OK, true, "Logged out successfully", null);
};
