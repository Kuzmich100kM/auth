import React from "react"
import { NavLink } from "react-router-dom"

export default function Navbar() {
	let pages = [
		{ url: "openpage", name: "Open page" },
		{ url: "auth/privatepage", name: "Private page" },
	]

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
