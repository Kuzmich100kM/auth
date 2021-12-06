import $api from "./index"

let userApi = {
	getDashboard: () => $api.get(`/u/dashboard`),
}

export default userApi
