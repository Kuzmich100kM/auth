import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { inAuthPageAC, userRegistrationTC } from "../../reducers/user.reducer"
import FormPanel from "../common/FormHooks"
import { isFilled, isEmail, isLengthMore } from "../common/FormHooks/inputValidators"
import Alerts from "./../Alerts"

export default function Registration() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { isAuth } = useSelector(state => state.user)

	const sendData = ({ email, password }) => dispatch(userRegistrationTC(email, password))

	const goLogin = () => navigate("/login")

	useEffect(() => {
		dispatch(inAuthPageAC(true)) // for hide button "Login" in header
		isAuth && navigate("/")
		return () => dispatch(inAuthPageAC(false))
	}, [isAuth, navigate, dispatch])

	const initValue = { email: "", password: "" }

	const initModels = [
		{
			name: "email",
			label: "Email",
			type: "input",
			className: "rightLabel",
			validators: [{ validFun: isFilled }, { validFun: isEmail }],
		},
		{
			name: "password",
			label: "Password",
			type: "password",
			className: "rightLabel",
			validators: [{ validFun: input => isLengthMore(input, 5) }, { validFun: isFilled }],
		},
	]

	return (
		<div className="register">
			<h4>Create account</h4>
			<FormPanel
				initValue={initValue}
				initModels={initModels}
				submitCb={sendData}
				btnSubmitText={"REGISTRATION"}
				firstTag={
					<button type="button" onClick={goLogin} className="btn-link">
						{"I have account"}
					</button>
				}
				//cancelCb={cancelCb}
				//btnCancelText={"Cancel"}
				//valueCb={valueCb}
				//cls="small"
			/>
			<Alerts />
		</div>
	)
}
