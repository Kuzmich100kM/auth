import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userLoginTC, inAuthPageAC } from "../../reducers/auth.reducer"
import FormPanel from "../common/FormHooks"
import { isFilled, isEmail } from "../common/FormHooks/inputValidators"

export default function Login() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { isAuth } = useSelector(state => state.auth)

	const sendData = ({ email, password }) => dispatch(userLoginTC(email, password))

	const goRegistration = () => navigate("/auth/registration")

	useEffect(() => {
		dispatch(inAuthPageAC(true)) // for hide button "Login" in header
		isAuth && navigate(-1)
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
			validators: [{ validFun: isFilled }],
		},
	]

	return (
		<div className="login">
			<h4>Log in to your account </h4>
			<FormPanel
				initValue={initValue}
				initModels={initModels}
				submitCb={sendData}
				btnSubmitText={"LOG IN"}
				firstTag={
					<button type="button" onClick={goRegistration} className="btn-link">
						{"Create account"}
					</button>
				}
				//cancelCb={cancelCb}
				//btnCancelText={"Cancel"}
				//valueCb={valueCb}
				//cls="small"
			/>
		</div>
	)
}
