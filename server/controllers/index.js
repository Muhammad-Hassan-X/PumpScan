import { register, login, logout } from "./auth.controllers.js";
import { getProfile } from "./profile.controllers.js";
import { deleteHistory } from "./history.controllers.js";
import { getWatchList, addWatchList, deleteWatchList } from "./watchList.controller.js";
import { searchToken } from "./search.controllers.js";
import {fetchAndAnalyzeToken} from "./token.controller.js"
export { register, login, logout, getProfile, deleteHistory, getWatchList, addWatchList, deleteWatchList, searchToken, fetchAndAnalyzeToken };
