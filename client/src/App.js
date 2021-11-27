import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { refreshtokenTC } from "./reducers/user.reducer"
import Header from "./components/Header"
import AllRoutes from "./routes"

export default function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		if (localStorage.getItem("token")) dispatch(refreshtokenTC())
	}, [dispatch])

	return (
		<BrowserRouter>
			<Header />
			<AllRoutes />
		</BrowserRouter>
	)
}
