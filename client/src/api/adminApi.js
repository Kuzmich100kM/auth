import $api from "./index"

let userApi = {
	getAdminPanel: () => $api.get(`/admin/panel`),
}

export default userApi
