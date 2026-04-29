import { register, login, logout } from "./auth.controllers.js";
import { getProfile, updateProfile } from "./profile.controllers.js";
import { deleteHistory, getHistory } from "./history.controllers.js";
import { getWatchList, addWatchList, deleteWatchList } from "./watchList.controllers.js";
import { fetchAndAnalyzeToken } from "./token.controllers.js";
import { getAlerts } from "./alerts.controllers.js";

export {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  deleteHistory,
  getHistory,
  getWatchList,
  addWatchList,
  deleteWatchList,
  fetchAndAnalyzeToken,
  getAlerts,
};

