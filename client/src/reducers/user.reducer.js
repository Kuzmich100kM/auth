import authApi from "../api/authApi"

const USER_LOGIN = "USER_LOGIN"
const USER_LOGOUT = "USER_LOGOUT"
const IN_AUTH_PAGE = "IN_AUTH_PAGE"
const ADD_ALERT_MSGS = "ADD_ALERT_MSGS"
const DELETE_ALERT_MSG = "DELETE_ALERT_MSG"

const initialState = {
	userId: null,
	email: null,
	role: null,
	isAuth: false,
	isActivated: false,
	inAuthPage: false,
	alertsMsg: [
		// { type: "error", msg: "Wrong login or password" },
		// { type: "warning", msg: "You need be carify" },
		// { type: "info", msg: "Wrong login or password" },
		// { type: "success", msg: "You need be carify" },
	],
}

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case USER_LOGIN:
			const { userId, email, role, isActivated } = payload
			return { ...state, userId, email, role, isActivated, isAuth: true }

		case USER_LOGOUT:
			return { ...state, userId: null, email: null, role: null, isActivated: false, isAuth: false }

		case IN_AUTH_PAGE:
			return { ...state, inAuthPage: payload }

		case ADD_ALERT_MSGS:
			return { ...state, alertsMsg: [...state.alertsMsg, payload] }

		case DELETE_ALERT_MSG:
			let newAlertsMsg = state.alertsMsg.filter((el, i) => i !== payload)
			return { ...state, alertsMsg: newAlertsMsg }

		default:
			return state
	}
}
export default reducer

// Action Creators
export const userLoginAC = authData => ({ type: USER_LOGIN, payload: authData })
export const userLogoutAC = () => ({ type: USER_LOGOUT })
export const addAlertMsgsAC = alert => ({ type: ADD_ALERT_MSGS, payload: alert })
export const deleteAlertMsgAC = i => ({ type: DELETE_ALERT_MSG, payload: i })
export const inAuthPageAC = bool => ({ type: IN_AUTH_PAGE, payload: bool })

// Thunk Creators
export const userRegistrationTC = (email, password) => async dispatch => {
	try {
		let { data } = await authApi.registration(email, password)

		localStorage.setItem("token", data.accessToken)
		dispatch(userLoginAC(data))
	} catch (error) {
		let alert = { type: "error", msg: error.response.data.message }
		dispatch(addAlertMsgsAC(alert))
	}
}

export const userLoginTC = (email, password) => async dispatch => {
	try {
		let { data } = await authApi.login(email, password)

		localStorage.setItem("token", data.accessToken)
		dispatch(userLoginAC(data))
	} catch (error) {
		let alert = { type: "error", msg: error.response.data.message }
		dispatch(addAlertMsgsAC(alert))
	}
}

export const userLogoutTC = () => async dispatch => {
	try {
		await authApi.logout()

		localStorage.removeItem("token")
		dispatch(userLogoutAC())
	} catch (error) {
		console.log(error)
	}
}

export const refreshtokenTC = () => async dispatch => {
	try {
		let { data } = await authApi.refreshtoken()

		localStorage.setItem("token", data.accessToken)
		dispatch(userLoginAC(data))
	} catch (error) {
		console.log(error)
	}
}
