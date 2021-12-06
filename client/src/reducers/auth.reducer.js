import authApi from "../api/authApi"
import { addAlert } from "./alerts.reducer"

const USER_LOGIN = "USER_LOGIN"
const USER_LOGOUT = "USER_LOGOUT"
const IN_AUTH_PAGE = "IN_AUTH_PAGE"
const LOADING = "LOADING"
const CHANGE_ROLES = "CHANGE_ROLES"

const initialState = {
	userId: null,
	email: null,
	roles: [],
	isAuth: false,
	isActivated: false,
	inAuthPage: false,
	isLoading: true,
}

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case USER_LOGIN:
			const { userId, email, roles, isActivated } = payload
			return { ...state, userId, email, roles, isActivated, isAuth: true }

		case USER_LOGOUT:
			return { ...state, userId: null, email: null, roles: [], isActivated: false, isAuth: false }

		case IN_AUTH_PAGE:
			return { ...state, inAuthPage: payload }

		case LOADING:
			return { ...state, isLoading: payload }

		case CHANGE_ROLES:
			return { ...state, roles: payload }
		default:
			return state
	}
}
export default reducer

// Action Creators
export const userLoginAC = authData => ({ type: USER_LOGIN, payload: authData })
export const userLogoutAC = () => ({ type: USER_LOGOUT })
export const inAuthPageAC = bool => ({ type: IN_AUTH_PAGE, payload: bool })
export const loadingAC = bool => ({ type: LOADING, payload: bool })
export const changeRoleAC = roles => ({ type: CHANGE_ROLES, payload: roles })

// Thunk Creators
export const userRegistrationTC = (email, password) => async dispatch => {
	try {
		let { data } = await authApi.registration(email, password)

		localStorage.setItem("token", data.accessToken)
		dispatch(userLoginAC(data))
	} catch (error) {
		dispatch(addAlert(error.response.data.message, "error"))
	}
}

export const userLoginTC = (email, password) => async dispatch => {
	try {
		let { data } = await authApi.login(email, password)

		localStorage.setItem("token", data.accessToken)
		dispatch(userLoginAC(data))
		dispatch(loadingAC(false))
	} catch (error) {
		dispatch(addAlert(error.response.data.message, "error"))
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
		dispatch(loadingAC(false))
	} catch (error) {
		dispatch(loadingAC(false))
		console.log(error)
	}
}

// This fake options for demonstration Admin panel
export const changeRoleTC = (userId, newRole) => async dispatch => {
	try {
		let { data } = await authApi.changeRole(userId, newRole)

		dispatch(changeRoleAC(data.roles))

		data.roles.includes("admin")
			? dispatch(addAlert("Congratulations! You are now Administrator", "warning"))
			: dispatch(addAlert("You are now User", "success"))
	} catch (error) {
		dispatch(addAlert(error.response.data.message, "error"))
	}
}
