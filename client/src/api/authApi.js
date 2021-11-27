import $api from "./index"

let authApi = {
	registration: (email, password) => $api.post(`registration`, { email, password }),
	login: (email, password) => $api.post("login", { email, password }),
	logout: () => $api.post(`logout`),
	refreshtoken: () => $api.get(`refreshtoken`),

	//getusers: () => $api.get(`user/getusers`, { email, password }),
}

export default authApi
