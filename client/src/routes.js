import React from "react"
import { useSelector } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/Auth/Login"
import Login2 from "./components/Auth/Login2"
import Registration from "./components/Auth/Registration"
import Registration2 from "./components/Auth/Registration2"
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
			<Route exact path="login2" element={<Login2 />} />
			<Route exact path="registration" element={<Registration />} />
			<Route exact path="registration2" element={<Registration2 />} />
			<Route path="openpage" element={<OpenPage />} />

			<Route
				path="auth/privatepage"
				element={
					<RequireAuth redirectTo="/login">
						<PrivatePage />
					</RequireAuth>
				}
			/>
		</Routes>
	)
}

// function PrivateRoute({ child, ...rest }) {
// 	const inProgress = useSelector(state => state.user)
// 	const isAuth = useSelector(state => state.user)

// 	// Double this block with <Header/> component
// 	// const dispatch = useDispatch()
// 	// useEffect(() => {
// 	// 	dispatch(refreshUserAuthTC())
// 	// }, [dispatch])

// 	return (
// 		<Route
// 			{...rest}
// 			render={({ location }) =>
// 				isAuth ? child : <Navigate to={{ pathname: "/auth/login", state: { from: location } }} />
// 			}
// 		/>
// 	)
// }

/* <Route exact path="/strats/add" render={() => <AddFormStratContainer />} />
<Route exact path="/strats/:stratId" render={() => <EditFormStratContainer />} /> 
<Route path="/trade" render={() => <Trades />} />
<Route path="/orders" render={() => <OrdersContainer />} />
<Route path="/positions" render={() => <PositionsContainer />} /> */
