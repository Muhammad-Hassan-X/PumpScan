import 'dotenv/config';
import { checkEnvVar } from "../utilities/index.js";
export const PORT = checkEnvVar("PORT");
export const SUPABASE_URL = checkEnvVar("SUPABASE_URL");
export const SUPABASE_KEY = checkEnvVar("SUPABASE_KEY");
export const COINGECKO_URI = checkEnvVar("COINGECKO_URI");
