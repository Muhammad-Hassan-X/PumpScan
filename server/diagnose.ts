import { register, login, logout, getProfile, updateProfile, deleteHistory, getWatchList, addWatchList, deleteWatchList, searchToken, fetchAndAnalyzeToken, getHistory } from './controllers/index.js';
import * as services from './services/index.js';
import * as routes from './routes/index.js';
import { startAlertsCron } from "./services/alerts.cron.js";

console.log("✅ Diagnostics: All modules (including Cron) loaded successfully!");
process.exit(0);

