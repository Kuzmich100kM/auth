import userApi from "../api/userApi"
import { addAlert } from "./alerts.reducer"

const GET_DASHBOARD = "GET_DASHBOARD"

const initialState = {
	picUrl: null,
}

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_DASHBOARD:
			return { ...state, picUrl: payload.picUrl }

		default:
			return state
	}
}
export default reducer

// Action Creators
export const userDataAC = data => ({ type: GET_DASHBOARD, payload: data })

// Thunk Creators
export const getDashboardTC = () => async dispatch => {
	try {
		let { data } = await userApi.getDashboard()

		dispatch(userDataAC(data))
	} catch (error) {
		dispatch(addAlert(error.response.data.message, "error"))
	}
}
