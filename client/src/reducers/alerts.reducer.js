import { nanoid } from "nanoid"
const ADD_ALERT = "ADD_ALERT"
const DELETE_ALERT = "DELETE_ALERT"
const DELETE_ALL_ALERTS = "DELETE_ALL_ALERTS"

const initialState = {
	alertsMsg: [],
	// alertsMsg: [
	// 	// { id: 123, type: "error", msg: "Wrong login or password" },
	// 	// { id: 124, type: "warning", msg: "You need be carify" },
	// 	// { id: 125, type: "info", msg: "Wrong login or password" },
	// 	// { id: 126, type: "success", msg: "You need be carify" },
	// ],
}

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_ALERT:
			return { ...state, alertsMsg: [...state.alertsMsg, payload] }

		case DELETE_ALERT:
			let newAlertsMsg = state.alertsMsg.filter(el => el.id !== payload)
			return { ...state, alertsMsg: newAlertsMsg }

		case DELETE_ALL_ALERTS:
			return { ...state, alertsMsg: [] }

		default:
			return state
	}
}
export default reducer

// Action Creators
export const deleteAlert = id => ({ type: DELETE_ALERT, payload: id })
export const deleteAllAlerts = () => ({ type: DELETE_ALL_ALERTS })

// Thunk Creators
export const addAlert = (msg, type = "info", timeout = 5) => {
	return async dispatch => {
		const id = nanoid(3)
		try {
			dispatch({ type: ADD_ALERT, payload: { id, type, msg } })
			setTimeout(() => dispatch(deleteAlert(id)), timeout * 1000)
		} catch (error) {
			console.log(`error`, error)
		}
	}
}
