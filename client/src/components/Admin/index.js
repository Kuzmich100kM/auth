import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAdminPanelTC } from "../../reducers/admin.reducer"
import Preloader from "../common/Preloader"

export default function Adminpanel() {
	const { picAdminUrl } = useSelector(state => state.admin)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAdminPanelTC())
	}, [dispatch])

	if (!picAdminUrl) return <Preloader />

	return (
		<section>
			<h1>Admin Panel header</h1>
			<img src={picAdminUrl} alt="admin panel" />
		</section>
	)
}
