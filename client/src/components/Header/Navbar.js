import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

export default function Navbar() {
	let pages = [
		{ url: "openpage", name: "Open page" },
		{ url: "u/dashboard", name: "User Dashboard" },
		{ url: "admin/panel", name: "Admin panel" },
	]

	const { roles } = useSelector(state => state.auth)
	!roles.includes("admin") && pages.splice(2, 1)

	const Navs = () => (
		<>
			{pages.map(el => (
				<NavLink to={`/${el.url}`} key={el.url}>
					{el.name}
				</NavLink>
			))}
		</>
	)

	return (
		<div className="navBigSize">
			<Navs />
		</div>
	)
}
