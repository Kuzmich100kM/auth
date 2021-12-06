import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getDashboardTC } from "../../reducers/user.reducer"
import { changeRoleTC } from "../../reducers/auth.reducer"
import Preloader from "../common/Preloader"

export default function Dashboard() {
	const { picUrl } = useSelector(state => state.user)
	const { userId, roles } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getDashboardTC())
	}, [dispatch])

	if (!picUrl) return <Preloader />

	return (
		<section className="dashboard">
			<h1>Dashboard header</h1>
			<div className="change-role">
				<h4>Your role is: {roles[roles.length - 1]}</h4>

				{/* This fake buttons for demonstration Admin panel */}
				{roles.includes("admin") ? (
					<button className="role short btn-submit" onClick={() => dispatch(changeRoleTC(userId, ["user"]))}>
						Make Me User
					</button>
				) : (
					<button className="role short btn-danger" onClick={() => dispatch(changeRoleTC(userId, ["user", "admin"]))}>
						Make Me Admin, plz
					</button>
				)}
			</div>
			<img src={picUrl} alt="dashboard" />
		</section>
	)
}
