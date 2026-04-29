import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase.config.js";
import { StatusCodes } from "http-status-codes";
export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const { data, error: errorSignUp } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                username,
            },
        });
        
        if (errorSignUp) {
            return res.sendResponse(StatusCodes.BAD_REQUEST, false, errorSignUp.message || "Error signing up", null, errorSignUp);
        }
        
        const user = data?.user;
        
        if (!user) {
             return res.sendResponse(StatusCodes.BAD_REQUEST, false, "Could not create user", null, null);
        }
        
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
        return res.sendResponse(StatusCodes.OK, true, "User signed up successfully", data);
    }
    catch (error) {
        return res.sendResponse(StatusCodes.NON_AUTHORITATIVE_INFORMATION, false, "Error signing up", null, error);
    }
};
export const login = async (req: Request, res: Response) => {
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
        const username = supabaseData?.user?.user_metadata?.username || "User";
        if (!token || errorLogin) {
            return res.sendResponse(StatusCodes.UNAUTHORIZED, false, errorLogin?.message || "Invalid credentials", null, errorLogin);
        }
        return res.sendResponse(StatusCodes.OK, true, "Logged in successfully", { token, username });
    }
    catch (error) {
        return res.sendResponse(StatusCodes.NON_AUTHORITATIVE_INFORMATION, false, "Error logging in", null, error);
    }
};
export const logout = async (req: Request, res: Response) => {
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
