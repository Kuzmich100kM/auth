import adminApi from "../api/adminApi"
import { addAlert } from "./alerts.reducer"

const GET_ADMIN_PANELE = "GET_ADMIN_PANELE"

const initialState = {
	picAdminUrl: null,

	// alertsMsg: [
	// 	// { type: "error", msg: "Wrong login or password" },
	// 	// { type: "warning", msg: "You need be carify" },
	// 	// { type: "info", msg: "Wrong login or password" },
	// 	// { type: "success", msg: "You need be carify" },
	// ],
}

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_ADMIN_PANELE:
			return { ...state, picAdminUrl: payload.picAdminUrl }

		default:
			return state
	}
}
export default reducer

// Action Creators
export const adminDataAC = data => ({ type: GET_ADMIN_PANELE, payload: data })

// Thunk Creators
export const getAdminPanelTC = () => async dispatch => {
	try {
		let { data } = await adminApi.getAdminPanel()

		dispatch(adminDataAC(data))
	} catch (error) {
		dispatch(addAlert(error.response.data.message, "error"))
	}
}
