import { combineReducers } from "redux"
import authReducer from "./auth.reducer"
import userReducer from "./user.reducer"
import adminReducer from "./admin.reducer"
import alertsReducer from "./alerts.reducer"

export default combineReducers({
	auth: authReducer,
	user: userReducer,
	admin: adminReducer,
	alerts: alertsReducer,
})
