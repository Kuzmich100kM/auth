import $api from "./index"

let authApi = {
	registration: (email, password) => $api.post(`/auth/registration`, { email, password }),
	login: (email, password) => $api.post("/auth/login", { email, password }),
	logout: () => $api.post(`/auth/logout`),
	refreshtoken: () => $api.get(`/auth/refreshtoken`),

	// This fake API for demonstration Admin panel
	changeRole: (userId, newRole) => $api.post(`/auth/changerole`, { userId, newRole }),
}

export default authApi
