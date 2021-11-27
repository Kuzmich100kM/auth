import axios from "axios"

const baseURL = `${process.env.REACT_APP_API_URL}`
const $api = axios.create({ baseURL, withCredentials: true })

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
	return config
})

$api.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config

		if (error.response.status === 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true

			try {
				const response = await axios.get(baseURL + "/refreshtoken", { withCredentials: true })
				localStorage.setItem("token", response.data.accessToken)

				return $api.request(originalRequest)
			} catch (error) {
				console.log("Not authorized")
			}
		}
		throw error
	}
)

export default $api
