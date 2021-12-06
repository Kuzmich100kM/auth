import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { refreshtokenTC, loadingAC } from "./reducers/auth.reducer"
import Header from "./components/Header"
import AllRoutes from "./routes"
import Alertoid from "./components/common/Alertoid"

export default function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		if (localStorage.getItem("token")) dispatch(refreshtokenTC())
		else dispatch(loadingAC(false))
	}, [dispatch])

	return (
		<BrowserRouter>
			<Header />
			<AllRoutes />
			<Alertoid />
		</BrowserRouter>
	)
}
