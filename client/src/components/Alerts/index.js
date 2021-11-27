import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteAlertMsgAC } from "../../reducers/user.reducer"

function Alerts() {
	const dispatch = useDispatch()
	const { alertsMsg } = useSelector(state => state.user)

	const handleClose = i => dispatch(deleteAlertMsgAC(i))

	if (alertsMsg.length === 0) return <></>

	return (
		<div className="alerts">
			{alertsMsg.map((el, i) => (
				<div key={i} className={el.type}>
					<div>{el.msg}</div>
					<div className="btn btn-cross" onClick={() => handleClose(i)}></div>
				</div>
			))}
		</div>
	)
}

export default Alerts
