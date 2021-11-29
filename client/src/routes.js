import React from "react"
import { useSelector } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/Auth/Login"
import Registration from "./components/Auth/Registration"
import OpenPage from "./components/OpenPage"
import PrivatePage from "./components/PrivatePage"
import Index from "./components/Index"

export default function routes() {
	function RequireAuth({ children, redirectTo }) {
		const { isAuth } = useSelector(state => state.user)
		return isAuth ? children : <Navigate to={redirectTo} />
	}

	return (
		<Routes>
			<Route exact path="/" element={<Index />} />
			<Route exact path="login" element={<Login />} />
			<Route exact path="registration" element={<Registration />} />
			<Route path="openpage" element={<OpenPage />} />

			<Route
				path="auth/privatepage"
				element={
					<RequireAuth redirectTo="/login">
						<PrivatePage />
					</RequireAuth>
				}
			/>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}
