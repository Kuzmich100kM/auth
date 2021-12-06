import React from "react"
import { Link } from "react-router-dom"
import Logo from "./Logo"

import Navbar from "./Navbar"
import { useDispatch, useSelector } from "react-redux"
import { userLogoutTC } from "../../reducers/auth.reducer"

export default function Header() {
	const { isAuth, email, inAuthPage } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	const goLogout = e => {
		e.preventDefault()
		dispatch(userLogoutTC())
	}

	const elem = (
		<>
			<div className="userName">{email}</div>
			<div className="btn link" onClick={goLogout}>
				Logout
			</div>
		</>
	)

	return (
		<header>
			<Logo />
			<Navbar />
			{isAuth ? elem : inAuthPage ? <></> : <Link to={`auth/login`}>Log in</Link>}
		</header>
	)
}
