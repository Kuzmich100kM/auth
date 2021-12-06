import React from "react"
import { useSelector } from "react-redux"
import { Routes, Route, Navigate, Outlet } from "react-router-dom"

import Page404 from "./components/Page404"
import Index from "./components/Index"
import Preloader from "./components/common/Preloader"
import Login from "./components/Auth/Login"
import Registration from "./components/Auth/Registration"
import OpenPage from "./components/OpenPage"
import Dashboard from "./components/Dashboard"
import Adminpanel from "./components/Admin"

export default function AllRoutes() {
	function RequireAuth({ requiredRole }) {
		const { isAuth, roles, isLoading } = useSelector(state => state.auth)

		if (isLoading) return <Preloader />
		if (!isAuth) return <Navigate to="/auth/login" />

		const isRole = roles.includes(requiredRole)
		if (!isRole) return <Navigate to={-1} />

		return <Outlet />
	}

	return (
		<Routes>
			<Route exact path="/" element={<Index />} />
			<Route exact path="/auth/login" element={<Login />} />
			<Route exact path="/auth/registration" element={<Registration />} />
			<Route path="/openpage" element={<OpenPage />} />

			<Route path="/u" element={<RequireAuth requiredRole="user" />}>
				<Route path="dashboard" element={<Dashboard />} />
				{/* Other Route for user */}
			</Route>

			<Route path="/admin" element={<RequireAuth requiredRole="admin" />}>
				<Route path="panel" element={<Adminpanel />} />
				{/* Other Route for admin */}
			</Route>

			<Route path="*" element={<Page404 />} />
		</Routes>
	)
}
